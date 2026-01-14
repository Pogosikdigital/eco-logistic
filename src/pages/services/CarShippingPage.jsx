import React from "react";
import "./service-page.css";

import MetaSEO from "../../components/MetaSEO";
import QuoteSection from "../../components/QuoteSection";

export default function CarShippingPage() {
  const canonical = "https://www.ecohublogistics.com/services/car-shipping";

  return (
    <>
      <MetaSEO
        title="Car Shipping & Auto Transport"
        description="Nationwide car shipping across the USA. Door-to-door auto transport with insured carriers, open & enclosed options, and fast quotes from EcoHub Logistics."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Car Shipping & Auto Transport | EcoHub Logistics",
          description:
            "Door-to-door car shipping across the USA. Open & enclosed transport available. Insured carriers, transparent pricing, fast quotes.",
          image: "https://www.ecohublogistics.com/og/car-shipping.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Car Shipping & Auto Transport | EcoHub Logistics",
          description:
            "Nationwide car shipping across the USA. Door-to-door service, insured carriers, fast quotes.",
          image: "https://www.ecohublogistics.com/og/car-shipping.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Car Shipping & Auto Transport",
            url: canonical,
            description:
              "Nationwide car shipping across the USA with door-to-door auto transport and insured carriers.",
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
                name: "Car Shipping",
                item: canonical,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Car Shipping & Auto Transport",
            serviceType: "Car shipping",
            provider: {
              "@type": "Organization",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
            areaServed: "US",
          },
        ]}
      />

      <section className="svc-page" aria-label="Car shipping service page">
        {/* HERO */}
        <div className="svc-hero">
          <div className="svc-hero-bg" />

          <div className="svc-container svc-hero-inner">
            <div className="svc-hero-left">
              <span className="svc-badge">NATIONWIDE AUTO TRANSPORT</span>

              <h1 className="svc-title">Car Shipping & Auto Transport</h1>

              <p className="svc-subtitle">
                Door-to-door car shipping across the USA with insured carriers,
                transparent pricing, and a real coordinator.
              </p>

              <ul className="svc-bullets">
                <li>✅ Open & enclosed transport options</li>
                <li>✅ Door-to-door nationwide delivery</li>
                <li>✅ Insured carriers + tracking updates</li>
                <li>✅ Fast quotes and real coordinator support</li>
              </ul>

              <div className="svc-actions">
                <a className="svc-btn-primary" href="/quote">
                  Get a Free Quote ▸
                </a>
                <a className="svc-btn-ghost" href="tel:+16509999660">
                  Call (650) 999-9660
                </a>
              </div>

              <p className="svc-note">
                Tip: Open transport is the most popular option for standard vehicles.
              </p>
            </div>

            <div className="svc-hero-right" aria-hidden="true">
              <div className="svc-card">
                <div className="svc-card-glow" />
                <p className="svc-card-title">Transport options</p>

                <div className="svc-tags" role="list">
                  <span role="listitem" className="svc-tag">Open</span>
                  <span role="listitem" className="svc-tag">Enclosed</span>
                  <span role="listitem" className="svc-tag">Door-to-door</span>
                  <span role="listitem" className="svc-tag">Insured</span>
                </div>

                <div className="svc-divider" />

                <p className="svc-card-small">
                  Not sure what you need? Request a quote — we’ll recommend the best option for your route & vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="svc-container">
          <div className="svc-grid">
            <article className="svc-block" itemScope itemType="https://schema.org/Article">
              <h2 className="svc-h2" itemProp="headline">How car shipping works</h2>
              <p className="svc-p" itemProp="description">
                You request a quote, we match your shipment with an insured carrier,
                and your vehicle is picked up and delivered door-to-door.
                We provide updates and coordinator support throughout the process.
              </p>

              <h3 className="svc-h3">Best for</h3>
              <ul className="svc-list">
                <li>Relocations & moving</li>
                <li>Online car purchases</li>
                <li>Dealership & auction transport</li>
                <li>Seasonal moves (snowbirds)</li>
              </ul>
            </article>

            <aside className="svc-block svc-block--accent">
              <h2 className="svc-h2">Pricing factors</h2>
              <p className="svc-p">
                Car shipping cost depends on route distance, vehicle size, season,
                transport type (open/enclosed), and pickup timing.
              </p>

              <div className="svc-mini">
                <div className="svc-mini-row">
                  <span className="svc-mini-k">Route:</span>
                  <span className="svc-mini-v">Distance + demand</span>
                </div>
                <div className="svc-mini-row">
                  <span className="svc-mini-k">Vehicle:</span>
                  <span className="svc-mini-v">Size + condition</span>
                </div>
                <div className="svc-mini-row">
                  <span className="svc-mini-k">Option:</span>
                  <span className="svc-mini-v">Open vs enclosed</span>
                </div>
              </div>

              <a className="svc-mini-cta" href="/quote">
                Get your exact quote →
              </a>
            </aside>
          </div>

          {/* FAQ */}
          <div className="svc-faq">
            <h2 className="svc-h2">FAQ</h2>

            <div className="svc-faq-grid">
              <details className="svc-faq-item">
                <summary>Is my vehicle insured during transport?</summary>
                <p>Carriers are insured. Coverage details depend on the carrier and shipment terms.</p>
              </details>

              <details className="svc-faq-item">
                <summary>How long does shipping take?</summary>
                <p>Timing depends on route distance, carrier schedule and season. We’ll give an ETA with your quote.</p>
              </details>

              <details className="svc-faq-item">
                <summary>Open vs enclosed — what should I choose?</summary>
                <p>Open is the most common for standard vehicles. Enclosed is best for luxury/exotic/classic cars.</p>
              </details>

              <details className="svc-faq-item">
                <summary>Can you pick up from a residence?</summary>
                <p>Yes, door-to-door is available when access allows. If needed, we arrange a nearby meeting point.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Quote form */}
        <div className="svc-container svc-quote">
          <QuoteSection />
        </div>
      </section>
    </>
  );
}
