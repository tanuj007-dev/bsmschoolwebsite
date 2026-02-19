"use client";

import { m } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const bubbles = [
  { size: 10, x: 6, delay: 0 },
  { size: 14, x: 18, delay: 0.15 },
  { size: 8, x: -10, delay: 0.3 },
  { size: 12, x: 14, delay: 0.45 },
];

const StickyWhatsAppEnroll = () => {
  return (
    <m.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-3 top-1/2 -translate-y-1/2 z-[9999]"
    >
      {/* Bubble Trail (load only) */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((b, i) => (
          <m.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.4, 0], y: -40 }}
            transition={{
              duration: 1.4,
              delay: b.delay,
              ease: "easeOut",
            }}
            style={{
              width: b.size,
              height: b.size,
              left: `calc(50% + ${b.x}px)`,
            }}
            className="
              absolute bottom-2
              rounded-full
              bg-[#7A0C0C]/25
              blur-sm
            "
          />
        ))}
      </div>

      {/* Button */}
      <a
        href="https://wa.me/917303061386"
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative z-10
          flex items-center gap-3
          px-5 py-3
          bg-white
          text-[#7A0C0C] font-semibold
          rounded-xl
          shadow-lg
          rotate-[-90deg] origin-left
          hover:shadow-xl
          transition-all duration-300
        "
      >
        <FaWhatsapp className="text-lg" />
        <span className="text-sm tracking-widest uppercase">
          Enroll Now
        </span>
      </a>
    </m.div>
  );
};

export default StickyWhatsAppEnroll;
