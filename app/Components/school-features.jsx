"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

const ProgramsSection = () => {
  const cards = [
    {
      title: "Academic & Value-Based Education",
      description:
        "A structured CBSE curriculum combined with discipline, moral values and character building to support holistic development.",
      image: "https://loremflickr.com/800/600/indian,classroom,student?lock=1",
    },
    {
      title: "Co-Curricular & Cultural Activities",
      description:
        "Regular participation in cultural programmes, debates, art & craft, music, dance and school events throughout the year.",
      image: "https://loremflickr.com/800/600/indian,dance,culture?lock=2",
    },
    {
      title: "Experienced & Dedicated Faculty",
      description:
        "Qualified and experienced teachers focused on academic excellence, student guidance and personal attention.",
      image: "https://loremflickr.com/800/600/indian,teacher,classroom?lock=3",
    },
    {
      title: "Sports & Physical Development",
      description:
        "Indoor and outdoor sports activities to promote physical fitness, teamwork and overall well-being.",
      image: "https://loremflickr.com/800/600/kids,sports,playground?lock=4",
    },
    {
      title: "Smart Classrooms & Digital Learning",
      description:
        "Technology-enabled classrooms with digital tools to enhance engagement and learning outcomes.",
      image: "https://loremflickr.com/800/600/computer,classroom,student?lock=5",
    },
    {
      title: "Personality & Leadership Development",
      description:
        "Programs designed to build confidence, communication skills and leadership qualities.",
      image: "https://loremflickr.com/800/600/student,speech,microphone?lock=6",
    },
    {
      title: "Art, Craft & Creativity",
      description:
        "Creative activities encouraging imagination, innovation and artistic expression.",
      image: "https://loremflickr.com/800/600/kids,painting,art?lock=7",
    },
    {
      title: "Moral Education & Life Skills",
      description:
        "Value-based learning to instill ethics, responsibility and essential life skills.",
      image: "https://loremflickr.com/800/600/kids,planting,helping?lock=8",
    },
    {
      title: "Safe & Supportive Environment",
      description:
        "A secure, nurturing campus ensuring emotional, physical and academic safety.",
      image: "https://loremflickr.com/800/600/school,security,safe?lock=9",
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
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-white rounded-xl overflow-hidden h-full shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Image Container with Overlay */}
              <div className="relative w-full aspect-16/10 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#7A0C0C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-col grow p-6 md:p-7 relative bg-white transition-colors duration-500 group-hover:bg-[#7A0C0C]">
                {/* Decorative Accent */}
                <div className="w-12 h-1 bg-[#D4AF37] mb-5 rounded-full" />

                <h3 className="text-[#7A0C0C] group-hover:text-[#D4AF37] text-lg md:text-xl font-bold mb-3 transition-colors duration-500 font-serif">
                  {card.title}
                </h3>

                <p className="text-gray-600 group-hover:text-white/90 text-sm md:text-base leading-relaxed transition-colors duration-500">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
