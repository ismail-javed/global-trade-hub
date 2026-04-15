// import '../../../index.css';



const Services = () => {
    return (
        <section className="services-section">
        <div className="section-header">
            <div className="section-header-left">
            <span className="tag-label">Our Services</span>
            <h2 className="section-heading">What We Provide</h2>
            </div>

            <p className="section-header-right">
            From precision-engineered spare parts to hand-forged artifacts —
            every product carries the quality India is known for.
            </p>
        </div>

        <div className="services-grid">

            <a href="#spare-parts" className="service-card" style={{ textDecoration: "none" }}>
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758012/SpareParts_wkdta5.png" alt="Spare Parts" className="service-card-img" />
            <div className="service-card-body">
                <h3>Spare Parts Export</h3>
                <p>High-quality spare parts for various industries, ensuring durability, precision, and global standards.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </a>

            <a href="https://youtube.com" className="service-card" style={{ textDecoration: "none" }}>
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758010/handicraft2_hbippu.png" alt="Handcrafted Artifacts" className="service-card-img" />
            <div className="service-card-body">
                <h3>Handcrafted Artifacts</h3>
                <p>Authentic handcrafted artifacts reflecting India's rich heritage, perfect for collectors and global markets.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </a>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758010/agriculture_tvh4rc.png" alt="Agricultural Products" className="service-card-img" />
            <div className="service-card-body">
                <h3>Agricultural Products</h3>
                <p>Premium spices, grains, and organic produce sourced from India's most fertile farming regions.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758010/chemical_wzbwgz.png" alt="Chemical Products" className="service-card-img" />
            <div className="service-card-body">
                <h3>Chemical Products</h3>
                <p>Industrial chemicals, pharmaceuticals, and specialty chemicals adhering to global safety standards.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758012/textile_wc0dod.png" alt="Textiles" className="service-card-img" />
            <div className="service-card-body">
                <h3>Textiles & Fabrics</h3>
                <p>Traditional Indian textiles and modern fabrics for global fashion and home décor markets.</p>
                    {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758009/electronics_fpone5.png" alt="Electronics" className="service-card-img" />
            <div className="service-card-body">
                <h3>Electronics & Gadgets</h3>
                <p>Consumer electronics, smart devices, and innovative tech products meeting global quality standards.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758009/automotive_vnpxzh.png" alt="Automotive" className="service-card-img" />
            <div className="service-card-body">
                <h3>Automotive Components</h3>
                <p>Engine parts, accessories, and aftermarket products catering to global automotive markets.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758010/chemical_wzbwgz.png"  alt="Medical Supplies" className="service-card-img" />
            <div className="service-card-body">
                <h3>Medical Supplies</h3>
                <p>PPE, medical devices, and healthcare products adhering to global health and safety standards.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758010/food_rigycr.png" alt="Food & Beverages" className="service-card-img" />
            <div className="service-card-body">
                <h3>Food & Beverages</h3>
                <p>Fresh produce, processed foods, and beverages catering to a diverse range of global markets.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/home-decore_osh38j.png" alt="Home Decor" className="service-card-img" />
            <div className="service-card-body">
                <h3>Furniture & Home Decor</h3>
                <p>Traditional Indian designs and contemporary pieces for global home and lifestyle markets.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/jewellery_uzwijc.png" alt="Jewellery" className="service-card-img" />
            <div className="service-card-body">
                <h3>Jewellery & Accessories</h3>
                <p>Exquisite traditional and contemporary jewellery pieces crafted for global markets.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

            <div className="service-card featured">
            <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/Shipping_bx7rlo.png" alt="Global Shipping" className="service-card-img" />
            <div className="service-card-body">
                <h3>Global Shipping</h3>
                <p>Reliable worldwide logistics with secure packaging and timely delivery across 10+ countries.</p>
                {/* <span className="service-card-arrow">Learn more →</span> */}
            </div>
            </div>

        </div>
        </section>
    );
    };

    export default Services;