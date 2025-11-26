// src/components/HowItWorks.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles/how.css";

function HowItWorksComponent() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // STATIC STEPS — optimized
  const steps = useMemo(
    () => [
      {
        number: 1,
        title: "Request a Quote",
        text: "Share your pickup & delivery ZIPs, vehicle type, and timing preferences.",
      },
      {
        number: 2,
        title: "Book & Schedule",
        text: "Lock in your rate, select open or enclosed transport, and choose a pickup window.",
      },
      {
        number: 3,
        title: "Pickup & Transit",
        text: "Licensed, insured carriers load your vehicle and provide real-time updates.",
      },
      {
        number: 4,
        title: "Delivery & Inspection",
        text: "Inspect upon arrival, pay the remaining balance, and rate your experience.",
      },
    ],
    []
  );

  // Smooth scroll progress → CSS variable
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frameId = null;

    const update = () => {
      frameId = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = rect.height;

      const viewportMid = vh * 0.5;
      const dist = viewportMid - rect.top;
      let p = dist / h;
      if (p < 0) p = 0;
      if (p > 1) p = 1;

      setScrollProgress(p);
    };

    const handler = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-section"
      id="how"
      aria-label="How EcoHub Logistics vehicle transport works"
      style={{ "--how-progress": scrollProgress }}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <meta
        itemProp="name"
        content="How EcoHub Logistics vehicle shipping process works"
      />
      <meta
        itemProp="description"
        content="Step-by-step auto transport process: request a quote, book and schedule, pickup and transit, delivery and inspection."
      />

      {/* float particles */}
      <div className="how-particle how-p1" aria-hidden="true" />
      <div className="how-particle how-p2" aria-hidden="true" />
      <div className="how-particle how-p3" aria-hidden="true" />
      <div className="how-particle how-p4" aria-hidden="true" />
      <div className="how-particle how-p5" aria-hidden="true" />
      <div className="how-particle how-p6" aria-hidden="true" />
      <div className="how-particle how-p7" aria-hidden="true" />
      <div className="how-particle how-p8" aria-hidden="true" />
      <div className="how-particle how-p9" aria-hidden="true" />

      <div className="how-container">
        <span className="how-label">Step-by-step process</span>

        <h2 className="how-title">How it works</h2>
        <p className="how-subtitle">
          Simple, transparent steps from pickup to delivery.
        </p>

        <div
          className="how-grid"
          role="list"
          aria-label="Vehicle shipping steps from quote to delivery"
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className="how-card"
              role="listitem"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <meta itemProp="position" content={String(step.number)} />

              <div className="how-card-header">
                <div className="step-number">{step.number}</div>
                <h3 itemProp="name">{step.title}</h3>
              </div>

              <p itemProp="text">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HowItWorksComponent);
