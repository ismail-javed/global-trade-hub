// import '../../../index.css';
    
    const Flags = () => {
    return (
        <div className="flags-strip">
        <div className="flags-strip-inner">
            <span className="flags-label">Delivering to 10+ Countries</span>

            <div className="flags-divider"></div>

            <div className="flags-track-wrap">
            <div className="flags-track">
                
                {/* Flags */}
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757987/USA_cixmvc.png" alt="USA" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757988/uk_zfovql.png" alt="UK" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1776264005/UAE_i7acta.png" alt="UAE" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757986/canada_usiclm.png" alt="Canada" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757986/INDIA_n2dxda.png" alt="India" />
                </div>

                {/* duplicate for seamless loop */}
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757987/USA_cixmvc.png" alt="USA" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757988/uk_zfovql.png" alt="UK" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1776264005/UAE_i7acta.png" alt="UAE" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757986/canada_usiclm.png" alt="Canada" />
                </div>
                <div className="flag-item">
                <img src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775757986/INDIA_n2dxda.png" alt="India" />
                </div>

            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Flags;