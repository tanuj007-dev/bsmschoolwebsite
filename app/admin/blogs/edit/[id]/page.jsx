"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useBlogs } from "../../../../hooks/useBlogs";
import { createSlug } from "../../../../data/seedBlogs";
import RichTextEditor from "../../../components/RichTextEditor";

const CATEGORIES = ["Academics", "Preschool", "Admissions", "Curriculum", "Infrastructure", "Early Years", "General"];

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { getBlogById, updateBlog, blogs } = useBlogs();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const initialEditorContent = useRef("");

  useEffect(() => {
    const blog = getBlogById(id);
    if (!blog) {
      router.replace("/admin/blogs");
      return;
    }
    initialEditorContent.current = blog.content || "";
    setForm({
      title: blog.title,
      slug: blog.slug,
      image: blog.image || "/images/blog/blog-1.webp",
      date: blog.date,
      category: blog.category || "General",
      author: blog.author || "Admin",
      readTime: blog.readTime || "5 min read",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
    });
  }, [id, blogs]);

  const update = (key, value) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: value };
      if (key === "title") next.slug = createSlug(value);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    updateBlog(id, form);
    setSaving(false);
    router.push("/admin/blogs");
  };

  if (form === null) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48" />
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#7A0C0C]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blogs
      </Link>

      <m.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 dark:text-white"
      >
        Edit Blog
      </m.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cover Image URL</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Read time</label>
            <input
              type="text"
              value={form.readTime}
              onChange={(e) => update("readTime", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
          <RichTextEditor
            key={id}
            initialContent={initialEditorContent.current}
            onChange={(html) => update("content", html)}
            placeholder="Write your blog content..."
          />
        </div>

        <div className="border border-slate-200 dark:border-slate-600 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Preview</h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{form.title || "Untitled"}</h2>
            <p className="text-slate-600 dark:text-slate-300">{form.excerpt || "No excerpt."}</p>
            <div
              className="text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: form.content || "<p>No content yet.</p>" }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium hover:bg-[#5a0909] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Blog"}
          </button>
          <Link
            href="/admin/blogs"
            className="px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
