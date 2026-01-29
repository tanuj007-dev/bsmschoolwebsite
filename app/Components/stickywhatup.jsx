"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const WhatsAppSticky = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Auto open after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "919971231386";
  const message = "Hi! I want admission details.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-4">

      {/* Chat Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, type: "spring" }}
            className="w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-[#25D366]" size={24} />
                </div>
                <div className="text-white">
                  <h4 className="font-bold text-base leading-tight">
                    WhatsApp Support
                  </h4>
                  <p className="text-xs text-white/90">
                    Typically replies in minutes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                👋 Hi! Need admission details? <br />
                Click below to start WhatsApp chat.
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold py-3 rounded-full transition-all shadow-md hover:-translate-y-0.5"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setShowPopup(prev => !prev)}
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        aria-label="WhatsApp Chat"
      >
        {/* Ping Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>

        {/* WhatsApp Icon */}
        <FaWhatsapp className="text-white" size={30} />

        {/* Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
          1
        </span>
      </button>

    </div>
  );
};

export default WhatsAppSticky;
