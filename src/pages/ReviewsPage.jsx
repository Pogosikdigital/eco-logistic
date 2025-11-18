// src/pages/ReviewsPage.jsx
import React, { useEffect } from "react";
import "./ReviewsPage.css";
import { reviewsData } from "../data/reviewsData";

export default function ReviewsPage() {
  /* -------------------------------------------
     🔥 3D Tilt
  -------------------------------------------- */
  useEffect(() => {
    const cards = document.querySelectorAll(".review-card.big");

    const tilt = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 10;
      const rotateY = (x / rect.width) * -10;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
      `;
    };

    const reset = (card) => {
      card.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => tilt(e, card));
      card.addEventListener("mouseleave", () => reset(card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", tilt);
        card.removeEventListener("mouseleave", reset);
      });
    };
  }, []);

  return (
    <section className="reviews-page-section">
      <h1 className="reviews-page-title">Customer Reviews</h1>
      <p className="reviews-page-subtitle">
        Honest feedback from real clients across the USA.
      </p>

      <div className="reviews-page-grid">
        {reviewsData.map((r, i) => (
          <div className="review-card big" key={i}>
            <div className="review-header">
              <img src={r.avatar} alt={r.author} className="review-avatar" />
              <div>
                <p className="review-author">{r.author}</p>
                <p className="review-rating">{"★".repeat(r.rating)}</p>
              </div>
            </div>
            <p className="review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
