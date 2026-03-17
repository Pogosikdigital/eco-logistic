// src/pages/services/BoatTransportPage.jsx
import React from "react";
import { Link } from "react-router-dom";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/Boat.webp";
import "./service-page.css";

export default function BoatTransportPage() {
  const canonical = "https://www.ecohublogistics.com/services/boat-transport";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Boat Transport"
        description="Reliable boat transport across the USA. Door-to-door options, insured carriers, careful handling, and real coordinator support."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Boat Transport | EcoHub Logistics",
          description:
            "Boat shipping across the USA with insured carriers. Flexible scheduling and professional coordination.",
          image: "https://www.ecohublogistics.com/og/boat-transport.webp",
          imageAlt: "Boat transport service by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Boat Transport | EcoHub Logistics",
          description:
            "Reliable boat transport nationwide. Insured carriers, careful handling, fast quotes.",
          image: "https://www.ecohublogistics.com/og/boat-transport.webp",
          imageAlt: "Boat transport service by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Boat Transport",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
            serviceType: "Boat Transport",
            url: canonical,
            description:
              "Reliable boat transport across the USA with insured carriers and coordinator support.",
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
                name: "Boat Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <section className="svc-hero" aria-label="Boat transport hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
            <div>
              <span className="svc-badge">AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Boat Transport Across the USA
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Reliable boat transport with careful handling and insured
                carriers. Flexible scheduling, door-to-door options when
                available, and real coordinator support.
              </p>

              <ul className="svc-bullets">
                <li>✅ Nationwide boat transport (various sizes)</li>
                <li>✅ Insured carriers + professional handling</li>
                <li>✅ Flexible pickup scheduling</li>
                <li>✅ Coordinator support from start to finish</li>
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
                Tip: have boat length, beam width, height, and trailer status
                ready for the fastest pricing.
              </p>
            </div>

            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />
              <div className="svc-hero-media">
                <img
                  src={heroImg}
                  alt="Boat transport service across the USA"
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

      <section className="svc-container svc-grid" aria-label="Boat transport info">
        <article className="svc-block">
          <h2 className="svc-h2">How boat transport works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, your boat dimensions, and
            whether it&apos;s on a trailer. We match the shipment with the right
            carrier and coordinate the move end-to-end.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Boat size (length, beam, height)</li>
            <li>Trailer availability / loading requirements</li>
            <li>Route demand & permits (if needed)</li>
            <li>Timing and seasonality</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            Simple prep helps ensure safe pickup and delivery.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Confirm dimensions (L / W / H)</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Secure loose items</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Check trailer tires / lights</span>
              <span className="svc-tag svc-tag--help">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Boat transport FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Can you ship a boat without a trailer?</summary>
            <p>
              Yes, depending on size and location. Share the details and we’ll
              match the right equipment and carrier.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do boats require permits?</summary>
            <p>
              Some oversized boats may require permits. Your coordinator will
              advise based on dimensions and route.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is it insured during transport?</summary>
            <p>
              Carriers are insured. We confirm coverage details before pickup.
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