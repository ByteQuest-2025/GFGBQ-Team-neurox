import React from 'react'
import SubmitComplaint from './pages/SubmitComplaint'
import ComplaintList from './components/ComplaintList'

export default function App() {
  return (
    <div className="container">
      <h1>Grievance Intake</h1>

      <div className="layout">
        <div className="panel">
          <SubmitComplaint />
        </div>
        <div className="panel">
          <ComplaintList />
        </div>
      </div>
    </div>
  )
}
