// src/components/Footer.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/footer.css";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const goToSection = (id) => {
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className="footer-section"
      aria-label="Site footer"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* ✅ Organization microdata (clean & correct) */}
      <meta itemProp="name" content="EcoHub Logistics Inc" />
      <meta itemProp="url" content="https://www.ecohublogistics.com/" />
      <meta
        itemProp="description"
        content="EcoHub Logistics Inc provides nationwide auto transport across the USA with transparent pricing and reliable dispatch."
      />
      <meta itemProp="email" content="info@ecohublogistics.com" />
      <meta itemProp="telephone" content="+1-650-999-9660" />
      <meta itemProp="logo" content="https://www.ecohublogistics.com/favicon-96x96.png" />

      {/* ✅ sameAs social proof */}
      <meta
        itemProp="sameAs"
        content="https://www.facebook.com/profile.php?id=61572534053753"
      />
      <meta itemProp="sameAs" content="https://www.instagram.com/eco.hub.logistics" />

      <div className="footer-inner">
        <div className="footer-container">
          {/* BRAND */}
          <div className="footer-col footer-about">
            <h2
              className="footer-logo-text"
              onClick={() => goToSection("home")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToSection("home");
              }}
              aria-label="Go to home section"
            >
              EcoHub Logistics
            </h2>

            <p className="footer-tagline">
              Vehicle shipping across the USA with real-time updates and dedicated support.
            </p>

            <Link
              to="/quote"
              className="footer-cta"
              aria-label="Get a free auto transport quote"
            >
              Get a Free Quote <span className="arrow">›</span>
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className="footer-col footer-nav" aria-label="Footer navigation">
            <h3 className="footer-title">Navigation</h3>

            <div className="footer-nav-grid">
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("home")}>
                    Home
                  </button>
                </li>
                <li>
                  {/* ✅ match your App.jsx anchors: /how-it-works -> /#how-it-works */}
                  <button
                    className="footer-link-btn"
                    onClick={() => goToSection("how-it-works")}
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link-btn"
                    onClick={() => goToSection("services")}
                  >
                    Services
                  </button>
                </li>
              </ul>

              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link-btn"
                    onClick={() => goToSection("reviews")}
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link-btn"
                    onClick={() => goToSection("about")}
                  >
                    About Us
                  </button>
                </li>
                {/* ✅ use the real route */}
                <li>
                  <Link to="/earn-with-us" className="footer-link-router">
                    Earn With Us
                  </Link>
                </li>
              </ul>

              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link-btn"
                    onClick={() => goToSection("contact")}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* CONTACT INFO */}
          <div className="footer-col footer-contact">
            <h3 className="footer-title">Contact</h3>

            <address
              className="footer-address"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <p>
                <span itemProp="streetAddress">1142 John Young Pkwy</span>,{" "}
                <span itemProp="addressLocality">Orlando</span>,{" "}
                <span itemProp="addressRegion">FL</span>{" "}
                <span itemProp="postalCode">32808</span>,{" "}
                <span itemProp="addressCountry">US</span>
              </p>
            </address>

            <p>
              <a
                href="mailto:info@ecohublogistics.com"
                className="footer-contact-link"
                aria-label="Email EcoHub Logistics"
                itemProp="email"
              >
                info@ecohublogistics.com
              </a>
            </p>

            <p>
              <a
                href="tel:+16509999660"
                className="footer-contact-link"
                aria-label="Call EcoHub Logistics"
                itemProp="telephone"
              >
                (650) 999-9660
              </a>
            </p>

            <div className="footer-social" aria-label="Social media links">
              <a
                href="https://www.facebook.com/profile.php?id=61572534053753"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="EcoHub Logistics on Facebook"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  className="social-img"
                  alt="Facebook"
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <a
                href="https://www.instagram.com/eco.hub.logistics"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="EcoHub Logistics on Instagram"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  className="social-img"
                  alt="Instagram"
                  loading="lazy"
                  decoding="async"
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
