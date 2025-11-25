import React from "react";
import "./discount.css";

import discountImg from "../assets/discount-truck.jpg"; // Добавишь своё фото сюда

export default function DiscountProgram() {
  return (
    <section className="discount-wrapper" id="discount">
      <div className="discount-inner">

        {/* LEFT IMAGE */}
        <div className="discount-image-block">
          <img src={discountImg} alt="Discount Program" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="discount-content">
          <span className="discount-label">Discount Program</span>

          <h2 className="discount-title">
            Loyalty Must <br /> Be Rewarded!
          </h2>

          <p className="discount-text">
            As a valued customer, we’re excited to offer you
            <span> exclusive discounts </span>
            to make your shipping experience even better.
          </p>

          <a href="/#contact" className="discount-btn">
            Get Discounts
          </a>
        </div>

      </div>
    </section>
  );
}