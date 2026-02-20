"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import { DEFAULT_GALLERY_CATEGORIES } from "../../../data/seedGallery";
import Toast from "../../components/Toast";

/**
 * Add a gallery image by URL. Image is stored in the Blob index (no file upload).
 * URL must be a full https (or http) URL.
 */
export default function AddGalleryImagePage() {
  const router = useRouter();
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Events");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = src.trim();
    if (!url) {
      setError("Please enter a full image URL (e.g. https://example.com/photo.jpg)");
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: url,
          category,
          title: title.trim() || "Untitled",
          desc: desc.trim() || "",
        }),
        credentials: "include",
      });
      if (res.ok) {
        showToast("Image added to gallery. It will appear on the gallery page.");
        router.push("/admin/gallery");
        return;
      }
      if (res.status === 401) {
        showToast("Please log in again.");
        setSaving(false);
        return;
      }
      if (res.status === 503) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gallery storage not configured. Set BLOB_READ_WRITE_TOKEN on Vercel.");
        setSaving(false);
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add image");
    } catch {
      setError("Failed to add image");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#7A0C0C]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </Link>

      <m.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2"
      >
        <LinkIcon className="w-8 h-8 text-[#7A0C0C]" />
        Add Image by URL
      </m.h1>

      <p className="text-slate-600 dark:text-slate-400 text-sm">
        Add an image by its full URL. The image will be listed in the gallery and shown on the public gallery page. Use a public image URL (e.g. from a CDN or your own host).
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sports Day 2024"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Optional short description"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          >
            {DEFAULT_GALLERY_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !src.trim()}
            className="px-6 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium hover:bg-[#5a0909] disabled:opacity-50"
          >
            {saving ? "Adding…" : "Add Image"}
          </button>
          <Link
            href="/admin/gallery"
            className="px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Link>
        </div>
      </form>

      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, visible: false }))}
        variant="warning"
      />
    </div>
  );
}
