"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * LazyVideo: only loads the video source when the element is in (or near) the viewport.
 * Use for below-the-fold videos to reduce initial bandwidth and speed up page load.
 */
export default function LazyVideo({
  src,
  className = "",
  preload = "metadata",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = true,
  controls = false,
  ariaLabel,
  ...rest
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? (
        <video
          src={src}
          className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          preload={preload}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          autoPlay={autoPlay}
          controls={controls}
          aria-label={ariaLabel}
          {...rest}
        />
      ) : (
        <div className="h-full w-full bg-[#f2f2f2] animate-pulse" aria-hidden />
      )}
    </div>
  );
}
