"use client";

import React from "react";
import LazyVideo from "./LazyVideo";

const DaycareSection = () => {
  const videos = [
    { video: `/${encodeURIComponent("Little scholars with the cutest chubby cheeks 💕#SchoolKids#ChubbyCheeks#LittleLearners#HappySch.mp4")}`, alt: "Little scholars at daycare" },
    { video: `/${encodeURIComponent("Their laughter is the frame, the memories are the picture 💕💕💕💕#CuteKids #KidsMemories #Memor.mp4")}`, alt: "Daycare memories" },
    { video: `/${encodeURIComponent("Tiny smiles, big memories — captured in the sweetest frame. 💛✨ #CuteKids #ChildhoodMemories #Li.mp4")}`, alt: "Tiny smiles, big memories" },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-20 antialiased">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-[40px] font-light text-[#7A0C0C] leading-tight mb-4">
            Daycare Facility at B.S.M. Public School
          </h2>

          <div className="w-24 h-[2px] bg-[#D4AF37] mb-6" />

          <div className="max-w-[900px] space-y-4">
            <p className="text-black text-base md:text-lg font-light leading-relaxed tracking-wide">
              B.S.M. Public School provides a safe, caring, and structured daycare
              facility for young children beyond school hours. The daycare
              environment is designed to offer comfort, supervision, and
              meaningful engagement.
            </p>

            <p className="text-black text-base md:text-lg font-light leading-relaxed tracking-wide">
              Activities are thoughtfully planned to encourage discipline,
              creativity, social interaction, and overall well-being, making the
              daycare an extension of the school’s value-based learning culture.
            </p>
          </div>
        </div>

        {/* 3 videos - lazy load when in view */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((item, index) => (
            <div
              key={index}
              className="relative aspect-9/16 w-full overflow-hidden rounded-xl bg-[#f2f2f2]"
            >
              <LazyVideo
                src={item.video}
                className="h-full w-full"
                preload="metadata"
                ariaLabel={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DaycareSection;
