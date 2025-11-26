// src/components/Services.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";
import "./styles/services.css";

function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Мемоизация массива (ускорение)
  const services = useMemo(() => servicesData, []);

  // Intersection Observer → плавный fade-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Фоллбек для старых браузеров
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services-section ${
        isVisible ? "services-section--visible" : ""
      }`}
      aria-label="EcoHub Logistics vehicle transport services"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Vehicle shipping services" />
      <meta
        itemProp="description"
        content="Nationwide auto transport: cars, SUVs, motorcycles, vans, trucks, boats, RVs, commercial fleet vehicles."
      />

      <div className="services-container">
        <span className="services-label">What we ship</span>

        <h2 className="services-title">Vehicle Transport Services</h2>

        <p className="services-subtitle">
          Professional, insured, and nationwide vehicle shipping.
        </p>

        <div className="services-grid" role="list">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              img={service.img}
              title={service.title}
              desc={service.desc}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Services);
