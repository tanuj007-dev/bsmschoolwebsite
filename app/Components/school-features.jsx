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
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Secure & Safe Campus",
      slug: "secure-safe-campus",
      description:
        "24/7 CCTV surveillance, disciplined environment and dedicated staff ensuring complete safety and peace of mind for students and parents.",
      image:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Sports & Physical Education",
      slug: "sports-physical-education",
      description:
        "Comprehensive indoor and outdoor sports facilities encouraging teamwork, discipline and overall physical development.",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Smart Classrooms",
      slug: "smart-classrooms",
      description:
        "Digitally equipped classrooms with smart boards and interactive learning tools to enhance engagement and academic excellence.",
      image:
        "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Well-Stocked Library",
      slug: "well-stocked-library",
      description:
        "A rich collection of academic books, reference materials and digital resources fostering reading habits and independent learning.",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Advanced Physics Laboratory",
      slug: "advanced-physics-laboratory",
      description:
        "Fully equipped physics lab with modern apparatus to help students explore scientific principles through practical experiments.",
      image:
        "https://images.unsplash.com/photo-1581093588401-22f19d06c0b5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Modern Chemistry Laboratory",
      slug: "modern-chemistry-laboratory",
      description:
        "Safe and well-maintained chemistry lab enabling hands-on experiments and deeper understanding of chemical concepts.",
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Biology & Life Science Lab",
      slug: "biology-life-science-lab",
      description:
        "Interactive biology lab with models and specimens helping students understand life sciences in a practical way.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Medical & First Aid Room",
      slug: "medical-first-aid-room",
      description:
        "On-campus medical assistance and first aid facilities to ensure immediate care and student well-being.",
      image:
        "https://images.unsplash.com/photo-1580281658629-0c9f5f9f3c6b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Children's Play Area",
      slug: "childrens-play-area",
      description:
        "Safe and joyful play area designed especially for young learners to promote fun, creativity and social interaction.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Music & Performing Arts Room",
      slug: "music-performing-arts-room",
      description:
        "Dedicated music and performing arts room encouraging creativity, rhythm and artistic talent among students.",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    },
    {
  title: "Dance & Performing Arts Room",
  slug: "dance-performing-arts-room",
  description:
    "A vibrant and spacious dance room equipped with full-length mirrors, wooden flooring, and an advanced sound system to nurture creativity, rhythm, and confidence in students through various dance and performing arts activities.",
  image:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7A0C0C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
