// src/components/WhyPartner.jsx
import React, { useEffect, useRef, useState } from "react";
import "./why.css";

import photoRefer from "../assets/photo-refer.jpg";
import photoLogistics from "../assets/photo-logistics.jpg";
import photoFlexible from "../assets/photo-flexible.jpg";

export default function WhyPartner() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.25 }
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
        <h2 className="why-title">Why Partner With EcoHub?</h2>
        <p className="why-subtitle">
          Start earning just by connecting people who need vehicle shipping
          with a team that handles everything from quote to delivery.
        </p>

        <div className="why-grid">
          <WhyCard
            img={photoRefer}
            text="No commitment, contracts or fees — simply refer and earn on every completed shipment."
          />
          <WhyCard
            img={photoLogistics}
            text="We handle dispatch, drivers, updates and customers — you focus only on bringing leads."
          />
          <WhyCard
            img={photoFlexible}
            text="Flexible income from anywhere — perfect for influencers, agents or business owners."
          />
        </div>
      </div>
    </section>
  );
}

function WhyCard({ img, text }) {
  return (
    <article className="why-card">
      <div className="why-img-frame">
        <img src={img} alt={text} loading="lazy" decoding="async" />
      </div>
      <p className="why-text">{text}</p>
    </article>
  );
}
