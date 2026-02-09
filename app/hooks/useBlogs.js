"use client";

import { useEffect } from "react";
import { useBlogStore } from "../store/blogStore";

/**
 * useBlogs: hydrate blog store and expose getBlogs, getBlogById, addBlog, updateBlog, deleteBlog.
 */
export function useBlogs() {
  const { hydrate, getBlogs, getBlogById, getBlogBySlug, addBlog, updateBlog, deleteBlog, blogs } = useBlogStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    blogs: blogs.length ? blogs : getBlogs(),
    getBlogs,
    getBlogById,
    getBlogBySlug,
    addBlog,
    updateBlog,
    deleteBlog,
  };
}
