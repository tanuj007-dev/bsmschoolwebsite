import React from "react";
import HeaderHero from "./Components/herosection";
import AppreciationSlider from "./Components/appreciation-section";
import WhyChooseSection from "./Components/whychoosesection";
import AwardsAchievementsSlider from "./Components/awardsachievementsslider";
import TrustAndEventsSection from "./Components/trustandevent-section";
import VirtualCampusSection from "./Components/virtualsection";
import TVSReviewsSection from "./Components/review";
import AdmissionProcessSection from "./Components/admissionprocesssection";
import WhatsAppSticky from "./Components/stickywhatup";
import LimitedSeatsCTA from "./Components/limitedseat";
import AdmissionsFormSection from "./Components/admissionformsec";

export default function Home() {
  return (
    <>
      <HeaderHero />
      <AppreciationSlider />
      <WhyChooseSection />
      <AwardsAchievementsSlider />
      <TrustAndEventsSection />
      <VirtualCampusSection />
      <TVSReviewsSection />
      <AdmissionProcessSection />
      <WhatsAppSticky />
      <LimitedSeatsCTA />
      <AdmissionsFormSection />
    </>
  );
}