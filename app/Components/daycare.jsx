import React from "react";

const DaycareSection = () => {
  const galleryImages = [
    "https://loremflickr.com/600/450/daycare,toddler?lock=10",
    "https://loremflickr.com/600/450/child,playing?lock=11",
    "https://loremflickr.com/600/450/nursery,nap?lock=12",
    "https://loremflickr.com/600/450/preschool,art?lock=13",
    "https://loremflickr.com/600/450/kids,eating?lock=14",
    "https://loremflickr.com/600/450/playground,child?lock=15",
    "https://loremflickr.com/600/450/toy,baby?lock=16",
    "https://loremflickr.com/600/450/care,teacher?lock=17",
    "https://loremflickr.com/600/450/happy,child?lock=18",
    "https://loremflickr.com/600/450/learning,blocks?lock=19",
    "https://loremflickr.com/600/450/daycare,fun?lock=20",
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

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#f2f2f2]"
            >
              <img
                src={src}
                alt={`Daycare Gallery Image ${index + 1}`}
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
