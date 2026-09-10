import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/EditProduct.css";
import { API_BASE_URL } from "../../config/api";

const EditProduct = () => {

  const { category, id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    img: "",
    name: "",
    brand: "",
    colour: "",
    price: "",
    assembly: "",
    dimensions_cm: "",
    dimensions_inches: "",
    primary_material: "",
    product_rating: "",
    room_type: "",
    seating_height: "",
    top_material: "",
    warranty: "",
    weight: "",
    sku: ""
  });

  const categories = {
    furnituredesc: `${API_BASE_URL}/furnituredesc`,
    homedecordesc: `${API_BASE_URL}/homedecordesc`,
    furnishingsdesc: `${API_BASE_URL}/furnishingsdesc`,
    kitchendiningdesc: `${API_BASE_URL}/kitchendiningdesc`,
    sofasdesc: `${API_BASE_URL}/sofasdesc`,
    lampdesc: `${API_BASE_URL}/lampdesc`
  };

  const url = categories[category];


  useEffect(() => {

    if (!url) {
      return;
    }

    axios
      .get(url)
      .then(res => {

        const data = Array.isArray(res.data[0])
          ? res.data[0]
          : res.data;

        const selectedProduct = data.find(
          item => String(item.id) === String(id)
        );

        if (selectedProduct) {
          setProduct(selectedProduct);
        }

      })
      .catch(err => {

        console.log(err);

      });

  }, [url, id]);


  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };


  const updateProduct = (e) => {

    e.preventDefault();

    const updatedProduct = {
      ...product,
      id: product.id,
      price: Number(product.price),
      product_rating: Number(product.product_rating),
      seating_height: Number(product.seating_height)
    };

    axios
      .put(`${url}/${id}`, updatedProduct)
      .then(() => {

        alert("Product Updated Successfully");

        navigate("/admin/products");

      })
      .catch(err => {

        console.log(err);

        alert("Product Update Failed");

      });

  };


  return (

    <div className="edit-product-page">

      <div className="edit-product-header">

        <div>
          <h1>Edit Product</h1>
          <p>Update your product information</p>
        </div>

        <button
          onClick={() => navigate("/admin/products")}
        >
          Back to Products
        </button>

      </div>


      <div className="edit-product-container">

        <form onSubmit={updateProduct}>

          <div className="edit-section">

            <h2>Product Image</h2>

            <div className="edit-image-area">

              {product.img ? (
  <img
    src={product.img}
    alt={product.name}
  />
) : (
  <div className="image-loading">
    Loading image...
  </div>
)}

              <div className="edit-image-input">

                <label>Product Image URL</label>

                <input
                  type="url"
                  name="img"
                  value={product.img}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>


          <div className="edit-section">

            <h2>Basic Information</h2>

            <div className="edit-row">

              <div className="edit-group">

                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Brand</label>

                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-row">

              <div className="edit-group">

                <label>Colour</label>

                <input
                  type="text"
                  name="colour"
                  value={product.colour}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>


          <div className="edit-section">

            <h2>Product Details</h2>

            <div className="edit-row">

              <div className="edit-group">

                <label>Assembly</label>

                <input
                  type="text"
                  name="assembly"
                  value={product.assembly}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Primary Material</label>

                <input
                  type="text"
                  name="primary_material"
                  value={product.primary_material}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-row">

              <div className="edit-group">

                <label>Dimensions CM</label>

                <input
                  type="text"
                  name="dimensions_cm"
                  value={product.dimensions_cm}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Dimensions Inches</label>

                <input
                  type="text"
                  name="dimensions_inches"
                  value={product.dimensions_inches}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-row">

              <div className="edit-group">

                <label>Room Type</label>

                <input
                  type="text"
                  name="room_type"
                  value={product.room_type}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Top Material</label>

                <input
                  type="text"
                  name="top_material"
                  value={product.top_material}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-row">

              <div className="edit-group">

                <label>Product Rating</label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="product_rating"
                  value={product.product_rating}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Seating Height</label>

                <input
                  type="number"
                  name="seating_height"
                  value={product.seating_height}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-row">

              <div className="edit-group">

                <label>Warranty</label>

                <input
                  type="text"
                  name="warranty"
                  value={product.warranty}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-group">

                <label>Weight</label>

                <input
                  type="text"
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-group">

              <label>SKU</label>

              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="edit-actions">

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>

            <button type="submit">
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditProduct;