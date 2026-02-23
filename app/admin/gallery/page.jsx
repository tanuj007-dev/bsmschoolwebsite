"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Image as ImageIcon,
  Link as LinkIcon, GripVertical, ArrowUpDown, Check, X,
} from "lucide-react";
import { DEFAULT_GALLERY_CATEGORIES } from "../../data/seedGallery";

// ── dnd-kit ────────────────────────────────────────────────────────────────
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Sortable card ──────────────────────────────────────────────────────────
function SortableCard({ img, index, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,     // fade the "ghost" in place
    zIndex: isDragging ? 0 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-slate-800 rounded-xl border border-amber-300 overflow-hidden group select-none"
    >
      {/* Amber badge row with drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between px-2 pt-1.5 pb-0.5
                   bg-amber-50 border-b border-amber-200 cursor-grab active:cursor-grabbing"
      >
        <span className="text-[10px] font-bold text-amber-700">#{index + 1}</span>
        <GripVertical className="w-3.5 h-3.5 text-amber-500" />
      </div>

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
      </div>

      <div className="p-2">
        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{img.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{img.category}</p>
      </div>
    </div>
  );
}

// ── Drag overlay card (floats under pointer while dragging) ────────────────
function DragCard({ img }) {
  return (
    <div className="bg-white rounded-xl border-2 border-[#7A0C0C] shadow-2xl overflow-hidden
                    scale-105 rotate-2 pointer-events-none">
      <div className="flex items-center justify-between px-2 pt-1.5 pb-0.5
                      bg-[#7A0C0C] border-b border-red-900">
        <span className="text-[10px] font-bold text-white">Moving…</span>
        <GripVertical className="w-3.5 h-3.5 text-red-200" />
      </div>
      <div className="relative aspect-square">
        {img.src?.startsWith("data:") ? (
          <img src={img.src} alt={img.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <Image
            src={img.src}
            alt={img.title}
            fill
            className="object-cover"
            sizes="20vw"
            unoptimized={typeof img.src === "string" && /blob\.vercel-storage\.com/.test(img.src)}
          />
        )}
      </div>
      <div className="p-2">
        <p className="text-sm font-medium text-slate-800 truncate">{img.title}</p>
        <p className="text-xs text-slate-500">{img.category}</p>
      </div>
    </div>
  );
}

// ── Normal (non-reorder) card ──────────────────────────────────────────────
function GalleryCard({ img, onEdit, onDelete }) {
  return (
    <m.div
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
          <button type="button" onClick={() => onEdit(img)}
            className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white">
            <Pencil className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => onDelete(img.id, img.title)}
            className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-white">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{img.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{img.category}</p>
      </div>
    </m.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AdminGalleryPage() {
  const [apiImages, setApiImages] = useState(null);
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", desc: "", category: "Other" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── Reorder state ──────────────────────────────────────────────────────
  const [reorderMode, setReorderMode] = useState(false);
  const [orderedList, setOrderedList] = useState([]);
  const [activeImg, setActiveImg] = useState(null);   // image being dragged
  const [saveMsg, setSaveMsg] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);

  // dnd-kit sensors — 8 px activation distance so clicks still work
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // ── Data fetching ────────────────────────────────────────────────────────
  const refetch = useCallback(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const data = Array.isArray(d) ? d : [];
        setApiImages(data);
        setOrderedList(data);
      })
      .catch(() => { });
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const list = apiImages ?? [];
  const filtered = filter === "All" ? list : list.filter((img) => img.category === filter);

  // ── Edit handlers ────────────────────────────────────────────────────────
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

  // ── dnd-kit drag events ──────────────────────────────────────────────────
  const handleDragStart = ({ active }) => {
    setActiveImg(orderedList.find((img) => img.id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveImg(null);
    if (!over || active.id === over.id) return;
    setOrderedList((items) => {
      const oldIdx = items.findIndex((i) => i.id === active.id);
      const newIdx = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIdx, newIdx);
    });
  };

  // ── Reorder mode controls ────────────────────────────────────────────────
  const enterReorder = () => {
    setOrderedList([...list]);
    setReorderMode(true);
    setSaveMsg("");
    setFilter("All");
  };

  const cancelReorder = () => {
    setOrderedList([...list]);
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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Gallery</h1>
        <div className="flex flex-wrap gap-2">
          {!reorderMode ? (
            <>
              <button
                type="button"
                onClick={enterReorder}
                disabled={list.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-400
                           text-slate-600 dark:text-slate-300 font-medium hover:border-[#7A0C0C]
                           hover:text-[#7A0C0C] transition-colors disabled:opacity-40"
              >
                <ArrowUpDown className="w-4 h-4" /> Reorder
              </button>
              <Link href="/admin/gallery/add"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#7A0C0C]
                           text-[#7A0C0C] font-medium hover:bg-[#7A0C0C] hover:text-white transition-colors">
                <LinkIcon className="w-5 h-5" /> Add by URL
              </Link>
              <Link href="/admin/gallery/upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7A0C0C] text-white
                           font-medium hover:bg-[#5a0909] transition-colors">
                <Plus className="w-5 h-5" /> Upload Images
              </Link>
            </>
          ) : (
            <>
              <button type="button" onClick={cancelReorder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-400
                           text-slate-600 dark:text-slate-300 font-medium hover:border-red-500
                           hover:text-red-500 transition-colors">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button type="button" onClick={saveOrder} disabled={savingOrder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white
                           font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
                <Check className="w-4 h-4" />
                {savingOrder ? "Saving…" : "Save Order"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reorder banner */}
      {reorderMode && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          <GripVertical className="w-4 h-4 shrink-0" />
          <span>Drag the <strong>grip handle</strong> on any card to reorder — click <strong>Save Order</strong> when done.</span>
        </div>
      )}

      {/* Save message */}
      {saveMsg && (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${saveMsg.startsWith("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
          }`}>
          {saveMsg}
        </div>
      )}

      {/* Category filter */}
      {!reorderMode && (
        <div className="flex flex-wrap gap-2">
          {["All", ...DEFAULT_GALLERY_CATEGORIES].map((cat) => (
            <button key={cat} type="button" onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat
                  ? "bg-[#7A0C0C] text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
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
      ) : reorderMode ? (

        /* ── Sortable grid (dnd-kit) ── */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={orderedList.map((img) => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {orderedList.map((img, i) => (
                <SortableCard key={img.id} img={img} index={i} />
              ))}
            </div>
          </SortableContext>

          {/* Floating drag overlay — rendered outside grid, under pointer */}
          <DragOverlay adjustScale={false} dropAnimation={{
            duration: 200,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}>
            {activeImg ? (
              <div className="w-[calc(100%/5-1rem)]" style={{ width: 160 }}>
                <DragCard img={activeImg} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

      ) : (

        /* ── Normal view grid ── */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="sync">
            {filtered.map((img) => (
              <GalleryCard key={img.id} img={img} onEdit={startEdit} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit modal */}
      <AnimatePresence>
        {editingId && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setEditingId(null)}
          >
            <m.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Edit Image</h3>
              {error && <p className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input type="text" value={editForm.title}
                    onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <input type="text" value={editForm.desc}
                    onChange={(e) => setEditForm((p) => ({ ...p, desc: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select value={editForm.category}
                    onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                    {DEFAULT_GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button type="button" onClick={saveEdit} disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium disabled:opacity-50">
                  {saving ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
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
