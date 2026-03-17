import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { createHead, UnheadProvider } from "@unhead/react/server";
import App from "./App";

const routes = [
  "/",
  "/quote",
  "/reviews",
  "/earn-with-us",
  "/privacy-policy",
  "/terms-and-conditions",
  "/services/car-shipping",
  "/services/enclosed-transport",
  "/services/motorcycle-shipping",
  "/services/inoperable-vehicle-transport",
  "/services/boat-transport",
  "/services/rv-motorhome-semitruck-transport",
];

function absolute(path) {
  return `https://www.ecohublogistics.com${path}`;
}

function metaTag(name, content) {
  return { type: "meta", props: { name, content } };
}

function propMeta(property, content) {
  return { type: "meta", props: { property, content } };
}

function linkTag(rel, href) {
  return { type: "link", props: { rel, href } };
}

function getHeadForRoute(url) {
  const defaults = {
    title: "Car Shipping Services | EcoHub Logistics",
    description:
      "Insured door-to-door car shipping across the USA. Open & enclosed auto transport for individuals, dealerships, and fleets. Get a free quote.",
    canonical: absolute("/"),
    ogImage: absolute("/og/car-shipping.png"),
    ogImageAlt: "EcoHub Logistics car shipping across the USA",
  };

  const byRoute = {
    "/": {
      title: "Car Shipping Services | EcoHub Logistics",
      description:
        "Insured door-to-door car shipping across the USA. Open & enclosed auto transport for individuals, dealerships, and fleets. Get a free quote.",
      canonical: absolute("/"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "EcoHub Logistics car shipping across the USA",
    },
    "/quote": {
      title: "Get a Free Quote | EcoHub Logistics",
      description:
        "Request a free auto transport quote. Fast response, transparent pricing, and insured nationwide car shipping.",
      canonical: absolute("/quote"),
      ogImage: absolute("/og/quote.png"),
      ogImageAlt: "Get a free shipping quote from EcoHub Logistics",
    },
    "/reviews": {
      title: "Customer Reviews | EcoHub Logistics",
      description:
        "Read customer reviews and testimonials about EcoHub Logistics car shipping services across the USA.",
      canonical: absolute("/reviews"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "EcoHub Logistics customer reviews",
    },
    "/earn-with-us": {
      title: "Earn With Us | EcoHub Logistics",
      description:
        "Partner with EcoHub Logistics and explore flexible opportunities to earn with our transportation network.",
      canonical: absolute("/earn-with-us"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "Earn with EcoHub Logistics",
    },
    "/privacy-policy": {
      title: "Privacy Policy | EcoHub Logistics",
      description:
        "Read the EcoHub Logistics privacy policy and learn how we handle your information.",
      canonical: absolute("/privacy-policy"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "EcoHub Logistics privacy policy",
    },
    "/terms-and-conditions": {
      title: "Terms and Conditions | EcoHub Logistics",
      description:
        "Review the terms and conditions for using EcoHub Logistics services and website.",
      canonical: absolute("/terms-and-conditions"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "EcoHub Logistics terms and conditions",
    },
    "/services/car-shipping": {
      title: "Car Shipping Across the USA | EcoHub Logistics",
      description:
        "Reliable car shipping across the USA with insured carriers, door-to-door delivery, and dedicated coordinator support.",
      canonical: absolute("/services/car-shipping"),
      ogImage: absolute("/og/car-shipping.png"),
      ogImageAlt: "Car shipping across the USA by EcoHub Logistics",
    },
    "/services/enclosed-transport": {
      title: "Enclosed Car Transport | EcoHub Logistics",
      description:
        "Premium enclosed auto transport for luxury, classic, and high-value vehicles with secure nationwide delivery.",
      canonical: absolute("/services/enclosed-transport"),
      ogImage: absolute("/og/enclosed-transport.png"),
      ogImageAlt: "Enclosed auto transport by EcoHub Logistics",
    },
    "/services/motorcycle-shipping": {
      title: "Motorcycle Shipping Across the USA | EcoHub Logistics",
      description:
        "Safe, insured motorcycle shipping nationwide with door-to-door delivery and professional handling.",
      canonical: absolute("/services/motorcycle-shipping"),
      ogImage: absolute("/og/motorcycle-shipping.png"),
      ogImageAlt: "Motorcycle shipping across the USA by EcoHub Logistics",
    },
    "/services/inoperable-vehicle-transport": {
      title: "Inoperable Vehicle Transport | EcoHub Logistics",
      description:
        "Transport non-running vehicles safely across the USA with insured carriers and specialized handling.",
      canonical: absolute("/services/inoperable-vehicle-transport"),
      ogImage: absolute("/og/inoperable.png"),
      ogImageAlt: "Non-running vehicle transport by EcoHub Logistics",
    },
    "/services/boat-transport": {
      title: "Boat Transport Services | EcoHub Logistics",
      description:
        "Reliable boat transport across the USA with secure handling, scheduling support, and insured delivery.",
      canonical: absolute("/services/boat-transport"),
      ogImage: absolute("/og/boat-transport.png"),
      ogImageAlt: "Boat transport service by EcoHub Logistics",
    },
    "/services/rv-motorhome-semitruck-transport": {
      title: "RV, Motorhome & Semi-Truck Transport | EcoHub Logistics",
      description:
        "Professional oversized vehicle transport for RVs, motorhomes, and semi-trucks across the USA.",
      canonical: absolute("/services/rv-motorhome-semitruck-transport"),
      ogImage: absolute("/og/rv-transport.png"),
      ogImageAlt: "RV and heavy vehicle transport by EcoHub Logistics",
    },
  };

  const meta = byRoute[url] || defaults;

  return {
    lang: "en-US",
    title: meta.title,
    elements: new Set([
      metaTag("description", meta.description),
      metaTag("robots", "index,follow"),
      linkTag("canonical", meta.canonical),

      propMeta("og:type", "website"),
      propMeta("og:site_name", "EcoHub Logistics"),
      propMeta("og:locale", "en_US"),
      propMeta("og:title", meta.title),
      propMeta("og:description", meta.description),
      propMeta("og:url", meta.canonical),
      propMeta("og:image", meta.ogImage),
      propMeta("og:image:alt", meta.ogImageAlt),

      metaTag("twitter:card", "summary_large_image"),
      metaTag("twitter:title", meta.title),
      metaTag("twitter:description", meta.description),
      metaTag("twitter:image", meta.ogImage),
      metaTag("twitter:image:alt", meta.ogImageAlt),
    ]),
  };
}

export async function prerender(data) {
  const url = data?.url || "/";

  const head = createHead();

  const html = renderToString(
    <UnheadProvider value={head}>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </UnheadProvider>
  );

  return {
    html,
    links: new Set(routes),
    head: getHeadForRoute(url),
  };
}