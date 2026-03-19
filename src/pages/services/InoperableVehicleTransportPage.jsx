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
        description="Safe inoperable vehicle transport across the USA with winch-assisted loading, insured carriers, door-to-door delivery, and flexible scheduling."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Inoperable Vehicle Transport",
          description:
            "Non-running vehicle shipping across the USA with winch-assisted loading, insured carriers, and door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/inoperable.webp",
          imageAlt: "Non-running vehicle transport by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Inoperable Vehicle Transport",
          description:
            "Winch-assisted transport for non-running vehicles with insured carriers and door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/inoperable.webp",
          imageAlt: "Non-running vehicle transport by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Inoperable Vehicle Transport",
            serviceType: "Non-Running Vehicle Transport",
            url: canonical,
            description:
              "Winch-assisted door-to-door transport for non-running vehicles across the USA.",
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
                name: "Can you ship a car that doesn’t start?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We arrange winch-assisted loading with carriers equipped for non-running vehicles.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to be present at pickup?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It is recommended, but if you cannot be there, an authorized contact can often be arranged with pickup instructions.",
                },
              },
              {
                "@type": "Question",
                name: "Is it insured during transport?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Carriers are insured. Your coordinator can confirm coverage details before pickup.",
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
                name: "Inoperable Vehicle Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <section
        className="svc-hero"
        aria-label="Inoperable vehicle transport hero"
      >
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
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
                Tip: tell us if the vehicle rolls, steers, and brakes — it helps
                match the right equipment.
              </p>
            </div>

            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />

              <div className="svc-hero-media">
                <img
                  className="svc-hero-img"
                  src={heroImg}
                  alt="Inoperable vehicle transport on a carrier"
                  width="1200"
                  height="800"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="svc-container svc-grid"
        aria-label="Inoperable transport info"
      >
        <article className="svc-block">
          <h2 className="svc-h2">How inoperable vehicle transport works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, vehicle details, and confirm that
            the vehicle is non-running. We then schedule a carrier with the right
            equipment, such as a winch or loading ramps, and coordinate pickup
            and delivery door-to-door.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects the price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Distance and route demand</li>
            <li>Vehicle condition: rolls, steers, brakes</li>
            <li>Loading difficulty and property access</li>
            <li>Timing, seasonality, and urgency</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            A few details help avoid delays on pickup day.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Confirm it rolls, steers, brakes</span>
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

      <section className="svc-container" aria-label="Why choose inoperable transport">
        <article className="svc-block">
          <h2 className="svc-h2">Why professional non-running vehicle transport matters</h2>

          <p className="svc-p">
            Shipping a non-running car is different from standard auto transport
            because the carrier may need special equipment and extra planning.
            Vehicles that do not start, have mechanical damage, or cannot move
            normally require clear handling instructions before pickup.
          </p>

          <p className="svc-p">
            EcoHub Logistics helps arrange inoperable vehicle transport with
            appropriate equipment, insured carriers, and practical communication
            from scheduling through delivery. This is useful for salvage vehicles,
            project cars, auction purchases, and breakdown-related transport.
          </p>
        </article>
      </section>

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
              It is recommended. If that is not possible, we can often coordinate
              with an authorized contact and pickup instructions.
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

      <section className="svc-container" aria-label="Related vehicle transport services">
        <article className="svc-block">
          <h2 className="svc-h2">Related transport services</h2>

          <p className="svc-p">
            Explore related shipping options depending on your vehicle condition
            and protection needs.
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
              <Link to="/services/motorcycle-shipping">
                Motorcycle shipping across the USA
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