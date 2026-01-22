// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./layouts/MainLayout";
import MetaSEO from "./components/MetaSEO";

// Home sections
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import About from "./components/About";
import SEOSection from "./components/SEOSection";
import Contact from "./components/Contact";

// Pages
import QuotePage from "./pages/QuotePage";
import ReviewsPage from "./pages/ReviewsPage";
import EarnWithUsPage from "./pages/EarnWithUsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFoundPage from "./pages/NotFoundPage";

// Service pages
import EnclosedTransportPage from "./pages/services/EnclosedTransportPage";
import CarShippingPage from "./pages/services/CarShippingPage";
import MotorcycleShippingPage from "./pages/services/MotorcycleShippingPage";
import InoperableVehicleTransportPage from "./pages/services/InoperableVehicleTransportPage";
import BoatTransportPage from "./pages/services/BoatTransportPage";
import RvMotorhomeSemiTruckTransportPage from "./pages/services/RvMotorhomeSemiTruckTransportPage";

function App() {
  const location = useLocation();

  // SEO section routes → scroll to section
  const sectionByPath = {
    "/": "home",
    "/services": "services",
    "/how-it-works": "how-it-works",
    "/about": "about",
    "/contact": "contact",
    "/testimonials": "reviews",
  };

  // Scroll to top for real pages
  useEffect(() => {
    const isSectionRoute = !!sectionByPath[location.pathname];
    if (isSectionRoute) return;
    if (location.hash) return;

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  // Scroll to section (SEO routes)
  useEffect(() => {
    const hashId = location.hash?.replace("#", "");
    const pathId = sectionByPath[location.pathname];
    const targetId = hashId || pathId;

    if (!targetId) return;

    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => clearTimeout(t);
  }, [location]);

  // HOME (single-page sections)
  const Home = (
    <MainLayout>
      <MetaSEO
        title="Car Shipping Services | EcoHub Logistics"
        description="Insured door-to-door car shipping across the USA. Open & enclosed auto transport for individuals and businesses."
        canonical="https://www.ecohublogistics.com/"
        robots="index,follow"
      />

      <Hero />
      <Reviews />
      <Services />
      <HowItWorks />
      <About />
      <SEOSection />
      <Contact />
    </MainLayout>
  );

  return (
    <Routes>
      {/* HOME + SEO SECTION ROUTES */}
      <Route path="/" element={Home} />
      <Route path="/services" element={Home} />
      <Route path="/how-it-works" element={Home} />
      <Route path="/about" element={Home} />
      <Route path="/contact" element={Home} />
      <Route path="/testimonials" element={Home} />

      {/* REAL PAGES */}
      <Route
        path="/quote"
        element={
          <MainLayout>
            <QuotePage />
          </MainLayout>
        }
      />

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
            <EarnWithUsPage />
          </MainLayout>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />

      <Route
        path="/terms-and-conditions"
        element={
          <MainLayout>
            <TermsAndConditions />
          </MainLayout>
        }
      />

      {/* SERVICE PAGES */}
      <Route
        path="/services/enclosed-transport"
        element={
          <MainLayout>
            <EnclosedTransportPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/car-shipping"
        element={
          <MainLayout>
            <CarShippingPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/motorcycle-shipping"
        element={
          <MainLayout>
            <MotorcycleShippingPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/inoperable-vehicle-transport"
        element={
          <MainLayout>
            <InoperableVehicleTransportPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/boat-transport"
        element={
          <MainLayout>
            <BoatTransportPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/rv-motorhome-semitruck-transport"
        element={
          <MainLayout>
            <RvMotorhomeSemiTruckTransportPage />
          </MainLayout>
        }
      />

      {/* BACKWARD COMPATIBILITY */}
      <Route path="/earn" element={<Navigate to="/earn-with-us" replace />} />
      <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
      <Route path="/about-us" element={<Navigate to="/about" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/index" element={<Navigate to="/" replace />} />

      {/* 404 — LAST */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
