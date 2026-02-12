"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  FileText,
  MonitorPlay,
  Users,
  ShieldCheck,
  Trophy,
} from "lucide-react";

/* ================= CONFIG ================= */
const ACADEMIC_YEAR = "2025–26";

/* ============== Animated List ============== */
const AnimatedVerticalList = ({ items, type }) => {
  const controls = useAnimationControls();
  const listRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.scrollHeight / 3);
    }
  }, [items]);

  useEffect(() => {
    if (!height) return;
    controls.start({
      y: [-height, 0],
      transition: {
        duration: 22,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [height, controls]);

  const tripledItems = [...items, ...items, ...items];

  return (
    <div
      className="relative h-[220px] overflow-hidden"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          y: [-height, 0],
          transition: { duration: 22, ease: "linear", repeat: Infinity },
        })
      }
    >
      <motion.div ref={listRef} animate={controls} className="flex flex-col gap-4">
        {tripledItems.map((item, idx) => (
          <div key={`${type}-${idx}`}>
            {type === "features" ? (
              <div className="flex gap-4 p-3 rounded-xl hover:bg-red-50/50 transition border border-transparent hover:border-red-100">
                <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#7A0C0C] shadow-sm">
                  {item.icon}
                </div>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ) : (
              <div className="flex gap-4 p-3 rounded-xl hover:bg-amber-50/50 transition border border-transparent hover:border-amber-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold">
                  {(idx % items.length) + 1}
                </span>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* fade masks */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

/* ============== MAIN SECTION ============== */
const TrustAndEventsSection = () => {
  const features = [
    { icon: <FileText size={16} />, text: "CBSE curriculum followed as per DOE & CBSE guidelines" },
    { icon: <MonitorPlay size={16} />, text: "Smart learning facilities & modern robotics labs" },
    { icon: <Users size={16} />, text: "Focus on academic excellence, discipline & moral values" },
    { icon: <ShieldCheck size={16} />, text: "Safe campus with 24/7 CCTV & personalized attention" },
    { icon: <Trophy size={16} />, text: "State-of-the-art sports complex & coaching" },
  ];

  const events = [
    "Annual cultural & sports activities throughout the year",
    "Active participation in zonal & inter-school competitions",
    "Notable achievements in handball at national levels",
    "Regular assemblies, exhibitions & special celebrations",
    "Admissions open for the upcoming academic session",
    "Special workshops for student skill development",
  ];

  return (
    <section className="bg-[#fcfcfc] py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* TRUST CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border overflow-hidden flex flex-col md:flex-row h-[420px] md:h-[360px]"
        >
          <div className="relative md:w-[40%] h-[180px] md:h-full">
            <img
              src="/firstkey.webp"
              className="h-full w-full object-cover"
              alt="Parents Trust"
            />
          </div>

          <div className="relative flex-1 p-6 md:p-8">
            <h3 className="text-black text-xs font-bold uppercase tracking-wider mb-4">
              Key Features
            </h3>

            <AnimatedVerticalList items={features} type="features" />

            <p className="text-[10px] text-gray-400 font-medium pt-4 mt-4 border-t">
              Updated for {ACADEMIC_YEAR}
            </p>
          </div>
        </motion.div>

        {/* EVENTS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border overflow-hidden flex flex-col md:flex-row h-[420px] md:h-[360px]"
        >
          <div className="relative md:w-[40%] h-[180px] md:h-full">
            <img
              src="/secondkey.webp"
              className="h-full w-full object-cover"
              alt="Activities"
            />
          </div>

          <div className="relative flex-1 p-6 md:p-8">
            <h3 className="text-black text-xs font-bold uppercase tracking-wider mb-4">
              Latest Updates
            </h3>

            <AnimatedVerticalList items={events} type="events" />

            {/* ✅ Added Here */}
            <p className="text-[10px] text-gray-400 font-medium pt-4 mt-4 border-t">
              Updated for {ACADEMIC_YEAR}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustAndEventsSection;
