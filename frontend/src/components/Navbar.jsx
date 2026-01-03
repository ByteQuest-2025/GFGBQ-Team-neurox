import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">NeuroX</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/analyze">Analyze</Link></li>
        <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}