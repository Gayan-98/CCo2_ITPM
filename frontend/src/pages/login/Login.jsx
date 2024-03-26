import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye } from 'react-icons/fa'; // Font Awesome icons
import './Login.scss'; // SCSS file
import { Router } from 'react-router-dom';
import signInBackgroundImage from '../../assets/loginbackground.jpg'; // Adjust the path accordingly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
   
    console.log('Login...');
  };

  return (
    <div className="container1">
    <div className="Login-container" >
      <h2>LOGIN</h2>
      
      <div className="input-container">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Enter your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <FaLock className="input-icon" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FaEye
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      </div>
      <button className="Login-button" onClick={handleLogin}><b>
        LOGIN</b>
      </button>
      <div className="create-account">
          <a href="/registration">Don't have an account?</a>
        </div>
    </div>

    <div className="illustration-section">
        <img src={signInBackgroundImage} width={700} alt="Sign In Background" />
      </div>
    </div>
  );
};

export default Login;
