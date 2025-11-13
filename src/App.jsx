// src/App.jsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import HowItWorks from "./components/HowItWorks";
import Services from './components/Services';
function App() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <Services/>
      <QuoteSection />
    </>
  );
}

export default App;