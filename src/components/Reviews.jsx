// src/components/Reviews.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/reviews.css";
import { reviewsData } from "../data/reviewsData";

const SCROLL_SPEED = 35;

function Reviews() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  const positionRef = useRef(0);
  const frameIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const reducedMotionRef = useRef(false);

  const isPausedRef = useRef(false);

  const baseReviews = useMemo(() => reviewsData || [], []);
  const duplicatedReviews = useMemo(
    () => [...baseReviews, ...baseReviews],
    [baseReviews]
  );

  const aggregate = useMemo(() => {
    if (!baseReviews.length) return { ratingValue: 0, reviewCount: 0 };

    const sum = baseReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    const count = baseReviews.length;

    return {
      ratingValue: +(sum / count).toFixed(1),
      reviewCount: count,
    };
  }, [baseReviews]);

  /* Reduced motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;

    const listener = (e) => {
      reducedMotionRef.current = e.matches;

      if (e.matches && frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
        lastTimeRef.current = null;

        if (trackRef.current) {
          positionRef.current = 0;
          trackRef.current.style.transform = "translate3d(0, 0, 0)";
        }
      }
    };

    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  /* Tilt enable */
  useEffect(() => {
    const update = () => setEnableTilt(window.innerWidth >= 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Reveal */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* Marquee */
  useEffect(() => {
    if (reducedMotionRef.current) return;

    const track = trackRef.current;
    if (!track) return;

    positionRef.current = 0;
    lastTimeRef.current = null;

    const animate = (t) => {
      if (!trackRef.current) return;

      if (isPausedRef.current) {
        lastTimeRef.current = t;
        frameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      if (lastTimeRef.current === null) lastTimeRef.current = t;

      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      positionRef.current -= SCROLL_SPEED * dt;

      const reset = track.scrollWidth / 2;
      if (Math.abs(positionRef.current) >= reset) {
        positionRef.current += reset * Math.sign(positionRef.current);
      }

      track.style.transform = `translate3d(${positionRef.current}px,0,0)`;
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      lastTimeRef.current = null;
    };
  }, [duplicatedReviews]);

  const handlePause = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleResume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  /* Tilt */
  const handleTilt = useCallback(
    (e) => {
      if (!enableTilt || reducedMotionRef.current) return;

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      const rotateX = (y * -10).toFixed(2);
      const rotateY = (x * 12).toFixed(2);

      card.style.transform = `
        perspective(1000px)
        translateY(-4px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    },
    [enableTilt]
  );

  const handleLeave = useCallback(
    (e) => {
      if (!enableTilt) return;
      e.currentTarget.style.transform =
        "perspective(1000px) translateY(0) rotateX(0) rotateY(0)";
    },
    [enableTilt]
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={`reviews ${isVisible ? "reviews--visible" : ""}`}
      aria-label="Customer reviews"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content="EcoHub Logistics car shipping" />
      <meta
        itemProp="description"
        content="Customer reviews and feedback about EcoHub Logistics nationwide vehicle transport."
      />

      {/* ✅ AggregateRating (best/worst added) */}
      {aggregate.reviewCount > 0 && (
        <div
          itemProp="aggregateRating"
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <meta itemProp="ratingValue" content={String(aggregate.ratingValue)} />
          <meta itemProp="reviewCount" content={String(aggregate.reviewCount)} />
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="worstRating" content="1" />
        </div>
      )}

      <div className="reviews__container">
        <header className="reviews__head">
          <span className="reviews__badge">Customer Voices</span>
          <h2 className="reviews__title">Customer Reviews</h2>
          <p className="reviews__subtitle">
            Real feedback from clients who shipped their vehicles nationwide with EcoHub Logistics.
          </p>

          {aggregate.reviewCount > 0 && (
            <div className="reviews__ratingPill" aria-label="Average rating">
              <span className="reviews__ratingStar" aria-hidden="true">
                ★
              </span>
              <span className="reviews__ratingNum">{aggregate.ratingValue}</span>
              <span className="reviews__ratingOutof">/5</span>
              <span className="reviews__ratingCount">({aggregate.reviewCount})</span>
            </div>
          )}

          <div className="reviews__actions">
            <Link to="/reviews" className="home-btn-ghost reviews__btn">
              Read all reviews
            </Link>
            <Link to="/quote" className="home-btn-primary reviews__btn">
              Get a free quote
            </Link>
          </div>
        </header>

        <div
          className="reviews__carousel"
          role="region"
          aria-label="Customer reviews carousel"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onFocusCapture={handlePause}
          onBlurCapture={handleResume}
        >
          <div className="reviews__track" ref={trackRef}>
            {duplicatedReviews.map((rev, i) => (
              <article
                key={i}
                className="reviews__card"
                itemProp="review"
                itemScope
                itemType="https://schema.org/Review"
                onMouseMove={handleTilt}
                onMouseLeave={handleLeave}
              >
                <header className="reviews__cardHead">
                  <div className="reviews__avatarWrap">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="reviews__avatar"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="reviews__meta">
                    {/* ✅ Author as Person */}
                    <div
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <p className="reviews__author" itemProp="name">
                        {rev.author}
                      </p>
                    </div>

                    {/* ✅ Rating */}
                    <p
                      className="reviews__stars"
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={String(rev.rating)} />
                      <meta itemProp="bestRating" content="5" />
                      <meta itemProp="worstRating" content="1" />
                      {"★".repeat(rev.rating)}
                      <span className="reviews__outof">/5</span>
                    </p>
                  </div>
                </header>

                <p className="reviews__text" itemProp="reviewBody">
                  {rev.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Reviews);
