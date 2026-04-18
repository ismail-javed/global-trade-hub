/**
 * Formspree submission URL. Set VITE_FORMSPREE_ENDPOINT in hosting (or .env) to override.
 */
export const formspreeEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/mlgagnlr";
