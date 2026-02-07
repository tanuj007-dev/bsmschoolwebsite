"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AppreciationSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/junior-swing.jpeg",
      title: "Junior Wing",
      text:
        "At B.S.M. Public School, the Foundational Stage is a joyful and nurturing beginning to a child’s learning journey. We follow a play-based, activity-oriented approach that supports children’s physical, cognitive, social, emotional, and language development. In a safe, caring, and happy environment, we help young learners build curiosity, confidence, good habits, and strong values. By working closely with parents, we ensure that every child feels secure, loved, and excited to learn—laying a strong foundation for lifelong learning and well-being.",
      designation: "Foundation • Activity Learning • Value Education",
    },
    {
      id: 2,
      image: "/senior-wing .jpeg",
      title: "Senior Wing",
      text:
        "At B.S.M. Public School, the Foundational Stage is a joyful and nurturing beginning to a child’s learning journey. We follow a play-based, activity-oriented approach that supports children’s physical, cognitive, social, emotional, and language development. In a safe, caring, and happy environment, we help young learners build curiosity, confidence, good habits, and strong values. By working closely with parents, we ensure that every child feels secure, loved, and excited to learn—laying a strong foundation for lifelong learning and well-being.",
      designation: "Advanced Academics • Leadership • Career Focus",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const safeSlide = slides[currentSlide] || slides[0];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-[#fdfbf7] via-[#f5f0e1] to-[#fdfbf7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">

          {/* IMAGE */}
          <div className="relative md:w-[40%] h-[240px] md:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={safeSlide.id}
                src={safeSlide.image}
                alt="School Building"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />

            {/* Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-semibold text-[#7A0C0C] shadow">
              {safeSlide.title}
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative md:w-[60%] p-6 md:p-10 flex flex-col justify-between">

            <Quote
              size={90}
              className="absolute top-6 left-6 text-gray-100 hidden md:block"
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
                  x: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { duration: 0.35 },
                }}
                className="relative z-10"
              >
                <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed italic mb-6">
                  “{safeSlide.text}”
                </p>

                <h4 className="text-[#1a2b5d] font-bold uppercase tracking-wide text-sm">
                  {safeSlide.title}
                </h4>

                <p className="text-gray-500 text-xs mt-1">
                  {safeSlide.designation}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* SLIDER CONTROLS */}
            <div className="flex justify-end mt-8 gap-3">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppreciationSlider;
