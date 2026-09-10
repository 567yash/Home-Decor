import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminOrders.css";
import { API_ENDPOINTS } from "../config/api";

const AdminOrders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const url = API_ENDPOINTS.orders;

  const getOrders = () => {

    axios
      .get(url)
      .then(res => {

        setOrders(res.data);

      })
      .catch(err => {

        console.log(err);

      });

  };

  useEffect(() => {

    getOrders();

  }, []);

  const updateStatus = (id, status) => {

    axios
      .patch(`${url}/${id}`, {
        status: status
      })
      .then(() => {

        alert("Order Status Updated Successfully");

        getOrders();

      })
      .catch(err => {

        console.log(err);

        alert("Order Status Update Failed");

      });

  };

  const deleteOrder = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`${url}/${id}`)
      .then(() => {

        alert("Order Deleted Successfully");

        getOrders();

      })
      .catch(err => {

        console.log(err);

        alert("Order Delete Failed");

      });

  };

  return (

    <div className="admin-orders-page">

      <div className="admin-orders-header">

        <div>

          <h1>Manage Orders</h1>

          <p>
            View and manage customer orders
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

      <div className="admin-orders-summary">

        <div className="orders-summary-card">

          <span>Total Orders</span>

          <h2>{orders.length}</h2>

        </div>

      </div>

      <div className="orders-table-container">

        {orders.length === 0 ? (

          <div className="no-orders">

            <h2>No Orders Found</h2>

            <p>
              There are currently no customer orders.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Products</th>
                <th>Total Items</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order, index) => (

                <tr key={order.id}>

                  <td>{index + 1}</td>

                  <td>
                    {order.customer?.name}
                  </td>

                  <td>
                    {order.customer?.email}
                  </td>

                  <td>

                    {order.products?.map((product, productIndex) => (

                      <div key={productIndex}>

                        {product.name} × {product.quantity || 1}

                      </div>

                    ))}

                  </td>

                  <td>
                    {order.totalItems}
                  </td>

                  <td>
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {order.paymentMethod}
                  </td>

                  <td>
                    {order.orderDate}
                  </td>

                  <td>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                  <td>

                    <button
                      className="delete-order-btn"
                      onClick={() => deleteOrder(order.id)}
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

export default AdminOrders;