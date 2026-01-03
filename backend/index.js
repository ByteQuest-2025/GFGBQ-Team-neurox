// Chhota sa Express server for grievance intake (Phase-1)
// Thode simple, readable comments in Hinglish for uniqueness
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json()) // body ko JSON mein parso kare

// Local JSON file rakha hai temporary storage ke liye
const DATA_FILE = path.join(__dirname, 'complaints.json')

// File se load karo, agar nahi hai to empty rakho
let complaints = []
try {
  const raw = fs.readFileSync(DATA_FILE, 'utf8')
  complaints = JSON.parse(raw)
} catch (err) {
  complaints = []
}

// Save karne ka simple helper
function saveComplaints() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2), 'utf8')
}

// Complaint ID banane ka function - readable aur simple
function generateComplaintId() {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,'')
  const rand = Math.floor(1000 + Math.random() * 9000)
    return `BQ-${date}-${rand}`
}

// GET /complaints -> saare complaints bhejo
app.get('/complaints', (req, res) => {
  res.json(complaints)
})

// POST /complaints -> naya complaint accept karo aur store karo
app.post('/complaints', (req, res) => {
  const { citizenName, complaintText, language } = req.body
  // Simple check - pura data chahiye
  if (!citizenName || !complaintText || !language) {
    return res.status(400).json({ error: 'citizenName, complaintText and language are required' })
  }

  const newComplaint = {
      complaintId: generateReadableId(),
    citizenName: String(citizenName).trim(),
    complaintText: String(complaintText).trim(),
    language: String(language),
    timestamp: new Date().toISOString(),
    status: 'Submitted'
  }

  // newest ko top par rakhte hain
  complaints.unshift(newComplaint)
  saveComplaints()

  // client ko ID wapas bhejo
  res.status(201).json({ complaintId: newComplaint.complaintId, complaint: newComplaint })
})

// Start server
app.listen(PORT, () => {
  console.log(`Grievance server running on http://localhost:${PORT}`)
})
