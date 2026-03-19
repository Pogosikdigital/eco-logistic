import React from "react";
import { Link } from "react-router-dom";
import MetaSEO from "../../components/MetaSEO";
import "../services/service-page.css";

export default function OpenVsEnclosedCarShippingPage() {
  const canonical = "https://www.ecohublogistics.com/open-vs-enclosed-car-shipping";

  return (
    <main className="svc-page" itemScope itemType="https://schema.org/Article">
      <MetaSEO
        title="Open vs Enclosed Car Shipping"
        description="Compare open vs enclosed car shipping. Learn the cost difference, protection level, and which auto transport option is right for your vehicle."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "article",
          url: canonical,
          title: "Open vs Enclosed Car Shipping",
          description:
            "Compare open and enclosed auto transport, including cost, protection, and best use cases.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.webp",
          imageAlt: "Open vs enclosed car shipping comparison",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Open vs Enclosed Car Shipping",
          description:
            "Learn the difference between open and enclosed car shipping before booking auto transport.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.webp",
          imageAlt: "Open vs enclosed car shipping comparison",
        }}
      />

      <section className="svc-hero" aria-label="Open vs enclosed shipping guide hero">
        <div className="svc-hero-bg" />
        <div className="svc-container">
          <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="svc-badge">AUTO TRANSPORT GUIDE</span>

              <h1 className="svc-title">Open vs Enclosed Car Shipping</h1>

              <p className="svc-subtitle">
                Open transport is the most common and affordable option. Enclosed transport
                costs more but gives extra protection from weather and road debris.
                The best choice depends on your vehicle and your priorities.
              </p>

              <div className="svc-actions">
                <Link to="/quote" className="svc-btn-primary">
                  Get a free quote
                </Link>
                <Link to="/services/enclosed-transport" className="svc-btn-ghost">
                  View enclosed transport
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-container svc-grid" aria-label="Comparison overview">
        <article className="svc-block">
          <h2 className="svc-h2">Open car shipping</h2>
          <p className="svc-p">
            Open transport means the vehicle moves on an open carrier. This is the standard
            method used for most shipments in the USA.
          </p>

          <div className="svc-divider" />

          <h3 className="svc-h3">Best for</h3>
          <ul className="svc-list svc-list--bullets">
            <li>Daily drivers</li>
            <li>Standard sedans and SUVs</li>
            <li>Budget-focused shipments</li>
            <li>Common interstate routes</li>
          </ul>
        </article>

        <aside className="svc-block svc-block--accent">
          <h2 className="svc-h2">Enclosed car shipping</h2>
          <p className="svc-p">
            Enclosed transport places the vehicle inside a covered trailer, reducing exposure
            to weather, dust, and road debris.
          </p>

          <div className="svc-checklist">
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Protection</span>
              <span className="svc-tag svc-tag--ok">Higher</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Cost</span>
              <span className="svc-tag svc-tag--help">Higher</span>
            </div>
            <div className="svc-checkrow">
              <span className="svc-checkrow-k">Availability</span>
              <span className="svc-tag svc-tag--help">Lower</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="svc-container">
        <article className="svc-block">
          <h2 className="svc-h2">Which one should you choose?</h2>

          <h3 className="svc-h3">Choose open transport if:</h3>
          <ul className="svc-list svc-list--bullets">
            <li>You want the most affordable shipping option</li>
            <li>Your vehicle is a standard daily-use car</li>
            <li>You want more route availability</li>
          </ul>

          <h3 className="svc-h3">Choose enclosed transport if:</h3>
          <ul className="svc-list svc-list--bullets">
            <li>You are shipping a luxury, exotic, or classic vehicle</li>
            <li>Extra protection matters more than lowest price</li>
            <li>You want maximum protection during transit</li>
          </ul>

          <p className="svc-p">
            In most cases, open shipping is the right choice for regular vehicles.
            Enclosed transport is typically worth the extra cost when vehicle value
            or condition is the top priority.
          </p>
        </article>
      </section>

      <section className="svc-container svc-faq" aria-label="FAQ">
        <h2 className="svc-h2">Open vs enclosed FAQ</h2>

        <div className="svc-faq-grid">
          <details className="svc-faq-item">
            <summary>Is enclosed transport safer than open?</summary>
            <p>
              It provides more protection from weather and road debris, so it is often preferred for high-value vehicles.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Is open transport cheaper?</summary>
            <p>
              Yes. Open transport is usually the most affordable and common auto shipping method.
            </p>
          </details>

          <details className="svc-faq-item">
            <summary>Which option is best for a normal sedan?</summary>
            <p>
              Open transport is usually the best balance of cost and practicality for a standard sedan.
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
              <Link to="/how-long-does-car-shipping-take">How long does car shipping take?</Link>
            </li>
            <li>
              <Link to="/services/enclosed-transport">Enclosed auto transport</Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}