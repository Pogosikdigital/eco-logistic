import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./styles/header.css";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About Us" },
  { id: "reviews", label: "Reviews" },
  { id: "earn", label: "Earn With Us" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("dark");

  const isQuotePage = window.location.pathname === "/quote";

  // SCROLL logic (only on main page)
  useEffect(() => {
    if (isQuotePage) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);

      navLinks.forEach((link) => {
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

  // Theme switcher
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Lock body on mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      {/* Progress bar (hide on quote page) */}
      {!isQuotePage && (
        <div className="scroll-progress" style={{ width: `${progress}%` }} />
      )}

      {/* HEADER */}
      <header className={`header ${scrolled ? "scrolled shrink" : ""}`}>
        <div className="header-container">

          <a href="/#home" className="logo-section">
            <img src={logo} alt="EcoHub logo" className="logo" />
            <div className="logo-text">
              <h1>EcoHub Logistics</h1>
              <p>Auto Transport USA</p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="nav desktop-nav">
            <ul className="nav__list">
              {navLinks.map((item) => (
                <li key={item.id} className="nav__item">
                  <a
                    href={`/#${item.id}`}
                    className={`nav__link ${
                      activeSection === item.id && !isQuotePage ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <a href="/quote" className="main-cta">Get a Free Quote ▷</a>

          {/* THEME SWITCH */}
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
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/quote"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Get a Free Quote ▷
        </a>
      </div>
    </>
  );
}
