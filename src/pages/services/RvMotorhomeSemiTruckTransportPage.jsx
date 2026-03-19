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
        description="Reliable RV, motorhome, and semi-truck transport across the USA with insured carriers, careful handling, flexible scheduling, and coordinator support."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "RV, Motorhome & Semi-Truck Transport",
          description:
            "Nationwide RV, motorhome, and semi-truck transport with insured carriers, careful handling, flexible scheduling, and fast quotes.",
          image: "https://www.ecohublogistics.com/og/rv-transport.webp",
          imageAlt: "RV and heavy vehicle transport by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "RV, Motorhome & Semi-Truck Transport",
          description:
            "Transport RVs and commercial vehicles nationwide with insured carriers and coordinator support.",
          image: "https://www.ecohublogistics.com/og/rv-transport.webp",
          imageAlt: "RV and heavy vehicle transport by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "RV, Motorhome & Semi-Truck Transport",
            serviceType: "RV, Motorhome and Commercial Vehicle Transport",
            url: canonical,
            description:
              "Nationwide transport for RVs, motorhomes, and semi-trucks with insured carriers and coordinator support.",
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
                name: "Can you move large RVs and motorhomes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Share vehicle dimensions and transport details so we can help match the correct carrier and route setup.",
                },
              },
              {
                "@type": "Question",
                name: "Do you handle commercial trucks?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We can arrange transport for many commercial vehicles depending on size, route, and scheduling requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Is it insured during transport?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Carriers are insured. Coverage details can be confirmed before pickup based on the assigned carrier and shipment setup.",
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
                name: "RV, Motorhome & Semi-Truck Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <section className="svc-hero" aria-label="RV and commercial transport hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner">
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
                <li>✅ Transport RVs, motorhomes, and commercial vehicles</li>
                <li>✅ Insured carriers with professional handling</li>
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

            <div className="svc-card svc-card--image" aria-hidden="true">
              <div className="svc-card-glow" />
              <div className="svc-hero-media">
                <img
                  src={heroImg}
                  alt="RV, motorhome and semi-truck transport across the USA"
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
        aria-label="RV and commercial transport info"
      >
        <article className="svc-block">
          <h2 className="svc-h2">How RV, motorhome, and commercial transport works</h2>

          <p className="svc-p">
            Share pickup and delivery ZIP codes, vehicle dimensions, weight
            details if available, and whether the vehicle is drivable. We then
            match your shipment with the right carrier and coordinate transport
            across the country.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">What affects the price</h3>

          <ul className="svc-list svc-list--bullets">
            <li>Vehicle size and overall weight</li>
            <li>Route demand and access limitations</li>
            <li>Drivable vs non-drivable condition</li>
            <li>Timing, seasonality, and urgency</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Recommended prep checklist</h2>

          <p className="svc-p">
            Quick prep helps ensure a smooth pickup and avoids delays.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Confirm dimensions (L / W / H)</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Secure loose items inside</span>
              <span className="svc-tag svc-tag--ok">✅ Recommended</span>
            </div>

            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Keys and access ready</span>
              <span className="svc-tag svc-tag--help">✅ Helpful</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      <section className="svc-container" aria-label="Why choose heavy vehicle transport">
        <article className="svc-block">
          <h2 className="svc-h2">Why professional oversized vehicle transport matters</h2>

          <p className="svc-p">
            Large vehicle transport often requires more planning than standard
            auto shipping because vehicle size, route access, weight, and
            equipment needs can all affect scheduling and carrier selection. RVs,
            motorhomes, and commercial trucks may also require more careful route
            coordination than passenger vehicles.
          </p>

          <p className="svc-p">
            EcoHub Logistics helps coordinate transport for oversized and
            specialty vehicles with insured carriers, practical communication, and
            clear scheduling support. This is useful for relocations, dealership
            moves, commercial fleet logistics, and specialty heavy vehicle
            shipments.
          </p>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">RV &amp; commercial transport FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Can you move large RVs and motorhomes?</summary>
            <p>
              Yes. Provide dimensions so we can help match the correct carrier
              and confirm route requirements.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do you handle commercial trucks?</summary>
            <p>
              Yes. We can arrange transport for many commercial vehicles
              depending on size, route, and scheduling requirements.
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

      <section className="svc-container" aria-label="Related vehicle transport services">
        <article className="svc-block">
          <h2 className="svc-h2">Related transport services</h2>

          <p className="svc-p">
            Explore related transport options depending on your vehicle type and
            shipping needs.
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
              <Link to="/services/inoperable-vehicle-transport">
                Inoperable vehicle transport
              </Link>
            </li>
            <li>
              <Link to="/services/boat-transport">Boat transport services</Link>
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