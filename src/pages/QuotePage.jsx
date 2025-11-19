// src/pages/QuotePage.jsx
import QuoteSection from "../components/QuoteSection";
import SEO from "../components/SEO";

export default function QuotePage() {
  return (
    <>
      <SEO
        title="Free Car Shipping Quote"
        description="Request a free, no-obligation quote for vehicle shipping across the USA. Fast response, insured delivery, and professional support from Eco Logistic."
        canonical="https://your-domain.com/quote" // поменяешь на свой домен
      />
      <QuoteSection />
    </>
  );
}
