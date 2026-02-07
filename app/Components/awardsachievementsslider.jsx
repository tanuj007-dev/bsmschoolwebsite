"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Medal, Trophy, Star } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";

const awardsSliderData = [
  {
    id: 1,
    image: "/images/indian_student_girl_award_1769561878948.png",
    name: "Aanya Sharma",
    rank: "International Rank - 1",
    achievement: "Gold Medal in IMO Olympiad",
    category: "Academic Excellence"
  },
  {
    id: 2,
    image: "/images/indian_student_girl_award_1769561878948.png",
    name: "Aarav Gupta",
    rank: "Zonal Rank - 1",
    achievement: "National Spelling Bee Champion",
    category: "Literary Arts"
  },
  {
    id: 3,
    image: "/images/indian_student_girl_award_1769561878948.png",
    name: "Vihaan Singh",
    rank: "State Champion",
    achievement: "Best Athlete of the Year",
    category: "Sports Achievement"
  },
  {
    id: 4,
    image: "/images/indian_student_girl_award_1769561878948.png",
    name: "Ishita Patel",
    rank: "National Rank - 5",
    achievement: "Science Exhibition Winner",
    category: "Innovation"
  },
  {
    id: 5,
    image: "/images/indian_student_girl_award_1769561878948.png",
    name: "Kabir Mehta",
    rank: "District Topper",
    achievement: "100% in Mathematics",
    category: "Academic Excellence"
  },
];

const AchievementCard = ({ item }) => (
  <div className="relative w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
    {/* Category Badge */}
    <div className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-[#1a0505] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
      {item.category}
    </div>

    {/* Image Container */}
    <div className="relative h-[280px] w-full overflow-hidden bg-gray-100">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b5d] via-transparent to-transparent opacity-90" />
    </div>

    {/* Card Content mimicking the poster style */}
    <div className="relative -mt-16 p-4 z-20">
      <div className="bg-[#7A0C0C] p-4 rounded-xl shadow-lg">
        {/* Yellow Name Tag */}
        <div className="bg-[#FFD700] text-[#7A0C0C] font-bold text-center py-1.5 rounded uppercase tracking-wide text-sm mb-3 shadow-sm transform -translate-y-6 mx-auto w-[90%] border-b-2 border-[#b8860b]">
          {item.name}
        </div>

        <div className="text-center -mt-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy size={14} className="text-[#D4AF37]" />
            <p className="text-white text-xs font-semibold tracking-wide uppercase">{item.rank}</p>
          </div>

          <h3 className="text-white text-lg font-serif font-bold leading-tight mb-2">
            {item.achievement}
          </h3>

          <div className="w-12 h-0.5 bg-[#D4AF37]/50 mx-auto rounded-full" />

          <p className="text-white/70 text-[10px] mt-2 font-light">
            BSM Public School Hall of Fame 2025
          </p>
        </div>
      </div>
    </div>
  </div>
);


export default function AwardsAchievementsSlider() {
  const [itemsToShow, setItemsToShow] = useState(3);
  const CLONES = 2; // Reduced clones for simplicity
  const [index, setIndex] = useState(CLONES);
  const isHovered = useRef(false);
  const intervalRef = useRef(null);

  // Responsive settings
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const totalOriginal = awardsSliderData.length;
  // Create infinite loops
  const infiniteSlides = useMemo(() => {
    return [...awardsSliderData, ...awardsSliderData, ...awardsSliderData];
  }, []);

  const slideRight = () => setIndex((prev) => (prev + 1));
  const slideLeft = () => setIndex((prev) => (prev - 1));

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) slideRight();
    }, 3000); // 3 seconds
    return () => clearInterval(intervalRef.current);
  }, []);

  // Reset index to create infinite illusion
  useEffect(() => {
    if (index >= awardsSliderData.length * 2) {
      setTimeout(() => {
        setIndex(awardsSliderData.length);
      }, 300); // Wait for transition
    }
    if (index < awardsSliderData.length) {
      setTimeout(() => {
        setIndex(awardsSliderData.length * 2 - 1);
      }, 300);
    }
  }, [index, awardsSliderData.length]);


  return (
    <section className="bg-[#fcfcfc] py-20 px-4 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
            Excellence in Action
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1a0505]">
            Awards & <span className="text-[#7A0C0C]  ">Achievements</span>
          </h2>
          
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto px-4"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
        >
          {/* Controls - Mobile friendly positioning */}
          <button
            onClick={slideLeft}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-[#1a2b5d] hover:bg-[#1a2b5d] hover:text-white transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={slideRight}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-[#1a2b5d] hover:bg-[#1a2b5d] hover:text-white transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider with padding to prevent clipping */}
          <div className="overflow-hidden py-10 -my-10">
            <motion.div
              className="flex" // Removed gap, handling spacing via padding
              animate={{ x: `-${index * (100 / itemsToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {infiniteSlides.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="shrink-0 box-border px-3 md:px-4" // Padding creates the 'gap'
                  style={{ width: `${100 / itemsToShow}%` }} // Exact percentage width
                >
                  <AchievementCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
