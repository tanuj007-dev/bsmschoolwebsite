"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";
import {
  Star,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const reviews = [
  { id: 1, name: "Vinay", relation: "Senior Student", image: "/7.webp", text: `I am Vinay, a student of B.S.M Senior Secondary Public School, and I feel proud to be a part of this institution. My school provides quality education along with good values, discipline and overall development of students. It creates a positive environment where students can learn and grow confidently.\n\nThe school offers a friendly and supportive atmosphere. The teachers are well-qualified, kind and helpful. They explain every topic in an easy and clear manner which makes learning interesting and effective. Teachers always motivate students to improve and guide them whenever needed.`, rating: 5 },
  { id: 2, name: "Student Review", relation: "Senior Student", image: "/bsm_logo-removebg-preview.webp", text: `My school is a place where students learn not only subjects but also good values and discipline. The name of my school is B.S.M Public School.\n\nOur school has well-qualified and caring teachers who always guide us in the right directions. They explain every topic clearly and motivate us to do our best in academics as well as in other activities.\n\nThe campus is clean, green and disciplined. Many activities like sports, debates, cultural programs and morning assemblies are organized regularly.`, rating: 5 },
  { id: 3, name: "Parent Review", relation: "School Parent", image: "/1.webp", text: `My experience at the school has been truly wonderful. The teachers are supportive, knowledgeable and always encourage students to do their best.\n\nThe school provides a safe and motivating environment where children grow with confidence and discipline. I especially appreciate the focus on values, teamwork and personality development.`, rating: 5 },
  { id: 4, name: "Ananya Sharma", relation: "School Parent", image: "/4.webp", text: `The academic structure of the school is very strong and well-organized. Teachers pay individual attention to every child.\n\nAlong with studies, the school encourages sports, cultural activities and competitions which help children grow in every aspect.`, rating: 5 },
  { id: 5, name: "Rohit Mehta", relation: "Alumni", image: "/2.webp", text: `B.S.M Public School has played a major role in shaping my personality. The discipline and guidance I received here helped me build confidence.\n\nThe teachers always encouraged me to aim high and work hard to achieve my goals.`, rating: 5 },
  { id: 6, name: "Community Review", relation: "School Community", image: "/bsm_logo-removebg-preview.webp", text: `B.S.M Public School is truly a place where learning meets excellence. The infrastructure and faculty are outstanding.\n\nThe school focuses on moral values, leadership skills and teamwork.`, rating: 5 },
  { id: 7, name: "Priya Verma", relation: "Student", image: "/6.webp", text: `I feel lucky to study at B.S.M Public School. The teachers are very supportive and always help us understand concepts clearly.\n\nApart from studies, we participate in competitions, cultural events and sports activities which make school life enjoyable.`, rating: 5 },
];

const CARD_WIDTH = 320;
const CARD_GAP = 16;

/** Lazy-load avatar image when card is in/near viewport */
function LazyAvatar({ src, alt }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "80px", threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-gray-100">
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="48px"
          className="object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </div>
  );
}

/** Compact card with fixed size and lazy-loaded image */
const ReviewCard = ({ item, onReadMore }) => {
  return (
    <div
      className="w-[320px] h-[280px] shrink-0 flex flex-col bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <LazyAvatar src={item.image} alt={item.name} />
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-[#1a1a1a] truncate">{item.name}</h4>
          <p className="text-xs text-gray-500 truncate">{item.relation}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
        ))}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 flex-1 min-h-0">
        &ldquo;{item.text}&rdquo;
      </p>

      <button
        type="button"
        onClick={() => onReadMore(item)}
        className="mt-3 text-sm font-semibold text-[#7A0C0C] hover:underline text-left"
      >
        Read More
      </button>
    </div>
  );
};

export default function TVSReviewsSection() {
  const [selectedReview, setSelectedReview] = useState(null);
  const containerRef = useRef(null);
  const x = useRef(0);
  const isManual = useRef(false);

  const speed = 0.06;
  const cardStep = CARD_WIDTH + CARD_GAP;
  const duplicated = [...reviews, ...reviews];

  const moveSlider = (direction) => {
    if (!containerRef.current) return;
    isManual.current = true;
    const moveAmount = direction === "left" ? cardStep : -cardStep;
    x.current += moveAmount;
    containerRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    containerRef.current.style.transform = `translateX(${x.current}px)`;
    setTimeout(() => {
      if (containerRef.current) containerRef.current.style.transition = "none";
      isManual.current = false;
    }, 500);
  };

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || isManual.current) return;
    x.current -= delta * speed;
    const width = containerRef.current.scrollWidth / 2;
    if (Math.abs(x.current) >= width) x.current = 0;
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="w-full bg-[#fcfcfc] py-20 overflow-hidden border-t border-gray-100">
      <div className="container-wide px-4">
        <div className="mb-12 flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#FFF9E6] text-[#D4AF37] p-2 rounded-lg">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                Parents Voice
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">
              Loved by <span className="text-[#7A0C0C]">Parents & Students</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveSlider("left")}
              aria-label="Previous reviews"
              className="p-2.5 rounded-full bg-[#8B0000] text-white shadow hover:shadow-lg transition-shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => moveSlider("right")}
              aria-label="Next reviews"
              className="p-2.5 rounded-full bg-[#8B0000] text-white shadow hover:shadow-lg transition-shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-[#fcfcfc] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-[#fcfcfc] to-transparent"
            aria-hidden
          />
          <div ref={containerRef} className="flex gap-4 w-max">
            {duplicated.map((item, index) => (
              <ReviewCard
                key={`${item.id}-${index}`}
                item={item}
                onReadMore={setSelectedReview}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedReview && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Review detail"
        >
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-black p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image
                  src={selectedReview.image}
                  alt={selectedReview.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{selectedReview.name}</h4>
                <p className="text-sm text-gray-500">{selectedReview.relation}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {selectedReview.text}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
