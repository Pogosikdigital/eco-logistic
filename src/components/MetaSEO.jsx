// src/components/SEO.jsx
import React from "react";

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex = false,
}) {
  const baseUrl = "https://www.ecohublogistics.com";

  const fullTitle = title
    ? `${title} | EcoHub Logistics`
    : "EcoHub Logistics – Nationwide Vehicle Shipping & Auto Transport";

  const finalOgTitle = ogTitle || fullTitle;

  const finalDescription =
    description ||
    "EcoHub Logistics provides insured, reliable vehicle shipping across the USA. Door-to-door auto transport with transparent pricing. Get a free quote.";

  const finalOgDescription = ogDescription || finalDescription;

  const url =
    typeof window !== "undefined"
      ? `${baseUrl}${window.location.pathname}${window.location.search}`
      : baseUrl;

  const image = ogImage || `${baseUrl}/og-image.jpg`;

  return (
    <>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta description */}
      <meta name="description" content={finalDescription} />

      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />

      {/* Canonical */}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
