"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";

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

  /* ---------------- Local Reels ---------------- */
  const localReels = [
    {
      id: 1,
      title: "Nurturing Nature",
      path: "/bsm_nature.mp4",
    },
    {
      id: 2,
      title: "New Session Ready",
      path: "/bsm_session.mp4",
    },
    {
      id: 3,
      title: "Values & Dreams",
      path: "/bsm_values.mp4",
    },
    {
      id: 4,
      title: "Admissions Open",
      path: "/bsm_admissions.mp4",
    },
    {
      id: 5,
      title: "Annual Function",
      path: "/bsm_annual_function.mp4",
    },
  ];

  const scrollContainerRef = useRef(null);

  return (
    <section className="w-full bg-[#fafafa] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* ---------- Header ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#D4AF37] font-bold tracking-[0.2em] text-sm uppercase block mb-3"
          >
            Virtual Experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6"
          >
            Life at <span className="text-[#7A0C0C]">BSM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Watch our students grow, learn, and celebrate in a nurturing environment.
          </motion.p>
        </div>

        {/* ---------- YouTube Section ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {youtubeVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&playsinline=1`}
                  className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="p-6 bg-white">
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-2 group-hover:text-[#7A0C0C] transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {video.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- Reels Section ---------- */}
        <div className="relative max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-between mb-8 px-2"
          >
            <h3 className="font-serif text-3xl text-[#1a1a1a] flex items-center gap-3">
              Latest <span className="text-[#7A0C0C]">Highlights</span>
              <a
                href="https://www.instagram.com/bsmpublicschoolkarala/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-gray-200 hover:border-[#E1306C] hover:bg-[#E1306C]/10 transition duration-300 inline-flex"
              >
                <Instagram size={28} className="text-[#E1306C]" />
              </a>
            </h3>
          </motion.div>

          {/* Scrollable Container */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 max-w-8xl mx-auto lg:grid-cols-5 gap-4"
          >
            {localReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-xl aspect-9/16 group"
              >
                {/* Video Background */}
                <video
                  src={reel.path}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
