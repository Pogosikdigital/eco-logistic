// src/components/Header.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./styles/header.css";

const navLinks = [
  { id: "home", label: "Home", type: "anchor" },
  { id: "how", label: "How it works", type: "anchor" },
  { id: "services", label: "Services", type: "anchor" },
  { id: "about", label: "About Us", type: "anchor" },
  { id: "reviews", label: "Reviews", type: "anchor" },
  { id: "earn", label: "Earn With Us", type: "page" },
  { id: "contact", label: "Contact", type: "anchor" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("dark");

  const location = useLocation();

  const isQuotePage = useMemo(
    () => location.pathname === "/quote",
    [location.pathname]
  );

  const isHomePage = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );

  /* ===========================================================
     THEME SWITCH — мемоизированный хэндлер
  ============================================================ */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ===========================================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ============================================================ */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  /* ===========================================================
     SCROLL LOGIC — оптимизированный обработчик
  ============================================================ */
  const handleScroll = useCallback(() => {
    // прогресс скролла
    const total =
      document.documentElement.scrollHeight - window.innerHeight || 1;

    const currentScroll = window.scrollY || window.pageYOffset || 0;
    const percent = Math.min(Math.max((currentScroll / total) * 100, 0), 100);

    setScrolled(currentScroll > 40);
    setProgress(percent);

    // активная секция
    navLinks.forEach((link) => {
      if (link.type !== "anchor") return;

      const el = document.getElementById(link.id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        setActiveSection(link.id);
      }
    });
  }, []);

  useEffect(() => {
    if (isQuotePage) return;

    // сразу посчитать состояние при монтировании
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isQuotePage, handleScroll]);

  /* ===========================================================
     UNIVERSAL ANCHOR HANDLER (desktop + mobile + logo)
  ============================================================ */
  const handleAnchorClick = useCallback(
    (event, id) => {
      // Если НЕ на главной — делаем переход с якорем
      if (!isHomePage) {
        event.preventDefault();
        window.location.href = `/#${id}`;
        return;
      }

      // Уже на главной → плавно скроллим
      const el = document.getElementById(id);
      if (el) {
        event.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [isHomePage]
  );

  /* ===========================================================
     RENDER
  ============================================================ */

  return (
    <>
      {!isQuotePage && (
        <div
          className="scroll-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      )}

      <header
        className={`header ${scrolled ? "scrolled shrink" : ""}`}
        role="banner"
      >
        <div className="header-container">
          {/* LOGO */}
          <a
            href="/#home"
            className="logo-section"
            onClick={(e) => handleAnchorClick(e, "home")}
            aria-label="EcoHub Logistics – back to top"
          >
            <img
              src={logo}
              alt="EcoHub Logistics logo"
              className="logo"
            />
            <div className="logo-text">
              <h1>EcoHub Logistics</h1>
              <p>Auto Transport USA</p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            <ul className="nav__list">
              {navLinks.map((item) => (
                <li key={item.id} className="nav__item">
                  {item.type === "anchor" ? (
                    <a
                      href={`/#${item.id}`}
                      className={`nav__link ${
                        activeSection === item.id ? "active" : ""
                      }`}
                      onClick={(e) => handleAnchorClick(e, item.id)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to="/earn" className="nav__link">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <Link to="/quote" className="main-cta">
            Get a Free Quote ▷
          </Link>

          {/* THEME BUTTON */}
          <button
            type="button"
            className="theme-switch"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {/* BURGER */}
          <button
            type="button"
            className={`burger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              {item.type === "anchor" ? (
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    setMenuOpen(false);
                    handleAnchorClick(e, item.id);
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to="/earn"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/quote"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Get a Free Quote ▷
        </Link>
      </div>
    </>
  );
}
