"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeaderHero = () => {
  const images = [
    "/bannerhd.png"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[580px]">
        {/* Slides */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={img}
              alt="Banner"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20
          h-10 w-10 flex items-center justify-center
          bg-[#6B7280]/70 hover:bg-[#6B7280]/90 text-white
          transition rounded-none"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20
          h-10 w-10 flex items-center justify-center
          bg-[#6B7280]/70 hover:bg-[#6B7280]/90 text-white
          transition rounded-none"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default HeaderHero;
