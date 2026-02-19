import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import HeaderHero from "./Components/herosection";

// ─── Skeleton loader ───────────────────────────────────────────────────────
function SectionSkeleton({ height = "h-64" }) {
  return (
    <div
      className={`w-full ${height} bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse`}
      aria-hidden="true"
    />
  );
}

// ─── Note: ssr:false is only valid inside Client Components.
//     This is a Server Component (page.js has no "use client").
//     We use dynamic() with ssr:true (default) + Suspense for code splitting.
//     Each section is split into its own chunk, improving Time-to-Interactive
//     since the browser can parse them in parallel after hydration.

const AppreciationSlider = dynamic(
  () => import("./Components/appreciation-section"),
  { loading: () => <SectionSkeleton height="h-[480px]" /> }
);

const PremiumFacilitiesSection = dynamic(
  () => import("./Components/premium-facilities"),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const AwardsAchievementsSlider = dynamic(
  () => import("./Components/awardsachievementsslider"),
  { loading: () => <SectionSkeleton height="h-72" /> }
);

const TVSReviewsSection = dynamic(
  () => import("./Components/review"),
  { loading: () => <SectionSkeleton height="h-80" /> }
);

const WhyChooseSection = dynamic(
  () => import("./Components/whychoosesection"),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const TrustAndEventsSection = dynamic(
  () => import("./Components/trustandevent-section"),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const VirtualCampusSection = dynamic(
  () => import("./Components/virtualsection"),
  { loading: () => <SectionSkeleton height="h-[600px]" /> }
);

const AdmissionProcessSection = dynamic(
  () => import("./Components/admissionprocesssection"),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const LimitedSeatsCTA = dynamic(
  () => import("./Components/limitedseat"),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

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
      {/* LCP — eagerly server-rendered for fastest visible paint */}
      <HeaderHero />

      {/* Code-split sections with skeleton fallbacks for perceived performance */}
      <Suspense fallback={<SectionSkeleton height="h-[480px]" />}>
        <AppreciationSlider />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <PremiumFacilitiesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-72" />}>
        <AwardsAchievementsSlider />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-80" />}>
        <TVSReviewsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <WhyChooseSection />
      </Suspense>

      <StickyEnrollButton />

      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <TrustAndEventsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
        <VirtualCampusSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <AdmissionProcessSection />
      </Suspense>

      <WhatsAppSticky />

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <LimitedSeatsCTA />
      </Suspense>
    </>
  );
}
