// src/components/Header.jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.webp";
import "./styles/header.css";

const NAV_LINKS = [
  { id: "home", label: "Home", type: "anchor" },
  { id: "reviews", label: "Reviews", type: "anchor" },
  { id: "services", label: "Services", type: "anchor" },
  { id: "how-it-works", label: "How it works", type: "anchor" },
  { id: "about", label: "About Us", type: "anchor" },
  { id: "earn-with-us", label: "Earn With Us", type: "page", to: "/earn-with-us" },
  { id: "contact", label: "Contact", type: "anchor" },
];

// ✅ SEO-friendly routes for sections (no hash)
const ROUTE_BY_ID = {
  home: "/",
  reviews: "/testimonials",
  services: "/services",
  "how-it-works": "/how-it-works",
  about: "/about",
  contact: "/contact",
};

// ✅ route -> active id
const ID_BY_ROUTE = {
  "/": "home",
  "/testimonials": "reviews",
  "/services": "services",
  "/how-it-works": "how-it-works",
  "/about": "about",
  "/contact": "contact",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ treat these routes as "home-like" (same page, scroll sections)
  const isHomeLike = !!ID_BY_ROUTE[location.pathname];

  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSmall, setHeaderSmall] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState("dark");

  // rAF throttling refs
  const rafRef = useRef(0);
  const lastYRef = useRef(0);

  // Keep links stable
  const navLinks = useMemo(() => NAV_LINKS, []);

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  // ✅ Smooth section navigation WITHOUT "jump" (no re-render when already on home-like)
  const handleAnchor = useCallback(
    (e, id) => {
      e.preventDefault();
      setMenuOpen(false);

      const to = ROUTE_BY_ID[id] || "/";

      // ✅ If already on Home-like routes: update URL without navigation + smooth scroll
      if (isHomeLike) {
        window.history.replaceState(null, "", to);

        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

        return;
      }

      // ✅ If on other pages: do normal navigate (App.jsx will scroll after render)
      navigate(to);
    },
    [navigate, isHomeLike]
  );

  // Lightweight scroll handler (progress + headerSmall) with rAF
  useEffect(() => {
    const onScroll = () => {
      lastYRef.current = window.scrollY || 0;
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;

        const y = lastYRef.current;
        setHeaderSmall(y > 40);

        const doc = document.documentElement;
        const total = (doc.scrollHeight - window.innerHeight) || 1;
        const p = Math.min((y / total) * 100, 100);
        setScrollProgress(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ✅ Keep active tab in sync with pathname (SEO routes)
  useEffect(() => {
    const id = ID_BY_ROUTE[location.pathname];
    if (id) setActive(id);
  }, [location.pathname]);

  // IntersectionObserver for active section (works on home-like routes)
  useEffect(() => {
    if (!isHomeLike) return;

    const anchorIds = navLinks.filter((l) => l.type === "anchor").map((l) => l.id);

    const elements = anchorIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomeLike, navLinks]);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className={`header ${headerSmall ? "small" : ""}`}>
        <div className="header-container">
          {/* ✅ LOGO (same structure, SEO route, smooth behavior) */}
          <a
            href="/"
            className="logo-block"
            onClick={(e) => handleAnchor(e, "home")}
            aria-label="EcoHub Logistics home"
          >
            <img
              src={logo}
              className="logo"
              alt="EcoHub Logistics logo"
              width="44"
              height="44"
              decoding="async"
            />
            <div className="logo-text">
              <span className="logo-name">EcoHub Logistics</span>
              <span className="logo-tagline">Auto Transport USA</span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul>
              {navLinks.map((link) =>
                link.type === "anchor" ? (
                  <li key={link.id}>
                    <a
                      href={ROUTE_BY_ID[link.id] || "/"}
                      className={active === link.id ? "active" : ""}
                      onClick={(e) => handleAnchor(e, link.id)}
                      aria-current={active === link.id ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.id}>
                    <Link to={link.to || "/"}>{link.label}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* QUOTE BUTTON */}
          <Link to="/quote" className="quote-btn" aria-label="Get a free quote">
            Get a Free Quote ▷
          </Link>

          {/* THEME BUTTON */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            type="button"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map((link) =>
            link.type === "anchor" ? (
              <li key={link.id}>
                <a href={ROUTE_BY_ID[link.id] || "/"} onClick={(e) => handleAnchor(e, link.id)}>
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.id}>
                <Link to={link.to || "/"} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <Link to="/quote" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Get a Free Quote ▷
        </Link>
      </div>
    </>
  );
}
