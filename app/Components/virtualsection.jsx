"use client";

import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { MapPin } from "lucide-react";

export default function VirtualCampusSection() {
  /* ---------------- YouTube Videos ---------------- */
  const youtubeVideos = [
    {
      id: 1,
      title: "Campus Walkthrough",
      subtitle: "Classrooms • Library • Sports",
      videoId: "fudHB7hHBXg",
    },
    {
      id: 2,
      title: "Student Life",
      subtitle: "Activities • Events • Learning",
      videoId: "MYcPS8llxJk",
    },
  ];

  /* ---------------- Instagram Reels ---------------- */
  const instagramVideos = [
    {
      id: 1,
      title: "Campus Moments",
      subtitle: "Daily life at campus",
      url: "https://www.instagram.com/reel/DSfObk0kumF/embed?autoplay=1&mute=1&playsinline=1",
    },
    {
      id: 2,
      title: "Student Activities",
      subtitle: "Learning beyond classrooms",
      url: "https://www.instagram.com/reel/DT4wzIhEleN/embed?autoplay=1&mute=1&playsinline=1",
    },
    {
      id: 3,
      title: "Events & Celebrations",
      subtitle: "Memorable campus events",
      url: "https://www.instagram.com/reel/DT0IyZFjxb_/embed?autoplay=1&mute=1&playsinline=1",
    },
  ];

  /* ---------------- Facilities ---------------- */
  const facilities = [
    {
      id: 1,
      title: "Innovation & Robotics Lab",
      desc: "Hands-on learning with modern tech & creativity.",
      image: "/images/robotics_lab_school_1769561128597.png",
    },
    {
      id: 2,
      title: "Air-conditioned Classes",
      desc: "Comfortable classrooms for focused learning.",
      image: "/images/modern_classroom_school_1769561148587.png",
    },
    {
      id: 3,
      title: "Secure Campus",
      desc: "Safety-first campus with secure monitoring.",
      image: "/images/secure_school_campus_1769561212830.png",
    },
    {
      id: 4,
      title: "Sports Arena",
      desc: "Fitness, sportsmanship & energy in one place.",
      image: "/images/sports_arena_school_1769561170526.png",
    },
    {
      id: 5,
      title: "Library Zone",
      desc: "Quiet, focused and resourceful environment.",
      image: "/images/school_library_modern_1769561191343.png",
    },
  ];

  const loopedFacilities = [...facilities, ...facilities, ...facilities];
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 25, // Thoda slow kiya smooth feel ke liye
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className="w-full bg-[#fafafa] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ---------- Header ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-sm uppercase block mb-3">
            Virtual Tour
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] mb-6">
            Experience Our <span className="text-[#7A0C0C]">Campus</span>
          </h2>
          <p className="text-gray-500">
            Take a closer look at where your child will learn, grow, and thrive.
          </p>
        </div>

        {/* ---------- YouTube Section ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {youtubeVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -5 }}
              className="rounded-3xl overflow-hidden bg-white border shadow-sm"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&playsinline=1`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-1">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {video.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- Instagram Section (Optimized Height) ---------- */}
        <div className="mb-28">
          <h3 className="font-serif text-3xl text-center text-[#7A0C0C] mb-12">
            Life at Campus on Instagram
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {instagramVideos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -5 }}
                className="rounded-3xl overflow-hidden bg-white border shadow-sm flex flex-col"
              >
                {/* Height reduced using aspect-square or aspect-[4/5] */}
                <div className="relative aspect-[4/5] bg-black">
                  <iframe
                    src={video.url}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; encrypted-media"
                  />
                </div>

                <div className="p-5">
                  <h4 className="font-serif text-lg text-[#1a1a1a]">
                    {video.title}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {video.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------- Facilities ---------- */}
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-serif text-[#1a2b5d] text-3xl">
            Premium <span className="text-[#1a2b5d]">Facilities</span>
          </h3>
        </div>

        <div className="relative overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12">
          <motion.div
            className="flex gap-6 w-max"
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                x: "-50%",
                transition: { duration: 25, ease: "linear", repeat: Infinity },
              })
            }
          >
            {loopedFacilities.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="min-w-[300px] md:min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-sm border group"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#7A0C0C] shadow-md">
                    <MapPin size={16} />
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-serif text-xl font-bold mb-2 text-[#1a1a1a]">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Fading Edges for the Carousel */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}