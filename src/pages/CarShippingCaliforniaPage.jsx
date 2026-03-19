import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";

export default function CarShippingCaliforniaPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-california";

  return (
    <main>
      <MetaSEO
        title="Car Shipping California"
        description="Professional car shipping services in California. Door-to-door auto transport across Los Angeles, San Diego, San Francisco. Fast quotes, insured carriers."
        canonical={canonical}
        robots="index,follow"
      />

      <section className="svc-container">
        <h1>Car Shipping in California</h1>

        <p>
          EcoHub Logistics provides reliable car shipping services across California,
          including Los Angeles, San Diego, San Francisco, Sacramento, and surrounding areas.
        </p>

        <p>
          Whether you need open or enclosed auto transport, we connect you with
          insured carriers and ensure safe, on-time delivery.
        </p>

        <h2>California Auto Transport Services</h2>

        <ul>
          <li>Open car transport (budget-friendly)</li>
          <li>Enclosed transport for luxury vehicles</li>
          <li>Door-to-door delivery</li>
          <li>Flexible scheduling</li>
        </ul>

        <h2>Cost of Car Shipping in California</h2>

        <p>
          Prices depend on distance, demand, vehicle type, and season. Popular
          routes like California to Texas or California to Florida are very common.
        </p>

        <p>
          Average cost: $700 – $1600 depending on distance and transport type.
        </p>

        <h2>Popular Routes</h2>

        <ul>
          <li>Los Angeles → Texas</li>
          <li>San Diego → Florida</li>
          <li>San Francisco → New York</li>
        </ul>

        <h2>Why Choose EcoHub Logistics?</h2>

        <ul>
          <li>Insured carriers</li>
          <li>Fast quotes</li>
          <li>Nationwide coverage</li>
          <li>Real coordinator support</li>
        </ul>

        <Link to="/quote" className="svc-btn-primary">
          Get a Free Quote
        </Link>
      </section>

      <QuoteSection />
    </main>
  );
}