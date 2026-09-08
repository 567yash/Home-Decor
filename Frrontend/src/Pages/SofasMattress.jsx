import React, { useEffect, useState } from 'react'
import "../Styles/SofasMattress.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const SofasMattress = () => {

  const [SofasMattress, setSofasMattress] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const url = "http://localhost:5000/sofas";
  const favouriteUrl = "http://localhost:5000/favourites";


  const getsofa = () => {

    axios.get(url)
      .then(res => setSofasMattress(res.data))
      .catch(err => console.log(err));

  };


  const getFavourites = () => {

    axios.get(favouriteUrl)
      .then(res => setFavourites(res.data))
      .catch(err => console.log(err));

  };


  useEffect(() => {

    getsofa();
    getFavourites();

  }, []);


  const addFavourite = (product) => {

    const alreadyFavourite = favourites.some(
      item =>
        String(item.productId) === String(product.id) &&
        item.category === "sofa"
    );


    if (alreadyFavourite) {

      alert(" Product is already in favourites!");

      return;

    }


    const favouriteProduct = {

      productId: product.id,

      image: product.img,

      name: product.name,

      colour: product.colour,

      price: product.price,

      category: "sofa"

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

        alert(" Failed to add sofa!");

      });

  };


  return (

    <div className='sofa-container'>

      {

        SofasMattress.map((x) => {

          const isFavourite = favourites.some(
            item =>
              String(item.productId) === String(x.id) &&
              item.category === "sofa"
          );


          return (

            <div
              className='sofa-card'
              key={x.id}
            >

              <Link to={`/Sofadetails/${x.id}`}>

                <img
                  src={x.img}
                  alt={x.name}
                />

              </Link>


              <div className='sofa-info'>

                <h3>{x.name}</h3>

                <p>
                  Colour: {x.colour}
                </p>

                <p className='sofa-price'>
                  ₹{x.price}
                </p>


                <button
                  className='sofa-favourite-btn'
                  onClick={() => addFavourite(x)}
                >

                  {
                    isFavourite
                      ? " ❤️ Favourite"
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

export default SofasMattress;