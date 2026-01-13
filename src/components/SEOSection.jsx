// src/components/SEOSection.jsx
import React from "react";
import "./styles/seo-section.css";

export default function SEOSection() {
  return (
    <section id="seo" className="seo-section" aria-label="EcoHub Logistics service details">
      <div className="seo-inner">
        <h2 className="seo-title">Nationwide Car Shipping Services Across the USA</h2>

        <p>
          EcoHub Logistics is a vehicle shipping company providing insured, door-to-door auto
          transport across the United States. Whether you’re moving to a new state, buying a car
          online, sending a vehicle to a family member, or managing dealership and fleet deliveries,
          our team helps you ship your vehicle with a clear process and transparent pricing. We work
          with a network of vetted carriers to arrange pickup and delivery while keeping you updated
          from dispatch to drop-off.
        </p>

        <h2 className="seo-title">Open vs Enclosed Auto Transport</h2>
        <p>
          Most customers choose open transport because it’s the most cost-effective option for
          standard vehicles. Enclosed auto transport is recommended for luxury, classic, exotic, or
          show cars when you want extra protection from road debris and weather. If you’re not sure
          which option is right for your shipment, we’ll help you compare pricing and timing based
          on your route, vehicle type, and desired pickup window.
        </p>

        <h2 className="seo-title">How Door-to-Door Vehicle Shipping Works</h2>
        <p>
          Door-to-door shipping means the carrier picks up your vehicle as close to your address as
          safely possible and delivers it near your destination. Some neighborhoods have restrictions
          for large trucks, so pickup may happen at a nearby open area like a wide street or parking
          lot. Before pickup, we confirm the schedule, carrier details, and contact information.
          During delivery, you’ll inspect the vehicle and confirm its condition.
        </p>

        <h2 className="seo-title">Why Customers Choose EcoHub Logistics</h2>
        <ul className="seo-list">
          <li>
            <strong>Insured transport:</strong> shipments are arranged with carrier insurance for
            peace of mind.
          </li>
          <li>
            <strong>Dedicated coordination:</strong> clear communication and updates from booking to
            delivery.
          </li>
          <li>
            <strong>Transparent pricing:</strong> no hidden fees — we explain what affects the final
            rate.
          </li>
          <li>
            <strong>Nationwide coverage:</strong> routes across the USA for individuals, dealerships,
            and fleets.
          </li>
        </ul>

        <h2 className="seo-title">Auto Transport for Individuals, Dealerships, and Fleets</h2>
        <p>
          We frequently ship vehicles for private customers, dealerships, and commercial clients.
          Common shipments include passenger cars, SUVs, pickups, box trucks, and work vans. If you
          manage multiple vehicles, we can help coordinate recurring loads with predictable pickup
          windows and straightforward reporting.
        </p>

        <h2 className="seo-title">Frequently Asked Questions</h2>

        <div className="seo-faq" itemScope itemType="https://schema.org/FAQPage">
          <details className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <summary className="faq-q" itemProp="name">How much does it cost to ship a car?</summary>
            <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Pricing depends on route distance, vehicle size, seasonality, transport type (open vs
                enclosed), and pickup timing. The fastest way to get an accurate rate is to request a
                free quote with your pickup and delivery ZIP codes.
              </p>
            </div>
          </details>

          <details className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <summary className="faq-q" itemProp="name">How long does vehicle shipping take?</summary>
            <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Transit time varies by route and dispatch availability. Short routes can take a few
                days, while coast-to-coast shipments often take around 7–10 days. We confirm estimated
                timing when dispatching your carrier.
              </p>
            </div>
          </details>

          <details className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <summary className="faq-q" itemProp="name">Do I need to be present at pickup and delivery?</summary>
            <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Ideally yes, but you can appoint a trusted person to release or receive the vehicle.
                They’ll need to inspect the vehicle and sign the Bill of Lading.
              </p>
            </div>
          </details>

          <details className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <summary className="faq-q" itemProp="name">Can I ship personal items inside the car?</summary>
            <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Many carriers allow a small amount of personal items, but policies vary and extra
                weight can affect compliance. We recommend keeping the car mostly empty unless the
                carrier confirms otherwise.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
