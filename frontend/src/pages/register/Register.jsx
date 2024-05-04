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
          <p></p>
          <p></p>
          <h1>CCo2-Clean Code Oxygen</h1>
          <p></p>
          <p></p>
          {/* <p>
          In our journey to empower beginner coders, we've embarked on a pivotal aspect of web development. Our web application 
          not only teaches coding fundamentals .
          </p> */}
          {/* <span><h3>Do you have an account?</h3></span> */}
          <div className="have-account" style={{ marginTop: "15px" }}>
            <a href="/login">Already have an account?</a>
          </div>
          {/* <Link to="/login">
            <button>Login</button>
          </Link> */}
        </div>
        <div className="right">
          <h1>Register</h1>
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
            <Link to="/">
              <button type="submit">Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
