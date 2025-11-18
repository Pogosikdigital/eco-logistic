// src/components/Footer.jsx
import React from "react";
import "./styles/footer.css";
import logo from "../assets/logo.png";

export default function Footer() {
  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer-section" itemScope itemType="https://schema.org/Organization">
      
      <div className="footer-container">

        {/* LOGO + ABOUT */}
        <div className="footer-col footer-about">
          <img
            src={logo}
            alt="EcoHub Logistics"
            className="footer-logo neon-logo"
            itemProp="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          <p className="footer-text" itemProp="description">
            Reliable auto transport across the USA. Professional service,
            vetted carriers, real-time tracking & zero hidden fees.
          </p>

          {/* FREE QUOTE BUTTON */}
          <button
            className="footer-cta"
            onClick={() => scrollTo("#quote")}
          >
            Get a Free Quote <span className="arrow">›</span>
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="footer-col">
          <h4 className="footer-title">Navigation</h4>

          <ul className="footer-links">
            <li><a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</a></li>

            <li><a onClick={() => scrollTo("#services")}>Services</a></li>

            <li><a onClick={() => scrollTo("#about")}>About Us</a></li>

            <li><a onClick={() => scrollTo("#reviews")}>Reviews</a></li>

            <li><a onClick={() => scrollTo("#earn")}>Earn With Us</a></li>

            <li><a onClick={() => scrollTo("#contact")}>Contact</a></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <h4 className="footer-title">Contact</h4>

          <p>
            <span itemProp="streetAddress">1142 John Young Pkwy</span>,{" "}
            <span itemProp="addressLocality">Orlando</span>,{" "}
            <span itemProp="addressRegion">FL</span> 32808
          </p>

          <p itemProp="email">Info@Ecohublogistics.com</p>
          <p itemProp="telephone">(650) 999-9660</p>

          {/* SOCIAL ICONS */}
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

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2025 EcoHub Logistics — All Rights Reserved.</p>
      </div>

    </footer>
  );
}