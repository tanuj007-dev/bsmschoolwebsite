"use client";

import React from "react";
import { motion } from "framer-motion";

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

  return (
    <section className="w-full bg-[#fafafa] py-24">
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
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl overflow-hidden bg-white border shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&playsinline=1`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
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

        {/* ---------- Instagram Section ---------- */}
        <div>
          <h3 className="font-serif text-3xl text-center text-[#7A0C0C] mb-12">
            Life at Campus on Instagram
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {instagramVideos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl overflow-hidden bg-white border shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-black">
                  <iframe
                    src={`${video.url}&autoplay=1&mute=1`}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
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

      </div>
    </section>
  );
}
