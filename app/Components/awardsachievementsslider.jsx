"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "framer-motion";

const awardsSliderData = [
  { id: 1, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495688/100_attendance.JPG_whk1sp.webp", achievement: "100% Attendance", category: "Attendance Achievement" },
  { id: 2, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495722/Academics_1st_position.JPG_okyr9v.webp", achievement: "Academics 1st Position", category: "Academic Achievement" },
  { id: 3, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495722/Academics_2nd_position.JPG_oohxo7.webp", achievement: "Academics 2nd Position", category: "Academic Achievement" },
  { id: 4, image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771495720/Academics_3rd_position.JPG_y0myck.webp", achievement: "Academics 3rd Position", category: "Academic Achievement" },
];

const extendedData = [...awardsSliderData, ...awardsSliderData];

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

const N = awardsSliderData.length;

export default function AwardsAchievementsSlider() {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [index, setIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const isHovered = useRef(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) setIndex((prev) => (prev + 1) % N);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Seamless loop: when we reach the end (index N), instantly reset to 0 (same visual)
  useEffect(() => {
    if (index < N) return;
    const t = setTimeout(() => {
      setNoTransition(true);
      setIndex(0);
    }, 650);
    return () => clearTimeout(t);
  }, [index]);

  // Re-enable transition after instant jump
  useEffect(() => {
    if (noTransition) {
      const t = setTimeout(() => setNoTransition(false), 50);
      return () => clearTimeout(t);
    }
  }, [noTransition]);

  const slideLeft = () => {
    if (index === 0) {
      setNoTransition(true);
      setIndex(N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false);
          setIndex(N - 1);
        });
      });
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const slideRight = () => {
    setIndex((prev) => (prev + 1) % (N + 1));
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

        <div
          className="relative"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
        >
          {/* Desktop: floating left/right buttons */}
          <button
            type="button"
            onClick={slideLeft}
            aria-label="Previous slide"
            className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white hover:bg-[#961212] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={slideRight}
            aria-label="Next slide"
            className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-[#7A0C0C] text-white hover:bg-[#961212] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
          >
            <ChevronRight size={22} />
          </button>

          <div className="overflow-hidden">
            <m.div
              className="flex"
              animate={{ x: `-${index * (100 / itemsToShow)}%` }}
              transition={{
                duration: noTransition ? 0 : 0.5,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {extendedData.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="px-2 sm:px-4 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
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
              onClick={slideLeft}
              aria-label="Previous"
              className="flex items-center gap-2 rounded-full bg-[#7A0C0C] text-white px-5 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#961212] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0C0C] focus-visible:ring-offset-2"
            >
              <ChevronLeft size={20} />
              
            </button>
            <button
              type="button"
              onClick={slideRight}
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
