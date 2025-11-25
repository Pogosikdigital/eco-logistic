// src/pages/ReviewsPage.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import "./ReviewsPage.css";
import { reviewsData } from "../data/reviewsData";

export default function ReviewsPage() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  // Мемоизированный список отзывов
  const reviews = useMemo(() => reviewsData || [], []);

  /* ----------------------------------------------------------
     IntersectionObserver — плавное появление всей страницы
  ---------------------------------------------------------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window === "undefined" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ----------------------------------------------------------
     Tilt — только на десктопах, с обновлением при resize
  ---------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setEnableTilt(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTiltMove = useCallback(
    (event) => {
      if (!enableTilt) return;

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `
        perspective(1000px)
        translateY(-6px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    },
    [enableTilt]
  );

  const handleTiltLeave = useCallback(
    (event) => {
      if (!enableTilt) return;
      const card = event.currentTarget;
      card.style.transform =
        "perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)";
    },
    [enableTilt]
  );

  return (
    <section
      ref={sectionRef}
      className={`reviews-page-section ${
        visible ? "reviews-page-section--visible" : ""
      }`}
      aria-label="All customer reviews for EcoHub Logistics"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      {/* SEO microdata */}
      <meta itemProp="name" content="Customer reviews — EcoHub Logistics" />
      <meta
        itemProp="description"
        content="Read all customer reviews and real feedback from clients who shipped their vehicles with EcoHub Logistics across the United States."
      />

      {/* HEAD */}
      <header className="reviews-page-head">
        <span className="reviews-page-kicker">All customer feedback</span>
        <h1 className="reviews-page-title">Customer Reviews</h1>

        <p className="reviews-page-subtitle">
          Honest feedback from clients across the United States who shipped
          their vehicles with EcoHub Logistics — cars, box trucks, Amazon vans,
          and more.
        </p>
      </header>

      {/* GRID */}
      <div
        className="reviews-page-grid"
        role="list"
        aria-label="Full list of EcoHub Logistics customer reviews"
        itemProp="mainEntity"
      >
        {reviews.map((r, i) => (
          <article
            key={`${r.author}-${i}`}
            className="review-card big"
            role="listitem"
            itemScope
            itemType="https://schema.org/Review"
            itemProp="review"
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            <meta itemProp="author" content={r.author} />
            <meta itemProp="reviewRating" content={String(r.rating)} />
            <meta itemProp="position" content={String(i + 1)} />

            <div className="review-header">
              <div className="review-avatar-shell">
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="review-avatar"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div>
                <p className="review-author" itemProp="name">
                  {r.author}
                </p>
                <p className="review-rating">
                  {"★".repeat(r.rating)}
                  <span className="review-rating-outof">/5</span>
                </p>
              </div>
            </div>

            <p className="review-text" itemProp="reviewBody">
              {r.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
