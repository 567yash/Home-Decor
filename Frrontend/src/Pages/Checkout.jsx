import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Checkout.css";
import { API_ENDPOINTS } from "../config/api";

const Checkout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const singleProduct = location.state?.product;
  const cartProducts = location.state?.cart || [];

  const products = singleProduct
    ? [singleProduct]
    : cartProducts;

  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [payment, setPayment] = useState(
    "Cash on Delivery"
  );

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

  if (products.length === 0) {

    return (
      <div className="checkout-empty">
        <h2>
          No Product Selected
        </h2>

        <button
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const placeOrder = async (e) => {

    e.preventDefault();

    if (
      !user.name.trim() ||
      !user.mobile.trim() ||
      !user.email.trim() ||
      !user.address.trim() ||
      !user.city.trim() ||
      !user.state.trim() ||
      !user.pincode.trim()
    ) {

      alert("Please fill all the details");

      return;
    }

    const totalItems = products.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    const totalAmount = products.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        Number(item.quantity || 1),
      0
    );

    const order = {

      products: products,

      customer: {
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      },

      paymentMethod: payment,

      totalItems: totalItems,

      totalAmount: totalAmount,

      orderDate: new Date().toLocaleString(),

      status: "Pending"

    };

    try {

      const response = await axios.post(
        API_ENDPOINTS.orders,
        order
      );

      setLatestOrder(response.data);

      localStorage.setItem(
        "latestOrder",
        JSON.stringify(response.data)
      );

      localStorage.removeItem("cart");

      setOrderPlaced(true);

    } catch (error) {

      console.error(error);

      alert("Failed to place order. Please try again.");

    }

  };

  if (orderPlaced) {

    return (
      <div className="order-success">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you, {user.name}!
          </p>

          <p>
            Your order has been placed successfully.
          </p>

          <p>
            Total Items:{" "}
            <strong>
              {latestOrder?.totalItems}
            </strong>
          </p>

          <p>
            Total Amount:{" "}
            <strong>
              ₹
              {Number(
                latestOrder?.totalAmount || 0
              ).toLocaleString("en-IN")}
            </strong>
          </p>

          <p>
            Payment:{" "}
            <strong>
              {latestOrder?.paymentMethod}
            </strong>
          </p>

          <p>
            Order ID:{" "}
            <strong>
              {latestOrder?.id}
            </strong>
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  const totalItems = products.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const totalPrice = products.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  return (

    <div className="checkout-page">

      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-container">

        <div className="checkout-product">

          <h2>
            Order Summary
          </h2>

          <div className="checkout-products">

            {products.map((item, index) => (

              <div
                className="product-card"
                key={`${item.category}-${item.id}-${index}`}
              >

                <img
                  src={
                    item.img ||
                    item.image ||
                    item.lampimg ||
                    item.lampimmg ||
                    item.furnitureimg ||
                    item.sofaimg ||
                    item.kitchenimg ||
                    item.homeimg ||
                    ""
                  }
                  alt={item.name || "Product"}
                />

                <div className="product-details">

                  <h3>
                    {item.name || "Product"}
                  </h3>

                  {item.brand && (
                    <p>
                      <strong>
                        Brand:
                      </strong>{" "}
                      {item.brand}
                    </p>
                  )}

                  {item.colour && (
                    <p>
                      <strong>
                        Colour:
                      </strong>{" "}
                      {item.colour}
                    </p>
                  )}

                  {item.category && (
                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {item.category}
                    </p>
                  )}

                  <p>
                    <strong>
                      Quantity:
                    </strong>{" "}
                    {item.quantity || 1}
                  </p>

                  <h2>
                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}
                  </h2>

                </div>

              </div>

            ))}

          </div>

          <div className="price-summary">

            <div>
              <span>
                Total Items
              </span>

              <strong>
                {totalItems}
              </strong>
            </div>

            <div>
              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div>
              <span>
                Delivery
              </span>

              <span className="free">
                FREE
              </span>
            </div>

            <div className="total">

              <strong>
                Total Amount
              </strong>

              <strong>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>

        <div className="customer-details">

          <h2>
            Delivery Details
          </h2>

          <form onSubmit={placeOrder}>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={user.name}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={user.mobile}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={user.email}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Full Address
              </label>

              <textarea
                name="address"
                placeholder="House No, Street, Area"
                rows="4"
                value={user.address}
                onChange={handleChange}
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={user.city}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={user.state}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={user.pincode}
                onChange={handleChange}
              />

            </div>

            <div className="payment-method">

              <h3>
                Payment Method
              </h3>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    payment === "Cash on Delivery"
                  }
                  onChange={(e) =>
                    setPayment(e.target.value)
                  }
                />

                <span>
                  💵 Cash on Delivery
                </span>

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Online Payment"
                  checked={
                    payment === "Online Payment"
                  }
                  onChange={(e) =>
                    setPayment(e.target.value)
                  }
                />

                <span>
                  💳 Online Payment
                </span>

              </label>

            </div>

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Checkout;