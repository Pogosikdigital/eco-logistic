// src/components/Contact.jsx
import React, { useState, useCallback } from "react";
import "./styles/contact.css";
import usePhoneInput from "../hooks/usePhoneInput";

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

  const apiUrl = "/api/lead";

  // Телефон через кастом-хук
  const {
    country,
    countries,
    inputValue: phoneInputValue,
    handleInputChange: handlePhoneInputChange,
    digits: phoneDigits,
    e164Phone,
    setCountryIso2,
  } = usePhoneInput({
    defaultIso2: "US",
    initialValue: "",
  });

  const handleCountryChange = useCallback(
    (iso2) => {
      setCountryIso2(iso2);
    },
    [setCountryIso2]
  );

  // универсальный change для остальных полей
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
    setSubmitted(false);
    setGlobalError("");
  }, []);

  const validate = useCallback(() => {
    const e = {};

    if (!form.name.trim()) e.name = "Full name is required.";

    if (!phoneDigits || phoneDigits.length < 10) {
      e.phone = "Enter a valid phone number.";
    }

    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Enter a valid email.";
    }

    if (!form.pickup.trim()) e.pickup = "Pickup required.";
    if (!form.delivery.trim()) e.delivery = "Delivery required.";

    return e;
  }, [form, phoneDigits]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const v = validate();
      setErrors(v);
      if (Object.keys(v).length) return;

      setSending(true);
      setGlobalError("");
      setSubmitted(false);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "contact-form",
            ...form,
            // отправляем в API красивый E.164 с кодом страны
            phone: e164Phone || `+1${phoneDigits || ""}`,
            country: country.iso2,
          }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "send_failed");
        }

        setForm(initialForm);
        setSubmitted(true);
      } catch (err) {
        console.error("CONTACT SEND ERROR:", err);
        setGlobalError(
          "We couldn't send your request. Please try again in a moment."
        );
      } finally {
        setSending(false);
      }
    },
    [apiUrl, form, e164Phone, phoneDigits, country, validate]
  );

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
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
        >
          <p className="phone-number">(650) 999-9660</p>
        </div>

        <header className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions or need a quote? We respond within minutes.
          </p>
        </header>

        <p className="response-time">
          Average response time: <span>5–10 minutes</span>
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <Field
              label="Full Name"
              id="contact-name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              error={errors.name}
              icon="user"
            />

            <Field
              label="Phone Number"
              id="contact-phone"
              type="tel"
              value={phoneInputValue}
              onChange={handlePhoneInputChange}
              error={errors.phone}
              icon="phone"
              placeholder="(305) 555-1234"
              rightAddon={
                <select
                  className="country-select"
                  value={country.iso2}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  aria-label="Country code"
                >
                  {countries.map((c) => (
                    <option key={c.iso2} value={c.iso2}>
                      {c.iso2} {c.dialCode}
                    </option>
                  ))}
                </select>
              }
            />
          </div>

          <div className="form-row">
            <Field
              label="Email"
              id="contact-email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
              icon="mail"
            />

            <Field
              label="Pickup Location"
              id="contact-pickup"
              value={form.pickup}
              onChange={(v) => handleChange("pickup", v)}
              error={errors.pickup}
              icon="location"
            />
          </div>

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
            />
          </div>

          <FieldTextarea
            label="Message"
            id="contact-message"
            value={form.message}
            onChange={(v) => handleChange("message", v)}
          />

          <button disabled={sending} className="contact-cta" type="submit">
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

/* ==== UI-поля ==== */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  icon,
  type = "text",
  placeholder = " ",
  rightAddon,
}) {
  return (
    <div className={`form-field ${error ? "error" : ""}`}>
      <div className="field-shell">
        <span className="field-icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className="field-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {rightAddon && (
          <div className="field-right-addon">{rightAddon}</div>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

function FieldTextarea({ id, label, value, onChange }) {
  return (
    <div className="form-field">
      <div className="field-shell field-shell-textarea">
        <span className="field-icon" aria-hidden="true">
          <Icon name="message" />
        </span>
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <textarea
          id={id}
          className="field-input textarea-input"
          rows={4}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

/* ==== Иконки ==== */

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
