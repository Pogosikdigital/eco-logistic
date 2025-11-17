// src/App.jsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import About from "./components/About";
import Contact from "./components/Contact"; // 🔹 ВАЖНО: импорт Contact

function App() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <Services />
      <QuoteSection />
      <Reviews />
      <About />
      <Contact /> 
    </>
  );
}

export default App;