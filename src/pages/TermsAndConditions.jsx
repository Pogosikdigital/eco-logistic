// src/pages/TermsAndConditions.jsx
import MetaSEO from "../components/MetaSEO";
import "../components/styles/terms-and-conditions.css";

export default function TermsAndConditions() {
  return (
    <section className="terms">
      <MetaSEO
        title="Terms and Conditions"
        description="Terms and Conditions for EcoHub Logistics Inc. Please review the terms governing the use of our services."
        canonical="https://www.ecohublogistics.com/terms-and-conditions"
      />

      <div className="terms__container">
        <header className="terms__head">
          <span className="terms__badge">Legal</span>
          <h1 className="terms__title">Terms and Conditions</h1>
          <p className="terms__updated">Last updated: January 2026</p>
        </header>

        <div className="terms__content">
          <div className="terms__block">
            <p className="terms__p">
              These Terms and Conditions govern your use of the EcoHub Logistics Inc website
              and services. By accessing or using our website, you agree to be bound by these terms.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Services</h2>
            <p className="terms__p">
              EcoHub Logistics Inc provides vehicle transportation and logistics coordination
              services across the United States. All quotes are estimates and subject to change
              based on availability, route, and vehicle condition.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">User Responsibilities</h2>
            <p className="terms__p">
              You agree to provide accurate information when requesting quotes or services.
              You are responsible for ensuring your vehicle is ready for transport unless
              otherwise agreed.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Payments</h2>
            <p className="terms__p">
              Payment terms will be communicated prior to service confirmation. Failure to
              complete payment may result in service cancellation.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Limitation of Liability</h2>
            <p className="terms__p">
              EcoHub Logistics Inc acts as a transportation coordinator and is not responsible
              for delays caused by weather, traffic, or circumstances beyond reasonable control.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Intellectual Property</h2>
            <p className="terms__p">
              All content on this website is the property of EcoHub Logistics Inc and may not
              be copied or reused without written permission.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Governing Law</h2>
            <p className="terms__p">
              These Terms are governed by the laws of the State of Florida, United States.
            </p>
          </div>

          <div className="terms__block">
            <h2 className="terms__h2">Contact Information</h2>
            <p className="terms__p">
              EcoHub Logistics Inc<br />
              Email: info@ecohublogistics.com<br />
              Phone: (650) 999-9660
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
