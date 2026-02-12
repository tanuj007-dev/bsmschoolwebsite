import React from "react";

const DaycareSection = () => {
  const galleryImages = [
    { src: "/gallery/Gemini_Generated_Image_8kj0sz8kj0sz8kj0.png", alt: "Learn and grow – teacher and children with picture book" },
    { src: "/gallery/Gemini_Generated_Image_bkprvwbkprvwbkpr.png", alt: "Daycare classroom with blocks, ball pit and books" },
    { src: "/gallery/Gemini_Generated_Image_mxr6h5mxr6h5mxr6.png", alt: "Art class – create, innovate, express" },
    { src: "/gallery/Gemini_Generated_Image_8p7e148p7e148p7e.png", alt: "Music and play – teacher with guitar, children in circle" },
    { src: "/gallery/Gemini_Generated_Image_e3oo0ke3oo0ke3oo.png", alt: "School dining – children enjoying meal together" },
    { src: "/gallery/IMG-20260103-WA0026.jpg.jpeg", alt: "Art and creativity in the classroom" },
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

        {/* 6 images: 3 cols × 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#f2f2f2]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DaycareSection;
