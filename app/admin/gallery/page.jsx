"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Image as ImageIcon,
  Link as LinkIcon, GripVertical, ArrowUpDown, Check, X,
} from "lucide-react";
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

  // ── Reorder state ──────────────────────────────────────────────────────────
  const [reorderMode, setReorderMode] = useState(false);
  const [orderedList, setOrderedList] = useState([]);
  const [saveMsg, setSaveMsg] = useState("");            // "Saved!" flash
  const [savingOrder, setSavingOrder] = useState(false);

  // HTML5 drag state
  const dragIdx = useRef(null);
  const [overIdx, setOverIdx] = useState(null);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const refetch = useCallback(() => {
    fetchGallery().then((data) => {
      const d = Array.isArray(data) ? data : [];
      setApiImages(d);
      setOrderedList(d);
    });
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const list = apiImages ?? [];
  const filtered = filter === "All" ? orderedList : orderedList.filter((img) => img.category === filter);

  // ── Edit handlers ──────────────────────────────────────────────────────────
  const startEdit = (img) => {
    setEditingId(img.id);
    setEditForm({ title: img.title || "", desc: img.desc || "", category: img.category || "Other" });
    setError("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
        credentials: "include",
      });
      if (res.ok) { await refetch(); setEditingId(null); }
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Update failed");
      }
    } catch { setError("Update failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setError("");
    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE", credentials: "include",
      });
      if (res.ok) await refetch();
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed");
      }
    } catch { setError("Delete failed"); }
  };

  // ── Reorder: HTML5 drag handlers ──────────────────────────────────────────
  const handleDragStart = (e, idx) => {
    dragIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIdx(idx);
  };

  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    const fromIdx = dragIdx.current;
    if (fromIdx === null || fromIdx === dropIdx) { setOverIdx(null); return; }
    const next = [...orderedList];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(dropIdx, 0, moved);
    setOrderedList(next);
    dragIdx.current = null;
    setOverIdx(null);
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
    setOverIdx(null);
  };

  // ── Reorder: enter/exit ───────────────────────────────────────────────────
  const enterReorder = () => {
    setOrderedList([...list]);        // fresh copy
    setReorderMode(true);
    setSaveMsg("");
    setFilter("All");                 // show all while reordering
  };

  const cancelReorder = () => {
    setOrderedList([...list]);        // reset to fetched order
    setReorderMode(false);
    setSaveMsg("");
  };

  const saveOrder = async () => {
    setSavingOrder(true); setSaveMsg("");
    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: orderedList }),
        credentials: "include",
      });
      if (res.ok) {
        await refetch();
        setReorderMode(false);
        setSaveMsg("Order saved! Gallery page is now updated.");
      } else {
        const data = await res.json().catch(() => ({}));
        setSaveMsg(`Error: ${data.error || "Save failed"}`);
      }
    } catch { setSaveMsg("Error: Save failed"); }
    finally { setSavingOrder(false); }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Gallery</h1>
        <div className="flex flex-wrap gap-2">
          {!reorderMode ? (
            <>
              <button
                type="button"
                onClick={enterReorder}
                disabled={list.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-400 text-slate-600 dark:text-slate-300 font-medium hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-colors disabled:opacity-40"
              >
                <ArrowUpDown className="w-4 h-4" /> Reorder
              </button>
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
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={cancelReorder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-400 text-slate-600 dark:text-slate-300 font-medium hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                type="button"
                onClick={saveOrder}
                disabled={savingOrder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <Check className="w-4 h-4" />
                {savingOrder ? "Saving…" : "Save Order"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Reorder banner ── */}
      {reorderMode && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          <GripVertical className="w-4 h-4 shrink-0" />
          <span>Drag images to reorder — changes only apply when you click <strong>Save Order</strong>.</span>
        </div>
      )}

      {/* ── Save message ── */}
      {saveMsg && (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${saveMsg.startsWith("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {saveMsg}
        </div>
      )}

      {/* ── Category filter (hidden in reorder mode) ── */}
      {!reorderMode && (
        <div className="flex flex-wrap gap-2">
          {["All", ...DEFAULT_GALLERY_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat
                  ? "bg-[#7A0C0C] text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Image grid / states ── */}
      {apiImages === null ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500 dark:text-slate-400">
          <div className="inline-block w-10 h-10 border-2 border-[#7A0C0C] border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading gallery…</p>
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500 dark:text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images yet. Upload images or add by URL.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/admin/gallery/upload" className="text-[#7A0C0C] font-medium hover:underline">Upload Images</Link>
            <span className="text-slate-400">|</span>
            <Link href="/admin/gallery/add" className="text-[#7A0C0C] font-medium hover:underline">Add by URL</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="sync">
            {(reorderMode ? orderedList : filtered).map((img, i) => (
              <m.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                // ── Drag props (only active in reorder mode) ──
                draggable={reorderMode}
                onDragStart={reorderMode ? (e) => handleDragStart(e, i) : undefined}
                onDragOver={reorderMode ? (e) => handleDragOver(e, i) : undefined}
                onDrop={reorderMode ? (e) => handleDrop(e, i) : undefined}
                onDragEnd={reorderMode ? handleDragEnd : undefined}
                className={`bg-white dark:bg-slate-800 rounded-xl border overflow-hidden group transition-all
                  ${reorderMode
                    ? overIdx === i
                      ? "border-[#7A0C0C] scale-105 shadow-xl cursor-grabbing"
                      : "border-amber-300 cursor-grab shadow-md"
                    : "border-slate-200 dark:border-slate-700"
                  }`}
              >
                {/* Drag handle badge in reorder mode */}
                {reorderMode && (
                  <div className="flex items-center justify-between px-2 pt-1.5 pb-0.5 bg-amber-50 border-b border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700">#{i + 1}</span>
                    <GripVertical className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                )}

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

                  {/* Edit/delete overlay — only in normal mode */}
                  {!reorderMode && (
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
                  )}
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

      {/* ── Edit modal ── */}
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
