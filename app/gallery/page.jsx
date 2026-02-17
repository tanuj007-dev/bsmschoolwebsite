import React, { Suspense } from "react";
import nextDynamic from "next/dynamic";
import PageHero from "../Components/page-hero";
import LazySection from "../Components/LazySection";

const WhatsAppSticky = nextDynamic(
  () => import("../Components/stickywhatup").then((m) => m.default),
  { ssr: true }
);
const GallerySection = nextDynamic(
  () => import("../Components/gallery-section").then((m) => m.default),
  { ssr: true }
);

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Gallery"
        breadcrumbItems={[{ label: "Gallery" }]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
      />
      <LazySection minHeight="600px">
        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>
      </LazySection>
      <Suspense fallback={null}>
        <WhatsAppSticky />
      </Suspense>
    </>
  );
}