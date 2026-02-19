"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";

const youtubeVideos = [
  {
    id: 1,
    title: "Annual Day — Cultural Dance",
    subtitle: "Traditional dance • Stage performance • Annual celebration",
    videoId: "fudHB7hHBXg",
  },
  {
    id: 2,
    title: "Annual Day — Student Performance",
    subtitle: "Skit & talent • Annual function • B.S.M Karala",
    videoId: "MYcPS8llxJk",
  },
];

const localReels = [
  { id: 1, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497588/babuman1_hxg5mm.mp4", title: "Cultural Performance", subtitle: "Annual Day • B.S.M Karala" },
  { id: 2, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497619/bsmall_hmerqs.mp4", title: "School Events", subtitle: "Highlights • Student Life" },
  { id: 3, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497639/celebrity_dootj1.mp4", title: "Celebrations", subtitle: "Special Events • B.S.M" },
  { id: 4, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497663/khalifirst_ftmfgn.mp4", title: "Achievements", subtitle: "Excellence • Discipline • Growth" },
  { id: 5, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497668/khalisecond_rlbepl.mp4", title: "Life at B.S.M", subtitle: "Learning • Together" },
];

/**
 * ✅ LazyReel: loads & autoplays video ONLY when it enters the viewport.
 */
const LazyReel = memo(function LazyReel({ path, index, fillContainer }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    playObserver.observe(video);
    return () => playObserver.disconnect();
  }, [isVisible]);

  return (
    <m.div
      ref={containerRef}
      initial={fillContainer ? {} : { opacity: 0, scale: 0.92 }}
      whileInView={fillContainer ? {} : { opacity: 1, scale: 1 }}
      viewport={fillContainer ? undefined : { once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: fillContainer ? 0 : index * 0.07 }}
      className={
        fillContainer
          ? "absolute inset-0 rounded-2xl overflow-hidden bg-gray-200"
          : "relative rounded-2xl overflow-hidden shadow-lg aspect-9/16 bg-gray-200"
      }
    >
      {isVisible ? (
        <video
          ref={videoRef}
          src={path}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="none"
        />
      ) : (
        <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
    </m.div>
  );
});

/** Mobile-only reel card: video + dark bottom overlay with title, subtitle, yellow accent line */
const MobileReelCard = memo(function MobileReelCard({ reel, index }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-200">
      <div className="relative aspect-9/16">
        <LazyReel path={reel.path} index={index} fillContainer />
        {/* Dark overlay at bottom — title (accent), subtitle (white), yellow line */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/85 px-5 pt-4 pb-5">
          <h3 className="text-lg font-semibold text-[#7DD3C0]" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {reel.title}
          </h3>
          <p className="text-white/90 text-sm mt-1">{reel.subtitle}</p>
          <div className="h-1 w-10 bg-[#D4AF37] rounded-full mt-3" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});

/**
 * ✅ LazyYouTubeEmbed: replaces the iframe with a click-to-load thumbnail.
 *    YouTube iframes add ~500KB+ per embed on load. This pattern (YouTube Lite)
 *    defers that until the user actually clicks play.
 */
const LazyYouTubeEmbed = memo(function LazyYouTubeEmbed({ video, index }) {
  const [activated, setActivated] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative aspect-video bg-gray-900">
        {activated ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        ) : (
          /* Thumbnail — clicks trigger real embed */
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label={`Play ${video.title}`}
          >
            {/* YouTube thumbnail — Next/Image with AVIF/WebP */}
            <Image
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-7 h-7 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#1a1a1a]">{video.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{video.subtitle}</p>
      </div>
    </m.div>
  );
});

export default function VirtualCampusSection() {
  const mobileReelRef = useRef(null);
  const [reelIndex, setReelIndex] = useState(0);

  const scrollToReel = (direction) => {
    const N = localReels.length;
    const next =
      direction === "next"
        ? (reelIndex + 1) % N
        : (reelIndex - 1 + N) % N;
    setReelIndex(next);
    const el = mobileReelRef.current;
    if (el) {
      const card = el.querySelector(`[data-reel-index="${next}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  return (
    <section className="w-full bg-[#fafafa] py-14 md:py-24">
      <div className="container-wide px-4 md:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <m.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#7A0C0C] mb-4 md:mb-6"
          >
            Life at <span className="text-[#7A0C0C]">B.S.M</span>
          </m.h2>
          <p className="text-gray-600 text-sm md:text-base">
            Watch our students grow, learn and celebrate together.
          </p>
        </div>

        {/* YouTube Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {youtubeVideos.map((video, index) => (
            <LazyYouTubeEmbed key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Reels heading */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#7A0C0C] flex items-center gap-3 md:gap-5">
            Latest <span className="text-[#7A0C0C]">Highlights</span>
            <a
              href="https://www.instagram.com/bsmpublicschoolkarala/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group hover:opacity-90 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <svg width="0" height="0" className="absolute">
                <linearGradient id="virt-ig-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop stopColor="#833ab4" offset="0%" />
                  <stop stopColor="#fd1d1d" offset="50%" />
                  <stop stopColor="#fcb045" offset="100%" />
                </linearGradient>
              </svg>
              <FaInstagram
                size={32}
                className="md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                style={{ fill: "url(#virt-ig-gradient)" }}
              />
            </a>
          </h3>
        </div>

        {/* Mobile only: card carousel with dark overlay + Prev/Next below */}
        <div className="md:hidden">
          <div
            ref={mobileReelRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {localReels.map((reel, index) => (
              <div key={reel.id} data-reel-index={index} className="snap-center flex-[0_0_85%] min-w-0">
                <MobileReelCard reel={reel} index={index} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => scrollToReel("prev")}
              aria-label="Previous"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
              <ChevronLeft size={20} />
              
            </button>
            <button
              type="button"
              onClick={() => scrollToReel("next")}
              aria-label="Next"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
               
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop: Reels grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4">
          {localReels.map((reel, index) => (
            <LazyReel key={reel.id} path={reel.path} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
