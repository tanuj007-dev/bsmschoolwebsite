"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";

export default function PremiumFacilitiesSection() {
  const facilities = [
    {
      id: 1,
      title: "Innovation & Robotics Lab",
      slug: "innovation-robotics-lab",
      desc: "Hands-on learning with modern tech & creativity.",
      image: "/images/robotics_lab_school_1769561128597.png",
    },
    {
      id: 2,
      title: "Air-conditioned Classes",
      slug: "air-conditioned-classes",
      desc: "Comfortable classrooms for focused learning.",
      image: "/images/modern_classroom_school_1769561148587.png",
    },
    {
      id: 3,
      title: "Secure Campus",
      slug: "secure-campus",
      desc: "Safety-first campus with secure monitoring.",
      image: "/images/secure_school_campus_1769561212830.png",
    },
    {
      id: 4,
      title: "Sports Arena",
      slug: "sports-arena",
      desc: "Fitness, sportsmanship & energy in one place.",
      image: "/images/sports_arena_school_1769561170526.png",
    },
    {
      id: 5,
      title: "Library Zone",
      slug: "library-zone",
      desc: "Quiet, focused and resourceful environment.",
      image: "/images/school_library_modern_1769561191343.png",
    },
  ];

  const loopedFacilities = [...facilities, ...facilities, ...facilities];
  const controls = useAnimationControls();

  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <section className="w-full bg-[#fafafa] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <h3 className="font-serif text-[#1a2b5d] text-3xl">
            Premium Facilities
          </h3>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12">
          <motion.div
            className="flex gap-6 w-max"
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={startAnimation}
          >
            {loopedFacilities.map((item, index) => (
              <Link
                href={`/facilities/${item.slug}`}
                key={`${item.id}-${index}`}
                className="min-w-[300px] md:min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-sm border group"
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* PERFECT CIRCLE LOGO */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center overflow-hidden">
                    <img
                      src="/bsm_logo-removebg-preview.png"   // your logo
                      alt="Logo"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-serif text-xl font-bold mb-2 text-[#1a1a1a]">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
