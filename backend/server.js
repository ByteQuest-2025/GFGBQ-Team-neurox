const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

app.use(cors());
app.use(bodyParser.json());

// Helper: create JWT
function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

// Register
app.post('/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const info = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)').run(email, hashed, role || 'user');
  const user = { id: info.lastInsertRowid, email, role: role || 'user' };
  const token = sign(user);
  res.json({ token, user });
});

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = db.prepare('SELECT id, email, password, role FROM users WHERE email = ?').get(email);
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
  const stmt = db.prepare('INSERT INTO grievances (id, title, description, category, status, user_id) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, title, description, category, 'Submitted', req.user.id);
  const g = db.prepare('SELECT * FROM grievances WHERE id = ?').get(id);
  res.json({ grievance: g });
});

// Get grievances for user or all for admin
app.get('/api/grievances', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    const rows = db.prepare('SELECT g.*, u.email as user_email FROM grievances g LEFT JOIN users u ON g.user_id = u.id ORDER BY created_at DESC').all();
    return res.json({ grievances: rows });
  }
  const rows = db.prepare('SELECT * FROM grievances WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json({ grievances: rows });
});

// Update grievance status (admin only)
app.patch('/api/grievances/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { id } = req.params;
  const { status } = req.body;
  if (!['Submitted','In Review','Resolved'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const stmt = db.prepare('UPDATE grievances SET status = ? WHERE id = ?');
  stmt.run(status, id);
  const g = db.prepare('SELECT * FROM grievances WHERE id = ?').get(id);
  res.json({ grievance: g });
});

// Simple health
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log('Backend running on', PORT));
