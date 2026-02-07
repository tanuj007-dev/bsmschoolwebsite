import React from "react";
import HeaderHero from "./Components/herosection";
import AppreciationSlider from "./Components/appreciation-section";
import PremiumFacilitiesSection from "./Components/premium-facilities";
import WhyChooseSection from "./Components/whychoosesection";
import StickyEnrollButton from "./Components/enrollbutton";
import AwardsAchievementsSlider from "./Components/awardsachievementsslider";
import TrustAndEventsSection from "./Components/trustandevent-section";
import VirtualCampusSection from "./Components/virtualsection";
import TVSReviewsSection from "./Components/review";
import AdmissionProcessSection from "./Components/admissionprocesssection";
import WhatsAppSticky from "./Components/stickywhatup";
import LimitedSeatsCTA from "./Components/limitedseat";


export default function Home() {
  return (
    <>
      <HeaderHero/>
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