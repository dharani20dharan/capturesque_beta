import React, { useState } from "react";
import axios from "axios";
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      alert(response.data.message); // Handle response from the server
    } catch (error) {
      alert("Login failed: " + error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>LOGIN</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
