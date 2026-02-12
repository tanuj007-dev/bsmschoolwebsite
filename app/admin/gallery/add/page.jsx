"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import { useGallery } from "../../../hooks/useGallery";
import { DEFAULT_GALLERY_CATEGORIES } from "../../../data/seedGallery";
import Toast from "../../components/Toast";

/**
 * Add a gallery image by static URL/path (e.g. /gallery/filename.webp).
 * Image must already exist in public/gallery or be a valid URL.
 */
export default function AddGalleryImagePage() {
  const router = useRouter();
  const { images, addImage } = useGallery();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const path = src.trim();
    if (!path) {
      setError("Please enter an image path (e.g. /gallery/photo.webp)");
      return;
    }
    const normalized = path.startsWith("/") ? path : `/${path}`;

    const isDuplicate = images.some((img) => img.src && (img.src === normalized || img.src === path));
    if (isDuplicate) {
      showToast("This image is already in the gallery. Duplicate not added.");
      return;
    }

    setSaving(true);
    try {
      addImage({
        src: normalized,
        category,
        title: title.trim() || "Untitled",
        desc: desc.trim() || "",
      });
      router.push("/admin/gallery");
    } catch (err) {
      setError(err?.message || "Failed to add image");
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

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2"
      >
        <LinkIcon className="w-8 h-8 text-[#7A0C0C]" />
        Add Image by URL
      </motion.h1>

      <p className="text-slate-600 dark:text-slate-400 text-sm">
        Add an image that already exists in your project. Use a path like{" "}
        <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">/gallery/filename.webp</code> for files in{" "}
        <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">public/gallery</code>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Image path or URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            placeholder="/gallery/IMG-20260103-WA0012.jpg.webp"
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
            {saving ? "Adding..." : "Add Image"}
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
