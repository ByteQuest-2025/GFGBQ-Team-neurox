import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles.css'
import SubmitComplaint from './pages/SubmitComplaint'
import ComplaintList from './components/ComplaintList'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'

export default function App() {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setStatus('NeuroX is analyzing...')
    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatus('File received by NeuroX')
      } else {
        setStatus('Error: Unable to analyze file')
      }
    } catch (error) {
      setStatus('Error: Unable to connect to NeuroX')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Router>
      <div className="container" style={{ textAlign: 'center' }}>
        <Navbar />
        <h1>Grievance Intake</h1>

        <div className="layout">
          <div className="panel">
            <SubmitComplaint />
          </div>
          <div className="panel">
            <ComplaintList />
          </div>
          <div className="panel">
            <div className="upload-card">
              <h2>Upload Media for Analysis</h2>
              <label className="upload-box">
                <input type="file" onChange={handleFileUpload} />
                Click to Upload File
              </label>
              {isLoading && <div className="loading"></div>}
              <p className="status-text">{status}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  )
}
