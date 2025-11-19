// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      {/* Основной контент страницы */}
      <main>
        <div className="container">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
