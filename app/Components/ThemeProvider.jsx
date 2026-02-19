"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

/**
 * Applies saved theme (light/dark/system) to document.
 * Include once in root layout so theme persists across admin and main site.
 */
export default function ThemeProvider({ children }) {
  const theme = useThemeStore((s) => s.theme);
  const hydrate = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    if (typeof hydrate === "function") hydrate();
  }, [hydrate]);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "system") {
      const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, [theme]);

  return <>{children}</>;
}
