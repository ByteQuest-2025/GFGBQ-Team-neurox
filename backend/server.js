const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Use a simple JSON-backed store when native sqlite isn't available.
let store;
try {
  // prefer original sqlite-backed db if present
  const sqlite = require('./db');
  // create a thin wrapper to mimic the methods used below
  store = {
    findUserByEmail: (email) => sqlite.prepare('SELECT id, email, password, role FROM users WHERE email = ?').get(email),
    createUser: (email, passwordHash, role) => {
      const info = sqlite.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)').run(email, passwordHash, role || 'user');
      return { id: info.lastInsertRowid, email, role: role || 'user' };
    },
    getUserById: (id) => sqlite.prepare('SELECT id, email, role FROM users WHERE id = ?').get(id),
    createGrievance: ({ id, title, description, category, status, user_id }) => {
      sqlite.prepare('INSERT INTO grievances (id, title, description, category, status, user_id) VALUES (?, ?, ?, ?, ?, ?)').run(id, title, description, category, status || 'Submitted', user_id);
      return sqlite.prepare('SELECT * FROM grievances WHERE id = ?').get(id);
    },
    getGrievanceById: (id) => sqlite.prepare('SELECT * FROM grievances WHERE id = ?').get(id),
    getGrievancesByUserId: (user_id) => sqlite.prepare('SELECT * FROM grievances WHERE user_id = ? ORDER BY created_at DESC').all(user_id),
    getAllGrievances: () => sqlite.prepare('SELECT g.*, u.email as user_email FROM grievances g LEFT JOIN users u ON g.user_id = u.id ORDER BY created_at DESC').all(),
    updateGrievanceStatus: (id, status) => { sqlite.prepare('UPDATE grievances SET status = ? WHERE id = ?').run(status, id); return sqlite.prepare('SELECT * FROM grievances WHERE id = ?').get(id); }
  };
} catch (err) {
  // fallback to file-based store
  store = require('./store');
}
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

app.use(cors());
app.use(bodyParser.json());

// Simple request logger to help debug connectivity from the frontend
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Helper: create JWT
function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

// Register
app.post('/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = store.findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = store.createUser(email, hashed, role);
  const token = sign(user);
  res.json({ token, user });
});

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = store.findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Middleware: authenticate
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid token' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Create grievance (authenticated)
app.post('/api/grievances', authMiddleware, (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) return res.status(400).json({ error: 'Missing fields' });
  // generate unique id: NX-<random 6 chars>
  const id = 'NX-' + crypto.randomBytes(3).toString('hex').toUpperCase();
  const g = store.createGrievance({ id, title, description, category, status: 'Submitted', user_id: req.user.id });
  res.json({ grievance: g });
});

// Create grievance (public) - returns generated ID for tracking
app.post('/api/grievances/public', (req, res) => {
  const { title, description, category } = req.body;
  console.log('Public grievance submit body:', { title, description, category });
  if (!title || !description || !category) return res.status(400).json({ error: 'Missing fields' });
  const id = 'NX-' + crypto.randomBytes(3).toString('hex').toUpperCase();
  const g = store.createGrievance({ id, title, description, category, status: 'Submitted', user_id: null });
  res.json({ grievance: g });
});

// Generic error handler to surface server errors in logs
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Get grievances for user or all for admin
app.get('/api/grievances', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    const rows = store.getAllGrievances();
    return res.json({ grievances: rows });
  }
  const rows = store.getGrievancesByUserId(req.user.id);
  res.json({ grievances: rows });
});

// Update grievance status (admin only)
app.patch('/api/grievances/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { id } = req.params;
  const { status } = req.body;
  if (!['Submitted','In Review','Resolved'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const g = store.updateGrievanceStatus(id, status);
  res.json({ grievance: g });
});

// Simple health
app.get('/health', (req, res) => res.json({ ok: true }));

// Public tracking endpoint - allows lookup by grievance id without authentication
app.get('/api/grievances/track/:id', (req, res) => {
  const { id } = req.params;
  const g = store.getGrievanceById(id);
  if (!g) return res.status(404).json({ error: 'Grievance not found' });
  res.json({ grievance: g });
});

app.listen(PORT, () => console.log('Backend running on', PORT));
