import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import About from "./components/About";
import Contact from "./components/Contact";
import ReviewsPage from "./pages/ReviewsPage";
import QuotePage from "./pages/QuotePage";
import Footer from "./components/Footer";

function App() {
  return (
    <Routes>
      {/* === Страница формы === */}
      <Route path="/quote" element={<QuotePage />} />

      {/* === Страница отзывов === */}
      <Route path="/reviews" element={<ReviewsPage />} />

      {/* === Главная страница === */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Hero />
            <HowItWorks />
            <Services />
            <About />
            <Reviews />
            <Contact />
            <Footer/>
          </>
        }
      />
    </Routes>
  );
}

export default App;