import { useState, useEffect } from "react";
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
  const isQuotePage = location.pathname === "/quote";

  /* ===========================================================
     SCROLL LOGIC
  ============================================================ */
  useEffect(() => {
    if (isQuotePage) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress((window.scrollY / total) * 100);

      // ACTIVE SECTION DETECT
      navLinks.forEach((link) => {
        if (link.type !== "anchor") return;

        const el = document.getElementById(link.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(link.id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isQuotePage]);

  /* ===========================================================
     THEME SWITCH
  ============================================================ */
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
     UNIVERSAL ANCHOR HANDLER
  ============================================================ */
  const handleAnchorClick = (e, id) => {
    // 1. Если сейчас НЕ на / → просто allow default (#scroll)
    if (location.pathname !== "/") {
      e.preventDefault();
      window.location.href = `/#${id}`;
      return;
    }

    // 2. На главной → smooth scroll
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <>
      {!isQuotePage && (
        <div className="scroll-progress" style={{ width: `${progress}%` }} />
      )}

      <header className={`header ${scrolled ? "scrolled shrink" : ""}`}>
        <div className="header-container">

          {/* LOGO */}
          <a
            href="/#home"
            className="logo-section"
            onClick={(e) => handleAnchorClick(e, "home")}
          >
            <img src={logo} alt="EcoHub logo" className="logo" />
            <div className="logo-text">
              <h1>EcoHub Logistics</h1>
              <p>Auto Transport USA</p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
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
            className="theme-switch"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>


      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
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
