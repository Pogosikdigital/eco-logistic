// src/pages/PrivacyPolicy.jsx
import MetaSEO from "../components/MetaSEO";
import "../components/styles/privacy-policy.css";

export default function PrivacyPolicy() {
  return (
    <section className="policy">
      <MetaSEO
        title="Privacy Policy"
        description="Privacy Policy for EcoHub Logistics Inc. Learn how we collect, use, and protect your information."
        canonical="https://www.ecohublogistics.com/privacy-policy"
      />

      <div className="policy__container">
        <header className="policy__head">
          <span className="policy__badge">Legal</span>
          <h1 className="policy__title">Privacy Policy</h1>
          <p className="policy__updated">Last updated: January 2026</p>
        </header>

        <div className="policy__content">
          <div className="policy__block">
            <p className="policy__p">
              EcoHub Logistics Inc ("Company", "we", "us", or "our") operates the
              website ecohublogistics.com. This Privacy Policy explains how we
              collect, use, and protect your information.
            </p>
          </div>

          <div className="policy__block policy__block--accent">
            <h2 className="policy__h2">Information We Collect</h2>
            <ul className="policy__list">
              <li><span className="policy__check">✓</span>Name & contact details</li>
              <li><span className="policy__check">✓</span>Vehicle & transport details</li>
              <li><span className="policy__check">✓</span>Pickup & delivery locations</li>
              <li><span className="policy__check">✓</span>Website usage & analytics data</li>
            </ul>
          </div>

          <div className="policy__block">
            <h2 className="policy__h2">How We Use Your Information</h2>
            <ul className="policy__list">
              <li><span className="policy__check">✓</span>Provide transport services</li>
              <li><span className="policy__check">✓</span>Process quotes & requests</li>
              <li><span className="policy__check">✓</span>Improve website experience</li>
              <li><span className="policy__check">✓</span>Legal & compliance purposes</li>
            </ul>
          </div>

          <div className="policy__block">
            <h2 className="policy__h2">Cookies & Tracking</h2>
            <p className="policy__p">
              We use cookies, Google Analytics (GA4), and Google Ads tracking
              technologies to analyze traffic and improve user experience.
            </p>
          </div>

          <div className="policy__block">
            <h2 className="policy__h2">Contact</h2>
            <p className="policy__p">
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
