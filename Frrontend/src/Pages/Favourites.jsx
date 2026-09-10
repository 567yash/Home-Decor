
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Favourites.css";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const url = API_ENDPOINTS.favourites;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log("Favourite Data:", res.data);
        setFavourites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeFavourite = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setFavourites((prev) =>
          prev.filter(
            (item) => String(item.id) !== String(id)
          )
        );
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to remove favourite.");
      });
  };

  const removeAllFavourites = async () => {
    if (favourites.length === 0) {
      alert("Your favourites are already empty!");
      return;
    }

    const confirmRemove = window.confirm(
      "Are you sure you want to remove all favourites?"
    );

    if (!confirmRemove) {
      return;
    }

    try {
      await Promise.all(
        favourites.map((item) =>
          axios.delete(`${url}/${item.id}`)
        )
      );

      setFavourites([]);

      alert("All favourites have been removed!");
    } catch (err) {
      console.log(err);
      alert("Failed to remove all favourites.");
    }
  };

  const getImage = (product) => {
    return (
      product.image ||
      product.furnitureimg ||
      product.imagefurnishings ||
      product.sofaimg ||
      product.lampimmg ||
      product.kitchenimg ||
      product.homedecorimg ||
      product.img ||
      ""
    );
  };

  const openProduct = (product) => {
    console.log("Clicked Favourite:", product);

    const productId =
      product.productId ||
      product.originalId ||
      product.id;

    if (!productId) {
      alert("Product ID is missing.");
      return;
    }

    const category = String(product.category || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace(/_/g, "");

    if (
      category === "kitchen" ||
      category === "kitchendining"
    ) {
      navigate(
        `/Kitchendiningdetails/${productId}`
      );
      return;
    }

    if (
      category === "sofa" ||
      category === "sofas" ||
      category === "sofamattress"
    ) {
      navigate(
        `/Sofadetails/${productId}`
      );
      return;
    }

    if (
      category === "lamp" ||
      category === "lamplighting" ||
      category === "lighting" ||
      category === "lamps"
    ) {
      navigate(
        `/Lamplightingsdetails/${productId}`
      );
      return;
    }

    if (
      category === "furnishings" ||
      category === "furnishing"
    ) {
      navigate(
        `/FurnishingsDetails/${productId}`
      );
      return;
    }

    if (category === "furniture") {
      navigate(
        `/Furnituredetails/${productId}`
      );
      return;
    }

    if (category === "homedecor") {
      navigate(
        `/Homedecordetails/${productId}`
      );
      return;
    }

    alert(
      "Product details page not found. Category: " +
        product.category
    );
  };

  return (
    <div className="favourites-page">
      <div className="favourites-header">
        <h1>My Favourites</h1>

        {favourites.length > 0 && (
          <button
            className="remove-all-favourites"
            onClick={removeAllFavourites}
          >
            🗑️ Remove All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="no-favourites">
          <h2>No Favourites Yet</h2>

          <p>
            Add your favourite products and they
            will appear here.
          </p>
        </div>
      ) : (
        <div className="favourites-container">
          {favourites.map((x) => (
            <div
              className="favourite-card"
              key={x.id}
            >
              <img
                src={getImage(x)}
                alt={x.name}
                className="favourite-product-image"
                onClick={() => openProduct(x)}
              />

              <div className="favourite-info">
                <h3
                  className="favourite-product-name"
                  onClick={() => openProduct(x)}
                >
                  {x.name}
                </h3>

                <p>
                  Colour: {x.colour}
                </p>

                <p className="favourite-price">
                  ₹
                  {Number(
                    x.price || 0
                  ).toLocaleString("en-IN")}
                </p>

                <button
                  className="remove-favourite"
                  onClick={() =>
                    removeFavourite(x.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;

