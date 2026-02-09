"use client";

import { create } from "zustand";
import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

/** Theme: 'light' | 'dark' | 'system' */
export const useThemeStore = create((set, get) => ({
  theme: "system",
  hydrated: false,

  hydrate() {
    if (typeof window === "undefined") return;
    const saved = getItem(STORAGE_KEYS.THEME, "system");
    set({ theme: saved, hydrated: true });
  },

  setTheme(theme) {
    setItem(STORAGE_KEYS.THEME, theme);
    set({ theme });
  },
}));
