const raw = import.meta.env.VITE_SITE_URL || "https://jnssioverseas.com";
export const siteUrl = raw.replace(/\/$/, "");
