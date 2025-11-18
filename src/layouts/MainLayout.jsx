// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      {/* Глобальный контейнер — центрует ВСЕ секции */}
      <div className="container">
        {children}
      </div>

      <Footer />
    </>
  );
}
