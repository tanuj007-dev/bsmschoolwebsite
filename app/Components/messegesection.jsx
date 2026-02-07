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
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

const imageVariant = () => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

/* ---------------- Leadership Block ---------------- */
const LeadershipBlock = ({
  title,
  name,
  role,
  message,
  imageSrc,
  isReversed = false,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20">

      {/* IMAGE */}
      <motion.div
        variants={imageVariant()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`relative flex justify-center ${isReversed ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={imageSrc}
            alt={role}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <div className="text-white">
              {name && <p className="font-serif text-xl font-bold">{name}</p>}
              <p className="text-[#D4AF37] text-sm uppercase tracking-wider">{role}</p>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-6 bottom-6 w-full max-w-[500px] border-2 border-[#D4AF37] rounded-xl -z-10 ${isReversed ? "left-6" : "right-6"
            }`}
        />
      </motion.div>

      {/* TEXT */}
      <motion.div
        variants={textVariant(isReversed)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`${isReversed ? "lg:order-1" : "lg:order-2"} relative`}
      >
        <Quote className="absolute -top-10 -left-6 w-24 h-24 text-[#7A0C0C]/10 rotate-180" />

        <span className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs mb-2 block">
          Founder of B.S.M Public School
        </span>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0505] mb-6">
          {title}
        </h2>

        <div className="space-y-6">
          {message.map((para, i) => (
            <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {name && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="font-serif text-2xl text-[#7A0C0C] italic">"{name}"</p>
          </div>
        )}
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
      isReversed: true,
      message: [
        "Education is the most powerful weapon which you can use to change the world. Our vision is where tradition meets modern learning.",
        "With experience in law and child psychology, I believe in building character along with academic excellence.",
        "Through collective effort, BSM Public School continues to set benchmarks in quality education."
      ],
    },
    {
      title: "Nurturing Potential",
      name: "Mrs. Vandana Khanna",
      role: "Principal",
      imageSrc: "/principal.jpg",
      isReversed: false,
      message: [
        "Every child is unique and carries immense potential waiting to be discovered.",
        "Education is about confidence, compassion, and curiosity, not just academics.",
        "Our focus is to provide a safe, inclusive environment where every child can grow and succeed."
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
