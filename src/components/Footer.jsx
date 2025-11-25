// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/footer.css";

export default function Footer() {
  const location = useLocation();

  // Smooth scroll внутри главной
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Переход к секции (из других страниц)
  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    scrollTo(`#${sectionId}`);
  };

  return (
    <footer
      className="footer-section"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* микроразметка SEO */}
      <meta itemProp="name" content="EcoHub Logistics Inc" />
      <meta
        itemProp="description"
        content="EcoHub Logistics Inc provides nationwide auto transport across the USA with transparent pricing and reliable dispatch."
      />

      <div className="footer-grid-overlay" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-container">
          {/* LOGO + CTA */}
          <div className="footer-col footer-about">
            <h2
              className="footer-logo-text neon-text-logo"
              itemProp="brand"
              onClick={() => goToSection("home")}
            >
              EcoHub Logistics
            </h2>

            <p className="footer-tagline">
              Vehicle shipping across the USA with real-time updates and
              dedicated support.
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
          <nav
            className="footer-col footer-nav"
            aria-label="Footer navigation"
          >
            <h4 className="footer-title">Navigation</h4>

            <div className="footer-nav-grid">
              {/* 1st column */}
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
                    onClick={() => goToSection("home")}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
                    onClick={() => goToSection("how")}
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
                    onClick={() => goToSection("services")}
                  >
                    Services
                  </button>
                </li>
              </ul>

              {/* 2nd column */}
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
                    onClick={() => goToSection("reviews")}
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
                    onClick={() => goToSection("about")}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <Link
                    to="/earn"
                    className="footer-link-btn footer-link-router"
                  >
                    Earn With Us
                  </Link>
                </li>
              </ul>

              {/* 3rd column */}
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link-btn"
                    type="button"
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
            <h4 className="footer-title">Contact</h4>

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
                <span itemProp="postalCode">32808</span>
              </p>
            </address>

            <p>
              <a
                href="mailto:info@ecohublogistics.com"
                itemProp="email"
                className="footer-contact-link"
              >
                info@ecohublogistics.com
              </a>
            </p>

            <p>
              <a
                href="tel:16509999660"
                itemProp="telephone"
                className="footer-contact-link"
              >
                (650) 999-9660
              </a>
            </p>

            <div className="footer-social">
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
