"use client";
import React from "react";
import { Heart, Users, Target, Shield, Zap } from "lucide-react";

const PhilosophySection = () => {
  const heartData = [
    { letter: "H", text: "Happier", sub: "in learning", icon: Heart },
    { letter: "E", text: "Empathetic", sub: "towards all", icon: Users },
    { letter: "A", text: "Achievers", sub: "with purpose", icon: Target },
    { letter: "R", text: "Resilient", sub: "in challenges", icon: Shield },
    { letter: "T", text: "Thoughtful", sub: "in action", icon: Zap },
  ];

  return (
    <section className="relative w-full bg-[#fafafa] py-20 px-4 md:py-24 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white/80 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 container-wide text-center">
        <h2 className="text-2xl md:text-4xl font-serif font-semibold text-[#1a0505] mb-3">
          The <span className="text-[#7A0C0C]">H.E.A.R.T.</span> Philosophy
        </h2>
        <div className="w-16 h-0.5 bg-[#7A0C0C] mx-auto mb-12" aria-hidden="true" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {heartData.map((item, index) => (
            <div
              key={index}
              className={`group relative flex flex-col items-center justify-center bg-white border border-[#7A0C0C]/15 p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-300 md:hover:bg-[#7A0C0C] md:hover:border-[#7A0C0C] md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-[#7A0C0C]/15 ${index === 4 ? "col-span-2 md:col-span-1 md:col-start-2 lg:col-auto" : ""}`}
            >
              <div className="relative mb-4">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#7A0C0C] md:group-hover:text-white transition-colors">
                  {item.letter}
                </span>
                <item.icon className="absolute top-0 -right-5 text-[#7A0C0C]/20 w-5 h-5 md:group-hover:text-white/40 transition-colors" />
              </div>

              <h3 className="text-[#1a0505] font-semibold text-sm md:text-base mb-1 md:group-hover:text-white transition-colors">
                {item.text}
              </h3>
              <p className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider md:group-hover:text-white/90 transition-colors">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
