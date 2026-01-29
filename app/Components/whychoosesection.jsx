"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Waypoints,
  FileCheck,
  MonitorPlay,
  Trophy,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    text: "A future-ready CBSE curriculum",
  },
  {
    icon: Waypoints,
    text: "Stream-specific guidance for Class 11 & 12",
  },
  {
    icon: FileCheck,
    text: "Support for competitive exams (NEET, JEE, CUET)",
  },
  {
    icon: MonitorPlay,
    text: "Fully-equipped Science, Robotics & AI Labs",
  },
  {
    icon: Trophy,
    text: "Focus on leadership & extracurriculars",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseSection = () => {
  return (
    <section className="w-full bg-[#7A0C0C] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-4xl text-white font-serif mb-2">
            Why Choose BSM Public School?
          </h2>
          <p className="text-[#D4AF37] font-bold text-xs md:text-sm tracking-wide uppercase">
            Ranked #1 Among North Delhi&apos;s Finest CBSE Schools
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-4 w-full mb-10">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            const isCenterItem = index === 4;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col items-center gap-3 group
                  ${isCenterItem ? "col-span-2 lg:col-span-1 justify-self-center" : ""}
                `}
              >
                <div className="w-14 h-14 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#7A0C0C] group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <p className="text-white/90 text-xs md:text-sm font-medium leading-snug px-1 max-w-[160px]">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full md:w-auto flex flex-col md:flex-row items-center gap-5 md:gap-8 bg-black/20 px-6 py-6 md:py-4 rounded-2xl md:rounded-full border border-white/10 backdrop-blur-sm shadow-lg"
        >
          <div className="flex flex-col md:block items-center">
            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-1 md:hidden">
              Join Us Today
            </span>
            <h3 className="text-sm md:text-base text-white/95 font-medium leading-snug max-w-[280px] md:max-w-none">
              Admissions Open For 2026–27
              <span className="hidden md:inline mx-2 text-[#D4AF37]">|</span>
              <span className="block md:inline mt-1 md:mt-0 text-white/80 md:text-white/95 text-xs md:text-base">
                Pre-Nursery To Grade 12
              </span>
            </h3>
          </div>

          <button className="w-full md:w-auto bg-[#D4AF37] hover:bg-[#fff0c0] text-[#7A0C0C] font-bold text-sm px-8 py-3 md:py-2 rounded-xl md:rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Enroll Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
