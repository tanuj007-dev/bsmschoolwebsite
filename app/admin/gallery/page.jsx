"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useGallery } from "../../hooks/useGallery";
import { DEFAULT_GALLERY_CATEGORIES } from "../../data/seedGallery";

export default function AdminGalleryPage() {
  const { images, updateImage, deleteImage } = useGallery();
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", desc: "", category: "Other" });

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditForm({ title: img.title || "", desc: img.desc || "", category: img.category || "Other" });
  };

  const saveEdit = () => {
    if (editingId) {
      updateImage(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    deleteImage(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Gallery</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/gallery/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#7A0C0C] text-[#7A0C0C] font-medium hover:bg-[#7A0C0C] hover:text-white transition-colors"
          >
            <LinkIcon className="w-5 h-5" /> Add by URL
          </Link>
          <Link
            href="/admin/gallery/upload"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium hover:bg-[#5a0909] transition-colors"
          >
            <Plus className="w-5 h-5" /> Upload Images
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...DEFAULT_GALLERY_CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-[#7A0C0C] text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {images.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500 dark:text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images yet. Add an image by URL or upload files.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/admin/gallery/add" className="inline-block text-[#7A0C0C] font-medium hover:underline">
              Add by URL
            </Link>
            <span className="text-slate-400">|</span>
            <Link href="/admin/gallery/upload" className="inline-block text-[#7A0C0C] font-medium hover:underline">
              Upload Image
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group"
              >
                <div className="relative aspect-square">
                  {img.src?.startsWith("data:") ? (
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(img)}
                      className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(img.id, img.title)}
                      className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{img.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{img.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit modal */}
      <AnimatePresence>
        {editingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setEditingId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Edit Image</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <input
                    type="text"
                    value={editForm.desc}
                    onChange={(e) => setEditForm((p) => ({ ...p, desc: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  >
                    {DEFAULT_GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="px-4 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
