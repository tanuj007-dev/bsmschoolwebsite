"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { facilityCards } from "./school-features";

/** 12 amenities reels – same as amenities page, for carousel */
const facilities = facilityCards.map((card, i) => ({
  id: i + 1,
  title: card.title,
  slug: card.slug,
  video: card.video,
}));

/** Lazy-load video only when card is in/near viewport. Keeps carousel light. */
function LazyFacilityCard({ item, index }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href={`/amenities/${item.slug}`}
      className="group shrink-0 w-[300px]"
      ref={cardRef}
    >
      <div className="relative aspect-9/16 rounded-2xl overflow-hidden shadow-md will-change-transform">
        {shouldLoad ? (
          <video
            src={item.video}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div
            className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm"
            style={{ minHeight: "533px" }}
          >
            <span className="opacity-0">{item.title}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-4 px-5 transition-opacity duration-300 group-hover:bg-black/70">
          <h3 className="text-lg font-sans font-medium text-white">{item.title}</h3>
          <div className="h-[2px] w-10 bg-[#D4AF37] mt-2 rounded-full" />
        </div>
      </div>
    </Link>
  );
}

export default function PremiumFacilitiesSection() {
  const duplicated = [...facilities, ...facilities];
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  const trackWidthRef = useRef(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const width = trackRef.current.scrollWidth / 2;
    trackWidthRef.current = width;
    animationRef.current = animate(x, -width, {
      ease: "linear",
      duration: 40,
      repeat: Infinity,
    });
    return () => animationRef.current?.stop();
  }, [x]);

  const pause = () => animationRef.current?.pause();
  const resume = () => animationRef.current?.play();

  const slide = (direction) => {
    pause();
    const cardWidth = 300 + 32;
    const width = trackWidthRef.current || (trackRef.current ? trackRef.current.scrollWidth / 2 : 1);
    const currentX = x.get();
    let newX = direction === "left" ? currentX + cardWidth : currentX - cardWidth;
    // Wrap so carousel loops: keep x in [-width, 0]
    if (width > 0) {
      newX = ((newX % width) + width) % width - width;
    }
    animate(x, newX, {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      onComplete: resume,
    });
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#1a2b5d]">
            Premium Facilities
          </h2>
          <div className="h-[3px] w-20 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
        </div>

        <div className="relative overflow-visible">
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Scroll left"
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#1a2b5d] text-white shadow-lg transition-all duration-200 hover:bg-[#8B0000] hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Scroll right"
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#1a2b5d] text-white shadow-lg transition-all duration-200 hover:bg-[#8B0000] hover:scale-105 active:scale-95"
          >
            <ChevronRight size={22} />
          </button>

          <div className="relative overflow-hidden select-none">
            {/* Left edge gradient */}
            <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-5 sm:w-6 z-10 bg-gradient-to-r from-[#fcfcfc] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 sm:w-6 z-10 bg-gradient-to-l from-[#fcfcfc] to-transparent"
            aria-hidden
          />
            <motion.div
              ref={trackRef}
              style={{ x, willChange: "transform" }}
              className="flex gap-8 w-max"
              onHoverStart={pause}
              onHoverEnd={resume}
              transition={{ type: "tween", ease: "linear" }}
            >
              {duplicated.map((item, index) => (
                <LazyFacilityCard key={`${item.slug}-${index}`} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
