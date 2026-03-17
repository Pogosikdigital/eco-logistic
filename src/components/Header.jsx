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

// Hash-based section URLs on home page
const HASH_BY_ID = {
  home: "/",
  reviews: "/#reviews",
  services: "/#services",
  "how-it-works": "/#how-it-works",
  about: "/#about",
  contact: "/#contact",
};

// Hash -> active tab id
const ID_BY_HASH = {
  "#reviews": "reviews",
  "#services": "services",
  "#how-it-works": "how-it-works",
  "#about": "about",
  "#contact": "contact",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeLike = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSmall, setHeaderSmall] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState("dark");

  const rafRef = useRef(0);
  const lastYRef = useRef(0);

  const navLinks = useMemo(() => NAV_LINKS, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  const handleAnchor = useCallback(
    (e, id) => {
      e.preventDefault();
      setMenuOpen(false);

      const to = HASH_BY_ID[id] || "/";

      if (location.pathname === "/") {
        window.history.replaceState(null, "", to);

        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

        return;
      }

      navigate(to);
    },
    [navigate, location.pathname]
  );

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

  useEffect(() => {
    if (location.pathname !== "/") return;

    if (!location.hash) {
      setActive("home");
      return;
    }

    const id = ID_BY_HASH[location.hash];
    if (id) setActive(id);
  }, [location.pathname, location.hash]);

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

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul>
              {navLinks.map((link) =>
                link.type === "anchor" ? (
                  <li key={link.id}>
                    <a
                      href={HASH_BY_ID[link.id] || "/"}
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

          <Link to="/quote" className="quote-btn" aria-label="Get a free quote">
            Get a Free Quote ▷
          </Link>

          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            type="button"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

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

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map((link) =>
            link.type === "anchor" ? (
              <li key={link.id}>
                <a href={HASH_BY_ID[link.id] || "/"} onClick={(e) => handleAnchor(e, link.id)}>
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