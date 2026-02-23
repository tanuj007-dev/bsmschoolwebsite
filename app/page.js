"use client";

import React from "react";
import dynamic from "next/dynamic";
import HeaderHero from "./Components/herosection";
import ViewportSection from "./Components/ViewportSection";

// ─── Skeleton: shown until section chunk loads (viewport-triggered) ───────────
function SectionSkeleton({ height = "h-64" }) {
  return (
    <div
      className={`w-full ${height} bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse`}
      aria-hidden="true"
    />
  );
}

// ─── Sticky UI: load with page (small chunks) ────────────────────────────────
const StickyEnrollButton = dynamic(
  () => import("./Components/enrollbutton"),
  { loading: () => null }
);
const WhatsAppSticky = dynamic(
  () => import("./Components/stickywhatup"),
  { loading: () => null }
);

export default function Home() {
  return (
    <>
      <HeaderHero />

      {/* Sections load only when scrolled into view (lighter initial load) */}
      <ViewportSection
        loader={() => import("./Components/appreciation-section")}
        fallback={<SectionSkeleton height="h-[380px]" />}
        minHeight="380px"
      />
      <ViewportSection
        loader={() => import("./Components/premium-facilities")}
        fallback={<SectionSkeleton height="h-96" />}
        minHeight="24rem"
      />
      <ViewportSection
        loader={() => import("./Components/awardsachievementsslider")}
        fallback={<SectionSkeleton height="h-72" />}
        minHeight="18rem"
      />
      <ViewportSection
        loader={() => import("./Components/review")}
        fallback={<SectionSkeleton height="h-80" />}
        minHeight="20rem"
      />
      <ViewportSection
        loader={() => import("./Components/whychoosesection")}
        fallback={<SectionSkeleton height="h-64" />}
        minHeight="16rem"
      />

      <StickyEnrollButton />

      <ViewportSection
        loader={() => import("./Components/trustandevent-section")}
        fallback={<SectionSkeleton height="h-96" />}
        minHeight="24rem"
      />
      <ViewportSection
        loader={() => import("./Components/virtualsection")}
        fallback={<SectionSkeleton height="h-[400px]" />}
        minHeight="400px"
      />
      <ViewportSection
        loader={() => import("./Components/admissionprocesssection")}
        fallback={<SectionSkeleton height="h-64" />}
        minHeight="16rem"
      />

      <WhatsAppSticky />

      <ViewportSection
        loader={() => import("./Components/limitedseat")}
        fallback={<SectionSkeleton height="h-64" />}
        minHeight="16rem"
      />
    </>
  );
}
