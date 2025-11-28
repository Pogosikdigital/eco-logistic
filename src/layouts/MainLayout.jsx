// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./layout.css"; // добавим стили для layout

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      <main className="layout-main">
        {children}
      </main>

      <Footer />
    </>
  );
}
