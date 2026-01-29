"use client";

import React, { useEffect, useRef, useState } from "react";
// Removed Next.js Image import as we are using standard img tag for now to avoid potential config issues
// If you want to use Next.js Image component, uncomment the next line and replace img tags
// import Image from "next/image";

const LimitedSeatsCTA = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div
          className={`relative overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/bsm_public_school_building_1769562460953.png"
              alt="BSM Public School"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 md:via-[#7A0C0C]/80 md:to-transparent" />

          {/* Content */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">

            {/* Text Content */}
            <div className="px-6 py-8 md:px-10 md:py-10 text-white z-10 md:order-1 order-2">

              <div
                className={`mb-4 transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "100ms" }}
              >
                <span className="text-[#D4AF37] font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] block mb-1">
                  Start Your Journey
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                  Limited Seats for <span className="italic text-[#D4AF37]">2026-27</span>
                </h2>
                <div className="w-16 h-0.5 bg-[#D4AF37] mt-3 rounded-full" />
              </div>

              <p
                className={`text-white/90 text-sm leading-relaxed max-w-md transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                Secure your child's future at BSM Public School.
                Admissions open from Nursery to Senior Classes.
              </p>

              <div
                className={`mt-6 transition-all duration-700 ease-out flex gap-4 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "300ms" }}
              >
                <a
                  href="tel:+919971231386"
                  className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#ffe58f] text-[#7A0C0C] font-bold text-sm tracking-wide px-6 py-2.5 rounded-lg shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Apply Now
                </a>
              </div>
            </div>

            {/* Spacer for Image Visibility on Desktop */}
            <div className="min-h-[200px] md:min-h-[280px] md:order-2 order-1" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedSeatsCTA;
