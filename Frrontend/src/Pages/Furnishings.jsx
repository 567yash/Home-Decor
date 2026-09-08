
import React, { useEffect, useState } from 'react';
import "../Styles/Furnishings.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Furnishings = () => {

  let [Furnishings, setFurnishings] = useState([]);
  let [favourites, setFavourites] = useState([]);

  let url = "http://localhost:5000/furnishingsi";
  let favouriteUrl = "http://localhost:5000/favourites";

  const getfurnishings = () => {

    axios.get(url)
      .then(res => setFurnishings(res.data))
      .catch(err => console.log(err));

  };

  const getFavourites = () => {

    axios.get(favouriteUrl)
      .then(res => setFavourites(res.data))
      .catch(err => console.log(err));

  };

  useEffect(() => {

    getfurnishings();
    getFavourites();

  }, []);


  const addFavourite = (product) => {

    const alreadyFavourite = favourites.some(
      item =>
        item.category === "furnishings" &&
        String(item.productId) === String(product.id)
    );

    if (alreadyFavourite) {

      alert("Already added to favourites");
      return;

    }

    const favouriteProduct = {

      ...product,

      id: undefined,

      productId: product.id,

      image: product.imagefurnishings,

      category: "furnishings"

    };

    axios.post(favouriteUrl, favouriteProduct)
      .then(res => {

        setFavourites([...favourites, res.data]);

        
      })
      .catch(err => console.log(err));

  };


  return (

    <div className="furnishings-container">

      {Furnishings.map((x) => {

        const isFavourite = favourites.some(
          item =>
            item.category === "furnishings" &&
            String(item.productId) === String(x.id)
        );

        return (

          <div
            className="furnishings-card"
            key={x.id}
          >

            <Link to={`/FurnishingsDetails/${x.id}`}>

              <img
                src={x.imagefurnishings}
                alt={x.name}
              />

            </Link>

            <div className="furnishings-info">

              <h3>{x.name}</h3>

              <p>
                Colour: {x.colour}
              </p>

              <p className="furnishings-price">
                ₹{x.price}
              </p>

              <button
                className="favourite-btn"
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

export default Furnishings;
