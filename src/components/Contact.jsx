// src/components/Contact.jsx
import React, { useState, useCallback, useMemo } from "react";
import "./styles/contact.css";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  pickup: "",
  delivery: "",
  vehicle: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPhone, setShowPhone] = useState(false);

  const apiUrl = useMemo(
    () =>
      "https://untransparent-transpolar-tequila.ngrok-free.dev/api/lead",
    []
  );

  // ===== VALIDATION =====
  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 10) {
        newErrors.phone = "Phone number should contain at least 10 digits.";
      }
    }

    if (!formData.pickup.trim()) {
      newErrors.pickup = "Pickup location is required.";
    }

    if (!formData.delivery.trim()) {
      newErrors.delivery = "Delivery location is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    return newErrors;
  }, [formData]);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    setSubmitted(false);
    setSubmitError("");
  }, []);

  // ===== SUBMIT =====
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const newErrors = validate();
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      setSubmitError("");
      setSubmitted(false);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "contact-form",
            ...formData,
          }),
        });

        console.log("Contact /api/lead status:", response.status);

        try {
          const data = await response.json();
          console.log("Contact /api/lead response data:", data);
        } catch (err) {
          console.warn("Contact /api/lead: cannot parse JSON:", err);
        }

        // UX: считаем, что всё отправилось успешно
        setSubmitted(true);
        setFormData(initialFormData);
      } catch (error) {
        console.error("Contact submit NETWORK error:", error);
        setSubmitError(
          "We couldn’t reach the server. Please try again in a minute."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [apiUrl, formData, validate]
  );

  return (
    <section
      id="contact"
      className="contact-section"
      itemScope
      itemType="https://schema.org/ContactPage"
      aria-label="Contact EcoHub Logistics for a vehicle shipping quote"
    >
      {/* SEO / Schema.org */}
      <meta itemProp="name" content="Contact EcoHub Logistics" />
      <meta
        itemProp="description"
        content="Get in touch with EcoHub Logistics for a fast, no-obligation vehicle shipping quote across the USA."
      />

      <div
        className="contact-container"
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="EcoHub Logistics" />
        <meta itemProp="url" content="https://ecohub-logistics.com" />

        {/* анимированная рамка */}
        <div className="border-runner" aria-hidden="true" />

        {/* CLICKABLE CONTACT BADGE */}
        <button
          type="button"
          className={`contact-badge-btn neon-pulse-btn ${
            showPhone ? "open" : ""
          }`}
          onClick={() => setShowPhone((prev) => !prev)}
        >
          Contact Us
        </button>

        <div
          className={`phone-reveal ${showPhone ? "visible" : ""}`}
          itemProp="contactPoint"
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <meta itemProp="contactType" content="customer support" />
          <meta itemProp="telephone" content="+1-650-999-9660" />
          <p className="phone-number">(650) 999-9660</p>
        </div>

        {/* HEADER */}
        <header className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
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

          {/* Name + Phone */}
          <div className="form-row">
            {/* NAME */}
            <div className={`form-field ${errors.name ? "error" : ""}`}>
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* user icon */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 12a4 4 0 1 0-4-4 4.003 4.003 0 0 0 4 4Zm0 2c-4.41 0-8 2.239-8 5v1h16v-1c0-2.761-3.59-5-8-5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-name" className="field-label">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="field-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  itemProp="name"
                />
              </div>
              {errors.name && (
                <p
                  id="contact-name-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className={`form-field ${errors.phone ? "error" : ""}`}>
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* phone icon */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6.62 10.79a15.093 15.093 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.25 1.01Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-phone" className="field-label">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  className="field-input"
                  placeholder=" "
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "contact-phone-error" : undefined
                  }
                  itemProp="telephone"
                />
              </div>
              {errors.phone && (
                <p
                  id="contact-phone-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Email + Pickup */}
          <div className="form-row">
            {/* EMAIL */}
            <div className={`form-field ${errors.email ? "error" : ""}`}>
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* mail icon */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.01L12 12 4 6.01V6Zm0 2.24V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.24l-8 5.33-8-5.33Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-email" className="field-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="field-input"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  itemProp="email"
                />
              </div>
              {errors.email && (
                <p
                  id="contact-email-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* PICKUP */}
            <div className={`form-field ${errors.pickup ? "error" : ""}`}>
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* location icon */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 2a7 7 0 0 0-7 7c0 4.25 4.47 8.86 6.33 10.66a1 1 0 0 0 1.34 0C14.53 17.86 19 13.25 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-pickup" className="field-label">
                  Pickup Location
                </label>
                <input
                  id="contact-pickup"
                  name="pickup"
                  type="text"
                  className="field-input"
                  placeholder=" "
                  value={formData.pickup}
                  onChange={(e) => handleChange("pickup", e.target.value)}
                  aria-invalid={!!errors.pickup}
                  aria-describedby={
                    errors.pickup ? "contact-pickup-error" : undefined
                  }
                  itemProp="areaServed"
                />
              </div>
              {errors.pickup && (
                <p
                  id="contact-pickup-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.pickup}
                </p>
              )}
            </div>
          </div>

          {/* Delivery + Vehicle */}
          <div className="form-row">
            {/* DELIVERY */}
            <div className={`form-field ${errors.delivery ? "error" : ""}`}>
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* location icon 2 */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 2a7 7 0 0 0-7 7c0 4.25 4.47 8.86 6.33 10.66a1 1 0 0 0 1.34 0C14.53 17.86 19 13.25 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-delivery" className="field-label">
                  Delivery Location
                </label>
                <input
                  id="contact-delivery"
                  name="delivery"
                  type="text"
                  className="field-input"
                  placeholder=" "
                  value={formData.delivery}
                  onChange={(e) => handleChange("delivery", e.target.value)}
                  aria-invalid={!!errors.delivery}
                  aria-describedby={
                    errors.delivery ? "contact-delivery-error" : undefined
                  }
                />
              </div>
              {errors.delivery && (
                <p
                  id="contact-delivery-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.delivery}
                </p>
              )}
            </div>

            {/* VEHICLE */}
            <div className="form-field">
              <div className="field-shell">
                <span className="field-icon" aria-hidden="true">
                  {/* car icon */}
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M5 11 6.5 6.5A2 2 0 0 1 8.42 5h7.16a2 2 0 0 1 1.92 1.5L19 11v6a1 1 0 0 1-1 1h-1a1.5 1.5 0 0 1-3 0H10a1.5 1.5 0 0 1-3 0H6a1 1 0 0 1-1-1v-6Zm3.34-4L7.72 9h8.56l-.62-2H8.34Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <label htmlFor="contact-vehicle" className="field-label">
                  Vehicle Type
                </label>
                <input
                  id="contact-vehicle"
                  name="vehicle"
                  type="text"
                  className="field-input"
                  placeholder=" "
                  value={formData.vehicle}
                  onChange={(e) => handleChange("vehicle", e.target.value)}
                  itemProp="makesOffer"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="form-field">
            <div className="field-shell field-shell-textarea">
              <span className="field-icon" aria-hidden="true">
                {/* message icon */}
                <svg viewBox="0 0 24 24">
                  <path
                    d="M4 4h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H8.83L4.7 20.71A1 1 0 0 1 3 20V6a2 2 0 0 1 2-2Zm2 3v1.5h12V7Zm0 4v1.5h8V11Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <label htmlFor="contact-message" className="field-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="field-input textarea-input"
                placeholder=" "
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={4}
                itemProp="description"
              ></textarea>
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="contact-cta"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Request"}
            <span className="arrow">›</span>
          </button>

          {submitted && !submitError && (
            <p className="success-message" aria-live="polite">
              ✔ Your request has been sent. We will contact you shortly.
            </p>
          )}

          {submitError && (
            <p className="error-text global-error" aria-live="polite">
              {submitError}
            </p>
          )}
        </form>

        {/* SOCIAL ROW (если захочешь — добавим иконки Instagram / Facebook / etc.) */}
        <div className="social-row"></div>
      </div>
    </section>
  );
}
