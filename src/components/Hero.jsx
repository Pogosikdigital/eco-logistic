// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroTruck from "/hero.webp";
import "./styles/hero.css";

const FEATURES = [
  {
    id: "coverage",
    title: "Nationwide Coverage",
    text: "Door-to-door across the USA",
    icon: CoverageIcon,
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    text: "No hidden fees — clear quotes",
    icon: PriceIcon,
  },
  {
    id: "support",
    title: "Coordinator Support",
    text: "Updates from pickup to delivery",
    icon: SupportIcon,
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="home-hero"
      aria-label="EcoHub Logistics — Nationwide auto transport"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="home-hero__container">
        <div className="home-hero__grid">
          <div className="home-hero__left">
            <span className="home-hero__badge">
              Insured • Door-to-door • Nationwide
            </span>

            <h1 className="home-hero__title" itemProp="name">
              Car Shipping & Auto Transport Across the USA
            </h1>

            <p className="home-hero__subtitle" itemProp="description">
              EcoHub Logistics provides reliable vehicle shipping nationwide —
              open or enclosed transport, transparent pricing, and a dedicated
              coordinator from pickup to delivery.
            </p>

            <ul className="home-hero__bullets">
              <li>
                <span className="home-hero__check">✓</span>
                Open & enclosed transport options
              </li>
              <li>
                <span className="home-hero__check">✓</span>
                Fully insured shipments with vetted carriers
              </li>
              <li>
                <span className="home-hero__check">✓</span>
                Fast dispatch + live coordination
              </li>
            </ul>

            <div className="home-hero__actions">
              <Link to="/quote" className="home-btn-primary" itemProp="url">
                Get a free quote
              </Link>

              <a href="/#how-it-works" className="home-btn-ghost">
                How it works
              </a>
            </div>

            <p className="home-hero__note">
              Average response time: 5–10 minutes during business hours
            </p>
          </div>

          <div className="home-hero__card" aria-hidden="true">
            <div className="home-hero__glow" />
            <div className="home-hero__media">
              <img
                className="home-hero__img"
                src={heroTruck}
                alt="EcoHub Logistics auto transport"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        <div className="home-hero__features" aria-label="Key benefits">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article key={f.id} className="home-feature">
                <div className="home-feature__icon" aria-hidden="true">
                  <Icon />
                </div>

                <div>
                  <h3 className="home-feature__title">{f.title}</h3>
                  <p className="home-feature__text">{f.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoverageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-4.2 7-11a7 7 0 1 0-14 0c0 6.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7h10v10H7V7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 12h6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10.5 9.5h3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6 12v4a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 20h4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}