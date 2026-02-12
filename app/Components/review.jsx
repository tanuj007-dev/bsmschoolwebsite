"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";
import {
  Star,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =======================
   REVIEWS DATA (TOTAL 7)
======================= */

const reviews = [
  {
    id: 1,
    name: "Vinay",
    relation: "Senior Student",
    image: "/7.webp",
    text: `I am Vinay, a student of B.S.M Senior Secondary Public School, and I feel proud to be a part of this institution. My school provides quality education along with good values, discipline and overall development of students. It creates a positive environment where students can learn and grow confidently.

The school offers a friendly and supportive atmosphere. The teachers are well-qualified, kind and helpful. They explain every topic in an easy and clear manner which makes learning interesting and effective. Teachers always motivate students to improve and guide them whenever needed.`,
    rating: 5,
  },
  {
    id: 2,
    name: "Student Review",
    relation: "Senior Student",
    image: "/bsm_logo-removebg-preview.webp",
    text: `My school is a place where students learn not only subjects but also good values and discipline. The name of my school is B.S.M Public School.

Our school has well-qualified and caring teachers who always guide us in the right directions. They explain every topic clearly and motivate us to do our best in academics as well as in other activities.

The campus is clean, green and disciplined. Many activities like sports, debates, cultural programs and morning assemblies are organized regularly.`,
    rating: 5,
  },
  {
    id: 3,
    name: "Parent Review",
    relation: "School Parent",
    image: "/1.webp",
    text: `My experience at the school has been truly wonderful. The teachers are supportive, knowledgeable and always encourage students to do their best.

The school provides a safe and motivating environment where children grow with confidence and discipline. I especially appreciate the focus on values, teamwork and personality development.`,
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Sharma",
    relation: "School Parent",
    image: "/4.webp",
    text: `The academic structure of the school is very strong and well-organized. Teachers pay individual attention to every child.

Along with studies, the school encourages sports, cultural activities and competitions which help children grow in every aspect.`,
    rating: 5,
  },
  {
    id: 5,
    name: "Rohit Mehta",
    relation: "Alumni",
    image: "/2.webp",
    text: `B.S.M Public School has played a major role in shaping my personality. The discipline and guidance I received here helped me build confidence.

The teachers always encouraged me to aim high and work hard to achieve my goals.`,
    rating: 5,
  },
  {
    id: 6,
    name: "Community Review",
    relation: "School Community",
    image: "/bsm_logo-removebg-preview.webp",
    text: `B.S.M Public School is truly a place where learning meets excellence. The infrastructure and faculty are outstanding.

The school focuses on moral values, leadership skills and teamwork.`,
    rating: 5,
  },
  {
    id: 7,
    name: "Priya Verma",
    relation: "Student",
    image: "/6.webp",
    text: `I feel lucky to study at B.S.M Public School. The teachers are very supportive and always help us understand concepts clearly.

Apart from studies, we participate in competitions, cultural events and sports activities which make school life enjoyable.`,
    rating: 5,
  },
];

/* =======================
   REVIEW CARD
======================= */

const ReviewCard = ({ item, onReadMore }) => {
  return (
    <div className="w-[420px] min-h-[340px] bg-white rounded-3xl border border-gray-200 p-7 transition-all duration-500 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-[#D4AF37]">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#1a1a1a]">
              {item.name}
            </h4>
            <p className="text-sm text-gray-500">{item.relation}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 whitespace-pre-line">
          “{item.text}”
        </p>
      </div>

      <button
        onClick={() => onReadMore(item)}
        className="mt-4 text-sm font-semibold text-[black] hover:underline"
      >
        Read More
      </button>
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */

export default function TVSReviewsSection() {
  const [selectedReview, setSelectedReview] = useState(null);
  const containerRef = useRef(null);
  const x = useRef(0);
  const isManual = useRef(false);

  const speed = 0.06;
  const cardWidth = 430;
  const duplicated = [...reviews, ...reviews];

  const moveSlider = (direction) => {
    if (!containerRef.current) return;

    isManual.current = true;

    const moveAmount = direction === "left" ? cardWidth : -cardWidth;
    x.current += moveAmount;

    containerRef.current.style.transition = "transform 0.6s ease";
    containerRef.current.style.transform = `translateX(${x.current}px)`;

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = "none";
      }
      isManual.current = false;
    }, 600);
  };

  useAnimationFrame((t, delta) => {
    if (!containerRef.current || isManual.current) return;

    x.current -= delta * speed;

    const width = containerRef.current.scrollWidth / 2;

    if (Math.abs(x.current) >= width) {
      x.current = 0;
    }

    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="w-full bg-[#fcfcfc] py-24 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-16 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#FFF9E6] text-[#D4AF37] p-2 rounded-lg">
                <MessageCircle size={20} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                Parents Voice
              </span>
            </div>

            <h2 className="font-serif text-4xl text-[#1a1a1a]">
              Loved by <span className="text-[#7A0C0C]">Parents & Students</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => moveSlider("left")}
              className="p-3 rounded-full bg-[#8B0000] border shadow hover:shadow-lg transition"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => moveSlider("right")}
              className="p-3 rounded-full bg-[#8B0000] border shadow hover:shadow-lg transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div ref={containerRef} className="flex gap-10 w-max">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-2xl w-full p-10 rounded-3xl relative shadow-2xl">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-5 mb-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image
                  src={selectedReview.image}
                  alt={selectedReview.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold">
                  {selectedReview.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {selectedReview.relation}
                </p>
              </div>
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {selectedReview.text}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
