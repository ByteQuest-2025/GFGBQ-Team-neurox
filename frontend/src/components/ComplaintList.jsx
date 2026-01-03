import React, { useEffect, useState } from 'react'
import { fetchComplaints } from '../services/api'

// Complaint list - simple table to show stored complaints
export default function ComplaintList() {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    load()
  }, [])

  // load function - API se data le aata hai
  async function load() {
    try {
      const data = await fetchComplaints()
      setComplaints(data)
    } catch (err) {
      // console pe error print kar rahe hain, simple handling
      console.error('Failed to load complaints', err)
    }
  }

  return (
    <div>
      <h2>View Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c.complaintId}>
              <td style={{fontFamily:'monospace',fontSize:13}}>{c.complaintId}</td>
              <td>{c.citizenName}</td>
              <td>{c.language}</td>
              <td><span className={`status status-${c.status}`}>{c.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
