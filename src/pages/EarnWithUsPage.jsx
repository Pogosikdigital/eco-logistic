// src/pages/EarnWithUsPage.jsx
import EarnWithUs from "./EarnWithUs";
import MetaSEO from "../components/MetaSEO";

export default function EarnWithUsPage() {
  const canonical = "https://www.ecohublogistics.com/earn-with-us";

  return (
    <>
      <MetaSEO
        // ❗️без бренда — MetaSEO сам добавит
        title="Affiliate & Referral Program for Auto Transport"
        description="Join EcoHub Logistics affiliate & referral program. Earn up to 40% commission by referring vehicle shipping clients across the USA. No paperwork, no fees."
        canonical={canonical}
        robots="index,follow"
        og={{
          type: "website",
          url: canonical,
          title: "Earn with EcoHub Logistics — Affiliate Program",
          description:
            "Earn up to 40% commission by referring auto transport clients. Simple, transparent affiliate & referral program.",
          image: "https://www.ecohublogistics.com/og/earn-with-us.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Earn with EcoHub Logistics",
          description:
            "Join our affiliate & referral program and earn up to 40% per completed vehicle shipment.",
          image: "https://www.ecohublogistics.com/og/earn-with-us.jpg",
        }}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Earn with EcoHub Logistics",
            url: canonical,
            description:
              "Affiliate and referral program for auto transport services across the USA.",
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
                name: "Earn With Us",
                item: canonical,
              },
            ],
          },
        ]}
      />

      <EarnWithUs />
    </>
  );
}
