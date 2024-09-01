import React, { useState } from "react";
import "./Popup.css";

function RegisterPopup({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Register:", name, email, password);
    onClose();
  };

  const handleFacebookRegister = () => {
    // Handle Facebook register logic here
    console.log("Facebook register");
  };

  const handleGoogleRegister = () => {
    // Handle Google register logic here
    console.log("Google register");
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <div className="social-login">
          <button className="facebook-btn" onClick={handleFacebookRegister}>
            Register with Facebook
          </button>
          <button className="google-btn" onClick={handleGoogleRegister}>
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPopup;
