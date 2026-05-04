import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAdminSession, isAdminAuthed, signOutAdmin } from "./adminAuth.js";

export default function RequireAdminAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAdminAuthed()) {
      navigate("/admin/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [location.pathname, navigate]);

  if (!isAdminAuthed()) return null;

  const session = getAdminSession();

  return (
    <>
      <div className="admin-auth-bar">
        <div className="admin-auth-bar-inner">
          <span className="admin-auth-user">
            Signed in as <strong>{session?.username || "admin"}</strong>
          </span>
          <div className="admin-auth-actions">
            <Link className="btn-outline admin-auth-link" to="/">
              Home
            </Link>
            <button
              type="button"
              className="btn-outline admin-auth-link"
              onClick={() => {
                signOutAdmin();
                navigate("/admin/login", { replace: true });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

