import dynamic from "next/dynamic";
import PageHero from "../Components/page-hero";
import LazySection from "../Components/LazySection";
import SharedCDNLinks from "../Components/SharedCDNLinks";

const WhatsAppSticky = dynamic(
  () => import("../Components/stickywhatup").then((m) => m.default),
  { ssr: true }
);

const ProgramsSection = dynamic(
  () => import("../Components/school-features").then((m) => m.default),
  { ssr: true, loading: () => <div className="min-h-[480px] bg-[#fdfdfd]" /> }
);

const DaycareSection = dynamic(
  () => import("../Components/daycare").then((m) => m.default),
  { ssr: true, loading: () => <div className="min-h-[420px] bg-white" /> }
);

const AwardsAchievementsSlider = dynamic(
  () => import("../Components/awardsachievementsslider").then((m) => m.default),
  { ssr: true, loading: () => <div className="min-h-[380px] bg-[#fdfdfd]" /> }
);

export default function Amenities() {
  return (
    <>
      <SharedCDNLinks />
      <PageHero
        title="Amenities"
        breadcrumbItems={[{ label: "Amenities" }]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
      />
      <WhatsAppSticky />

      <LazySection minHeight="480px" className="w-full">
        <ProgramsSection />
      </LazySection>

      <LazySection minHeight="420px" className="w-full">
        <DaycareSection />
      </LazySection>

      <LazySection minHeight="380px" className="w-full">
        <AwardsAchievementsSlider />
      </LazySection>
    </>
  );
}