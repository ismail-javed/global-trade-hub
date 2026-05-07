const raw = import.meta.env.VITE_SITE_URL || "https://jnssioverseas.info";
export const siteUrl = raw.replace(/\/$/, "");
