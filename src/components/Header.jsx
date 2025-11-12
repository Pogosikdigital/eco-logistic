import { useState } from 'react'
import logo from '../assets/logo.png'
import './styles/header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* ===== ЛОГО ===== */}
        <a href="/" className="logo-section">
      <img src={logo} alt="EcoHub Logo" className="logo" />
      <div className="logo-text">
        <h1>EcoHub Logistics</h1>
        <p>Auto Transport Across the USA</p>
      </div>
    </a>

        {/* ===== БУРГЕР ===== */}
        <button
          className={`burger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ===== НАВИГАЦИЯ ===== */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item"><a href="#" className="nav__link">Home</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Services</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Blog</a></li>
            <li className="nav__item"><a href="#" className="nav__link">About Us</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Earn With Us</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Contact</a></li>
            <li className="nav__item"><a href="#" className="nav__link">Reviews</a></li>
          </ul>
        </nav>

        {/* ===== КНОПКА ===== */}
        <a href="#" className="main-cta">Get a Free Quote ▷</a>
      </div>
    </header>
  )
}

export default Header
