import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";
import "./services/service-page.css";

export default function CarShippingFloridaPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-florida";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Car Shipping in Florida"
        description="Reliable car shipping in Florida with door-to-door auto transport across Orlando, Miami, Tampa, Jacksonville, and other Florida cities."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Car Shipping in Florida",
          description:
            "Door-to-door car shipping in Florida with insured carriers, flexible scheduling, and fast quote support.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in Florida by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Car Shipping in Florida",
          description:
            "Reliable Florida auto transport with insured carriers and door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in Florida by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Car Shipping in Florida",
            serviceType: "Florida Auto Transport",
            url: canonical,
            description:
              "Door-to-door car shipping in Florida with insured carriers and flexible scheduling.",
            areaServed: {
              "@type": "State",
              name: "Florida",
            },
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
              telephone: "+1-650-999-9660",
            },
          },
        ]}
      />

      <section className="svc-hero" aria-label="Florida car shipping hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">FLORIDA AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Car Shipping in Florida
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Looking for reliable car shipping in Florida? EcoHub Logistics
                helps customers move vehicles across Orlando, Miami, Tampa,
                Jacksonville, Fort Lauderdale, and other Florida cities with
                door-to-door auto transport and insured carriers.
              </p>

              <ul className="svc-bullets">
                <li>✅ Door-to-door auto transport across Florida</li>
                <li>✅ Insured carriers and flexible scheduling</li>
                <li>✅ Open and enclosed transport options</li>
                <li>✅ Real coordinator support from pickup to delivery</li>
              </ul>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>

                <Link to="/services/car-shipping" className="svc-btn-ghost">
                  View nationwide car shipping
                </Link>
              </div>

              <p className="svc-note">
                Tip: Florida is one of the busiest transport markets in the USA,
                which often helps with route availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="Florida shipping overview">
        <article className="svc-block">
          <h2 className="svc-h2">Florida auto transport services</h2>

          <p className="svc-p">
            We help customers ship cars to and from Florida for relocation,
            online purchases, seasonal travel, dealership transfers, and family
            moves. Common routes include Florida to Texas, Florida to New York,
            and Florida to California.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">Popular Florida cities</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Orlando</li>
            <li>Miami</li>
            <li>Tampa</li>
            <li>Jacksonville</li>
            <li>Fort Lauderdale</li>
            <li>St. Petersburg</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">What affects price in Florida</h2>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Route distance</span>
              <span className="svc-tag svc-tag--ok">Key factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Seasonality</span>
              <span className="svc-tag svc-tag--help">Snowbird impact</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Open vs enclosed</span>
              <span className="svc-tag svc-tag--help">Changes pricing</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request Florida pricing →
          </Link>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">How much does car shipping in Florida cost?</h2>

          <p className="svc-p">
            Car shipping cost in Florida depends on route length, pickup window,
            vehicle size, and transport type. Open transport is usually the most
            cost-effective option, while enclosed shipping is preferred for
            luxury, exotic, or collector vehicles.
          </p>

          <p className="svc-p">
            Florida is also heavily affected by seasonal demand, especially
            during snowbird months, when many customers ship vehicles in and out
            of the state. That can affect both pricing and dispatch speed.
          </p>

          <h3 className="svc-h3">Popular Florida routes</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Florida to New York</li>
            <li>Florida to Texas</li>
            <li>Florida to California</li>
            <li>Orlando to Miami</li>
          </ul>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="Florida shipping FAQ">
        <h2 className="svc-h2">Florida car shipping FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Do you ship cars to and from Orlando?</summary>
            <p>
              Yes. Orlando is one of the common pickup and delivery areas for
              Florida auto transport.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Does snowbird season affect Florida car shipping?</summary>
            <p>
              Yes. Seasonal demand can increase pricing and change pickup timing,
              especially during peak migration months.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is enclosed transport available in Florida?</summary>
            <p>
              Yes. Enclosed transport is available for customers who want extra
              protection for luxury, exotic, or classic vehicles.
            </p>
          </details>
        </div>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">Related pages</h2>
          <ul className="svc-list svc-list--bullets">
            <li>
              <Link to="/services/car-shipping">Car shipping across the USA</Link>
            </li>
            <li>
              <Link to="/car-shipping-california">Car shipping in California</Link>
            </li>
            <li>
              <Link to="/car-shipping-texas">Car shipping in Texas</Link>
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