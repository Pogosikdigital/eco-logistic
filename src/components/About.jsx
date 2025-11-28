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
  const mediaRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* -----------------------------------------------
     Bullet Points (мемоизация для производительности)
  ------------------------------------------------- */
  const bulletPoints = useMemo(
    () => [
      "Nationwide coverage for cars, box trucks, and Amazon vans.",
      "Open and enclosed transport options depending on your needs.",
      "Transparent price lock — no hidden fees or surprise charges.",
      "Dedicated logistics coordinator for every shipment.",
    ],
    []
  );

  /* -----------------------------------------------
     Появление всей секции при скролле
  ------------------------------------------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* -----------------------------------------------
     3D Tilt — через requestAnimationFrame (лучший вариант)
  ------------------------------------------------- */
  const tiltFrame = useRef(null);

  const handleTilt = useCallback(
    (e) => {
      const card = mediaRef.current;
      if (!card || window.innerWidth < 900 || !isVisible) return;

      if (tiltFrame.current) cancelAnimationFrame(tiltFrame.current);

      tiltFrame.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        card.style.transform = `
          perspective(1100px)
          translate3d(0, 0, 0)
          rotateX(${y * -10}deg)
          rotateY(${x * 12}deg)
        `;
      });
    },
    [isVisible]
  );

  const resetTilt = useCallback(() => {
    const card = mediaRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1100px)
      translate3d(0, 0, 0)
      rotateX(0deg)
      rotateY(0deg)
    `;
  }, []);

  /* -----------------------------------------------
     JSX OUTPUT
  ------------------------------------------------- */
  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about-section ${isVisible ? "about-section--visible" : ""}`}
      aria-label="About EcoHub Logistics Inc — nationwide auto transport"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="EcoHub Logistics Inc" />

      <div className="about-container">
        {/* ---------- HEADER ---------- */}
        <header className="about-header">
          <p className="about-kicker">About Us</p>

          <h2 className="about-title">About EcoHub Logistics Inc</h2>

          <p className="about-subtitle">
            Safe, insured nationwide transport for cars, trucks, vans, and
            commercial fleets.
          </p>
        </header>

        <div className="about-grid">
          {/* ---------- LEFT IMAGE (3D Truck + LQIP) ---------- */}
          <figure
            ref={mediaRef}
            className="about-media"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            aria-hidden="true"
          >
            <div className="about-media-inner">
              <img
                src={trucksImage}
                alt="Car hauler truck transporting vehicles across the USA"
                className={`about-image ${
                  imageLoaded ? "about-image--loaded" : ""
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </figure>

          {/* ---------- RIGHT CONTENT ---------- */}
          <article className="about-content">
            <p className="about-tag">Vehicle Shipping Experts</p>

            <h3 className="about-content-title" itemProp="slogan">
              Trusted Partner for Nationwide Auto Transport
            </h3>

            <p className="about-content-text">
              We provide insured, reliable transport for dealerships,
              individuals, commercial fleets, and Amazon partners — coordinating
              dispatch, tracking, carriers, and delivery.
            </p>

            <ul className="about-list">
              {bulletPoints.map((point, i) => (
                <li key={i}>
                  <span className="about-dot" />
                  <span className="about-list-text">{point}</span>
                </li>
              ))}
            </ul>

            <div className="about-actions">
              <Link to="/quote" className="main-cta about-primary-cta">
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
