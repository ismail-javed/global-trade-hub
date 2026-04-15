    import { useState } from "react";
    import { Link } from "react-router-dom";

    const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
        <div className="header-content">

            {/* Logo */}
            <Link to="/" className="logo">
            <img
                src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758022/logo_ycsn4j.jpg"
                alt="JNSSI Logo"
            />
            <div className="logo-text">
                <span className="logo-name">JNSSI Overseas</span>
                <span className="logo-tagline">Global Export Partners</span>
            </div>
            </Link>

            {/* Navigation */}
            <nav className={`nav ${isMenuOpen ? "open" : ""}`} id="main-nav">

            <Link to="/" className="nav-home" onClick={closeMenu}>
                Home
            </Link>

            <div className="nav-item">
                <Link to="/about" onClick={closeMenu}>About</Link>
            </div>

            <div className="nav-item">
                <Link to="/services" onClick={closeMenu}>Services</Link>
            </div>

            {/* <div className="nav-item">
                <Link to="/blog">Blog</Link> create route later */}
            {/* </div> */}

            <div className="nav-item">
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>

            </nav>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
                className="menu-icon"
                onClick={handleToggleMenu}
                onMouseEnter={() => setIsMenuOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleMenu();
                }
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </div>
            <button className="login-btn">Ph no: +91 9084399069</button>
            </div>

        </div>
        </header>
    );
    };

    export default Header;