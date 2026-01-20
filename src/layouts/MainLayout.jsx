import Header from "../components/Header";
import Footer from "../components/Footer";
import FeedbackPopup from "../components/FeedbackPopup"; // ✅
import "./layout.css";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="layout-main">{children}</main>

      <FeedbackPopup /> {/* ✅ */}
      <Footer />
    </>
  );
}
