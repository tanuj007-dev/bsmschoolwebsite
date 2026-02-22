/**
 * Admin panel constants.
 * Demo credentials can be overridden via env (NEXT_PUBLIC_*).
 */

// localStorage keys
export const STORAGE_KEYS = {
  BLOGS: "bsm_admin_blogs",
  GALLERY: "bsm_admin_gallery",
  AUTH: "bsm_admin_auth",
  THEME: "bsm_admin_theme",
};

// Cookie used by proxy for route protection (client sets it on login)
export const AUTH_COOKIE = "bsm_admin_session";

// Session duration in milliseconds (e.g. 24 hours)
export const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Demo admin credentials (for development / demo only)
export const DEMO_CREDENTIALS = {
  username:
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ADMIN_USER
      ? process.env.NEXT_PUBLIC_ADMIN_USER
      : "admin",
  password:
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ADMIN_PASS
      ? process.env.NEXT_PUBLIC_ADMIN_PASS
      : "admin123",
};
