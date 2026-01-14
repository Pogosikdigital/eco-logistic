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

  // Title
  const fullTitle = title
    ? `${title} | EcoHub Logistics`
    : "EcoHub Logistics – Nationwide Vehicle Shipping & Auto Transport";

  // Description
  const finalDescription =
    description ||
    "EcoHub Logistics provides insured, reliable vehicle shipping across the USA. Door-to-door auto transport with transparent pricing. Get a free quote.";

  // Current URL (client) fallback (server)
  const currentUrl =
    typeof window !== "undefined"
      ? `${baseUrl}${window.location.pathname}${window.location.search}`
      : baseUrl;

  // Canonical
  const canonicalUrl = canonical || currentUrl;

  // Open Graph defaults
  const ogData = {
    type: "website",
    url: canonicalUrl,
    title: fullTitle,
    description: finalDescription,
    image: `${baseUrl}/og-image.jpg`,
    site_name: "EcoHub Logistics",
    locale: "en_US",
    ...og,
  };

  // Twitter defaults
  const twitterData = {
    card: "summary_large_image",
    title: ogData.title,
    description: ogData.description,
    image: ogData.image,
    // site: "@yourhandle", // если будет — добавишь
    ...twitter,
  };

  // JSON-LD scripts
  const ldArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const ldScripts = ldArray
    .filter(Boolean)
    .map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    }));

  useHead({
    title: fullTitle,
    meta: [
      // Base
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B0F1A" },

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

      // Twitter
      { name: "twitter:card", content: twitterData.card },
      { name: "twitter:title", content: twitterData.title },
      { name: "twitter:description", content: twitterData.description },
      { name: "twitter:image", content: twitterData.image },
    ],
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: ldScripts,
  });

  return null;
}
