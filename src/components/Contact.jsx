// src/components/Contact.jsx
import React, { useState } from "react";
import "./styles/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    delivery: "",
    vehicle: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // toggle phone reveal
  const [showPhone, setShowPhone] = useState(false);

  // VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.pickup.trim()) newErrors.pickup = "Pickup location is required.";
    if (!formData.delivery.trim()) newErrors.delivery = "Delivery location is required.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log("Submitted data:", formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* CLICKABLE CONTACT BADGE */}
        <button
  className={`contact-badge-btn neon-pulse-btn ${showPhone ? "open" : ""}`}
  onClick={() => setShowPhone(!showPhone)}
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
        <form className="contact-form" onSubmit={handleSubmit}>

          {/* Name + Phone */}
          <div className="form-row">

            <div className={`form-field ${errors.name ? "error" : ""}`}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className={`form-field ${errors.phone ? "error" : ""}`}>
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

          </div>

          {/* Email + Pickup */}
          <div className="form-row">

            <div className={`form-field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className={`form-field ${errors.pickup ? "error" : ""}`}>
              <label>Pickup Location</label>
              <input
                type="text"
                placeholder="City, State"
                value={formData.pickup}
                onChange={(e) => handleChange("pickup", e.target.value)}
              />
              {errors.pickup && <p className="error-text">{errors.pickup}</p>}
            </div>

          </div>

          {/* Delivery + Vehicle */}
          <div className="form-row">

            <div className={`form-field ${errors.delivery ? "error" : ""}`}>
              <label>Delivery Location</label>
              <input
                type="text"
                placeholder="City, State"
                value={formData.delivery}
                onChange={(e) => handleChange("delivery", e.target.value)}
              />
              {errors.delivery && <p className="error-text">{errors.delivery}</p>}
            </div>

            <div className="form-field">
              <label>Vehicle Type</label>
              <input
                type="text"
                placeholder="Sedan, SUV, Motorcycle…"
                value={formData.vehicle}
                onChange={(e) => handleChange("vehicle", e.target.value)}
              />
            </div>

          </div>

          {/* Message */}
          <div className="form-field">
            <label>Message</label>
            <textarea
              placeholder="Tell us more about your shipment..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            ></textarea>
          </div>

          {/* CTA */}
          <button type="submit" className="contact-cta">
            Send Request <span className="arrow">›</span>
          </button>

          {submitted && (
            <p className="success-message">
              ✔ Your request has been sent. We will contact you shortly.
            </p>
          )}
        </form>

        {/* SOCIAL ICONS */}
<div className="social-row">
</div>

      </div>
    </section>
  );
}