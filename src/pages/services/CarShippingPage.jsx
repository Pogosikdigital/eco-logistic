// src/pages/services/CarShippingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/bmw.webp";
import "./service-page.css";

export default function CarShippingPage() {
  const canonical = "https://www.ecohublogistics.com/services/car-shipping";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Car Shipping Across the USA"
        description="Reliable door-to-door car shipping with insured carriers. Transparent pricing, flexible scheduling, and a real coordinator helping you at every step."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Car Shipping Across the USA | EcoHub Logistics",
          description:
            "Door-to-door car shipping across the USA. Insured carriers, open & enclosed transport options, fast pickup scheduling.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping across the USA by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Car Shipping Across the USA | EcoHub Logistics",
          description:
            "Reliable nationwide car shipping with insured carriers and transparent pricing.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping across the USA by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Car Shipping Across the USA",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
            serviceType: "Auto Transport",
            url: canonical,
            description:
              "Reliable door-to-door car shipping with insured carriers. Open and enclosed transport options available.",
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
                name: "Car Shipping",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <section className="svc-hero" aria-label="Car shipping hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
            <div>
              <span className="svc-badge">AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Car Shipping Across the USA
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Reliable door-to-door car shipping with insured carriers.
                Transparent pricing, flexible scheduling, and a real coordinator
                helping you at every step.
              </p>

              <ul className="svc-bullets">
                <li>✅ Door-to-door nationwide delivery</li>
                <li>✅ Open &amp; enclosed transport options</li>
                <li>✅ Fully insured carriers</li>
                <li>✅ Fast pickup scheduling</li>
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
                Tip: have pickup &amp; delivery ZIP codes ready for the fastest
                quote.
              </p>
            </div>

            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />
              <div className="svc-hero-media">
                <img
                  src={heroImg}
                  alt="Car shipping and auto transport in the USA"
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

      <section className="svc-container svc-grid" aria-label="Car shipping info">
        <article className="svc-block">
          <h2 className="svc-h2">How car shipping works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, your vehicle details, and a
            preferred pickup date. We match your shipment with a trusted carrier
            and coordinate the transport from start to finish.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Distance &amp; route demand</li>
            <li>Pickup / delivery accessibility</li>
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
              <span className="svc-checkrow-k">Keep fuel level low</span>
              <span className="svc-tag svc-tag--help">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Car shipping FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>How long does car shipping usually take?</summary>
            <p>
              Transit time depends on distance and route demand. Many routes
              take a few days, while coast-to-coast shipments may take longer.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is my vehicle insured during transport?</summary>
            <p>
              Yes, carriers are insured. Your coordinator will confirm coverage
              details and answer any questions before pickup.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do you offer enclosed transport?</summary>
            <p>
              Yes — enclosed transport is recommended for luxury, exotic, or
              classic vehicles needing maximum protection.
            </p>
          </details>
        </div>
      </section>

      <section className="svc-quote" aria-label="Get a quote">
        <QuoteSection />
      </section>
    </main>
  );
}