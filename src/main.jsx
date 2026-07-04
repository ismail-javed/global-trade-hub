import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import Body from "./component/Body/Body.jsx";
import ContactUs from "./component/Body/ContactUs.jsx";
import About from "./component/Body/indexBody/About.jsx";
import HeroServices from "./component/Body/HeroServices.jsx";
import NotFound from "./component/Body/NotFound.jsx";
import ServiceCategoryPage from "./component/Body/ServiceCategoryPage.jsx";
import AdminDataPage from "./component/Body/AdminDataPage.jsx";
import AdminLogin from "./component/Admin/AdminLogin.jsx";
import RequireAdminAuth from "./component/Admin/RequireAdminAuth.jsx";
import { SiteDataProvider } from "./data/SiteDataProvider.jsx";

export const ProductDetailPage = lazy(() => import("./component/Body/ProductDetailPage.jsx"));

// ✅ Router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/services", element: <HeroServices /> },
      { path: "/services/:slug", element: <ServiceCategoryPage /> },
      { path: "/products/*", element: <ProductDetailPage /> },
      { path: "/admin/login", element: <AdminLogin /> },
      {
        path: "/admin",
        element: (
          <RequireAdminAuth>
            <AdminDataPage />
          </RequireAdminAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// ✅ Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <SiteDataProvider>
        <Suspense fallback={<div className="page-loading">Loading…</div>}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </SiteDataProvider>
    </HelmetProvider>
  </StrictMode>
);