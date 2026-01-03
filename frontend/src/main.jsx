import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// try to render app and show friendly error if something crashes
try {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (err) {
  // put a helpful message into the page so blank screen is easier to spot
  console.error('Render failed', err)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = '<h2 style="color:#900">App failed to load</h2><pre>' + String(err.message) + '</pre><p>Open console for details</p>'
  }
}
