import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminLogin.css";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;

  const handleLogin = (e) => {

    e.preventDefault();

    if (!emailRegex.test(email)) {
      alert("Please enter a valid admin email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    axios.get("http://localhost:5000/adminregister")
      .then((response) => {

        const admins = response.data;

        const admin = admins.find(
          (item) =>
            item.email === email &&
            item.password === password
        );

        if (admin) {

          localStorage.setItem("admin", "true");
          localStorage.setItem("adminId", admin.id);
          localStorage.setItem("adminName", admin.name);
          localStorage.setItem("adminEmail", admin.email);

          alert("Admin Login Successful");

          navigate("/admin/dashboard");

        } else {

          alert("Invalid Admin Email or Password");

        }

      })
      .catch((error) => {

        console.log(error);

        alert("Unable to connect to Admin Server");

      });

  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-box">

        <h1>Admin Login</h1>

        <p>Login to Admin Panel</p>

        <form onSubmit={handleLogin}>

          <div className="admin-input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="admin-input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;

