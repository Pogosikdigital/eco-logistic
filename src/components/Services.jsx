// src/components/Services.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";
import "./styles/services.css";

function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = useMemo(() => servicesData, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services-section ${isVisible ? "services-section--visible" : ""}`}
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
              href={service.href}   // ✅ ВОТ ЭТО ГЛАВНОЕ
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Services);
