import React from "react";
import dynamic from "next/dynamic";
import HeaderHero from "./Components/herosection";

// Code-split sections (smaller initial bundle) — all render immediately so content is never blank
const AppreciationSlider = dynamic(
  () => import("./Components/appreciation-section").then((m) => m.default),
  { ssr: true }
);
const PremiumFacilitiesSection = dynamic(
  () => import("./Components/premium-facilities").then((m) => m.default),
  { ssr: true }
);
const AwardsAchievementsSlider = dynamic(
  () => import("./Components/awardsachievementsslider").then((m) => m.default),
  { ssr: true }
);
const TVSReviewsSection = dynamic(
  () => import("./Components/review").then((m) => m.default),
  { ssr: true }
);
const WhyChooseSection = dynamic(
  () => import("./Components/whychoosesection").then((m) => m.default),
  { ssr: true }
);
const StickyEnrollButton = dynamic(
  () => import("./Components/enrollbutton").then((m) => m.default),
  { ssr: true }
);
const TrustAndEventsSection = dynamic(
  () => import("./Components/trustandevent-section").then((m) => m.default),
  { ssr: true }
);
const VirtualCampusSection = dynamic(
  () => import("./Components/virtualsection").then((m) => m.default),
  { ssr: true }
);
const AdmissionProcessSection = dynamic(
  () => import("./Components/admissionprocesssection").then((m) => m.default),
  { ssr: true }
);
const WhatsAppSticky = dynamic(
  () => import("./Components/stickywhatup").then((m) => m.default),
  { ssr: true }
);
const LimitedSeatsCTA = dynamic(
  () => import("./Components/limitedseat").then((m) => m.default),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <HeaderHero />
      <AppreciationSlider />
      <PremiumFacilitiesSection />
      <AwardsAchievementsSlider />
      <TVSReviewsSection />
      <WhyChooseSection />
      <StickyEnrollButton />
      <TrustAndEventsSection />
      <VirtualCampusSection />
      <AdmissionProcessSection />
      <WhatsAppSticky />
      <LimitedSeatsCTA />
    </>
  );
}
