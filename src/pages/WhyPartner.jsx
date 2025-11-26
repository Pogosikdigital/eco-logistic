// src/components/WhyPartner.jsx
import React, { useEffect, useRef, useState } from "react";
import "./why.css";

import photoRefer from "../assets/photo-refer.jpg";
import photoLogistics from "../assets/photo-logistics.jpg";
import photoFlexible from "../assets/photo-flexible.jpg";

export default function WhyPartner() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Smooth fade-in on scroll
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="why"
      ref={ref}
      className={`why-wrapper ${visible ? "why-visible" : ""}`}
    >
      <div className="why-inner">
        <h2 className="why-title">Why Partner With Us?</h2>
        <p className="why-subtitle">
          Start earning today by helping others ship their vehicles with a trusted and reliable team.
        </p>

        <div className="why-grid">
          <WhyCard img={photoRefer} text="No Commitment — Just Refer & Earn" />
          <WhyCard img={photoLogistics} text="We Handle All The Logistics — You Earn" />
          <WhyCard img={photoFlexible} text="Flexible Income — Earn Anytime, Anywhere" />
        </div>
      </div>
    </section>
  );
}

function WhyCard({ img, text }) {
  return (
    <div className="why-card">
      <div className="why-img-frame">
        <img src={img} alt={text} loading="lazy" decoding="async" />
      </div>
      <p className="why-text">{text}</p>
    </div>
  );
}
