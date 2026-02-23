"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const WHATSAPP_NUMBER = "917303061386";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const slides = [
  {
    id: 1,
    video: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771492809/senior_school_1st_6seconds_eigwzv.mp4",
    title: "Senior Wing",
    text:
      "At B.S.M Public School, the Senior Wing focuses on academic excellence, leadership development, and career readiness. We provide a disciplined yet inspiring environment that empowers students with critical thinking, confidence, and strong ethical values. Our curriculum is designed to prepare students for board examinations and beyond, with dedicated faculty mentoring each child. Beyond academics, we nurture leadership through student councils, debates, and community initiatives so that every senior leaves ready to lead. We offer a wide range of subjects, regular assessments, and career guidance to help students discover their strengths and plan for higher education. The Senior Wing campus includes well-equipped labs, a spacious library, and dedicated spaces for sports and cultural activities, ensuring holistic development alongside academic rigour.",
    designation: "Advanced Academics • Leadership • Career Focus",
  },
  {
    id: 2,
    video: "https://res.cloudinary.com/dpelqhchv/video/upload/v1771571387/Warehouse_video_of_UPKIT-3_h7h6ho.mp4",
    title: "Junior Wing",
    text:
      "At B.S.M Public School, the Foundational Stage is a joyful and nurturing beginning to a child's learning journey. We follow a play-based, activity-oriented approach that supports children's physical, cognitive, social, emotional, and language development. Our classrooms are bright, safe spaces where curiosity is encouraged and every small achievement is celebrated. Through stories, art, music, and hands-on activities, we lay a strong foundation for lifelong learning and confident, caring individuals. Trained educators use age-appropriate methods and a variety of learning materials to keep young minds engaged. We also emphasise values, sharing, and teamwork from the early years, so that every child feels valued and ready to step into the primary grades with confidence and a love for learning.",
    designation: "Foundation • Activity Learning • Value Education",
  },
];

function LazyVideo({ src, isActive, onEnded, className }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (isActive) {
      video.load();
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, shouldLoad, src]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${!shouldLoad ? "bg-gray-200" : ""}`}>
      {!shouldLoad ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          Loading…
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          muted
          loop={false}
          playsInline
          preload="metadata"
          onEnded={onEnded}
          className={`absolute inset-0 w-full h-full ${className}`}
        />
      )}
    </div>
  );
}

export default function AppreciationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full py-14 bg-white overflow-hidden font-sans">
      <div className="container-wide px-3 md:px-4">
       
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[520px] md:min-h-[560px]">
          {/* MEDIA - lazy loaded video; center crop (top and bottom cut) */}
          <div className="relative md:w-[35%] h-[380px] md:h-auto md:min-h-[560px] overflow-hidden bg-gray-100 shrink-0">
            <LazyVideo
              src={slide.video}
              isActive
              onEnded={nextSlide}
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0  pointer-events-none"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#7A0C0C] shadow">
              {slide.title}
            </div>
          </div>

          {/* CONTENT - larger right side; tighter horizontal padding on mobile so text fits with no extra space */}
          <div className="relative md:w-[65%] px-4 py-6 md:p-12 flex flex-col justify-between min-w-0">
            <Quote
              size={100}
              className="absolute top-8 left-8 text-gray-100 hidden md:block"
              strokeWidth={0}
              fill="currentColor"
              aria-hidden
            />

            <div className="relative z-10 transition-opacity duration-200">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                "{slide.text}"
              </p>
              <h4 className="text-[#1a2b5d] font-bold uppercase tracking-widest text-sm">
                {slide.title}
              </h4>
              <p className="text-gray-500 text-xs mt-2 tracking-wide">
                {slide.designation}
              </p>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-colors duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-colors duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
