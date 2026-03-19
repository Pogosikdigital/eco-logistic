// src/pages/QuotePage.jsx
import { Link } from "react-router-dom";
import QuoteSection from "../components/QuoteSection";
import MetaSEO from "../components/MetaSEO";

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

      <main
        style={{
          paddingTop: "2rem",
          paddingBottom: "3rem",
        }}
      >
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1rem 2rem",
          }}
          aria-label="Quote page introduction"
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Get a Free Car Shipping Quote
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "850px",
              marginBottom: "1rem",
            }}
          >
            Request a free, no-obligation quote for vehicle transport across the
            USA. EcoHub Logistics helps coordinate car shipping, enclosed
            transport, motorcycle shipping, inoperable vehicle transport, boat
            transport, and RV or heavy vehicle transport with insured carriers
            and practical support from pickup to delivery.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "850px",
              marginBottom: "1.5rem",
            }}
          >
            For the fastest and most accurate quote, have your pickup ZIP code,
            delivery ZIP code, vehicle type, and preferred shipping window ready.
          </p>

          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              maxWidth: "850px",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>
              Popular transport pages:
            </p>

            <ul
              style={{
                paddingLeft: "1.25rem",
                display: "grid",
                gap: "0.6rem",
                margin: 0,
              }}
            >
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
          </div>
        </section>

        <QuoteSection />
      </main>
    </>
  );
}