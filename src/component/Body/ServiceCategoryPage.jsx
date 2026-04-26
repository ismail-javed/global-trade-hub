import { Link, useParams } from "react-router-dom";
import mocData from "@data/moc_Data.json";

const normalize = (value = "") =>
  value.toString().trim().toLowerCase().replace(/[-_]+/g, " ");

const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const categoryToSlug = (category = {}) =>
  toSlug(category.slug || category.category_name || "");

const toTitleCase = (value = "") =>
  value
    .toString()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

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
              subcategory: sub?.name ? toTitleCase(sub.name) : null,
            }))
          : []
      )
    : [];

  return [...subcategoryItems, ...directItems].filter(
    (item) => item && (item.name || (Array.isArray(item.images) && item.images[0]))
  );
};

export default function ServiceCategoryPage() {
  const { slug = "" } = useParams();

  const categories = Array.isArray(mocData?.categories)
    ? mocData.categories.filter((category) => category.general_category === "service-items")
    : [];

  const matchedCategory = categories.find((category) => {
    const slugValue = normalize(categoryToSlug(category) || "");
    const nameValue = normalize(category.category_name || "");
    const target = normalize(slug);
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
  const categoryTitle = toTitleCase(matchedCategory.category_name);

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
              const image =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : matchedCategory.category_image;
              const itemName = product.name?.trim() ? product.name : `Product ${index + 1}`;

              return (
                <article className="service-product-card" key={`${product.id || itemName}-${index}`}>
                  <img src={image} alt={itemName} className="service-product-image" />
                  <div className="service-product-body">
                    <h3>{itemName}</h3>
                    {product.subcategory ? <p className="service-subcategory">{product.subcategory}</p> : null}
                    <p>{product.description?.trim() || "More details available on request."}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
