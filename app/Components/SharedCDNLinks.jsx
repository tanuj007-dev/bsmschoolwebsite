"use client";

import Script from "next/script";

/**
 * Same CDN links used by school-features, amenities page, and amenities slug page.
 * Add script and stylesheet URLs here; they will load on all three.
 */
const CDN_SCRIPTS = [
  // e.g. "https://cdn.example.com/library.min.js"
];

const CDN_STYLES = [
  // e.g. "https://cdn.example.com/library.min.css"
];

export default function SharedCDNLinks() {
  return (
    <>
      {CDN_SCRIPTS.map((src) => (
        <Script key={src} src={src} strategy="lazyOnload" />
      ))}
      {CDN_STYLES.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
