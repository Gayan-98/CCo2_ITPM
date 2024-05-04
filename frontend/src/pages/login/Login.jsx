import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        alert("login successful");
        login(user);
        localStorage.setItem("username", username);
        window.location.href = "/";

        localStorage.setItem("username", username);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      //setError("Error logging in");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <p></p>
          <p></p>
          <p></p>
          <h1>CCo2-Clean Code Oxygen</h1>
          <p></p>
          <p></p>
          <p></p>
          {/* <p>
          Welcome to our platform designed for aspiring coders taking their first steps into the world of web development. 
          Whether you're a novice enthusiast or an eager learner, 
          our platform provides a nurturing environment where you can embark on your coding journey with confidence.
          </p> */}
          <div className="create-account" style={{ marginTop: "15px" }}>
            <a href="/register">Don't have an account?</a>
          </div>
          {/* <span>Don't you have an account?</span> */}
          {/* <Link to="/register">
            <button>Register</button>
          </Link> */}
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/">
              <button type="submit">Login</button>
            </Link>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
