"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AppreciationSlider = () => {
  const slides = [
    {
      id: 1,
      video: "/seniorsection2.mp4",
      title: "Senior Wing",
      text:
        "At B.S.M. Public School, the Senior Wing focuses on academic excellence, leadership development, and career readiness. We provide a disciplined yet inspiring environment that empowers students with critical thinking, confidence, and strong ethical values.",
      designation: "Advanced Academics • Leadership • Career Focus",
    },
    {
      id: 2,
      video: "/juniorsection2.mp4",
      title: "Junior Wing",
      text:
        "At B.S.M. Public School, the Foundational Stage is a joyful and nurturing beginning to a child’s learning journey. We follow a play-based, activity-oriented approach that supports children’s physical, cognitive, social, emotional, and language development.",
      designation: "Foundation • Activity Learning • Value Education",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  const safeSlide = slides[currentSlide];

  return (
    <section className="w-full py-14 bg-gradient-to-br from-[#fdfbf7] via-[#f5f0e1] to-[#fdfbf7] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[520px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* MEDIA SECTION */}
          <div className="relative md:w-[50%] h-[260px] md:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.video
                key={safeSlide.id}
                ref={videoRef}
                src={safeSlide.video}
                autoPlay
                muted
                playsInline
                onEnded={nextSlide}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#7A0C0C] shadow-lg">
              {safeSlide.title}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="relative md:w-[50%] p-8 md:p-14 flex flex-col justify-between">
            <Quote
              size={110}
              className="absolute top-10 left-10 text-gray-100 hidden md:block"
              strokeWidth={0}
              fill="currentColor"
            />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={safeSlide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="relative z-10"
              >
                {/* Sans-serif modern paragraph */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                  “{safeSlide.text}”
                </p>

                <h4 className="text-[#1a2b5d] font-bold uppercase tracking-widest text-sm">
                  {safeSlide.title}
                </h4>

                <p className="text-gray-500 text-xs mt-2 tracking-wide">
                  {safeSlide.designation}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CONTROLS */}
            <div className="flex justify-end mt-8 gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-all duration-300 hover:scale-105"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppreciationSlider;
