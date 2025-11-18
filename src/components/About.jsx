import React from "react";
import { Link } from "react-router-dom";  // ← добавили
import "./styles/about.css";
import trucksImage from "../assets/truck.jpg";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="about-container">
        
        <header className="about-header">
          <p className="about-kicker">About Us</p>
          <h2 className="about-title" itemProp="name">
            About EcoHub Logistics Inc
          </h2>
          <p className="about-subtitle">
            EcoHub Logistics Inc is a trusted leader...
          </p>
        </header>

        <div className="about-grid">

          <figure className="about-media">
            <img src={trucksImage} alt="Fleet of trucks" className="about-image" />
          </figure>

          <div className="about-content">
            <p className="about-tag">About Us</p>

            <h3 className="about-content-title">
              About EcoHub Logistics Inc
            </h3>

            <p className="about-content-text">
              We specialize in safe, on-time vehicle transport...
            </p>

            <ul className="about-list">
              <li><span className="about-dot" /> Nationwide coverage…</li>
              <li><span className="about-dot" /> Open & enclosed options…</li>
              <li><span className="about-dot" /> Price lock — no hidden fees</li>
              <li><span className="about-dot" /> Dedicated coordinator</li>
            </ul>

            <div className="about-actions">
              
              {/* 🔥 Теперь ведёт на отдельную страницу */}
              <Link to="/quote" className="main-cta about-primary-cta">
                Get a Free Quote ›
              </Link>

              <a href="#contact" className="about-secondary-cta">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
