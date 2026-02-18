"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const HeaderHero = () => {
  const whatsappNumber = "917303061386";
  const [open, setOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* ================= HERO IMAGE (NO EFFECT AT ALL) ================= */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[460px] lg:h-[560px] min-h-[260px]">
        <Image
          src="/2.jpg.jpeg"
          alt="Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left sm:object-center"
        />

        {/* ================= LEFT SIDE 3D BUTTON ================= */}
        <div className="
          absolute
          bottom-10 sm:bottom-16 md:bottom-20
          left-6 sm:left-12 md:left-20
          z-20
          flex items-center justify-start
        ">

          {/* ================= MAIN BUTTON ================= */}
          <motion.button
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1,   
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 0.8,
              y: { repeat: Infinity, duration: 3 }
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative
              group
              px-8 sm:px-12
              py-3 sm:py-4
              text-sm sm:text-lg
              rounded-full
              font-bold
              tracking-wider
              text-white
              bg-gradient-to-br from-[#8B0000] via-[#B22222] to-[#5c0000]
              shadow-[0_25px_50px_rgba(139,0,0,0.6)]
              overflow-hidden
            "
          >

            {/* INNER BUBBLE WAVE 1 */}
            <motion.span
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{ scale: [0.8, 1.2], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />

            {/* INNER BUBBLE WAVE 2 */}
            <motion.span
              className="absolute inset-0 rounded-full bg-white/15"
              animate={{ scale: [0.8, 1.2], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 1.2 }}
            />

            {/* 3D Depth Shadow */}
            <span className="
              absolute inset-0
              rounded-full
              bg-black/20
              translate-y-2
              blur-xl
              -z-10
            "></span>

            {/* Shine Effect */}
            <span className="
              absolute
              top-0 left-[-120%]
              w-full h-full
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              rotate-12
              group-hover:left-[120%]
              transition-all duration-700
            "></span>

            <span className="relative flex items-center gap-3">
              ENROLL NOW
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>

          </motion.button>
        </div>
      </div>

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
                fixed
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[92%] sm:w-[420px]
                bg-white
                rounded-3xl
                p-6 sm:p-8
                text-center
                shadow-2xl
                z-50
              "
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#8B0000] mb-3">
                Ready to Enroll?
              </h2>

              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Click below to connect with us and secure your admission.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block
                  bg-gradient-to-r from-[#8B0000] to-[#B22222]
                  hover:scale-105
                  text-white
                  px-6
                  py-3
                  text-sm sm:text-base
                  rounded-full
                  font-semibold
                  transition
                  shadow-lg
                "
              >
                Contact on WhatsApp
              </a>

              <button
                onClick={() => setOpen(false)}
                className="block mt-5 text-sm text-gray-500 hover:text-black transition"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeaderHero;
