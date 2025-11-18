import React from "react";
import "./styles/how.css";

export default function HowItWorks() {
  return (
    <section
      className="how-section"
      id="how"
      aria-label="How EcoHub Logistics vehicle transport works"
    >
      {/* 🔵 9 плавающих точек (премиальная анимация) */}
      <div className="how-particle how-p1"></div>
      <div className="how-particle how-p2"></div>
      <div className="how-particle how-p3"></div>
      <div className="how-particle how-p4"></div>
      <div className="how-particle how-p5"></div>
      <div className="how-particle how-p6"></div>
      <div className="how-particle how-p7"></div>
      <div className="how-particle how-p8"></div>
      <div className="how-particle how-p9"></div>

      <div className="how-container">
        <h2 className="how-title">How it works</h2>
        <p className="how-subtitle">
          Simple, transparent steps from pickup to delivery.
        </p>

        <div className="how-steps">
          {/* STEP 1 */}
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Request a Quote</h3>
              <p>
                Share your pickup & delivery ZIPs, vehicle type, and timing
                preferences.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Book & Schedule</h3>
              <p>
                Lock in your rate, select open or enclosed transport, and choose a
                pickup window.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Pickup & Transit</h3>
              <p>
                Licensed, insured carriers load your vehicle and provide real-time
                updates.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Delivery & Inspection</h3>
              <p>
                Inspect upon arrival. Pay remaining balance and rate your
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
