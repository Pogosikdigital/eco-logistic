// src/components/Reviews.jsx
import React, { useEffect, useRef } from "react";
import "./styles/reviews.css";

const reviewsData = [
  { author: "Daniel M.", avatar: "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff", rating: 5, text: "Delivered my motorcycle from CA to FL. Zero issues. Very smooth and fast." },
  { author: "Marcus L.", avatar: "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff", rating: 5, text: "Booked enclosed for my classic. Professional loading, on time, and super friendly coordinator." },
  { author: "Jenna S.", avatar: "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff", rating: 5, text: "Great value. Picked up within 24h and delivered early morning." },
  { author: "Omar R.", avatar: "https://api.iconify.design/ph:user-circle-light.svg?color=%23a6c8ff", rating: 4, text: "Needed winch service for a project car. Smooth and clear expectations." }
];

const duplicated = [...reviewsData, ...reviewsData, ...reviewsData];

export default function Reviews() {
  const trackRef = useRef(null);

  /* -------------------------------------------
     🔥 3D Tilt for CARDS
  -------------------------------------------- */
  useEffect(() => {
    const cards = document.querySelectorAll(".review-card");

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
        rotateX(0)
        rotateY(0)
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

  /* -------------------------------------------
     Auto-scroll
  -------------------------------------------- */
  useEffect(() => {
    const track = trackRef.current;
    let position = 0;
    let frame;

    const move = () => {
      position -= 0.4;
      track.style.transform = `translateX(${position}px)`;

      if (Math.abs(position) > track.scrollWidth / 3) position = 0;
      frame = requestAnimationFrame(move);
    };

    move();

    const container = document.querySelector(".reviews-carousel");
    container.onmouseenter = () => cancelAnimationFrame(frame);
    container.onmouseleave = () => move();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="reviews-section" id="reviews">
      <h2 className="reviews-title">Customer Reviews</h2>
      <p className="reviews-subtitle">Real feedback from clients nationwide.</p>

      <div className="reviews-carousel">
        <div className="reviews-track" ref={trackRef}>
          {duplicated.map((rev, i) => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <img src={rev.avatar} alt={rev.author} className="review-avatar" />
                <div>
                  <p className="review-author">{rev.author}</p>
                  <p className="review-rating">{"★".repeat(rev.rating)}</p>
                </div>
              </div>
              <p className="review-text">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="reviews-cta" onClick={() => (window.location.href = "/reviews")}>
        Read More Reviews ›
      </button>
    </section>
  );
}
