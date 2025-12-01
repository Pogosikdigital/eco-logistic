// src/components/DiscountProgram.jsx
import React from "react";
import "./discount.css";

import discountImg from "../assets/discount-truck.jpg"; // твой файл

export default function DiscountProgram() {
  
  const goToContact = () => {
    const el = document.getElementById("contact");

    // Если форма уже на странице — скроллим
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Если страница не главная — делаем корректный переход для HashRouter
    window.location.href = "/#/";

    // После загрузки — плавный скролл к форме
    setTimeout(() => {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <section className="discount-section" id="discount">
      <div className="discount-shell">
        
        {/* LEFT IMAGE */}
        <div className="discount-image-block">
          <img
            src={discountImg}
            alt="Vehicle transport truck with discount program"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="discount-content">
          <span className="discount-label">Loyalty & Discount Program</span>
          
          <h2 className="discount-title">
            Loyalty deserves
            <br />
            real rewards.
          </h2>

          <p className="discount-text">
            As a returning customer or partner, you get access to{" "}
            <span>exclusive pricing, repeat-client discounts</span> and priority
            scheduling on your future shipments.
          </p>

          <ul className="discount-list">
            <li>Better rates for multi-vehicle and repeat orders</li>
            <li>Priority dispatch on time-sensitive shipments</li>
            <li>Dedicated coordinator for your bookings</li>
          </ul>

          <button className="discount-btn" onClick={goToContact}>
            Get My Discount
          </button>
        </div>
      </div>
    </section>
  );
}
