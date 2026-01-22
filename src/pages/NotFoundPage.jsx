import { Link, useLocation } from "react-router-dom";
import MetaSEO from "../components/MetaSEO";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <>
      <MetaSEO
        title="404 — Page Not Found | EcoHub Logistics"
        description="The page you’re looking for doesn’t exist or was moved."
        canonical={`https://www.ecohublogistics.com${location.pathname}`}
        robots="noindex,nofollow"
      />

      <section style={{ padding: "80px 16px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            borderRadius: 24,
            padding: 32,
            background:
              "linear-gradient(180deg, rgba(17,34,85,0.85), rgba(12,24,60,0.85))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ opacity: 0.8, marginBottom: 10, fontSize: 14 }}>
            Requested URL:
            <span style={{ marginLeft: 8, opacity: 0.9 }}>
              {location.pathname}
            </span>
          </div>

          <h1 style={{ fontSize: 48, lineHeight: 1.05, margin: "8px 0 12px" }}>
            404 — Page Not Found
          </h1>

          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 24 }}>
            This page doesn’t exist or was moved. Try one of the links below.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              to="/"
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(59,130,246,0.9)",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Go Home
            </Link>

            <Link
              to="/services"
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              View Services
            </Link>

            <Link
              to="/quote"
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Get a Free Quote
            </Link>

            <Link
              to="/contact"
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
