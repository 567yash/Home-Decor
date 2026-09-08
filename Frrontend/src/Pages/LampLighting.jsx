
import React, { useEffect, useState } from "react";
import "../Styles/LampLighting.css";
import axios from "axios";
import { Link } from "react-router-dom";

const LampLighting = () => {
  const [LampLighting, setLampLighting] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const url = "http://localhost:5000/lampimg";
  const favouriteUrl = "http://localhost:5000/favourites";

  const getlamplights = () => {
    axios
      .get(url)
      .then((res) => setLampLighting(res.data))
      .catch((err) => console.log(err));
  };

  const getFavourites = () => {
    axios
      .get(favouriteUrl)
      .then((res) => setFavourites(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getlamplights();
    getFavourites();
  }, []);

  const addFavourite = (product) => {
    const alreadyFavourite = favourites.some(
      (item) =>
        String(item.productId) === String(product.id) &&
        item.category === "lamp"
    );

    if (alreadyFavourite) {
      alert("❤️ Product is already in favourites!");
      return;
    }

    const favouriteProduct = {
      productId: product.id,
      image: product.lampimmg,
      name: product.name,
      colour: product.colour,
      price: product.price,
      category: "lamp"
    };

    axios
      .post(favouriteUrl, favouriteProduct)
      .then((res) => {
        setFavourites((prev) => [
          ...prev,
          res.data
        ]);
      })
      .catch((err) => {
        console.log(err);
        alert("❌ Failed to add lamp!");
      });
  };

  return (
    <div className="lamp-container">
      {LampLighting.map((x) => {
        const isFavourite = favourites.some(
          (item) =>
            String(item.productId) === String(x.id) &&
            item.category === "lamp"
        );

        return (
          <div
            className="lamp-card"
            key={x.id}
          >
            <Link
              to={`/Lamplightingsdetails/${x.id}`}
            >
              <img
                src={x.lampimmg || x.img}
                alt={x.name}
              />
            </Link>

            <div className="lamp-info">
              <h3>{x.name}</h3>

              <p className="lamp-price">
                Price: ₹{x.price}
              </p>

              <button
                className="lamp-favourite-btn"
                onClick={() => addFavourite(x)}
              >
                {isFavourite
                  ? "❤️ Favourite"
                  : "♡ Add to Favourite"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LampLighting;

