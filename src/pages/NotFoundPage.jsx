// src/pages/NotFoundPage.jsx
import { Link, useLocation } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";

export default function NotFoundPage() {
  const location = useLocation();
  const canonical = `https://www.ecohublogistics.com${location.pathname}`;

  return (
    <>
      <MetaSEO
        title="404 — Page Not Found | EcoHub Logistics"
        description="This page does not exist."
        canonical={canonical}
        robots="noindex,follow"
      />

      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>404</h1>

        <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 10 }}>
          Page not found.
        </p>

        <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 24 }}>
          URL: <code>{location.pathname}</code>
        </p>

        <Link to="/" style={{ textDecoration: "underline" }}>
          Go to Home
        </Link>
      </div>
    </>
  );
}

