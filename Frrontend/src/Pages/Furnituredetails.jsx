import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Furnituredetails.css";

const FurnitureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:5000/furnituredesc";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        let products = [];

        if (Array.isArray(data)) {
          if (Array.isArray(data[0])) {
            products = data[0];
          } else {
            products = data;
          }
        }

        const product = products.find(
          (item) =>
            String(item.id || item._id) === String(id)
        );

        setFurniture(product || null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!furniture) {
      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const productId = furniture.id || furniture._id;

    const alreadyExists = existingCart.find(
      (item) =>
        String(item.id || item._id) === String(productId) &&
        String(item.category || "").toLowerCase() ===
          "furniture"
    );

    if (alreadyExists) {
      alert("Product is already in cart!");
      return;
    }

    const cartProduct = {
      ...furniture,
      id: productId,
      img: furniture.img || furniture.furnitureimg || "",
      category: "furniture",
      quantity: 1
    };

    const updatedCart = [
      ...existingCart,
      cartProduct
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart!");
  };

  const buyNow = () => {
    if (!furniture) {
      return;
    }

    const productId = furniture.id || furniture._id;

    const buyProduct = {
      ...furniture,
      id: productId,
      img: furniture.img || furniture.furnitureimg || "",
      category: "furniture",
      quantity: 1
    };

    navigate("/checkout", {
      state: {
        product: buyProduct
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

  if (!furniture) {
    return (
      <div className="loading">
        <h2>Product Not Found</h2>

        <button
          onClick={() => navigate("/furniture")}
        >
          Back to Furniture
        </button>
      </div>
    );
  }

  return (
    <div className="furniture-page">
      <div className="furniture-product">
        <div className="furniture-image-box">
          <span className="offer-badge">
            BEST SELLER
          </span>

          <img
            src={
              furniture.img ||
              furniture.furnitureimg ||
              ""
            }
            alt={furniture.name}
            className="furniture-main-image"
          />
        </div>

        <div className="furniture-info-box">
          <p className="furniture-brand">
            {furniture.brand}
          </p>

          <h1>{furniture.name}</h1>

          <p className="furniture-colour">
            Colour:
            <strong>{furniture.colour}</strong>
          </p>

          <div className="rating-box">
            <span className="rating">
              ⭐ {furniture.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>
          </div>

          <div className="line"></div>

          <div className="price-section">
            <span className="price">
              ₹
              {Number(
                furniture.price || 0
              ).toLocaleString("en-IN")}
            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>
          </div>

          <div className="quick-details">
            <div>
              <span>🛋️</span>

              <p>
                <b>Room</b>
                {furniture.room_type}
              </p>
            </div>

            <div>
              <span>📏</span>

              <p>
                <b>Dimensions</b>
                {furniture.dimensions_cm}
              </p>
            </div>

            <div>
              <span>🌳</span>

              <p>
                <b>Material</b>
                {furniture.primary_material}
              </p>
            </div>

            <div>
              <span>⚖️</span>

              <p>
                <b>Weight</b>
                {furniture.weight}
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
              ✓ Professional assembly available
            </p>

            <p>
              ✓ {furniture.warranty}
            </p>
          </div>
        </div>
      </div>

      <div className="specifications">
        <h2>Product Specifications</h2>

        <div className="spec-grid">
          <div className="spec-item">
            <span>Brand</span>
            <strong>
              {furniture.brand}
            </strong>
          </div>

          <div className="spec-item">
            <span>Colour</span>
            <strong>
              {furniture.colour}
            </strong>
          </div>

          <div className="spec-item">
            <span>Primary Material</span>
            <strong>
              {furniture.primary_material}
            </strong>
          </div>

          <div className="spec-item">
            <span>Top Material</span>
            <strong>
              {furniture.top_material}
            </strong>
          </div>

          <div className="spec-item">
            <span>Room Type</span>
            <strong>
              {furniture.room_type}
            </strong>
          </div>

          <div className="spec-item">
            <span>Assembly</span>
            <strong>
              {furniture.assembly}
            </strong>
          </div>

          <div className="spec-item">
            <span>Seating Height</span>
            <strong>
              {furniture.seating_height} inches
            </strong>
          </div>

          <div className="spec-item">
            <span>Warranty</span>
            <strong>
              {furniture.warranty}
            </strong>
          </div>

          <div className="spec-item">
            <span>Weight</span>
            <strong>
              {furniture.weight}
            </strong>
          </div>

          <div className="spec-item">
            <span>Dimensions</span>
            <strong>
              {furniture.dimensions_inches}
            </strong>
          </div>

          <div className="spec-item">
            <span>SKU</span>
            <strong>
              {furniture.sku}
            </strong>
          </div>

          <div className="spec-item">
            <span>Rating</span>
            <strong>
              ⭐ {furniture.product_rating}/5
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureDetails;

