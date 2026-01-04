const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

function load() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const init = { users: [], grievances: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
      return init;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load data file', err);
    return { users: [], grievances: [] };
  }
}

function save(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function findUserByEmail(email) {
  const db = load();
  return db.users.find((u) => u.email === email) || null;
}

function createUser(email, passwordHash, role = 'user') {
  const db = load();
  const id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1;
  const user = { id, email, password: passwordHash, role, created_at: new Date().toISOString() };
  db.users.push(user);
  save(db);
  return { id: user.id, email: user.email, role: user.role };
}

function getUserById(id) {
  const db = load();
  return db.users.find((u) => u.id === id) || null;
}

function createGrievance({ id, title, description, category, status = 'Submitted', user_id }) {
  const db = load();
  const g = { id, title, description, category, status, user_id, created_at: new Date().toISOString() };
  db.grievances.push(g);
  save(db);
  return g;
}

function getGrievanceById(id) {
  const db = load();
  return db.grievances.find((g) => g.id === id) || null;
}

function getGrievancesByUserId(user_id) {
  const db = load();
  return db.grievances.filter((g) => g.user_id === user_id).sort((a,b) => new Date(b.created_at)-new Date(a.created_at));
}

function getAllGrievances() {
  const db = load();
  return db.grievances.slice().sort((a,b) => new Date(b.created_at)-new Date(a.created_at));
}

function updateGrievanceStatus(id, status) {
  const db = load();
  const g = db.grievances.find((x) => x.id === id);
  if (!g) return null;
  g.status = status;
  save(db);
  return g;
}

module.exports = {
  findUserByEmail,
  createUser,
  getUserById,
  createGrievance,
  getGrievanceById,
  getGrievancesByUserId,
  getAllGrievances,
  updateGrievanceStatus,
};
