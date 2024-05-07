import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>CCo2-Clean Code Oxygen</h1>
          <p></p>
          <p></p>
          <p>
          <h4>Welcome to our platform designed for aspiring coders taking their first steps into the world of web development. 
          Whether you're a novice enthusiast or an eager learner, 
          our platform provides a nurturing environment where you can embark on your coding journey with confidence.
          </h4></p> 
          {/* <span><h3>Do you have an account?</h3></span> */}
          
          {/* <Link to="/login">
            <button>Login</button>
          </Link> */}
        </div>
        <div className="right">
        <h1 style={{ color: "blue" }}>REGISTER</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            <div className="form-group">
          <label className="checkbox-container">
          <input type="checkbox" required /> I agree to all statements in <a href="https://www.w3schools.com/about/about_copyright.asp" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            {/* <input type="checkbox" /> I agree to all statements in <a href="#">Terms of Service</a> */}
          </label>
        </div>
            {/* <Link to="/"> */}
              <button type="submit">Register</button>
            {/* </Link> */}
            <div className="have-account" style={{ marginTop: "15px" }}>
            <a href="/login">Already have an account?</a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
