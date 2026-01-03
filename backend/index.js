// Chhota sa Express server for grievance intake (Phase-1)
// Thode simple, readable comments in Hinglish for uniqueness
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const analyzeRoute = require("./analyze");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// File upload middleware
const upload = multer({ dest: "uploads/" });

// -------------------
// Complaint storage
// -------------------
const DATA_FILE = path.join(__dirname, "complaints.json");

let complaints = [];
try {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  complaints = JSON.parse(raw);
} catch (err) {
  complaints = [];
}

function saveComplaints() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2), "utf8");
}

function generateComplaintId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BQ-${date}-${rand}`;
}

// -------------------
// Complaint APIs
// -------------------
app.get("/complaints", (req, res) => {
  res.json(complaints);
});

app.post("/complaints", (req, res) => {
  const { citizenName, complaintText, language } = req.body;

  if (!citizenName || !complaintText || !language) {
    return res
      .status(400)
      .json({ error: "citizenName, complaintText and language are required" });
  }

  const newComplaint = {
    complaintId: generateComplaintId(),
    citizenName: String(citizenName).trim(),
    complaintText: String(complaintText).trim(),
    language: String(language),
    timestamp: new Date().toISOString(),
    status: "Submitted",
  };

  complaints.unshift(newComplaint);
  saveComplaints();

  res.status(201).json({
    complaintId: newComplaint.complaintId,
    complaint: newComplaint,
  });
});

// -------------------
// 🔥 NeuroX AI Route
// -------------------
app.post("/analyze", upload.single("file"), analyzeRoute);

// -------------------
app.listen(PORT, () => {
  console.log(`NeuroX backend running on http://localhost:${PORT}`);
});
