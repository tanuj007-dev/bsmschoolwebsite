"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useMotionValue, animate } from "framer-motion";
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
      className="group shrink-0 w-[260px] sm:w-[280px] md:w-[300px]"
      ref={cardRef}
    >
      <div className="relative aspect-9/16 rounded-xl md:rounded-2xl overflow-hidden shadow-md will-change-transform">
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
          <div className="w-full h-full min-h-[280px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
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

const CARD_GAP = 32;
const CARD_WIDTH_MOBILE = 260 + CARD_GAP;
const CARD_WIDTH_DESKTOP = 300 + CARD_GAP;

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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
    const width = trackWidthRef.current || (trackRef.current ? trackRef.current.scrollWidth / 2 : 1);
    const currentX = x.get();
    let newX = direction === "left" ? currentX + cardWidth : currentX - cardWidth;
    if (width > 0) {
      newX = ((newX % width) + width) % width - width;
    }
    animate(x, newX, {
      duration: 0.45,
      ease: [0.32, 0.72, 0, 1],
      onComplete: resume,
    });
  };

  return (
    <section className="w-full py-14 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="container-wide px-4 sm:px-6 md:px-10">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#7A0C0C]">
            Premium Facilities
          </h2>
          <div className="h-[3px] w-20 bg-[#7A0C0C] mx-auto mt-4 md:mt-6 rounded-full" />
        </div>

        <div className="relative overflow-visible">
          {/* Desktop: floating left/right buttons */}
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white shadow-lg transition-all duration-200 hover:bg-[#961212] hover:scale-105 active:scale-95 active:ring-2 active:ring-[#7A0C0C] active:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white shadow-lg transition-all duration-200 hover:bg-[#961212] hover:scale-105 active:scale-95 active:ring-2 active:ring-[#7A0C0C] active:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronRight size={22} />
          </button>

          <div className="relative overflow-hidden">
            {/* Left/right fade: desktop only (hidden on mobile) */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 z-10 bg-linear-to-r from-[#fcfcfc] to-transparent hidden md:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-2 z-10 bg-linear-to-l from-[#fcfcfc] to-transparent hidden md:block"
              aria-hidden
            />
            <m.div
              ref={trackRef}
              style={{ x, willChange: "transform" }}
              className="flex gap-6 sm:gap-8 w-max"
              onHoverStart={pause}
              onHoverEnd={resume}
              transition={{ type: "tween", ease: [0.32, 0.72, 0, 1] }}
            >
              {duplicated.map((item, index) => (
                <LazyFacilityCard key={`${item.slug}-${index}`} item={item} index={index} />
              ))}
            </m.div>
          </div>

          {/* Mobile: Previous & Next buttons below carousel */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => slide("left")}
              aria-label="Previous"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 active:ring-2 active:ring-[#7A0C0C] active:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
              <ChevronLeft size={20} />
              
            </button>
            <button
              type="button"
              onClick={() => slide("right")}
              aria-label="Next"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 active:ring-2 active:ring-[#7A0C0C] active:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
               
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
