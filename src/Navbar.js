// src/Navbar.js

import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import "./Navbar.css"; // Assuming you have CSS for Navbar styling

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        {/* Make sure the logo path is correct relative to the public folder */}
        <img src="/header/logo1.jpg" alt="Club Logo" className="logo" />
      </div>
      <nav className="navbar-links">
        <ul>
          {/* Use Link component for navigation instead of <a> */}
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/club_info">Club Info</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
