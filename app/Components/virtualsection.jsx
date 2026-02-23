"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredReels = [
  {
    id: 1,
    path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771878009/Warehouse_video_of_UPKIT-6_1_gxuirv.mp4",
    label: "Junior Wing",
    title: "Junior Building Walkthrough",
    subtitle: "Nursery – Class V  •  B.S.M Public School, Karala",
    description:
      "A warm, vibrant space designed for young learners. Our Junior Wing combines colourful, child-friendly classrooms with dedicated activity zones to nurture curiosity and confidence from the very first day of school.",
    features: [
      "Spacious, well-lit smart classrooms",
      "Dedicated play area & sandbox zone",
      "Mini library & reading corner",
      "Safe, hygienic washroom facilities",
    ],
  },
  {
    id: 2,
    path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771878736/Warehouse_video_of_UPKIT-7_1_crgqyj.mp4",
    label: "Senior Wing",
    title: "Senior Building Walkthrough",
    subtitle: "Class VI – XII  •  B.S.M Public School, Karala",
    description:
      "Purpose-built for academic excellence, our Senior Wing houses state-of-the-art laboratories, a fully equipped computer centre, and spacious classrooms that prepare students for board exams and beyond.",
    features: [
      "Physics, Chemistry & Biology labs",
      "Modern computer & IT centre",
      "Smart-board enabled classrooms",
      "Dedicated assembly & multipurpose hall",
    ],
  },
];

const localReels = [
  { id: 1, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771873067/Babbu_Maan_Ji_addressing_the_audience_at_the_Annual_Function_of_B.S.M._Public_School_Karala._An_dwsehi.mp4", title: "Cultural Performance", subtitle: "Annual Day • B.S.M Karala" },
  { id: 2, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771873268/Video-121_m8kdjg.mp4", title: "School Events", subtitle: "Highlights • Student Life" },
  { id: 3, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771873391/Video-613_xzifrj.mp4", title: "Celebrations", subtitle: "Special Events • B.S.M" },
  { id: 4, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771873685/Video-992_erdhxo.mp4", title: "Achievements", subtitle: "Excellence • Discipline • Growth" },
  { id: 5, path: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771873816/Video-78_sp7rok.mp4", title: "Life at B.S.M", subtitle: "Learning • Together" },

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
        if (entry.isIntersecting) video.play().catch(() => { });
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
        <div className="absolute bottom-0 left-0 right-0  px-5 pt-4 pb-5">
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
 * ✅ LazyYouTubeEmbed: loads iframe when in view and autoplays (muted).
 *    Autoplay requires mute for browser policy; loop + playlist for seamless repeat.
 */
const LazyYouTubeEmbed = memo(function LazyYouTubeEmbed({ video, index }) {
  const [activated, setActivated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}`;

  return (
    <m.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative aspect-video bg-gray-900">
        {activated ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        ) : (
          /* Thumbnail until in view */
          <div className="absolute inset-0">
            <Image
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
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

        {/* Featured Reels — stacked on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
          {featuredReels.map((reel, index) => (
            <div
              key={reel.id}
              className="flex flex-col sm:flex-row rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 bg-white"
            >
              {/* ── Video panel ── */}
              <div className="relative w-full sm:w-[42%] shrink-0 aspect-3/4 sm:aspect-auto sm:min-h-[400px] md:min-h-[520px]">
                <LazyReel path={reel.path} index={index} fillContainer />
              </div>

              {/* ── Content panel ── */}
              <div className="flex-1 flex flex-col justify-center px-5 py-6 sm:px-6 sm:py-7 md:px-9 md:py-9">

                {/* Wing badge */}
                <span className="inline-block self-start px-3 py-1 text-xs font-semibold rounded-full
                                 bg-[#7A0C0C] text-white tracking-wider uppercase mb-4">
                  {reel.label}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-snug mb-1">
                  {reel.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[#7A0C0C] text-xs font-medium mb-4 tracking-wide">
                  {reel.subtitle}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-4" />

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {reel.description}
                </p>

                {/* Feature bullets */}
                <ul className="space-y-2.5">
                  {reel.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-[#FFF5F5]
                                       border border-[#f5d0d0] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-[#7A0C0C]" fill="none" stroke="currentColor"
                          strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Gold accent bar */}
                <div className="h-0.5 w-full bg-linear-to-r from-[#D4AF37] to-transparent rounded-full mt-7 opacity-40" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Blinking Admissions CTA ───────────────────────────────────── */}
        <style>{`
          @keyframes blink-full {
            0%, 100% {
              background: #e00000;
              box-shadow: 0 0 0 0 rgba(220,0,0,0.8), 0 0 18px 4px rgba(220,0,0,0.5);
            }
            50% {
              background: #1a0000;
              box-shadow: 0 0 0 0 rgba(220,0,0,0);
            }
          }
          @keyframes pulse-ring {
            0%   { outline: 0px solid rgba(220,0,0,0.7); outline-offset: 0px;  }
            70%  { outline: 4px solid rgba(220,0,0,0);   outline-offset: 10px; }
            100% { outline: 4px solid rgba(220,0,0,0);   outline-offset: 10px; }
          }
          .blink-btn {
            animation: blink-full 0.8s ease-in-out infinite;
          }
        `}</style>

        {/* <div className="flex justify-center mb-12 md:mb-20">
          <a
            href="https://wa.me/917303061386"
            target="_blank"
            rel="noopener noreferrer"
            className="blink-btn inline-flex items-center gap-2 px-8 py-3 rounded-lg
                       text-white font-bold text-base tracking-wide
                       border-2 border-red-900 cursor-pointer
                       transition-transform hover:scale-105 active:scale-95"
            aria-label="Admissions Open — Enroll Now"
          >
            <span className="w-2 h-2 rounded-full bg-white inline-block shrink-0 opacity-90" />
            Admissions Open — Enroll Now
          </a>
        </div> */}

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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4">
          {localReels.map((reel, index) => (
            <LazyReel key={reel.id} path={reel.path} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
