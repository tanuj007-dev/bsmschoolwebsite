"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * LazyMotion with domAnimation only (~15kb) instead of full framer-motion.
 * Reduces main bundle; animations still run. Respect prefers-reduced-motion via CSS (globals.css).
 */
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
