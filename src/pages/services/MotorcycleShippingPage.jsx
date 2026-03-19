// src/pages/services/MotorcycleShippingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/Buggy.webp";
import "./service-page.css";

export default function MotorcycleShippingPage() {
  const canonical =
    "https://www.ecohublogistics.com/services/motorcycle-shipping";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Motorcycle Shipping Across the USA"
        description="Fast, insured motorcycle shipping across the USA with door-to-door delivery, professional handling, flexible scheduling, and coordinator support."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Motorcycle Shipping Across the USA",
          description:
            "Safe, insured motorcycle shipping nationwide with door-to-door delivery, flexible scheduling, and coordinator support.",
          image: "https://www.ecohublogistics.com/og/motorcycle-shipping.webp",
          imageAlt: "Motorcycle shipping across the USA by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Motorcycle Shipping Across the USA",
          description:
            "Fast motorcycle shipping across the USA with insured carriers and professional handling.",
          image: "https://www.ecohublogistics.com/og/motorcycle-shipping.webp",
          imageAlt: "Motorcycle shipping across the USA by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Motorcycle Shipping Across the USA",
            serviceType: "Motorcycle Transport",
            url: canonical,
            description:
              "Nationwide motorcycle shipping with insured carriers, door-to-door delivery, and coordinator support.",
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
              telephone: "+1-650-999-9660",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does motorcycle shipping work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You share pickup and delivery ZIP codes, motorcycle details, and a preferred pickup date. A coordinator matches your shipment with a trusted carrier and manages the process from pickup to delivery.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer enclosed motorcycle transport?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Both open and enclosed transport options may be available depending on route, timing, and protection needs.",
                },
              },
              {
                "@type": "Question",
                name: "Is motorcycle shipping insured?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Carriers are insured. Exact coverage details depend on the assigned carrier and shipment terms.",
                },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ecohublogistics.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Motorcycle Shipping",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <section className="svc-hero" aria-label="Motorcycle shipping hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
            <div>
              <span className="svc-badge">MOTORCYCLE TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Motorcycle Shipping Across the USA
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Safe, insured motorcycle transport with experienced carriers.
                Door-to-door delivery, flexible pickup dates, and real-time
                coordination from start to finish.
              </p>

              <ul className="svc-bullets">
                <li>✅ Secure strapping and professional handling</li>
                <li>✅ Door-to-door nationwide delivery</li>
                <li>✅ Open and enclosed transport options</li>
                <li>✅ Fully insured shipments</li>
              </ul>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>

                <a className="svc-btn-ghost" href="tel:+16509999660">
                  Talk to a coordinator
                </a>
              </div>

              <p className="svc-note">
                Average response time: 5–10 minutes during business hours
              </p>
            </div>

            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />
              <div className="svc-hero-media">
                <img
                  src={heroImg}
                  alt="Motorcycle shipping service in the USA"
                  width="1200"
                  height="800"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="svc-hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="svc-container svc-grid"
        aria-label="Motorcycle shipping info"
      >
        <article className="svc-block">
          <h2 className="svc-h2">How motorcycle shipping works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, motorcycle details, and a
            preferred pickup date. We match your shipment with a trusted carrier
            and manage the transport process end-to-end.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects the price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Distance and route demand</li>
            <li>Pickup and delivery accessibility</li>
            <li>Seasonality and timing</li>
            <li>Protection level: open vs enclosed</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            A few quick steps help ensure safe loading and delivery.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Photos before pickup</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Remove loose items</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Low fuel level</span>
              <span className="svc-tag svc-tag--help">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      <section className="svc-container" aria-label="Why choose motorcycle shipping">
        <article className="svc-block">
          <h2 className="svc-h2">Why riders choose professional motorcycle shipping</h2>

          <p className="svc-p">
            Motorcycle shipping is often the simplest way to move a bike safely
            across the country without adding mileage, coordinating a long ride,
            or dealing with weather and route risks. Professional handling is
            especially helpful for custom bikes, sport bikes, touring bikes, and
            motorcycles being purchased or sold out of state.
          </p>

          <p className="svc-p">
            EcoHub Logistics helps coordinate reliable motorcycle transport with
            insured carriers, flexible scheduling, and clear communication. We
            help customers compare route options and choose the right transport
            setup based on timing, distance, and protection needs.
          </p>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="Motorcycle shipping FAQ">
        <h2 className="svc-h2">Motorcycle shipping FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>How does motorcycle shipping work?</summary>
            <p>
              You provide pickup and delivery ZIP codes, bike details, and your
              target shipping window. A coordinator then arranges transport with
              a carrier and keeps the shipment moving from pickup to delivery.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do you offer enclosed motorcycle transport?</summary>
            <p>
              Yes. Open and enclosed options may be available depending on the
              route, timing, and level of protection you want.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is motorcycle shipping insured?</summary>
            <p>
              Carriers are insured. Coverage details depend on the assigned
              carrier and shipment terms.
            </p>
          </details>
        </div>
      </section>

      <section className="svc-container" aria-label="Related vehicle transport services">
        <article className="svc-block">
          <h2 className="svc-h2">Related transport services</h2>

          <p className="svc-p">
            Explore related shipping options depending on the type of vehicle you
            need to move.
          </p>

          <ul className="svc-list svc-list--bullets">
            <li>
              <Link to="/services/car-shipping">
                Standard car shipping across the USA
              </Link>
            </li>
            <li>
              <Link to="/services/enclosed-transport">
                Enclosed auto transport for luxury and classic vehicles
              </Link>
            </li>
            <li>
              <Link to="/services/inoperable-vehicle-transport">
                Inoperable vehicle transport
              </Link>
            </li>
            <li>
              <Link to="/services/boat-transport">Boat transport services</Link>
            </li>
            <li>
              <Link to="/services/rv-motorhome-semitruck-transport">
                RV, motorhome, and semi-truck transport
              </Link>
            </li>
          </ul>
        </article>
      </section>

      <section className="svc-quote" aria-label="Get a quote">
        <QuoteSection />
      </section>
    </main>
  );
}