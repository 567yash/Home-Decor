import React, { useState } from "react";
import "../Styles/AdminRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const AdminRegister = () => {

  let url = API_ENDPOINTS.adminregister;

  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let nameRegex = /^[A-Za-z ]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[6-9][0-9]{9}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;

  let data = {
    name,
    email,
    phone,
    password,
    confirmPassword
  };

  const postadmin = (x) => {

    x.preventDefault();

    if (!nameRegex.test(name)) {
      alert("Admin Name should contain only letters");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Phone Number must contain 10 digits and start with 6, 7, 8 or 9");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post(url, data)

      .then(res => {

        alert("Admin Registered Successfully");

        navigate("/admin/login");

      })

      .catch(err => {

        console.log(err);

        alert("Admin Registration Failed");

      });

  };

  return (

    <div className="admin-register-page">

      <form onSubmit={postadmin}>

        <h2>Admin Registration</h2>

        <p className="admin-register-subtitle">
          Create your admin account
        </p>

        <div className="admin-register-input">

          <label>
            Admin Name
          </label>

          <input
            type="text"
            placeholder="Enter admin name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            pattern="[A-Za-z ]+"
            title="Admin name should contain only letters"
            required
          />

        </div>

        <div className="admin-register-input">

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

        </div>

        <div className="admin-register-input">

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            pattern="[6-9][0-9]{9}"
            maxLength="10"
            title="Enter a valid 10-digit phone number"
            required
          />

        </div>

        <div className="admin-register-input">

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength="8"
            required
          />

        </div>

        <div className="admin-register-input">

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

        </div>

        <button type="submit">
          Create Admin Account
        </button>

        <div className="admin-login-link">

          <p>
            Already have an admin account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
          >
            Admin Login
          </button>

        </div>

      </form>

    </div>

  );

};

export default AdminRegister;

