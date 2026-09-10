import React, { useEffect, useState } from 'react'
import "../Styles/KitchenDining.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const KitchenDining = () => {

  const [KitchenDining, setKitchenDining] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const url = API_ENDPOINTS.kitchen;
  const favouriteUrl = API_ENDPOINTS.favourites;


  const getkitchen = () => {

    axios.get(url)
      .then(res => setKitchenDining(res.data))
      .catch(err => console.log(err));

  };


  const getFavourites = () => {

    axios.get(favouriteUrl)
      .then(res => setFavourites(res.data))
      .catch(err => console.log(err));

  };


  useEffect(() => {

    getkitchen();
    getFavourites();

  }, []);


  const addFavourite = (product) => {

    const alreadyFavourite = favourites.some(
      item =>
        String(item.productId) === String(product.id) &&
        item.category === "kitchen"
    );


    if (alreadyFavourite) {

      alert("❤️ Product is already in favourites!");

      return;

    }


    const favouriteProduct = {

      productId: product.id,

      image: product.kitchenimages,

      name: product.name,

      colour: product.colour,

      price: product.price,

      category: "kitchen"

    };


    axios.post(favouriteUrl, favouriteProduct)

      .then(res => {

        setFavourites(prev => [
          ...prev,
          res.data
        ]);


      })

      .catch(err => {

        console.log(err);

        alert("❌ Failed to add favourite!");

      });

  };


  return (

    <div className='kitchen-container'>

      {
        KitchenDining.map((x) => {

          const isFavourite = favourites.some(
            item =>
              String(item.productId) === String(x.id) &&
              item.category === "kitchen"
          );


          return (

            <div
              className='kitchen-card'
              key={x.id}
            >

              <Link to={`/Kitchendiningdetails/${x.id}`}>

                <img
                  src={x.kitchenimages}
                  alt={x.name}
                />

              </Link>


              <div className='kitchen-info'>

                <h3>
                  {x.name}
                </h3>

                <p>
                  Colour: {x.colour}
                </p>

                <p className='kitchen-price'>
                  ₹{x.price}
                </p>


                <button
                  className='kitchen-favourite-btn'
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


export default KitchenDining;