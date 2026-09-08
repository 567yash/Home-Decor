import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/LampLightingdetails.css";

const LampLightingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lamp, setLamp] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:5000/lampdesc";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : [];

        const product = products.find(
          (item) =>
            String(item.id) === String(id)
        );

        setLamp(product || null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!lamp) {
      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) =>
        String(item.id) === String(lamp.id) &&
        item.category === "lamp"
    );

    if (existingProduct) {
      alert("This product is already in your cart!");
      return;
    }

    const updatedCart = [
      ...existingCart,
      {
        ...lamp,
        category: "lamp",
        img: lamp.img || lamp.lampimmg,
        quantity: 1
      }
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart!");
  };

  const buyNow = () => {
    if (!lamp) {
      return;
    }

    navigate("/checkout", {
      state: {
        product: {
          ...lamp,
          category: "lamp",
          img: lamp.img || lamp.lampimmg,
          quantity: 1
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!lamp) {
    return (
      <div className="loading">
        <h2>Product Not Found</h2>

        <button
          onClick={() => navigate("/lamplighting")}
        >
          Back to Lamp & Lighting
        </button>
      </div>
    );
  }

  return (
    <div className="lamp-page">
      <div className="lamp-product">
        <div className="lamp-image-box">
          <span className="offer-badge">
            BEST SELLER
          </span>

          <img
            src={
              lamp.img ||
              lamp.lampimmg ||
              lamp.lampimg
            }
            alt={lamp.name}
            className="lamp-main-image"
          />
        </div>

        <div className="lamp-info-box">
          <p className="lamp-brand">
            {lamp.brand}
          </p>

          <h1>{lamp.name}</h1>

          <p className="lamp-colour">
            Colour:
            <strong>{lamp.colour}</strong>
          </p>

          <div className="rating-box">
            <span className="rating">
              ⭐ {lamp.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>
          </div>

          <div className="line"></div>

          <div className="price-section">
            <span className="price">
              ₹
              {Number(lamp.price || 0).toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>
          </div>

          <div className="quick-details">
            <div>
              <span>💡</span>

              <p>
                <b>Room</b>
                {lamp.room_type}
              </p>
            </div>

            <div>
              <span>📏</span>

              <p>
                <b>Dimensions</b>
                {lamp.dimensions_cm}
              </p>
            </div>

            <div>
              <span>🔩</span>

              <p>
                <b>Material</b>
                {lamp.primary_material}
              </p>
            </div>

            <div>
              <span>⚖️</span>

              <p>
                <b>Weight</b>
                {lamp.weight}
              </p>
            </div>
          </div>

          <div className="buttons">
            <button
              className="cart-btn"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>

          <div className="delivery-box">
            <h3>
              🚚 Delivery & Services
            </h3>

            <p>
              ✓ Free delivery available
            </p>

            <p>
              ✓ Safe and secure packaging
            </p>

            <p>
              ✓ {lamp.assembly}
            </p>

            <p>
              ✓ {lamp.warranty}
            </p>
          </div>
        </div>
      </div>

      <div className="specifications">
        <h2>Product Specifications</h2>

        <div className="spec-grid">
          <div className="spec-item">
            <span>Brand</span>
            <strong>{lamp.brand}</strong>
          </div>

          <div className="spec-item">
            <span>Colour</span>
            <strong>{lamp.colour}</strong>
          </div>

          <div className="spec-item">
            <span>Primary Material</span>
            <strong>
              {lamp.primary_material}
            </strong>
          </div>

          <div className="spec-item">
            <span>Top Material</span>
            <strong>
              {lamp.top_material}
            </strong>
          </div>

          <div className="spec-item">
            <span>Room Type</span>
            <strong>{lamp.room_type}</strong>
          </div>

          <div className="spec-item">
            <span>Assembly</span>
            <strong>{lamp.assembly}</strong>
          </div>

          <div className="spec-item">
            <span>Seating Height</span>
            <strong>
              {lamp.seating_height} inches
            </strong>
          </div>

          <div className="spec-item">
            <span>Warranty</span>
            <strong>{lamp.warranty}</strong>
          </div>

          <div className="spec-item">
            <span>Weight</span>
            <strong>{lamp.weight}</strong>
          </div>

          <div className="spec-item">
            <span>Dimensions</span>
            <strong>
              {lamp.dimensions_inches}
            </strong>
          </div>

          <div className="spec-item">
            <span>SKU</span>
            <strong>{lamp.sku}</strong>
          </div>

          <div className="spec-item">
            <span>Rating</span>
            <strong>
              ⭐ {lamp.product_rating}/5
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampLightingDetails;

