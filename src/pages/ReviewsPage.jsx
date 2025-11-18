// src/pages/ReviewsPage.jsx
import React from "react";
import Header from "../components/Header";
import { reviewsData } from "../data/reviewsData";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  return (
    <>
      {/* HEADER (возврат и навигация) */}
      <Header />

      <section
        className="reviews-page-section"
        aria-label="All Customer Reviews"
      >
        <h1 className="reviews-page-title">Customer Reviews</h1>
        <p className="reviews-page-subtitle">
          Real feedback from clients nationwide.
        </p>

        <div className="reviews-page-grid">
          {reviewsData.map((r, i) => (
            <div className="review-card big" key={i}>
              <div className="review-header">
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="review-avatar"
                />
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
    </>
  );
}
