import { StrictMode } from "react";
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
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// ✅ Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={appRouter} />
    </HelmetProvider>
  </StrictMode>
);