
import '../../../index.css';


function Hero() {
    return (
        <>
        {/* ===== HERO ===== */}
        <section className="hero">
            <div className="hero-left">
            <div className="hero-eyebrow">
                <span className="line"></span>
                <span>Global Trade Redefined</span>
            </div>

            <h1 className="hero-title">
                Powering Industries &<br />
                <em>Preserving Heritage</em><br />
                Worldwide
            </h1>

            <p className="hero-desc">
                At JNSSI Overseas, we specialize in exporting high-quality spare parts and 
                authentic handcrafted artifacts to the United States and beyond — combining 
                engineering precision with timeless Indian craftsmanship.
            </p>

            <div className="hero-btns">
                <a href="/services" className="btn-primary">
                Explore Products →
                </a>
                <a href="/contact" className="btn-outline">
                Get in Touch
                </a>
            </div>

            <div className="hero-stats">
                <div className="hero-stat">
                <span className="num">10+</span>
                <span className="lbl">Countries Served</span>
                </div>

                <div className="hero-stat">
                <span className="num">12+</span>
                <span className="lbl">Product Categories</span>
                </div>

                <div className="hero-stat">
                <span className="num">100%</span>
                <span className="lbl">Quality Assured</span>
                </div>
            </div>
            </div>

            <div className="hero-right">
            <div className="hero-accent-dot"></div>

            <div className="hero-img-wrap">
                <img
                src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/ship_agrzty.png"
                alt="Global Shipping — JNSSI Overseas"
                />
            </div>

            <div className="hero-badge">
                <div className="badge-num">2025</div>
                <div className="badge-lbl">Est. Year</div>
            </div>
            </div>
        </section>

        {/* <Footer/> */}
        </>
    );
}

export default Hero;