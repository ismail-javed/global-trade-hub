import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { siteUrl } from "../seo/siteUrl.js";

const OG_IMAGE =
  "https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758022/logo_ycsn4j.jpg";

const ROUTES = {
  "/": {
    title: "JNSSI Overseas | Exports, Spare Parts & Handcrafted Artifacts",
    description:
      "JNSSI Overseas exports high-quality spare parts and authentic handcrafted artifacts from India to the United States and worldwide — engineering precision meets Indian craftsmanship.",
  },
  "/about": {
    title: "About Us | JNSSI Overseas",
    description:
      "Learn about JNSSI Overseas — global export partner for spare parts, handcrafted artifacts, and quality products from India to the US and beyond.",
  },
  "/services": {
    title: "Services | JNSSI Overseas",
    description:
      "JNSSI Overseas delivers export services, spare parts, handicrafts, and global shipping — quality products and trusted logistics worldwide.",
  },
  "/contact": {
    title: "Contact | JNSSI Overseas",
    description:
      "Contact JNSSI Overseas for export inquiries, partnerships, and product questions — reach our team for global trade support.",
  },
};

const NOT_FOUND = {
  title: "Page Not Found | JNSSI Overseas",
  description:
    "The page you requested could not be found. Visit JNSSI Overseas for exports, spare parts, and handcrafted artifacts.",
};

export default function Seo() {
  const { pathname } = useLocation();
  const meta = ROUTES[pathname] ?? NOT_FOUND;
  const path = pathname.replace(/\/$/, "") || "/";
  const canonical = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
