// src/components/QuoteSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "./styles/quotesection.css";
import quoteImage from "/image.png";
import usaMap from "./../assets/usa-map.png";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  vehicle: "",
  pickupZip: "",
  deliveryZip: "",
  transportType: "open",
  pickupDate: "",
  notes: "",
};

export default function QuoteSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // правая карточка (анимация появления)
  const [isRightVisible, setIsRightVisible] = useState(false);
  const rightRef = useRef(null);

  // ===== ВАЛИДАЦИЯ ОДНОГО ПОЛЯ =====
  const validateField = (name, value) => {
    switch (name) {
      case "fullName": {
        if (!value.trim()) return "Please enter your full name.";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters.";
        return "";
      }
      case "email": {
        if (!value.trim()) return "Please enter your email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim()))
          return "Please enter a valid email address.";
        return "";
      }
      case "phone": {
        if (!value.trim()) return "Please enter your phone number.";
        const digits = value.replace(/\D/g, "");
        if (digits.length < 10)
          return "Phone number should contain at least 10 digits.";
        return "";
      }
      case "pickupZip":
      case "deliveryZip": {
        if (!value.trim()) return "ZIP code is required.";
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value.trim()))
          return "Please enter a valid ZIP code.";
        return "";
      }
      case "transportType": {
        if (!value) return "Please select transport type.";
        return "";
      }
      case "pickupDate": {
        if (!value) return "Please choose a pickup date.";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(value);
        if (selected < today) return "Pickup date cannot be in the past.";
        return "";
      }
      case "notes": {
        if (value.length > 600)
          return "Notes should be shorter than 600 characters.";
        return "";
      }
      default:
        return "";
    }
  };

  // ===== ВАЛИДАЦИЯ ВСЕЙ ФОРМЫ =====
  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // ===== ИЗМЕНЕНИЕ ПОЛЕЙ =====
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }

    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  // ===== ОТПРАВКА ФОРМЫ (Vercel /api/lead) =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError("");

    const foundErrors = validateForm(form);
    setErrors(foundErrors);
    setTouched(
      Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(foundErrors).length > 0) {
      const firstErrorField = Object.keys(foundErrors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "quote-form",
          ...form,
        }),
      });

      console.log("Quote /api/lead status:", response.status);

      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.warn("Quote /api/lead: cannot parse JSON:", err);
      }
      console.log("Quote /api/lead response data:", data);

      setSubmitSuccess(true);
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("Quote submit NETWORK error:", err);
      setSubmitError(
        "We couldn't reach the server. Please try again in a minute."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== АНИМАЦИЯ ПРАВОЙ КАРТОЧКИ =====
  useEffect(() => {
    const node = rightRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRightVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="quote-section"
      id="quote"
      aria-labelledby="quote-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <meta
        itemProp="about"
        content="Vehicle shipping and auto transport across the USA"
      />

      <div className="quote-inner">
        {/* ===== LEFT: FORM ===== */}
        <div className="quote-left">
          <h2 id="quote-heading" className="quote-title" itemProp="headline">
            Get a Free Quote
          </h2>

          <p className="quote-subtitle" itemProp="description">
            No hidden fees. Quick response by a real coordinator.
          </p>

          {submitSuccess && (
            <p className="quote-success">
              Thank you! Your request has been sent. We’ll contact you shortly.
            </p>
          )}

          {submitError && (
            <p className="quote-error-global" aria-live="polite">
              {submitError}
            </p>
          )}

          <form
            className="quote-form"
            onSubmit={handleSubmit}
            noValidate
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/QuoteAction"
          >
            <meta
              itemProp="description"
              content="Request a free auto transport quote from EcoHub Logistics."
            />

            <div className="quote-form-grid">
              {/* FULL NAME */}
              <div className="field">
                <label htmlFor="fullName">FULL NAME</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Carter"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  required
                  itemProp="name"
                />
                {errors.fullName && (
                  <span id="fullName-error" className="field-error">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className="field">
                <label htmlFor="email">EMAIL</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                  itemProp="email"
                />
                {errors.email && (
                  <span id="email-error" className="field-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* PHONE */}
              <div className="field">
                <label htmlFor="phone">PHONE</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(650) 999-9660"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  required
                  itemProp="telephone"
                />
                {errors.phone && (
                  <span id="phone-error" className="field-error">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* VEHICLE */}
              <div className="field">
                <label htmlFor="vehicle">VEHICLE</label>
                <input
                  id="vehicle"
                  name="vehicle"
                  type="text"
                  placeholder="2018 Toyota Camry SE"
                  value={form.vehicle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* PICKUP ZIP */}
              <div className="field">
                <label htmlFor="pickupZip">PICKUP ZIP</label>
                <input
                  id="pickupZip"
                  name="pickupZip"
                  type="text"
                  placeholder="32801"
                  inputMode="numeric"
                  value={form.pickupZip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.pickupZip}
                  aria-describedby={
                    errors.pickupZip ? "pickupZip-error" : undefined
                  }
                />
                {errors.pickupZip && (
                  <span id="pickupZip-error" className="field-error">
                    {errors.pickupZip}
                  </span>
                )}
              </div>

              {/* DELIVERY ZIP */}
              <div className="field">
                <label htmlFor="deliveryZip">DELIVERY ZIP</label>
                <input
                  id="deliveryZip"
                  name="deliveryZip"
                  type="text"
                  placeholder="90001"
                  inputMode="numeric"
                  value={form.deliveryZip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.deliveryZip}
                  aria-describedby={
                    errors.deliveryZip ? "deliveryZip-error" : undefined
                  }
                />
                {errors.deliveryZip && (
                  <span id="deliveryZip-error" className="field-error">
                    {errors.deliveryZip}
                  </span>
                )}
              </div>

              {/* TRANSPORT TYPE */}
              <div className="field">
                <label htmlFor="transportType">TRANSPORT TYPE</label>
                <select
                  id="transportType"
                  name="transportType"
                  value={form.transportType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.transportType}
                  aria-describedby={
                    errors.transportType ? "transportType-error" : undefined
                  }
                >
                  <option value="open">Open</option>
                  <option value="enclosed">Enclosed</option>
                </select>
                {errors.transportType && (
                  <span id="transportType-error" className="field-error">
                    {errors.transportType}
                  </span>
                )}
              </div>

              {/* PICKUP DATE */}
              <div className="field">
                <label htmlFor="pickupDate">PICKUP DATE</label>
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  placeholder="MM/DD/YYYY"
                  value={form.pickupDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.pickupDate}
                  aria-describedby={
                    errors.pickupDate ? "pickupDate-error" : undefined
                  }
                />
                {errors.pickupDate && (
                  <span id="pickupDate-error" className="field-error">
                    {errors.pickupDate}
                  </span>
                )}
              </div>
            </div>

            {/* NOTES */}
            <div className="field field-notes">
              <label htmlFor="notes">NOTES</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Any timing constraints, special handling, etc."
                value={form.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.notes}
                aria-describedby={errors.notes ? "notes-error" : undefined}
              />
              {errors.notes && (
                <span id="notes-error" className="field-error">
                  {errors.notes}
                </span>
              )}
            </div>

            {/* FOOTER */}
            <div className="quote-footer">
              <button
                type="submit"
                className="btn-quote-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Request Quote ▸"}
              </button>
              <p className="quote-call">
                or call <a href="tel:+16509999660">(650) 999-9660</a>
              </p>
            </div>
          </form>
        </div>

        {/* ===== RIGHT: CARD (MAP + TRUCK) ===== */}
        <aside className="quote-right" aria-hidden="true">
          <div
            ref={rightRef}
            className={
              "quote-right-card" +
              (isRightVisible ? " quote-right-card--visible" : "")
            }
          >
            <div className="quote-right-gradient" />

            <div className="quote-right-content">
              <span className="quote-right-label">EcoHub Logistics</span>
              <h3>Auto Transport Across the USA</h3>
              <p className="quote-right-text">
                Reliable nationwide vehicle shipping with real-time updates.
              </p>

              <a
                className="quote-map"
                href="https://www.google.com/maps/place/Orlando,+FL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View EcoHub Logistics location and service area on Google Maps"
              >
                <img
                  src={usaMap}
                  alt="USA map with highlighted service area"
                  loading="lazy"
                />
                <div className="quote-map-pin" />
              </a>
            </div>

            <div className="quote-image-wrap">
              <img
                src={quoteImage}
                alt="EcoHub Logistics auto transport truck on the road in the USA"
                loading="lazy"
                itemProp="image"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
