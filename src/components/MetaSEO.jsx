// src/components/MetaSEO.jsx
import { useHead } from "@unhead/react";

export default function MetaSEO({
  title,
  description,
  canonical,
  robots = "index,follow",
  og,
  twitter,
  jsonLd = [],
}) {
  const baseUrl = "https://www.ecohublogistics.com";

  // ✅ Title (MetaSEO сам добавляет бренд)
  const fullTitle = title
    ? `${title} | EcoHub Logistics`
    : "EcoHub Logistics – Nationwide Vehicle Shipping & Auto Transport";

  // ✅ Description
  const finalDescription =
    description ||
    "EcoHub Logistics provides insured, reliable vehicle shipping across the USA. Door-to-door auto transport with transparent pricing. Get a free quote.";

  // ✅ Current URL (client fallback)
  const currentUrl =
    typeof window !== "undefined"
      ? `${baseUrl}${window.location.pathname}${window.location.search}`
      : baseUrl;

  // ✅ Canonical
  const canonicalUrl = canonical || currentUrl;

  // ✅ Open Graph defaults (page-safe)
  const ogData = {
    type: "website",
    url: canonicalUrl,
    title: fullTitle,
    description: finalDescription,
    image: `${baseUrl}/og-image.jpg`,
    site_name: "EcoHub Logistics",
    locale: "en_US",
    imageWidth: "1200",
    imageHeight: "630",
    ...og,
  };

  // ✅ Twitter defaults
  const twitterData = {
    card: "summary_large_image",
    title: ogData.title,
    description: ogData.description,
    image: ogData.image,
    ...twitter,
  };

  // ✅ JSON-LD scripts
  const ldArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const ldScripts = ldArray
    .filter(Boolean)
    .map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    }));

  useHead({
    title: fullTitle,

    // ✅ ONLY dynamic/meta-per-page stuff (no charset/viewport duplicates)
    meta: [
      // SEO
      { name: "description", content: finalDescription },
      { name: "robots", content: robots },

      // Open Graph
      { property: "og:type", content: ogData.type },
      { property: "og:site_name", content: ogData.site_name },
      { property: "og:locale", content: ogData.locale },
      { property: "og:title", content: ogData.title },
      { property: "og:description", content: ogData.description },
      { property: "og:url", content: ogData.url },
      { property: "og:image", content: ogData.image },
      { property: "og:image:width", content: String(ogData.imageWidth || "1200") },
      { property: "og:image:height", content: String(ogData.imageHeight || "630") },

      // Twitter
      { name: "twitter:card", content: twitterData.card },
      { name: "twitter:title", content: twitterData.title },
      { name: "twitter:description", content: twitterData.description },
      { name: "twitter:image", content: twitterData.image },
    ],

    // Canonical
    link: [{ rel: "canonical", href: canonicalUrl }],

    // JSON-LD
    script: ldScripts,
  });

  return null;
}
