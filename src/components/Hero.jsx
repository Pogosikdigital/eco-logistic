import React from "react";
import { Link } from "react-router-dom";
import truckImage from "../assets/hero.png";
import "./styles/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="EcoHub Logistics Hero Section">

      <div className="hero-inner">
        <div className="hero-left">
          <span className="hero-label">Reliable vehicle delivery nationwide</span>

          <h1>
            EcoHub Logistics — <br /> Vehicle Shipping Across the USA
          </h1>

          <p className="hero-description">
            Ship your vehicle across the USA quickly and safely.
            We specialize in transporting passenger cars, box trucks, and Amazon vans.
            Transparent pricing, on-time delivery, and continuous status updates at every stage.
          </p>

          <div className="hero-buttons">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote ▸
            </Link>

            <a href="#how" className="btn-secondary">
              How it works
            </a>
          </div>

          <div className="hero-features">
            <div className="feature-card">
              <h3>50+ States</h3>
              <p>Nationwide coverage</p>
            </div>
            <div className="feature-card">
              <h3>Price Lock</h3>
              <p>No hidden fees</p>
            </div>
            <div className="feature-card">
              <h3>Live Updates</h3>
              <p>From booking to delivery</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={truckImage} alt="EcoHub Logistics truck transporting vehicles" />
        </div>
      </div>
    </section>
  );
}
