// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/footer.css";

export default function Footer() {
  const location = useLocation();

  // Smooth scroll
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Work everywhere
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
      <div className="footer-inner">
        <div className="footer-container">

          {/* LOGO + CTA */}
          <div className="footer-col footer-about">
            <h2
              className="footer-logo-text neon-text-logo"
              itemProp="name"
              onClick={() => goToSection("home")}
            >
              EcoHub Logistics
            </h2>

            <Link to="/quote" className="footer-cta">
              Get a Free Quote <span className="arrow">›</span>
            </Link>
          </div>

          {/* NAVIGATION */}
          <div className="footer-col footer-nav">
            <h4 className="footer-title">Navigation</h4>

            <div className="footer-nav-grid">

              {/* 1st column */}
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("home")}>
                    Home
                  </button>
                </li>

                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("how")}>
                    How it works
                  </button>
                </li>

                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("services")}>
                    Services
                  </button>
                </li>
              </ul>

              {/* 2nd column */}
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("reviews")}>
                    Reviews
                  </button>
                </li>

                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("about")}>
                    About Us
                  </button>
                </li>

                <li>
                  <Link to="/earn" className="footer-link-btn footer-link-router">
                    Earn With Us
                  </Link>
                </li>
              </ul>

              {/* 3rd column */}
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn" onClick={() => goToSection("contact")}>
                    Contact
                  </button>
                </li>
              </ul>

            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="footer-col footer-contact">
            <h4 className="footer-title">Contact</h4>

            <p>
              <span>1142 John Young Pkwy</span>, Orlando, FL 32808
            </p>

            <p>Info@Ecohublogistics.com</p>
            <p>(650) 999-9660</p>

            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61572534053753"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  className="social-img"
                  alt="Facebook"
                />
              </a>

              <a
                href="https://www.instagram.com/eco.hub.logistics"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  className="social-img"
                  alt="Instagram"
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
