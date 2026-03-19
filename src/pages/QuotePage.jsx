// src/pages/QuotePage.jsx
import { Link } from "react-router-dom";
import QuoteSection from "../components/QuoteSection";
import MetaSEO from "../components/MetaSEO";
import "./services/service-page.css";

export default function QuotePage() {
  const canonical = "https://www.ecohublogistics.com/quote";

  return (
    <>
      <MetaSEO
        title="Free Car Shipping Quote"
        description="Get a free, no-obligation car shipping quote in minutes. Nationwide door-to-door auto transport across the USA with open and enclosed options."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Free Car Shipping Quote",
          description:
            "Request a fast, insured auto transport quote across the USA with open and enclosed shipping options.",
          image: "https://www.ecohublogistics.com/og/quote.webp",
          imageAlt: "Get a free shipping quote from EcoHub Logistics",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Free Car Shipping Quote",
          description:
            "Get a free auto transport quote across the USA with door-to-door shipping and flexible options.",
          image: "https://www.ecohublogistics.com/og/quote.webp",
          imageAlt: "Get a free shipping quote from EcoHub Logistics",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Car Shipping Quote",
            url: canonical,
            description:
              "Request a free car shipping quote for nationwide auto transport across the USA.",
            isPartOf: {
              "@type": "WebSite",
              name: "EcoHub Logistics",
              url: "https://www.ecohublogistics.com/",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Auto Transport Quote Request",
            serviceType: "Car Shipping Quote",
            url: canonical,
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
            description:
              "Request a free quote for car shipping, enclosed transport, motorcycle shipping, inoperable vehicle transport, boat transport, and RV or heavy vehicle transport.",
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
                name: "Free Quote",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <main className="svc-page">
        <section className="svc-hero" aria-label="Quote page hero">
          <div className="svc-hero-bg" />

          <div className="svc-container">
            <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <span className="svc-badge">FREE QUOTE • AUTO TRANSPORT</span>

                <h1 className="svc-title">Get a Free Car Shipping Quote</h1>

                <p className="svc-subtitle">
                  Request a free, no-obligation quote for vehicle transport
                  across the USA. EcoHub Logistics helps coordinate car
                  shipping, enclosed transport, motorcycle shipping, inoperable
                  vehicle transport, boat transport, and RV or heavy vehicle
                  transport with insured carriers and practical support from
                  pickup to delivery.
                </p>

                <p className="svc-subtitle">
                  For the fastest and most accurate quote, have your pickup ZIP
                  code, delivery ZIP code, vehicle type, and preferred shipping
                  window ready.
                </p>

                <div className="svc-actions">
                  <a href="#quote-form" className="svc-btn-primary">
                    Start your quote
                  </a>

                  <a className="svc-btn-ghost" href="tel:+16509999660">
                    Talk to a coordinator
                  </a>
                </div>

                <p className="svc-note">
                  Fast response, transparent pricing, and real support from a
                  coordinator.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-container svc-grid" aria-label="Quote page information">
          <article className="svc-block">
            <h2 className="svc-h2">What to prepare before requesting a quote</h2>

            <p className="svc-p">
              A few details help us give you a faster and more accurate vehicle
              shipping estimate.
            </p>

            <div className="svc-divider" />

            <ul className="svc-list svc-list--bullets">
              <li>Pickup ZIP code</li>
              <li>Delivery ZIP code</li>
              <li>Vehicle year, make, and model</li>
              <li>Preferred pickup window</li>
              <li>Open or enclosed transport preference</li>
              <li>Whether the vehicle is running or non-running</li>
            </ul>
          </article>

          <aside className="svc-block svc-block--accent">
            <h2 className="svc-h2">Why customers request quotes with us</h2>

            <div className="svc-checklist">
              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Door-to-door shipping</span>
                <span className="svc-tag svc-tag--ok">✅ Available</span>
              </div>

              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Open & enclosed options</span>
                <span className="svc-tag svc-tag--help">✅ Flexible</span>
              </div>

              <div className="svc-checkrow">
                <span className="svc-checkrow-k">Insured carriers</span>
                <span className="svc-tag svc-tag--ok">✅ Included</span>
              </div>
            </div>

            <Link to="/reviews" className="svc-mini-cta">
              Read customer reviews →
            </Link>
          </aside>
        </section>

        <section className="svc-container" aria-label="Popular transport pages">
          <article className="svc-block">
            <h2 className="svc-h2">Popular transport pages</h2>

            <p className="svc-p">
              Explore our most important transport services before requesting
              your quote.
            </p>

            <ul className="svc-list svc-list--bullets">
              <li>
                <Link to="/services/car-shipping">
                  Car shipping across the USA
                </Link>
              </li>
              <li>
                <Link to="/services/enclosed-transport">
                  Enclosed auto transport
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
                <Link to="/services/boat-transport">
                  Boat transport services
                </Link>
              </li>
              <li>
                <Link to="/services/rv-motorhome-semitruck-transport">
                  RV, motorhome, and semi-truck transport
                </Link>
              </li>
            </ul>
          </article>
        </section>

        <section
          id="quote-form"
          className="svc-quote"
          aria-label="Quote form section"
        >
          <QuoteSection />
        </section>
      </main>
    </>
  );
}