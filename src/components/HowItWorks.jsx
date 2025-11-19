// src/components/HowItWorks.jsx
import React from "react";
import "./styles/how.css";

export default function HowItWorks() {
  return (
    <section
      className="how-section"
      id="how"
      aria-label="How EcoHub Logistics vehicle transport works"
    >
      {/* плавающие точки-глоу */}
      <div className="how-particle how-p1" />
      <div className="how-particle how-p2" />
      <div className="how-particle how-p3" />
      <div className="how-particle how-p4" />
      <div className="how-particle how-p5" />
      <div className="how-particle how-p6" />
      <div className="how-particle how-p7" />
      <div className="how-particle how-p8" />
      <div className="how-particle how-p9" />

      <div className="how-container">
        <span className="how-label">Step-by-step process</span>

        <h2 className="how-title">How it works</h2>
        <p className="how-subtitle">
          Simple, transparent steps from pickup to delivery.
        </p>

        <div className="how-grid">
          {/* STEP 1 */}
          <article className="how-card">
            <div className="how-card-header">
              <div className="step-number">1</div>
              <h3>Request a Quote</h3>
            </div>
            <p>
              Share your pickup &amp; delivery ZIPs, vehicle type, and timing
              preferences.
            </p>
          </article>

          {/* STEP 2 */}
          <article className="how-card">
            <div className="how-card-header">
              <div className="step-number">2</div>
              <h3>Book &amp; Schedule</h3>
            </div>
            <p>
              Lock in your rate, select open or enclosed transport, and choose a
              pickup window.
            </p>
          </article>

          {/* STEP 3 */}
          <article className="how-card">
            <div className="how-card-header">
              <div className="step-number">3</div>
              <h3>Pickup &amp; Transit</h3>
            </div>
            <p>
              Licensed, insured carriers load your vehicle and provide
              real-time updates.
            </p>
          </article>

          {/* STEP 4 */}
          <article className="how-card">
            <div className="how-card-header">
              <div className="step-number">4</div>
              <h3>Delivery &amp; Inspection</h3>
            </div>
            <p>
              Inspect upon arrival, pay the remaining balance, and rate your
              experience.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
