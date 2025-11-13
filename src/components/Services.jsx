import React from "react";
import { Helmet } from "react-helmet-async";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";
import "./styles/services.css";

export default function Services() {
  return (
    <section
      className="services-section"
      id="services"
      aria-label="EcoHub Logistics Transport Services"
    >
      <Helmet>
        <title>Vehicle Transport Services — EcoHub Logistics</title>
        <meta
          name="description"
          content="Premium nationwide transport services for cars, RVs, motorcycles, and heavy-duty vehicles."
        />
      </Helmet>

      <div className="services-container">
        <h2 className="services-title">Vehicle Transport Services</h2>
        <p className="services-subtitle">
          Professional, insured, and nationwide vehicle shipping.
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              desc={service.desc}
              img={service.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
