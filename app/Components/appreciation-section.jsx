"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AppreciationSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
      text: "The dedication of the teachers here is truly inspiring. Beyond academics, they build confidence, discipline, and values in every child. This school is not just shaping students for exams, but preparing them for life.",
      author: "Mr. Anand Narasimhan",
      designation: "Managing Editor, CNN",
    },
   
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
      text: "What stands out the most is the balance between excellence and empathy. The teachers creates a space where students feel safe, motivated, and supported—an essential foundation for real success.",
      author: "Mr. Rohan Mehta",
      designation: "Parent & Education Advocate",
    },
    
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
      text: "A school becomes exceptional when it invests in character building alongside academics. The values taught here—respect, responsibility, and resilience—are the true gifts students will carry for life.",
      author: "Dr. Michael Brown",
      designation: "Education Consultant",
    },
  ];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full py-16 overflow-hidden bg-gradient-to-br from-[#fdfbf7] via-[#f5f0e1] to-[#fdfbf7]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

        {/* Slider Container */}
        <div className="relative w-full bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row h-[400px] border border-white/50 ring-1 ring-gray-100">

          {/* Left: Image Side */}
          <div className="relative w-full md:w-[40%] h-[200px] md:h-auto overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slides[currentSlide].image}
                  alt="Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Text Side */}
          <div className="relative w-full md:w-[60%] p-8 md:p-10 flex flex-col justify-center bg-white">

            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-[#f7f7f7]">
              <Quote size={80} strokeWidth={0} fill="currentColor" />
            </div>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="relative z-10 flex flex-col justify-center h-full"
              >
                <p className="font-serif text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic line-clamp-4">
                  "{slides[currentSlide].text}"
                </p>

                <div>
                  <h4 className="text-[#1a2b5d] font-bold text-base uppercase tracking-wide">
                    {slides[currentSlide].author}
                  </h4>
                  <p className="text-gray-500 text-xs font-medium mt-0.5">
                    {slides[currentSlide].designation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A0C0C] hover:border-[#7A0C0C] hover:bg-[#fff5f5] transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A0C0C] hover:border-[#7A0C0C] hover:bg-[#fff5f5] transition-all"
                aria-label="Next"
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
