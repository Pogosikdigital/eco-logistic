// src/components/Header.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.webp";
import "./styles/header.css";

const NAV_LINKS = [
  { id: "home", label: "Home", type: "anchor" },
  { id: "how-it-works", label: "How it works", type: "anchor" },
  { id: "services", label: "Services", type: "anchor" },
  { id: "about", label: "About Us", type: "anchor" },
  { id: "reviews", label: "Reviews", type: "anchor" },
  { id: "earn-with-us", label: "Earn With Us", type: "page" },
  { id: "contact", label: "Contact", type: "anchor" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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

  // Smooth anchor navigation
  const handleAnchor = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lightweight scroll handler (only progress + headerSmall) with rAF
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

    // run once
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // IntersectionObserver for active section (replaces getBoundingClientRect loop)
  useEffect(() => {
    if (!isHome) return;

    const anchorIds = navLinks.filter((l) => l.type === "anchor").map((l) => l.id);

    const elements = anchorIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    // When section crosses the “header line” area — mark active
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        // shift the "activation zone" a bit down from top (header height)
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, navLinks]);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className={`header ${headerSmall ? "small" : ""}`}>
        <div className="header-container">
          {/* LOGO */}
          <a
            href="/#home"
            className="logo-block"
            onClick={(e) => handleAnchor(e, "home")}
            aria-label="EcoHub Logistics home"
          >
            <img src={logo} className="logo" alt="EcoHub Logistics logo" />
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
                      href={`/#${link.id}`}
                      className={active === link.id ? "active" : ""}
                      onClick={(e) => handleAnchor(e, link.id)}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.id}>
                    <Link to="/earn-with-us">{link.label}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* QUOTE BUTTON */}
          <Link to="/quote" className="quote-btn">
            Get a Free Quote ▷
          </Link>

          {/* THEME BUTTON */}
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map((link) =>
            link.type === "anchor" ? (
              <li key={link.id}>
                <a href={`/#${link.id}`} onClick={(e) => handleAnchor(e, link.id)}>
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.id}>
                <Link to="/earn-with-us" onClick={() => setMenuOpen(false)}>
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
