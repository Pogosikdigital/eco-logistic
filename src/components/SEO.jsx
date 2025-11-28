// src/components/SEO.jsx


export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex = false,
}) {
  const baseUrl = "https://your-domain.com"; // поменяешь на свой домен после деплоя

  const fullTitle = title
    ? `${title} | Eco Logistic`
    : "Eco Logistic – Vehicle Shipping in the USA";

  const finalOgTitle = ogTitle || fullTitle;
  const finalOgDescription =
    ogDescription ||
    description ||
    "Fast and reliable vehicle shipping across the USA. Free quote, insured delivery, and professional support.";

  const url =
    typeof window !== "undefined"
      ? baseUrl + window.location.pathname
      : baseUrl;

  const image = ogImage || `${baseUrl}/og-image.jpg`; // подменишь на свой реальный путь

  return (
    <>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta description */}
      {description && <meta name="description" content={description} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

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
