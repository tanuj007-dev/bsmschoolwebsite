"use client";

import React from "react";
import { m } from "framer-motion";
import {
  FileText,
  Waypoints,
  FileCheck,
  MonitorPlay,
  Trophy,
} from "lucide-react";
import { RiWhatsappFill } from "react-icons/ri";

/* ---------------- Config ---------------- */
const admissionLine = "Admissions Open Till May 31";

/* ---------------- Features ---------------- */
const FEATURES = [
  { icon: FileText, text: "A future-ready CBSE curriculum" },
  { icon: Waypoints, text: "Stream-specific guidance for Class 11 & 12" },
  { icon: FileCheck, text: "Support for competitive exams (NEET, JEE, CUET)" },
  { icon: MonitorPlay, text: "Science, Robotics & AI Labs" },
  { icon: Trophy, text: "Leadership & extracurricular excellence" },
];

/* ---------------- Fast Animations ---------------- */
const sectionAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "917303061386";
    const message =
      "Hello, I want to know more about Admissions at BSM Public School.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <m.section
      variants={sectionAnim}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full bg-[#7A0C0C] py-14 px-4 md:px-8 overflow-hidden"
    >
      <div className="container-wide flex flex-col items-center text-center">

        {/* ---------- Header ---------- */}
        <m.div variants={itemAnim} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-3">
            Why Choose B.S.M Public School?
          </h2>
          <p className="text-[#D4AF37] font-bold text-xs md:text-sm tracking-wide uppercase">
            Ranked Among North Delhi&apos;s Finest CBSE Schools
          </p>
        </m.div>

        {/* ---------- Features Grid ---------- */}
        <m.div
          variants={sectionAnim}
          className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 w-full mb-14"
        >
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            const centerItem = index === 4;

            return (
              <m.div
                key={index}
                variants={itemAnim}
                whileHover={{ y: -4 }}
                className={`flex flex-col items-center gap-3 group
                ${centerItem ? "col-span-2 lg:col-span-1 justify-self-center" : ""}`}
              >
                <div
                  className="w-16 h-16 rounded-xl border border-white/20 bg-white/5
                  flex items-center justify-center text-[#D4AF37]
                  group-hover:bg-[#D4AF37] group-hover:text-[#7A0C0C]
                  transition-all duration-300 shadow-md group-hover:shadow-xl"
                >
                  <Icon size={30} strokeWidth={1.6} />
                </div>

                <p className="text-white/90 text-xs md:text-sm font-medium leading-snug max-w-[170px]">
                  {item.text}
                </p>
              </m.div>
            );
          })}
        </m.div>

        {/* ---------- CTA ---------- */}
        <m.div
          variants={itemAnim}
          whileHover={{ scale: 1.015 }}
          className="w-full md:w-auto flex flex-col md:flex-row items-center gap-5
          bg-black/25 px-6 py-6 md:py-4 rounded-2xl md:rounded-full
          border border-white/10 backdrop-blur-sm shadow-xl"
        >
          <div className="text-center md:text-left">
            <h3 className="text-sm md:text-base text-white font-medium">
              {admissionLine}
              <span className="hidden md:inline mx-2 text-[#D4AF37]">|</span>
              <span className="block md:inline text-white/85 text-xs md:text-base">
                Pre-Nursery to Grade 12
              </span>
            </h3>
          </div>

          <m.button
            onClick={handleWhatsAppClick}
            whileTap={{ scale: 0.94 }}
            className="bg-[#D4AF37] hover:bg-[#fff0c0]
            text-[#7A0C0C] font-bold text-sm px-8 py-3 md:py-2
            rounded-xl md:rounded-full shadow-md hover:shadow-lg
            transition-all flex items-center gap-2"
          >
            <RiWhatsappFill size={20} />
            Enroll Now
          </m.button>
        </m.div>

      </div>
    </m.section>
  );
}
