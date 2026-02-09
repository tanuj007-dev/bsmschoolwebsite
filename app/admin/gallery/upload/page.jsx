"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { useGallery } from "../../../hooks/useGallery";
import { DEFAULT_GALLERY_CATEGORIES } from "../../../data/seedGallery";

/**
 * Convert File to base64 data URL for storing in localStorage.
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function UploadGalleryPage() {
  const router = useRouter();
  const { addImage } = useGallery();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState("Events");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    const dataUrls = await Promise.all(selected.map((f) => fileToDataUrl(f)));
    setFiles(selected);
    setPreviews(dataUrls);
    if (selected.length === 1) setTitle(selected[0].name.replace(/\.[^.]+$/, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previews.length) return;
    setUploading(true);
    for (let i = 0; i < previews.length; i++) {
      addImage({
        src: previews[i],
        category,
        title: previews.length === 1 ? title : (files[i]?.name?.replace(/\.[^.]+$/, "") || `Image ${i + 1}`),
        desc: previews.length === 1 ? desc : "",
      });
    }
    setUploading(false);
    setFiles([]);
    setPreviews([]);
    setTitle("");
    setDesc("");
    router.push("/admin/gallery");
  };

  const removePreview = (index) => {
    setPreviews((p) => p.filter((_, i) => i !== index));
    setFiles((f) => f.filter((_, i) => i !== index));
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
        className="text-3xl font-bold text-slate-800 dark:text-white"
      >
        Upload Images
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Images (Base64 stored in localStorage)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-colors"
          >
            <Upload className="w-10 h-10" />
            <span>Click to select images</span>
          </button>
        </div>

        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </motion.div>
        )}

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

        {previews.length <= 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
          </>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={uploading || !previews.length}
            className="px-6 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium hover:bg-[#5a0909] disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <Link
            href="/admin/gallery"
            className="px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
