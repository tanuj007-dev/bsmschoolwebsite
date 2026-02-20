// Server component — static content, no interactivity needed
import { Award, Users, BookOpen } from "lucide-react";
import Image from "next/image";

const CAMPUS_IMAGE = "https://res.cloudinary.com/dpelqhchv/image/upload/v1771501152/IMG_3069.JPG_luodj9.webp";

const AboutSchoolSection = () => {
  return (
    <section className="w-full bg-white py-10 px-3 sm:px-4 md:py-24 md:px-12 lg:px-24 overflow-x-hidden">
      <div className="container-wide min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left: Text Content */}
          <div className="space-y-5 md:space-y-8 order-2 lg:order-1 min-w-0">
            <div className="space-y-3 md:space-y-4">
              <span
                className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-xs md:text-sm"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Who We Are
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0505] leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Elevating <span className="text-[#7A0C0C]">Excellence</span> in Education
              </h2>
            </div>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light" style={{ fontFamily: "Georgia, serif" }}>
              <span className="font-semibold text-[#7A0C0C]">BSM Public School</span>{" "}
              stands as a beacon of learning in North West Delhi. We are more
              than just an educational institution — we are a{" "}
              <span className="font-semibold text-[#7A0C0C]">nurturing ecosystem</span>{" "}
              where young minds are shaped to lead with empathy, confidence, and curiosity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-2 md:pt-4">
              <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border-l-4 border-[#7A0C0C]">
                <Award size={24} className="text-[#D4AF37]" />
                <h4 className="text-lg md:text-xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>Top Rated</h4>
                <p className="text-xs md:text-sm text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
                  Among Delhi&apos;s best CBSE schools
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border-l-4 border-[#7A0C0C]">
                <Users size={24} className="text-[#D4AF37]" />
                <h4 className="text-lg md:text-xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>Expert Faculty</h4>
                <p className="text-xs md:text-sm text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
                  Dedicated mentors &amp; guides
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              Nestled in the heart of{" "}
              <span className="font-semibold text-gray-900">Karala</span>, our campus offers a secure,
              stimulating environment. From{" "}
              <span className="font-semibold text-gray-900">smart classrooms</span>{" "}
              to advanced labs, every corner is designed to support holistic growth.
            </p>
          </div>

          {/* Right: Image + 25+ badge */}
          <div className="relative order-1 lg:order-2 mb-6 lg:mb-0 min-w-0">
            <div className="relative z-10 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
              <Image
                src={CAMPUS_IMAGE}
                alt="BSM Public School campus life"
                width={800}
                height={600}
                className="w-full h-auto object-cover max-h-[280px] sm:max-h-[360px] md:max-h-none"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Decorative circles — smaller on mobile so they don't overflow */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-10 md:-left-10 w-20 h-20 md:w-40 md:h-40 bg-[#7A0C0C] rounded-full opacity-10 z-0" />
            <div className="absolute -top-4 -right-4 md:-top-10 md:-right-10 w-24 h-24 md:w-60 md:h-60 border-2 border-[#D4AF37]/30 rounded-full z-0" />

            {/* 25+ badge — smaller on mobile, fits in screen */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:-bottom-8 md:-right-8 bg-white p-2.5 sm:p-3 md:p-6 rounded-lg shadow-lg border-t-4 border-[#D4AF37] w-[100px] sm:w-[130px] md:w-[200px] z-20">
              <div className="flex items-center gap-1.5 md:gap-3 mb-0.5 md:mb-2">
                <BookOpen size={20} className="text-[#7A0C0C] shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="font-bold text-lg sm:text-xl md:text-3xl text-[#1a0505] leading-none" style={{ fontFamily: "Georgia, serif" }}>
                  25+
                </span>
              </div>
              <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-500 font-medium uppercase tracking-wide leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                Years of Academic Excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSchoolSection;
