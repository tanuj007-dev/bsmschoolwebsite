"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { ArrowLeft, Upload, RotateCw, RotateCcw } from "lucide-react";
import { DEFAULT_GALLERY_CATEGORIES } from "../../../data/seedGallery";
import Toast from "../../components/Toast";

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

/**
 * Rotate an image data URL by 90 degrees. Returns a new data URL.
 * @param {string} dataUrl - image data URL
 * @param {'left'|'right'} direction - 'right' = 90° clockwise, 'left' = 90° counter-clockwise
 */
function rotateDataUrl(dataUrl, direction) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const deg = direction === "right" ? 90 : -90;
      if (deg === 90 || deg === -270) {
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(canvas.width, 0);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);
      } else {
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(0, canvas.height);
        ctx.rotate((-90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);
      }
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export default function UploadGalleryPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState("Events");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [rotatingIndex, setRotatingIndex] = useState(null);

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const rotatePreview = useCallback(async (index, direction) => {
    setRotatingIndex(index);
    try {
      const newUrl = await rotateDataUrl(previews[index], direction);
      setPreviews((p) => p.map((url, i) => (i === index ? newUrl : url)));
    } catch {
      showToast("Failed to rotate image.");
    } finally {
      setRotatingIndex(null);
    }
  }, [previews, showToast]);

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

    try {
      const formData = new FormData();
      for (let i = 0; i < previews.length; i++) {
        const dataUrl = previews[i];
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const name = files[i]?.name || `image-${i + 1}.jpg`;
        formData.append("file", blob, name);
      }
      formData.set("category", category);
      formData.set("title", title);
      formData.set("desc", desc);

      const apiRes = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
        cache: "no-store",
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        setFiles([]);
        setPreviews([]);
        setTitle("");
        setDesc("");
        showToast(`Uploaded ${data.added} image(s). They will appear for all visitors.`);
        router.push("/admin/gallery");
        return;
      }

      if (apiRes.status === 401) {
        showToast("Please log in again.");
        setUploading(false);
        return;
      }
      if (apiRes.status === 503) {
        const err = await apiRes.json().catch(() => ({}));
        showToast(err.error || "Gallery storage not configured. Add BLOB_READ_WRITE_TOKEN on Vercel.");
        setUploading(false);
        return;
      }
      const err = await apiRes.json().catch(() => ({}));
      showToast(err.error || "Upload failed");
    } catch {
      showToast("Upload failed");
    }
    setUploading(false);
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

      <m.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 dark:text-white"
      >
        Upload Images
      </m.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Images (uploaded to Vercel Blob and shown on gallery page)</label>
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
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    title="Rotate left"
                    onClick={() => rotatePreview(i, "left")}
                    disabled={rotatingIndex === i}
                    className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Rotate right"
                    onClick={() => rotatePreview(i, "right")}
                    disabled={rotatingIndex === i}
                    className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white disabled:opacity-50"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => removePreview(i)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                {rotatingIndex === i && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-white text-sm font-medium">Rotating...</span>
                  </div>
                )}
              </div>
            ))}
          </m.div>
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

      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, visible: false }))}
        variant="warning"
      />
    </div>
  );
}
