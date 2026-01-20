// src/utils/sourceMapper.js
export function getLeadContext(extra = {}) {
  if (typeof window === "undefined") return extra;

  const params = new URLSearchParams(window.location.search);

  const get = (k) => params.get(k) || "";

  return {
    path: window.location.pathname,
    fullUrl: window.location.href,
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    ...extra,
  };
}
