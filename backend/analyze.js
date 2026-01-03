const express = require("express");
const router = express.Router();
const { detectDeepfakeSignals } = require("../ai-engine/detector");

router.post("/", async (req, res) => {
  console.log("NeuroX: File received");

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("NeuroX AI Engine is analyzing the media");

  const signals = detectDeepfakeSignals(req.file);

  res.json({
    status: "received",
    signals: signals,
  });
});

module.exports = router;
