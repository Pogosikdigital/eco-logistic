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
import MetaSEO from "../components/MetaSEO";

export default function ReviewsPage() {
  const canonical = "https://www.ecohublogistics.com/reviews";

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  const reviews = useMemo(() => reviewsData || [], []);

  // ---------------- SEO (Unhead) ----------------
  const avgRating = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
    return Math.round((total / reviews.length) * 10) / 10; // 4.8
  }, [reviews]);

  const reviewCount = reviews.length || 0;

  /* ----------------------------------------------------------
     INTERSECTION OBSERVER + FAILSAFE
  ---------------------------------------------------------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      setVisible(true);
      return;
    }

    const failsafe = setTimeout(() => setVisible(true), 350);

    if (!("IntersectionObserver" in window)) {
      clearTimeout(failsafe);
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setVisible(true);
          observer.unobserve(entry.target);
          clearTimeout(failsafe);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  /* ----------------------------------------------------------
     TILT EFFECT ENABLE ON DESKTOP
  ---------------------------------------------------------- */
  useEffect(() => {
    const update = () => setEnableTilt(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
      event.currentTarget.style.transform =
        "perspective(1000px) translateY(0) rotateX(0) rotateY(0)";
    },
    [enableTilt]
  );

  return (
    <>
      <MetaSEO
        title="Customer Reviews"
        description="Read real customer reviews about EcoHub Logistics. Verified feedback from people across the USA who shipped cars, motorcycles, trucks, and boats."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Customer Reviews | EcoHub Logistics",
          description:
            "Verified customer reviews for EcoHub Logistics — nationwide auto transport across the USA.",
          image: "https://www.ecohublogistics.com/og/reviews.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Customer Reviews | EcoHub Logistics",
          description:
            "See verified reviews from customers who shipped vehicles with EcoHub Logistics.",
          image: "https://www.ecohublogistics.com/og/reviews.jpg",
        }}
        jsonLd={[
          // WebPage schema
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Customer Reviews",
            url: canonical,
            description:
              "Verified customer reviews for EcoHub Logistics vehicle shipping services across the USA.",
            isPartOf: {
              "@type": "WebSite",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
          },

          // Breadcrumbs
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ecohublogistics.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Reviews",
                item: canonical,
              },
            ],
          },

          // AggregateRating (только если есть данные)
          ...(reviewCount && avgRating
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "EcoHub Logistics",
                  url: "https://www.ecohublogistics.com/",
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: String(avgRating),
                    reviewCount: String(reviewCount),
                  },
                },
              ]
            : []),
        ]}
      />

      <section
        ref={sectionRef}
        className={`reviews-page-section ${
          visible ? "reviews-page-section--visible" : ""
        }`}
        aria-label="All customer reviews — EcoHub Logistics"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <meta itemProp="name" content="Customer Reviews — EcoHub Logistics" />
        <meta
          itemProp="description"
          content="All verified reviews from real customers who shipped vehicles using EcoHub Logistics."
        />

        {/* PAGE HEAD */}
        <header className="reviews-page-head">
          <span className="reviews-page-kicker">Customer feedback</span>
          <h1 className="reviews-page-title">Customer Reviews</h1>

          <p className="reviews-page-subtitle">
            Real reviews from people across the US who shipped cars, motorcycles,
            trucks and boats with EcoHub Logistics.
          </p>
        </header>

        {/* GRID */}
        <div className="reviews-page-grid" role="list">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="review-card big"
              role="listitem"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
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
                  <p className="review-author">{r.author}</p>
                  <p className="review-rating">
                    {"★".repeat(r.rating)}{" "}
                    <span className="review-rating-outof">/5</span>
                  </p>
                </div>
              </div>

              <p className="review-text">{r.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
