import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthed, signInAdmin } from "./adminAuth.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/admin";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (isAdminAuthed()) {
    navigate(from, { replace: true });
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = signInAdmin(form);
    if (!result.ok) {
      setError(result.error || "Login failed.");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <main className="service-detail-page">
      <section className="service-detail-header">
        <p className="service-detail-kicker">Admin</p>
        <h1>Admin Center Login</h1>
        <p className="service-detail-desc">Sign in to manage site data.</p>
        <Link
          to="/"
          className="btn-primary"
          style={{ marginTop: "1rem", display: "inline-flex" }}
        >
          Back to Home
        </Link>
      </section>

      <section className="service-products-wrap">
        <form className="admin-login-card" onSubmit={onSubmit}>
          <h3>Sign in</h3>
          <label className="admin-login-label">
            Username
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              autoComplete="username"
              required
              placeholder="admin"
            />
          </label>
          <label className="admin-login-label">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
              required
              placeholder="Your admin password"
            />
          </label>

          {error ? <p className="admin-login-error">{error}</p> : null}

          <button type="submit" className="btn-primary admin-login-btn">
            Login
          </button>

          <p className="admin-login-help">
            Tip: set <code>VITE_ADMIN_CREDENTIALS</code> (recommended) or{" "}
            <code>VITE_ADMIN_USERS</code> + <code>VITE_ADMIN_PASSWORD</code> in your{" "}
            <code>.env</code>.
          </p>
        </form>
      </section>
    </main>
  );
}

