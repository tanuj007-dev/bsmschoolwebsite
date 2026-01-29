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
    <section className="relative w-full bg-white py-16 px-4 md:px-8 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-[#1a0505] mb-10">
          The <span className="text-[#D4AF37]">H.E.A.R.T.</span> Philosophy
        </h2>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {heartData.map((item, index) => (
            <div
              key={index}
              className={`group relative flex flex-col items-center justify-center bg-gray-50 border border-gray-100 p-5 md:p-6 rounded-xl transition-all duration-300 md:hover:bg-[#7A0C0C] md:hover:border-[#7A0C0C] md:hover:-translate-y-1 md:hover:shadow-lg ${index === 4 ? "col-span-2 md:col-span-1 md:col-start-2 lg:col-auto" : ""}`}
            >
              <div className="relative mb-3">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] md:group-hover:text-white transition-colors">
                  {item.letter}
                </span>
                <item.icon className="absolute top-0 -right-5 text-gray-200 w-5 h-5 md:group-hover:text-[#D4AF37] transition-colors" />
              </div>

              <h3 className="text-[#1a0505] font-semibold text-sm md:text-base mb-0.5 md:group-hover:text-white transition-colors">
                {item.text}
              </h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-medium uppercase tracking-wide md:group-hover:text-white/80 transition-colors">
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
