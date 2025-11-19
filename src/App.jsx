// src/App.jsx
import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Routes>
      {/* Главная страница */}
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
    </Routes>
  );
}

export default App;
