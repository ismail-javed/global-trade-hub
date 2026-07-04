import { useEffect, useMemo, useState } from "react";

export function useProductDetail(slug, categories) {
  const [productDetailsMap, setProductDetailsMap] = useState(null);

  useEffect(() => {
    let isActive = true;

    fetch("/api/product-details.json")
      .then((res) => res.json())
      .then((details) => {
        if (isActive) setProductDetailsMap(details || {});
      })
      .catch(() => {
        if (isActive) setProductDetailsMap({});
      });

    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(() => {
    if (!slug || !Array.isArray(categories)) {
      return { product: null, loading: productDetailsMap === null };
    }

    const serviceItems = categories.flatMap((category) => {
      const directItems = Array.isArray(category?.items) ? category.items : [];
      const subItems = Array.isArray(category?.subcategories)
        ? category.subcategories.flatMap((sub) => (Array.isArray(sub?.items) ? sub.items : []))
        : [];
      return [...directItems, ...subItems].map((item) => ({ item, category }));
    });

    const entry = serviceItems.find((candidate) => {
      const candidateSlug = candidate.item?.slug || candidate.item?.name || "";
      return candidateSlug.toString().trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") === slug;
    });

    if (!entry?.item) {
      return { product: null, loading: productDetailsMap === null };
    }

    const apiDetails = productDetailsMap?.[slug] || {};
    return {
      product: { ...entry.item, ...apiDetails },
      loading: productDetailsMap === null,
      category: entry.category,
    };
  }, [categories, productDetailsMap, slug]);
}
