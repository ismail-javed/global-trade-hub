import { useMemo, useState } from "react";
import { useSiteData } from "../../data/siteDataContext.js";

const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function AdminDataPage() {
  const {
    serviceCategories,
    addServiceCategory,
    addServiceItem,
    removeServiceItem,
    setServiceItemHidden,
    auditLog,
  } = useSiteData();
  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    category_image: "",
    category_description: "",
  });
  const [itemForm, setItemForm] = useState({
    categorySlug: "",
    name: "",
    image: "",
    description: "",
    price: "",
    currency: "AED",
  });
  const [message, setMessage] = useState("");
  const [manageForm, setManageForm] = useState({
    categorySlug: "",
    subcategoryKey: "",
    productId: "",
  });
  const [confirmAction, setConfirmAction] = useState(null);

  const categoryOptions = useMemo(
    () =>
      serviceCategories.map((category) => ({
        label: category.category_name,
        value: toSlug(category.slug || category.category_name || ""),
      })),
    [serviceCategories]
  );

  const onAddCategory = (event) => {
    event.preventDefault();
    addServiceCategory(categoryForm);
    setCategoryForm({ category_name: "", category_image: "", category_description: "" });
    setMessage("Service category added.");
  };

  const onAddItem = (event) => {
    event.preventDefault();
    addServiceItem(itemForm.categorySlug, itemForm);
    setItemForm({
      categorySlug: "",
      name: "",
      image: "",
      description: "",
      price: "",
      currency: "AED",
    });
    setMessage("Item added to selected category.");
  };

  const selectedCategory = useMemo(
    () =>
      serviceCategories.find(
        (category) =>
          toSlug(category.slug || category.category_name || "") === manageForm.categorySlug
      ),
    [serviceCategories, manageForm.categorySlug]
  );

  const subcategoryOptions = useMemo(() => {
    if (!selectedCategory) return [];
    const options = [];
    if (Array.isArray(selectedCategory.items) && selectedCategory.items.length > 0) {
      options.push({ key: "__direct__", label: "No Subcategory (Direct Items)" });
    }
    if (Array.isArray(selectedCategory.subcategories)) {
      selectedCategory.subcategories.forEach((sub, index) => {
        if (Array.isArray(sub?.items) && sub.items.length > 0) {
          options.push({
            key: `${toSlug(sub?.name || `sub-${index}`)}-${index}`,
            label: sub?.name || `Subcategory ${index + 1}`,
            subIndex: index,
          });
        }
      });
    }
    return options;
  }, [selectedCategory]);

  const selectedSubcategory = useMemo(
    () => subcategoryOptions.find((option) => option.key === manageForm.subcategoryKey),
    [subcategoryOptions, manageForm.subcategoryKey]
  );

  const productOptions = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return [];
    if (selectedSubcategory.key === "__direct__") {
      return (selectedCategory.items || []).map((item, index) => ({
        id: item?.id,
        label: `${item?.name || `Product ${index + 1}`}${item?.hidden ? " (Hidden)" : ""}`,
        hidden: Boolean(item?.hidden),
      }));
    }
    const subItems =
      Array.isArray(selectedCategory.subcategories) &&
      Number.isInteger(selectedSubcategory.subIndex)
        ? selectedCategory.subcategories[selectedSubcategory.subIndex]?.items || []
        : [];
    return subItems.map((item, index) => ({
      id: item?.id,
      label: `${item?.name || `Product ${index + 1}`}${item?.hidden ? " (Hidden)" : ""}`,
      hidden: Boolean(item?.hidden),
    }));
  }, [selectedCategory, selectedSubcategory]);

  const selectedProduct = useMemo(() => {
    if (!manageForm.productId) return null;
    const targetId = Number(manageForm.productId);
    return productOptions.find((item) => Number(item.id) === targetId) || null;
  }, [manageForm.productId, productOptions]);

  const onManageAction = (action) => {
    if (!selectedCategory || !manageForm.productId) return;
    const categorySlug = toSlug(selectedCategory.slug || selectedCategory.category_name || "");
    const targetId = Number(manageForm.productId);
    const targetName = selectedProduct?.label?.replace(" (Hidden)", "") || "product";
    const actionLabel = {
      hide: "hide",
      unhide: "unhide",
      delete: "delete permanently",
    }[action];

    setConfirmAction({
      action,
      actionLabel,
      categorySlug,
      targetId,
      targetName,
    });
  };

  const onConfirmAction = () => {
    if (!confirmAction) return;
    const { action, categorySlug, targetId, targetName } = confirmAction;

    if (action === "hide") {
      setServiceItemHidden(categorySlug, targetId, true);
      setMessage(`"${targetName}" has been hidden.`);
      setConfirmAction(null);
      return;
    }
    if (action === "unhide") {
      setServiceItemHidden(categorySlug, targetId, false);
      setMessage(`"${targetName}" is visible again.`);
      setConfirmAction(null);
      return;
    }
    removeServiceItem(categorySlug, targetId);
    setMessage(`"${targetName}" deleted permanently.`);
    setConfirmAction(null);
  };

  return (
    <main className="service-detail-page">
      <section className="service-detail-header">
        <p className="service-detail-kicker">Admin</p>
        <h1>Data Manager</h1>
        <p className="service-detail-desc">
          Add service categories and product items without editing JSON manually.
        </p>
      </section>

      {Array.isArray(auditLog) && auditLog.length > 0 ? (
        <section className="admin-audit-card">
          <h3>Recent changes</h3>
          <ul className="admin-audit-list">
            {auditLog.slice(0, 12).map((event) => (
              <li key={event.id}>
                <span className="admin-audit-main">
                  <strong>{event.by || "unknown"}</strong>{" "}
                  <span className="admin-audit-type">{event.type}</span>
                  {event.categorySlug ? (
                    <span className="admin-audit-meta"> • {event.categorySlug}</span>
                  ) : null}
                  {event.itemId ? (
                    <span className="admin-audit-meta"> • #{String(event.itemId)}</span>
                  ) : null}
                  {event.itemName ? (
                    <span className="admin-audit-meta"> • {event.itemName}</span>
                  ) : null}
                </span>
                <span className="admin-audit-time">
                  {event.at ? new Date(event.at).toLocaleString() : ""}
                </span>
              </li>
            ))}
          </ul>
          <p className="admin-audit-note">
            This audit log is stored in this browser (Local Storage).
          </p>
        </section>
      ) : (
        <section className="admin-audit-card">
          <h3>Recent changes</h3>
          <p className="service-empty-state">
            No changes recorded yet (this browser).
          </p>
        </section>
      )}

      {message ? <p className="service-empty-state admin-status-message">{message}</p> : null}

      <section className="service-products-wrap admin-manager-grid">
        <form className="service-product-card admin-manager-card" onSubmit={onAddCategory}>
          <h3>Add Service Category</h3>
          <input
            placeholder="Category name"
            value={categoryForm.category_name}
            onChange={(e) => setCategoryForm({ ...categoryForm, category_name: e.target.value })}
            required
          />
          <input
            placeholder="Category image URL"
            value={categoryForm.category_image}
            onChange={(e) => setCategoryForm({ ...categoryForm, category_image: e.target.value })}
            required
          />
          <textarea
            placeholder="Category description"
            value={categoryForm.category_description}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, category_description: e.target.value })
            }
            required
          />
          <button type="submit" className="btn-primary admin-form-btn">
            Add Category
          </button>
        </form>

        <form className="service-product-card admin-manager-card" onSubmit={onAddItem}>
          <h3>Add Product Item</h3>
          <select
            value={itemForm.categorySlug}
            onChange={(e) => setItemForm({ ...itemForm, categorySlug: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            placeholder="Product name"
            value={itemForm.name}
            onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
            required
          />
          <input
            placeholder="Product image URL"
            value={itemForm.image}
            onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
          />
          <textarea
            placeholder="Product description"
            value={itemForm.description}
            onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
          />
          <div className="admin-form-inline-grid">
            <input
              placeholder="Price"
              value={itemForm.price}
              onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
            />
            <input
              placeholder="Currency"
              value={itemForm.currency}
              onChange={(e) => setItemForm({ ...itemForm, currency: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary admin-form-btn">
            Add Item
          </button>
        </form>

        <section className="service-product-card admin-manager-card">
          <h3>Manage Existing Product</h3>
          <p className="service-empty-state">
            Choose category, then subcategory (if any), then product.
          </p>
          <select
            value={manageForm.categorySlug}
            onChange={(e) =>
              setManageForm({
                categorySlug: e.target.value,
                subcategoryKey: "",
                productId: "",
              })
            }
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={manageForm.subcategoryKey}
            onChange={(e) =>
              setManageForm({
                ...manageForm,
                subcategoryKey: e.target.value,
                productId: "",
              })
            }
            disabled={!manageForm.categorySlug}
          >
            <option value="">Select Subcategory</option>
            {subcategoryOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={manageForm.productId}
            onChange={(e) => setManageForm({ ...manageForm, productId: e.target.value })}
            disabled={!manageForm.subcategoryKey}
          >
            <option value="">Select Product</option>
            {productOptions.map((option) => (
              <option
                key={option.id}
                value={option.id}
                style={option.hidden ? { color: "#9ca3af" } : undefined}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="admin-action-row">
            {selectedProduct?.hidden ? (
              <button
                type="button"
                className="btn-outline"
                disabled={!manageForm.productId}
                onClick={() => onManageAction("unhide")}
              >
                Unhide
              </button>
            ) : (
              <button
                type="button"
                className="btn-outline"
                disabled={!manageForm.productId}
                onClick={() => onManageAction("hide")}
              >
                Hide
              </button>
            )}
            <button
              type="button"
              className="admin-delete-btn"
              disabled={!manageForm.productId}
              onClick={() => onManageAction("delete")}
            >
              Delete
            </button>
          </div>
        </section>
      </section>

      {confirmAction ? (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true">
          <div className="admin-modal-card">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to {confirmAction.actionLabel} "{confirmAction.targetName}"
              from the product list?
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-delete-btn"
                onClick={onConfirmAction}
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

