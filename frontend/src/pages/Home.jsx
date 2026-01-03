import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Digital Media Verification System</h1>
        <p>Built by Team NeuroX</p>
        <Link to="/analyze" className="cta-button">Analyze Media</Link>
      </div>
    </div>
  );
}