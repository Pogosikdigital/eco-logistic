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
  const brand = "EcoHub Logistics";

  const normalizedTitle = title?.trim();
  const fullTitle = normalizedTitle
    ? normalizedTitle.toLowerCase().includes(brand.toLowerCase())
      ? normalizedTitle
      : `${normalizedTitle} | ${brand}`
    : "Nationwide Vehicle Shipping & Auto Transport | EcoHub Logistics";

  const finalDescription =
    description ||
    "EcoHub Logistics provides insured, reliable vehicle shipping across the USA. Door-to-door auto transport with transparent pricing. Get a free quote.";

  const currentUrl =
    typeof window !== "undefined"
      ? `${baseUrl}${window.location.pathname}${window.location.search}`
      : baseUrl;

  const canonicalUrl = canonical || currentUrl;

  const ogData = {
    type: "website",
    url: canonicalUrl,
    title: fullTitle,
    description: finalDescription,
    image: `${baseUrl}/og/car-shipping.webp`,
    imageAlt: "EcoHub Logistics car shipping across the USA",
    site_name: brand,
    locale: "en_US",
    imageWidth: "1200",
    imageHeight: "630",
    ...og,
  };

  const twitterData = {
    card: "summary_large_image",
    title: ogData.title,
    description: ogData.description,
    image: ogData.image,
    imageAlt: ogData.imageAlt,
    ...twitter,
  };

  const ldArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const ldScripts = ldArray
    .filter(Boolean)
    .map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    }));

  useHead({
    title: fullTitle,

    htmlAttrs: {
      lang: "en-US",
    },

    meta: [
      { name: "description", content: finalDescription },
      { name: "robots", content: robots },

      { property: "og:type", content: ogData.type },
      { property: "og:site_name", content: ogData.site_name },
      { property: "og:locale", content: ogData.locale },
      { property: "og:title", content: ogData.title },
      { property: "og:description", content: ogData.description },
      { property: "og:url", content: ogData.url },
      { property: "og:image", content: ogData.image },
      { property: "og:image:alt", content: ogData.imageAlt },
      { property: "og:image:width", content: String(ogData.imageWidth) },
      { property: "og:image:height", content: String(ogData.imageHeight) },

      { name: "twitter:card", content: twitterData.card },
      { name: "twitter:title", content: twitterData.title },
      { name: "twitter:description", content: twitterData.description },
      { name: "twitter:image", content: twitterData.image },
      { name: "twitter:image:alt", content: twitterData.imageAlt },
    ],

    link: [{ rel: "canonical", href: canonicalUrl }],

    script: ldScripts,
  });

  return null;
}