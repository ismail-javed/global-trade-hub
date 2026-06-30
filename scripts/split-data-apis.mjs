import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, "../src/data/moc_Data.json");
const flagsApiPath = resolve(__dirname, "../public/api/flags.json");
const productDetailsPath = resolve(__dirname, "../public/api/product-details.json");

const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const DETAIL_KEYS = [
  "details",
  "specs",
  "applications",
  "benefits",
  "industries",
  "packagingOptions",
  "shipping",
  "exportDocs",
  "certifications",
  "sections",
  "related",
  "therapeuticCategory",
  "exportReady",
  "availability",
  "generic",
  "genericName",
  "cas",
  "casNumber",
  "purity",
  "purityInfo",
];

const CATEGORY_DEFAULTS = {
  Agriculture: {
    applications: ["Food processing", "Retail supply", "Export"],
    benefits: ["Long shelf life", "Consistent quality", "Export grade"],
    industries: ["Food", "Wholesale", "Retail"],
    packagingOptions: ["25 kg bags", "40 kg cartons", "Custom packaging"],
    shipping: ["Sea freight", "Air freight"],
    exportDocs: ["Invoice", "Packing List", "Phytosanitary Certificate"],
    certifications: { whoGmp: false, iso: "ISO 22000", coa: true, msds: false },
    specs: {
      Moisture: "Contact us",
      Size: "Contact us",
      Packaging: "Export standard",
      MOQ: "Contact us",
      "Lead Time": "Contact us",
    },
  },
  "Medical Supplies": {
    applications: ["Healthcare", "Hospitals", "Industrial safety"],
    benefits: ["Quality assured", "Export compliant", "Reliable supply"],
    industries: ["Medical", "Healthcare", "Wholesale"],
    packagingOptions: ["Standard export packaging", "Bulk cartons"],
    shipping: ["Sea freight", "Air freight"],
    exportDocs: ["Invoice", "Packing List", "Certificate of Origin"],
    certifications: { whoGmp: false, iso: "ISO 13485", coa: true, msds: true },
    specs: {
      Material: "Contact us",
      Size: "Contact us",
      Packaging: "Export standard",
      MOQ: "Contact us",
      "Lead Time": "Contact us",
    },
  },
  Pottery: {
    applications: ["Home decor", "Retail", "Export"],
    benefits: ["Handcrafted quality", "Durable", "Export ready"],
    industries: ["Retail", "Home decor", "Wholesale"],
    packagingOptions: ["Individual boxes", "Bulk cartons"],
    shipping: ["Sea freight", "Air freight"],
    exportDocs: ["Invoice", "Packing List", "Certificate of Origin"],
    certifications: { whoGmp: false, iso: "N/A", coa: false, msds: false },
    specs: {
      Material: "Ceramic / Clay",
      Size: "Contact us",
      Packaging: "Export standard",
      MOQ: "Contact us",
      "Lead Time": "Contact us",
    },
  },
  "Spare Parts": {
    applications: ["Industrial", "Automotive", "Machinery"],
    benefits: ["OEM compatible", "Durable", "Export quality"],
    industries: ["Industrial", "Automotive", "Wholesale"],
    packagingOptions: ["Standard export packaging"],
    shipping: ["Sea freight", "Air freight"],
    exportDocs: ["Invoice", "Packing List", "Certificate of Origin"],
    certifications: { whoGmp: false, iso: "ISO 9001", coa: true, msds: false },
    specs: {
      Material: "Contact us",
      Size: "Contact us",
      Packaging: "Export standard",
      MOQ: "Contact us",
      "Lead Time": "Contact us",
    },
  },
};

const GENERIC_DEFAULTS = {
  applications: ["Export", "Wholesale", "Retail supply"],
  benefits: ["Export quality", "Consistent supply", "Reliable sourcing"],
  industries: ["Wholesale", "Retail", "Export"],
  packagingOptions: ["Standard export packaging"],
  shipping: ["Sea freight", "Air freight"],
  exportDocs: ["Invoice", "Packing List", "Certificate of Origin"],
  certifications: { whoGmp: false, iso: "N/A", coa: true, msds: false },
  specs: {
    Material: "Contact us",
    Size: "Contact us",
    Packaging: "Export standard",
    MOQ: "Contact us",
    "Lead Time": "Contact us",
  },
};

function defaultDetails(name) {
  return [
    { label: "Generic Name", value: "N/A", highlight: true },
    { label: "Purity", value: "Export grade", highlight: true },
    { label: "Storage", value: "Contact us for storage guidelines" },
  ];
}

function getCategoryDefaults(categoryName) {
  if (!categoryName) return GENERIC_DEFAULTS;
  const key = Object.keys(CATEGORY_DEFAULTS).find(
    (k) => k.toLowerCase() === categoryName.toLowerCase()
  );
  return key ? CATEGORY_DEFAULTS[key] : GENERIC_DEFAULTS;
}

function extractDetailFields(item, categoryName) {
  const defaults = getCategoryDefaults(categoryName);
  const extracted = {};

  for (const key of DETAIL_KEYS) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      extracted[key] =
        typeof item[key] === "object" && !Array.isArray(item[key])
          ? { ...item[key] }
          : Array.isArray(item[key])
            ? [...item[key]]
            : item[key];
    }
  }

  if (!extracted.details || !extracted.details.length) {
    extracted.details = defaultDetails(item.name);
  }

  for (const [key, value] of Object.entries(defaults)) {
    if (key === "certifications" || key === "specs") {
      extracted[key] = { ...value, ...(extracted[key] || {}) };
    } else if (!extracted[key] || (Array.isArray(extracted[key]) && !extracted[key].length)) {
      extracted[key] = Array.isArray(value) ? [...value] : value;
    }
  }

  return extracted;
}

function stripDetailFields(item) {
  const cleaned = { ...item };
  for (const key of DETAIL_KEYS) {
    delete cleaned[key];
  }
  return cleaned;
}

function processItem(item, categoryName, productDetails, usedSlugs) {
  let slug = toSlug(item.slug || item.name);
  if (!slug) slug = toSlug(`product-${item.id}`);

  if (usedSlugs.has(slug)) {
    slug = `${slug}-${item.id}`;
  }
  usedSlugs.add(slug);

  productDetails[slug] = extractDetailFields(item, categoryName);

  const cleaned = stripDetailFields(item);
  cleaned.slug = slug;
  if (!cleaned.description) {
    cleaned.description = `Export-quality ${item.name}`;
  }

  return cleaned;
}

function processItems(items, categoryName, productDetails, usedSlugs) {
  if (!Array.isArray(items)) return items;
  return items.map((item) => processItem(item, categoryName, productDetails, usedSlugs));
}

async function main() {
  const raw = await readFile(dataPath, "utf8");
  const data = JSON.parse(raw);

  const flagsCategory = data.categories.find((c) => c.category_flag === "flags");
  const flagsList = flagsCategory?.flags_list ?? [];

  const flagsApi = {
    label: `Delivering to ${flagsList.length}+ Countries`,
    flags: flagsList,
  };

  const productDetails = {};
  const usedSlugs = new Set();

  const cleanedCategories = data.categories
    .filter((c) => c.category_flag !== "flags")
    .map((category) => {
      const categoryName = category.category_name || "";
      const next = { ...category };

      if (Array.isArray(next.items)) {
        next.items = processItems(next.items, categoryName, productDetails, usedSlugs);
      }

      if (Array.isArray(next.subcategories)) {
        next.subcategories = next.subcategories.map((sub) => ({
          ...sub,
          items: processItems(sub.items, categoryName, productDetails, usedSlugs),
        }));
      }

      return next;
    });

  await mkdir(dirname(flagsApiPath), { recursive: true });
  await writeFile(flagsApiPath, JSON.stringify(flagsApi, null, 2) + "\n");
  await writeFile(productDetailsPath, JSON.stringify(productDetails, null, 2) + "\n");
  await writeFile(
    dataPath,
    JSON.stringify({ categories: cleanedCategories }, null, 4) + "\n"
  );

  console.log(`Flags API: ${flagsList.length} flags -> ${flagsApiPath}`);
  console.log(`Product details API: ${Object.keys(productDetails).length} products -> ${productDetailsPath}`);
  console.log(`Cleaned moc_Data.json: ${cleanedCategories.length} categories`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
