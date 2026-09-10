import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/AddProduct.css";
import { API_BASE_URL } from "../../config/api";

const AddProduct = () => {

  const navigate = useNavigate();

  const [category, setCategory] = useState("furnituredesc");

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

  const categories = [
    {
      name: "Furniture",
      key: "furnituredesc",
      url: `${API_BASE_URL}/furnituredesc`
    },
    {
      name: "Home Decor",
      key: "homedecordesc",
      url: `${API_BASE_URL}/homedecordesc`
    },
    {
      name: "Furnishings",
      key: "furnishingsdesc",
      url: `${API_BASE_URL}/furnishingsdesc`
    },
    {
      name: "Kitchen & Dining",
      key: "kitchendiningdesc",
      url: `${API_BASE_URL}/kitchendiningdesc`
    },
    {
      name: "Sofas & Mattress",
      key: "sofasdesc",
      url: `${API_BASE_URL}/sofasdesc`
    },
    {
      name: "Lamp & Lighting",
      key: "lampdesc",
      url: `${API_BASE_URL}/lampdesc`
    }
  ];


  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };


  const addProduct = (e) => {

    e.preventDefault();

    const selectedCategory = categories.find(
      item => item.key === category
    );

    if (!selectedCategory) {
      alert("Category Not Found");
      return;
    }

    axios
      .get(selectedCategory.url)
      .then(res => {

        let products = res.data;

        if (Array.isArray(products[0])) {
          products = products[0];
        }

        const usedIds = products
          .map(item => Number(item.id))
          .filter(id => Number.isInteger(id) && id > 0);

        let newId = 1;

        while (usedIds.includes(newId)) {
          newId++;
        }

        const data = {
          id: String(newId),
          img: product.img,
          name: product.name,
          brand: product.brand,
          colour: product.colour,
          price: Number(product.price),
          assembly: product.assembly,
          dimensions_cm: product.dimensions_cm,
          dimensions_inches: product.dimensions_inches,
          primary_material: product.primary_material,
          product_rating: Number(product.product_rating),
          room_type: product.room_type,
          seating_height: Number(product.seating_height),
          top_material: product.top_material,
          warranty: product.warranty,
          weight: product.weight,
          sku: product.sku
        };

        axios
          .post(selectedCategory.url, data)
          .then(() => {

            alert(`Product Added Successfully. Product ID: ${newId}`);

            navigate("/admin/products");

          })
          .catch(err => {

            console.log(err);

            alert("Product Add Failed");

          });

      })
      .catch(err => {

        console.log(err);

        alert("Product Fetch Failed");

      });

  };


  return (

    <div className="add-product-page">

      <div className="add-product-header">

        <div>

          <h1>Add Product</h1>

          <p>
            Add a new product to your Home Decor store
          </p>

        </div>


        <button
          className="back-product-btn"
          onClick={() => navigate("/admin/products")}
        >
          Back to Products
        </button>

      </div>


      <div className="add-product-container">

        <form onSubmit={addProduct}>

          <div className="form-section">

            <h2>Product Category</h2>

            <div className="form-group">

              <label>Category</label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                {categories.map((item) => (

                  <option
                    key={item.name}
                    value={item.key}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>

          </div>


          <div className="form-section">

            <h2>Basic Information</h2>

            <div className="form-group">

              <label>Product Image URL</label>

              <input
                type="url"
                name="img"
                placeholder="Enter product image URL"
                value={product.img}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Brand</label>

                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand name"
                  value={product.brand}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Colour</label>

                <input
                  type="text"
                  name="colour"
                  placeholder="Enter colour"
                  value={product.colour}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>


          <div className="form-section">

            <h2>Product Details</h2>

            <div className="form-row">

              <div className="form-group">

                <label>Assembly</label>

                <input
                  type="text"
                  name="assembly"
                  placeholder="Assembly type"
                  value={product.assembly}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Primary Material</label>

                <input
                  type="text"
                  name="primary_material"
                  placeholder="Primary material"
                  value={product.primary_material}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Dimensions CM</label>

                <input
                  type="text"
                  name="dimensions_cm"
                  placeholder="H 120 x W 80 x D 35"
                  value={product.dimensions_cm}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Dimensions Inches</label>

                <input
                  type="text"
                  name="dimensions_inches"
                  placeholder="H 47 x W 31 x D 14"
                  value={product.dimensions_inches}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Room Type</label>

                <input
                  type="text"
                  name="room_type"
                  placeholder="Living Room"
                  value={product.room_type}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Top Material</label>

                <input
                  type="text"
                  name="top_material"
                  placeholder="Top material"
                  value={product.top_material}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Product Rating</label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="product_rating"
                  placeholder="4.5"
                  value={product.product_rating}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Seating Height</label>

                <input
                  type="number"
                  name="seating_height"
                  placeholder="18"
                  value={product.seating_height}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Warranty</label>

                <input
                  type="text"
                  name="warranty"
                  placeholder="12 Months' Warranty"
                  value={product.warranty}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Weight</label>

                <input
                  type="text"
                  name="weight"
                  placeholder="35 KG"
                  value={product.weight}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>SKU</label>

              <input
                type="text"
                name="sku"
                placeholder="Enter SKU"
                value={product.sku}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="add-product-actions">

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>

            <button type="submit">
              Add Product
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AddProduct;