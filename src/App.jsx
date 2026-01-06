// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./layouts/MainLayout";

// Home sections
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

  // 1) обычный переход — наверх (если нет hash)
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  // 2) переход по якорю — скроллим к секции
  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }, [location]);

  const Home = (
    <MainLayout>
      <Hero />
      <HowItWorks />
      <Services />
      <About />
      <Reviews />
      <Contact />
    </MainLayout>
  );

  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={Home} />

      {/* SEO-friendly section paths -> anchor on home */}
      <Route path="/services" element={<Navigate to="/#services" replace />} />
      <Route path="/how-it-works" element={<Navigate to="/#how-it-works" replace />} />
      <Route path="/about" element={<Navigate to="/#about" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />

      {/* Reviews секция на главной (чтобы не конфликтовать с /reviews-page) */}
      {/* В sitemap добавляй /testimonials */}
      <Route path="/testimonials" element={<Navigate to="/#reviews" replace />} />

      {/* REAL PAGES */}
      <Route
        path="/quote"
        element={
          <MainLayout>
            <QuotePage />
          </MainLayout>
        }
      />

      {/* Страница со всеми отзывами */}
      {/* Важно: НЕ /reviews, иначе конфликт с редиректом на секцию */}
      <Route
        path="/reviews"
        element={
          <MainLayout>
            <ReviewsPage />
          </MainLayout>
        }
      />

      <Route
        path="/earn-with-us"
        element={
          <MainLayout>
            <EarnWithUs />
          </MainLayout>
        }
      />

      {/* Backward compatibility */}
      <Route path="/earn" element={<Navigate to="/earn-with-us" replace />} />
      <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
      <Route path="/about-us" element={<Navigate to="/about" replace />} />

      {/* Common aliases */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/index" element={<Navigate to="/" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
