import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-State</h3>
            <p>Your trusted partner in real estate. Find your dream property or sell your estate with confidence.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/estates">Browse Estates</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Property Search</li>
              <li>Estate Management</li>
              <li>Property Valuation</li>
              <li>Market Analysis</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@estate.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Real Estate Ave, City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 E-State Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
