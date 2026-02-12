"use client";

import { create } from "zustand";
import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { seedBlogs, createSlug } from "../data/seedBlogs";
import { v4 as uuidv4 } from "uuid";

/**
 * Blog CRUD with localStorage persistence.
 * Seed with demo data when empty.
 */
function loadBlogs() {
  if (typeof window === "undefined") return [];
  let list = getItem(STORAGE_KEYS.BLOGS, null);
  if (!list || !Array.isArray(list) || list.length === 0) {
    list = seedBlogs.map((b) => ({ ...b, id: uuidv4() }));
    setItem(STORAGE_KEYS.BLOGS, list);
  }
  return list;
}

export const useBlogStore = create((set, get) => ({
  blogs: [],

  hydrate() {
    if (typeof window === "undefined") return;
    set({ blogs: loadBlogs() });
  },

  getBlogs() {
    return get().blogs.length ? get().blogs : loadBlogs();
  },

  getBlogById(id) {
    const blogs = get().blogs.length ? get().blogs : loadBlogs();
    return blogs.find((b) => b.id === id) || null;
  },

  getBlogBySlug(slug) {
    const blogs = get().blogs.length ? get().blogs : loadBlogs();
    return blogs.find((b) => b.slug === slug) || null;
  },

  addBlog(blog) {
    const slug = blog.slug || createSlug(blog.title);
    const now = new Date().toISOString();
    const day = new Date().getDate();
    const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    const month = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    const newBlog = {
      id: blog.id || uuidv4(),
      slug,
      title: blog.title || "Untitled",
      image: blog.image || "/images/blog/blog-1.webp",
      date: blog.date || { day: String(day), month, year: String(year) },
      category: blog.category || "General",
      author: blog.author || "Admin",
      readTime: blog.readTime || "5 min read",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      createdAt: now,
      updatedAt: now,
    };
    const blogs = [...(get().blogs.length ? get().blogs : loadBlogs()), newBlog];
    setItem(STORAGE_KEYS.BLOGS, blogs);
    set({ blogs });
    return newBlog;
  },

  updateBlog(id, updates) {
    const blogs = (get().blogs.length ? get().blogs : loadBlogs()).map((b) => {
      if (b.id !== id) return b;
      const slug = updates.slug ?? (updates.title ? createSlug(updates.title) : b.slug);
      return {
        ...b,
        ...updates,
        slug: slug || b.slug,
        updatedAt: new Date().toISOString(),
      };
    });
    setItem(STORAGE_KEYS.BLOGS, blogs);
    set({ blogs });
    return blogs.find((b) => b.id === id) || null;
  },

  deleteBlog(id) {
    const blogs = (get().blogs.length ? get().blogs : loadBlogs()).filter((b) => b.id !== id);
    setItem(STORAGE_KEYS.BLOGS, blogs);
    set({ blogs });
  },
}));
