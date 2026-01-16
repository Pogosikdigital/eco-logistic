// src/pages/services/InoperableVehicleTransportPage.jsx
import React from "react";
import { Link } from "react-router-dom";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/delivery.webp";
import "./service-page.css";

export default function InoperableVehicleTransportPage() {
  const canonical =
    "https://www.ecohublogistics.com/services/inoperable-vehicle-transport";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Inoperable Vehicle Transport"
        description="Safe winch-assisted transport for non-running vehicles. Door-to-door delivery, insured carriers, flexible pickup scheduling, and real coordinator support."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Inoperable Vehicle Transport | EcoHub Logistics",
          description:
            "Non-running car shipping with winch-assisted loading. Door-to-door across the USA with insured carriers and fast quotes.",
          image: "https://www.ecohublogistics.com/og/inoperable-vehicle.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Inoperable Vehicle Transport | EcoHub Logistics",
          description:
            "Winch-assisted transport for non-running vehicles. Insured carriers, door-to-door delivery, fast quotes.",
          image: "https://www.ecohublogistics.com/og/inoperable-vehicle.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Inoperable Vehicle Transport",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
            serviceType: "Auto Transport",
            url: canonical,
            description:
              "Winch-assisted door-to-door transport for non-running vehicles across the USA.",
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
                name: "Inoperable Vehicle Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      {/* ---------------- HERO ---------------- */}
      <section
        className="svc-hero"
        aria-label="Inoperable vehicle transport hero"
      >
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
            {/* LEFT */}
            <div>
              <span className="svc-badge">AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Inoperable Vehicle Transport
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Safe winch-assisted transport for non-running vehicles.
                Door-to-door delivery with insured carriers, flexible scheduling,
                and a real coordinator helping you at every step.
              </p>

              <ul className="svc-bullets">
                <li>✅ Winch-assisted loading for non-running vehicles</li>
                <li>✅ Door-to-door nationwide delivery</li>
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
                Tip: tell us if the vehicle rolls/steers/brakes — it helps match
                the right equipment.
              </p>
            </div>

            {/* RIGHT — HERO IMAGE (как BMW: внутренняя рамка + отступ) */}
            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />

              <div className="svc-hero-media">
                <img
                  className="svc-hero-img"
                  src={heroImg}
                  alt="Inoperable vehicle transport on a carrier"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTENT GRID ---------------- */}
      <section
        className="svc-container svc-grid"
        aria-label="Inoperable transport info"
      >
        {/* LEFT BLOCK */}
        <article className="svc-block">
          <h2 className="svc-h2">How inoperable transport works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, vehicle details, and confirm it’s
            non-running. We schedule a carrier with the right equipment (winch,
            ramps) and coordinate pickup and delivery door-to-door.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Distance &amp; route demand</li>
            <li>Vehicle condition (rolls/steers/brakes)</li>
            <li>Loading difficulty &amp; access</li>
            <li>Timing (seasonality, urgency)</li>
          </ul>
        </article>

        {/* RIGHT BLOCK */}
        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            A few details help avoid delays on pickup day.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Confirm it rolls/steers/brakes</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Keys available for driver</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Clear access for equipment</span>
              <span className="svc-tag svc-tag--info">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Inoperable transport FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Can you ship a car that doesn’t start?</summary>
            <p>
              Yes. We arrange winch-assisted loading with carriers equipped for
              non-running vehicles.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do I need to be present at pickup?</summary>
            <p>
              It’s recommended. If not possible, we can coordinate an authorized
              contact and instructions.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is it insured during transport?</summary>
            <p>
              Yes, carriers are insured. Your coordinator will confirm coverage
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
