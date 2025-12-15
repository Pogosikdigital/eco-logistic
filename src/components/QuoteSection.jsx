// src/components/QuoteSection.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import "./styles/quotesection.css";

// assets (bundled by Vite)
import usaMap from "../assets/usa-map.png";

// public files (served as URLs)
const GoogleRew = "/googleRew.png";
const quoteImage = "/image.png";

export default function QuoteSection() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    pickupZip: "",
    deliveryZip: "",
    vehicle: "",
    notes: "",
    company: "", // honeypot
    startedAt: Date.now(),
    source: "quote-section",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.fullName || !form.phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data?.ok) {
        setSuccess(true);
        setForm((prev) => ({
          ...prev,
          fullName: "",
          phone: "",
          email: "",
          pickupZip: "",
          deliveryZip: "",
          vehicle: "",
          notes: "",
          company: "",
          startedAt: Date.now(),
        }));
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="quote-section">
      <div className="quote-container">
        <div className="quote-left">
          <img
            src={quoteImage}
            alt="Vehicle shipping across the USA"
            className="quote-hero-image"
          />
          <div className="quote-map">
            <img src={usaMap} alt="USA map" />
          </div>
        </div>

        <div className="quote-right">
          <img
            src={GoogleRew}
            alt="Google Reviews"
            className="quote-google-reviews"
          />

          <h2>Get Your Free Quote</h2>
          <p>Fast, insured vehicle shipping anywhere in the USA.</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <div
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pickupZip"
              placeholder="Pickup ZIP"
              value={form.pickupZip}
              onChange={handleChange}
            />

            <input
              type="text"
              name="deliveryZip"
              placeholder="Delivery ZIP"
              value={form.deliveryZip}
              onChange={handleChange}
            />

            <input
              type="text"
              name="vehicle"
              placeholder="Vehicle (year, make, model)"
              value={form.vehicle}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Additional details (optional)"
              value={form.notes}
              onChange={handleChange}
            />

            {error && <p className="form-error">{error}</p>}
            {success && (
              <p className="form-success">
                Thank you! Our coordinator will contact you shortly.
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Calculating…" : "Get Free Quote"}
            </button>

            <ul className="form-trust">
              <li>✔ No spam</li>
              <li>✔ Free & fast</li>
              <li>✔ Real coordinator</li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
}
