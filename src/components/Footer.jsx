// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";

export default function Footer() {
  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="footer-section"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="footer-inner">
        <div className="footer-container">
          
          {/* LOGO + ABOUT */}
          <div className="footer-col footer-about">

            {/* LOGO */}
            <h2
              className="footer-logo-text neon-text-logo"
              itemProp="name"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              EcoHub Logistics
            </h2>

            {/* FREE QUOTE BUTTON */}
            <button
              className="footer-cta"
              onClick={() => scrollTo("#quote")}
            >
              Get a Free Quote <span className="arrow">›</span>
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="footer-col footer-nav">
            <h4 className="footer-title">Navigation</h4>

            <div className="footer-nav-grid">
              <ul className="footer-links">
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Home
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => scrollTo("#services")}
                  >
                    Services
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => scrollTo("#reviews")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>

              <ul className="footer-links">
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => scrollTo("#about")}
                  >
                    About Us
                  </button>
                </li>

                {/* ===== EARN WITH US — ведёт на отдельную страницу ===== */}
                <li>
                  <Link
                    to="/earn"
                    className="footer-link-btn footer-link-router"
                  >
                    Earn With Us
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => scrollTo("#contact")}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div
            className="footer-col footer-contact"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <h4 className="footer-title">Contact</h4>

            <p>
              <span itemProp="streetAddress">1142 John Young Pkwy</span>,{" "}
              <span itemProp="addressLocality">Orlando</span>,{" "}
              <span itemProp="addressRegion">FL</span> 32808
            </p>

            <p itemProp="email">Info@Ecohublogistics.com</p>
            <p itemProp="telephone">(650) 999-9660</p>

            <div className="footer-social">

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/profile.php?id=61572534053753"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="social-img"
                />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/eco.hub.logistics"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  alt="Instagram"
                  className="social-img"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 EcoHub Logistics — All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}