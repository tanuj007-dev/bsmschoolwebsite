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
      <div className="relative w-full min-h-[280px] md:min-h-0 md:h-[460px] lg:h-[560px] xl:h-[620px] 2xl:h-[700px] overflow-hidden">
        {/* Mobile: full image, no crop — container fits 4:5 image so nothing is cut */}
        <div className="relative w-full aspect-[4/5] min-h-[min(80vh,125vw)] md:hidden">
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
        {/* Desktop: fixed height, contain so full image is visible (no cutting) */}
        <div className="relative w-full h-[460px] lg:h-[560px] hidden md:block bg-gray-100">
          <Image
            src="/2.jpg.jpeg"
            alt="B.S.M. Public School Campus Banner"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 769px) 1920px, 0vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          />
        </div>

      </div>

      {/* ── ENROLL NOW — outside overflow container so it always shows on desktop (hidden on mobile; shown in appreciation-section) */}
      <div className="absolute left-6 sm:left-12 md:left-[15%] top-15 md:top-28 lg:top-50 z-40 hidden md:flex items-center justify-start w-full pointer-events-none">
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={openModal}
            aria-label="Open enrollment modal"
            className="relative rounded-full p-[2px] overflow-visible"
          >
            <span className="flex items-center gap-2 rounded-full bg-[#7A0C0C] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-bold tracking-wider text-white shadow-lg hover:bg-[#961212] transition-colors">
              ENROLL NOW →
            </span>
          </button>
        </div>
      </div>

      {/* ── MODAL (lazy, only renders when open=true) ──────────────────── */}
      <EnrollModal open={open} onClose={closeModal} />
    </section>
  );
};

export default HeaderHero;
