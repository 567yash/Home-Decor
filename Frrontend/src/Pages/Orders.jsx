import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card">
              <div className="order-header">
                <span>{order.status}</span>
              </div>

              <div className="order-products">
                {order.products?.map((product, index) => (
                  <div className="order-product" key={index}>
                    <img
                      src={
                        product.img ||
                        product.image ||
                        product.lampimg ||
                        product.lampimmg ||
                        product.furnitureimg ||
                        product.sofaimg ||
                        product.kitchenimg ||
                        product.homeimg ||
                        ""
                      }
                      alt={product.name || "Product"}
                    />

                    <div className="product-info">
                      <h3>{product.name}</h3>

                      {product.brand && (
                        <p>
                          <strong>Brand:</strong> {product.brand}
                        </p>
                      )}

                      {product.category && (
                        <p>
                          <strong>Category:</strong> {product.category}
                        </p>
                      )}

                      <p>
                        <strong>Quantity:</strong>{" "}
                        {product.quantity || 1}
                      </p>

                      <p>
                        <strong>Price:</strong> ₹
                        {Number(product.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>

                <p>
                  <strong>Order Date:</strong> {order.orderDate}
                </p>

                <p>
                  <strong>Total Items:</strong> {order.totalItems}
                </p>

                <h2>
                  Total Amount: ₹
                  {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

