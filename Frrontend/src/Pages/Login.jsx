import React, { useState } from "react";
import "../Styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {

  const url = API_ENDPOINTS.user;

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const login = (e) => {

    e.preventDefault();

    if (!Email || !Password) {
      alert("Please enter email and password");
      return;
    }

    if (!emailRegex.test(Email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(Password)) {
      alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    axios
      .get(url)
      .then((res) => {

        const users = res.data;

        const user = users.find(
          (x) => x.Email === Email
        );

        if (!user) {
          alert("User not found");
          return;
        }

        if (user.Password !== Password) {
          alert("Incorrect password");
          return;
        }

        alert("Login successful");

        navigate("/");

      })
      .catch((error) => {

        console.log(error);

        alert("Something went wrong. Please try again.");

      });

  };

  return (

    <div className="login-page">

      <div className="login-background">

        <div className="login-card">

          <div className="login-image">

            <div className="login-image-content">

              <h1>
                Welcome Home
              </h1>

              <p>
                Discover beautiful furniture,
                elegant lighting and stylish decor
                designed to make your home special.
              </p>

            </div>

          </div>

          <div className="login-form-section">

            <div className="login-form-content">

              <h2>
                Welcome Back
              </h2>

              <p className="login-subtitle">
                Login to continue shopping with us
              </p>

              <form onSubmit={login}>

                <div className="input-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={Password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="login-options">

                  <label className="remember">

                    <input
                      type="checkbox"
                    />

                    <span>
                      Remember me
                    </span>

                  </label>

                  <span
                    className="forgot-password"
                    onClick={() =>
                      alert(
                        "Please contact support to reset your password."
                      )
                    }
                  >
                    Forgot Password?
                  </span>

                </div>

                <button
                  type="submit"
                  className="login-button"
                >
                  Login
                </button>

              </form>

              <div className="register-text">

                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={() => navigate("/Register")}
                >
                  Create Account
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;

