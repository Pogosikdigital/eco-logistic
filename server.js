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

// раздаём собранный фронт из dist
app.use(express.static(path.join(__dirname, "dist")));

// helper: собираем красивое сообщение
function buildLeadMessage(data) {
  const {
    source,
    name,
    phone,
    email,
    pickup,
    delivery,
    vehicle,
    message,
    fullName,
    pickupZip,
    deliveryZip,
    transportType,
    pickupDate,
    notes,
  } = data;

  const lines = [];

  lines.push("<b>🚗 New lead from Eco Logistic</b>");
  if (source) lines.push(`<b>Source:</b> ${source}`);

  if (fullName || name) lines.push(`<b>Name:</b> ${fullName || name}`);
  if (phone) lines.push(`<b>Phone:</b> ${phone}`);
  if (email) lines.push(`<b>Email:</b> ${email}`);

  if (pickup || pickupZip) lines.push(`<b>Pickup:</b> ${pickup || pickupZip}`);
  if (delivery || deliveryZip)
    lines.push(`<b>Delivery:</b> ${delivery || deliveryZip}`);

  if (vehicle) lines.push(`<b>Vehicle:</b> ${vehicle}`);
  if (transportType) lines.push(`<b>Transport type:</b> ${transportType}`);
  if (pickupDate) lines.push(`<b>Preferred pickup:</b> ${pickupDate}`);

  if (message || notes) lines.push(`<b>Details:</b> ${message || notes}`);

  return lines.join("\n");
}

// API endpoint для форм (Contact + QuoteSection)
app.post("/api/lead", async (req, res) => {
  console.log("📩 Incoming lead:", req.body);

  // Если нет конфигов Telegram — просто логируем и возвращаем ok
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      "⚠️ Telegram is not configured (.env missing). Skipping Telegram send, returning ok."
    );
    return res.json({ ok: true, telegram: false });
  }

  try {
    const text = buildLeadMessage(req.body);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram error:", errText);
      // ❗ ВАЖНО: никаких 502, всегда 200 OK
      return res.json({
        ok: true,
        telegram: false,
        error: "telegram_failed",
      });
    }

    console.log("✅ Lead sent to Telegram");
    res.json({ ok: true, telegram: true });
  } catch (err) {
    console.error("Lead error:", err);
    // ❗ Тоже 200 OK
    res.json({
      ok: true,
      telegram: false,
      error: "server_exception",
    });
  }
});

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
