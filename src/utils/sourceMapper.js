// src/utils/sourceMapper.js

const FIRST_TOUCH_KEY = "ecohub_first_touch_v1";
const SESSION_KEY = "ecohub_session_id_v1";

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // ignore
  }
}

function makeId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function pickParams(params, keys) {
  const out = {};
  keys.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}

export function getLeadContext(extra = {}) {
  if (typeof window === "undefined") return extra;

  const { location, document } = window;
  const params = new URLSearchParams(location.search);

  // current page context
  const current = {
    path: location.pathname,
    fullUrl: location.href,
    pageTitle: document?.title || "",
    referrer: document?.referrer || "",
    ts: new Date().toISOString(),
  };

  // session id (same until tab closed)
  let sessionId = safeGet(sessionStorage, SESSION_KEY);
  if (!sessionId) {
    sessionId = makeId();
    safeSet(sessionStorage, SESSION_KEY, sessionId);
  }

  // marketing params
  const utm = pickParams(params, [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]);

  const clickIds = pickParams(params, ["gclid", "fbclid", "msclkid", "ttclid"]);

  // first touch (first landing page + utm/click ids)
  let firstTouch = null;
  const stored = safeGet(localStorage, FIRST_TOUCH_KEY);

  if (stored) {
    try {
      firstTouch = JSON.parse(stored);
    } catch {
      firstTouch = null;
    }
  }

  // if no firstTouch saved yet — save now
  if (!firstTouch) {
    firstTouch = {
      landingPath: current.path,
      landingUrl: current.fullUrl,
      landingReferrer: current.referrer,
      ...utm,
      ...clickIds,
      firstTs: current.ts,
    };
    safeSet(localStorage, FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
  } else {
    // if user returned without utm saved but now utm exists — enrich (optional)
    const enriched = { ...firstTouch };

    // keep old first values, but fill missing ones
    Object.keys(utm).forEach((k) => {
      if (!enriched[k] && utm[k]) enriched[k] = utm[k];
    });
    Object.keys(clickIds).forEach((k) => {
      if (!enriched[k] && clickIds[k]) enriched[k] = clickIds[k];
    });

    if (JSON.stringify(enriched) !== JSON.stringify(firstTouch)) {
      firstTouch = enriched;
      safeSet(localStorage, FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
    }
  }

  // return combined payload
  return {
    ...current,
    sessionId,

    // current-page params (if present)
    ...utm,
    ...clickIds,

    // first-touch params (for attribution)
    landingPath: firstTouch.landingPath || "",
    landingUrl: firstTouch.landingUrl || "",
    landingReferrer: firstTouch.landingReferrer || "",
    firstTs: firstTouch.firstTs || "",

    // keep first UTM too (so telegram shows stable attribution)
    first_utm_source: firstTouch.utm_source || "",
    first_utm_medium: firstTouch.utm_medium || "",
    first_utm_campaign: firstTouch.utm_campaign || "",
    first_utm_term: firstTouch.utm_term || "",
    first_utm_content: firstTouch.utm_content || "",

    first_gclid: firstTouch.gclid || "",
    first_fbclid: firstTouch.fbclid || "",
    first_msclkid: firstTouch.msclkid || "",
    first_ttclid: firstTouch.ttclid || "",

    ...extra,
  };
}
