"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { m, useMotionValue, animate } from "framer-motion";

const awardsSliderData = [
  { id: 1, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495688/100_attendance.JPG_whk1sp.webp", achievement: "100% Attendance", category: "Attendance Achievement" },
  { id: 2, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495722/Academics_1st_position.JPG_okyr9v.webp", achievement: "Academics 1st Position", category: "Academic Achievement" },
  { id: 3, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495722/Academics_2nd_position.JPG_oohxo7.webp", achievement: "Academics 2nd Position", category: "Academic Achievement" },
  { id: 4, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495720/Academics_3rd_position.JPG_y0myck.webp", achievement: "Academics 3rd Position", category: "Academic Achievement" },
  { id: 5, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771871599/Scholarship.JPG_2_fbuymk.webp", achievement: "Scholarship", category: "Academic Achievement" },
  { id: 6, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771871697/Sports.JPG_1_b9gkzq.jpg", achievement: "Sports Awards", category: "Sports Achievement" },
  { id: 7, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771875739/IMG-20260103-WA0087.jpg_rug3cv.jpg", achievement: "Sports Achievement", category: "Sports Achievement" },
];

const duplicated = [...awardsSliderData, ...awardsSliderData];
const CARD_GAP = 24;
const CARD_WIDTH_MOBILE = 260 + CARD_GAP;
const CARD_WIDTH_DESKTOP = 300 + CARD_GAP;

/** Card that only loads the image when it enters (or is near) the viewport */
function LazyAchievementCard({ item }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "150px 0px", threshold: 0.01 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500">
      <div className="relative h-[200px] sm:h-[240px] md:h-[260px] w-full bg-gray-100">
        {shouldLoad ? (
          <Image
            src={item.image}
            alt={item.achievement}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
        )}

      </div>
      <div className="bg-[#7A0C0C] p-4 md:p-6 text-center">
        {item.rank && <p className="text-white/80 text-sm mb-2">{item.rank}</p>}
        <h3 className="text-white text-lg md:text-xl font-semibold">{item.achievement}</h3>
      </div>
    </div>
  );
}

export default function AwardsAchievementsSlider() {
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
      duration: 35,
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
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      onComplete: resume,
    });
  };

  return (
    <section className="bg-[#F9F5F5] py-14 sm:py-20 px-3 sm:px-4">
      <div className="container-wide">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#7A0C0C]">
            Awards & Achievements
          </h2>
          <div className="w-20 h-[3px] bg-[#7A0C0C] mx-auto mt-3 md:mt-4" />
        </div>

        <div className="relative">
          {/* Desktop: floating left/right buttons */}
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white hover:bg-[#961212] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white hover:bg-[#961212] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronRight size={22} />
          </button>

          <div className="overflow-hidden">
            <m.div
              ref={trackRef}
              style={{ x, willChange: "transform", backfaceVisibility: "hidden" }}
              className="flex gap-6 w-max"
              onHoverStart={pause}
              onHoverEnd={resume}
            >
              {duplicated.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="shrink-0 w-[260px] sm:w-[280px] md:w-[390px]"
                >
                  <LazyAchievementCard item={item} />
                </div>
              ))}
            </m.div>
          </div>

          {/* Mobile: Previous & Next below slider */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => slide("left")}
              aria-label="Previous"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => slide("right")}
              aria-label="Next"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
