import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";
import "./services/service-page.css";

export default function CarShippingTexasPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-texas";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Car Shipping in Texas"
        description="Reliable car shipping in Texas with door-to-door auto transport across Houston, Dallas, Austin, San Antonio, and other Texas cities."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Car Shipping in Texas",
          description:
            "Door-to-door car shipping in Texas with insured carriers, flexible scheduling, and fast quote support.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in Texas by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Car Shipping in Texas",
          description:
            "Reliable Texas auto transport with insured carriers and door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in Texas by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Car Shipping in Texas",
            serviceType: "Texas Auto Transport",
            url: canonical,
            description:
              "Door-to-door car shipping in Texas with insured carriers and flexible scheduling.",
            areaServed: {
              "@type": "State",
              name: "Texas",
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

      <section className="svc-hero" aria-label="Texas car shipping hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">TEXAS AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Car Shipping in Texas
              </h1>

              <p className="svc-subtitle" itemProp="description">
                EcoHub Logistics provides car shipping in Texas across Houston,
                Dallas, Austin, San Antonio, and surrounding regions. We help
                customers move vehicles with insured carriers, flexible
                scheduling, and door-to-door delivery where available.
              </p>

              <ul className="svc-bullets">
                <li>✅ Texas statewide vehicle transport</li>
                <li>✅ Door-to-door auto shipping</li>
                <li>✅ Open and enclosed transport options</li>
                <li>✅ Coordinator support from start to finish</li>
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
                Tip: Texas is a major transport hub, so many routes offer strong
                dispatch availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="Texas shipping overview">
        <article className="svc-block">
          <h2 className="svc-h2">Texas auto transport services</h2>

          <p className="svc-p">
            Car shipping in Texas is commonly used for relocation, dealership
            transfers, out-of-state vehicle purchases, and long-distance moves.
            Texas is one of the most active transport states in the country, with
            strong demand across major metro areas.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">Popular Texas cities</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Houston</li>
            <li>Dallas</li>
            <li>Austin</li>
            <li>San Antonio</li>
            <li>Fort Worth</li>
            <li>El Paso</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">What affects price in Texas</h2>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Distance</span>
              <span className="svc-tag svc-tag--ok">Key factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Route demand</span>
              <span className="svc-tag svc-tag--help">Major factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Vehicle size</span>
              <span className="svc-tag svc-tag--help">Changes pricing</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request Texas pricing →
          </Link>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">How much does car shipping in Texas cost?</h2>

          <p className="svc-p">
            Texas auto transport pricing depends on route length, market demand,
            vehicle type, transport method, and scheduling flexibility. Open
            transport remains the most affordable option for most standard
            shipments.
          </p>

          <p className="svc-p">
            Because Texas connects to many major states, common lanes often have
            strong carrier availability, which can help with both timing and
            pricing.
          </p>

          <h3 className="svc-h3">Popular Texas routes</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Texas to California</li>
            <li>Texas to Florida</li>
            <li>Texas to New York</li>
            <li>Houston to Dallas</li>
          </ul>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="Texas shipping FAQ">
        <h2 className="svc-h2">Texas car shipping FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Do you ship cars from Houston and Dallas?</summary>
            <p>
              Yes. Houston and Dallas are among the most common pickup and
              delivery points in Texas auto transport.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Can you ship cars between Texas and California?</summary>
            <p>
              Yes. Texas to California is one of the major long-distance routes
              in vehicle transport.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is enclosed transport available in Texas?</summary>
            <p>
              Yes. Enclosed transport is available for customers who need extra
              protection for luxury, exotic, or collector vehicles.
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
              <Link to="/car-shipping-florida">Car shipping in Florida</Link>
            </li>
            <li>
              <Link to="/car-shipping-california">Car shipping in California</Link>
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