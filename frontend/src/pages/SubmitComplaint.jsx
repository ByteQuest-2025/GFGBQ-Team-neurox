import React, { useState } from 'react'
import { submitComplaint } from '../services/api'

// Simple form for complaint submit - comments thode casual hai
export default function SubmitComplaint() {
  const [citizenName, setCitizenName] = useState('')
  const [complaintText, setComplaintText] = useState('')
  const [language, setLanguage] = useState('English')
  const [message, setMessage] = useState(null)

  // Form submit handle karne wala function
  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    try {
      const payload = { citizenName, complaintText, language }
      const res = await submitComplaint(payload)
      // Show simple success with ID
      setMessage({ type: 'success', text: `Submitted. Complaint ID: ${res.complaintId}` })
      // reset form
      setCitizenName('')
      setComplaintText('')
      setLanguage('English')
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Submission failed' })
    }
  }

  return (
    <div>
      <h2>Submit Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input placeholder="Full name (e.g., Ravi Kumar)" value={citizenName} onChange={e => setCitizenName(e.target.value)} required />

        <label>Language</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

        <label>Complaint</label>
        <textarea placeholder="Briefly describe your grievance" value={complaintText} onChange={e => setComplaintText(e.target.value)} required />

        <div className="actions">
          <button type="submit">Submit</button>
          <button type="button" className="secondary" onClick={() => { setCitizenName(''); setComplaintText(''); setLanguage('English'); setMessage(null) }}>Clear</button>
        </div>
        <div className="note">We save complaints locally for this demo. Complaint ID will be shown on success.</div>
      </form>

      {message && (
        <div className={`msg ${message.type}`}>{message.text}</div>
      )}
    </div>
  )
}
