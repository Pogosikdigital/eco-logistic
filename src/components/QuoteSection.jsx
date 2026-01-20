// src/components/QuoteSection.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import "./styles/quotesection.css";
import usaMap from "./../assets/usa-map.png";
import { getLeadContext } from "../utils/sourceMapper";

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
  company: "", // honeypot
};

function getTodayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// легкая метка сессии (для "пока не обновит страницу")
function getSessionId() {
  if (typeof window === "undefined") return "";
  try {
    const key = "ecohub_session_id";
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = (crypto?.randomUUID?.() || String(Date.now())) + "_" + Math.random().toString(16).slice(2);
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return "";
  }
}

function getScrollPercent() {
  if (typeof window === "undefined") return null;
  const doc = document.documentElement;
  const total = (doc.scrollHeight - window.innerHeight) || 1;
  const y = window.scrollY || 0;
  const p = Math.round((y / total) * 100);
  return Math.max(0, Math.min(100, p));
}

export default function QuoteSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [isRightVisible, setIsRightVisible] = useState(false);
  const rightRef = useRef(null);

  const todayISO = useMemo(() => getTodayISO(), []);

  const canonicalPhone = useMemo(() => "+16509999660", []);
  const canonicalEmail = useMemo(() => "info@ecohublogistics.com", []);
  const canonicalUrl = useMemo(() => "https://www.ecohublogistics.com", []);

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
        const today = new Date(todayISO);
        const selected = new Date(value);
        selected.setHours(0, 0, 0, 0);
        if (selected < today) return "Pickup date cannot be in the past.";
        return "";
      }
      case "notes":
        if (value.length > 600) return "Notes should be shorter than 600 characters.";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (key === "company") return; // honeypot не валидируем
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }

    if (submitSuccess) setSubmitSuccess(false);
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

    // honeypot
    if (form.company && form.company.trim().length > 0) {
      setSubmitSuccess(true);
      setForm(initialForm);
      setTouched({});
      setErrors({});
      return;
    }

    const foundErrors = validateForm(form);
    setErrors(foundErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(foundErrors).length > 0) {
      const firstErrorField = Object.keys(foundErrors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = getLeadContext({
        source: "quote-form",

        // form fields
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        phoneDigits: (form.phone || "").replace(/\D/g, ""),
        vehicle: form.vehicle.trim(),
        pickupZip: form.pickupZip.trim(),
        deliveryZip: form.deliveryZip.trim(),
        transportType: form.transportType,
        pickupDate: form.pickupDate,
        notes: form.notes.trim(),

        // extra tracking
        pageTitle: typeof document !== "undefined" ? document.title : "",
        scrollPercent: getScrollPercent(),
        ts: new Date().toISOString(),
        sessionId: getSessionId(),
      });

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // ignore
      }

      if (!response.ok || (data && data.ok === false)) {
        throw new Error(data?.error || `send_failed_${response.status}`);
      }

      setSubmitSuccess(true);
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("Quote submit error:", err);
      setSubmitError("We couldn't send your request. Please try again in a minute.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      itemType="https://schema.org/WebPage"
    >
      {/* ✅ SEO microdata */}
      <div
        className="seo-preload"
        itemScope
        itemType="https://schema.org/Organization"
        itemProp="publisher"
      >
        <meta itemProp="name" content="EcoHub Logistics Inc" />
        <meta itemProp="url" content={canonicalUrl} />
        <meta itemProp="email" content={canonicalEmail} />
        <meta itemProp="telephone" content={canonicalPhone} />
        <meta
          itemProp="description"
          content="EcoHub Logistics provides nationwide auto transport across the USA with transparent pricing and reliable dispatch."
        />
      </div>

      <div itemScope itemType="https://schema.org/Service" itemProp="mainEntity">
        <meta itemProp="name" content="Auto Transport Quote" />
        <meta itemProp="serviceType" content="Vehicle shipping / auto transport quote request" />
        <meta itemProp="areaServed" content="United States" />
        <meta
          itemProp="description"
          content="Request a free auto transport quote: open or enclosed, door-to-door, insured carriers."
        />
        <meta itemProp="provider" content="EcoHub Logistics Inc" />
      </div>

      <div className="quote-inner">
        <div className="quote-left">
          <h2 id="quote-heading" className="quote-title">
            Get a Free Quote
          </h2>

          <p className="quote-subtitle">No hidden fees. Quick response by a real coordinator.</p>

          {submitSuccess && (
            <div className="quote-trust" role="status" aria-live="polite">
              <div className="quote-trust-top">
                <div className="quote-trust-badge">✅ Request received</div>
                <p className="quote-trust-title">What happens next</p>
              </div>

              <ul className="quote-trust-list">
                <li>
                  <span className="quote-trust-dot" />
                  We review your route & vehicle details.
                </li>
                <li>
                  <span className="quote-trust-dot" />
                  A coordinator calls you in <b>5–10 minutes</b>.
                </li>
                <li>
                  <span className="quote-trust-dot" />
                  Need it faster? Call now and we’ll prioritize your request.
                </li>
              </ul>

              <div className="quote-trust-actions">
                <a className="quote-trust-call" href={`tel:${canonicalPhone}`}>
                  Call now (650) 999-9660
                </a>

                <button
                  type="button"
                  className="quote-trust-again"
                  onClick={() => setSubmitSuccess(false)}
                >
                  Send another request
                </button>
              </div>

              <p className="quote-trust-note">Tip: if you don’t see a reply, check missed calls or spam.</p>
            </div>
          )}

          {submitError && (
            <p className="quote-error-global" aria-live="assertive">
              {submitError}
            </p>
          )}

          <form className="quote-form" onSubmit={handleSubmit} noValidate itemScope itemType="https://schema.org/QuoteAction">
            <meta itemProp="name" content="Request Quote" />
            <meta itemProp="target" content={`${canonicalUrl}/quote`} />
            <meta itemProp="provider" content="EcoHub Logistics Inc" />
            <meta itemProp="description" content="Request a free auto transport quote from EcoHub Logistics." />

            {/* Honeypot */}
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
              aria-hidden="true"
            >
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="quote-form-grid">
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
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  required
                />
                {errors.fullName && <span id="fullName-error" className="field-error">{errors.fullName}</span>}
              </div>

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
                />
                {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
              </div>

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
                />
                {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}
              </div>

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
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label htmlFor="pickupZip">PICKUP ZIP</label>
                <input
                  id="pickupZip"
                  name="pickupZip"
                  type="text"
                  placeholder="32801"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={form.pickupZip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.pickupZip}
                  aria-describedby={errors.pickupZip ? "pickupZip-error" : undefined}
                />
                {errors.pickupZip && <span id="pickupZip-error" className="field-error">{errors.pickupZip}</span>}
              </div>

              <div className="field">
                <label htmlFor="deliveryZip">DELIVERY ZIP</label>
                <input
                  id="deliveryZip"
                  name="deliveryZip"
                  type="text"
                  placeholder="90001"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={form.deliveryZip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.deliveryZip}
                  aria-describedby={errors.deliveryZip ? "deliveryZip-error" : undefined}
                />
                {errors.deliveryZip && <span id="deliveryZip-error" className="field-error">{errors.deliveryZip}</span>}
              </div>

              <div className="field">
                <label htmlFor="transportType">TRANSPORT TYPE</label>
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
                </select>
                {errors.transportType && <span id="transportType-error" className="field-error">{errors.transportType}</span>}
              </div>

              <div className="field">
                <label htmlFor="pickupDate">PICKUP DATE</label>
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  value={form.pickupDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={todayISO}
                  aria-invalid={!!errors.pickupDate}
                  aria-describedby={errors.pickupDate ? "pickupDate-error" : undefined}
                />
                {errors.pickupDate && <span id="pickupDate-error" className="field-error">{errors.pickupDate}</span>}
              </div>
            </div>

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
                maxLength={600}
              />
              {errors.notes && <span id="notes-error" className="field-error">{errors.notes}</span>}
            </div>

            <div className="quote-footer">
              <button type="submit" className="btn-quote-primary" disabled={isSubmitting} aria-label="Request a free auto transport quote">
                {isSubmitting ? "Sending..." : "Request Quote ▸"}
              </button>

              <p className="quote-call">
                or call <a href={`tel:${canonicalPhone}`}>(650) 999-9660</a>
              </p>
            </div>
          </form>
        </div>

        <aside className="quote-right">
          <div ref={rightRef} className={"quote-right-card" + (isRightVisible ? " quote-right-card--visible" : "")}>
            <div className="quote-right-gradient" />

            <div className="quote-right-content">
              <span className="quote-right-label">EcoHub Logistics</span>
              <h3>Nationwide Vehicle Transport</h3>
              <p className="quote-right-text">
                Door-to-door shipping across the USA with insured carriers and a real coordinator.
              </p>

              <div className="quote-right-stats">
                <div className="quote-stat">
                  <span className="quote-stat-k">Coverage</span>
                  <span className="quote-stat-v">All 50 states</span>
                </div>

                <div className="quote-stat">
                  <span className="quote-stat-k">Response</span>
                  <span className="quote-stat-v">5–10 minutes</span>
                </div>

                <div className="quote-stat">
                  <span className="quote-stat-k">Insurance</span>
                  <span className="quote-stat-v">Included</span>
                </div>
              </div>

              <div className="quote-right-bullets">
                <div className="quote-pill">✅ Door-to-door</div>
                <div className="quote-pill">✅ Open / Enclosed</div>
                <div className="quote-pill">✅ Real coordinator</div>
                <div className="quote-pill">✅ Transparent pricing</div>
              </div>

              <a
                className="quote-map quote-map--clean"
                href="https://www.google.com/maps/place/Orlando,+FL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View EcoHub Logistics service area on Google Maps"
              >
                <img src={usaMap} alt="USA auto transport service coverage map" loading="lazy" />
                <div className="quote-map-overlay">
                  <span className="quote-map-badge">USA coverage</span>
                </div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
