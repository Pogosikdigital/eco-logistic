// src/components/AboutSection.jsx
import React from "react";
import "./styles/about.css";
import trucksImage from "../assets/truck.jpg"; // или твоя картинка для блока About

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="about-container">
        {/* Верхняя часть – заголовок и подзаголовок */}
        <header className="about-header">
          <p className="about-kicker">About Us</p>
          <h2 className="about-title" itemProp="name">
            About EcoHub Logistics Inc
          </h2>
          <p className="about-subtitle" itemProp="description">
            EcoHub Logistics Inc is a trusted leader in vehicle transport
            across the USA. We focus on reliability, transparent pricing,
            and real communication to make sure your vehicle reaches its
            destination safely and on time.
          </p>
        </header>

        {/* Основная сетка: слева фото, справа текст и буллиты */}
        <div className="about-grid">
          {/* Левая карточка с картинкой */}
          <figure
            className="about-media"
            itemProp="image"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <img
              src={trucksImage}
              alt="Fleet of trucks with an American flag in the background"
              className="about-image"
            />
            <meta itemProp="url" content="https://ecohub-logistics.com" />
          </figure>

          {/* Правая карточка с текстом и списком преимуществ */}
          <div className="about-content">
            <p className="about-tag">About Us</p>

            <h3 className="about-content-title">
              About EcoHub Logistics Inc
            </h3>

            <p className="about-content-text">
              We specialize in safe, on-time vehicle transport with vetted
              carriers, clear timelines, and honest communication at every step.
            </p>

            <ul className="about-list">
              <li>
                <span className="about-dot" />
                Nationwide coverage with vetted, insured carriers
              </li>
              <li>
                <span className="about-dot" />
                Open &amp; enclosed options with real-time status updates
              </li>
              <li>
                <span className="about-dot" />
                Price lock — no hidden fees, clear timeline
              </li>
              <li>
                <span className="about-dot" />
                Dedicated coordinator from booking to delivery
              </li>
            </ul>

            <div className="about-actions">
              <a href="#quote" className="main-cta about-primary-cta">
                Get a Free Quote ›
              </a>
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