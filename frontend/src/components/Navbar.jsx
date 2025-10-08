import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">E-State</span>
          <span className="logo-subtitle">Real Estate Platform</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {/* <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link> */}
          <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/estates" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Browse Estates
              </Link>
              {user?.role === 'seller' && (
                <Link to="/my-estates" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  My Estates
                </Link>
              )}
            </>
          )}
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
