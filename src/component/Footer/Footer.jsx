    const Footer = () => {
    return (
        <>
        {/* ===== FOOTER ===== */}
        <footer className="footer">
            <div className="footer-inner">

            <div className="footer-brand">
                <div className="logo-text">
                <span className="logo-name">JNSSI Overseas</span>
                <span className="logo-tagline">Global Export Partners</span>
                </div>

                <p>
                Exporting quality products and India's rich heritage to the world since 2025.
                </p>

                <div className="footer-social">
                <a href="https://www.linkedin.com/in/jnssi-overseas-218740397" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-linkedin-in"></i>
</a>
                <a href="https://x.com/JNSSI_Overseas" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/jnssi_overseas/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://wa.me/919084399069" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
                </a>
                </div>
            </div>

            <div className="footer-col">
                <h4>Company</h4>
                <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/">Home</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h4>Services</h4>
                <ul>
                <li><a href="/services">Spare Parts</a></li>
                <li><a href="/services">Handcrafted Artifacts</a></li>
                <li><a href="/services">Agriculture</a></li>
                <li><a href="/services">Global Shipping</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h4>Contact</h4>

                <div className="contact-line">
                <span>📧 jnssioverseas@gmail.com</span>
                </div>

                <div className="contact-line">
                <span>📞 +91 90843 99069</span>
                </div>

                <div className="contact-line">
                    <a href="https://maps.app.goo.gl/odfmaQRwPLHAKvX2A" target="_blank" rel="noopener noreferrer">
                <span>📍   Meerut, Uttar pradesh, India</span>

                </a>
                </div>

            </div>

            </div>

            <div className="footer-bottom">
            <span>© 2026 JNSSI Overseas. All Rights Reserved.</span>

            <div style={{ display: "flex", gap: "1.5rem" }}>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
            </div>

        </footer>
        </>
    );
    };

    export default Footer;