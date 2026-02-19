"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LazyVideo from "./LazyVideo";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const facilityCards = [
  {
    slug: "modern-school-campus",
    title: "Modern School Campus",
    description:
      "A spacious and well-planned campus designed to provide a vibrant academic atmosphere with modern infrastructure and green surroundings.",
    video: "/senior%20school%201st%206seconds.mp4",
  },
  {
    slug: "clean-washrooms-hygiene",
    title: "Clean Washrooms & Hygiene",
    description:
      "Well-maintained, hygienic washroom facilities across the campus ensuring cleanliness, safety and comfort for all students.",
    video: "/boyswashroom.MP4",
  },
  {
    slug: "sports-physical-education",
    title: "Sports & Physical Education",
    description:
      "Comprehensive indoor and outdoor sports facilities encouraging teamwork, discipline and overall physical development.",
    video: "/playground.mp4",
  },
  // {
  //   slug: "smart-classrooms",
  //   title: "Smart Classrooms",
  //   description:
  //     "Digitally equipped classrooms with smart boards and interactive learning tools to enhance engagement and academic excellence.",
  //   video: "/senior%20school%201st%206seconds.mp4",
  // },
  {
    slug: "well-stocked-library",
    title: "Well-Stocked Library",
    description:
      "A rich collection of academic books, reference materials and digital resources fostering reading habits and independent learning.",
    video: "/library.mp4",
  },
  {
    slug: "advanced-physics-laboratory",
    title: "Advanced Physics Laboratory",
    description:
      "Fully equipped physics lab with modern apparatus to help students explore scientific principles through practical experiments.",
    video: `/${encodeURIComponent("Exploring the wonders of science at the Physics Lab of B.S.M Public School—where curiosity turns.mp4")}`,
  },
  {
    slug: "modern-chemistry-laboratory",
    title: "Modern Chemistry Laboratory",
    description:
      "Safe and well-maintained chemistry lab enabling hands-on experiments and deeper understanding of chemical concepts.",
    video: "/chemistrylab.mp4",
  },
  {
    slug: "biology-life-science-lab",
    title: "Biology & Life Science Lab",
    description:
      "Interactive biology lab with models and specimens helping students understand life sciences in a practical way.",
    video: "/bio_lab.mp4",
  },
  {
    slug: "medical-first-aid-room",
    title: "Medical & First Aid Room",
    description:
      "On-campus medical assistance and first aid facilities to ensure immediate care and student well-being.",
    video: "/medicalroom.mov",
  },
  {
    slug: "childrens-play-area",
    title: "Children's Play Area",
    description:
      "Safe and joyful play area designed especially for young learners to promote fun, creativity and social interaction.",
    video: `/${encodeURIComponent("🧒🎠 Tiny feet, big dreams!At BSM Junior School, Karala, our little stars shine the brightest wh.mp4")}`,
  },
  {
    slug: "music-performing-arts-room",
    title: "Music & Performing Arts Room",
    description:
      "Dedicated music and performing arts room encouraging creativity, rhythm and artistic talent among students.",
    video: `/${encodeURIComponent("Music practice in full swing for our Annual Day—every beat, every note bringing us closer to a m.mp4")}`,
  },
  {
    slug: "dance-performing-arts-room",
    title: "Dance & Performing Arts Room",
    description:
      "A vibrant and spacious dance room equipped with full-length mirrors, wooden flooring, and an advanced sound system to nurture creativity, rhythm, and confidence in students through various dance and performing arts activities.",
    video: "/danceroom2.mp4",
  },
];

const ProgramsSection = () => {
  const cards = facilityCards;

  return (
    <section className="w-full bg-[#fdfdfd] py-12 md:py-20 px-4 md:px-8">
      <div className="container-wide">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, index) => (
            <Link key={index} href={`/amenities/${card.slug}`}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden h-full shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                {/* Video - lazy load when in view */}
                <div className="relative w-full aspect-9/16 overflow-hidden bg-gray-100">
                  <LazyVideo
                    src={card.video}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    preload="metadata"
                  />
                </div>

                {/* Content - same as before */}
                <div className="flex flex-col grow p-6 md:p-7 relative bg-white transition-colors duration-500 group-hover:bg-[#7A0C0C]">
                  <div className="w-12 h-1 bg-[#D4AF37] mb-5 rounded-full" />

                  <h3 className="text-[#7A0C0C] group-hover:text-[#D4AF37] text-lg md:text-xl font-bold mb-3 transition-colors duration-500 font-serif">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-white/90 text-sm md:text-base leading-relaxed transition-colors duration-500">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
