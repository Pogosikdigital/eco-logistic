// src/components/Services.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";
import "./styles/services.css";

function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ------------------------------------------------------------
  // MEMOIZED DATA — чтобы массив не ререндерился никогда
  // ------------------------------------------------------------
  const services = useMemo(() => servicesData, []);

  // ------------------------------------------------------------
  // INTERSECTION OBSERVER — плавная загрузка секции
  // ------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window === "undefined" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
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
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`services-section ${
        isVisible ? "services-section--visible" : ""
      }`}
      id="services"
      aria-label="EcoHub Logistics vehicle transport services"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Vehicle shipping services" />
      <meta
        itemProp="description"
        content="Nationwide vehicle transport: cars, trucks, vans, and commercial fleet shipping."
      />

      <div className="services-container">
        {/* LABEL */}
        <span className="services-label">What we ship</span>

        {/* TITLE */}
        <h2 className="services-title">Vehicle Transport Services</h2>

        {/* SUBTITLE */}
        <p className="services-subtitle">
          Professional, insured, and nationwide vehicle shipping.
        </p>

        {/* GRID */}
        <div
          className="services-grid"
          role="list"
          aria-label="Types of vehicle shipping services"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              desc={service.desc}
              img={service.img}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Services);
