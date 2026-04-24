import mocData from "@data/moc_Data.json";
import { Link } from "react-router-dom";

const formatTitle = (value = "") =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const dynamicServices = Array.isArray(mocData?.categories)
  ? mocData.categories
      .filter((category) => category.general_category === "service-items")
      .map((category) => ({
        category_name: formatTitle(category.category_name),
        category_image: category.category_image,
        category_description: category.category_description,
        slug: category.slug || category.category_name?.toLowerCase().replace(/\s+/g, "-"),
      }))
      .filter((category) => category.category_name && category.category_image)
  : [];

const serviceData = dynamicServices;

const Services = () => {
  return (
    <section className="services-section">
      <div className="section-header">
        <div className="section-header-left">
          <span className="tag-label">Our Services</span>
          <h2 className="section-heading">We Deal In</h2>
        </div>

        <p className="section-header-right">
          From precision-engineered spare parts to hand-forged artifacts - every
          product carries the quality India is known for.
        </p>
      </div>

      <div className="services-grid">
        {serviceData.length === 0 ? (
          <p>No services available right now.</p>
        ) : (
          serviceData.map((service) => {
            const isGlobalShipping =
              service.category_name?.trim().toLowerCase() === "global shipping";

            return (
              <Link
                key={service.slug || service.category_name}
                to={`/services/${service.slug || ""}`}
                className={`service-card${isGlobalShipping ? " global-shipping-card" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={service.category_image}
                  alt={service.category_name}
                  className="service-card-img"
                />
                <div className="service-card-body">
                  <h3>{service.category_name}</h3>
                  <p>{service.category_description}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Services;