import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const getProductId = (item) => {
    return item.id || item._id || item.productId;
  };

  const getCategory = (item) => {
    if (item.category) {
      return String(item.category)
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .replace(/_/g, "");
    }

    if (
      item.furnitureimg ||
      item.primary_material ||
      item.room_type ||
      item.dimensions_cm ||
      item.dimensions_inches
    ) {
      return "furniture";
    }

    if (item.sofaimg || item.sofa_image) {
      return "sofa";
    }

    if (
      item.lampimg ||
      item.lampimmg ||
      item.lampimage
    ) {
      return "lamplighting";
    }

    if (item.kitchenimg) {
      return "kitchendining";
    }

    if (item.homeimg) {
      return "homedecor";
    }

    if (
      item.furnishingimg ||
      item.furnishingsimg
    ) {
      return "furnishings";
    }

    return "";
  };

  const removeFromCart = (id, category) => {
    const updatedCart = cart.filter((item) => {
      const itemId = getProductId(item);
      const itemCategory = getCategory(item);

      return !(
        String(itemId) === String(id) &&
        itemCategory === String(category).toLowerCase()
      );
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeAllFromCart = () => {
    if (cart.length === 0) {
      alert("Your cart is already empty!");
      return;
    }

    const confirmRemove = window.confirm(
      "Are you sure you want to remove all products from your cart?"
    );

    if (!confirmRemove) {
      return;
    }

    setCart([]);
    localStorage.removeItem("cart");

    alert("All products have been removed from your cart!");
  };

  const increaseQuantity = (id, category) => {
    const updatedCart = cart.map((item) => {
      const itemId = getProductId(item);
      const itemCategory = getCategory(item);

      if (
        String(itemId) === String(id) &&
        itemCategory === String(category).toLowerCase()
      ) {
        return {
          ...item,
          quantity: Number(item.quantity || 1) + 1
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (id, category) => {
    const updatedCart = cart.map((item) => {
      const itemId = getProductId(item);
      const itemCategory = getCategory(item);

      if (
        String(itemId) === String(id) &&
        itemCategory === String(category).toLowerCase()
      ) {
        const quantity = Number(item.quantity || 1);

        if (quantity > 1) {
          return {
            ...item,
            quantity: quantity - 1
          };
        }
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout", {
      state: {
        cart: cart,
        totalItems: totalItems,
        totalPrice: totalPrice
      }
    });
  };

  const openProductDetails = (item) => {
    const id = getProductId(item);
    const category = getCategory(item);

    console.log("Cart Product:", item);
    console.log("Product ID:", id);
    console.log("Detected Category:", category);

    if (!id) {
      alert("Product ID not found!");
      return;
    }

    if (
      category === "furniture" ||
      category === "furnitures"
    ) {
      navigate(`/Furnituredetails/${id}`);
      return;
    }

    if (
      category === "sofa" ||
      category === "sofas" ||
      category === "sofamattress"
    ) {
      navigate(`/sofadetails/${id}`);
      return;
    }

    if (
      category === "lamp" ||
      category === "lamplighting" ||
      category === "lighting" ||
      category === "lamps"
    ) {
      navigate(`/Lamplightingsdetails/${id}`);
      return;
    }

    if (
      category === "kitchen" ||
      category === "kitchendining"
    ) {
      navigate(`/kitchendiningdetails/${id}`);
      return;
    }

    if (
      category === "homedecor" ||
      category === "homedecoration"
    ) {
      navigate(`/homedecordetails/${id}`);
      return;
    }

    if (
      category === "furnishings" ||
      category === "furnishing"
    ) {
      navigate(`/furnishingsdetails/${id}`);
      return;
    }

    alert("Product details page not found!");
  };

  return (
    <div className="cart-page">
      <h1>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <p>
            Add products to your cart and they will
            appear here.
          </p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <button
              className="remove-all-btn"
              onClick={removeAllFromCart}
            >
              🗑️ Remove All
            </button>

            {cart.map((item) => {
              const itemId = getProductId(item);
              const itemCategory = getCategory(item);

              return (
                <div
                  className="cart-item"
                  key={`${itemCategory}-${itemId}`}
                >
                  <div
                    className="cart-product-click"
                    onClick={() =>
                      openProductDetails(item)
                    }
                  >
                    <img
                      src={
                        item.img ||
                        item.furnitureimg ||
                        item.sofaimg ||
                        item.lampimg ||
                        item.lampimmg ||
                        item.lampimage ||
                        item.kitchenimg ||
                        item.homeimg ||
                        item.furnishingimg ||
                        item.furnishingsimg ||
                        ""
                      }
                      alt={item.name}
                    />

                    <div className="cart-details">
                      <h2>{item.name}</h2>

                      {item.brand && (
                        <p>
                          Brand: {item.brand}
                        </p>
                      )}

                      {item.colour && (
                        <p>
                          Colour: {item.colour}
                        </p>
                      )}

                      <h3>
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString("en-IN")}
                      </h3>
                    </div>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            itemId,
                            itemCategory
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            itemId,
                            itemCategory
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(
                          itemId,
                          itemCategory
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ₹
                {totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>

              <strong>
                ₹
                {totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              className="checkout-btn"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

