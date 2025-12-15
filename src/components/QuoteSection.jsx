// src/components/QuoteSection.jsx
import GoogleRew from "../../public/googleRew.png";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles/quotesection.css";
import quoteImage from "../../public/image.png";
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

// simple US phone formatter: 6509999660 -> (650) 999-9660
const formatPhoneUS = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function QuoteSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [isRightVisible, setIsRightVisible] = useState(false);
  const rightRef = useRef(null);

  const [enableTilt, setEnableTilt] = useState(false);

  // ✅ API URL: для Vercel всегда норм /api/lead
  // Если хочешь локально дергать другой бек — добавь VITE_API_URL в .env (например http://localhost:3000/api/lead)
  const apiUrl = import.meta?.env?.VITE_API_URL || "/api/lead";

  // ====== VALIDATION ======
  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Please enter your full name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email": {
        if (!value.trim()) return "Please enter your email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return "Please enter a valid email address.";
        return "";
      }
      case "phone": {
        if (!value.trim()) return "Please enter your phone number.";
        const digits = value.replace(/\D/g, "");
        if (digits.length < 10) return "Phone number should contain at least 10 digits.";
        return "";
      }
      case "pickupZip":
      case "deliveryZip": {
        if (!value.trim()) return "ZIP code is required.";
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value.trim())) return "Please enter a valid ZIP code.";
        return "";
      }
      case "transportType":
        if (!value) return "Please select transport type.";
        return "";
      case "pickupDate": {
        if (!value) return "Please choose a pickup date.";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(value);
        if (selected < today) return "Pickup date cannot be in the past.";
        return "";
      }
      case "notes": {
        if (value.length > 600) return "Notes should be shorter than 600 characters.";
        return "";
      }
      default:
        return "";
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;
    if (name === "phone") nextValue = formatPhoneUS(value);

    setForm((prev) => ({ ...prev, [name]: nextValue }));

    if (touched[name]) {
      const error = validateField(name, nextValue);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError("");

    const foundErrors = validateForm(form);
    setErrors(foundErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(foundErrors).length > 0) {
      const firstField = document.querySelector(`[name="${Object.keys(foundErrors)[0]}"]`);
      if (firstField) firstField.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "quote-form", ...form }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {}

      // ✅ если сервер реально упал/не найден — покажем ошибку
      if (!response.ok) {
        setSubmitError("Server error. Please try again in a minute.");
        return;
      }

      // ✅ если бек вернул ok:false — тоже ошибка (на всякий)
      if (data && data.ok === false) {
        setSubmitError("We couldn't send your request. Please try again later.");
        return;
      }

      setSubmitSuccess(true);
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch (err) {
      setSubmitError("We couldn't reach the server. Please try again in a minute.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====== RIGHT CARD ANIMATION ======
  useEffect(() => {
    const node = rightRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRightVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Enable tilt only on desktop
  useEffect(() => {
    const check = () => setEnableTilt(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleCardMove = useCallback(
    (e) => {
      if (!enableTilt) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -8;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `
        perspective(1100px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `;
    },
    [enableTilt]
  );

  const handleCardLeave = useCallback(
    (e) => {
      if (!enableTilt) return;
      const card = e.currentTarget;
      card.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";
    },
    [enableTilt]
  );

  return (
    <section
      className="quote-section"
      id="quote"
      aria-labelledby="quote-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <meta itemProp="about" content="Vehicle shipping and auto transport across the USA" />

      <div className="quote-inner">
        {/* LEFT AREA */}
        <div className="quote-left">
          {/* ⭐ GOOGLE REVIEWS BADGE */}
          <div className="quote-google-rating">
            <img
              src={GoogleRew}
              alt="Google logo"
              className="google-rating-logo"
              loading="lazy"
              decoding="async"
            />

            <div className="google-rating-stars">★★★★★</div>

            <div className="google-rating-score">
              5.0<span>/5</span>
            </div>

            <div className="google-rating-text">
              Based on <strong>1,200+</strong> verified reviews
            </div>
          </div>

          <h2 id="quote-heading" className="quote-title" itemProp="headline">
            Get a Free Quote
          </h2>

          <p className="quote-subtitle" itemProp="description">
            No hidden fees. Quick response by a real coordinator.
          </p>

          {submitSuccess && (
            <div className="quote-success" role="status" aria-live="polite">
              <span className="quote-success-icon" aria-hidden="true">
                <span className="quote-success-circle" />
                <span className="quote-success-check" />
              </span>
              <span className="quote-success-text">
                Thank you! Your request has been sent. We’ll contact you shortly.
              </span>
            </div>
          )}

          {submitError && (
            <p className="quote-error-global" aria-live="polite">
              {submitError}
            </p>
          )}

          {/* FORM */}
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
                <label htmlFor="fullName">Full name</label>
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
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="phone">Phone</label>
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
                <label htmlFor="vehicle">Vehicle</label>
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
                <label htmlFor="pickupZip">Pickup ZIP</label>
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
                  aria-describedby={errors.pickupZip ? "pickupZip-error" : undefined}
                />
                {errors.pickupZip && (
                  <span id="pickupZip-error" className="field-error">
                    {errors.pickupZip}
                  </span>
                )}
              </div>

              {/* DELIVERY ZIP */}
              <div className="field">
                <label htmlFor="deliveryZip">Delivery ZIP</label>
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
                  aria-describedby={errors.deliveryZip ? "deliveryZip-error" : undefined}
                />
                {errors.deliveryZip && (
                  <span id="deliveryZip-error" className="field-error">
                    {errors.deliveryZip}
                  </span>
                )}
              </div>

              {/* TRANSPORT TYPE */}
              <div className="field">
                <label htmlFor="transportType">Transport type</label>
                <select
                  id="transportType"
                  name="transportType"
                  value={form.transportType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.transportType}
                  aria-describedby={errors.transportType ? "transportType-error" : undefined}
                >
                  <option value="open">Open</option>
                  <option value="enclosed">Enclosed</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="boat">Boat</option>
                  <option value="rv">RV / Trailer</option>
                </select>
                {errors.transportType && (
                  <span id="transportType-error" className="field-error">
                    {errors.transportType}
                  </span>
                )}
              </div>

              {/* PICKUP DATE */}
              <div className="field">
                <label htmlFor="pickupDate">Preferred pickup</label>
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  value={form.pickupDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.pickupDate}
                  aria-describedby={errors.pickupDate ? "pickupDate-error" : undefined}
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
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
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

            <div className="quote-footer">
              <button type="submit" className="btn-quote-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Request Quote ›"}
              </button>

              <p className="quote-call">
                or call <a href="tel:16509999660">(650) 999-9660</a>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE CARD */}
        <aside className="quote-right" ref={rightRef}>
          <div
            className={"quote-right-card" + (isRightVisible ? " quote-right-card--visible" : "")}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            itemProp="publisher"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <meta itemProp="name" content="EcoHub Logistics" />

            <div className="quote-right-gradient" />

            <div className="quote-right-content">
              <p className="quote-right-label">EcoHub Logistics</p>

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
                <img src={usaMap} alt="USA Map" loading="lazy" />
                <div className="quote-map-pin" />
              </a>
            </div>

            <div className="quote-image-wrap">
              <img
                src={quoteImage}
                alt="EcoHub Logistics transport truck"
                loading="lazy"
                itemProp="logo"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
