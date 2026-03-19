import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";

export default function CarShippingTexasPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-texas";

  return (
    <main>
      <MetaSEO
        title="Car Shipping Texas"
        description="Reliable car shipping services in Texas. Door-to-door auto transport across Houston, Dallas, Austin, San Antonio. Fast quotes and insured carriers."
        canonical={canonical}
        robots="index,follow"
      />

      <section className="svc-container">
        <h1>Car Shipping in Texas</h1>

        <p>
          EcoHub Logistics offers professional car shipping services across Texas,
          including Houston, Dallas, Austin, San Antonio, and nearby areas.
        </p>

        <p>
          We provide safe, insured vehicle transport with door-to-door delivery
          and fast pickup scheduling.
        </p>

        <h2>Texas Auto Transport Services</h2>

        <ul>
          <li>Open car shipping (most common)</li>
          <li>Enclosed transport for premium vehicles</li>
          <li>Door-to-door delivery</li>
          <li>Flexible scheduling</li>
        </ul>

        <h2>How Much Does Car Shipping Cost in Texas?</h2>

        <p>
          Pricing depends on distance, vehicle type, and demand. Texas routes are
          among the busiest in the USA.
        </p>

        <p>
          Average cost: $600 – $1400 depending on route and transport type.
        </p>

        <h2>Popular Routes</h2>

        <ul>
          <li>Texas → California</li>
          <li>Houston → Florida</li>
          <li>Dallas → New York</li>
        </ul>

        <h2>Why Choose EcoHub Logistics?</h2>

        <ul>
          <li>Licensed & insured carriers</li>
          <li>Fast response</li>
          <li>Nationwide service</li>
          <li>Dedicated support</li>
        </ul>

        <Link to="/quote" className="svc-btn-primary">
          Get a Free Quote
        </Link>
      </section>

      <QuoteSection />
    </main>
  );
}