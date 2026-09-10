import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminDashboard.css";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  const adminName = localStorage.getItem("adminName") || "Admin";
  const adminEmail = localStorage.getItem("adminEmail") || "";

  const handleLogout = () => {

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");

    navigate("/admin/login");

  };

  useEffect(() => {

    axios
      .get(API_ENDPOINTS.user)
      .then(res => {

        setTotalUsers(res.data.length);

      })
      .catch(err => {

        console.log(err);

      });

    axios
      .get(API_ENDPOINTS.orders)
      .then(res => {

        setTotalOrders(res.data.length);

        const revenue = res.data.reduce(
          (total, order) =>
            total + Number(order.totalAmount || 0),
          0
        );

        setTotalRevenue(revenue);

        const latestOrders = [...res.data]
          .reverse()
          .slice(0, 5);

        setRecentOrders(latestOrders);

      })
      .catch(err => {

        console.log(err);

      });

    const productUrls = [
      `${API_BASE_URL}/furnituredesc`,
      `${API_BASE_URL}/homedecordesc`,
      `${API_BASE_URL}/furnishingsdesc`,
      `${API_BASE_URL}/sofadesc`,
      `${API_BASE_URL}/kitchendesc`,
      `${API_BASE_URL}/lampdesc`
    ];

    const productRequests = productUrls.map(url =>
      axios.get(url)
    );

    Promise.all(productRequests)
      .then(responses => {

        let count = 0;

        responses.forEach(response => {

          if (Array.isArray(response.data)) {

            if (
              response.data.length > 0 &&
              Array.isArray(response.data[0])
            ) {
              count += response.data[0].length;
            } else {
              count += response.data.length;
            }

          }

        });

        setTotalProducts(count);

      })
      .catch(err => {

        console.log(err);

      });

  }, []);

  return (
    <div className="admin-dashboard">

      <div className="admin-sidebar">

        <div className="admin-logo">
          <h2>HOME DECOR</h2>
          <p>ADMIN PANEL</p>
        </div>

        <div className="admin-menu">

          <button
            className="active"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/products")}
          >
            Products
          </button>

          <button
            onClick={() => navigate("/admin/users")}
          >
            Users
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/admin/profile")}
          >
            Profile
          </button>

        </div>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="admin-main">

        <div className="admin-topbar">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>

          <div className="admin-user">

            <div className="admin-user-icon">
              A
            </div>

            <div>
              <h4>Admin</h4>
              <span>Administrator</span>
            </div>

          </div>

        </div>

        <div className="admin-cards">

          <div className="admin-card">

            <div className="admin-card-icon">
              P
            </div>

            <div>
              <p>Total Products</p>
              <h2>{totalProducts}</h2>
            </div>

          </div>

          <div className="admin-card">

            <div className="admin-card-icon">
              U
            </div>

            <div>
              <p>Total Users</p>
              <h2>{totalUsers}</h2>
            </div>

          </div>

          <div className="admin-card">

            <div className="admin-card-icon">
              O
            </div>

            <div>
              <p>Total Orders</p>
              <h2>{totalOrders}</h2>
            </div>

          </div>

          <div className="admin-card">

            <div className="admin-card-icon">
              ₹
            </div>

            <div>
              <p>Total Revenue</p>
              <h2>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h2>
            </div>

          </div>

        </div>

        <div className="admin-content-section">

          <div className="admin-section-header">

            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <button
              onClick={() => navigate("/admin/orders")}
            >
              View All
            </button>

          </div>

          {recentOrders.length === 0 ? (

            <div className="admin-empty-orders">

              <div className="empty-icon">
                O
              </div>

              <h3>No Orders Yet</h3>

              <p>
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="recent-orders-table">

              <table>

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order, index) => (

                    <tr key={order.id}>

                      <td>{index + 1}</td>

                      <td>
                        {order.customer?.name || "N/A"}
                      </td>

                      <td>

                        {order.products?.map(
                          (product, productIndex) => (

                            <div key={productIndex}>

                              {product.name} ×{" "}
                              {product.quantity || 1}

                            </div>

                          )
                        )}

                      </td>

                      <td>
                        ₹
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {order.paymentMethod || "N/A"}
                      </td>

                      <td>
                        {order.status || "Pending"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        <div className="admin-quick-actions">

          <h2>Quick Actions</h2>

          <div className="quick-action-grid">

            <button
              onClick={() => navigate("/admin/products/add")}
            >
              <span>+</span>
              Add Product
            </button>

            <button
              onClick={() => navigate("/admin/products")}
            >
              <span>↗</span>
              View Products
            </button>

            <button
              onClick={() => navigate("/admin/users")}
            >
              <span>U</span>
              View Users
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
            >
              <span>O</span>
              View Orders
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;