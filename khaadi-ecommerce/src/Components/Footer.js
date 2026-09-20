import React, { useState } from "react";
import { Link } from "react-router-dom";

import KhaadiLogo from "../images/Khaadi-Logo.png";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="khaadi-footer">

      {/* NEED HELP */}
      <div className="footer-help">
        <h2>Need Help?</h2>

        <Link to="/faq" className="faq-link">
          <span>FAQs</span>
          <span className="faq-icon">→</span>
        </Link>
      </div>


      {/* MAIN FOOTER */}
      <div className="footer-main">

        {/* CUSTOMER CARE */}
        <div className="footer-column">
          <h3>Customer Care</h3>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/shipping">
            Shipping & Delivery
          </Link>

          <Link to="/returns">
            Returns & Exchanges
          </Link>

          <Link to="/faq">
            FAQs
          </Link>
        </div>


        {/* ABOUT KHAADI */}
        <div className="footer-column">
          <h3>About Khaadi</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/stores">
            Store Locator
          </Link>

          <Link to="/careers">
            Careers
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>
        </div>


        {/* FOLLOW US */}
        <div className="footer-column">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="social tiktok"
              aria-label="TikTok"
            >
              ♪
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="social youtube"
              aria-label="YouTube"
            >
              ▶
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="social facebook"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="social instagram"
              aria-label="Instagram"
            >
              ◎
            </a>

          </div>


          {/* NEWSLETTER */}
          <h3 className="newsletter-title">
            Subscribe to our newsletter
          </h3>

          <form
            className="newsletter"
            onSubmit={handleSubscribe}
          >

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              JOIN
            </button>

          </form>

          {message && (
            <p className="newsletter-message">
              {message}
            </p>
          )}

        </div>

      </div>


      {/* BOTTOM FOOTER */}
      <div className="footer-bottom">


        {/* PAYMENT METHODS */}
        <div className="payment">

          <span>Payment Methods</span>

          <div className="payment-icons">

            <button
              type="button"
              className="payment-card visa-card"
              aria-label="Visa"
            >
              VISA
            </button>

            <button
              type="button"
              className="payment-card mastercard-card"
              aria-label="Mastercard"
            >

              <span className="mastercard-circles">
                <i></i>
                <i></i>
              </span>

              <span>
                Mastercard
              </span>

            </button>

          </div>

        </div>


        {/* SECURE SHOPPING */}
        <div className="secured">

          <span>Secure Shopping</span>

          <div className="secure-box">

            <span className="secure-icon">
              🔒
            </span>

            <span>
              SECURE
            </span>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="copyright">

          <div className="footer-logo">

            <img
              src={KhaadiLogo}
              alt="Khaadi"
            />

          </div>

          <p>
            © 2026 Khaadi. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;