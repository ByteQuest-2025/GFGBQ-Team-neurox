import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <h2>How It Works</h2>
      <ol>
        <li>Upload your media file.</li>
        <li>Our AI engine analyzes the content.</li>
        <li>Verification results are generated.</li>
        <li>Authenticity score is calculated.</li>
        <li>Take action based on the results.</li>
      </ol>
    </div>
  );
}