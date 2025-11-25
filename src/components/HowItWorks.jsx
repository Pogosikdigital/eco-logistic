// src/components/HowItWorks.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles/how.css";

function HowItWorksComponent() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → 1

  // Статичные данные шагов (через useMemo, чтобы не создавать массив на каждый рендер)
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

  // Скролл-логика: плавно обновляем CSS-переменную --how-progress (0–1)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let frameId = null;

    const updateProgress = () => {
      frameId = null;

      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 1;

      const sectionHeight = rect.height || sectionEl.offsetHeight || 1;

      // Берём середину вьюпорта как точку отсчёта
      const viewportMid = viewportHeight * 0.5;
      const distance = viewportMid - rect.top; // сколько "секция под серединой"
      let progress = distance / sectionHeight;

      if (progress < 0) progress = 0;
      else if (progress > 1) progress = 1;

      setScrollProgress(progress);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    // начальный расчёт (если секция уже в зоне видимости)
    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-section"
      id="how"
      aria-label="How EcoHub Logistics vehicle transport works"
      // передаём прогресс в CSS как переменную
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

      {/* плавающие точки-глоу (теперь реагируют на скролл) */}
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
        <span className="how-label" itemProp="step">
          Step-by-step process
        </span>

        <h2 className="how-title">How it works</h2>
        <p className="how-subtitle">
          Simple, transparent steps from pickup to delivery.
        </p>

        {/* Для доступности обозначаем список шагов */}
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
                <div className="step-number" aria-hidden="true">
                  {step.number}
                </div>
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
