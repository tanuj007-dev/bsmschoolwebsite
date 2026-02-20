"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { useGalleryStore } from "../store/galleryStore";

const galleryCategories = ["Events", "Sports"];

// Normalize src so relative/bare filenames work: /gallery/xxx or full URL only.
function normalizePhotoSrc(src) {
  if (!src || typeof src !== "string") return null;
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
  if (s.startsWith("/")) return s;
  return `/gallery/${s}`;
}

// Vercel Blob URLs must use unoptimized (domain not in remotePatterns or varies per store).
function isBlobUrl(src) {
  return typeof src === "string" && src.includes("blob.vercel-storage.com");
}

const GalleryCard = memo(function GalleryCard({ photo, index, src, useBlobUnoptimized }) {
  const [failed, setFailed] = useState(false);
  if (!src) {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3) }}
        className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-md aspect-4/3 bg-gray-200 flex items-center justify-center"
      >
        <span className="text-gray-400 text-sm">No image</span>
      </m.div>
    );
  }
  if (failed) {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3) }}
        className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-md aspect-4/3 bg-gray-200 flex items-center justify-center"
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </m.div>
    );
  }
  const isDataUrl = src.startsWith("data:");
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3) }}
      className="group relative block overflow-hidden rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 aspect-4/3"
    >
      <div className="absolute inset-0 overflow-hidden bg-gray-100 flex items-center justify-center">
        {isDataUrl ? (
          <img
            src={src}
            alt={photo.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        ) : (
          <Image
            src={src}
            alt={photo.title}
            fill
            loading="lazy"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            unoptimized={useBlobUnoptimized}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      <div className="absolute inset-4 border border-white/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
    </m.div>
  );
});

const GallerySection = memo(function GallerySection() {
  const storeImages = useGalleryStore((state) => state.images);
  const getImages = useGalleryStore((state) => state.getImages);
  const hydrate = useGalleryStore((state) => state.hydrate);
  const [apiPhotos, setApiPhotos] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Events");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setApiPhotos(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const galleryPhotos = apiPhotos !== null ? apiPhotos : (storeImages?.length ? storeImages : (getImages?.() ?? []));
  const filteredPhotos = useMemo(
    () => galleryPhotos.filter((photo) => photo.category === activeCategory),
    [galleryPhotos, activeCategory]
  );

  return (
    <section className="bg-[#FFFDF9] min-h-screen relative font-sans">
      <div className="container-wide px-4 sm:px-8 py-24">

        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-16 border-b border-gray-200 pb-8">
          <div className="max-w-2xl">
            <span className="text-[#7A0C0C] font-bold tracking-[0.2em] uppercase text-sm block mb-3">
              Our Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
              Capturing <span className="  font-serif text-[#A97E3C]">Moments</span>
            </h2>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm md:text-base font-medium tracking-wide transition-colors relative pb-2 ${activeCategory === cat ? "text-[#7A0C0C]" : "text-gray-400 hover:text-[#2B2B2B]"
                  }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7A0C0C]"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - all cards equal size (4:3); object-contain = no crop */}
        <m.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          <AnimatePresence mode="sync">
            {filteredPhotos.map((photo, index) => {
              const src = normalizePhotoSrc(photo.src);
              const useBlobUnoptimized = src && isBlobUrl(photo.src);
              return (
                <GalleryCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  src={src}
                  useBlobUnoptimized={useBlobUnoptimized}
                />
              );
            })}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
});

export default GallerySection;
