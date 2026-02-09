"use client";

import { create } from "zustand";
import { getItem, setItem, removeItem, setCookie, removeCookie } from "../utils/storage";
import { STORAGE_KEYS, AUTH_COOKIE, SESSION_DURATION, DEMO_CREDENTIALS } from "../utils/constants";

/**
 * Auth state: login, logout, session check.
 * Session is stored in localStorage; cookie is set for middleware.
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  expiresAt: null,
  hydrated: false,

  hydrate() {
    if (typeof window === "undefined") return;
    const data = getItem(STORAGE_KEYS.AUTH);
    if (data?.user && data?.expiresAt && data.expiresAt > Date.now()) {
      set({ user: data.user, expiresAt: data.expiresAt, hydrated: true });
      return;
    }
    set({ user: null, expiresAt: null, hydrated: true });
  },

  login(username, password) {
    const { username: u, password: p } = DEMO_CREDENTIALS;
    if (username !== u || password !== p) {
      return { success: false, error: "Invalid username or password" };
    }
    const expiresAt = Date.now() + SESSION_DURATION;
    const user = { username, loginAt: Date.now() };
    setItem(STORAGE_KEYS.AUTH, { user, expiresAt });
    setCookie(AUTH_COOKIE, "1", 1);
    set({ user, expiresAt });
    return { success: true };
  },

  logout() {
    removeItem(STORAGE_KEYS.AUTH);
    removeCookie(AUTH_COOKIE);
    set({ user: null, expiresAt: null });
  },

  isAuthenticated() {
    const { user, expiresAt } = get();
    if (!user || !expiresAt || expiresAt < Date.now()) return false;
    return true;
  },
}));
