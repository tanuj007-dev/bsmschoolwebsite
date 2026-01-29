"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/* ---------------- Animation Helpers ---------------- */
const textVariant = (isReversed) => ({
  hidden: {
    opacity: 0,
    x: isReversed ? 50 : -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
});

const imageVariant = (isReversed) => ({
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
});

/* ---------------- Reusable Block ---------------- */
const LeadershipBlock = ({
  title,
  name,
  role,
  message,
  imageSrc,
  isReversed = false,
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20 ${isReversed ? "" : ""}`}>

      {/* IMAGE SIDE */}
      <motion.div
        variants={imageVariant(isReversed)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`relative flex justify-center ${isReversed ? "lg:order-2" : "lg:order-1"
          }`}
      >
        <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Authentic Badge */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <div className="text-white">
              <p className="font-serif text-xl font-bold">{name}</p>
              <p className="text-[#D4AF37] text-sm uppercase tracking-wider">{role}</p>
            </div>
          </div>
        </div>

        {/* Decorative Frame */}
        <div className={`absolute top-6 bottom-6 w-full max-w-[500px] border-2 border-[#D4AF37] rounded-xl -z-10 ${isReversed ? "left-6" : "right-6"}`}></div>
      </motion.div>

      {/* TEXT SIDE */}
      <motion.div
        variants={textVariant(isReversed)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`relative ${isReversed ? "lg:order-1" : "lg:order-2"}`}
      >
        <Quote className="text-[#7A0C0C]/10 absolute -top-10 -left-6 w-24 h-24 rotate-180" />

        <div className="relative z-10">
          <span className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs mb-2 block">Leadership Insights</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0505] mb-6 leading-tight">
            {title}
          </h2>

          <div className="space-y-6">
            {message.map((para, index) => (
              <p
                key={index}
                className="text-gray-600 text-base md:text-lg leading-relaxed font-light"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="font-serif text-2xl text-[#7A0C0C] italic">"{name}"</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- Main Section ---------------- */
export default function MessageSection() {
  const leadershipData = [
    {
      title: "Vision of Excellence",
      name: "Adv. Hitesh Verma",
      role: "Director",
      imageSrc: "/director.jpg",
      isReversed: false,
      message: [
        "Education is the most powerful weapon which you can use to change the world. Ours is a vision where tradition meets modernity.",
        "With a background in law and child psychology, I believe in constructing not just buildings, but character. We focus on values, discipline, and emotional growth.",
        "Under our collective stewardship, BSM Public School has risen to become a benchmark of quality education in the region.",
      ],
    },
    {
      title: "Nurturing Potential",
      name: "Mrs. Vandana Khanna",
      role: "Principal",
      imageSrc: "/principal.jpg",
      isReversed: true,
      message: [
        "Every child is a distinct individual with infinite potential. Our role is to identify and nurture that spark.",
        "With over two decades of experience, I have learned that education is about instilling confidence, compassion, and curiosity.",
        "My leadership is dedicated to creating a safe, inclusive environment where every student feels valued and empowered to achieve their best.",
      ],
    },
  ];

  return (
    <section className="bg-[#fcfbf9] py-10 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {leadershipData.map((item, index) => (
          <LeadershipBlock key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
