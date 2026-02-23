"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1];

const coordinators = [
  {
    id: 1,
    deskTitle: "From The Chairman's Desk",
    name: "Chairman",
    role: "Chairman",
    image: "",
    paragraphs: [
      "Welcome to B.S.M Public School, Karala, where education goes beyond academics to shape character, confidence, and purpose. We believe in preparing students with the knowledge, values, and skills needed to thrive responsibly in a rapidly changing world.Our vision focuses on the holistic development of every child through a balanced emphasis on academics, co-curricular learning, and life skills. With dedicated educators and a learner-centric approach, we nurture curiosity, creativity, discipline, and integrity. In partnership with parents, we remain committed to empowering our students to become confident, capable, and socially responsible individuals."
    ],
  },
  {
    id: 2,
    deskTitle: "From The President's Desk",
    name: "President",
    role: "President",
    image: "/president.webp",
    paragraphs: [
      "Our vision is to make this school the finest institution in the area—where children learn with purpose, grow with values, and succeed with confidence. We aim to nurture responsible, capable learners who bring pride to their families, their community, and their region. With committed educators and a progressive learning environment, we are building a school that shapes futures and creates leaders of tomorrow.",
    ],
  },
  {
    id: 3,
    deskTitle: "Message from the General Secretary",
    name: "General Secretary",
    role: "General Secretary",
    image: "/generalsecretary.webp",
    paragraphs: [
      "At B.S.M Public School, our vision is to create an institution where education inspires purpose, excellence, and responsible leadership.",
      "We are committed to fostering a learning culture that empowers students with knowledge, values, and future-ready skills to thrive in a dynamic world. Through continuous innovation and collaborative partnerships with parents and educators, we strive to nurture confident individuals who think critically and contribute meaningfully to society.",
    ],
  },
  {
    id: 4,
    deskTitle: "From The Manager's Desk",
    name: "Manager",
    role: "Manager",
    image: "/manager.webp",
    paragraphs: [
      "Our school's operations are driven by a commitment to excellence in every aspect—from infrastructure and safety to support services that enable teaching and learning to flourish.",
      "We ensure that the campus remains a secure, well-maintained, and conducive space where students and staff can focus on what matters most: growth and achievement.",
    ],
  },
  {
    id: 5,
    deskTitle: "From The Head of School",
    name: "Head of School",
    role: "Head of School",
    image: "/headofschool.webp",
    paragraphs: [
      "At B.S.M Public School, we believe education shapes both intellect and character. Guided by the vision of NEP 2020, we nurture curious minds, strong values, and confident learners in a safe and inclusive environment.",
      "Our focus is holistic development—empowering students with knowledge, integrity, and compassion to succeed in life. As Head of School, I am committed to ensuring every child realises their potential and grows into a responsible, capable, and compassionate citizen.",
    ],
  },
  {
    id: 6,
    deskTitle: "From The Senior Coordinator's Desk",
    name: "Ms Ruchi Mathur",
    role: "Senior Coordinator",
    image: "/seniorcoordinator.webp",
    paragraphs: [
      "At BSM School, we believe that education is far more than a curriculum; it is a powerful intersection where timeless human values meet the digital frontier, moving beyond textbooks into a vibrant world of innovation, creativity, and global collaboration.",
      "This journey is fueled by our partnership: dedicated educators, resilient students, and supportive parents. Together, we are nurturing a culture of lifelong excellence and integrity, ensuring our children emerge as visionary architects of their own bright futures.",
    ],
  },
  {
    id: 7,
    deskTitle: "From The Middle Coordinator's Desk",
    name: "Middle Coordinator",
    role: "Middle Coordinator",
    image: "/middlecoordinator.webp",
    paragraphs: [
      "The middle years are a crucial phase where students build strong academic foundations and develop critical thinking and social skills. Our team is dedicated to guiding each child through this journey with care and rigour.",
      "We create a balanced environment that encourages curiosity, discipline, and collaboration, preparing students for the challenges and opportunities of senior school and beyond.",
    ],
  },
  {
    id: 8,
    deskTitle: "From The Junior Coordinator's Desk",
    name: "Junior Coordinator",
    role: "Junior Coordinator",
    image: "/juniorcoordinator.webp",
    paragraphs: [
      "At B.S.M Public School, our primary goal is to ensure the highest quality of education through modern pedagogy and a student-centric approach. In an ever-changing world, we equip our students with the skills, values, and knowledge to navigate complex challenges. Our academic programs, supported by technology and expert faculty, encourage students to think critically and solve problems creatively. I encourage open communication between parents, teachers, and students as we collaborate to create a stimulating environment where every child can thrive."
    ],
  },
];

const PLACEHOLDER_IMAGE =
  "";

function DeskImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? PLACEHOLDER_IMAGE : src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

function DeskBlock({ item, index }) {
  const imageOnRight = index % 2 === 0; // 0, 2, 4, 6 → image right; 1, 3, 5, 7 → image left

  const textVariants = {
    hidden: { opacity: 0, x: imageOnRight ? -28 : 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: imageOnRight ? 28 : -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center py-5 sm:py-6 md:py-7 lg:py-8 border-b border-[#E8E4DC]/80 last:border-b-0 min-w-0 ${
        !imageOnRight ? "lg:bg-white/50 lg:rounded-2xl lg:px-6 lg:-mx-1" : ""
      }`}
    >
      {/* Text column — order swaps based on image position */}
      <m.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`order-2 min-w-0 ${imageOnRight ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-1.5" aria-hidden />
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a0505] mb-1">
          {item.deskTitle}
        </h2>
        <p className="text-lg md:text-xl font-semibold text-[#7A0C0C] mb-2 sm:mb-3">
          — {item.name}
        </p>
        <div className="space-y-1.5 sm:space-y-2">
          {item.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-gray-700 text-sm md:text-[16px] leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </m.div>

      {/* Image column — alternates left/right */}
      <m.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`relative order-1 flex justify-center min-w-0 ${
          imageOnRight ? "lg:order-2 lg:justify-end" : "lg:justify-start"
        }`}
      >
        <div className="relative w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[300px] aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-100 ring-2 ring-[#D4AF37]/20 ring-offset-2 ring-offset-[#f8f7f5]">
          <DeskImage src={item.image} alt={item.role} />
        </div>
      </m.div>
    </div>
  );
}

export default function CoordinatorsSection() {
  return (
    <section className="w-full min-w-0 bg-[#f8f7f5] py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-10 overflow-hidden">
      <div className="container-wide max-w-6xl mx-auto min-w-0">
        <m.header
          className="text-center mb-4 sm:mb-5 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: smoothEase }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <span className="w-8 sm:w-10 h-px bg-[#D4AF37]" aria-hidden />
            <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs">
              Leadership &amp; Coordination
            </span>
            <span className="w-8 sm:w-10 h-px bg-[#D4AF37]" aria-hidden />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#1a0505]">
            From Our <span className="text-[#7A0C0C]">Leaders' Desk</span>
          </h2>
          <p className="mt-1.5 sm:mt-2 text-gray-600 text-sm md:text-base max-w-xl mx-auto px-1">
            Messages from our leadership team guiding excellence at B.S.M Public School.
          </p>
        </m.header>

        {coordinators.map((item, index) => (
          <DeskBlock key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
