// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./layouts/MainLayout";

// Sections for home page
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

  // 🔥 Авто-скролл к секции при переходе типа /#services, /#about, /#how...
  useEffect(() => {
    // скроллим ТОЛЬКО если мы на главной /
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      
      // ждём один тик, чтобы секции успели отрисоваться
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 0);
    }
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

      {/* Страница формы */}
      <Route
        path="/quote"
        element={
          <MainLayout>
            <QuotePage />
          </MainLayout>
        }
      />

      {/* Страница отзывов */}
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
