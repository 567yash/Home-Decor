
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/Furnituredetails.css";

const FurnishingsDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [furnishing, setFurnishing] = useState(null);

  const url = "http://localhost:5000/furnishingsdesc";


  useEffect(() => {

    axios.get(url)
      .then(res => {

        const products = res.data;

        const product = products.find(
          item => item.id === id
        );

        setFurnishing(product);

      })
      .catch(err => {

        console.log(err);

      });

  }, [id]);


  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct = existingCart.find(
      item =>
        item.id === furnishing.id &&
        item.category === "furnishings"
    );


    if (existingProduct) {

      alert("This product is already in your cart!");

      return;

    }


    const updatedCart = [
      ...existingCart,

      {
        ...furnishing,
        category: "furnishings",
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

    navigate("/checkout", {

      state: {

        product: {

          ...furnishing,

          category: "furnishings",

          quantity: 1

        }

      }

    });

  };


  if (!furnishing) {

    return (

      <div className="loading">

        <h2>
          Loading Product...
        </h2>

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
            src={furnishing.img}
            alt={furnishing.name}
            className="furniture-main-image"
          />

        </div>


        <div className="furniture-info-box">


          <p className="furniture-brand">
            {furnishing.brand}
          </p>


          <h1>
            {furnishing.name}
          </h1>


          <p className="furniture-colour">

            Colour:

            <strong>
              {furnishing.colour}
            </strong>

          </p>


          <div className="rating-box">

            <span className="rating">
              ⭐ {furnishing.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>

          </div>


          <div className="line"></div>


          <div className="price-section">

            <span className="price">

              ₹{furnishing.price.toLocaleString("en-IN")}

            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>

          </div>


          <div className="quick-details">


            <div>

              <span>
                🏠
              </span>

              <p>

                <b>
                  Room
                </b>

                {furnishing.room_type}

              </p>

            </div>


            <div>

              <span>
                📏
              </span>

              <p>

                <b>
                  Dimensions
                </b>

                {furnishing.dimensions_cm}

              </p>

            </div>


            <div>

              <span>
                🧵
              </span>

              <p>

                <b>
                  Material
                </b>

                {furnishing.primary_material}

              </p>

            </div>


            <div>

              <span>
                ⚖️
              </span>

              <p>

                <b>
                  Weight
                </b>

                {furnishing.weight}

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
              ✓ {furnishing.assembly}
            </p>

            <p>
              ✓ {furnishing.warranty}
            </p>

          </div>


        </div>

      </div>


      <div className="specifications">

        <h2>
          Product Specifications
        </h2>


        <div className="spec-grid">


          <div className="spec-item">

            <span>
              Brand
            </span>

            <strong>
              {furnishing.brand}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Colour
            </span>

            <strong>
              {furnishing.colour}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Primary Material
            </span>

            <strong>
              {furnishing.primary_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Top Material
            </span>

            <strong>
              {furnishing.top_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Room Type
            </span>

            <strong>
              {furnishing.room_type}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Assembly
            </span>

            <strong>
              {furnishing.assembly}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Seating Height
            </span>

            <strong>
              {furnishing.seating_height} inches
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Warranty
            </span>

            <strong>
              {furnishing.warranty}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Weight
            </span>

            <strong>
              {furnishing.weight}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Dimensions
            </span>

            <strong>
              {furnishing.dimensions_inches}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              SKU
            </span>

            <strong>
              {furnishing.sku}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Rating
            </span>

            <strong>
              ⭐ {furnishing.product_rating}/5
            </strong>

          </div>


        </div>

      </div>


    </div>

  );

};


export default FurnishingsDetails;

