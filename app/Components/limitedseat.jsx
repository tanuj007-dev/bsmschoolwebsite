"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const whatsappNumber = "917303061386";
const message = "Hello, I want to enquire about school admission for 2026-27. Please share details.";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const LimitedSeatsCTA = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          className={`relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            transition-all duration-700 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* ✅ Next.js Image — auto-optimised WebP/AVIF, lazy, correct sizes */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dpelqhchv/image/upload/v1771501152/IMG_3069.JPG_luodj9.webp"
              alt="B.S.M. Public School building"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/20" />

          {/* Content */}
          <div className="relative grid md:grid-cols-2 items-center">
            <div className="px-6 py-10 md:px-12 md:py-14 text-white z-10">
              <span className="inline-block text-[#FFD200] font-bold text-xs uppercase tracking-[0.2em] mb-3">
                Admissions Open 2026–27
              </span>

              <h2 className="text-2xl md:text-4xl font-serif leading-tight mb-4">
                Secure Your Child&apos;s Seat Today
              </h2>

              <p className="text-white/90 text-sm md:text-base max-w-lg leading-relaxed mb-6">
                Limited seats available from Nursery to Senior Classes.
                Apply now and get complete admission guidance from our team.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD200] hover:bg-[#e6bd00] text-[#7A0C0C] font-bold
                    text-sm px-7 py-3 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
                >
                  Enquire on WhatsApp
                </a>

                <a
                  href="tel:+917303061386"
                  className="border border-white/70 hover:bg-white hover:text-[#7A0C0C]
                    text-white font-semibold text-sm px-7 py-3 rounded-lg transition-all"
                >
                  Call On Reception
                </a>
              </div>
            </div>

            {/* Right spacer so image shows through */}
            <div className="min-h-[220px] md:min-h-[320px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedSeatsCTA;
