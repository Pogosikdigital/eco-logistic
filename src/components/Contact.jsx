// src/components/Contact.jsx
import React from "react";
import "./styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-section" itemScope itemType="https://schema.org/ContactPage">
      <div className="contact-container">

        <div className="contact-header">
          <span className="contact-badge">Contact Us</span>
          <h2 className="contact-title" itemProp="name">Get in Touch</h2>
          <p className="contact-subtitle" itemProp="description">
            Have questions or need a quote? Send us a message — we usually reply within minutes.
          </p>
        </div>

        <form className="contact-form" itemScope itemType="https://schema.org/Service">
          <div className="form-row">
            <div className="form-field">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" required />
            </div>

            <div className="form-field">
              <label>Phone Number</label>
              <input type="tel" placeholder="(555) 000-0000" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className="form-field">
              <label>Pickup Location</label>
              <input type="text" placeholder="City, State" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Delivery Location</label>
              <input type="text" placeholder="City, State" required />
            </div>

            <div className="form-field">
              <label>Vehicle Type</label>
              <input type="text" placeholder="Sedan, SUV, Motorcycle…" />
            </div>
          </div>

          <div className="form-field">
            <label>Message</label>
            <textarea placeholder="Tell us more about your shipment..."></textarea>
          </div>

          <button className="contact-cta">
            Send Request <span className="arrow">›</span>
          </button>
        </form>
      </div>
    </section>
  );
}