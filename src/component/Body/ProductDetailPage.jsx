import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSiteData } from "../../data/siteDataContext.js";
import Seo from "../Seo.jsx";

const buildSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const collectServiceItems = (categories) => {
  if (!Array.isArray(categories)) return [];
  return categories
    .filter((category) => category.general_category === "service-items")
    .flatMap((category) => {
      const directItems = Array.isArray(category.items) ? category.items : [];
      const subItems = Array.isArray(category.subcategories)
        ? category.subcategories.flatMap((sub) => (Array.isArray(sub.items) ? sub.items : []))
        : [];
      return [...directItems, ...subItems].map((item) => ({ item, category }));
    });
};

function findProductBySlug(slug, categories) {
  if (!slug || !Array.isArray(categories)) return null;
  const serviceItems = collectServiceItems(categories);
  return serviceItems.find((entry) => buildSlug(entry.item.slug || entry.item.name) === slug) || null;
}

function getProductImages(item, fallbackImage) {
  const images = Array.isArray(item?.images) ? item.images.filter(Boolean) : [];
  return images.length ? images : fallbackImage ? [fallbackImage] : [];
}

function safeJoin(value, delimiter = ", ") {
  if (Array.isArray(value) && value.length) {
    return value.join(delimiter);
  }
  return "N/A";
}

function formatDetailValue(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function renderTextBlock(block) {
  if (!block) return null;
  if (typeof block === "string") return <p style={{ marginTop: 8, color: "var(--text-mid)" }}>{block}</p>;
  if (Array.isArray(block)) {
    return (
      <ul style={{ marginTop: 8, paddingLeft: 18, color: "var(--text-mid)" }}>
        {block.map((item) => (
          <li key={item} style={{ marginBottom: 6 }}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

function getDetailEntries(product) {
  const entries = [];
  const itemDetails = Array.isArray(product?.details) ? product.details : [];

  const fallbackEntries = [];
  const genericName = product?.generic || product?.genericName || null;
  const casNumber = product?.cas || product?.casNumber || null;
  const purityInfo = product?.purity || product?.purityInfo || null;
  const availability = product?.availability || null;

  if (genericName) {
    fallbackEntries.push({ label: "Generic Name", value: genericName, highlight: true });
  }
  if (casNumber) {
    fallbackEntries.push({ label: "CAS Number", value: casNumber, highlight: true });
  }
  if (purityInfo) {
    fallbackEntries.push({ label: "Purity", value: purityInfo, highlight: true });
  }
  if (availability) {
    fallbackEntries.push({ label: "Availability", value: availability, highlight: true });
  }

  const normalizedDetails = itemDetails.map((detail) => ({
    label: detail?.label || detail?.title || "Detail",
    value: detail?.value ?? detail?.content ?? detail?.text ?? "",
    type: detail?.type || "text",
    highlight: Boolean(detail?.highlight || detail?.showInSummary),
  }));

  return [...fallbackEntries, ...normalizedDetails].filter((detail) => detail.label);
}

function normalizeRelatedItems(productSlug, categories) {
  const allItems = collectServiceItems(categories);
  return allItems
    .filter(({ item }) => buildSlug(item.slug || item.name) !== productSlug)
    .slice(0, 3)
    .map(({ item }) => ({
      slug: buildSlug(item.slug || item.name),
      name: item.name,
      images: getProductImages(item),
      description: item.description,
    }));
}

function RelatedProducts({ ids, onView, categories }) {
  const allItems = collectServiceItems(categories);
  const items = ids && ids.length
    ? allItems.filter(({ item }) => ids.includes(buildSlug(item.slug || item.name))).map(({ item }) => item)
    : allItems.slice(0, 3).map(({ item }) => item);

  if (!items.length) return null;

  return (
    <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
      {items.map((it) => (
        <div
          key={buildSlug(it.slug || it.name)}
          className="service-card"
          role="link"
          tabIndex={0}
          onClick={() => onView(buildSlug(it.slug || it.name))}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onView(buildSlug(it.slug || it.name));
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            className="service-card-img service-card-img--contain"
            src={getProductImages(it)[0]}
            alt={it.name}
          />
          <div className="service-card-body">
            <h3>{it.name}</h3>
            <p style={{ minHeight: 40 }}>{it.description}</p>
            <span className="service-card-arrow" style={{ cursor: "pointer" }}>
              View Product
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({ name: "", company: "", country: "", email: "", phone: "", qty: "", message: "" });
  const [productDetailsMap, setProductDetailsMap] = useState(null);

  const { data } = useSiteData();
  const slug = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  }, [pathname]);

  useEffect(() => {
    fetch("/api/product-details.json")
      .then((res) => res.json())
      .then((details) => setProductDetailsMap(details))
      .catch(() => setProductDetailsMap({}));
  }, []);

  const productEntry = useMemo(() => findProductBySlug(slug, data?.categories), [slug, data?.categories]);
  const baseProduct = productEntry?.item || null;
  const productCategory = productEntry?.category || null;

  const product = useMemo(() => {
    if (!baseProduct) return null;
    const apiDetails = productDetailsMap?.[slug] || {};
    return { ...baseProduct, ...apiDetails };
  }, [baseProduct, productDetailsMap, slug]);

  const applications = Array.isArray(product?.applications) ? product.applications : [];
  const benefits = Array.isArray(product?.benefits) ? product.benefits : [];
  const industries = Array.isArray(product?.industries) ? product.industries : [];
  const packagingOptions = Array.isArray(product?.packagingOptions) ? product.packagingOptions : [];
  const shipping = Array.isArray(product?.shipping) ? product.shipping : [];
  const exportDocs = Array.isArray(product?.exportDocs) ? product.exportDocs : [];
  const specs = product?.specs || {};
  const certifications = product?.certifications || {};
  const customSections = Array.isArray(product?.sections) ? product.sections : [];
  const productCategoryLabel = productCategory?.category_name || product?.category || "Product";
  const availability = product?.availability || "Check availability";
  const detailEntries = useMemo(() => getDetailEntries(product), [product]);
  const highlightDetails = detailEntries.filter((item) => item.highlight).slice(0, 3);
  const detailsLoading = productDetailsMap === null;

  useEffect(() => {
    if (!product && slug && !detailsLoading) {
      // if slug not found, navigate to NotFound or stay
      // keep simple: do nothing (Seo will handle)
    }
  }, [product, slug, detailsLoading]);

  function handleInquiryChange(e) {
    const { name, value } = e.target;
    setInquiry((s) => ({ ...s, [name]: value }));
  }

  function submitInquiry(e) {
    e.preventDefault();
    // Stub: replace with actual submission endpoint
    alert("Inquiry submitted. We'll contact you shortly.");
    setInquiry({ name: "", company: "", country: "", email: "", phone: "", qty: "", message: "" });
  }

  if (!product || detailsLoading) {
    return (
      <main style={{ padding: "4rem 2rem" }}>
        <Seo />
        <div className="services-section">
          <div className="section-heading">
            {!product && !detailsLoading ? "Product not found" : "Loading product..."}
          </div>
          {!product && !detailsLoading ? (
            <p style={{ marginTop: "1rem" }}>The product you're looking for could not be found.</p>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "2.5rem 2rem 6rem" }}>
      <Helmet>
        <title>{product.name} | JNSSI Overseas</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <section className="hero" style={{ paddingTop: "2rem", gridTemplateColumns: "1fr 1fr" }}>
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="tag-label">{productCategoryLabel}</span>
          </div>
          <h1 className="hero-title">{product.name}</h1>
          <p className="hero-desc">{product.description}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button className="btn-primary">Request Quote</button>
            {/* <button className="btn-outline">Download COA</button>
            <button className="btn-outline">Download Specification</button> */}
          </div>
          <div className="hero-stats" style={{ marginTop: 20 }}>
            {highlightDetails.length ? (
              highlightDetails.map((detail) => (
                <div className="hero-stat" key={detail.label}>
                  <div className="num">{detail.label}</div>
                  <div className="lbl">{formatDetailValue(detail.value)}</div>
                </div>
              ))
            ) : (
              <>
                <div className="hero-stat">
                  <div className="num">Generic</div>
                  <div className="lbl">{product.generic || "N/A"}</div>
                </div>
                <div className="hero-stat">
                  <div className="num">CAS</div>
                  <div className="lbl">{product.cas || "N/A"}</div>
                </div>
                <div className="hero-stat">
                  <div className="num">Purity</div>
                  <div className="lbl">{product.purity || "N/A"}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <img src={product.images?.[0]} alt={product.name} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <div className="hero-badge">
              <div className="badge-num">{availability}</div>
              <div className="badge-lbl">Availability</div>
            </div>
            {product.exportReady ? (
              <div className="hero-badge">
                <div className="badge-num">Export Ready</div>
                <div className="badge-lbl">Certificate Available</div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-header">
          <div>
            <div className="tag-label">Overview</div>
            <h2 className="section-heading">Product Overview</h2>
            <p style={{ marginTop: 12, color: "var(--text-mid)" }}>{product.description}</p>
            <div style={{ marginTop: 12 }}>
              <strong>Applications:</strong> {safeJoin(applications)}
            </div>
            <div style={{ marginTop: 6 }}>
              <strong>Therapeutic Category:</strong> {product.therapeuticCategory || "N/A"}
            </div>
            <div style={{ marginTop: 6 }}>
              <strong>Benefits:</strong> {safeJoin(benefits)}
            </div>
            <div style={{ marginTop: 6 }}>
              <strong>Industries Served:</strong> {safeJoin(industries)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="tag-label">Key Product Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 12 }}>
            {detailEntries.map((detail) => (
              <div key={`${detail.label}-${detail.value}`} className="service-card">
                <div className="service-card-body">
                  <h3>{detail.label}</h3>
                  <p>{formatDetailValue(detail.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {customSections.map((section) => (
          <div key={section?.title || section?.heading || "custom-section"} style={{ marginTop: 28 }}>
            <div className="tag-label">{section?.title || "Additional Details"}</div>
            <div style={{ marginTop: 12 }}>
              {section?.description ? <p style={{ color: "var(--text-mid)", lineHeight: 1.7 }}>{section.description}</p> : null}
              {section?.items ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 12 }}>
                  {section.items.map((item) => (
                    <div key={item?.label || item?.title || JSON.stringify(item)} className="service-card">
                      <div className="service-card-body">
                        <h3>{item?.label || item?.title || "Detail"}</h3>
                        <p>{formatDetailValue(item?.value ?? item?.content ?? item?.text)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {section?.content ? renderTextBlock(section.content) : null}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 28 }}>
          <div className="tag-label">Technical Specifications</div>
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "8px" }}>
              <tbody>
                {Object.entries(specs).map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                      <strong>{k}</strong>
                    </td>
                    <td style={{ padding: 12, border: "1px solid var(--border)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="tag-label">Quality & Certifications</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
            <div className="service-card">
              <div className="service-card-body">
                <h3>WHO-GMP</h3>
                <p>{certifications.whoGmp ? "Available" : "-"}</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-body">
                <h3>ISO</h3>
                <p>{certifications.iso || "-"}</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-body">
                <h3>COA</h3>
                <p>{certifications.coa ? "Available" : "-"}</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-body">
                <h3>MSDS</h3>
                <p>{certifications.msds ? "Available" : "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="tag-label">Packaging & Export</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {packagingOptions.map((p) => (
              <div key={p} className="service-card" style={{ maxWidth: 220 }}>
                <div className="service-card-body">
                  <h3>{p}</h3>
                  <p>Shipping: {safeJoin(shipping)}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <strong>Export Documents:</strong> {safeJoin(exportDocs)}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="tag-label">Related Products</div>
          <RelatedProducts
            ids={product.related || []}
            categories={data?.categories}
            onView={(s) => navigate(`/products/${s}`)}
          />
        </div>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
          <div>
            <div className="tag-label">FAQ</div>
            <div style={{ background: "var(--white)", padding: 14, borderRadius: 12 }}>
              <details>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>MOQ</summary>
                <p style={{ marginTop: 8 }}>{specs.MOQ || "Contact us"}</p>
              </details>
              <details style={{ marginTop: 8 }}>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>Lead Time</summary>
                <p style={{ marginTop: 8 }}>{specs["Lead Time"] || "Contact us"}</p>
              </details>
              <details style={{ marginTop: 8 }}>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>Shipping</summary>
                <p style={{ marginTop: 8 }}>{safeJoin(shipping)}</p>
              </details>
              <details style={{ marginTop: 8 }}>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>Documentation</summary>
                <p style={{ marginTop: 8 }}>{safeJoin(exportDocs)}</p>
              </details>
              <details style={{ marginTop: 8 }}>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>Payment Terms</summary>
                <p style={{ marginTop: 8 }}>T/T, L/C negotiable — contact sales for details.</p>
              </details>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
