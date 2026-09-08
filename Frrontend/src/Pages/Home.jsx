import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {

  const navigate = useNavigate();

  const handleExplore = (page) => {
    navigate(page);
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Transform Your Space
          </h1>

          <p>
            Discover beautiful furniture, stylish furnishings,
            elegant lighting and unique decor designed to make
            your home comfortable and beautiful.
          </p>

        </div>

      </section>


      {/* COLLECTIONS SECTION */}
      <section className="collections-section">

        <h2>Explore Our Collections</h2>

        <p className="collections-subtitle">
          Discover everything you need to create a beautiful,
          comfortable and stylish home.
        </p>


        <div className="collections-container">

          {/* FURNITURE */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/Furniture")}
          >

            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
              alt="Furniture"
            />

            <div className="collection-content">

              <h3>Furniture</h3>

              <p>
                Comfortable and stylish furniture
                for every room in your home.
              </p>

              <span>
                Explore Furniture →
              </span>

            </div>

          </div>


          {/* HOME DECOR */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/HomeDecor")}
          >

            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
              alt="Home Decor"
            />

            <div className="collection-content">

              <h3>Home Decor</h3>

              <p>
                Beautiful decorative pieces that
                add personality to your home.
              </p>

              <span>
                Explore Home Decor →
              </span>

            </div>

          </div>


          {/* FURNISHINGS */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/Furnishings")}
          >

            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt="Furnishings"
            />

            <div className="collection-content">

              <h3>Furnishings</h3>

              <p>
                Add comfort, warmth and elegance
                to every corner of your home.
              </p>

              <span>
                Explore Furnishings →
              </span>

            </div>

          </div>


          {/* KITCHEN & DINING */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/Kitchen&Dining")}
          >

            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
              alt="Kitchen and Dining"
            />

            <div className="collection-content">

              <h3>Kitchen & Dining</h3>

              <p>
                Stylish essentials and furniture
                for your kitchen and dining area.
              </p>

              <span>
                Explore Kitchen →
              </span>

            </div>

          </div>


          {/* SOFAS & MATTRESS */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/Sofas&Mattress")}
          >

            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6"
              alt="Sofas and Mattress"
            />

            <div className="collection-content">

              <h3>Sofas & Mattress</h3>

              <p>
                Relax in comfort with beautiful sofas,
                beds and quality mattresses.
              </p>

              <span>
                Explore Sofas →
              </span>

            </div>

          </div>


          {/* LAMP & LIGHTING */}
          <div
            className="collection-card"
            onClick={() => handleExplore("/Lamp&Lighting")}
          >

            <img
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
              alt="Lamp and Lighting"
            />

            <div className="collection-content">

              <h3>Lamp & Lighting</h3>

              <p>
                Brighten your home with elegant
                lamps and modern lighting.
              </p>

              <span>
                Explore Lighting →
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}
      <section className="about-section">

        <h2>About Our Store</h2>

        <p className="about-description">
          We believe that your home should be a reflection
          of your personality and lifestyle. Our collections
          bring together comfort, quality and modern design
          to help you create a space you truly love.
        </p>


        <div className="about-points">

          {/* QUALITY */}
          <div className="about-card">

            <div className="about-icon">
              ✓
            </div>

            <h3>Quality Products</h3>

            <p>
              Carefully selected products made
              with quality and durability in mind.
            </p>

          </div>


          {/* DESIGN */}
          <div className="about-card">

            <div className="about-icon">
              ✓
            </div>

            <h3>Stylish Designs</h3>

            <p>
              Modern and elegant designs that
              bring beauty to your home.
            </p>

          </div>


          {/* SHOPPING */}
          <div className="about-card">

            <div className="about-icon">
              ✓
            </div>

            <h3>Easy Shopping</h3>

            <p>
              Simple and convenient shopping
              experience for everyone.
            </p>

          </div>


          {/* PRICE */}
          <div className="about-card">

            <div className="about-icon">
              ✓
            </div>

            <h3>Affordable Prices</h3>

            <p>
              Beautiful products at prices
              that fit your budget.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;