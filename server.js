/* eslint-env node */
// server.js (ESM-версия для Vite-проекта + Telegram bot)
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn(
    "⚠️ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in .env. Telegram sending will be skipped, but /api/lead will return ok."
  );
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

/* ---------------- helpers ---------------- */

function compact(v) {
  return String(v || "").trim();
}

// ✅ HTML-экранирование чтобы Telegram HTML не ломался
function escapeHtml(input) {
  return String(input || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLead(body = {}) {
  const fullName =
    body.fullName ||
    body.name ||
    `${body.firstName || ""} ${body.lastName || ""}`.trim();

  const phone = body.phone || body.telephone || body.phoneNumber || "";
  const phoneDigits = String(body.phoneDigits || phone).replace(/\D/g, "");

  return { ...body, fullName, phone, phoneDigits };
}

function getHeaderRef(req) {
  return req.get("referer") || req.get("referrer") || "";
}

function safeLine(label, value) {
  const v = compact(value);
  if (!v) return null;
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(v)}`;
}

// ✅ URL строка кликабельная (Telegram HTML)
function safeUrlLine(label, url) {
  const v = compact(url);
  if (!v) return null;
  return `<b>${escapeHtml(label)}:</b> <a href="${escapeHtml(v)}">${escapeHtml(v)}</a>`;
}

function divider() {
  return "— — — — —";
}

// ✅ более аккуратные подписи + защита от пустых
function buildUtmLine(prefix, obj) {
  const src = compact(obj[`${prefix}utm_source`] ?? obj.utm_source);
  const med = compact(obj[`${prefix}utm_medium`] ?? obj.utm_medium);
  const camp = compact(obj[`${prefix}utm_campaign`] ?? obj.utm_campaign);
  const term = compact(obj[`${prefix}utm_term`] ?? obj.utm_term);
  const cont = compact(obj[`${prefix}utm_content`] ?? obj.utm_content);

  const parts = [
    src && `src=${src}`,
    med && `med=${med}`,
    camp && `camp=${camp}`,
    term && `term=${term}`,
    cont && `cont=${cont}`,
  ].filter(Boolean);

  if (!parts.length) return null;

  const label = prefix ? "UTM (first)" : "UTM (current)";
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(parts.join(" | "))}`;
}

function buildClickIdsLine(prefix, obj) {
  const gclid = compact(obj[`${prefix}gclid`] ?? obj.gclid);
  const fbclid = compact(obj[`${prefix}fbclid`] ?? obj.fbclid);
  const msclkid = compact(obj[`${prefix}msclkid`] ?? obj.msclkid);
  const ttclid = compact(obj[`${prefix}ttclid`] ?? obj.ttclid);

  const parts = [
    gclid && `gclid=${gclid}`,
    fbclid && `fbclid=${fbclid}`,
    msclkid && `msclkid=${msclkid}`,
    ttclid && `ttclid=${ttclid}`,
  ].filter(Boolean);

  if (!parts.length) return null;

  const label = prefix ? "Click IDs (first)" : "Click IDs (current)";
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(parts.join(" | "))}`;
}

function buildLeadMessage(data) {
  const {
    // base
    source,
    ts,
    sessionId,

    // person
    fullName,
    phone,
    phoneDigits,
    email,

    // quote/contact fields
    pickup,
    delivery,
    vehicle,
    message,
    pickupZip,
    deliveryZip,
    transportType,
    pickupDate,
    notes,

    // current page
    path: pagePath,
    fullUrl,
    pageTitle,
    referrer,
    scrollPercent,

    // first touch
    landingPath,
    landingUrl,
    landingReferrer,
    firstTs,

    // current utm
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,

    // first utm
    first_utm_source,
    first_utm_medium,
    first_utm_campaign,
    first_utm_term,
    first_utm_content,

    // click ids current
    gclid,
    fbclid,
    msclkid,
    ttclid,

    // click ids first
    first_gclid,
    first_fbclid,
    first_msclkid,
    first_ttclid,
  } = data;

  const lines = [];

  // Header
  lines.push("<b>🚗 New lead — EcoHub Logistics</b>");

  // Meta
  const meta = [];
  meta.push(safeLine("Source", source));
  meta.push(safeLine("Time", ts));
  meta.push(safeLine("Session", sessionId));

  if (meta.filter(Boolean).length) {
    lines.push("");
    lines.push("🧭 <b>META</b>");
    lines.push(meta.filter(Boolean).join("\n"));
  }

  // Current page
  const page = [];
  page.push(safeLine("Path", pagePath));
  page.push(safeUrlLine("URL", fullUrl));
  page.push(safeLine("Title", pageTitle));
  page.push(safeLine("Referrer (current)", referrer));
  if (scrollPercent != null) page.push(`<b>Scroll:</b> ${escapeHtml(String(scrollPercent))}%`);

  if (page.filter(Boolean).length) {
    lines.push("");
    lines.push(divider());
    lines.push("📍 <b>CURRENT PAGE</b>");
    lines.push(page.filter(Boolean).join("\n"));
  }

  // First touch
  const first = [];
  first.push(safeLine("Landing path", landingPath));
  first.push(safeUrlLine("Landing URL", landingUrl));
  first.push(safeLine("Referrer (first)", landingReferrer));
  first.push(safeLine("First touch time", firstTs));

  if (first.filter(Boolean).length) {
    lines.push("");
    lines.push(divider());
    lines.push("🧲 <b>FIRST TOUCH</b>");
    lines.push(first.filter(Boolean).join("\n"));
  }

  // Attribution
  const utmCurrent = buildUtmLine("", {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  });

  const utmFirst = buildUtmLine("first_", {
    first_utm_source,
    first_utm_medium,
    first_utm_campaign,
    first_utm_term,
    first_utm_content,
  });

  const clickCurrent = buildClickIdsLine("", { gclid, fbclid, msclkid, ttclid });
  const clickFirst = buildClickIdsLine("first_", {
    first_gclid,
    first_fbclid,
    first_msclkid,
    first_ttclid,
  });

  const attr = [utmCurrent, clickCurrent, utmFirst, clickFirst].filter(Boolean);
  if (attr.length) {
    lines.push("");
    lines.push(divider());
    lines.push("🎯 <b>ATTRIBUTION</b>");
    lines.push(attr.join("\n"));
  }

  // Lead details
  const pickupVal = compact(pickup) || compact(pickupZip);
  const deliveryVal = compact(delivery) || compact(deliveryZip);
  const detailsVal = compact(message) || compact(notes);

  const lead = [];
  lead.push(safeLine("Name", fullName));
  lead.push(safeLine("Phone", phone));
  lead.push(safeLine("Digits", phoneDigits));
  lead.push(safeLine("Email", email));
  lead.push(pickupVal ? safeLine("Pickup", pickupVal) : null);
  lead.push(deliveryVal ? safeLine("Delivery", deliveryVal) : null);
  lead.push(safeLine("Vehicle", vehicle));
  lead.push(safeLine("Transport type", transportType));
  lead.push(safeLine("Preferred pickup", pickupDate));
  lead.push(detailsVal ? safeLine("Details", detailsVal) : null);

  if (lead.filter(Boolean).length) {
    lines.push("");
    lines.push(divider());
    lines.push("📦 <b>REQUEST</b>");
    lines.push(lead.filter(Boolean).join("\n"));
  }

  return lines.filter(Boolean).join("\n");
}

/* ---------------- validation by source ---------------- */

function validateLead(data) {
  const src = compact(data.source);

  // popup: строго имя + телефон
  if (src === "scroll-popup") {
    if (!compact(data.fullName) || compact(data.fullName).length < 2) {
      return { ok: false, code: "bad_name" };
    }
    if (!compact(data.phoneDigits) || String(data.phoneDigits).length < 10) {
      return { ok: false, code: "bad_phone" };
    }
    return { ok: true };
  }

  // quote/contact: мягче — чтобы не ломать
  // хотя бы один контакт: phoneDigits OR email
  const hasPhone = compact(data.phoneDigits).length >= 10;
  const hasEmail = compact(data.email).includes("@");

  if (!hasPhone && !hasEmail) {
    return { ok: false, code: "no_contact" };
  }

  return { ok: true };
}

/* ---------------- API ---------------- */

app.post("/api/lead", async (req, res) => {
  console.log("📩 Incoming lead:", req.body);

  const base = normalizeLead(req.body);

  const data = {
    ...base,
    // если клиент не прислал referrer — возьмём из заголовка
    referrer: compact(base.referrer) || getHeaderRef(req),
    // timestamp если не пришёл
    ts: compact(base.ts) || new Date().toISOString(),
  };

  // Honeypot (anti-spam)
  if (data.company && compact(data.company).length > 0) {
    return res.json({ ok: true, telegram: false, spam: true });
  }

  // validate by source
  const v = validateLead(data);
  if (!v.ok) {
    return res.status(400).json({ ok: false, error: v.code });
  }

  // Telegram not configured
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("⚠️ Telegram is not configured (.env missing).");
    return res.json({ ok: true, telegram: false });
  }

  try {
    const text = buildLeadMessage(data);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram error:", errText);
      return res.status(200).json({ ok: true, telegram: false, error: "telegram_failed" });
    }

    console.log("✅ Lead sent to Telegram");
    return res.json({ ok: true, telegram: true });
  } catch (err) {
    console.error("Lead error:", err);
    return res.status(200).json({ ok: true, telegram: false, error: "server_exception" });
  }
});

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
