
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/Sofadetails.css";
import { API_ENDPOINTS } from '../config/api';

const Sofadetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [sofa, setSofa] = useState(null);

  const url = API_ENDPOINTS.sofadesc;


  useEffect(() => {

    axios.get(`${url}/${id}`)
      .then(res => {

        setSofa(res.data);

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
        String(item.id) === String(sofa.id) &&
        item.category === "sofa"
    );


    let updatedCart;


    if (existingProduct) {

      updatedCart = existingCart.map(item => {

        if (
          String(item.id) === String(sofa.id) &&
          item.category === "sofa"
        ) {

          return {
            ...item,
            quantity: (item.quantity || 1) + 1
          };

        }

        return item;

      });

    } else {

      updatedCart = [
        ...existingCart,

        {
          ...sofa,
          category: "sofa",
          quantity: 1
        }

      ];

    }


    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );


    alert("Sofa added to cart!");

  };


  const buyNow = () => {

    navigate("/checkout", {

      state: {

        product: {

          ...sofa,

          category: "sofa",

          quantity: 1

        }

      }

    });

  };


  if (!sofa) {

    return (

      <div className="loading">

        <h2>
          Loading Product...
        </h2>

      </div>

    );

  }


  return (

    <div className="sofa-page">


      <div className="sofa-product">


        <div className="sofa-image-box">

          <span className="offer-badge">
            BEST SELLER
          </span>


          <img
            src={sofa.img}
            alt={sofa.name}
            className="sofa-main-image"
          />

        </div>


        <div className="sofa-info-box">


          <p className="sofa-brand">
            {sofa.brand}
          </p>


          <h1>
            {sofa.name}
          </h1>


          <p className="sofa-colour">

            Colour:

            <strong>
              {sofa.colour}
            </strong>

          </p>


          <div className="rating-box">

            <span className="rating">
              ⭐ {sofa.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>

          </div>


          <div className="line"></div>


          <div className="price-section">

            <span className="price">

              ₹{sofa.price.toLocaleString("en-IN")}

            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>

          </div>


          <div className="quick-details">


            <div>

              <span>
                🛋️
              </span>

              <p>

                <b>
                  Room
                </b>

                {sofa.room_type}

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

                {sofa.dimensions_cm}

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

                {sofa.primary_material}

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

                {sofa.weight}

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
              ✓ {sofa.warranty}
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
              {sofa.brand}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Colour
            </span>

            <strong>
              {sofa.colour}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Primary Material
            </span>

            <strong>
              {sofa.primary_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Top Material
            </span>

            <strong>
              {sofa.top_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Room Type
            </span>

            <strong>
              {sofa.room_type}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Assembly
            </span>

            <strong>
              {sofa.assembly}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Seating Height
            </span>

            <strong>
              {sofa.seating_height} inches
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Warranty
            </span>

            <strong>
              {sofa.warranty}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Weight
            </span>

            <strong>
              {sofa.weight}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Dimensions
            </span>

            <strong>
              {sofa.dimensions_inches}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              SKU
            </span>

            <strong>
              {sofa.sku}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Rating
            </span>

            <strong>
              ⭐ {sofa.product_rating}/5
            </strong>

          </div>


        </div>

      </div>


    </div>

  );

};


export default Sofadetails;

