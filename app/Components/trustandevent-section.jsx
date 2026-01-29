"use client";

import React, { useRef, useEffect } from "react";
// Removed Next.js Image import to use standard img tag as per recent changes/preference for local consistency
// import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { FileText, MonitorPlay, Users, ShieldCheck, Trophy, Calendar } from "lucide-react";

/**
 * Animated Vertical Slider for list items
 */
const AnimatedVerticalList = ({ items, type }) => {
  const controls = useAnimationControls();
  const listRef = useRef(null);
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.scrollHeight / 3); // Since we triple the list
    }
  }, [items]);

  useEffect(() => {
    if (height > 0) {
      controls.start({
        y: [-height, 0], // Scroll UP
        transition: {
          duration: 20, // Adjust speed
          ease: "linear",
          repeat: Infinity,
        }
      });
    }
  }, [height, controls]);

  const tripledItems = [...items, ...items, ...items]; // Triple for smoother loop

  return (
    <div
      className="h-[220px] overflow-hidden relative mask-linear-fade-vertical"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() => controls.start({ y: [-height, 0], transition: { duration: 20, ease: "linear", repeat: Infinity } })}
    >
      <motion.div animate={controls} ref={listRef} className="flex flex-col gap-4">
        {tripledItems.map((item, idx) => (
          <div key={`${type}-${idx}`} className="shrink-0">
            {type === 'features' ? (
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100">
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#7A0C0C] shadow-sm">
                  {item.icon}
                </div>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ) : (
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold mt-0.5 bg-white shadow-sm">
                  {(idx % items.length) + 1}
                </span>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Gradient Masks for smooth fade */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};


const TrustAndEventsSection = () => {
  const features = [
    {
      icon: <FileText size={16} />,
      text: "CBSE curriculum followed as per DOE & CBSE guidelines",
    },
    {
      icon: <MonitorPlay size={16} />,
      text: "Smart learning facilities & modern robotics labs",
    },
    {
      icon: <Users size={16} />,
      text: "Focus on academic excellence, discipline & moral values",
    },
    {
      icon: <ShieldCheck size={16} />,
      text: "Safe campus with 24/7 CCTV & personalized attention",
    },
    {
      icon: <Trophy size={16} />,
      text: "State-of-the-art sports complex & coaching",
    },
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
    <section className="bg-[#fcfcfc] py-20 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

        {/* TRUST SECTION CARD */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 flex flex-col md:flex-row h-[420px] md:h-[360px]"
        >
          {/* Image Sidebar */}
          <div className="relative w-full md:w-[40%] h-[180px] md:h-full overflow-hidden shrink-0">
            <img
              src="/images/school_assembly_crowd_1769562629097.png"
              alt="Parents Trust"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-linear-to-r from-[#1a0505] via-[rgba(26,5,5,0.6)] to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
              <div className="w-10 h-1 bg-[#D4AF37] mb-3 rounded-full" />
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block opacity-90">
                Why Choose Us
              </span>
              <h2 className="text-white text-2xl font-serif font-medium leading-tight">
                Parents Trust <br /> <span className="text-[#D4AF37] italic font-semibold">B.S.M. School</span>
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex-1 bg-white relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ShieldCheck size={120} />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
                  Key Features
                </h3>
                <AnimatedVerticalList items={features} type="features" />
              </div>

              <div className="pt-4 border-t border-gray-100 mt-2 flex justify-between items-center">
                <p className="text-[10px] text-gray-400 font-medium">Updated for 2025-26</p>
                <button className="text-[#7A0C0C] font-bold text-xs uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all group-hover:underline decoration-2 underline-offset-4">
                  View More <span className="text-lg leading-none">&rsaquo;</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EVENTS SECTION CARD */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 flex flex-col md:flex-row h-[420px] md:h-[360px]"
        >
          {/* Image Sidebar */}
          <div className="relative w-full md:w-[40%] h-[180px] md:h-full overflow-hidden shrink-0">
            <img
              src="/images/school_stage_performance_1769562652868.png"
              alt="Activities"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-linear-to-r from-[#0a1636] via-[rgba(10,22,54,0.6)] to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
              <div className="w-10 h-1 bg-[#D4AF37] mb-3 rounded-full" />
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block opacity-90">
                Holistic Growth
              </span>
              <h2 className="text-white text-2xl font-serif font-medium leading-tight">
                Activities & <br /> <span className="text-[#D4AF37] italic font-semibold">Results</span>
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex-1 bg-white relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-[#0a1636]">
              <Trophy size={120} />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                    Latest Updates
                  </h3>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-600 uppercase">Live</span>
                  </div>
                </div>
                <AnimatedVerticalList items={events} type="events" />
              </div>

              <div className="pt-4 border-t border-gray-100 mt-2 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Sports</span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Cultural</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustAndEventsSection;
