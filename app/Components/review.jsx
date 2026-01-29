"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Dr. Rohan Verma",
    relation: "Father of Ishaan Verma",
    initial: "R",
    text: "Amazing faculty and management. Regular updates, well-planned curriculum, and great attention to every student. The school’s dedication is appreciable.",
    rating: 5
  },
  {
    id: 2,
    name: "Neha Kapoor",
    relation: "Mother of Aarohi Kapoor",
    initial: "N",
    text: "Very satisfied with the teaching quality and infrastructure. My child loves going to school every day and enjoys learning in a fun way.",
    rating: 5
  },
  {
    id: 3,
    name: "Siddharth Jain",
    relation: "Father of Kavya Jain",
    initial: "S",
    text: "Best school in the city. Clean, safe, and motivating environment. Great balance between studies and extracurricular activities.",
    rating: 5
  },
  {
    id: 4,
    name: "Aarav Mehta",
    relation: "Father of Vihaan Mehta",
    initial: "A",
    text: "Teachers are supportive, polite, and always ready to guide. My child has shown great improvement in confidence and communication.",
    rating: 5
  },
  {
    id: 5,
    name: "Priya Sharma",
    relation: "Mother of Anaya Sharma",
    initial: "P",
    text: "Excellent focus on values and discipline. Highly recommended for parents looking for a safe and positive environment.",
    rating: 5
  },
];

const ReviewCard = ({ item }) => {
  return (
    <div className="w-[300px] bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-5 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-[#FFF5F5] text-[#7A0C0C] flex items-center justify-center font-bold text-lg border border-[#7A0C0C]/10">
            {item.initial}
          </div>
          <div>
            <h4 className="font-bold text-[#1a1a1a] text-sm leading-tight">{item.name}</h4>
            <p className="text-xs text-gray-500">{item.relation}</p>
          </div>
        </div>

        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={`${i < item.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-200 text-gray-200"}`} />
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          "{item.text}"
        </p>
      </div>
    </div>
  );
};

const TVSReviewsSection = () => {
  // Generate looped items for infinite scroll
  const items = [...reviews, ...reviews, ...reviews];

  // Animation controls
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [controls]);

  return (
    <section className="w-full bg-[#fcfcfc] py-16 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#FFF9E6] text-[#D4AF37] p-1.5 rounded-lg">
                <MessageCircle size={18} />
              </div>
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">Parents Voice</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] leading-tight">
              Loved by <span className="text-[#7A0C0C]">Parents</span>,<br /> Adored by <span className="text-[#7A0C0C]">Students</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-2xl font-bold text-[#1a1a1a]">4.8/5</p>
              <p className="text-xs text-gray-500 font-medium">Based on 120+ Reviews</p>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <button className="bg-[#7A0C0C] hover:bg-[#5E0808] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95">
              Write a Review
            </button>
          </div>
        </div>

        {/* Marquee Slider */}
        <div className="relative w-full overflow-hidden mask-linear-fade">
          <motion.div
            className="flex gap-5 w-max py-4"
            animate={controls}
            initial={{ x: 0 }}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() => controls.start({ x: "-50%", transition: { duration: 40, ease: "linear", repeat: Infinity } })}
          >
            {items.map((item, idx) => (
              <ReviewCard key={`${item.id}-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>

      </div>

      <style jsx global>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
            `}</style>
    </section>
  );
};

export default TVSReviewsSection;
