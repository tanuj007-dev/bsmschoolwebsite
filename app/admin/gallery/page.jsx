"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { DEFAULT_GALLERY_CATEGORIES } from "../../data/seedGallery";

function fetchGallery() {
  return fetch("/api/gallery", { cache: "no-store" })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => (Array.isArray(data) ? data : null));
}

export default function AdminGalleryPage() {
  const [apiImages, setApiImages] = useState(null);
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", desc: "", category: "Other" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refetch = useCallback(() => {
    fetchGallery().then((data) => setApiImages(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    fetchGallery().then((data) => setApiImages(Array.isArray(data) ? data : []));
  }, []);

  const list = apiImages ?? [];
  const filtered = filter === "All" ? list : list.filter((img) => img.category === filter);

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditForm({ title: img.title || "", desc: img.desc || "", category: img.category || "Other" });
    setError("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
        credentials: "include",
      });
      if (res.ok) {
        await refetch();
        setEditingId(null);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Update failed");
      }
    } catch {
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setError("");
    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) await refetch();
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed");
      }
    } catch {
      setError("Delete failed");
    }
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

      {apiImages === null ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500 dark:text-slate-400">
          <div className="inline-block w-10 h-10 border-2 border-[#7A0C0C] border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading gallery…</p>
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500 dark:text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images yet. Upload images or add by URL — they are stored in Vercel Blob and appear on the gallery page.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/admin/gallery/upload" className="inline-block text-[#7A0C0C] font-medium hover:underline">
              Upload Images
            </Link>
            <span className="text-slate-400">|</span>
            <Link href="/admin/gallery/add" className="inline-block text-[#7A0C0C] font-medium hover:underline">
              Add by URL
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="sync">
            {filtered.map((img, i) => (
              <m.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group"
              >
                <div className="relative aspect-square">
                  {img.src?.startsWith("data:") ? (
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                      unoptimized={typeof img.src === "string" && /blob\.vercel-storage\.com/.test(img.src)}
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
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit modal */}
      <AnimatePresence>
        {editingId && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setEditingId(null)}
          >
            <m.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Edit Image</h3>
              {error && <p className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</p>}
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
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  Cancel
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
