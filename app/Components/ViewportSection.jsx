"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Loads and renders a section only when its placeholder enters the viewport.
 * Defers the dynamic import until needed so section JS chunks load on demand.
 */
export default function ViewportSection({
  loader,
  fallback,
  minHeight = "20rem",
  rootMargin = "200px 0px",
}) {
  const [Component, setComponent] = useState(null);
  const ref = useRef(null);
  const loaderRef = useRef(loader);
  const loadedRef = useRef(false);
  loaderRef.current = loader;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadedRef.current) return;
        loadedRef.current = true;
        const load = loaderRef.current;
        if (load) load().then((mod) => setComponent(() => mod.default));
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (!Component) {
    return (
      <div ref={ref} style={{ minHeight }} aria-hidden="true">
        {fallback}
      </div>
    );
  }
  return (
    <div ref={ref}>
      <Component />
    </div>
  );
}
