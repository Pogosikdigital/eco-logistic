import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../../components/MetaSEO";
import "../services/service-page.css";

export default function CarShippingCostPage() {
  const canonical = "https://www.ecohublogistics.com/how-much-does-car-shipping-cost";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/Article">
      <MetaSEO
        title="How Much Does Car Shipping Cost in 2026"
        description="Learn how much car shipping costs in 2026. Prices, key factors, examples, and how to get the best rate for auto transport in the USA."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "article",
          url: canonical,
          title: "How Much Does Car Shipping Cost in 2026",
          description:
            "Learn what affects car shipping cost, average prices by distance, and how to get the best auto transport rate.",
          image: "https://www.ecohublogistics.com/og/quote.webp",
          imageAlt: "How much car shipping costs in the USA",
        }}
        twitter={{
          card: "summary_large_image",
          title: "How Much Does Car Shipping Cost in 2026",
          description:
            "Average car shipping prices, cost factors, and practical tips to save money on auto transport.",
          image: "https://www.ecohublogistics.com/og/quote.webp",
          imageAlt: "How much car shipping costs in the USA",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How Much Does Car Shipping Cost in 2026",
            description:
              "Average car shipping prices, key cost factors, and practical guidance for auto transport in the USA.",
            mainEntityOfPage: canonical,
            url: canonical,
            author: {
              "@type": "Organization",
              name: "EcoHub Logistics",
            },
            publisher: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              logo: {
                "@type": "ImageObject",
                url: "https://www.ecohublogistics.com/logo.webp",
              },
            },
          },
        ]}
      />

      <section className="svc-hero" aria-label="Car shipping cost guide hero">
        <div className="svc-hero-bg" />
        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">AUTO TRANSPORT GUIDE</span>

              <h1 className="svc-title" itemProp="headline">
                How Much Does Car Shipping Cost in 2026?
              </h1>

              <p className="svc-subtitle" itemProp="description">
                Car shipping in the USA typically costs between $600 and $1,500+,
                depending on distance, route demand, vehicle size, transport type,
                and season. This guide explains what affects price and how to get
                the best auto transport rate.
              </p>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>
                <Link to="/services/car-shipping" className="svc-btn-ghost">
                  View car shipping service
                </Link>
              </div>

              <p className="svc-note">
                Tip: the most accurate quote always starts with pickup and delivery ZIP codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="Car shipping cost overview">
        <article className="svc-block">
          <h2 className="svc-h2">Average car shipping prices</h2>
          <p className="svc-p">
            Pricing varies by lane, timing, and vehicle details, but common ranges look like this:
          </p>

          <ul className="svc-list svc-list--bullets">
            <li>0–500 miles: about $500–$800</li>
            <li>500–1,500 miles: about $800–$1,200</li>
            <li>1,500+ miles: about $1,000–$1,500+</li>
          </ul>

          <div className="svc-divider" />

          <h3 className="svc-h3">Why prices vary</h3>
          <p className="svc-p">
            Auto transport is route-based. Popular lanes may move faster and more efficiently,
            while rural or low-demand routes can cost more due to limited carrier availability.
          </p>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Quick cost factors</h2>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Distance</span>
              <span className="svc-tag svc-tag--ok">Major factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Open vs enclosed</span>
              <span className="svc-tag svc-tag--help">Changes pricing</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Vehicle size</span>
              <span className="svc-tag svc-tag--help">Bigger costs more</span>
            </div>
          </div>

          <Link to="/quote" className="svc-mini-cta">
            Request a fast quote →
          </Link>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">What affects car shipping cost?</h2>

          <h3 className="svc-h3">1. Distance</h3>
          <p className="svc-p">
            Longer routes cost more overall, but the cost per mile is usually lower on long-distance shipments.
          </p>

          <h3 className="svc-h3">2. Transport type</h3>
          <p className="svc-p">
            Open transport is the most affordable option. Enclosed transport usually costs 30%–60% more.
          </p>

          <h3 className="svc-h3">3. Vehicle size</h3>
          <p className="svc-p">
            Larger vehicles like SUVs and trucks take more trailer space and weigh more, so they cost more to ship.
          </p>

          <h3 className="svc-h3">4. Seasonality</h3>
          <p className="svc-p">
            Summer and snowbird season can increase demand, which often pushes prices higher.
          </p>

          <h3 className="svc-h3">5. Pickup flexibility</h3>
          <p className="svc-p">
            Flexible pickup windows usually help secure better rates than urgent or fixed-day transport.
          </p>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Car shipping cost FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Is open car shipping cheaper than enclosed?</summary>
            <p>
              Yes. Open transport is generally the most affordable option and is used for most standard vehicles.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do larger vehicles cost more to ship?</summary>
            <p>
              Yes. SUVs, trucks, and oversized vehicles typically cost more than standard sedans.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Can I get an exact quote online?</summary>
            <p>
              The most accurate quote comes from your route, vehicle type, and timing. ZIP codes help produce the best estimate.
            </p>
          </details>
        </div>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">Related guides</h2>
          <ul className="svc-list svc-list--bullets">
            <li>
              <Link to="/open-vs-enclosed-car-shipping">Open vs enclosed car shipping</Link>
            </li>
            <li>
              <Link to="/how-long-does-car-shipping-take">How long does car shipping take?</Link>
            </li>
            <li>
              <Link to="/services/car-shipping">Car shipping across the USA</Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}