"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppSticky = () => {
  const phoneNumber = "919971231386";
  const message = "Hi! I want admission details.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[99999] group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
        
        {/* Ping effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>

        {/* Icon */}
        <FaWhatsapp className="text-white relative z-10" size={30} />
      </div>
    </a>
  );
};

export default WhatsAppSticky;
