import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';

function Navbar({ orderItemCount }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/menu">MENU</Link></li>
        <li>
          <Link to="/order" className="orders-btn">
            ORDER {orderItemCount > 0 && <span className="order-count">{orderItemCount}</span>}
          </Link>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => setShowLoginPopup(true)}>Login</button>
        <button className="register-btn" onClick={() => setShowRegisterPopup(true)}>Register</button>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      {showRegisterPopup && <RegisterPopup onClose={() => setShowRegisterPopup(false)} />}
    </nav>
  );
}

export default Navbar;