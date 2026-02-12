"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VirtualCampusSection() {
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

  const localReels = [
    { id: 1, path: "/babuman1.mp4" },
    { id: 2, path: "/bsmall.mp4" },
    { id: 3, path: "/celebrity.mp4" },
    { id: 4, path: "/khalifirst.mp4" },
    { id: 5, path: "/khalisecond.mp4" },
  ];

  return (
    <section className="w-full bg-[#fafafa] py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* -------- Header -------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6"
          >
            Life at <span className="text-[#7A0C0C]">BSM</span>
          </motion.h2>

          <p className="text-gray-600 text-lg">
            Watch our students grow, learn and celebrate together.
          </p>
        </div>

        {/* -------- YouTube Section -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {youtubeVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1a1a1a]">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {video.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* -------- Reels Section -------- */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-3xl text-[#1a1a1a] flex items-center gap-5">
            Latest <span className="text-[#7A0C0C]">Highlights</span>

            <a
              href="https://www.instagram.com/bsmpublicschoolkarala/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-14 h-14 rounded-[22px] overflow-hidden shadow-md group-hover:scale-110 transition duration-300 flex items-center justify-center bg-white">

                {/* 🔥 Downloaded Instagram Icon */}
                <img
                  src="/instagramlogo.webp"
                  alt="Instagram"
                  className="w-12 h-12 object-contain"
                />

              </div>
            </a>
          </h3>
        </div>

        {/* -------- Reels Grid -------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {localReels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[9/16]"
            >
              <video
                src={reel.path}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
