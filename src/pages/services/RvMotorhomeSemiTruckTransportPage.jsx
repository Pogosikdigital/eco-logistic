// src/pages/services/RvMotorhomeSemiTruckTransportPage.jsx
import React from "react";
import { Link } from "react-router-dom";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/Lineage.webp";
import "./service-page.css";

export default function RvMotorhomeSemiTruckTransportPage() {
  const canonical =
    "https://www.ecohublogistics.com/services/rv-motorhome-semitruck-transport";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="RV, Motorhome & Semi-Truck Transport"
        description="Reliable RV, motorhome, and semi-truck transport across the USA. Insured carriers, careful handling, flexible scheduling, and real coordinator support."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "RV, Motorhome & Semi-Truck Transport | EcoHub Logistics",
          description:
            "Nationwide RV, motorhome & semi-truck transport. Insured carriers, careful handling, flexible scheduling, fast quotes.",
          image: "https://www.ecohublogistics.com/og/rv-transport.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "RV, Motorhome & Semi-Truck Transport | EcoHub Logistics",
          description:
            "Transport RVs and commercial vehicles nationwide with insured carriers and coordinator support.",
          image: "https://www.ecohublogistics.com/og/rv-transport.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "RV, Motorhome & Semi-Truck Transport",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
            serviceType: "Vehicle Transport",
            url: canonical,
            description:
              "Nationwide transport for RVs, motorhomes, and semi-trucks with insured carriers and coordinator support.",
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
                name: "Services",
                item: "https://www.ecohublogistics.com/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "RV, Motorhome & Semi-Truck Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      {/* ---------------- HERO ---------------- */}
      <section className="svc-hero" aria-label="RV and commercial transport hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
            {/* LEFT */}
            <div>
              <span className="svc-badge">COMMERCIAL TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                RV, Motorhome &amp; Semi-Truck Transport
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Reliable transport for RVs, motorhomes, and commercial vehicles
                across the USA. Insured carriers, careful handling, flexible
                scheduling, and real coordinator support.
              </p>

              <ul className="svc-bullets">
                <li>✅ Transport RVs, motorhomes &amp; commercial vehicles</li>
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
                Tip: share vehicle dimensions and whether it’s drivable for the
                fastest quote.
              </p>
            </div>

            {/* RIGHT (BMW-style media frame) */}
            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />
              <div className="svc-hero-media">
                <img
                  src={heroImg}
                  alt="RV, motorhome and semi-truck transport across the USA"
                  loading="eager"
                  decoding="async"
                  className="svc-hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTENT GRID ---------------- */}
      <section
        className="svc-container svc-grid"
        aria-label="RV and commercial transport info"
      >
        {/* LEFT BLOCK */}
        <article className="svc-block">
          <h2 className="svc-h2">How RV &amp; commercial transport works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, vehicle dimensions, and whether
            it’s drivable. We match you with the right carrier and coordinate
            pickup and delivery nationwide.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Vehicle size &amp; weight</li>
            <li>Route demand and access</li>
            <li>Drivable vs non-drivable</li>
            <li>Timing and seasonality</li>
          </ul>
        </article>

        {/* RIGHT BLOCK */}
        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            Quick prep steps help ensure a smooth pickup and avoid delays.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Confirm dimensions (L/W/H)</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Secure loose items inside</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Keys + access ready</span>
              <span className="svc-tag svc-tag--help">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">RV &amp; commercial transport FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Can you move large RVs and motorhomes?</summary>
            <p>
              Yes. Provide dimensions so we can match the correct carrier and
              confirm any route requirements.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do you handle commercial trucks?</summary>
            <p>
              Yes. We can ship various commercial vehicles depending on size,
              route, and scheduling.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is it insured during transport?</summary>
            <p>
              Carriers are insured. Your coordinator will confirm coverage
              details before pickup.
            </p>
          </details>
        </div>
      </section>

      {/* ---------------- QUOTE ---------------- */}
      <section className="svc-quote" aria-label="Get a quote">
        <QuoteSection />
      </section>
    </main>
  );
}
