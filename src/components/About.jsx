// src/components/AboutSection.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./styles/about.css";
import trucksImage from "../assets/truck.jpg";

function AboutSectionComponent() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const bulletPoints = useMemo(
    () => [
      "Nationwide coverage for cars, box trucks, and Amazon vans.",
      "Open and enclosed transport options depending on your needs.",
      "Transparent price lock — no hidden fees or surprise charges.",
      "Dedicated logistics coordinator for every shipment.",
    ],
    []
  );

  /* reveal like Services/Hero */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        obs.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* 3D tilt (only desktop) */
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about ${isVisible ? "about--visible" : ""}`}
      aria-label="About EcoHub Logistics Inc — nationwide auto transport"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* ✅ SEO */}
      <meta itemProp="name" content="EcoHub Logistics Inc" />
      <meta
        itemProp="description"
        content="EcoHub Logistics provides insured, reliable nationwide vehicle transport for individuals, dealerships, and fleets."
      />

      <div className="about__container">
        <header className="about__header">
          <span className="about__badge">About Us</span>

          <h2 className="about__title">About EcoHub Logistics Inc</h2>

          <p className="about__subtitle">
            Safe, insured nationwide transport for cars, trucks, vans, and commercial fleets.
          </p>
        </header>

        <div className="about__grid">
          {/* LEFT media */}
          <figure
            ref={mediaRef}
            className="about__media"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            aria-hidden="true"
          >
            <div className="about__mediaInner">
              <img
                src={trucksImage}
                alt="Car hauler truck transporting vehicles across the USA"
                className={`about__image ${imageLoaded ? "is-loaded" : ""}`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </figure>

          {/* RIGHT content */}
          <article className="about__content">
            <p className="about__tag">Vehicle Shipping Experts</p>

            <h3 className="about__contentTitle" itemProp="slogan">
              Trusted Partner for Nationwide Auto Transport
            </h3>

            <p className="about__contentText">
              We provide insured, reliable transport for dealerships, individuals, commercial fleets,
              and Amazon partners — coordinating dispatch, tracking, carriers, and delivery.
            </p>

            <ul className="about__list" aria-label="Key benefits">
              {bulletPoints.map((point, i) => (
                <li key={i} className="about__listItem">
                  <span className="about__dot" aria-hidden="true" />
                  <span className="about__listText">{point}</span>
                </li>
              ))}
            </ul>

            <div className="about__actions">
              {/* ✅ reuse hero button styles */}
              <Link to="/quote" className="home-btn-primary about__btn" itemProp="url">
                Get a free quote
              </Link>

              <a
                href="#contact"
                className="home-btn-ghost about__btn"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("contact");
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
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
