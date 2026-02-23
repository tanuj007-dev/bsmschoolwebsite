"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import {
  Star,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const reviews = [
  { id: 1, name: "Vinay", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771502110/7_flx6oz.webp", text: `I am Vinay, a student of B.S.M Senior Secondary Public School, and I feel proud to be a part of this institution. My school provides quality education along with good values, discipline and overall development of students. It creates a positive environment where students can learn and grow confidently.\n\nThe school offers a friendly and supportive atmosphere. The teachers are well-qualified, kind and helpful. They explain every topic in an easy and clear manner which makes learning interesting and effective. Teachers always motivate students to improve and guide them whenever needed.`, rating: 5 },
  // { id: 2, name: "Student Review", image: "/bsm_logo-removebg-preview.webp", text: `My school is a place where students learn not only subjects but also good values and discipline. The name of my school is B.S.M Public School.\n\nOur school has well-qualified and caring teachers who always guide us in the right directions. They explain every topic clearly and motivate us to do our best in academics as well as in other activities.\n\nThe campus is clean, green and disciplined. Many activities like sports, debates, cultural programs and morning assemblies are organized regularly.`, rating: 5 },
  { id: 3, name: "Parent Review", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771502138/1_p850fn.webp", text: `My experience at the school has been truly wonderful. The teachers are supportive, knowledgeable and always encourage students to do their best.\n\nThe school provides a safe and motivating environment where children grow with confidence and discipline. I especially appreciate the focus on values, teamwork and personality development.`, rating: 5 },
  { id: 4, name: "Ananya Sharma", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771502145/4_itmy1o.webp", text: `The academic structure of the school is very strong and well-organized. Teachers pay individual attention to every child.\n\nAlong with studies, the school encourages sports, cultural activities and competitions which help children grow in every aspect.`, rating: 5 },
  { id: 5, name: "Rohit Mehta", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771502150/2_utoxei.webp", text: `B.S.M Public School has played a major role in shaping my personality. The discipline and guidance I received here helped me build confidence.\n\nThe teachers always encouraged me to aim high and work hard to achieve my goals.`, rating: 5 },
  // { id: 6, name: "Community Review", image: "/bsm_logo-removebg-preview.webp", text: `B.S.M Public School is truly a place where learning meets excellence. The infrastructure and faculty are outstanding.\n\nThe school focuses on moral values, leadership skills and teamwork.`, rating: 5 },
  { id: 7, name: "Priya Verma", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771502165/6_oupax1.webp", text: `I feel lucky to study at B.S.M Public School. The teachers are very supportive and always help us understand concepts clearly.\n\nApart from studies, we participate in competitions, cultural events and sports activities which make school life enjoyable.`, rating: 5 },
  { id: 8, name: "Reena", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771589483/WhatsApp_Image_2026-02-20_at_3.13.19_PM_bonhzr.jpg", text: `B.S.M Public School is an amazing place, where young minds find the ideal environment to grow and explore their potential. From academics to extracurricular activities, there's something for everyone.`, rating: 5 },
  { id: 9, name: "Deepika", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771590120/WhatsApp_Image_2026-02-20_at_3.13.20_PM_1_kmugw1.jpg", text: `We are thankful to the school and teachers for guiding our child. The school is helping in our child's overall development. The school plays an important role in shaping our child's future. We appreciate the hard work of all the teachers. We sincerely thank the school for its constant efforts.`, rating: 5 },
  { id: 10, name: "Kavita", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771825658/WhatsApp_Image_2026-02-21_at_12.41.56_PM_aaiekh.jpg", text: `As a parent, I am very satisfied with B.S.M Public School. The teachers are dedicated and take genuine interest in each child's progress. My child has become more confident and disciplined since joining. The school's focus on both academics and values is exactly what we were looking for.`, rating: 5 },
  { id: 11, name: "Ramesh", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771826212/WhatsApp_Image_2026-02-20_at_3.13.18_PM_loikfo.jpg", text: `B.S.M Public School has been a great choice for our family. The campus is safe and well-maintained, and the staff is always approachable. We have seen our child excel in studies as well as in sports and cultural activities. Thank you to the entire team for their continuous support.`, rating: 5 },
  { id: 12, name: "Ajitesh", image: "https://res.cloudinary.com/dpelqhchv/image/upload/v1771826363/WhatsApp_Image_2026-02-20_at_3.13.19_PM_1_phgjcy.jpg", text: `We are grateful to B.S.M Public School for providing such a nurturing environment. The teachers go the extra mile to ensure every child understands the concepts. The school's emphasis on discipline and character building has had a positive impact on our child. Highly recommended.`, rating: 5 },
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
const ReviewCard = memo(function ReviewCard({ item, onReadMore }) {
  return (
    <div
      className="w-[320px] h-[280px] shrink-0 flex flex-col bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <LazyAvatar src={item.image} alt={item.name} />
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-[#1a1a1a] truncate">{item.name}</h4>

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
});

const SLIDER_SPEED = 0.06;

export default function TVSReviewsSection() {
  const [selectedReview, setSelectedReview] = useState(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const x = useRef(0);
  const isManual = useRef(false);
  const inView = useRef(true);
  const rafId = useRef(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { rootMargin: "100px", threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastTime = 0;
    function tick(time) {
      rafId.current = requestAnimationFrame(tick);
      if (!containerRef.current || isManual.current || !inView.current) return;
      const delta = time - lastTime;
      lastTime = time;
      x.current -= delta * SLIDER_SPEED;
      const width = containerRef.current.scrollWidth / 2;
      if (Math.abs(x.current) >= width) x.current = 0;
      containerRef.current.style.transform = `translateX(${x.current}px)`;
    }
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#fcfcfc] py-20 overflow-hidden border-t border-gray-100">
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
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a]">
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
