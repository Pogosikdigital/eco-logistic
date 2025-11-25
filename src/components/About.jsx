// src/components/AboutSection.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import "./styles/about.css";
import trucksImage from "../assets/truck.jpg";

function AboutSectionComponent() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Bullet-пункты как данные (SEO + удобство)
  const bulletPoints = useMemo(
    () => [
      "Nationwide coverage for cars, box trucks, and Amazon vans.",
      "Open and enclosed transport options depending on your needs.",
      "Transparent price lock — no hidden fees or surprise charges.",
      "Dedicated logistics coordinator for every shipment.",
    ],
    []
  );

  // IntersectionObserver → запускаем анимацию один раз
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Включаем 3D-tilt только на десктопе
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setEnableTilt(window.innerWidth >= 768);
    };

    handleResize(); // первый расчёт
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D-tilt для карточки с траком
  const handleMediaMouseMove = useCallback(
    (event) => {
      if (!enableTilt || !isVisible) return;

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `
        perspective(1100px)
        translateY(-4px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    },
    [enableTilt, isVisible]
  );

  const handleMediaMouseLeave = useCallback(
    (event) => {
      if (!enableTilt) return;
      const card = event.currentTarget;

      card.style.transform = `
        perspective(1100px)
        translateY(0)
        rotateX(0deg)
        rotateY(0deg)
      `;
    },
    [enableTilt]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about-section ${isVisible ? "about-section--visible" : ""}`}
      itemScope
      itemType="https://schema.org/Organization"
      aria-label="About EcoHub Logistics Inc auto transport company"
    >
      {/* SEO / Schema.org */}
      <meta itemProp="name" content="EcoHub Logistics Inc" />
      <meta
        itemProp="description"
        content="EcoHub Logistics Inc is a trusted auto transport company providing safe, insured nationwide vehicle shipping across the United States."
      />

      <div className="about-container">
        {/* HEADER */}
        <header className="about-header">
          <p className="about-kicker">About Us</p>
          <h2 className="about-title">About EcoHub Logistics Inc</h2>
          <p className="about-subtitle">
            EcoHub Logistics Inc is a trusted auto transport company that
            provides safe, insured vehicle shipping across the United States.
          </p>
        </header>

        {/* GRID: Truck + Content */}
        <div className="about-grid">
          {/* LEFT — TRUCK CARD (3D slide-in + tilt) */}
          <figure
            className="about-media"
            aria-hidden="true"
            onMouseMove={handleMediaMouseMove}
            onMouseLeave={handleMediaMouseLeave}
          >
            <div className="about-media-inner">
              <img
                src={trucksImage}
                alt="White car carrier truck transporting vehicles on the highway in the United States"
                className={`about-image ${
                  imageLoaded ? "about-image--loaded" : ""
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </figure>

          {/* RIGHT — TEXT CARD */}
          <article className="about-content">
            <p className="about-tag">Vehicle shipping experts</p>

            <h3 className="about-content-title" itemProp="slogan">
              Trusted partner for nationwide auto transport
            </h3>

            <p className="about-content-text">
              We specialize in safe, on-time vehicle transport for dealerships,
              individuals, fleets, and logistics partners. Our team coordinates
              every stage of your shipment — from dispatch to final delivery —
              keeping you updated along the way.
            </p>

            <ul className="about-list">
              {bulletPoints.map((item, index) => (
                <li key={index} itemProp="makesOffer">
                  <span className="about-dot" />
                  <span className="about-list-text">{item}</span>
                </li>
              ))}
            </ul>

            <div className="about-actions">
              <Link
                to="/quote"
                className="main-cta about-primary-cta"
                aria-label="Get a free auto transport quote from EcoHub Logistics"
              >
                Get a Free Quote ›
              </Link>

              <a href="#contact" className="about-secondary-cta">
                Contact Us
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default React.memo(AboutSectionComponent);
