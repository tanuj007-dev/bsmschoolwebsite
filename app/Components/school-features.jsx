"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ---------------- Animation ---------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ---------------- Component ---------------- */

const ProgramsSection = () => {
  const cards = [
    {
      title: "Modern School Campus",
      slug: "modern-school-campus",
      description:
        "A spacious and well-planned campus designed to provide a vibrant academic atmosphere with modern infrastructure and green surroundings.",
      image: "/gallery/modern_indian_school_students_1770864610820.png",
    },
    {
      title: "Secure & Safe Campus",
      slug: "secure-safe-campus",
      description:
        "24/7 CCTV surveillance, disciplined environment and dedicated staff ensuring complete safety and peace of mind for students and parents.",
      image: "/gallery/secure_campus_bsm_1770865786111.png",
    },
    {
      title: "Sports & Physical Education",
      slug: "sports-physical-education",
      description:
        "Comprehensive indoor and outdoor sports facilities encouraging teamwork, discipline and overall physical development.",
      image: "/gallery/sports_physical_education_bsm_1770865926260.png",
    },
    {
      title: "Smart Classrooms",
      slug: "smart-classrooms",
      description:
        "Digitally equipped classrooms with smart boards and interactive learning tools to enhance engagement and academic excellence.",
      image: "/gallery/smart_classrooms_bsm_1770866154858.png",
    },
    {
      title: "Well-Stocked Library",
      slug: "well-stocked-library",
      description:
        "A rich collection of academic books, reference materials and digital resources fostering reading habits and independent learning.",
      image: "/gallery/Gemini_Generated_Image_i3m9kji3m9kji3m9.png",
    },
    {
      title: "Advanced Physics Laboratory",
      slug: "advanced-physics-laboratory",
      description:
        "Fully equipped physics lab with modern apparatus to help students explore scientific principles through practical experiments.",
      image: "/gallery/Gemini_Generated_Image_ggls7kggls7kggls.png",
    },
    {
      title: "Modern Chemistry Laboratory",
      slug: "modern-chemistry-laboratory",
      description:
        "Safe and well-maintained chemistry lab enabling hands-on experiments and deeper understanding of chemical concepts.",
      image: "/gallery/Gemini_Generated_Image_gncqokgncqokgncq.png",
    },
    {
      title: "Biology & Life Science Lab",
      slug: "biology-life-science-lab",
      description:
        "Interactive biology lab with models and specimens helping students understand life sciences in a practical way.",
      image: "/gallery/Gemini_Generated_Image_lsz8rdlsz8rdlsz8.png",
    },
    {
      title: "Medical & First Aid Room",
      slug: "medical-first-aid-room",
      description:
        "On-campus medical assistance and first aid facilities to ensure immediate care and student well-being.",
      image: "/gallery/Gemini_Generated_Image_fk2lhpfk2lhpfk2l.png",
    },
    {
      title: "Children's Play Area",
      slug: "childrens-play-area",
      description:
        "Safe and joyful play area designed especially for young learners to promote fun, creativity and social interaction.",
      image: "/gallery/Gemini_Generated_Image_muohfgmuohfgmuoh.png",
    },
    {
      title: "Music & Performing Arts Room",
      slug: "music-performing-arts-room",
      description:
        "Dedicated music and performing arts room encouraging creativity, rhythm and artistic talent among students.",
      image: "/gallery/Gemini_Generated_Image_1y9ojt1y9ojt1y9o.png",
    },
    {
  title: "Dance & Performing Arts Room",
  slug: "dance-performing-arts-room",
  description:
    "A vibrant and spacious dance room equipped with full-length mirrors, wooden flooring, and an advanced sound system to nurture creativity, rhythm, and confidence in students through various dance and performing arts activities.",
  image: "/gallery/Gemini_Generated_Image_yc6p9cyc6p9cyc6p.png",
},

  ];

  return (
    <section className="w-full bg-[#fdfdfd] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, index) => (
            <Link
              href={`/programs/${card.slug}`}
              key={index}
              className="group"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden h-full shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index < 3}
                  />
                </div>

                {/* Content */}
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
