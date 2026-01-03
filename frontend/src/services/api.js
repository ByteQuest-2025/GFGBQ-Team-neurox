// Thoda alag style ka comment - Vite environment use kar rahe hain
// Use `VITE_API_URL` when you want to point to a different backend
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// API helper: POST complaint
export async function submitComplaint(payload) {
  const res = await fetch(`${BASE}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Server error')
  }
  return res.json()
}

// API helper: GET all complaints
export async function fetchComplaints() {
  const res = await fetch(`${BASE}/complaints`)
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
}
