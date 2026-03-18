import React from "react";
import "./discount.css";

import discountImg from "../assets/discount-truck.webp";

export default function DiscountProgram() {
  const goToContact = () => {
    const el = document.getElementById("contact");

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = "/#/";

    setTimeout(() => {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <section
      className="discount-section"
      id="discount"
      aria-labelledby="discount-title"
      aria-describedby="discount-desc"
    >
      <div className="discount-shell">
        {/* LEFT IMAGE */}
        <div className="discount-image-block">
          <img
            src={discountImg}
            alt="Auto transport discount program — carrier truck on the road"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="discount-content">
          <span className="discount-label">Loyalty &amp; Discount Program</span>

          <h2 className="discount-title" id="discount-title">
            Loyalty deserves
            <br />
            real rewards.
          </h2>

          <p className="discount-text" id="discount-desc">
            As a returning customer or partner, you get access to{" "}
            <span>exclusive pricing, repeat-client discounts</span> and priority
            scheduling on your future shipments.
          </p>

          <ul className="discount-list">
            <li>Better rates for multi-vehicle and repeat orders</li>
            <li>Priority dispatch on time-sensitive shipments</li>
            <li>Dedicated coordinator for your bookings</li>
          </ul>

          <button className="discount-btn" type="button" onClick={goToContact}>
            Get My Discount
          </button>
        </div>
      </div>
    </section>
  );
}
