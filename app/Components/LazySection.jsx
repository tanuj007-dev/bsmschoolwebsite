"use client";

import React, { useState, useEffect, useRef } from "react";

const defaultRootMargin = "120px 0px 120px 0px"; // load when within 120px of viewport
const defaultThreshold = 0.01;

/**
 * LazySection: renders children only when the section enters (or is near) the viewport.
 * Use with next/dynamic to lazy-load both the JS chunk and the section content.
 * Optional minHeight reduces layout shift before the section loads.
 */
export default function LazySection({
  children,
  minHeight,
  rootMargin = defaultRootMargin,
  threshold = defaultThreshold,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={minHeight && !isVisible ? { minHeight } : undefined}
      {...rest}
    >
      {isVisible ? children : null}
    </Tag>
  );
}
