// src/components/Hero.jsx
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import heroTruck from "../assets/hero.png";
import "./styles/hero.css";

function Hero() {
  const heroRef = useRef(null);

  // карточки “How we work” под хиро (мемоизированы)
  const featureCards = useMemo(
    () => [
      {
        id: "coverage",
        title: "50+ States",
        text: "Nationwide coverage",
        icon: (
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M4 28L10 18L20 14L28 10L40 12L50 18L58 26L60 34L54 42L46 46L36 48L24 46L14 40L6 34L4 28Z"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        ),
      },
      {
        id: "price-lock",
        title: "Price Lock",
        text: "No hidden fees",
        icon: (
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle
              cx="32"
              cy="32"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M24 33l5 5 11-11"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        ),
      },
      {
        id: "updates",
        title: "Live Updates",
        text: "From booking to delivery",
        icon: (
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="16"
              y="12"
              width="32"
              height="40"
              rx="3"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M24 24h16M24 32h12M24 40h10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        ),
      },
    ],
    []
  );

  const [cardsDown, setCardsDown] = useState(false);
  const [isInView, setIsInView] = useState(false); // для анимации появления

  /* ===========================================================
     SCROLL: движение карточек и линия с траком
  ============================================================ */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCardsDown(currentY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // на случай, если зашёл не сверху

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===========================================================
     INTERSECTION OBSERVER: плавное появление HERO при первом скролле
  ============================================================ */
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // один раз
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ===========================================================
     Smooth scroll "How it works"
  ============================================================ */
  const handleHowClick = useCallback((event) => {
    const target = document.getElementById("how");
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className={`hero ${isInView ? "hero--visible" : "hero--hidden"}`}
      aria-label="EcoHub Logistics — vehicle shipping across the USA"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* мягкое светящееся облако под блоком */}
      <div className="hero-bg-gradient" aria-hidden="true" />

      <div className="hero-inner">
        {/* LEFT — text & CTA */}
        <div className="hero-left">
          <span className="hero-badge">
            Reliable vehicle delivery nationwide
          </span>

          <div className="hero-title-group">
            <h1
              id="hero-title"
              className="hero-title-primary"
              itemProp="name"
            >
              EcoHub Logistics
            </h1>
            <h2 className="hero-title-secondary" itemProp="areaServed">
              Vehicle Shipping Across the USA
            </h2>
          </div>

          <p className="hero-description" itemProp="description">
            Ship your vehicle across the USA quickly and safely. We specialize
            in transporting passenger cars, box trucks, and Amazon vans.
            Transparent pricing, on-time delivery, and continuous status
            updates.
          </p>

          <div className="hero-buttons" aria-label="Primary actions">
            <Link to="/quote" className="btn-primary" itemProp="url">
              Get a Free Quote ▸
            </Link>

            <a href="#how" className="btn-secondary" onClick={handleHowClick}>
              How it works
            </a>
          </div>
        </div>

        {/* RIGHT — truck image */}
        <div className="hero-photo-col" aria-hidden="true">
          <div className="hero-photo-wrapper rim-light">
            <div className="hero-photo-frame">
              <img
                src={heroTruck}
                alt="Blue semi truck with American flag — EcoHub Logistics auto transport in the USA"
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div
        className={`hero-features ${cardsDown ? "down" : "up"}`}
        aria-label="Key benefits of EcoHub Logistics"
      >
        {featureCards.map((card) => (
          <article
            key={card.id}
            className="feature-card"
            itemProp="serviceOutput"
          >
            <div className="feature-icon" aria-hidden="true">
              {card.icon}
            </div>
            <div className="feature-card-text">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>

      {/* TRUCK LINE ANIMATION */}
      <div
        className={`truck-line ${cardsDown ? "hidden" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 60" fill="none">
          <path
            d="M8 42V24H52V42H8Z
               M52 42V18H78L92 30V42H52Z
               M18 48C14.7 48 12 45.3 12 42C12 38.7 14.7 36 18 36C21.3 36 24 38.7 24 42C24 45.3 21.3 48 18 48Z
               M64 48C60.7 48 58 45.3 58 42C58 38.7 60.7 36 64 36C67.3 36 70 38.7 70 42C70 45.3 67.3 48 64 48Z
               M92 36H106V42"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
}

export default React.memo(Hero);
