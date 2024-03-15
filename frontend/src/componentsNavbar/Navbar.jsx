import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import './Navbar.css'; // Assuming you'll style your navbar using CSS

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Blog</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}