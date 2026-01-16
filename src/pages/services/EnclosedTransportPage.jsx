// src/pages/services/EnclosedTransportPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./service-page.css";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

import heroImg from "../../assets/enclosed.webp";

export default function EnclosedTransportPage() {
  const canonical = "https://www.ecohublogistics.com/services/enclosed-transport";

  return (
    <>
      <MetaSEO
        title="Enclosed Auto Transport"
        description="Enclosed auto transport across the USA with maximum protection. Ideal for luxury, exotic, classic cars. Door-to-door shipping, insured carriers, fast quotes."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Enclosed Auto Transport | EcoHub Logistics",
          description:
            "Maximum protection for luxury, exotic and classic vehicles. Enclosed shipping across the USA. Door-to-door, insured carriers, fast quotes.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Enclosed Auto Transport | EcoHub Logistics",
          description:
            "Premium enclosed car shipping across the USA. Door-to-door, insured carriers, fast quotes.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Enclosed Auto Transport",
            url: canonical,
            description:
              "Premium enclosed auto transport across the USA for luxury, exotic and classic cars. Door-to-door, insured carriers.",
            isPartOf: {
              "@type": "WebSite",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
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
                name: "Enclosed Transport",
                item: canonical,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Enclosed Auto Transport",
            serviceType: "Enclosed vehicle shipping",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
          },
        ]}
      />

      <main className="svc-page" aria-label="Enclosed auto transport service page">
        {/* ================= HERO ================= */}
        <section className="svc-hero" aria-label="Enclosed transport hero">
          <div className="svc-hero-bg" />

          <div className="svc-container">
            <div className="svc-hero-inner">
              {/* LEFT */}
              <div>
                <span className="svc-badge">PREMIUM PROTECTION</span>

                <h1 className="svc-title">Enclosed Auto Transport</h1>

                <p className="svc-subtitle">
                  Maximum protection for luxury, exotic and classic cars.
                  Door-to-door enclosed shipping across the USA with insured
                  carriers.
                </p>

                <ul className="svc-bullets">
                  <li>✅ Fully enclosed trailer (weather + road debris protection)</li>
                  <li>✅ Ideal for luxury / exotic / classic vehicles</li>
                  <li>✅ Door-to-door nationwide delivery</li>
                  <li>✅ Insured carriers + real coordinator support</li>
                </ul>

                <div className="svc-actions">
                  <Link to="/quote" className="svc-btn-primary">
                    Get a Free Quote ▸
                  </Link>

                  <a className="svc-btn-ghost" href="tel:+16509999660">
                    Call (650) 999-9660
                  </a>
                </div>

                <p className="svc-note">Fast response. No hidden fees. Real people, real support.</p>
              </div>

              {/* RIGHT — HERO IMAGE (как BMW: внутренний отступ + внутренняя рамка) */}
              <div className="svc-card svc-card--image" aria-hidden="true">
                <div className="svc-card-glow" />
                <div className="svc-hero-media">
                  <img
                    className="svc-hero-img"
                    src={heroImg}
                    alt="Enclosed auto transport trailer shipping a luxury car"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTENT GRID ================= */}
        <section className="svc-container svc-grid" aria-label="Enclosed transport info">
          {/* LEFT BLOCK */}
          <article className="svc-block" itemScope itemType="https://schema.org/Article">
            <h2 className="svc-h2" itemProp="headline">
              What is enclosed transport?
            </h2>

            <p className="svc-p" itemProp="description">
              Enclosed auto transport means your vehicle is shipped inside a covered trailer.
              This protects it from weather, dust, road debris, and outside exposure — making it
              the best option for high-value vehicles.
            </p>

            <div className="svc-divider" />

            <h3 className="svc-h3">When enclosed is the best choice</h3>

            <ul className="svc-list svc-list--bullets">
              <li>Luxury / exotic cars</li>
              <li>Classic / collector vehicles</li>
              <li>Show cars and museum-quality vehicles</li>
              <li>New vehicles where you want “as delivered” condition</li>
            </ul>
          </article>

          {/* RIGHT BLOCK */}
          <aside className="svc-block svc-block--accent">
            <h2 className="svc-h2">Price &amp; timing</h2>

            <p className="svc-p">
              Enclosed shipping is typically more expensive than open transport because capacity
              is lower, and protection level is higher.
            </p>

            <div className="svc-checklist">
              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Pricing</span>
                <span className="svc-tag svc-tag--info">Depends on route, vehicle, season</span>
              </div>

              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Delivery</span>
                <span className="svc-tag svc-tag--info">Door-to-door available</span>
              </div>

              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Support</span>
                <span className="svc-tag svc-tag--ok">✅ Coordinator + updates</span>
              </div>
            </div>

            <Link to="/quote" className="svc-mini-cta">
              Get price for your route →
            </Link>
          </aside>
        </section>

        {/* ================= FAQ ================= */}
        <section className="svc-container svc-faq" aria-label="FAQ">
          <h2 className="svc-h2">FAQ</h2>

          <div className="svc-faq-grid">
            <details className="svc-faq-item">
              <summary>Is enclosed transport safer than open?</summary>
              <p>
                It provides higher protection from weather and road debris. For luxury/exotic/classic
                vehicles, enclosed is usually the recommended option.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>Can I ship door-to-door with enclosed?</summary>
              <p>
                Yes. Door-to-door service is available depending on access for the trailer at
                pickup/delivery locations.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>How fast can I get a quote?</summary>
              <p>
                You can request a quote in minutes. A coordinator typically responds quickly with
                price and options.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>Do you offer insurance?</summary>
              <p>Carriers are insured. Exact coverage depends on the carrier and shipment terms.</p>
            </details>
          </div>
        </section>

        {/* ================= QUOTE ================= */}
        <section className="svc-container svc-quote" aria-label="Get a quote">
          <QuoteSection />
        </section>
      </main>
    </>
  );
}
