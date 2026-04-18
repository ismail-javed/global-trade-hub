import { Outlet } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer/Footer.jsx";
import Seo from "./component/Seo.jsx";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Seo />
      <Header />
      <Outlet />
      <Footer />
      <a
        href="https://wa.me/919084399069"
        className="whatsapp-sticky"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
