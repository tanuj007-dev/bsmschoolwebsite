"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PremiumFacilitiesSection() {
  const facilities = [
    { id: 1, title: "School Campus", slug: "innovation-robotics-lab", video: "/schoolcampus.mp4" },
    { id: 2, title: "Dance Room", slug: "dance-room", video: "/danceroom1.mp4" },
    { id: 3, title: "Sports Arena", slug: "sports-arena", video: "/playground.mp4" },
    { id: 4, title: "Library Zone", slug: "library-zone", video: "/library.mp4" },
    { id: 5, title: "Secure Campus", slug: "secure-campus", video: "/boyswashroom.mp4" },
  ];

  const duplicated = [...facilities, ...facilities];

  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const width = trackRef.current.scrollWidth / 2;

    animationRef.current = animate(x, -width, {
      ease: "linear",
      duration: 35,
      repeat: Infinity,
    });

    return () => animationRef.current?.stop();
  }, [x]);

  const pause = () => animationRef.current?.pause();
  const resume = () => animationRef.current?.play();

  const slide = (direction) => {
    pause();

    const moveAmount = 340;
    const currentX = x.get();

    const newX =
      direction === "left"
        ? currentX + moveAmount
        : currentX - moveAmount;

    animate(x, newX, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onComplete: resume,
    });
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#1a2b5d]">
            Premium Facilities
          </h2>
          <div className="h-[3px] w-20 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Wrapper */}
        <div className="relative overflow-visible">

          {/* Buttons OUTSIDE visible */}
          <button
            onClick={() => slide("left")}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-40
                       w-14 h-14 flex items-center justify-center
                       rounded-full
                       bg-[#1a2b5d]
                       border-2 border-[#D4AF37]
                       text-white
                       shadow-xl
                       transition-all duration-300
                       hover:scale-110 hover:bg-[#8B0000] hover:text-[#1a2b5d]"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => slide("right")}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-40
                       w-14 h-14 flex items-center justify-center
                       rounded-full
                       bg-[#1a2b5d]
                       border-2 border-[#D4AF37]
                       text-white
                       shadow-xl
                       transition-all duration-300
                       hover:scale-110 hover:bg-[#D4AF37] hover:text-[#1a2b5d]"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slider Viewport */}
          <div className="overflow-hidden">

            {/* Soft Edge Fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 
                            bg-gradient-to-r from-white via-white/50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 
                            bg-gradient-to-l from-white via-white/50 to-transparent" />

            {/* Track */}
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-10 w-max"
              onHoverStart={pause}
              onHoverEnd={resume}
            >
              {duplicated.map((item, index) => (
                <Link
                  key={index}
                  href={`/facilities/${item.slug}`}
                  className="group flex-shrink-0 w-[300px]"
                >
                  <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-xl">

                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-lg font-sans font-medium tracking-wide">
                        {item.title}
                      </h3>
                      <div className="h-[2px] w-10 bg-[#D4AF37] mt-2 rounded-full"></div>
                    </div>

                  </div>
                </Link>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
