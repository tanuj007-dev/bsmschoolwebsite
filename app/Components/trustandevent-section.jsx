"use client";

import React, { useRef, useEffect, useState, memo, useCallback } from "react";
import Image from "next/image";
import { m, useAnimationControls } from "framer-motion";
import {
  FileText,
  MonitorPlay,
  Users,
  ShieldCheck,
  Trophy,
} from "lucide-react";

/* ================= CONFIG ================= */
const ACADEMIC_YEAR = "2025–26";

/* ─── Data defined outside component to avoid recreating on every render ─── */
const FEATURES = [
  { icon: <FileText size={16} />, text: "Admission open for the class entry level session 2026–27." },
  { icon: <MonitorPlay size={16} />, text: "For registration you can click the enroll now button." },
  { icon: <Users size={16} />, text: "10th CBSE Board Examination commencing from 17th February, 2026." },
  { icon: <ShieldCheck size={16} />, text: "Class 12th CBSE Board Examination commencing from 18th February, 2026." },
  { icon: <Trophy size={16} />, text: "Home examination for classes 3rd to 9th and 11th from 26 February, 2026." },
];

const EVENTS = [
  "Annual cultural & sports activities throughout the year",
  "Active participation in zonal & inter-school competitions",
  "Notable achievements in handball at national levels",
  "Regular assemblies, exhibitions & special celebrations",
  "Admissions open for the upcoming academic session",
  "Special workshops for student skill development",
];

/* ============== Animated List (pauses when section not in view) ============== */
const AnimatedVerticalList = memo(function AnimatedVerticalList({ items, type, inView }) {
  const controls = useAnimationControls();
  const listRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.scrollHeight / 3);
    }
  }, [items]);

  const startAnimation = useCallback(() => {
    if (!height) return;
    controls.start({
      y: [-height, 0],
      transition: { duration: 22, ease: "linear", repeat: Infinity },
    });
  }, [height, controls]);

  useEffect(() => {
    if (inView) startAnimation();
    else controls.stop();
  }, [inView, startAnimation, controls]);

  const handleMouseEnter = useCallback(() => controls.stop(), [controls]);
  const handleMouseLeave = useCallback(() => inView && startAnimation(), [inView, startAnimation]);

  const tripledItems = [...items, ...items, ...items];

  return (
    <div
      className="relative h-[200px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <m.div ref={listRef} animate={controls} className="flex flex-col gap-4">
        {tripledItems.map((item, idx) => (
          <div key={`${type}-${idx}`}>
            {type === "features" ? (
              <div className="flex gap-4 p-3 rounded-xl hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100">
                <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#7A0C0C] shadow-sm shrink-0">
                  {item.icon}
                </div>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ) : (
              <div className="flex gap-4 p-3 rounded-xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold shrink-0">
                  {(idx % items.length) + 1}
                </span>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            )}
          </div>
        ))}
      </m.div>

      {/* fade masks */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
});

/* ============== MAIN SECTION ============== */
const TrustAndEventsSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fcfcfc] py-10 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">

        {/* TRUST CARD */}
        <m.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border overflow-hidden flex flex-col md:flex-row md:h-[360px]"
        >
          <div className="relative md:w-[50%] h-[270px] md:h-[200px] md:h-full shrink-0">
            <Image
              src="https://res.cloudinary.com/dpelqhchv/image/upload/v1771877401/latest_updates_events_1771876806532_fdaizw.jpg"
              alt="Parents Trust at B.S.M Public School"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative flex-1 p-5 md:p-8">
            <h3 className="text-black text-base md:text-lg font-bold uppercase tracking-wider mb-4">
              Key Features
            </h3>
            <AnimatedVerticalList items={FEATURES} type="features" inView={inView} />
            <p className="text-[10px] text-gray-400 font-medium pt-4 mt-4 border-t">
              Updated for {ACADEMIC_YEAR}
            </p>
          </div>
        </m.div>

        {/* EVENTS CARD */}
        <m.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border overflow-hidden flex flex-col md:flex-row md:h-[360px]"
        >
          <div className="relative md:w-[50%] h-[270px] md:h-[200px] md:h-full shrink-0">
            <Image
              src="https://res.cloudinary.com/dpelqhchv/image/upload/v1771877251/key_features_school_1771876664137_j6nqtq.jpg"
              alt="School Activities and Events"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative flex-1 p-5 md:p-8">
            <h3 className="text-black text-base md:text-lg font-bold uppercase tracking-wider mb-4">
              Latest Updates
            </h3>
            <AnimatedVerticalList items={EVENTS} type="events" inView={inView} />
            <p className="text-[10px] text-gray-400 font-medium pt-4 mt-4 border-t">
              Updated for {ACADEMIC_YEAR}
            </p>
          </div>
        </m.div>

      </div>
    </section>
  );
};

export default TrustAndEventsSection;
