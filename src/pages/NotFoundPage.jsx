// src/pages/NotFoundPage.jsx
import MetaSEO from "../components/MetaSEO";

export default function NotFoundPage() {
  return (
    <>
      <MetaSEO
        title="404 — Page Not Found | EcoHub Logistics"
        description="This page does not exist."
        canonical="https://www.ecohublogistics.com/404"
        robots="noindex,nofollow"
      />

      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>404</h1>
        <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 24 }}>
          Page not found.
        </p>
        <a href="/" style={{ textDecoration: "underline" }}>
          Go to Home
        </a>
      </div>
    </>
  );
}
