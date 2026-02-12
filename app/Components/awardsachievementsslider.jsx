"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- DATA ---------------- */

const awardsSliderData = [
  {
    id: 2,
    image: "/acedemic1st.webp",
    rank: "1st Rank",
    achievement: "Academic Excellence Award",
    category: "Academic Achievement",
  },
  {
    id: 3,
    image: "/acedemis2ndposition.webp",
    rank: "2nd Rank",
    achievement: "Academic Excellence Award",
    category: "Academic Achievement",
  },
  {
    id: 4,
    image: "/acedemis3ndposition.webp",
    rank: "3rd Rank",
    achievement: "Academic Excellence Award",
    category: "Academic Achievement",
  },
  {
    id: 1,
    image: "/attendance100.webp",
    rank: "",
    achievement: "100 % Attendance Award",
    category: "Attendance Achievement",
  },
  {
    id: 5,
    image: "/schrolship.webp",
    rank: "",
    achievement: "Scholarship Award",
    category: "Academic Achievement",
  },
  {
    id: 6,
    image: "/sportwinners.webp",
    rank: "",
    achievement: "Sports Championship Winner",
    category: "Sports Achievement",
  },
];

/* Duplicate for Infinite Effect */
const extendedData = [...awardsSliderData, ...awardsSliderData];

/* ---------------- CARD ---------------- */

const AchievementCard = ({ item }) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500">
      <div className="relative h-[260px] w-full">
        <Image
          src={item.image}
          alt={item.achievement}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#7A0C0C] text-white text-xs px-4 py-1 rounded-full">
          {item.category}
        </div>
      </div>

      <div className="bg-[#7A0C0C] p-6 text-center">
        {item.rank && (
          <p className="text-white/80 text-sm mb-2">{item.rank}</p>
        )}
        <h3 className="text-white text-xl font-semibold">
          {item.achievement}
        </h3>
      </div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */

export default function AwardsAchievementsSlider() {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [index, setIndex] = useState(0);
  const isHovered = useRef(false);

  /* Responsive */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Smooth Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) {
        setIndex((prev) => prev + 1);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* Reset seamlessly */
  useEffect(() => {
    if (index >= awardsSliderData.length) {
      setTimeout(() => {
        setIndex(0);
      }, 800);
    }
  }, [index]);

  const slideLeft = () => {
    setIndex((prev) =>
      prev === 0 ? awardsSliderData.length - 1 : prev - 1
    );
  };

  const slideRight = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <section className="bg-[#F9F5F5] py-20 px-4">
      <div className="max-w-[1300px] mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#7A0C0C]">
            Awards & Achievements
          </h2>
          <div className="w-20 h-[3px] bg-[#7A0C0C] mx-auto mt-4"></div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
        >

          {/* LEFT BUTTON */}
          <button
            onClick={slideLeft}
            className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 z-20
                       h-12 w-12 flex items-center justify-center
                       rounded-full bg-[#7A0C0C] text-white
                       hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <ChevronLeft size={22} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={slideRight}
            className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 z-20
                       h-12 w-12 flex items-center justify-center
                       rounded-full bg-[#7A0C0C] text-white
                       hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <ChevronRight size={22} />
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${index * (100 / itemsToShow)}%`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {extendedData.map((item, i) => (
                <div
                  key={i}
                  className="px-4 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <AchievementCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
