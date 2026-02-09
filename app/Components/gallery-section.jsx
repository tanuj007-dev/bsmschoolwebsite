"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, ZoomIn, Camera } from "lucide-react";
import { useGallery } from "../hooks/useGallery";
import { DEFAULT_GALLERY_CATEGORIES } from "../data/seedGallery";

const galleryCategories = ["All", ...DEFAULT_GALLERY_CATEGORIES];

const GallerySection = () => {
  const { images } = useGallery();
  const galleryPhotos = images;
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const featuredImages = galleryPhotos.slice(0, 3);
  const hasFeatured = featuredImages.length > 0;

  useEffect(() => {
    if (!hasFeatured) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredImages.length, hasFeatured]);

  const filteredPhotos = activeCategory === "All"
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === activeCategory);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentPhotoIndex = galleryPhotos.findIndex(p => p.id === selectedImage.id);
    const nextPhoto = galleryPhotos[(currentPhotoIndex + 1) % galleryPhotos.length];
    setSelectedImage(nextPhoto);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentPhotoIndex = galleryPhotos.findIndex(p => p.id === selectedImage.id);
    const prevPhoto = galleryPhotos[(currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length];
    setSelectedImage(prevPhoto);
  };

  return (
    <section className="bg-[#FFFDF9] min-h-screen relative font-sans">

      {/* 1. HERO CAROUSEL: Cinematic Look */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {!hasFeatured ? (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
            No gallery images yet.
          </div>
        ) : (
        <>
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {featuredImages[carouselIndex]?.src?.startsWith?.("data:") ? (
              <img src={featuredImages[carouselIndex].src} alt="Gallery Highlight" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
            <Image
              src={featuredImages[carouselIndex]?.src || "/gallery/event1.png"}
              alt="Gallery Highlight"
              fill
              className="object-cover"
              priority
            />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/90 via-[#2B2B2B]/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Box */}
        <div className="absolute inset-0 flex items-center px-6 md:px-20 z-10">
          <div className="max-w-3xl">
            <motion.div
              key={`badge-${carouselIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-[#A97E3C]" />
              <span className="text-[#A97E3C] text-sm md:text-base font-bold uppercase tracking-[0.25em]">
                Featured Gallery
              </span>
            </motion.div>

            <motion.h1
              key={`title-${carouselIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {featuredImages[carouselIndex]?.title}
            </motion.h1>

            <motion.p
              key={`desc-${carouselIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/80 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-8"
            >
              {featuredImages[carouselIndex]?.desc}
            </motion.p>
          </div>
        </div>

        {/* Custom Progress Indicators */}
        <div className="absolute bottom-12 left-6 md:left-20 flex gap-4 z-20">
          {featuredImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className="group relative h-1 w-16 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                className={`absolute inset-0 bg-[#A97E3C] ${idx === carouselIndex ? 'opacity-100' : 'opacity-0'}`}
                layoutId={idx === carouselIndex ? "active-indicator" : undefined}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
        </>
        )}
      </div>

      {/* 2. MAIN GALLERY SECTION */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-24">

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
                  <motion.div
                    layoutId="active-tab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7A0C0C]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative cursor-pointer block overflow-hidden rounded-sm"
                onClick={() => setSelectedImage(photo)}
              >
                {/* Image Wrapper with Scale Effect */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  {photo.src?.startsWith?.("data:") ? (
                    <img src={photo.src} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )}

                  {/* Premium Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover Border Effect */}
                  <div className="absolute inset-4 border border-white/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#A97E3C] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {photo.category}
                    </span>
                    <h3 className="text-white text-xl font-bold mb-1">{photo.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-1 opacity-80">{photo.desc}</p>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3. ULTRA PREMIUM LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#0a0a0ae6] backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-50 group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-sm font-medium tracking-widest uppercase hidden sm:block">Close</span>
              <div className="border border-white/20 rounded-full p-2 group-hover:bg-white/10 transition-colors">
                <X size={20} />
              </div>
            </button>

            {/* Navigation Left */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white hover:scale-110 transition-all p-4 hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Navigation Right */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white hover:scale-110 transition-all p-4 hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[75vh] bg-black shadow-2xl overflow-hidden rounded-sm">
                {selectedImage.src?.startsWith?.("data:") ? (
                  <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-contain" />
                ) : (
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>

              {/* Caption/Footer */}
              <div className="mt-6 text-center text-white max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-light mb-2">{selectedImage.title}</h2>
                <p className="text-white/60 text-sm md:text-base font-light tracking-wide">{selectedImage.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-[#A97E3C] text-xs font-bold uppercase tracking-[0.2em]">
                  <Camera size={14} />
                  <span>{selectedImage.category} Collection</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
