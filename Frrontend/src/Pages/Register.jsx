import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const url = "http://localhost:5000/user";

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9][0-9]{9}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const data = {
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Password,
    Confirmpassword
  };

  const postuser = (e) => {
    e.preventDefault();

    if (!nameRegex.test(FirstName)) {
      alert("First Name should contain only letters!");
      return;
    }

    if (!nameRegex.test(LastName)) {
      alert("Last Name should contain only letters!");
      return;
    }

    if (!emailRegex.test(Email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (!phoneRegex.test(PhoneNumber)) {
      alert("Phone Number must contain exactly 10 digits and start with 6, 7, 8, or 9!");
      return;
    }

    if (!passwordRegex.test(Password)) {
      alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character!");
      return;
    }

    if (Password !== Confirmpassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    axios
      .post(url, data)
      .then((res) => {
        alert("User Registered Successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("User Registration Failed");
      });
  };

  return (
    <div className="register-page">
      <form onSubmit={postuser}>
        <h2>Create Your Account</h2>

        <p className="register-subtitle">
          Register to explore beautiful products for your home
        </p>

        <div className="name-row">
          <div className="input-group">
            <label>First Name</label>

            <input
              type="text"
              placeholder="Enter first name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              pattern="[A-Za-z]+"
              title="First Name should contain only letters"
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>

            <input
              type="text"
              placeholder="Enter last name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              pattern="[A-Za-z]+"
              title="Last Name should contain only letters"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit Indian phone number"
            maxLength="10"
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={Confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Create Account
        </button>

        <div className="login-link">
          <p>
            Already have an account?
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

