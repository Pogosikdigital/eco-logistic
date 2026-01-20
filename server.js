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

function compact(v) {
  return String(v || "").trim();
}

function buildLeadMessage(data) {
  const {
    source,

    fullName,
    phone,
    phoneDigits,
    email,

    pickup,
    delivery,
    vehicle,
    message,

    pickupZip,
    deliveryZip,
    transportType,
    pickupDate,
    notes,

    path: pagePath,
    fullUrl,
    referrer,
    scrollPercent,

    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  } = data;

  const lines = [];
  lines.push("<b>🚗 New lead — EcoHub Logistics</b>");
  if (source) lines.push(`<b>Source:</b> ${source}`);

  if (pagePath) lines.push(`<b>Path:</b> ${pagePath}`);
  if (fullUrl) lines.push(`<b>URL:</b> ${fullUrl}`);
  if (referrer) lines.push(`<b>Referrer:</b> ${referrer}`);
  if (scrollPercent != null) lines.push(`<b>Scroll:</b> ${scrollPercent}%`);

  const utm = [
    utm_source && `src=${utm_source}`,
    utm_medium && `med=${utm_medium}`,
    utm_campaign && `camp=${utm_campaign}`,
    utm_term && `term=${utm_term}`,
    utm_content && `cont=${utm_content}`,
  ]
    .filter(Boolean)
    .join(" | ");
  if (utm) lines.push(`<b>UTM:</b> ${utm}`);

  if (fullName) lines.push(`<b>Name:</b> ${fullName}`);
  if (phone) lines.push(`<b>Phone:</b> ${phone}`);
  if (phoneDigits) lines.push(`<b>Digits:</b> ${phoneDigits}`);
  if (email) lines.push(`<b>Email:</b> ${email}`);

  if (pickup || pickupZip) lines.push(`<b>Pickup:</b> ${pickup || pickupZip}`);
  if (delivery || deliveryZip) lines.push(`<b>Delivery:</b> ${delivery || deliveryZip}`);

  if (vehicle) lines.push(`<b>Vehicle:</b> ${vehicle}`);
  if (transportType) lines.push(`<b>Transport type:</b> ${transportType}`);
  if (pickupDate) lines.push(`<b>Preferred pickup:</b> ${pickupDate}`);

  if (message || notes) lines.push(`<b>Details:</b> ${message || notes}`);

  return lines.join("\n");
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
    referrer: compact(base.referrer) || getHeaderRef(req),
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
