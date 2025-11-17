// src/components/Reviews.jsx
import React, { useEffect, useRef } from "react";
import "./styles/reviews.css";

const reviewsData = [
  {
    author: "Daniel M.",
    avatar:
      "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff&width=64",
    rating: 5,
    text: "Delivered my motorcycle from CA to FL. Zero issues. Very smooth and fast.",
  },
  {
    author: "Marcus L.",
    avatar:
      "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff&width=64",
    rating: 5,
    text: "Booked enclosed for my classic. Professional loading, on time, and super friendly coordinator.",
  },
  {
    author: "Jenna S.",
    avatar:
      "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff&width=64",
    rating: 5,
    text: "Great value. Picked up within 24h and delivered early morning. Would use again.",
  },
  {
    author: "Omar R.",
    avatar:
      "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff&width=64",
    rating: 4,
    text: "Needed winch service for a project car. Smooth experience and clear expectations.",
  },
];

// infinite scroll list
const duplicated = [...reviewsData, ...reviewsData, ...reviewsData];

export default function Reviews() {
  const trackRef = useRef(null);
  const speed = 0.4;

  useEffect(() => {
    const track = trackRef.current;
    let position = 0;
    let frame;

    const move = () => {
      position -= speed;
      track.style.transform = `translateX(${position}px)`;

      if (Math.abs(position) > track.scrollWidth / 3) {
        position = 0;
      }

      frame = requestAnimationFrame(move);
    };

    move();

    const container = document.querySelector(".reviews-carousel");
    container.onmouseenter = () => cancelAnimationFrame(frame);
    container.onmouseleave = () => move();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="reviews-section"
      id="reviews"
      itemScope
      itemType="https://schema.org/Review"
    >
      <h2 className="reviews-title">Customer Reviews</h2>
      <p className="reviews-subtitle">Real feedback from clients nationwide.</p>

      <div className="reviews-carousel">
        <div className="reviews-track" ref={trackRef}>
          {duplicated.map((rev, i) => (
            <div
              key={i}
              className="review-card"
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="itemReviewed" content="EcoHub Logistics" />

              <div className="review-header">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="review-avatar"
                />
                <div>
                  <p className="review-author" itemProp="author">
                    {rev.author}
                  </p>
                  <p className="review-rating">{"★".repeat(rev.rating)}</p>
                </div>
              </div>

              <p className="review-text" itemProp="reviewBody">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <button
        className="reviews-cta"
        onClick={() => (window.location.href = "/reviews")}
      >
        Read More Reviews <span className="arrow">›</span>
      </button>
    </section>
  );
}