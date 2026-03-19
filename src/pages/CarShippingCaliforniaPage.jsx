import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";
import QuoteSection from "../components/QuoteSection";
import "./services/service-page.css";

export default function CarShippingCaliforniaPage() {
  const canonical = "https://www.ecohublogistics.com/car-shipping-california";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/WebPage">
      <MetaSEO
        title="Car Shipping in California"
        description="Reliable car shipping in California with door-to-door auto transport across Los Angeles, San Diego, San Francisco, Sacramento, and more."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Car Shipping in California",
          description:
            "Door-to-door car shipping in California with insured carriers, flexible scheduling, and fast quote support.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in California by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Car Shipping in California",
          description:
            "Reliable California auto transport with insured carriers and door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "Car shipping in California by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Car Shipping in California",
            serviceType: "California Auto Transport",
            url: canonical,
            description:
              "Door-to-door car shipping in California with insured carriers and flexible scheduling.",
            areaServed: {
              "@type": "State",
              name: "California",
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

      <section className="svc-hero" aria-label="California car shipping hero">
        <div className="svc-hero-bg" />

        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">CALIFORNIA AUTO TRANSPORT</span>

              <h1 className="svc-title" itemProp="name">
                Car Shipping in California
              </h1>

              <p className="svc-subtitle" itemProp="description">
                EcoHub Logistics provides professional car shipping in California,
                including Los Angeles, San Diego, San Francisco, Sacramento, and
                surrounding markets. We help coordinate door-to-door transport
                with insured carriers and practical scheduling support.
              </p>

              <ul className="svc-bullets">
                <li>✅ California statewide auto transport</li>
                <li>✅ Door-to-door delivery where available</li>
                <li>✅ Open and enclosed options</li>
                <li>✅ Support for private customers and dealerships</li>
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
                Tip: California routes are among the busiest in the country, so
                accurate ZIP codes help speed up pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="California shipping overview">
        <article className="svc-block">
          <h2 className="svc-h2">California auto transport services</h2>

          <p className="svc-p">
            Car shipping in California is commonly used for relocations, online
            car purchases, dealership deliveries, and long-distance moves. Major
            routes often connect California with Texas, Florida, Arizona, and
            the East Coast.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">Popular California cities</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Los Angeles</li>
            <li>San Diego</li>
            <li>San Francisco</li>
            <li>Sacramento</li>
            <li>San Jose</li>
            <li>Fresno</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">What affects price in California</h2>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Route length</span>
              <span className="svc-tag svc-tag--ok">Key factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Metro vs remote access</span>
              <span className="svc-tag svc-tag--help">Can change cost</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Vehicle type</span>
              <span className="svc-tag svc-tag--help">Changes pricing</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request California pricing →
          </Link>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">How much does car shipping in California cost?</h2>

          <p className="svc-p">
            California shipping prices vary based on route demand, pickup timing,
            distance, and whether you choose open or enclosed transport. Because
            California is such a large and active market, there are many common
            shipping lanes available.
          </p>

          <p className="svc-p">
            Open transport is the most affordable option for most shipments.
            Enclosed transport costs more, but it may be the better choice for
            luxury or specialty vehicles.
          </p>

          <h3 className="svc-h3">Popular California routes</h3>
          <ul className="svc-list svc-list--bullets">
            <li>California to Texas</li>
            <li>California to Florida</li>
            <li>California to New York</li>
            <li>Los Angeles to San Francisco</li>
          </ul>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="California shipping FAQ">
        <h2 className="svc-h2">California car shipping FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Do you ship cars from Los Angeles?</summary>
            <p>
              Yes. Los Angeles is one of the most common pickup and delivery
              areas for California auto transport.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is enclosed transport available in California?</summary>
            <p>
              Yes. Enclosed transport is available for customers shipping
              luxury, classic, exotic, or high-value vehicles.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Can you ship cars between California and Texas?</summary>
            <p>
              Yes. California to Texas is a common long-distance route in auto
              transport.
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