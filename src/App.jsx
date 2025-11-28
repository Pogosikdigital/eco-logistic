// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./layouts/MainLayout";

// Home Sections
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

// Pages
import QuotePage from "./pages/QuotePage";
import ReviewsPage from "./pages/ReviewsPage";
import EarnWithUs from "./pages/EarnWithUs";

function App() {
  const location = useLocation();

  /* ------------------------------------------------------------
     1) Scroll вверх при обычной смене страниц (без hash)
     ------------------------------------------------------------ */
  useEffect(() => {
    if (location.hash) return; // если якорь — пусть обработает второй хук

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // корректный стандарт браузера
    });
  }, [location.pathname]);

  /* ------------------------------------------------------------
     2) Scroll к нужной секции при переходе типа /#contact /#about
     ------------------------------------------------------------ */
  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");

    // Небольшая задержка — чтобы DOM успел отрендериться
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 80);
  }, [location]);

  return (
    <Routes>
      {/* Главная */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Hero />
            <HowItWorks />
            <Services />
            <About />
            <Reviews />
            <Contact />
          </MainLayout>
        }
      />

      {/* Quote Page */}
      <Route
        path="/quote"
        element={
          <MainLayout>
            <QuotePage />
          </MainLayout>
        }
      />

      {/* Reviews Page */}
      <Route
        path="/reviews"
        element={
          <MainLayout>
            <ReviewsPage />
          </MainLayout>
        }
      />

      {/* Earn With Us */}
      <Route
        path="/earn"
        element={
          <MainLayout>
            <EarnWithUs />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
