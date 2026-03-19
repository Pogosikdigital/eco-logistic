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
        description="Enclosed auto transport across the USA with maximum protection for luxury, exotic, and classic cars. Door-to-door shipping, insured carriers, and fast quotes."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Enclosed Auto Transport",
          description:
            "Maximum protection for luxury, exotic, and classic vehicles with enclosed shipping across the USA. Door-to-door service, insured carriers, and fast quotes.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.webp",
          imageAlt: "Enclosed auto transport by EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Enclosed Auto Transport",
          description:
            "Premium enclosed car shipping across the USA with door-to-door delivery and insured carriers.",
          image: "https://www.ecohublogistics.com/og/enclosed-transport.webp",
          imageAlt: "Enclosed auto transport by EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Enclosed Auto Transport",
            serviceType: "Enclosed Vehicle Shipping",
            url: canonical,
            description:
              "Premium enclosed auto transport across the USA for luxury, exotic, classic, and high-value vehicles.",
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
                name: "Is enclosed transport safer than open?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enclosed transport offers higher protection from weather, road debris, and outside exposure. It is commonly recommended for luxury, exotic, and classic vehicles.",
                },
              },
              {
                "@type": "Question",
                name: "Can I ship door-to-door with enclosed transport?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Door-to-door service is available on many routes, depending on trailer access at pickup and delivery locations.",
                },
              },
              {
                "@type": "Question",
                name: "How fast can I get a quote?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can request a quote in minutes. A coordinator typically responds quickly with pricing and available options.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer insurance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Carriers are insured. Exact coverage depends on the assigned carrier and shipment details.",
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
                name: "Enclosed Transport",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <main className="svc-page" aria-label="Enclosed auto transport service page">
        <section className="svc-hero" aria-label="Enclosed transport hero">
          <div className="svc-hero-bg" />

          <div className="svc-container">
            <div className="svc-hero-inner">
              <div>
                <span className="svc-badge">PREMIUM PROTECTION</span>

                <h1 className="svc-title">Enclosed Auto Transport</h1>

                <p className="svc-subtitle">
                  Maximum protection for luxury, exotic, and classic cars.
                  Door-to-door enclosed shipping across the USA with insured
                  carriers.
                </p>

                <ul className="svc-bullets">
                  <li>✅ Fully enclosed trailer for weather and road debris protection</li>
                  <li>✅ Ideal for luxury, exotic, and classic vehicles</li>
                  <li>✅ Door-to-door nationwide delivery</li>
                  <li>✅ Insured carriers with real coordinator support</li>
                </ul>

                <div className="svc-actions">
                  <Link to="/quote" className="svc-btn-primary">
                    Get a Free Quote ▸
                  </Link>

                  <a className="svc-btn-ghost" href="tel:+16509999660">
                    Call (650) 999-9660
                  </a>
                </div>

                <p className="svc-note">
                  Fast response. No hidden fees. Real people, real support.
                </p>
              </div>

              <div className="svc-card svc-card--image" aria-hidden="true">
                <div className="svc-card-glow" />
                <div className="svc-hero-media">
                  <img
                    className="svc-hero-img"
                    src={heroImg}
                    alt="Enclosed auto transport trailer shipping a luxury car"
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

        <section className="svc-container svc-grid" aria-label="Enclosed transport info">
          <article className="svc-block">
            <h2 className="svc-h2">What is enclosed transport?</h2>

            <p className="svc-p">
              Enclosed auto transport means your vehicle is shipped inside a covered
              trailer. This helps protect it from weather, dust, road debris, and
              outside exposure, which makes enclosed shipping a preferred option for
              high-value vehicles.
            </p>

            <div className="svc-divider" />

            <h3 className="svc-h3">When enclosed transport is the best choice</h3>

            <ul className="svc-list svc-list--bullets">
              <li>Luxury and exotic cars</li>
              <li>Classic and collector vehicles</li>
              <li>Show cars and museum-quality vehicles</li>
              <li>New vehicles where added protection matters</li>
            </ul>
          </article>

          <aside className="svc-block svc-block--accent">
            <h2 className="svc-h2">Price &amp; timing</h2>

            <p className="svc-p">
              Enclosed shipping is typically more expensive than open transport
              because trailer capacity is lower and the protection level is higher.
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

        <section className="svc-container" aria-label="Why choose enclosed transport">
          <article className="svc-block">
            <h2 className="svc-h2">Why choose enclosed auto transport</h2>

            <p className="svc-p">
              Enclosed transport is often the right choice when condition,
              presentation, and protection matter more than lowest-cost shipping.
              If you are moving a high-end vehicle, collector car, or specialty
              automobile, enclosed service adds peace of mind and reduces exposure
              during transit.
            </p>

            <p className="svc-p">
              EcoHub Logistics helps customers compare enclosed and open options
              based on route, schedule, and vehicle value. We focus on practical
              planning, insured carriers, and direct communication from pickup to
              delivery.
            </p>
          </article>
        </section>

        <section className="svc-container svc-faq" aria-label="FAQ">
          <h2 className="svc-h2">Enclosed transport FAQ</h2>

          <div className="svc-faq-grid">
            <details className="svc-faq-item">
              <summary>Is enclosed transport safer than open?</summary>
              <p>
                It provides higher protection from weather, road debris, and outside
                exposure. For luxury, exotic, and classic vehicles, enclosed
                transport is usually the recommended option.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>Can I ship door-to-door with enclosed transport?</summary>
              <p>
                Yes. Door-to-door service is available depending on trailer access
                at pickup and delivery locations.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>How fast can I get a quote?</summary>
              <p>
                You can request a quote in minutes. A coordinator typically responds
                quickly with pricing and available options.
              </p>
            </details>

            <details className="svc-faq-item">
              <summary>Do you offer insurance?</summary>
              <p>
                Carriers are insured. Exact coverage depends on the assigned carrier
                and shipment details.
              </p>
            </details>
          </div>
        </section>

        <section className="svc-container" aria-label="Related vehicle transport services">
          <article className="svc-block">
            <h2 className="svc-h2">Related transport services</h2>

            <p className="svc-p">
              Explore other vehicle transport options depending on your vehicle type
              and shipping needs.
            </p>

            <ul className="svc-list svc-list--bullets">
              <li>
                <Link to="/services/car-shipping">
                  Standard car shipping across the USA
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
              <li>
                <Link to="/services/rv-motorhome-semitruck-transport">
                  RV, motorhome, and semi-truck transport
                </Link>
              </li>
            </ul>
          </article>
        </section>

        <section className="svc-container svc-quote" aria-label="Get a quote">
          <QuoteSection />
        </section>
      </main>
    </>
  );
}