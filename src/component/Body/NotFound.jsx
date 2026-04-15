import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-kicker">404</p>
        <h1>Page Not Found</h1>
        <p className="contact-hero-text">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
          Go to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
