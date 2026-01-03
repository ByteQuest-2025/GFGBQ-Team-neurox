const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

app.use(cors());
app.use(bodyParser.json());

const users = []; // { id, email, passwordHash, role }
const grievances = []; // { id, title, description, category, status, user_id, created_at }

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

app.post('/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (users.find((u) => u.email === email)) return res.status(400).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const id = users.length + 1;
  const user = { id, email, password: hashed, role: role || 'user' };
  users.push(user);
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

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

app.post('/api/grievances', authMiddleware, (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) return res.status(400).json({ error: 'Missing fields' });
  const id = 'NX-' + crypto.randomBytes(3).toString('hex').toUpperCase();
  const g = { id, title, description, category, status: 'Submitted', user_id: req.user.id, created_at: new Date().toISOString() };
  grievances.push(g);
  res.json({ grievance: g });
});

app.get('/api/grievances', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') return res.json({ grievances });
  const rows = grievances.filter((g) => g.user_id === req.user.id);
  res.json({ grievances: rows });
});

app.patch('/api/grievances/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { id } = req.params;
  const { status } = req.body;
  if (!['Submitted','In Review','Resolved'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const g = grievances.find((x) => x.id === id);
  if (!g) return res.status(404).json({ error: 'Not found' });
  g.status = status;
  res.json({ grievance: g });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log('Dev backend running on', PORT));
