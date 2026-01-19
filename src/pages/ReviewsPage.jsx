// src/pages/ReviewsPage.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "./ReviewsPage.css";
import { reviewsData } from "../data/reviewsData";
import MetaSEO from "../components/MetaSEO";
import { Link } from "react-router-dom";

export default function ReviewsPage() {
  const canonical = "https://www.ecohublogistics.com/reviews";

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  const reviews = useMemo(() => reviewsData || [], []);

  // ---------------- SEO (computed) ----------------
  const avgRating = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const reviewCount = reviews.length || 0;

  /* Reveal */
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
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
        clearTimeout(failsafe);
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  /* Tilt */
  useEffect(() => {
    const update = () => setEnableTilt(window.innerWidth >= 900);
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
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
              ]
            : []),
        ]}
      />

      <section
        ref={sectionRef}
        className={`reviews-page ${visible ? "reviews-page--visible" : ""}`}
        aria-label="All customer reviews — EcoHub Logistics"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <meta itemProp="name" content="Customer Reviews — EcoHub Logistics" />
        <meta
          itemProp="description"
          content="All verified reviews from real customers who shipped vehicles using EcoHub Logistics."
        />

        <div className="reviews-page__container">
          {/* HEAD (Hero style) */}
          <header className="reviews-page__head">
            <span className="reviews-page__badge">Customer feedback</span>

            <h1 className="reviews-page__title">Customer Reviews</h1>

            <p className="reviews-page__subtitle">
              Real reviews from people across the US who shipped cars, motorcycles,
              trucks and boats with EcoHub Logistics.
            </p>

            {reviewCount > 0 && avgRating && (
              <div className="reviews-page__pill" aria-label="Average rating">
                <span className="reviews-page__pillStar" aria-hidden="true">
                  ★
                </span>
                <span className="reviews-page__pillNum">{avgRating}</span>
                <span className="reviews-page__pillOutof">/5</span>
                <span className="reviews-page__pillCount">({reviewCount})</span>
              </div>
            )}

            <div className="reviews-page__actions">
              <Link to="/quote" className="home-btn-primary reviews-page__btn">
                Get a free quote
              </Link>

              <Link to="/" className="home-btn-ghost reviews-page__btn">
                Back to home
              </Link>
            </div>
          </header>

          {/* GRID */}
          <div className="reviews-page__grid" role="list">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="reviews-page__card"
                role="listitem"
                itemScope
                itemType="https://schema.org/Review"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <header className="reviews-page__cardHead">
                  <div className="reviews-page__avatarShell">
                    <img
                      src={r.avatar}
                      alt={r.author}
                      className="reviews-page__avatar"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="reviews-page__meta">
                    <div
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <p className="reviews-page__author" itemProp="name">
                        {r.author}
                      </p>
                    </div>

                    <p
                      className="reviews-page__rating"
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={String(r.rating)} />
                      <meta itemProp="bestRating" content="5" />
                      <meta itemProp="worstRating" content="1" />
                      {"★".repeat(r.rating)}{" "}
                      <span className="reviews-page__outof">/5</span>
                    </p>
                  </div>
                </header>

                <p className="reviews-page__text" itemProp="reviewBody">
                  {r.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
