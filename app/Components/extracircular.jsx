"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ---------------- Activity Card ---------------- */
const ActivityCard = ({ imageSrc, title, items, delay = 0 }) => {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="flex flex-col bg-[#F2F2F2] rounded-[2rem] overflow-hidden shadow-md hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title Bar */}
      <div className="bg-[#7A0C0C] py-3 px-6 text-center">
        <h3 className="text-white text-xl font-semibold tracking-wide">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[#2B2B2B] text-sm leading-relaxed"
            >
              <span className="text-[#D4AF37] mt-1 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
};

/* ---------------- Main Section ---------------- */
const ExtraCurricular = () => {
  const activities = [
    {
      title: "Skill Development",
      imageSrc: "/gallery/Gemini_Generated_Image_61a76g61a76g61a7.png",
      items: [
        "Development of communication skills including listening, speaking, and writing.",
        "Strengthening logical thinking, problem-solving, and basic computational abilities.",
        "Understanding of elementary science, technology, and real-life applications.",
        "Encouragement towards sports, recreation, and healthy lifestyle habits.",
      ],
    },
    {
      title: "Self Development",
      imageSrc: "/gallery/Gemini_Generated_Image_pucaj3pucaj3puca.png",
      items: [
        "Building confidence and a positive self-image among students.",
        "Encouraging goal setting, achievement, and a lifelong love for learning.",
        "Opportunities for self-expression through art, music, dance, and theatre.",
        "Focus on physical fitness, emotional well-being, and safety awareness.",
      ],
    },
    {
      title: "Social Development",
      imageSrc: "/gallery/Gemini_Generated_Image_h9hbeh9hbeh9hbeh.png",
      items: [
        "Promoting teamwork and collaboration with peers and groups.",
        "Instilling respect for diverse cultures, values, and traditions.",
        "Encouraging responsible citizenship and positive social contributions.",
        "Helping students identify and nurture their unique talents and abilities.",
      ],
    },
  ];

  return (
    <section className="bg-[#FFF6EA] py-16 px-6 md:px-12 lg:px-24">
      <div className="container-wide">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-5xl"
        >
          <h2 className="text-[#7A0C0C] text-4xl md:text-4xl font-semibold mb-4 uppercase">
            Extra-Curricular Activities
          </h2>

          <div className="w-32 h-[3px] bg-[#D4AF37] mb-6" />

          <p className="text-black text-lg font-medium mb-6">
            Learning Beyond Classrooms
          </p>

          <div className="space-y-4 text-black leading-relaxed">
            <p>
              At <strong>B.S.M. Public School</strong>, education goes beyond textbooks.
              Extra-curricular activities play a vital role in nurturing confidence,
              creativity, discipline, and leadership qualities in students.
            </p>
            <p>
              Our carefully designed programs provide a balanced blend of academics,
              arts, sports, and life skills, helping students discover their interests
              and grow into responsible, confident individuals.
            </p>
          </div>
        </m.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              {...activity}
              delay={index * 0.15}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExtraCurricular;
  