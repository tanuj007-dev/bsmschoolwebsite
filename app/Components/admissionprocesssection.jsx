"use client";

import React, { useEffect, useRef, useState } from "react";

const AdmissionProcessSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const steps = [
    {
      step: "Step 1",
      title: "Submit the Admission Enquiry Form",
      icon: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A0C0C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
          <path d="M7 9h3" />
          <circle cx="18.5" cy="18.5" r="2.5" />
          <path d="M18.5 17v1.8" />
          <path d="M18.5 20.7h.01" />
        </svg>
      ),
    },
    {
      step: "Step 2",
      title: "Interaction with School Admission Team",
      icon: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A0C0C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
          <path d="M14 3h7v7" />
          <path d="M21 3l-7 7" />
        </svg>
      ),
    },
    {
      step: "Step 3",
      title: "Campus Visit & Admission Confirmation",
      icon: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A0C0C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 sm:py-12 overflow-hidden"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div
          className={`text-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <h2 className="text-[#7A0C0C] font-medium tracking-wide text-[30px] sm:text-[36px] md:text-[44px]">
            Admission Process at B.S.M. Public School
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`relative text-center transition-all duration-700 ease-out ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Desktop Arrow */}
              {idx !== steps.length - 1 && (
                <div className="hidden md:flex absolute top-[52px] -right-6 translate-x-1/2 items-center gap-2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </div>
              )}

              <p className="text-[#7A0C0C] text-[16px] font-medium">
                {item.step}
              </p>

              <div className="mt-4 flex justify-center">{item.icon}</div>

              <p className="mt-4 text-[#2B2B2B] font-medium text-[18px] sm:text-[19px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div
          className={`mt-10 flex justify-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "500ms" }}
        >
          
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcessSection;
