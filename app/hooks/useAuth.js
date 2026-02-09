"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

/**
 * useAuth: hydrate auth, optionally require login and redirect.
 * Use in admin layout to protect routes and get user state.
 */
export function useAuth(options = {}) {
  const { requireAuth = false } = options;
  const router = useRouter();
  const { hydrate, user, hydrated, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    if (requireAuth && !isAuthenticated()) {
      router.replace("/admin/login");
    }
  }, [hydrated, requireAuth, router]);

  return {
    user,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
    hydrated,
  };
}
