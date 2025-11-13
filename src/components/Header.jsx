import { useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from "../assets/logo.png";
import "./styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* SEO meta tags for Header */}
      <Helmet>
        <title>EcoHub Logistics — Auto Transport Across the USA</title>
        <meta
          name="description"
          content="EcoHub Logistics offers professional auto transport services across the USA — transparent pricing, insured drivers, and nationwide coverage."
        />
        <meta
          name="keywords"
          content="car shipping, auto transport, vehicle delivery, enclosed transport, open carrier, logistics USA, nationwide car shipping"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="header" role="banner">
        <div className="header-container">
          {/* ===== LOGO ===== */}
          <a href="/" className="logo-section" aria-label="EcoHub Logistics Homepage">
            <img src={logo} alt="EcoHub Logistics company logo" className="logo" />
            <div className="logo-text">
              <h1 className="company-title">EcoHub Logistics</h1>
              <p className="company-subtitle">Auto Transport Across the USA</p>
            </div>
          </a>

          {/* ===== BURGER MENU ===== */}
          <button
            className={`burger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* ===== NAVIGATION ===== */}
          <nav
            id="main-navigation"
            className={`nav ${menuOpen ? "open" : ""}`}
            role="navigation"
            aria-label="Main Navigation"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link">Home</a>
              </li>
              <li className="nav__item">
                <a href="#services" className="nav__link">Services</a>
              </li>
              <li className="nav__item">
                <a href="#blog" className="nav__link">Blog</a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">About Us</a>
              </li>
              <li className="nav__item">
                <a href="#earn" className="nav__link">Earn With Us</a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">Contact</a>
              </li>
              <li className="nav__item">
                <a href="#reviews" className="nav__link">Reviews</a>
              </li>
            </ul>
          </nav>

          {/* ===== CTA BUTTON ===== */}
          <a href="#quote" className="main-cta" aria-label="Get a free auto shipping quote">
            Get a Free Quote ▷
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
