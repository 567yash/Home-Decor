
import React, { useEffect, useState } from 'react';
import "../Styles/Furniture.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Furniture = () => {

  let [Furniture, setFurniture] = useState([]);
  let [favourites, setFavourites] = useState([]);

  let url = "http://localhost:5000/furniturei";
  let favouriteUrl = "http://localhost:5000/favourites";

  const getfurniture = () => {
    axios.get(url)
      .then(res => setFurniture(res.data))
      .catch(err => console.log(err));
  };

  const getFavourites = () => {
    axios.get(favouriteUrl)
      .then(res => setFavourites(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getfurniture();
    getFavourites();
  }, []);

  const addFavourite = (product) => {

    const alreadyFavourite = favourites.some(
      item =>
        item.category === "furniture" &&
        String(item.productId) === String(product.id)
    );

    if (alreadyFavourite) {
      return;
    }

    const favouriteProduct = {
      ...product,
      productId: product.id,
      category: "furniture",
      image: product.furnitureimg
    };

    axios.post(favouriteUrl, favouriteProduct)
      .then(res => {
        setFavourites([...favourites, res.data]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="furniture-container">

      {
        Furniture.map((x) => {

          const isFavourite = favourites.some(
            item =>
              item.category === "furniture" &&
              String(item.productId) === String(x.id)
          );

          return (

            <div
              className="furniture-card"
              key={x.id}
            >

              <Link to={`/Furnituredetails/${x.id}`}>
                <img
                  src={x.furnitureimg}
                  alt={x.name}
                />
              </Link>

              <div className="furniture-info">

                <h3>{x.name}</h3>

                <p>
                  Colour: {x.colour}
                </p>

                <p className="furniture-price">
                  ₹{x.price}
                </p>

                <button
                  className="favourite-btn"
                  onClick={() => addFavourite(x)}
                >
                  {
                    isFavourite
                      ? "❤️ Favourite"
                      : "♡ Add to Favourite"
                  }
                </button>

              </div>

            </div>

          );

        })
      }

    </div>
  );
};

export default Furniture;

