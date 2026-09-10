
import React, { useEffect, useState } from 'react';
import "../Styles/HomeDecor.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const HomeDecor = () => {

  let [HomeDecor, setHomeDecor] = useState([]);
  let [favourites, setFavourites] = useState([]);

  let url = API_ENDPOINTS.homedecor;
  let favouriteUrl = API_ENDPOINTS.favourites;

  const gethomedecor = () => {

    axios.get(url)
      .then(res => setHomeDecor(res.data))
      .catch(err => console.log(err));

  };

  const getFavourites = () => {

    axios.get(favouriteUrl)
      .then(res => setFavourites(res.data))
      .catch(err => console.log(err));

  };

  useEffect(() => {

    gethomedecor();
    getFavourites();

  }, []);

  const addFavourite = (product) => {

    const alreadyFavourite = favourites.some(
      item =>
        item.category === "homedecor" &&
        String(item.productId) === String(product.id)
    );

    if (alreadyFavourite) {
      return;
    }

    const favouriteProduct = {

      productId: product.id,

      image: product.image,

      name: product.name,

      colour: product.colour,

      price: product.price,

      category: "homedecor"

    };

    axios.post(favouriteUrl, favouriteProduct)

      .then(res => {

        setFavourites([
          ...favourites,
          res.data
        ]);

      })

      .catch(err => console.log(err));

  };

  return (

    <div className="homedecor-container">

      {
        HomeDecor.map((x) => {

          const isFavourite = favourites.some(
            item =>
              item.category === "homedecor" &&
              String(item.productId) === String(x.id)
          );

          return (

            <div
              className="homedecor-card"
              key={x.id}
            >

              <Link to={`/Homedecordetails/${x.id}`}>

                <img
                  src={x.image}
                  alt={x.name}
                />

              </Link>

              <div className="homedecor-info">

                <h3>
                  {x.name}
                </h3>

                <p>
                  Colour: {x.colour}
                </p>

                <p className="homedecor-price">
                  ₹{x.price}
                </p>

                <button
                  className="homedecor-favourite-btn"
                  onClick={() => addFavourite(x)}
                >
                  {isFavourite
                    ? "❤️ Favourite"
                    : "♡ Add to Favourite"}
                </button>

              </div>

            </div>

          );

        })
      }

    </div>

  );

};

export default HomeDecor;

