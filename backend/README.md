# NeuroX Backend (minimal)

This backend is a simple Express server using SQLite (better-sqlite3) for persistence.

Run:

```bash
cd backend
npm install
npm run dev
```

APIs:
- POST /auth/register { email, password, role? }
- POST /auth/login { email, password }
- GET /api/grievances (auth required)
- POST /api/grievances (auth required)
- PATCH /api/grievances/:id (admin only)
