"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";

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
  { id: 1, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497588/babuman1_hxg5mm.mp4" },
  { id: 2, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497619/bsmall_hmerqs.mp4" },
  { id: 3, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497639/celebrity_dootj1.mp4" },
  { id: 4, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497663/khalifirst_ftmfgn.mp4" },
  { id: 5, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771497668/khalisecond_rlbepl.mp4" },
];

/**
 * ✅ LazyReel: loads & autoplays video ONLY when it enters the viewport.
 *    Prevents 5 simultaneous video downloads on page load.
 */
const LazyReel = memo(function LazyReel({ path, index }) {
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
          observer.disconnect(); // once loaded, stop observing
        }
      },
      { rootMargin: "150px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause video when it scrolls out of view to save CPU/battery
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    playObserver.observe(video);
    return () => playObserver.disconnect();
  }, [isVisible]);

  return (
    <m.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="relative rounded-2xl overflow-hidden shadow-lg aspect-9/16 bg-gray-200"
    >
      {isVisible ? (
        <video
          ref={videoRef}
          src={path}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="none"   // ✅ none = don't fetch until play() is called
        />
      ) : (
        /* Skeleton placeholder while not in viewport */
        <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
    </m.div>
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
  return (
    <section className="w-full bg-[#fafafa] py-24">
      <div className="container-wide px-4 md:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-[#7A0C0C] mb-6"
          >
            Life at <span className="text-[#7A0C0C]">B.S.M</span>
          </m.h2>
          <p className="text-gray-600 text-base">
            Watch our students grow, learn and celebrate together.
          </p>
        </div>

        {/* YouTube Section — thumbnail-first pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {youtubeVideos.map((video, index) => (
            <LazyYouTubeEmbed key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Reels heading */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-3xl font-semibold text-[#7A0C0C] flex items-center gap-5">
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
                size={40}
                style={{ fill: "url(#virt-ig-gradient)" }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </h3>
        </div>

        {/* Reels Grid — viewport lazy-loaded */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {localReels.map((reel, index) => (
            <LazyReel key={reel.id} path={reel.path} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
