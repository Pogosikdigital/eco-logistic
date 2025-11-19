import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroTruck from "../assets/hero.png";
import "./styles/hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const [cardsDown, setCardsDown] = useState(false);

  // 👇 Логика скролла: карточки вниз / вверх, грузовик прячется
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Если пользователь сделал малейшее движение вниз — карточки вниз, грузовик пропадает
      if (scrollY > 0) {
        setCardsDown(true);
      }

      // Если вернулся наверх — вернуть карточки наверх, грузовик появляется
      if (scrollY <= 2) {
        setCardsDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero"
      aria-label="EcoHub Logistics — vehicle shipping across the USA"
    >
      {/* Фоновый градиент-свечение за блоком */}
      <div className="hero-bg-gradient" />

      {/* Анимированная линия с грузовиком */}
      <div className={`truck-line ${cardsDown ? "hidden" : ""}`}>
        <svg viewBox="0 0 120 60" fill="none">
          <path
            d="
              M8 42V24H52V42H8Z
              M52 42V18H78L92 30V42H52Z
              M18 48C14.7 48 12 45.3 12 42C12 38.7 14.7 36 18 36C21.3 36 24 38.7 24 42C24 45.3 21.3 48 18 48Z
              M64 48C60.7 48 58 45.3 58 42C58 38.7 60.7 36 64 36C67.3 36 70 38.7 70 42C70 45.3 67.3 48 64 48Z
              M92 36H106V42
            "
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="hero-inner">
        {/* LEFT: текст, кнопки, описание */}
        <div className="hero-left">
          <span className="hero-label">
            Reliable vehicle delivery nationwide
          </span>

          <h1>
            EcoHub Logistics — <br /> Vehicle Shipping Across the USA
          </h1>

          <p className="hero-description">
            Ship your vehicle across the USA quickly and safely. We specialize
            in transporting passenger cars, box trucks, and Amazon vans.
            Transparent pricing, on-time delivery, and continuous status
            updates at every stage.
          </p>

          <div className="hero-buttons">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote ▸
            </Link>

            <a href="#how" className="btn-secondary">
              How it works
            </a>
          </div>
        </div>

        {/* RIGHT: фото с римлайтом */}
        <div className="hero-photo-wrapper rim-light" aria-hidden="true">
          <div className="hero-photo">
            <img
              src={heroTruck}
              alt="EcoHub Logistics truck transporting vehicles across the USA"
            />
          </div>
        </div>
      </div>

      {/* Карточки под героем, двигаются при скролле */}
      <div className={`hero-features ${cardsDown ? "down" : "up"}`}>
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 64 64">
              <path
                d="M4 28L10 18L20 14L28 10L40 12L50 18L58 26L60 34L54 42L46 46L36 48L24 46L14 40L6 34L4 28Z"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div>
            <h3>50+ States</h3>
            <p>Nationwide coverage</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M24 33l5 5 11-11"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div>
            <h3>Price Lock</h3>
            <p>No hidden fees</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 64 64">
              <rect
                x="16"
                y="12"
                width="32"
                height="40"
                rx="3"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M24 24h16M24 32h12M24 40h10"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div>
            <h3>Live Updates</h3>
            <p>From booking to delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
