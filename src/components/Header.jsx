// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import "./styles/header.css";

const navLinks = [
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      setHeaderSmall(scrollY > 40);

      const total = document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.min((scrollY / total) * 100, 100));

      if (isHome) {
        navLinks.forEach((link) => {
          if (link.type !== "anchor") return;
          const el = document.getElementById(link.id);
          if (!el) return;

          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) setActive(link.id);
        });
      }
    };

    if (isHome) onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
            onClick={() => setMenuOpen(!menuOpen)}
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
