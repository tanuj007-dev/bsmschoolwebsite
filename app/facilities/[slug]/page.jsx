"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

/* ================= FACILITIES DATA ================= */

const facilitiesData = {
  "school-campus": {
    title: "School Campus",
    desc: "Our beautifully designed campus provides a peaceful and inspiring learning atmosphere.",
    video: "/schoolcampus.mp4",
    gallery: [
      "/images/campus1.webp",
      "/images/campus2.webp",
      "/images/campus3.webp",
    ],
  },

  "secure-campus": {
    title: "Secure Campus",
    desc: "24/7 CCTV monitored campus ensuring complete student safety and discipline.",
    video: "/videos/secure-campus.mp4",
    gallery: [
      "/images/secure1.webp",
      "/images/secure2.webp",
    ],
  },

  "smart-class": {
    title: "Smart Class",
    desc: "Digitally equipped classrooms with smart boards and modern teaching tools.",
    video: "/videos/smart-class.mp4",
    gallery: [
      "/images/smart1.webp",
      "/images/smart2.webp",
    ],
  },

  sports: {
    title: "Sports",
    desc: "Indoor and outdoor sports facilities promoting fitness, teamwork and leadership.",
    video: "/videos/sports.mp4",
    gallery: [
      "/images/sports1.webp",
      "/images/sports2.webp",
    ],
  },

  library: {
    title: "Library",
    desc: "A peaceful and well-stocked library encouraging reading and research culture.",
    video: "/videos/library.mp4",
    gallery: [
      "/images/library1.webp",
      "/images/library2.webp",
    ],
  },

  "physics-lab": {
    title: "Physics Lab",
    desc: "Fully equipped physics laboratory for practical scientific exploration.",
    video: "/videos/physics-lab.mp4",
    gallery: [
      "/images/physics1.webp",
      "/images/physics2.webp",
    ],
  },

  "chemistry-lab": {
    title: "Chemistry Lab",
    desc: "Advanced chemistry lab with modern safety measures and apparatus.",
    video: "/videos/chemistry-lab.mp4",
    gallery: [
      "/images/chemistry1.webp",
      "/images/chemistry2.webp",
    ],
  },

  "bio-lab": {
    title: "Bio Lab",
    desc: "Modern biology lab supporting hands-on learning and experiments.",
    video: "/videos/bio-lab.mp4",
    gallery: [
      "/images/bio1.webp",
      "/images/bio2.webp",
    ],
  },

  "medical-room": {
    title: "Medical Room",
    desc: "On-campus medical facility ensuring immediate healthcare assistance.",
    video: "/videos/medical-room.mp4",
    gallery: [
      "/images/medical1.webp",
      "/images/medical2.webp",
    ],
  },

  "play-area": {
    title: "Play Area",
    desc: "Safe and engaging play zone specially designed for junior students.",
    video: "/videos/play-area.mp4",
    gallery: [
      "/images/play1.webp",
      "/images/play2.webp",
    ],
  },

  "music-room": {
    title: "Music Room",
    desc: "Creative musical space for learning instruments and vocal training.",
    video: "/videos/music-room.mp4",
    gallery: [
      "/images/music1.webp",
      "/images/music2.webp",
    ],
  },
};

/* ================= PAGE COMPONENT ================= */

export default function FacilityDetailPage() {
  const { slug } = useParams();
  const facility = facilitiesData[slug];

  if (!facility) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#7A0C0C] text-2xl font-semibold">
        Facility Not Found
      </div>
    );
  }

  return (
    <section className="bg-[#FFF6EA] min-h-screen">
      <div className="container-wide px-6 py-20">

        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-[32px] md:text-[44px] font-semibold text-[#7A0C0C] mb-4">
            {facility.title}
          </h1>
          <div className="w-24 h-[3px] bg-[#D4AF37] mb-6" />
          <p className="text-[#2B2B2B] max-w-3xl text-[15px] md:text-[16px] leading-relaxed">
            {facility.desc}
          </p>
        </div>

        {/* Video Section */}
       <div className="mb-16 flex justify-start">
  <div className="relative w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black">

    <video
      className="w-full h-full object-contain bg-black"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={facility.video} type="video/mp4" />
    </video>

  </div>
</div>



        {/* Gallery Section */}
        <div>
          <h2 className="text-2xl font-semibold text-[#7A0C0C] mb-8">
            Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {facility.gallery.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-md group bg-white h-[250px]"
              >
                <Image
                  src={img}
                  alt={`${facility.title} gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
