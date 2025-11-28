// src/components/Contact.jsx
import React, { useState, useCallback, useMemo } from "react";
import "./styles/contact.css";

// INITIAL FORM
const initialForm = {
  name: "",
  phone: "",
  email: "",
  pickup: "",
  delivery: "",
  vehicle: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [showPhone, setShowPhone] = useState(false);

  const apiUrl = useMemo(
    () => "https://untransparent-transpolar-tequila.ngrok-free.dev/api/lead",
    []
  );

  /* -----------------------------------------
     PHONE AUTOFORMAT — USA STANDARD
     +1 (xxx) xxx-xxxx
  ------------------------------------------ */
  const formatPhone = useCallback((v) => {
    const digits = v.replace(/\D/g, "").substring(0, 10);

    if (digits.length === 0) return "";
    if (digits.length <= 3) return `+1 (${digits}`;
    if (digits.length <= 6)
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  }, []);

  /* -----------------------------------------
     FIELD CHANGE
  ------------------------------------------ */
  const handleChange = useCallback(
    (field, value) => {
      setForm((prev) => ({
        ...prev,
        [field]: field === "phone" ? formatPhone(value) : value,
      }));
      setErrors((e) => ({ ...e, [field]: null }));
      setSubmitted(false);
      setGlobalError("");
    },
    [formatPhone]
  );

  /* -----------------------------------------
     VALIDATION
  ------------------------------------------ */
  const validate = useCallback(() => {
    const e = {};

    if (!form.name.trim()) e.name = "Full name is required.";

    const cleanPhone = form.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10)
      e.phone = "Valid U.S. phone number is required.";

    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email.";

    if (!form.pickup.trim()) e.pickup = "Pickup location required.";
    if (!form.delivery.trim()) e.delivery = "Delivery location required.";

    return e;
  }, [form]);

  /* -----------------------------------------
     SUBMIT
  ------------------------------------------ */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const v = validate();
      setErrors(v);
      if (Object.keys(v).length > 0) return;

      setSending(true);
      setGlobalError("");
      setSubmitted(false);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "contact-form", ...form }),
        });

        console.log("Contact status:", res.status);

        try {
          const data = await res.json();
          console.log("Contact JSON:", data);
        } catch {
          console.warn("JSON parsing skipped");
        }

        setForm(initialForm);
        setSubmitted(true);
      } catch (err) {
        console.error("NETWORK ERROR:", err);
        setGlobalError(
          "We couldn't reach the server. Please try again in a minute."
        );
      } finally {
        setSending(false);
      }
    },
    [apiUrl, form, validate]
  );

  /* -----------------------------------------
     RENDER
  ------------------------------------------ */
  return (
    <section
      id="contact"
      className="contact-section"
      itemScope
      itemType="https://schema.org/ContactPage"
      aria-labelledby="contact-heading"
    >
      <meta itemProp="name" content="Contact EcoHub Logistics" />
      <meta
        itemProp="description"
        content="Get in touch with EcoHub Logistics for fast vehicle shipping quotes nationwide."
      />

      <div
        className="contact-container"
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="EcoHub Logistics" />
        <meta itemProp="url" content="https://ecohub-logistics.com" />

        {/* NEON BORDER RUNNER */}
        <div className="border-runner" aria-hidden="true" />

        {/* NEON BADGE */}
        <button
          type="button"
          className={`contact-badge-btn neon-pulse-btn ${
            showPhone ? "open" : ""
          }`}
          onClick={() => setShowPhone((s) => !s)}
          aria-expanded={showPhone}
          aria-controls="contact-phone-reveal"
        >
          Contact Us
        </button>

        <div
          id="contact-phone-reveal"
          className={`phone-reveal ${showPhone ? "visible" : ""}`}
          itemProp="contactPoint"
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <meta itemProp="telephone" content="+1-650-999-9660" />
          <p className="phone-number">(650) 999-9660</p>
        </div>

        {/* HEADER */}
        <header className="contact-header">
          <h2 id="contact-heading" className="contact-title">
            Get in Touch
          </h2>
          <p className="contact-subtitle">
            Have questions or need a quote? We respond within minutes.
          </p>
        </header>

        <p className="response-time">
          Average response time: <span>5–10 minutes</span>
        </p>

        {/* FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          itemProp="potentialAction"
          itemScope
          itemType="https://schema.org/ContactAction"
        >
          <meta itemProp="target" content={apiUrl} />

          {/* ===== ROW 1 ===== */}
          <div className="form-row">
            <Field
              label="Full Name"
              id="contact-name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              error={errors.name}
              icon="user"
              itemProp="name"
            />

            <Field
              label="Phone Number"
              id="contact-phone"
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
              error={errors.phone}
              icon="phone"
              itemProp="telephone"
            />
          </div>

          {/* ===== ROW 2 ===== */}
          <div className="form-row">
            <Field
              label="Email"
              id="contact-email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
              type="email"
              icon="mail"
              itemProp="email"
            />

            <Field
              label="Pickup Location"
              id="contact-pickup"
              value={form.pickup}
              onChange={(v) => handleChange("pickup", v)}
              error={errors.pickup}
              icon="location"
              itemProp="areaServed"
            />
          </div>

          {/* ===== ROW 3 ===== */}
          <div className="form-row">
            <Field
              label="Delivery Location"
              id="contact-delivery"
              value={form.delivery}
              onChange={(v) => handleChange("delivery", v)}
              error={errors.delivery}
              icon="location"
            />

            <Field
              label="Vehicle Type"
              id="contact-vehicle"
              value={form.vehicle}
              onChange={(v) => handleChange("vehicle", v)}
              icon="car"
              itemProp="makesOffer"
            />
          </div>

          {/* MESSAGE */}
          <FieldTextarea
            label="Message"
            id="contact-message"
            value={form.message}
            onChange={(v) => handleChange("message", v)}
            itemProp="description"
          />

          {/* SUBMIT */}
          <button type="submit" className="contact-cta" disabled={sending}>
            {sending ? "Sending…" : "Send Request"}
            <span className="arrow">›</span>
          </button>

          {submitted && !globalError && (
            <p className="success-message" aria-live="polite">
              ✔ Request received. We’ll reply soon.
            </p>
          )}

          {globalError && (
            <p className="error-text global-error" aria-live="assertive">
              {globalError}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* -----------------------------------------
   REUSABLE FIELD COMPONENT
------------------------------------------ */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  icon,
  type = "text",
  itemProp,
}) {
  return (
    <div className={`form-field ${error ? "error" : ""}`}>
      <div className="field-shell">
        <span className="field-icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <input
          id={id}
          type={type}
          className="field-input"
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          itemProp={itemProp}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

/* -----------------------------------------
   TEXTAREA FIELD
------------------------------------------ */
function FieldTextarea({ id, label, value, onChange, itemProp }) {
  return (
    <div className="form-field">
      <div className="field-shell field-shell-textarea">
        <span className="field-icon" aria-hidden="true">
          <Icon name="message" />
        </span>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <textarea
          id={id}
          className="field-input textarea-input"
          placeholder=" "
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          itemProp={itemProp}
        />
      </div>
    </div>
  );
}

/* -----------------------------------------
   ICON COMPONENT
------------------------------------------ */
function Icon({ name }) {
  switch (name) {
    case "user":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M12 12a4 4 0 1 0-4-4 4.003 4.003 0 0 0 4 4Zm0 2c-4.41 0-8 2.239-8 5v1h16v-1c0-2.761-3.59-5-8-5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M6.62 10.79a15.093 15.093 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.25 1.01Z"
            fill="currentColor"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.01L12 12 4 6.01V6Zm0 2.24V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.24l-8 5.33-8-5.33Z"
            fill="currentColor"
          />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M12 2a7 7 0 0 0-7 7c0 4.25 4.47 8.86 6.33 10.66a1 1 0 0 0 1.34 0C14.53 17.86 19 13.25 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "car":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M5 11 6.5 6.5A2 2 0 0 1 8.42 5h7.16a2 2 0 0 1 1.92 1.5L19 11v6a1 1 0 0 1-1 1h-1a1.5 1.5 0 0 1-3 0H10a1.5 1.5 0 0 1-3 0H6a1 1 0 0 1-1-1v-6Zm3.34-4L7.72 9h8.56l-.62-2H8.34Z"
            fill="currentColor"
          />
        </svg>
      );
    case "message":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M4 4h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H8.83L4.7 20.71A1 1 0 0 1 3 20V6a2 2 0 0 1 2-2Zm2 3v1.5h12V7Zm0 4v1.5h8V11Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}
