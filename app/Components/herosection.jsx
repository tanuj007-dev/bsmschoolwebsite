"use client";

import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback, memo } from "react";

// ─── Memoized modal so it only re-renders when `open` changes ────────────
const EnrollModal = memo(function EnrollModal({ open, onClose }) {
  const whatsappNumber = "917303061386";
  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            // spring is heavier — use tween for snappier modal
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[92%] sm:w-[420px] bg-white rounded-3xl p-6 sm:p-8
              text-center shadow-xl z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enroll-modal-title"
          >
            <h2
              id="enroll-modal-title"
              className="text-xl sm:text-2xl font-bold text-[#8B0000] mb-3"
            >
              Ready to Enroll?
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Click below to connect with us and secure your admission.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-linear-to-r from-[#8B0000] to-[#B22222]
                hover:opacity-90 text-white px-6 py-3 text-sm sm:text-base
                rounded-full font-semibold transition-opacity shadow-lg"
            >
              Contact on WhatsApp
            </a>

            <button
              onClick={onClose}
              className="block mt-5 mx-auto text-sm text-gray-500 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              Close
            </button>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
});

// ─── Main Hero ────────────────────────────────────────────────────────────
const HeaderHero = () => {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <section className="relative w-full min-w-0 overflow-x-hidden bg-white">

      {/* ── HERO IMAGES ────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        {/* Mobile: full image, no crop — 4:5 aspect ratio ensures no cutting */}
        <div className="relative w-full aspect-[4/5] md:hidden">
          <Image
            src="/ADMISSIONS%20NOW%20OPEN%20-%202026%20(Instagram%20Post%20(45)).png"
            alt="BSM Public School Admissions Open 2026"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-contain object-center"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>

        {/* Desktop: Exact aspect ratio (2470/943) to match the image source perfectly */}
        <div className="relative w-full hidden md:block aspect-2470/943 bg-gray-50">
          <Image
            src="/2.jpg.jpeg"
            alt="B.S.M. Public School Campus Banner"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-contain object-center"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          />
          {/* Enroll Now — desktop only, left bottom */}
          <div className="absolute bottom-6 left-10 lg:bottom-45 lg:left-63">
            <button
              type="button"
              onClick={openModal}
              className="px-15 py-3.5 bg-[#7A0C0C] hover:bg-[#5a0909] text-white font-semibold text-sm rounded-lg transition-colors shadow-md"
              aria-label="Enroll Now"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>


      {/* ── MODAL (lazy, only renders when open=true) ──────────────────── */}
      <EnrollModal open={open} onClose={closeModal} />
    </section>
  );
};

export default HeaderHero;
