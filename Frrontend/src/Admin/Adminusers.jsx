import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Adminusers.css";
import { API_ENDPOINTS } from "../config/api";

const AdminUsers = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const url = API_ENDPOINTS.user;

  const getUsers = () => {

    axios
      .get(url)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  };

  useEffect(() => {
    getUsers();
  }, []);

  const maskPhone = (phone) => {

    if (!phone) {
      return "";
    }

    const phoneString = String(phone);

    if (phoneString.length <= 4) {
      return phoneString;
    }

    return phoneString.slice(0, 4) + "*".repeat(phoneString.length - 4);

  };

  const maskEmail = (email) => {

    if (!email) {
      return "";
    }

    const [username, domain] = email.split("@");

    if (!domain) {
      return email;
    }

    if (username.length <= 2) {
      return username[0] + "*".repeat(Math.max(username.length - 1, 0)) + "@" + domain;
    }

    return username.slice(0, 3) + "*".repeat(username.length - 3) + "@" + domain;

  };

  const deleteUser = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`${url}/${id}`)
      .then(() => {

        alert("User Deleted Successfully");

        getUsers();

      })
      .catch(err => {

        console.log(err);

        alert("User Delete Failed");

      });

  };

  return (

    <div className="admin-users-page">

      <div className="admin-users-header">

        <div>

          <h1>Manage Users</h1>

          <p>
            View and manage registered users
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

      <div className="admin-users-summary">

        <div className="users-summary-card">

          <span>Total Users</span>

          <h2>{users.length}</h2>

        </div>

      </div>

      <div className="users-table-container">

        {users.length === 0 ? (

          <div className="no-users">

            <h2>No Users Found</h2>

            <p>
              There are currently no registered users.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr key={user.id}>

                  <td>{index + 1}</td>

                  <td>{user.FirstName}</td>

                  <td>{user.LastName}</td>

                  <td>{maskEmail(user.Email)}</td>

                  <td>{maskPhone(user.PhoneNumber)}</td>

                  <td>

                    <button
                      className="delete-user-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

};

export default AdminUsers;