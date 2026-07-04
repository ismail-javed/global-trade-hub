import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSiteData } from "../../data/siteDataContext.js";
import { formatTitle, normalizeText, toSlug } from "../../utils/strings.js";

const categoryToSlug = (category = {}) =>
  toSlug(category.slug || category.category_name || "");

const collectItems = (category) => {
  if (!category) return [];

  const directItems = Array.isArray(category.items)
    ? category.items.map((item) => ({
        ...item,
        subcategory: null,
      }))
    : [];

  const subcategoryItems = Array.isArray(category.subcategories)
    ? category.subcategories.flatMap((sub) =>
        Array.isArray(sub?.items)
          ? sub.items.map((item) => ({
              ...item,
              subcategory: sub?.name ? formatTitle(sub.name) : null,
            }))
          : []
      )
    : [];

  return [...subcategoryItems, ...directItems].filter(
    (item) =>
      item &&
      !item.hidden &&
      (item.name || (Array.isArray(item.images) && item.images[0]))
  );
};

const getProductImages = (product, fallbackImage) => {
  const images = Array.isArray(product?.images)
    ? product.images.filter((src) => typeof src === "string" && src.trim())
    : [];
  if (images.length > 0) return images;
  return fallbackImage ? [fallbackImage] : [];
};

const ProductImageCarousel = ({ images, alt }) => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        const nextIndex = Math.round(track.scrollLeft / width);
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth || 0;
    track.scrollTo({ left: width * index, behavior: "smooth" });
  };

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const intervalId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % safeImages.length;
      scrollToIndex(nextIndex);
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeIndex, safeImages.length]);

  if (safeImages.length <= 1) {
    return (
      <img
        src={safeImages[0] || ""}
        alt={alt}
        className="service-product-image"
        loading="lazy"
      />
    );
  }

  return (
    <div className="service-product-carousel" aria-label={`${alt} images`}>
      <div className="service-product-carousel-track" ref={trackRef}>
        {safeImages.map((src, idx) => (
          <div className="service-product-carousel-slide" key={`${src}-${idx}`}>
            <img
              src={src}
              alt={alt}
              className="service-product-image"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="service-product-carousel-arrow service-product-carousel-prev"
        onClick={() => scrollToIndex((activeIndex - 1 + safeImages.length) % safeImages.length)}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        type="button"
        className="service-product-carousel-arrow service-product-carousel-next"
        onClick={() => scrollToIndex((activeIndex + 1) % safeImages.length)}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="service-product-carousel-dots" aria-label="Choose image">
        {safeImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`service-product-carousel-dot${
              idx === activeIndex ? " is-active" : ""
            }`}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to image ${idx + 1}`}
            aria-current={idx === activeIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default function ServiceCategoryPage() {
  const { slug = "" } = useParams();
  const { data } = useSiteData();

  const categories = Array.isArray(data?.categories)
    ? data.categories.filter((category) => category.general_category === "service-items")
    : [];

  const matchedCategory = categories.find((category) => {
    const slugValue = normalizeText(categoryToSlug(category) || "");
    const nameValue = normalizeText(category.category_name || "");
    const target = normalizeText(slug);
    return slugValue === target || nameValue === target;
  });

  if (!matchedCategory) {
    return (
      <main className="service-detail-page">
        <section className="service-detail-header">
          <p className="service-detail-kicker">Services</p>
          <h1>Category not found</h1>
          <p className="service-detail-desc">
            The service category you are looking for is not available.
          </p>
          <Link to="/services" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
            Back to Services
          </Link>
        </section>
      </main>
    );
  }

  const products = collectItems(matchedCategory);
  const categoryTitle = formatTitle(matchedCategory.category_name);

  return (
    <main className="service-detail-page">
      <section className="service-detail-header">
        <p className="service-detail-kicker">Service Category</p>
        <h1>{categoryTitle}</h1>
        <p className="service-detail-desc">
          {matchedCategory.category_description || "Explore product items available in this category."}
        </p>
      </section>

      <section className="service-products-wrap">
        {products.length === 0 ? (
          <p className="service-empty-state">
            Products will be added soon for this category.
          </p>
        ) : (
          <div className="service-products-grid">
            {products.map((product, index) => {
              const itemName = product.name?.trim() ? product.name : `Product ${index + 1}`;
              const images = getProductImages(product, matchedCategory.category_image);
              const cardSlug = toSlug(product.slug || product.name || itemName);

              return (
                <Link
                  to={`/products/${cardSlug}`}
                  className="service-product-card"
                  key={`${product.id || itemName}-${index}`}
                  style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                >
                  <ProductImageCarousel images={images} alt={itemName} />
                  <div className="service-product-body">
                    <h3>{itemName}</h3>
                    {product.subcategory ? <p className="service-subcategory">{product.subcategory}</p> : null}
                    <p>{product.description?.trim() || "More details available on request."}</p>
                    <span
                      className="service-card-arrow"
                      style={{ marginTop: 12, display: "inline-flex", cursor: "pointer" }}
                    >
                      View Product
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
