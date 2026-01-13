// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroTruck from "/og-image.jpg";
import "./styles/hero.css";

const FEATURE_CARDS = [
  { id: "coverage", title: "Nationwide", text: "Across the USA", icon: null },
  { id: "price-lock", title: "Price Lock", text: "No hidden fees", icon: null },
  { id: "updates", title: "Live Updates", text: "From booking to delivery", icon: null },
];

function Hero() {
  const [cardsDown, setCardsDown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setCardsDown(y > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="hero"
      aria-label="Car shipping services across the USA"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="hero-bg-gradient" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-left">
          <span className="hero-badge">Insured, door-to-door auto transport</span>

          {/* ✅ ONE TRUE H1 ON PAGE */}
          <h1 id="hero-title" className="hero-title-primary" itemProp="name">
            Car Shipping & Auto Transport Across the USA
          </h1>

          <p className="hero-description" itemProp="description">
            EcoHub Logistics provides reliable vehicle shipping nationwide — open or enclosed
            transport, transparent pricing, and a dedicated coordinator from pickup to delivery.
          </p>

          <div className="hero-buttons" aria-label="Primary actions">
            <Link to="/quote" className="btn-primary" itemProp="url">
              Get a Free Quote ▸
            </Link>

            <a href="/how-it-works" className="btn-secondary">
              How it works
            </a>
          </div>
        </div>

        <div className="hero-photo-col" aria-hidden="true">
          <div className="hero-photo-wrapper rim-light">
            <div className="hero-photo-frame">
              {/* ✅ LCP FIX: DO NOT LAZY LOAD HERO IMAGE */}
              <img
                src={heroTruck}
                alt="Auto transport truck — EcoHub Logistics car shipping in the USA"
                decoding="async"
                loading="eager"
                fetchpriority="high"
                width="1200"
                height="630"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`hero-features ${cardsDown ? "down" : "up"}`} aria-label="Key benefits">
        {FEATURE_CARDS.map((card) => (
          <article key={card.id} className="feature-card" itemProp="serviceOutput">
            <div className="feature-card-text">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Hero);
