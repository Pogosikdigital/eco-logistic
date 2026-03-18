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
        title="Motorcycle Shipping Services"
        description="Fast, insured motorcycle shipping across the USA. Door-to-door delivery with professional handling and flexible scheduling."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Motorcycle Shipping Across the USA | EcoHub Logistics",
          description:
            "Safe, insured motorcycle shipping nationwide. Door-to-door delivery, flexible scheduling, and real coordinator support.",
          image: "https://www.ecohublogistics.com/og/motorcycle-shipping.webp",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Motorcycle Shipping Across the USA | EcoHub Logistics",
          description:
            "Fast motorcycle shipping across the USA with insured carriers and professional handling.",
          image: "https://www.ecohublogistics.com/og/motorcycle-shipping.webp",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Motorcycle Shipping Services",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
            serviceType: "Motorcycle Transport",
            url: canonical,
            description:
              "Nationwide motorcycle shipping with insured carriers, door-to-door delivery and coordinator support.",
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
                <li>✅ Secure strapping &amp; professional handling</li>
                <li>✅ Door-to-door nationwide delivery</li>
                <li>✅ Open &amp; enclosed transport options</li>
                <li>✅ Fully insured shipments</li>
              </ul>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>

                <Link to="/#contact" className="svc-btn-ghost">
                  Talk to a coordinator
                </Link>
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
                  alt="Motorcycle shipping service"
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
            <li>Distance &amp; route demand</li>
            <li>Pickup &amp; delivery accessibility</li>
            <li>Seasonality &amp; timing</li>
            <li>Protection level (open vs enclosed)</li>
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

      <section className="svc-quote" aria-label="Get a quote">
        <QuoteSection />
      </section>
    </main>
  );
}