import React, { Suspense } from "react";
import nextDynamic from "next/dynamic";
import PageHero from "../Components/page-hero";
import LazySection from "../Components/LazySection";

const BlogSection = nextDynamic(
  () => import("../Components/blog-section").then((m) => m.default),
  { ssr: true }
);
const WhatsAppSticky = nextDynamic(
  () => import("../Components/stickywhatup").then((m) => m.default),
  { ssr: true }
);

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Our Latest Blogs"
        breadcrumbItems={[{ label: "Blogs" }]}
        backgroundImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
      />
      <LazySection minHeight="500px">
        <Suspense fallback={null}>
          <BlogSection />
        </Suspense>
      </LazySection>
      <Suspense fallback={null}>
        <WhatsAppSticky />
      </Suspense>
    </>
  );
}