// src/components/Services.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";
import "./styles/services.css";

function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = useMemo(() => servicesData || [], []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services services--card ${
        isVisible ? "services--visible" : ""
      }`}
      aria-label="EcoHub Logistics vehicle transport services"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Vehicle Transport Services" />
      <meta
        itemProp="description"
        content="Nationwide vehicle shipping services from EcoHub Logistics, including car shipping, enclosed auto transport, motorcycle shipping, inoperable vehicle transport, boat transport, and RV or semi-truck transport."
      />
      <meta itemProp="numberOfItems" content="6" />

      <div className="services__container">
        <span className="services__badge">What we ship</span>

        <h2 className="services__title">Vehicle Transport Services</h2>

        <p className="services__subtitle">
          Professional, insured, and nationwide vehicle shipping.
        </p>

        <p className="services__subtitle">
          Explore our most important transport services below, including car
          shipping, enclosed transport, motorcycle shipping, inoperable vehicle
          transport, boat transport, and RV or commercial vehicle transport
          across the USA.
        </p>

        <div className="services__grid" role="list">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              img={service.img}
              title={service.title}
              desc={service.desc}
              position={index + 1}
              href={service.href}
            />
          ))}
        </div>

        <div className="services__seo-links" aria-label="Service page links">
          <h3 className="services__title" style={{ fontSize: "1.25rem", marginTop: "2rem" }}>
            Explore Service Pages
          </h3>

          <ul
            style={{
              marginTop: "1rem",
              display: "grid",
              gap: "0.75rem",
              paddingLeft: "1.25rem",
            }}
          >
            <li>
              <Link to="/services/car-shipping">
                Car shipping across the USA
              </Link>
            </li>
            <li>
              <Link to="/services/enclosed-transport">
                Enclosed auto transport
              </Link>
            </li>
            <li>
              <Link to="/services/motorcycle-shipping">
                Motorcycle shipping across the USA
              </Link>
            </li>
            <li>
              <Link to="/services/inoperable-vehicle-transport">
                Inoperable vehicle transport
              </Link>
            </li>
            <li>
              <Link to="/services/boat-transport">
                Boat transport services
              </Link>
            </li>
            <li>
              <Link to="/services/rv-motorhome-semitruck-transport">
                RV, motorhome, and semi-truck transport
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Services);