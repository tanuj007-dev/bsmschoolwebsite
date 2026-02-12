"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/* ---------------- Smooth Animation Config ---------------- */

const smoothEase = [0.16, 1, 0.3, 1];

const textVariant = (isReversed) => ({
  hidden: {
    opacity: 0,
    y: 60,
    x: isReversed ? 40 : -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
});

const imageVariant = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center py-24">

      {/* IMAGE */}
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className={`relative flex justify-center ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="relative w-full max-w-[520px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={imageSrc}
            alt={role}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
            <div className="text-white">
              <p className="text-xl font-semibold">{name}</p>
              <p className="text-[#D4AF37] text-sm uppercase tracking-wider">
                {role}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-8 bottom-8 w-full max-w-[520px] border-2 border-[#D4AF37] rounded-2xl -z-10 ${
            isReversed ? "left-8" : "right-8"
          }`}
        />
      </motion.div>

      {/* TEXT */}
      <motion.div
        variants={textVariant(isReversed)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className={`relative ${
          isReversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Quote className="absolute -top-12 -left-6 w-20 h-20 text-[#7A0C0C]/10 rotate-180" />

        <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs mb-3 block">
          {role}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0505] mb-8">
          {title}
        </h2>

        <div className="space-y-6">
          {message.map((para, i) => (
            <p
              key={i}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- Main Section ---------------- */

export default function MessageSection() {
  const leadershipData = [

    // 1️⃣ Chairman
    {
      title: "Founder of B.S.M Public School - Chairman",
      name: "Chairman Name",
      role: "Chairman",
      imageSrc: "/chairman.webp",
      isReversed: false,
      message: [
        "At our school, we believe that education is the foundation of a strong future. Our commitment is to create a centre of excellence where children are empowered with knowledge, values, and skills to succeed in a rapidly changing world.",
        "With a focus on quality education, character building, and continuous growth, we strive to develop confident learners who bring pride to their families, society, and the nation.",
        "Our vision is to make this school the finest institution in the area—where children learn with purpose, grow with values, and succeed with confidence. We aim to nurture responsible, capable learners who bring pride to their families, their community, and their region.",
        "With committed educators and a progressive learning environment, we are building a school that shapes futures and creates leaders of tomorrow."
      ],
    },

    // 2️⃣ Head of School
    {
      title: "From the Head of School",
      name: "Head of School Name",
      role: "Head of School",
      imageSrc: "/headofschool.webp",
      isReversed: true,
      message: [
        '"Education is the most powerful weapon which you can use to change the world." – Dr. A.P.J Abdul Kalam',
        "At B.S.M. Public School, we believe education shapes both intellect and character. Guided by the vision of NEP 2020, we nurture curious minds, strong values, and confident learners in a safe and inclusive environment.",
        "Our focus is holistic development—empowering students with knowledge, integrity, and compassion to succeed in life and contribute meaningfully to society.",
        "As Head of School, I am committed to ensuring every child realises their potential and grows into a responsible, capable, and compassionate citizen."
      ],
    },

    // 3️⃣ Senior Coordinator
    {
      title: "From The Senior Coordinator Desk",
      name: "Ms Ruchi Mathur",
      role: "Senior Coordinator",
      imageSrc: "/seniorcoordinator.webp",
      isReversed: false,
      message: [
        '"The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover." — Jean Piaget',
        "At BSM School, we believe that education is far more than a curriculum; it is a powerful intersection where timeless human values meet the digital frontier, moving beyond textbooks into a vibrant world of innovation, creativity, and global collaboration.",
        'This journey of progress is fueled by our "Golden Triangle" of partnership: our dedicated educators who continuously adapt to new frontiers, our resilient students who embrace challenges, and our supportive parents who remain our strongest allies.',
        "Leadership here is a shared responsibility where technology becomes not just a tool, but a bridge to inspire critical thinking, ignite curiosity, and foster meaningful growth.",
        "Together, we are nurturing a culture of lifelong excellence and integrity, ensuring our children emerge as visionary architects of their own bright futures."
      ],
    },

    // 4️⃣ General Secretary
    {
      title: "Message from the General Secretary",
      name: "General Secretary Name",
      role: "General Secretary",
      imageSrc: "/generalsecretary.webp",
      isReversed: true,
      message: [
        "At B.S.M Public School, our vision is to create an institution where education inspires purpose, excellence, and responsible leadership.",
        "We are committed to fostering a learning culture that empowers students with knowledge, values, and future-ready skills to thrive in a dynamic world.",
        "Through continuous innovation, strong ethical foundations, and collaborative partnerships with parents and educators, we strive to nurture confident individuals who think critically, act responsibly, and contribute meaningfully to society.",
        "Together, we remain dedicated to shaping a progressive educational environment that prepares our learners to lead with integrity, resilience, and vision."
      ],
    },

  ];

  return (
    <section className="bg-[#fcfbf9] py-20 px-6 md:px-12 lg:px-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {leadershipData.map((item, index) => (
          <LeadershipBlock key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
