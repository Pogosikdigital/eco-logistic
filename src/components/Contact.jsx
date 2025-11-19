// src/components/Contact.jsx
import React, { useState } from "react";
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

  // toggle phone reveal
  const [showPhone, setShowPhone] = useState(false);

  // ===== VALIDATION =====
  const validate = () => {
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
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    setSubmitted(false);
    setSubmitError("");
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
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
      const response = await fetch("/api/lead", {
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
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.warn("Contact /api/lead: cannot parse JSON:", err);
      }
      console.log("Contact /api/lead response data:", data);

      // UX: даже если телега не ответила идеально, для пользователя считаем, что всё ок
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
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
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

        <div className={`phone-reveal ${showPhone ? "visible" : ""}`}>
          <p className="phone-number">(650) 999-9660</p>
        </div>

        {/* HEADER */}
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions or need a quote? We respond within minutes.
          </p>
        </div>

        <p className="response-time">
          Average response time: <span>5–10 minutes</span>
        </p>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Name + Phone */}
          <div className="form-row">
            <div className={`form-field ${errors.name ? "error" : ""}`}>
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
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

            <div className={`form-field ${errors.phone ? "error" : ""}`}>
              <label htmlFor="contact-phone">Phone Number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone ? "contact-phone-error" : undefined
                }
              />
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
            <div className={`form-field ${errors.email ? "error" : ""}`}>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />
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

            <div className={`form-field ${errors.pickup ? "error" : ""}`}>
              <label htmlFor="contact-pickup">Pickup Location</label>
              <input
                id="contact-pickup"
                name="pickup"
                type="text"
                placeholder="City, State"
                value={formData.pickup}
                onChange={(e) => handleChange("pickup", e.target.value)}
                aria-invalid={!!errors.pickup}
                aria-describedby={
                  errors.pickup ? "contact-pickup-error" : undefined
                }
              />
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
            <div className={`form-field ${errors.delivery ? "error" : ""}`}>
              <label htmlFor="contact-delivery">Delivery Location</label>
              <input
                id="contact-delivery"
                name="delivery"
                type="text"
                placeholder="City, State"
                value={formData.delivery}
                onChange={(e) => handleChange("delivery", e.target.value)}
                aria-invalid={!!errors.delivery}
                aria-describedby={
                  errors.delivery ? "contact-delivery-error" : undefined
                }
              />
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

            <div className="form-field">
              <label htmlFor="contact-vehicle">Vehicle Type</label>
              <input
                id="contact-vehicle"
                name="vehicle"
                type="text"
                placeholder="Sedan, SUV, Motorcycle…"
                value={formData.vehicle}
                onChange={(e) => handleChange("vehicle", e.target.value)}
              />
            </div>
          </div>

          {/* Message */}
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell us more about your shipment..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={4}
            ></textarea>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="contact-cta"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Request"}{" "}
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

        {/* SOCIAL ICONS — можно будет наполнить позже */}
        <div className="social-row"></div>
      </div>
    </section>
  );
}
