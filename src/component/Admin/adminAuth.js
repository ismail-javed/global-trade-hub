const SESSION_KEY = "jnssi_admin_session_v1";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

const parseCsv = (value) =>
  String(value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const parseCredentials = (value) => {
  // Format: "user1:pass1,user2:pass2"
  const entries = parseCsv(value);
  const map = new Map();
  for (const entry of entries) {
    const idx = entry.indexOf(":");
    if (idx <= 0) continue;
    const username = entry.slice(0, idx).trim();
    const password = entry.slice(idx + 1).trim();
    if (!username || !password) continue;
    map.set(username.toLowerCase(), { username, password });
  }
  return map;
};

const CREDENTIALS = parseCredentials(import.meta.env.VITE_ADMIN_CREDENTIALS);

export const ADMIN_USERS = (() => {
  if (CREDENTIALS.size > 0) return Array.from(CREDENTIALS.values()).map((v) => v.username);
  const configured = parseCsv(import.meta.env.VITE_ADMIN_USERS);
  return configured.length ? configured : ["admin"];
})();

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";

export function getAdminSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.username || !parsed.issuedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getAdminUsername() {
  const session = getAdminSession();
  return session?.username ? String(session.username) : null;
}

export function isAdminAuthed() {
  const session = getAdminSession();
  if (!session) return false;
  const age = Date.now() - Number(session.issuedAt);
  if (!Number.isFinite(age) || age < 0) return false;
  return age <= SESSION_TTL_MS;
}

export function signInAdmin({ username, password }) {
  const normalized = String(username || "").trim();
  const normalizedKey = normalized.toLowerCase();

  if (CREDENTIALS.size > 0) {
    const record = CREDENTIALS.get(normalizedKey);
    if (!record) return { ok: false, error: "Username is not authorized." };
    if (String(password || "") !== String(record.password)) {
      return { ok: false, error: "Incorrect password." };
    }
    const session = { username: record.username, issuedAt: Date.now() };
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }

  const allowed = ADMIN_USERS.some((u) => u.toLowerCase() === normalizedKey);
  if (!allowed) return { ok: false, error: "Username is not authorized." };

  if (!ADMIN_PASSWORD) {
    return {
      ok: false,
      error:
        "Admin password is not configured. Set VITE_ADMIN_PASSWORD in your .env file (or use VITE_ADMIN_CREDENTIALS).",
    };
  }

  if (String(password || "") !== String(ADMIN_PASSWORD)) {
    return { ok: false, error: "Incorrect password." };
  }

  const session = { username: normalized, issuedAt: Date.now() };
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true };
}

export function signOutAdmin() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

