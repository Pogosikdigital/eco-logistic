// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./layout.css";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Site header */}
      <Header />

      {/* 
        IMPORTANT:
        We use <div> instead of <main> here to avoid:
        <main> inside <main> (SEO / HTML5 violation)

        Each page (Home, Service pages, Quote page)
        is responsible for defining its own <main> tag.
      */}
      <div className="layout-main">
        {children}
      </div>

      {/* Site footer */}
      <Footer />
    </>
  );
}
