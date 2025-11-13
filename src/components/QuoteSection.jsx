// src/components/QuoteSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "./styles/quotesection.css";
import quoteImage from "./../assets/image.png";
import usaMap from "./../assets/usa-map.png"; // сюда положи картинку карты США

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

  // анимация правой карточки при скролле
  const [isRightVisible, setIsRightVisible] = useState(false);
  const rightRef = useRef(null);

  // ====== ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ======
  const validateField = (name, value) => {
    switch (name) {
      case "fullName": {
        if (!value.trim()) return "Please enter your full name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
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

  // ====== ВАЛИДАЦИЯ ВСЕЙ ФОРМЫ ======
  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // ====== ОБРАБОТКА ИЗМЕНЕНИЙ ======
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }

    setSubmitSuccess(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  // ====== ОТПРАВКА ФОРМЫ ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);

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

    try {
      setIsSubmitting(true);

      // тут потом добавишь реальный запрос на сервер / телеграм / почту
      // const response = await fetch("/api/quote", {...});
      // if (!response.ok) throw new Error("Failed to submit form");

      await new Promise((res) => setTimeout(res, 800));

      setSubmitSuccess(true);
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch {
      alert("Something went wrong while sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====== АНИМАЦИЯ ПРАВОЙ КАРТОЧКИ ПРИ СКРОЛЛЕ ======
  useEffect(() => {
    const node = rightRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRightVisible(true);
          observer.disconnect(); // запускаем анимацию один раз
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
        {/* ===== Левая часть — форма ===== */}
        <div className="quote-left">
          <h2
            id="quote-heading"
            className="quote-title"
            itemProp="headline"
          >
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
                <label htmlFor="transportType">Transport type</label>
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
              <button
                type="submit"
                className="btn-quote-primary"
                itemProp="target"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Request Quote ›"}
              </button>
              <p className="quote-call">
                or call{" "}
                  <a href="tel:16509999660" itemProp="telephone">
                    (650) 999-9660
                  </a>
              </p>
            </div>
          </form>
        </div>

        {/* ===== Правая часть — карточка с картинкой ===== */}
        <aside className="quote-right" ref={rightRef}>
          <div
            className={
              "quote-right-card" +
              (isRightVisible ? " quote-right-card--visible" : "")
            }
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

              {/* Карта США с пином */}
              <a
  className="quote-map"
  href="https://www.google.com/maps/place/Orlando,+FL" // сюда можешь вставить точный адрес офиса
  target="_blank"
  rel="noopener noreferrer"
  aria-label="View EcoHub Logistics location and service area on Google Maps"
>
  <img src={usaMap} alt="" loading="lazy" />
  <div className="quote-map-pin" />
</a>
            </div>

            <div className="quote-image-wrap">
              <img
                src={quoteImage}
                alt="EcoHub Logistics auto transport truck on the road in the USA"
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