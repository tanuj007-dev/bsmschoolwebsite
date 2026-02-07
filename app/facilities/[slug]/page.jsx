"use client";

import { useParams } from "next/navigation";

/* ---------------- Helpers ---------------- */
const getRandomImage = (seed) =>
  `https://picsum.photos/seed/${seed}/900/600`;

/* ---------------- BSM Facilities Data ---------------- */
const facilities = [
  {
    title: "Innovation & Robotics Lab",
    slug: "innovation-robotics-lab",
    desc: "At B.S.M. Public School, the Innovation & Robotics Lab encourages experiential learning through robotics, automation, and modern technology, helping students develop creativity and problem-solving skills.",
  },
  {
    title: "Air-Conditioned Classrooms",
    slug: "air-conditioned-classes",
    desc: "Our air-conditioned classrooms provide a comfortable and focused learning environment, ensuring students remain attentive and engaged throughout the academic day.",
  },
  {
    title: "Safe & Secure Campus",
    slug: "secure-campus",
    desc: "The school campus is fully secured with CCTV surveillance and safety measures, ensuring a safe and disciplined environment for students.",
  },
  {
    title: "Sports Arena",
    slug: "sports-arena",
    desc: "The sports arena promotes physical fitness, teamwork, and sportsmanship through structured indoor and outdoor sports activities.",
  },
  {
    title: "Library & Resource Centre",
    slug: "library-zone",
    desc: "Our well-equipped library provides a peaceful and resource-rich environment that encourages reading, research, and independent learning.",
  },
];

export default function FacilityDetailPage() {
  const { slug } = useParams();
  const facility = facilities.find((f) => f.slug === slug);

  if (!facility) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-[#7A0C0C] text-xl font-medium">
        Facility Not Found
      </div>
    );
  }

  return (
    <section className="bg-[#FFF6EA]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Heading */}
        <h1 className="text-[32px] md:text-[44px] font-semibold text-[#7A0C0C] mb-4">
          {facility.title}
        </h1>

        {/* Divider */}
        <div className="w-32 h-[3px] bg-[#D4AF37] mb-6" />

        {/* Description */}
        <p className="text-[#2B2B2B] max-w-3xl text-[15px] md:text-[16px] leading-relaxed mb-12">
          {facility.desc}
        </p>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl shadow-md group bg-white"
            >
              <img
                src={getRandomImage(`${slug}-${i}`)}
                alt={facility.title}
                className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
