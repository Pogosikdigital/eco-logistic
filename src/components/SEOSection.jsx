// src/components/SEOSection.jsx
import React from "react";
import "./styles/seo-section.css";

export default function SEOSection() {
  return (
    <section
      id="seo"
      className="seo"
      aria-label="Nationwide car shipping SEO content and FAQ"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {/* ✅ SEO microdata for this block */}
      <meta itemProp="name" content="Nationwide Car Shipping Services Across the USA" />
      <meta
        itemProp="description"
        content="Insured, door-to-door vehicle shipping with transparent pricing and dedicated coordinator support."
      />

      <div className="seo__container">
        <div className="seo__grid">
          {/* LEFT: main content card */}
          <article className="seo__card">
            <header className="seo__head">
              <span className="seo__badge">AUTO TRANSPORT • INFO</span>

              <h2 className="seo__title">Nationwide Car Shipping Services Across the USA</h2>

              <p className="seo__lead">
                Insured, door-to-door vehicle shipping with a clear process, transparent pricing,
                and real coordinator support.
              </p>
            </header>

            <div className="seo__content">
              <div className="seo__block">
                <p className="seo__p">
                  EcoHub Logistics is a vehicle shipping company providing insured, door-to-door auto
                  transport across the United States. Whether you’re moving to a new state, buying a car
                  online, sending a vehicle to a family member, or managing dealership and fleet deliveries,
                  our team helps you ship your vehicle with a clear process and transparent pricing. We work
                  with a network of vetted carriers to arrange pickup and delivery while keeping you updated
                  from dispatch to drop-off.
                </p>
              </div>

              <div className="seo__split">
                <div className="seo__block">
                  <h3 className="seo__h3">Open vs Enclosed Auto Transport</h3>
                  <p className="seo__p">
                    Most customers choose open transport because it’s the most cost-effective option for
                    standard vehicles. Enclosed auto transport is recommended for luxury, classic, exotic, or
                    show cars when you want extra protection from road debris and weather. If you’re not sure
                    which option is right for your shipment, we’ll help you compare pricing and timing based
                    on your route, vehicle type, and desired pickup window.
                  </p>
                </div>

                <div className="seo__block seo__block--accent">
                  <h3 className="seo__h3">Why Customers Choose EcoHub Logistics</h3>

                  <ul className="seo__list" aria-label="Reasons customers choose EcoHub Logistics">
                    <li>
                      <span className="seo__check" aria-hidden="true">✓</span>
                      <span>
                        <strong>Insured transport:</strong> shipments are arranged with carrier insurance for peace of mind.
                      </span>
                    </li>
                    <li>
                      <span className="seo__check" aria-hidden="true">✓</span>
                      <span>
                        <strong>Dedicated coordination:</strong> clear communication and updates from booking to delivery.
                      </span>
                    </li>
                    <li>
                      <span className="seo__check" aria-hidden="true">✓</span>
                      <span>
                        <strong>Transparent pricing:</strong> no hidden fees — we explain what affects the final rate.
                      </span>
                    </li>
                    <li>
                      <span className="seo__check" aria-hidden="true">✓</span>
                      <span>
                        <strong>Nationwide coverage:</strong> routes across the USA for individuals, dealerships, and fleets.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="seo__split">
                <div className="seo__block">
                  <h3 className="seo__h3">How Door-to-Door Vehicle Shipping Works</h3>
                  <p className="seo__p">
                    Door-to-door shipping means the carrier picks up your vehicle as close to your address as
                    safely possible and delivers it near your destination. Some neighborhoods have restrictions
                    for large trucks, so pickup may happen at a nearby open area like a wide street or parking
                    lot. Before pickup, we confirm the schedule, carrier details, and contact information.
                    During delivery, you’ll inspect the vehicle and confirm its condition.
                  </p>
                </div>

                <div className="seo__block">
                  <h3 className="seo__h3">Auto Transport for Individuals, Dealerships, and Fleets</h3>
                  <p className="seo__p">
                    We frequently ship vehicles for private customers, dealerships, and commercial clients.
                    Common shipments include passenger cars, SUVs, pickups, box trucks, and work vans. If you
                    manage multiple vehicles, we can help coordinate recurring loads with predictable pickup
                    windows and straightforward reporting.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* RIGHT: FAQ card (separate FAQPage scope — ✅ correct) */}
          <aside
            className="seo__card seo__faqCard"
            aria-label="Frequently Asked Questions about car shipping"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <header className="seo__head">
              <span className="seo__badge">FAQ</span>
              <h3 className="seo__title seo__title--sm">Frequently Asked Questions</h3>
              <p className="seo__lead">
                Quick answers about pricing, timing, pickup, and personal items.
              </p>
            </header>

            <div className="seo__faq">
              <details
                className="seo__faqItem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="seo__faqQ" itemProp="name">
                  How much does it cost to ship a car?
                </summary>
                <div
                  className="seo__faqA"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="seo__p" itemProp="text">
                    Pricing depends on route distance, vehicle size, seasonality, transport type (open vs
                    enclosed), and pickup timing. The fastest way to get an accurate rate is to request a
                    free quote with your pickup and delivery ZIP codes.
                  </p>
                </div>
              </details>

              <details
                className="seo__faqItem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="seo__faqQ" itemProp="name">
                  How long does vehicle shipping take?
                </summary>
                <div
                  className="seo__faqA"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="seo__p" itemProp="text">
                    Transit time varies by route and dispatch availability. Short routes can take a few
                    days, while coast-to-coast shipments often take around 7–10 days. We confirm estimated
                    timing when dispatching your carrier.
                  </p>
                </div>
              </details>

              <details
                className="seo__faqItem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="seo__faqQ" itemProp="name">
                  Do I need to be present at pickup and delivery?
                </summary>
                <div
                  className="seo__faqA"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="seo__p" itemProp="text">
                    Ideally yes, but you can appoint a trusted person to release or receive the vehicle.
                    They’ll need to inspect the vehicle and sign the Bill of Lading.
                  </p>
                </div>
              </details>

              <details
                className="seo__faqItem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="seo__faqQ" itemProp="name">
                  Can I ship personal items inside the car?
                </summary>
                <div
                  className="seo__faqA"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="seo__p" itemProp="text">
                    Many carriers allow a small amount of personal items, but policies vary and extra
                    weight can affect compliance. We recommend keeping the car mostly empty unless the
                    carrier confirms otherwise.
                  </p>
                </div>
              </details>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
