import React, { useState } from 'react';
import './Popup.css';

function LoginPopup({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', email, password);
    onClose();
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Facebook login');
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login');
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="social-login">
          <button className="facebook-btn" onClick={handleFacebookLogin}>Login with Facebook</button>
          <button className="google-btn" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;