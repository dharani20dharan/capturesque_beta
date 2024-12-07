// src/Footer.js

import React from 'react';
import './Footer.css'; // We'll style the footer in this file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Capturesque. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.instagram.com/snuc_capturesque/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
