
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/Homedecordetails.css";
import { API_ENDPOINTS } from '../config/api';

const Homedecordetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [homeDecor, setHomeDecor] = useState(null);

  const url = API_ENDPOINTS.homedecordesc;


  useEffect(() => {

    axios.get(`${url}/${id}`)
      .then(res => {

        setHomeDecor(res.data);

      })
      .catch(err => {

        console.log(err);

      });

  }, [id]);


  // ADD TO CART
  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct = existingCart.find(
      item =>
        item.id === homeDecor.id &&
        item.category === "homedecor"
    );


    // PRODUCT ALREADY EXISTS
    if (existingProduct) {

      alert("This product is already in your cart!");

      return;

    }


    // ADD NEW PRODUCT
    const updatedCart = [
      ...existingCart,
      {
        ...homeDecor,
        category: "homedecor",
        quantity: 1
      }
    ];


    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );


    alert("Product added to cart!");

  };


  // BUY NOW
  const buyNow = () => {

    navigate("/checkout", {

      state: {

        product: {
          ...homeDecor,
          category: "homedecor",
          quantity: 1
        }

      }

    });

  };


  if (!homeDecor) {

    return (

      <div className="loading">

        <h2>
          Loading Product...
        </h2>

      </div>

    );

  }


  return (

    <div className="homedecor-details-page">


      <div className="homedecor-product">


        {/* PRODUCT IMAGE */}

        <div className="homedecor-image-box">

          <span className="offer-badge">
            BEST SELLER
          </span>


          <img
            src={homeDecor.img}
            alt={homeDecor.name}
            className="homedecor-main-image"
          />

        </div>


        {/* PRODUCT INFORMATION */}

        <div className="homedecor-info-box">


          <p className="homedecor-brand">
            {homeDecor.brand}
          </p>


          <h1>
            {homeDecor.name}
          </h1>


          <p className="homedecor-colour">

            Colour:

            <strong>
              {homeDecor.colour}
            </strong>

          </p>


          {/* RATING */}

          <div className="rating-box">

            <span className="rating">
              ⭐ {homeDecor.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>

          </div>


          <div className="line"></div>


          {/* PRICE */}

          <div className="price-section">

            <span className="price">

              ₹{homeDecor.price.toLocaleString("en-IN")}

            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>

          </div>


          {/* QUICK DETAILS */}

          <div className="quick-details">


            <div>

              <span>
                🏠
              </span>

              <p>

                <b>
                  Room
                </b>

                {homeDecor.room_type}

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

                {homeDecor.dimensions_cm}

              </p>

            </div>


            <div>

              <span>
                🌳
              </span>

              <p>

                <b>
                  Material
                </b>

                {homeDecor.primary_material}

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

                {homeDecor.weight}

              </p>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="buttons">


            {/* ADD TO CART */}

            <button
              className="cart-btn"
              onClick={addToCart}
            >

              🛒 Add to Cart

            </button>


            {/* BUY NOW */}

            <button
              className="buy-btn"
              onClick={buyNow}
            >

              Buy Now

            </button>

          </div>


          {/* DELIVERY */}

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
              ✓ {homeDecor.assembly}
            </p>

            <p>
              ✓ {homeDecor.warranty}
            </p>

          </div>

        </div>

      </div>


      {/* PRODUCT SPECIFICATIONS */}

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
              {homeDecor.brand}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Colour
            </span>

            <strong>
              {homeDecor.colour}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Primary Material
            </span>

            <strong>
              {homeDecor.primary_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Top Material
            </span>

            <strong>
              {homeDecor.top_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Room Type
            </span>

            <strong>
              {homeDecor.room_type}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Assembly
            </span>

            <strong>
              {homeDecor.assembly}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Seating Height
            </span>

            <strong>
              {homeDecor.seating_height} inches
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Warranty
            </span>

            <strong>
              {homeDecor.warranty}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Weight
            </span>

            <strong>
              {homeDecor.weight}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Dimensions
            </span>

            <strong>
              {homeDecor.dimensions_inches}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              SKU
            </span>

            <strong>
              {homeDecor.sku}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Rating
            </span>

            <strong>
              ⭐ {homeDecor.product_rating}/5
            </strong>

          </div>


        </div>

      </div>


    </div>

  );

};


export default Homedecordetails;

