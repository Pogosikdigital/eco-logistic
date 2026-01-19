// src/components/HowItWorks.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/how.css";

function HowItWorksComponent() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

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

  // progress
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frameId = null;

    const update = () => {
      frameId = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = rect.height;

      const viewportMid = vh * 0.55;
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

  // visible (observer)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        obs.disconnect();
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`how-hero ${visible ? "how-hero--visible" : ""}`}
      id="how-it-works"
      aria-label="How EcoHub Logistics vehicle transport works"
      style={{ "--how-progress": scrollProgress }}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      {/* ✅ SEO Microdata */}
      <meta itemProp="name" content="How EcoHub Logistics auto transport works" />
      <meta
        itemProp="description"
        content="Step-by-step auto transport process: request a quote, book and schedule, pickup and transit, delivery and inspection."
      />

      <div className="how-hero__container">
        <div className="how-hero__top">
          <span className="how-hero__badge">Step-by-step process</span>

          <h2 className="how-hero__title">How it works</h2>

          <p className="how-hero__subtitle">
            Simple, transparent steps from pickup to delivery.
          </p>

          <div className="how-hero__actions">
            <Link to="/quote" className="how-btn-primary">
              Get a free quote
            </Link>

            <a href="/contact" className="how-btn-ghost">
              Contact
            </a>
          </div>
        </div>

        <div
          className="how-hero__grid"
          role="list"
          aria-label="Vehicle shipping steps from quote to delivery"
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className="how-step"
              role="listitem"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <meta itemProp="position" content={String(step.number)} />
              <meta itemProp="name" content={step.title} />
              <meta itemProp="text" content={step.text} />

              <div className="how-step__head">
                <div className="how-step__num" aria-hidden="true">
                  {step.number}
                </div>
                <h3 className="how-step__title">{step.title}</h3>
              </div>

              <p className="how-step__text">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HowItWorksComponent);
