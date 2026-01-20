// src/pages/QuotePage.jsx
import QuoteSection from "../components/QuoteSection";
import MetaSEO from "../components/MetaSEO";

export default function QuotePage() {
  const canonical = "https://www.ecohublogistics.com/quote";

  return (
    <>
      <MetaSEO
        // ❗️НЕ добавляем бренд — MetaSEO сам добавит " | EcoHub Logistics"
        title="Free Car Shipping Quote"
        description="Get a free, no-obligation car shipping quote in minutes. Nationwide door-to-door auto transport across the USA. Open & enclosed options. Insured carriers."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Free Car Shipping Quote | EcoHub Logistics",
          description:
            "Request a fast, insured auto transport quote across the USA. Open & enclosed shipping. Door-to-door delivery.",
          image: "https://www.ecohublogistics.com/og/quote.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Free Car Shipping Quote | EcoHub Logistics",
          description:
            "Get a free auto transport quote across the USA. Door-to-door shipping. Open & enclosed options.",
          image: "https://www.ecohublogistics.com/og/quote.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Car Shipping Quote",
            url: canonical,
            description:
              "Request a free car shipping quote for nationwide auto transport across the USA. Open and enclosed shipping available.",
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
                name: "Free Quote",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <QuoteSection />
    </>
  );
}
