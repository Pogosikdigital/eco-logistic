export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const data = req.body || {};

  const buildLeadMessage = (d) => {
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
    } = d;

    const lines = [];

    lines.push("<b>🚚 New lead from EcoHub Logistics</b>");
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
  };

  // Если токенов нет — это конфигурационная ошибка
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({
      ok: false,
      error: "telegram_not_configured",
    });
  }

  // Минимальная проверка, чтобы не слать пустые заявки
  const hasAnyContact =
    (data.email && String(data.email).trim()) ||
    (data.phone && String(data.phone).trim());

  if (!hasAnyContact) {
    return res.status(400).json({
      ok: false,
      error: "missing_contact",
    });
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

    const tgData = await tgRes.json().catch(() => null);

    if (!tgRes.ok || !tgData?.ok) {
      return res.status(502).json({
        ok: false,
        error: "telegram_failed",
        details: tgData || null,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_exception" });
  }
}
