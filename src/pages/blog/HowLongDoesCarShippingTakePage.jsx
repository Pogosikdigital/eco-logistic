import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../../components/MetaSEO";
import "../services/service-page.css";

export default function HowLongDoesCarShippingTakePage() {
  const canonical = "https://www.ecohublogistics.com/how-long-does-car-shipping-take";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/Article">
      <MetaSEO
        title="How Long Does Car Shipping Take"
        description="Learn how long car shipping takes in the USA. Understand pickup timing, transit windows, delays, and what affects delivery speed."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "article",
          url: canonical,
          title: "How Long Does Car Shipping Take",
          description:
            "Understand pickup windows, transit times, and the most common factors that affect auto transport delivery speed.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "How long car shipping takes in the USA",
        }}
        twitter={{
          card: "summary_large_image",
          title: "How Long Does Car Shipping Take",
          description:
            "Learn how pickup timing, distance, route demand, and season affect car shipping speed.",
          image: "https://www.ecohublogistics.com/og/car-shipping.webp",
          imageAlt: "How long car shipping takes in the USA",
        }}
      />

      <section className="svc-hero" aria-label="Car shipping timing guide hero">
        <div className="svc-hero-bg" />
        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">AUTO TRANSPORT GUIDE</span>

              <h1 className="svc-title">How Long Does Car Shipping Take?</h1>

              <p className="svc-subtitle">
                Total shipping time usually depends on pickup timing plus transit time.
                Some routes move in a few days, while coast-to-coast shipments can take a week or more.
              </p>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>
                <Link to="/services/car-shipping" className="svc-btn-ghost">
                  View car shipping service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="Transit overview">
        <article className="svc-block">
          <h2 className="svc-h2">Average shipping timeline</h2>

          <ul className="svc-list svc-list--bullets">
            <li>0–500 miles: about 1–3 days</li>
            <li>500–1,500 miles: about 3–6 days</li>
            <li>1,500+ miles: about 5–10 days</li>
          </ul>

          <div className="svc-divider" />

          <p className="svc-p">
            These are general estimates. Real timing depends on route demand,
            weather, access, season, and carrier scheduling.
          </p>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Main timing factors</h2>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Distance</span>
              <span className="svc-tag svc-tag--ok">Key factor</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Route popularity</span>
              <span className="svc-tag svc-tag--help">Changes speed</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Seasonality</span>
              <span className="svc-tag svc-tag--help">Can delay</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">What affects car shipping time?</h2>

          <h3 className="svc-h3">1. Pickup timing</h3>
          <p className="svc-p">
            Pickup timing depends on when a carrier is assigned to your route.
            High-demand routes often dispatch faster than rural or lower-volume lanes.
          </p>

          <h3 className="svc-h3">2. Transit time</h3>
          <p className="svc-p">
            Once picked up, vehicles move according to the driver’s route sequence,
            traffic conditions, and delivery order.
          </p>

          <h3 className="svc-h3">3. Route demand</h3>
          <p className="svc-p">
            Popular major-city routes usually move faster than remote areas with fewer available carriers.
          </p>

          <h3 className="svc-h3">4. Weather and road conditions</h3>
          <p className="svc-p">
            Storms, road closures, traffic, and seasonal conditions can all affect timing.
          </p>

          <h3 className="svc-h3">5. Vehicle type</h3>
          <p className="svc-p">
            Larger or non-running vehicles may require special equipment, which can affect dispatch speed.
          </p>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Car shipping timing FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Can car shipping be expedited?</summary>
            <p>
              Sometimes faster scheduling is possible, but it depends on carrier availability and the route.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Do coast-to-coast routes take longer?</summary>
            <p>
              Yes. Long-distance routes usually take longer overall, especially when multiple stops are involved.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Does booking early help?</summary>
            <p>
              Yes. Earlier booking and flexible dates usually improve dispatch timing and can reduce stress.
            </p>
          </details>
        </div>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">Related guides</h2>
          <ul className="svc-list svc-list--bullets">
            <li>
              <Link to="/how-much-does-car-shipping-cost">How much does car shipping cost?</Link>
            </li>
            <li>
              <Link to="/open-vs-enclosed-car-shipping">Open vs enclosed car shipping</Link>
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