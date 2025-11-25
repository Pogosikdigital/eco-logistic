// src/components/Reviews.jsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import "./styles/reviews.css";
import { reviewsData } from "../data/reviewsData";

const AUTO_SCROLL_SPEED = 0.35; // px per frame

function Reviews() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  // Храним позицию и id кадра в ref (чтобы не терять при рендерах)
  const positionRef = useRef(0);
  const frameIdRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  // Базовые отзывы (мемоизация)
  const baseReviews = useMemo(() => reviewsData || [], []);
  // Дублируем для бесконечной ленты
  const duplicatedReviews = useMemo(
    () => [...baseReviews, ...baseReviews],
    [baseReviews]
  );

  // SEO: агрегированный рейтинг
  const aggregate = useMemo(() => {
    if (!baseReviews.length) {
      return { ratingValue: 0, reviewCount: 0 };
    }

    const sum = baseReviews.reduce(
      (acc, item) => acc + (item.rating || 0),
      0
    );
    const count = baseReviews.length;

    return {
      ratingValue: +(sum / count).toFixed(1),
      reviewCount: count,
    };
  }, [baseReviews]);

  /* ------------------------------------------------------------
     Prefers-reduced-motion + включение tilt только на десктопе
  ------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      prefersReducedMotionRef.current = mq.matches;
      const listener = (event) => {
        prefersReducedMotionRef.current = event.matches;
      };
      mq.addEventListener?.("change", listener);
      // fallback для старых браузеров
      mq.addListener?.(listener);

      return () => {
        mq.removeEventListener?.("change", listener);
        mq.removeListener?.(listener);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTilt = () => {
      setEnableTilt(window.innerWidth >= 768);
    };

    updateTilt();
    window.addEventListener("resize", updateTilt);
    return () => window.removeEventListener("resize", updateTilt);
  }, []);

  /* ------------------------------------------------------------
     IntersectionObserver — плавное появление блока
  ------------------------------------------------------------ */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window === "undefined" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------
     Автоскролл дорожки (бесконечный loop)
  ------------------------------------------------------------ */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !duplicatedReviews.length) return;

    // Если reduced-motion — не запускаем бесконечную анимацию
    if (prefersReducedMotionRef.current) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    positionRef.current = 0;

    const animate = () => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      positionRef.current -= AUTO_SCROLL_SPEED;
      trackEl.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

      const resetAt = trackEl.scrollWidth / 2;
      if (resetAt > 0 && Math.abs(positionRef.current) >= resetAt) {
        positionRef.current = 0;
      }

      frameIdRef.current = window.requestAnimationFrame(animate);
    };

    frameIdRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [duplicatedReviews]);

  /* ------------------------------------------------------------
     3D tilt только на десктопах
  ------------------------------------------------------------ */
  const handleCardMove = useCallback(
    (event) => {
      if (!enableTilt || prefersReducedMotionRef.current) return;

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `
        perspective(1000px)
        translateY(-4px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    },
    [enableTilt]
  );

  const handleCardLeave = useCallback(
    (event) => {
      if (!enableTilt) return;
      const card = event.currentTarget;
      card.style.transform =
        "perspective(1000px) translateY(0) rotateX(0) rotateY(0)";
    },
    [enableTilt]
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={`reviews-section ${
        isVisible ? "reviews-section--visible" : ""
      }`}
      aria-label="Customer reviews about EcoHub Logistics"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* SEO microdata */}
      <meta itemProp="name" content="EcoHub Logistics vehicle shipping" />
      <meta
        itemProp="description"
        content="Customer reviews and feedback about nationwide car shipping with EcoHub Logistics."
      />

      {aggregate.reviewCount > 0 && (
        <div
          itemProp="aggregateRating"
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <meta
            itemProp="ratingValue"
            content={String(aggregate.ratingValue)}
          />
          <meta
            itemProp="reviewCount"
            content={String(aggregate.reviewCount)}
          />
        </div>
      )}

      {/* HEAD */}
      <div className="reviews-head">
        <span className="reviews-kicker">Customer Voices</span>
        <h2 className="reviews-title">Customer Reviews</h2>
        <p className="reviews-subtitle">
          Real feedback from clients who shipped their vehicles nationwide with
          EcoHub Logistics.
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        className="reviews-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer review carousel"
      >
        <div className="reviews-track" ref={trackRef}>
          {duplicatedReviews.map((rev, index) => (
            <article
              key={`${rev.author}-${index}`}
              className="review-card"
              itemProp="review"
              itemScope
              itemType="https://schema.org/Review"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <meta itemProp="author" content={rev.author} />
              <meta itemProp="reviewRating" content={String(rev.rating)} />

              <header className="review-header">
                <div className="review-avatar-wrapper">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="review-avatar"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div>
                  <p className="review-author">{rev.author}</p>
                  <p className="review-rating">
                    {"★".repeat(rev.rating)}
                    <span className="review-rating-outof">/5</span>
                  </p>
                </div>
              </header>

              <p className="review-text" itemProp="reviewBody">
                {rev.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <Link to="/reviews" className="reviews-cta">
        Read all customer reviews ›
      </Link>
    </section>
  );
}

export default React.memo(Reviews);
