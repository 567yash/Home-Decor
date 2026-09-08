
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/KitchenDiningdetails.css";

const KitchenDiningDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [kitchen, setKitchen] = useState(null);

  const url = "http://localhost:5000/kitchendesc";


  useEffect(() => {

    axios.get(url)
      .then(res => {

        const products = res.data;

        const product = products.find(
          item => item.id === id
        );

        setKitchen(product);

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
        item.id === kitchen.id &&
        item.category === "kitchen"
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
        ...kitchen,
        category: "kitchen",
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
          ...kitchen,
          category: "kitchen",
          quantity: 1
        }

      }

    });

  };


  if (!kitchen) {

    return (

      <div className="loading">

        <h2>
          Loading Product...
        </h2>

      </div>

    );

  }


  return (

    <div className="kitchen-page">


      <div className="kitchen-product">


        <div className="kitchen-image-box">

          <span className="offer-badge">
            BEST SELLER
          </span>


          <img
            src={kitchen.img}
            alt={kitchen.name}
            className="kitchen-main-image"
          />

        </div>


        <div className="kitchen-info-box">


          <p className="kitchen-brand">
            {kitchen.brand}
          </p>


          <h1>
            {kitchen.name}
          </h1>


          <p className="kitchen-colour">

            Colour:

            <strong>
              {kitchen.colour}
            </strong>

          </p>


          <div className="rating-box">

            <span className="rating">
              ⭐ {kitchen.product_rating}
            </span>

            <span className="rating-text">
              Excellent Rating
            </span>

          </div>


          <div className="line"></div>


          <div className="price-section">

            <span className="price">

              ₹{kitchen.price.toLocaleString("en-IN")}

            </span>

            <span className="tax">
              Inclusive of all taxes
            </span>

          </div>


          <div className="quick-details">


            <div>

              <span>
                🍽️
              </span>

              <p>

                <b>
                  Room
                </b>

                {kitchen.room_type}

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

                {kitchen.dimensions_cm}

              </p>

            </div>


            <div>

              <span>
                🏺
              </span>

              <p>

                <b>
                  Material
                </b>

                {kitchen.primary_material}

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

                {kitchen.weight}

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
              ✓ {kitchen.assembly}
            </p>


            <p>
              ✓ {kitchen.warranty}
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
              {kitchen.brand}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Colour
            </span>

            <strong>
              {kitchen.colour}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Primary Material
            </span>

            <strong>
              {kitchen.primary_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Top Material
            </span>

            <strong>
              {kitchen.top_material}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Room Type
            </span>

            <strong>
              {kitchen.room_type}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Assembly
            </span>

            <strong>
              {kitchen.assembly}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Seating Height
            </span>

            <strong>
              {kitchen.seating_height} inches
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Warranty
            </span>

            <strong>
              {kitchen.warranty}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Weight
            </span>

            <strong>
              {kitchen.weight}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Dimensions
            </span>

            <strong>
              {kitchen.dimensions_inches}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              SKU
            </span>

            <strong>
              {kitchen.sku}
            </strong>

          </div>


          <div className="spec-item">

            <span>
              Rating
            </span>

            <strong>
              ⭐ {kitchen.product_rating}/5
            </strong>

          </div>


        </div>

      </div>


    </div>

  );

};


export default KitchenDiningDetails;

