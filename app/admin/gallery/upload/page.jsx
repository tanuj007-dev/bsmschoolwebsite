"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Upload, RotateCw, RotateCcw,
  X, CheckCircle2, AlertCircle, Loader2, ImagePlus,
} from "lucide-react";
import { DEFAULT_GALLERY_CATEGORIES } from "../../../data/seedGallery";

// ── helpers ────────────────────────────────────────────────────────────────

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function rotateDataUrl(dataUrl, direction) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (direction === "right") {
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(canvas.width, 0);
        ctx.rotate(Math.PI / 2);
      } else {
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(0, canvas.height);
        ctx.rotate(-Math.PI / 2);
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

// Upload a single file entry via its own request
async function uploadOne({ preview, fileName, category, title }) {
  const res = await fetch(preview);
  const blob = await res.blob();
  const fd = new FormData();
  fd.append("file", blob, fileName);
  fd.set("category", category);
  fd.set("title", title);
  fd.set("desc", "");
  const apiRes = await fetch("/api/gallery/upload", {
    method: "POST",
    body: fd,
    credentials: "include",
    cache: "no-store",
  });
  if (!apiRes.ok) {
    const err = await apiRes.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${apiRes.status}`);
  }
  return apiRes.json();
}

// ── status badge ──────────────────────────────────────────────────────────

const STATUS_UI = {
  idle: { icon: null, color: "", label: "" },
  uploading: { icon: Loader2, color: "text-blue-500", label: "Uploading…" },
  done: { icon: CheckCircle2, color: "text-green-500", label: "Uploaded" },
  error: { icon: AlertCircle, color: "text-red-500", label: "Failed" },
};

// ── component ─────────────────────────────────────────────────────────────

export default function UploadGalleryPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // Each item: { id, fileName, preview (dataUrl), title, status, error }
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("Events");
  const [rotating, setRotating] = useState(null);   // item id being rotated
  const [dragOver, setDragOver] = useState(false);
  const [globalMsg, setGlobalMsg] = useState("");    // final summary

  const updateItem = useCallback((id, patch) =>
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, ...patch } : it)),
    []);

  // ── file selection ───────────────────────────────────────────────────────

  const addFiles = useCallback(async (fileList) => {
    const selected = Array.from(fileList || []).slice(0, 20); // hard cap
    if (!selected.length) return;
    const newItems = await Promise.all(
      selected.map(async (f, i) => ({
        id: `${Date.now()}-${i}`,
        fileName: f.name,
        preview: await fileToDataUrl(f),
        title: f.name.replace(/\.[^.]+$/, ""),
        status: "idle",
        error: "",
      }))
    );
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleFileInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  // ── drag / drop zone ─────────────────────────────────────────────────────

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  // ── per-item actions ─────────────────────────────────────────────────────

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const rotateItem = useCallback(async (id, direction) => {
    setRotating(id);
    try {
      const item = items.find((it) => it.id === id);
      if (!item) return;
      const rotated = await rotateDataUrl(item.preview, direction);
      updateItem(id, { preview: rotated });
    } catch { /* ignore */ }
    finally { setRotating(null); }
  }, [items, updateItem]);

  // ── upload ───────────────────────────────────────────────────────────────

  const anyUploading = items.some((it) => it.status === "uploading");
  const pendingItems = items.filter((it) => it.status === "idle" || it.status === "error");

  const handleUpload = async () => {
    if (!pendingItems.length) return;
    setGlobalMsg("");

    // Mark all pending as uploading
    setItems((prev) =>
      prev.map((it) =>
        it.status === "idle" || it.status === "error"
          ? { ...it, status: "uploading", error: "" }
          : it
      )
    );

    // Upload in parallel — one request per file (avoids body-size limits)
    const results = await Promise.allSettled(
      pendingItems.map((item) =>
        uploadOne({
          preview: item.preview,
          fileName: item.fileName,
          category,
          title: item.title || item.fileName.replace(/\.[^.]+$/, ""),
        }).then(() => ({ id: item.id, ok: true }))
          .catch((err) => ({ id: item.id, ok: false, error: err.message }))
      )
    );

    let done = 0, failed = 0;
    results.forEach((r) => {
      const val = r.value;
      if (val.ok) {
        updateItem(val.id, { status: "done" });
        done++;
      } else {
        updateItem(val.id, { status: "error", error: val.error });
        failed++;
      }
    });

    setGlobalMsg(
      failed === 0
        ? `✅ ${done} image${done !== 1 ? "s" : ""} uploaded successfully!`
        : `⚠️ ${done} uploaded, ${failed} failed — retry failed ones below.`
    );

    // If all succeeded, redirect after a short delay
    if (failed === 0) {
      setTimeout(() => router.push("/admin/gallery"), 1500);
    }
  };

  // ── render ────────────────────────────────────────────────────────────────

  const hasItems = items.length > 0;
  const allDone = hasItems && items.every((it) => it.status === "done");

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back link */}
      <Link href="/admin/gallery"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#7A0C0C]">
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </Link>

      <m.h1
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 dark:text-white">
        Upload Images
      </m.h1>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Category <span className="text-slate-400">(applies to all images in this batch)</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-56 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        >
          {DEFAULT_GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full py-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center
                    gap-3 cursor-pointer transition-all duration-200
                    ${dragOver
            ? "border-[#7A0C0C] bg-red-50 scale-[1.01]"
            : "border-slate-300 dark:border-slate-600 hover:border-[#7A0C0C] hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
      >
        <ImagePlus className={`w-10 h-10 transition-colors ${dragOver ? "text-[#7A0C0C]" : "text-slate-400"}`} />
        <div className="text-center">
          <p className={`font-medium transition-colors ${dragOver ? "text-[#7A0C0C]" : "text-slate-500 dark:text-slate-400"}`}>
            {dragOver ? "Drop images here" : "Click or drag & drop images"}
          </p>
          <p className="text-xs text-slate-400 mt-1">Select up to 20 images at once · JPG, PNG, WebP, GIF</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Global result message */}
      <AnimatePresence>
        {globalMsg && (
          <m.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`px-4 py-3 rounded-xl text-sm font-medium
              ${globalMsg.startsWith("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"}`}
          >
            {globalMsg}
          </m.div>
        )}
      </AnimatePresence>

      {/* Image list */}
      <AnimatePresence>
        {hasItems && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {items.length} image{items.length !== 1 ? "s" : ""} selected
              </p>
              {!allDone && (
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {items.map((item) => {
              const { icon: StatusIcon, color, label } = STATUS_UI[item.status];
              return (
                <m.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex items-center gap-4 p-3 rounded-xl border bg-white dark:bg-slate-800 transition-all
                    ${item.status === "done" ? "border-green-200 bg-green-50 dark:bg-green-900/10" : ""}
                    ${item.status === "error" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : ""}
                    ${item.status === "idle" || item.status === "uploading" ? "border-slate-200 dark:border-slate-700" : ""}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                    {/* Uploading shimmer */}
                    {item.status === "uploading" && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Title input */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={item.title}
                      disabled={item.status !== "idle" && item.status !== "error"}
                      onChange={(e) => updateItem(item.id, { title: e.target.value })}
                      placeholder="Image title"
                      className="w-full text-sm font-medium bg-transparent border-b border-slate-200
                                 dark:border-slate-600 focus:outline-none focus:border-[#7A0C0C]
                                 text-slate-800 dark:text-white py-0.5 disabled:opacity-60"
                    />
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.fileName}</p>
                    {item.error && (
                      <p className="text-xs text-red-500 mt-0.5">{item.error}</p>
                    )}
                  </div>

                  {/* Rotate buttons (idle only) */}
                  {(item.status === "idle" || item.status === "error") && (
                    <div className="flex gap-1 shrink-0">
                      <button type="button" title="Rotate left"
                        disabled={rotating === item.id}
                        onClick={() => rotateItem(item.id, "left")}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200
                                   dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300
                                   disabled:opacity-40 transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" title="Rotate right"
                        disabled={rotating === item.id}
                        onClick={() => rotateItem(item.id, "right")}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200
                                   dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300
                                   disabled:opacity-40 transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Status icon or remove button */}
                  <div className="shrink-0">
                    {item.status === "uploading" ? null :
                      item.status === "done" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                        item.status === "error" ? <AlertCircle className="w-5 h-5 text-red-500" /> : (
                          <button type="button" onClick={() => removeItem(item.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50
                                   dark:hover:bg-red-900/20 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                  </div>
                </m.div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {hasItems && !allDone && (
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={anyUploading || pendingItems.length === 0}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7A0C0C] text-white
                       font-semibold hover:bg-[#5a0909] disabled:opacity-50 transition-colors"
          >
            {anyUploading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
              : <><Upload className="w-4 h-4" /> Upload {pendingItems.length} Image{pendingItems.length !== 1 ? "s" : ""}</>
            }
          </button>
          <Link href="/admin/gallery"
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600
                       text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50
                       dark:hover:bg-slate-800 transition-colors">
            Cancel
          </Link>
        </div>
      )}

      {/* All done — redirect prompt */}
      {allDone && (
        <div className="flex gap-3">
          <Link href="/admin/gallery"
            className="px-6 py-2.5 rounded-xl bg-[#7A0C0C] text-white font-semibold hover:bg-[#5a0909] transition-colors">
            View Gallery
          </Link>
          <button type="button" onClick={() => { setItems([]); setGlobalMsg(""); }}
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600
                       text-slate-700 dark:text-slate-300 font-medium transition-colors hover:bg-slate-50">
            Upload More
          </button>
        </div>
      )}
    </div>
  );
}
