"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1200&auto=format&fit=crop";

const PageHero = memo(function PageHero({
  title,
  breadcrumbItems = [],
  backgroundImage = DEFAULT_HERO_IMAGE,
  subtitle,
}) {
  const bgImage =
    typeof backgroundImage === "string" && backgroundImage
      ? backgroundImage
      : DEFAULT_HERO_IMAGE;
  const isDataUrl = bgImage.startsWith("data:");

  return (
    <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background: next/image for LCP/WebP/AVIF; fallback for data URLs */}
      <div className="absolute inset-0 z-0">
        {isDataUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        ) : (
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/ALQAB//Z"
          />
        )}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4 mt-16">
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base text-white/80 mb-4 animate-fade-in-up" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <Home size={14} /> Home
          </Link>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight size={14} className="text-[#D4AF37]" />
              {item.href ? (
                <Link href={item.href} className="hover:text-[#D4AF37] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up delay-100">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-lg text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
            {subtitle}
          </p>
        )}

      <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full animate-fade-in-up delay-200" aria-hidden="true" />
    </div>
    </section>
  );
});

export default PageHero;
