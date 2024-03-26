import React, { useState } from 'react';
import './Registration.scss'; 
import signInBackgroundImage from '../../assets/registerbackground.jpg'; // Adjust the path accordingly

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div  className="container1">
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {/* User selection */}
        <select
          name="user"
          value={formData.user}
          onChange={handleInputChange}
        >
          <option value="">Select User</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <div className="have-account">
          <a href="/login">Already have an account?</a>
        </div>
      </form>
    </div>

    <div className="illustration-section">
        <img src={signInBackgroundImage} width={700} alt="Sign In Background" />
      </div>
    </div>
  );
};

export default Registration;
