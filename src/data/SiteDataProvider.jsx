import { useMemo, useState } from "react";
import seedData from "@data/moc_Data.json";
import { SiteDataContext } from "./siteDataContext.js";
import { getAdminUsername } from "../component/Admin/adminAuth.js";
import { toSlug } from "../utils/strings.js";

const STORAGE_KEY = "jnssi_site_data_v1";
const AUDIT_KEY = "jnssi_site_audit_v1";
const AUDIT_LIMIT = 200;

const loadInitialData = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return seedData;
    const parsed = JSON.parse(stored);
    return parsed && Array.isArray(parsed.categories) ? parsed : seedData;
  } catch {
    return seedData;
  }
};

const loadAudit = () => {
  try {
    const raw = window.localStorage.getItem(AUDIT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const appendAudit = (event) => {
  try {
    const existing = loadAudit();
    const next = [event, ...existing].slice(0, AUDIT_LIMIT);
    window.localStorage.setItem(AUDIT_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
};

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(() => loadInitialData());
  const [auditLog, setAuditLog] = useState(() => loadAudit());

  const persist = (nextData, auditEvent) => {
    setData(nextData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));

    if (auditEvent) {
      const event = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        at: Date.now(),
        by: getAdminUsername() || "unknown",
        ...auditEvent,
      };
      const nextAudit = appendAudit(event);
      if (nextAudit) setAuditLog(nextAudit);
    }
  };

  const serviceCategories = useMemo(
    () =>
      Array.isArray(data?.categories)
        ? data.categories.filter(
            (category) => category.general_category === "service-items"
          )
        : [],
    [data]
  );

  const addServiceCategory = ({
    category_name,
    category_image,
    category_description,
  }) => {
    const category = {
      general_category: "service-items",
      category_name: category_name?.trim(),
      slug: toSlug(category_name),
      category_image: category_image?.trim(),
      category_description: category_description?.trim(),
      items: [],
    };

    const nextData = {
      ...data,
      categories: [...(data.categories || []), category],
    };
    persist(nextData, {
      type: "add_category",
      categorySlug: category.slug,
      categoryName: category.category_name,
    });
  };

  const addServiceItem = (categorySlug, item) => {
    const nextCategories = (data.categories || []).map((category) => {
      if (category.general_category !== "service-items") return category;
      const slug = toSlug(category.slug || category.category_name || "");
      if (slug !== categorySlug) return category;

      const currentItems = Array.isArray(category.items) ? category.items : [];
      const newItem = {
        id: Date.now(),
        name: item.name?.trim(),
        slug: toSlug(item.slug || item.name || ""),
        images: item.image ? [item.image.trim()] : [],
        description: item.description?.trim() || "",
        price: item.price?.trim() || "",
        currency: item.currency?.trim() || "AED",
      };

      return {
        ...category,
        items: [...currentItems, newItem],
      };
    });

    persist(
      { ...data, categories: nextCategories },
      {
        type: "add_item",
        categorySlug,
        itemName: item?.name?.trim() || "",
      }
    );
  };

  const removeServiceItem = (categorySlug, itemId) => {
    const nextCategories = (data.categories || []).map((category) => {
      if (category.general_category !== "service-items") return category;
      const slug = toSlug(category.slug || category.category_name || "");
      if (slug !== categorySlug) return category;

      const nextDirectItems = Array.isArray(category.items)
        ? category.items.filter((item) => item?.id !== itemId)
        : category.items;

      const nextSubcategories = Array.isArray(category.subcategories)
        ? category.subcategories.map((sub) => ({
            ...sub,
            items: Array.isArray(sub?.items)
              ? sub.items.filter((item) => item?.id !== itemId)
              : sub?.items,
          }))
        : category.subcategories;

      return {
        ...category,
        items: nextDirectItems,
        subcategories: nextSubcategories,
      };
    });

    persist(
      { ...data, categories: nextCategories },
      { type: "delete_item", categorySlug, itemId }
    );
  };

  const setServiceItemHidden = (categorySlug, itemId, hidden = true) => {
    const nextCategories = (data.categories || []).map((category) => {
      if (category.general_category !== "service-items") return category;
      const slug = toSlug(category.slug || category.category_name || "");
      if (slug !== categorySlug) return category;

      const nextDirectItems = Array.isArray(category.items)
        ? category.items.map((item) =>
            item?.id === itemId ? { ...item, hidden: Boolean(hidden) } : item
          )
        : category.items;

      const nextSubcategories = Array.isArray(category.subcategories)
        ? category.subcategories.map((sub) => ({
            ...sub,
            items: Array.isArray(sub?.items)
              ? sub.items.map((item) =>
                  item?.id === itemId
                    ? { ...item, hidden: Boolean(hidden) }
                    : item
                )
              : sub?.items,
          }))
        : category.subcategories;

      return {
        ...category,
        items: nextDirectItems,
        subcategories: nextSubcategories,
      };
    });

    persist(
      { ...data, categories: nextCategories },
      { type: hidden ? "hide_item" : "unhide_item", categorySlug, itemId }
    );
  };

  const value = {
    data,
    auditLog,
    serviceCategories,
    addServiceCategory,
    addServiceItem,
    removeServiceItem,
    setServiceItemHidden,
  };

  return (
    <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
  );
}

