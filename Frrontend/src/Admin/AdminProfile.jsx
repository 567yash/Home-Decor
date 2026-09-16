import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminProfile.css";
import { API_ENDPOINTS } from "../config/api";

const AdminProfile = () => {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [editMode, setEditMode] = useState(false);

  const url = API_ENDPOINTS.adminregister;


  useEffect(() => {

    axios
      .get(url)
      .then(res => {

        if (res.data.length > 0) {
          setAdmin(res.data[0]);
        }

      })
      .catch(err => {

        console.log(err);

      });

  }, []);


  const handleChange = (e) => {

    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });

  };


  const updateAdmin = (e) => {

    e.preventDefault();

    axios
      .put(`${url}/${admin.id}`, admin)
      .then(res => {

        setAdmin(res.data);

        alert("Profile Updated Successfully");

        setEditMode(false);

      })
      .catch(err => {

        console.log(err);

        alert("Profile Update Failed");

      });

  };


  return (

    <div className="admin-profile-page">

      <div className="admin-profile-header">

        <div>

          <h1>Admin Profile</h1>

          <p>
            Manage your administrator account
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>


      <div className="admin-profile-container">

        <div className="admin-profile-card">

          <div className="admin-profile-avatar">

            {admin.name
              ? admin.name.charAt(0).toUpperCase()
              : "A"}

          </div>

          <h2>
            {admin.name || "Admin"}
          </h2>

          <p>
            Administrator
          </p>

        </div>


        <div className="admin-profile-details">

          <div className="profile-details-header">

            <div>

              <h2>Account Details</h2>

              <p>
                View and update your admin information
              </p>

            </div>


            {!editMode && (

              <button
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>

            )}

          </div>


          <form onSubmit={updateAdmin}>

            <div className="profile-row">

              <div className="profile-group">

                <label>Admin Name</label>

                <input
                  type="text"
                  name="name"
                  value={admin.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />

              </div>


              <div className="profile-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={admin.email || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />

              </div>

            </div>


            <div className="profile-row">

              <div className="profile-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={admin.phone || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />

              </div>


              <div className="profile-group">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={admin.password || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />

              </div>

            </div>


            {editMode && (

              <div className="profile-actions">

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>

                <button type="submit">
                  Save Changes
                </button>

              </div>

            )}

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminProfile;