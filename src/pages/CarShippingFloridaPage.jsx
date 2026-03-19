import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";

export default function CarShippingFloridaPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-florida";

  return (
    <main>
      <MetaSEO
        title="Car Shipping Florida"
        description="Reliable car shipping services in Florida. Door-to-door auto transport across Miami, Orlando, Tampa and all FL. Fast quotes, insured carriers."
        canonical={canonical}
        robots="index,follow"
      />

      <section className="svc-container">
        <h1>Car Shipping in Florida</h1>

        <p>
          Looking for reliable car shipping in Florida? EcoHub Logistics provides
          professional auto transport services across the entire state, including
          Miami, Orlando, Tampa, Jacksonville, and surrounding areas.
        </p>

        <p>
          We offer door-to-door vehicle transport with insured carriers,
          flexible scheduling, and real-time coordination. Whether you are moving,
          buying a car, or relocating, we ensure safe and efficient delivery.
        </p>

        <h2>Florida Auto Transport Services</h2>

        <p>
          Our Florida car shipping services cover both local and long-distance
          routes. We connect customers with trusted carriers to deliver vehicles
          safely across the USA.
        </p>

        <ul>
          <li>Open car transport (most affordable option)</li>
          <li>Enclosed auto transport for luxury vehicles</li>
          <li>Door-to-door delivery</li>
          <li>Fast pickup scheduling</li>
        </ul>

        <h2>How Much Does Car Shipping in Florida Cost?</h2>

        <p>
          Car shipping prices in Florida depend on distance, route demand,
          vehicle type, and season. Routes like Miami to New York or Florida to
          California are among the most common.
        </p>

        <p>
          On average, car shipping in Florida ranges between $600 and $1500
          depending on the route and transport type.
        </p>

        <h2>Popular Florida Car Shipping Routes</h2>

        <ul>
          <li>Miami → New York</li>
          <li>Orlando → Texas</li>
          <li>Tampa → California</li>
          <li>Jacksonville → Illinois</li>
        </ul>

        <h2>Why Choose EcoHub Logistics?</h2>

        <p>
          We provide reliable auto transport services with a strong focus on
          customer experience. Our coordinators handle the entire process and
          ensure smooth delivery.
        </p>

        <ul>
          <li>Licensed and insured carriers</li>
          <li>Transparent pricing</li>
          <li>Fast response times</li>
          <li>Nationwide coverage</li>
        </ul>

        <h2>Get a Free Car Shipping Quote in Florida</h2>

        <p>
          Ready to ship your car? Get a free quote today and receive pricing in
          minutes. Our team is ready to help you with your Florida auto transport.
        </p>

        <Link to="/quote" className="svc-btn-primary">
          Get a Free Quote
        </Link>
      </section>

      <QuoteSection />
    </main>
  );
}