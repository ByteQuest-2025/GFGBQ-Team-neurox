import React, { useState } from 'react';
import './Analyze.css';

export default function Analyze() {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus('NeuroX is analyzing...');
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setStatus('Analysis complete.');
      } else {
        setStatus('Error: Unable to analyze file');
      }
    } catch (error) {
      setStatus('Error: Unable to connect to NeuroX');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <h2>Upload Media for Analysis</h2>
      <label className="upload-box">
        <input type="file" onChange={handleFileUpload} />
        Click to Upload File
      </label>
      {isLoading && <div className="loading"></div>}
      <p className="status-text">{status}</p>
      {result && (
        <div className="result-box">
          <h3>Analysis Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}