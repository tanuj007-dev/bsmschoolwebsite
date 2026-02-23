import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHero from "../Components/page-hero";
import LazySection from "../Components/LazySection";

const AboutSchoolSection = dynamic(
  () => import("../Components/aboutschool-section").then((m) => m.default),
  { ssr: true }
);
const PhilosophySection = dynamic(
  () => import("../Components/hiloso").then((m) => m.default),
  { ssr: true }
);
const CoordinatorsSection = dynamic(
  () => import("../Components/CoordinatorsSection").then((m) => m.default),
  { ssr: true }
);

export default function AboutUs() {
  return (
    <>
      <PageHero
        title="About Us"
        breadcrumbItems={[{ label: "About Us" }]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
        subtitle="Nurturing minds, building character, and shaping the leaders of tomorrow."
      />
      <LazySection minHeight="400px">
        <Suspense fallback={null}>
          <AboutSchoolSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight="400px">
        <Suspense fallback={null}>
          <CoordinatorsSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight="300px">
        <Suspense fallback={null}>
          <PhilosophySection />
        </Suspense>
      </LazySection>
    </>
  );
}