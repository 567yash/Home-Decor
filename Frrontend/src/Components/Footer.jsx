import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <div>
<footer className="home-footer">

  <div className="footer-container">

    
    <div className="footer-section">

      <h2>HOMENEST</h2>

      <p>
        Create a space that feels like you.
        Discover beautiful furniture, home decor,
        furnishings, lighting and more for every
        corner of your home.
      </p>

    </div>


    
    <div className="footer-section">

      <h3>SHOP</h3>

      <a href="/furniture">
        Furniture
      </a>

      <a href="/Sofas&Mattress">
        Sofas
      </a>

      <a href="/HomeDecor">
        Home Decor
      </a>

      <a href="/Furnishings">
        Furnishings
      </a>

      <a href="/kitchen&dining">
        Kitchen & Dining
      </a>

      <a href="/lamp&Lighting">
        Lamps & Lighting
      </a>

    </div>


    
    <div className="footer-section">

      <h3>CUSTOMER HELP</h3>

      <a href="/contact">
        Contact Us
      </a>

      <a href="/faq">
        FAQs
      </a>

      <a href="/shipping">
        Shipping & Delivery
      </a>

      <a href="/returns">
        Returns & Refunds
      </a>

      <a href="/orders">
        Track Your Order
      </a>

      <a href="/privacy">
        Privacy Policy
      </a>

    </div>
    <div className="footer-section">

      <h3>PROFESSIONAL SERVICES</h3>

      <a href="/interior-design">
        Interior Design
      </a>

      <a href="/home-consultation">
        Home Consultation
      </a>

      <a href="/assembly">
        Furniture Assembly
      </a>

      <a href="/installation">
        Installation Services
      </a>

      <a href="/business">
        Business & Bulk Orders
      </a>

    </div>

    <div className="footer-section social-section">

      <h3>FOLLOW US</h3>

      <p>
        Stay connected with HomeNest
        and discover new home inspirations.
      </p>


      <div className="social-links">

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          📷 Instagram
        </a>


        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          📘 Facebook
        </a>


        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
        >
          ▶️ YouTube
        </a>


        <a
          href="https://www.pinterest.com/"
          target="_blank"
          rel="noreferrer"
        >
          📌 Pinterest
        </a>

      </div>

    </div>

  </div>


  <div className="footer-newsletter">

    <h3>
      GET HOME INSPIRATION
    </h3>

    <p>
      Subscribe to receive new arrivals,
      offers and home decor ideas.
    </p>

    <div className="newsletter-box">

      <input
        type="email"
        placeholder="Enter your email address"
      />

      <button>
        Subscribe
      </button>

    </div>

  </div>

  <div className="footer-bottom">

    <p>
      © 2026 HomeNest. All Rights Reserved.
    </p>

    <div className="footer-bottom-links">

      <a href="/terms">
        Terms & Conditions
      </a>

      <a href="/privacy">
        Privacy Policy
      </a>

      <a href="/contact">
        Help & Support
      </a>

    </div>

  </div>

</footer>


    </div>
  )
}

export default Footer
