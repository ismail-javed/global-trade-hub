import { createContext, useContext } from "react";

export const SiteDataContext = createContext(null);

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within SiteDataProvider");
  }
  return context;
}

