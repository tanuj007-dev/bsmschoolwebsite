"use client";

import { create } from "zustand";
import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { seedGallery } from "../data/seedGallery";
import { v4 as uuidv4 } from "uuid";

/**
 * Gallery CRUD with localStorage.
 * Images can be URL (public path) or base64 data URL.
 */
function loadGallery() {
  if (typeof window === "undefined") return [];
  let list = getItem(STORAGE_KEYS.GALLERY, null);
  if (!list || !Array.isArray(list) || list.length === 0) {
    list = seedGallery.map((g) => ({ ...g, id: uuidv4(), createdAt: g.createdAt || new Date().toISOString() }));
    setItem(STORAGE_KEYS.GALLERY, list);
  }
  return list;
}

export const useGalleryStore = create((set, get) => ({
  images: [],

  hydrate() {
    if (typeof window === "undefined") return;
    set({ images: loadGallery() });
  },

  getImages() {
    return get().images.length ? get().images : loadGallery();
  },

  getImagesByCategory(category) {
    const images = get().images.length ? get().images : loadGallery();
    if (!category || category === "All") return images;
    return images.filter((img) => img.category === category);
  },

  addImage(image) {
    const now = new Date().toISOString();
    const newImage = {
      id: image.id || uuidv4(),
      src: image.src,
      category: image.category || "Other",
      title: image.title || "Untitled",
      desc: image.desc || "",
      createdAt: now,
    };
    const images = [...(get().images.length ? get().images : loadGallery()), newImage];
    setItem(STORAGE_KEYS.GALLERY, images);
    set({ images });
    return newImage;
  },

  updateImage(id, updates) {
    const images = (get().images.length ? get().images : loadGallery()).map((img) =>
      img.id === id ? { ...img, ...updates } : img
    );
    setItem(STORAGE_KEYS.GALLERY, images);
    set({ images });
    return images.find((img) => img.id === id) || null;
  },

  deleteImage(id) {
    const images = (get().images.length ? get().images : loadGallery()).filter((img) => img.id !== id);
    setItem(STORAGE_KEYS.GALLERY, images);
    set({ images });
  },
}));
