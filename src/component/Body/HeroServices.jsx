import Services from "./indexBody/services-cards";

const HeroServices = () => {
    return (
        <>
        {/* ===== SERVICES HERO ===== */}
        <section className="hero">
            <div className="hero-left">
            <div className="hero-eyebrow">
                <span className="line"></span>
                <span>Our Services</span>
            </div>

            <h1 className="hero-title">What We Provide</h1>

            <p className="hero-desc">
                From precision-engineered spare parts to hand-forged artifacts,
                JNSSI Overseas delivers quality products and services to clients worldwide.
            </p>

            <div className="hero-btns">
                <a href="/contact" className="btn-primary">
                Get in Touch →
                </a>
            </div>
            </div>

            <div className="hero-right">
            <div className="hero-accent-dot"></div>

            <div className="hero-img-wrap">
                <img
                src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/ship_agrzty.png"
                alt="Services JNSSI Overseas"
                />
            </div>
            </div>
        </section>

        {/* ===== SERVICES GRID ===== */}
        {/* <section className="services-section">
            <div className="section-header">
            <div className="section-header-left">
                <span className="tag-label">Our Services</span>
                <h2 className="section-heading">Explore Our Offerings</h2>
            </div>

            <p className="section-header-right">
                Every product carries the quality India is known for. Explore our diverse range of export services below.
            </p>
            </div>

            <div className="services-grid">

            <div className="service-card">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/ship_agrzty.png" alt="Spare Parts" />
                <h3>Spare Parts Export</h3>
                <p>High-quality spare parts for various industries.</p>
            </div>

            <div className="service-card">
                <img src="/Assets/service-items/Handicraft2.png" alt="Handicraft" />
                <h3>Handcrafted Artifacts</h3>
                <p>Authentic handcrafted products for global markets.</p>
            </div>

            <div className="service-card">
                <img src="/Assets/service-items/Agriculture.png" alt="Agriculture" />
                <h3>Agricultural Products</h3>
                <p>Premium spices, grains, and organic produce.</p>
            </div>

            <div className="service-card">
                <img src="/Assets/service-items/Shipping.png" alt="Shipping" />
                <h3>Global Shipping</h3>
                <p>Reliable logistics across 10+ countries.</p>
            </div>

            </div>
        </section> */}

        <Services />
        </>
    );
    };

    export default HeroServices;