import React, { useState } from "react";
import "../Styles/Nav.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Nav = ({ isLoggedIn, user }) => {

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="nav">

      <div className="nav-logo">
        <Link to="/">
          <img
            src={logo}
            alt="Home Decor"
            height={"50px"}
            width={"100px"}
          />
        </Link>
      </div>

      <div className="nav-items">

        <Link to="/Furniture">
          Furniture
        </Link>

        <Link to="/HomeDecor">
          HomeDecor
        </Link>

        <Link to="/Furnishings">
          Furnishings
        </Link>

        <Link to="/Kitchen&Dining">
          Kitchen&Dining
        </Link>

        <Link to="/Sofas&Mattress">
          Sofas&Mattress
        </Link>

        <Link to="/Lamp&Lighting">
          Lamp&Lighting
        </Link>

      </div>

      <div className="nav-comp">

        <Link to="/Favourites">
          Favourites
        </Link>

        <Link to="/Cart">
          Cart
        </Link>

        <div className="profile-container">

          <button
            className="profile-button"
            onClick={() => setShowProfile(!showProfile)}
          >
            <span className="profile-icon">
              👤
            </span>

            <span>
              {isLoggedIn
                ? user?.Name || user?.name || user?.Email
                : "Profile"}
            </span>

            <span className="profile-arrow">
              ▾
            </span>
          </button>

          {showProfile && (
            <div className="profile-dropdown">

              

              <Link to="/Orders">
                📦 Your Orders
              </Link>

              <Link to="/login">
                🔑 Login
              </Link>

              <Link to="/Register">
                📝 Register
              </Link>

            </div>
          )}

        </div>

        <Link
          to="/Admin/register"
          className="admin-btn"
        >
          Admin
        </Link>

      </div>

    </div>
  );
};

export default Nav;

