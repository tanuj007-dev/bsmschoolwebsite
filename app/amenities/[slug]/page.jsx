"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import PageHero from "../../Components/page-hero";
import { facilityCards } from "../../Components/school-features";
import SharedCDNLinks from "../../Components/SharedCDNLinks";

const WhatsAppSticky = dynamic(
  () => import("../../Components/stickywhatup").then((m) => m.default),
  { ssr: false }
);

export default function AmenitySlugPage() {
  const { slug } = useParams();
  const facility = facilityCards.find((item) => item.slug === slug);
  const [videoInView, setVideoInView] = useState(false);
  const videoWrapRef = useRef(null);

  useEffect(() => {
    const el = videoWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVideoInView(true);
      },
      { rootMargin: "100px 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!facility) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-xl font-semibold text-[#7A0C0C]">Facility not found</p>
        <Link href="/amenities" className="text-[#D4AF37] hover:underline">
          Back to Amenities
        </Link>
      </div>
    );
  }

  return (
    <>
      <SharedCDNLinks />
      <PageHero
        title={facility.title}
        breadcrumbItems={[
          { label: "Amenities", href: "/amenities" },
          { label: facility.title },
        ]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
      />
      <WhatsAppSticky />

      <section className="w-full bg-[#fdfdfd]">
        <div className="container-wide px-4 md:px-8 pt-8 md:pt-10 pb-6">
          <div className="w-12 h-1 bg-[#D4AF37] mb-4 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A0C0C] mb-4 font-serif">
            {facility.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {facility.description}
          </p>
          <Link
            href="/amenities"
            className="inline-block mt-6 text-[#7A0C0C] font-semibold hover:text-[#D4AF37] transition-colors"
          >
            ← Back to Amenities
          </Link>
        </div>

        <div
          ref={videoWrapRef}
          className="w-full min-h-[calc(100vh-280px)] flex items-start justify-start px-4 md:px-8 py-6 md:py-8"
        >
          <div className="relative h-[95vh] max-h-[900px] aspect-9/16 w-auto rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
            {videoInView ? (
              <video
                src={facility.video}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                controls
                preload="metadata"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                <span className="opacity-0">Loading…</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
