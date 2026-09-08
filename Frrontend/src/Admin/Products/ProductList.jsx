import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/ProductList.css";

const ProductList = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("furnituredesc");

  const categories = [
    {
      name: "Furniture",
      url: "http://localhost:5000/furnituredesc"
    },
    {
      name: "Home Decor",
      url: "http://localhost:5000/homedecordesc"
    },
    {
      name: "Furnishings",
      url: "http://localhost:5000/furnishingsdesc"
    },
    {
      name: "Kitchen & Dining",
      url: "http://localhost:5000/kitchendesc"
    },
    {
      name: "Sofas & Mattress",
      url: "http://localhost:5000/sofadesc"
    },
    {
      name: "Lamp & Lighting",
      url: "http://localhost:5000/lampdesc"
    }
  ];


  const getProducts = () => {

    const selectedCategory = categories.find(
      item => item.url.includes(category)
    );

    if (!selectedCategory) {
      return;
    }

    axios
      .get(selectedCategory.url)
      .then(res => {

        const data = Array.isArray(res.data[0])
          ? res.data[0]
          : res.data;

        setProducts(data);

      })
      .catch(err => {

        console.log(err);

        setProducts([]);

      });

  };


  useEffect(() => {
    getProducts();
  }, [category]);


  const deleteProduct = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    const selectedCategory = categories.find(
      item => item.url.includes(category)
    );

    axios
      .delete(`${selectedCategory.url}/${id}`)
      .then(() => {

        alert("Product Deleted Successfully");

        getProducts();

      })
      .catch(err => {

        console.log(err);

        alert("Product Delete Failed");

      });

  };


  return (

    <div className="product-list-page">

      <div className="product-list-header">

        <div>
          <h1>Products</h1>
          <p>Manage all Home Decor products</p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </button>

      </div>


      <div className="product-category-buttons">

        {categories.map((item) => (

          <button
            key={item.name}
            className={
              category === item.url.split("5000/")[1]
                ? "category-active"
                : ""
            }
            onClick={() =>
              setCategory(item.url.split("5000/")[1])
            }
          >
            {item.name}
          </button>

        ))}

      </div>


      <div className="product-table-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Product</th>

              <th>Name</th>

              <th>Brand</th>

              <th>Colour</th>

              <th>Price</th>

              <th>Rating</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>
                  {product.id}
                </td>


                <td>

                  <img
                    src={product.img}
                    alt={product.name}
                    className="product-table-image"
                  />

                </td>


                <td>
                  {product.name}
                </td>


                <td>
                  {product.brand}
                </td>


                <td>
                  {product.colour}
                </td>


                <td>
                  ₹{product.price.toLocaleString("en-IN")}
                </td>


                <td>
                  ⭐ {product.product_rating}
                </td>


                <td>

                  <div className="product-actions">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${category}/${product.id}`
                        )
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {products.length === 0 && (

          <div className="no-products">

            <h3>No Products Found</h3>

            <p>
              No products available in this category.
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default ProductList;