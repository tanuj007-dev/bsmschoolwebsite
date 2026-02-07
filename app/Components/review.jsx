"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";

/* =======================
   REVIEWS DATA
======================= */

const reviews = [
  { id: 1, name: "Dr. Rohan Verma", relation: "Father of Ishaan", initial: "R", text: "Amazing faculty and management with great discipline.", rating: 5 },
  { id: 2, name: "Neha Kapoor", relation: "Mother of Aarohi", initial: "N", text: "My child loves going to school every day.", rating: 5 },
  { id: 3, name: "Siddharth Jain", relation: "Father of Kavya", initial: "S", text: "Best school in the city with strong values.", rating: 5 },
  { id: 4, name: "Aarav Mehta", relation: "Father of Vihaan", initial: "A", text: "Teachers are very supportive and polite.", rating: 5 },
  { id: 5, name: "Priya Sharma", relation: "Mother of Anaya", initial: "P", text: "Safe, clean and positive learning environment.", rating: 5 },
  { id: 6, name: "Rahul Gupta", relation: "Father of Arjun", initial: "R", text: "Excellent curriculum and regular parent updates.", rating: 5 },
  { id: 7, name: "Anjali Singh", relation: "Mother of Riya", initial: "A", text: "Teachers motivate students very well.", rating: 5 },
  { id: 8, name: "Vikram Malhotra", relation: "Father of Kunal", initial: "V", text: "Modern teaching methods and good infrastructure.", rating: 5 },
];

/* =======================
   REVIEW CARD
======================= */

const ReviewCard = ({ item }) => (
  <div className="w-[300px] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-full bg-[#FFF5F5] text-[#7A0C0C] flex items-center justify-center font-bold">
        {item.initial}
      </div>
      <div>
        <h4 className="text-sm font-bold text-[#1a1a1a]">{item.name}</h4>
        <p className="text-xs text-gray-500">{item.relation}</p>
      </div>
    </div>

    <div className="flex gap-1 mb-3">
      {[...Array(item.rating)].map((_, i) => (
        <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
      ))}
    </div>

    <p className="text-sm text-gray-600 leading-relaxed">
      “{item.text}”
    </p>
  </div>
);

/* =======================
   MAIN SECTION
======================= */

const TVSReviewsSection = () => {
  const controls = useAnimationControls();
  const [duration, setDuration] = useState(60); // ⭐ Normal speed (slower than before)

  const items = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, duration]);

  return (
    <section className="w-full bg-[#fcfcfc] py-16 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#FFF9E6] text-[#D4AF37] p-1.5 rounded-lg">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                Parents Voice
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">
              Loved by <span className="text-[#7A0C0C]">Parents</span>,<br />
              Adored by <span className="text-[#7A0C0C]">Students</span>
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-[#7A0C0C] text-2xl font-bold">4.8/5</p>
            <p className="text-xs text-gray-500">Based on 120+ Reviews</p>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={controls}
            onHoverStart={() => setDuration(120)} // 🐢 hover → very slow
            onHoverEnd={() => setDuration(60)}   // 🚀 hover out → normal speed
          >
            {items.map((item, index) => (
              <ReviewCard key={`${item.id}-${index}`} item={item} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TVSReviewsSection;
