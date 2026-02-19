"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const PageHero = ({
    title,
    breadcrumbItems = [],
    backgroundImage = "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2069&auto=format&fit=crop", // Fallback CDN
    subtitle
}) => {
    // Support local paths (e.g. /gallery/...) and full CDN URLs; JSON.stringify escapes quotes for CSS
    const bgImage = typeof backgroundImage === "string" && backgroundImage
        ? backgroundImage
        : "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2069&auto=format&fit=crop";
    return (
        <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
            {/* Background: local path or CDN URL */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${JSON.stringify(bgImage)})`,
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white px-4 mt-16">

                {/* Breadcrumb */}
                <nav className="flex items-center justify-center gap-2 text-sm md:text-base text-white/80 mb-4 animate-fade-in-up">
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

                <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full animate-fade-in-up delay-200"></div>
            </div>
        </section>
    );
};

export default PageHero;
