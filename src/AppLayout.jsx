import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer/Footer.jsx";
import Seo from "./component/Seo.jsx";
import ContactSection from "./component/Contact/ContactSection.jsx";
import WhyUs from "./component/Body/indexBody/whyUs.jsx";

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="app-layout">
      <Seo />
      <Header />
      <Outlet />
      <ContactSection datalistId="country-code-list-global" />
      <WhyUs />
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
