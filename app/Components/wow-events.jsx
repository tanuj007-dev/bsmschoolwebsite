"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Atom, Rocket, Landmark, ChevronLeft, ChevronRight, Music, Trophy, Palette } from "lucide-react";

const WowEventsSection = () => {
    const events = [
        {
            icon: <Atom size={56} strokeWidth={1.5} />,
            title: "STEAM Fest – A Celebration of Innovation",
            text: "An exciting exhibition where students showcased projects in Science, Technology, Engineering, Arts & Mathematics — blending creativity with curiosity.",
        },
        {
            icon: <Rocket size={56} strokeWidth={1.5} />,
            title: "Educational Visit to ISRO, Ahmedabad",
            text: "A hands-on science experience that inspired curiosity and future aspirations in space and technology.",
        },
        {
            icon: <Landmark size={56} strokeWidth={1.5} />,
            title: "Interaction with the President of India",
            text: "A moment of pride where our students had the honour of meeting the nation's highest leader at Rashtrapati Bhavan.",
        },
        {
            icon: <Trophy size={56} strokeWidth={1.5} />,
            title: "Annual Sports Meet 'Udaan'",
            text: "Showcasing athletic prowess, teamwork, and sportsmanship on the field with energetic participation from all houses.",
        },
        {
            icon: <Music size={56} strokeWidth={1.5} />,
            title: "Cultural Extravaganza 'Sanskriti'",
            text: "A vibrant display of music, dance, and drama reflecting our rich heritage and diverse traditions.",
        },
        {
            icon: <Palette size={56} strokeWidth={1.5} />,
            title: "Art & Craft Exhibition 'Srijan'",
            text: "Unleashing creativity through canvas and clay, where young artists displayed their imaginative masterpieces.",
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 768) setItemsPerView(1);
                else if (window.innerWidth < 1024) setItemsPerView(2);
                else setItemsPerView(3);
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    // Get the visible events based on current index and cyclic logic
    const getVisibleEvents = () => {
        let visible = [];
        for (let i = 0; i < itemsPerView; i++) {
            visible.push(events[(currentIndex + i) % events.length]);
        }
        return visible;
    };

    return (
        <section className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 lg:px-24">
            <div className="container-wide flex flex-col items-center relative">

                {/* Heading */}
                <m.h2
                    className="font-serif text-3xl md:text-5xl text-[#1a1a1a] mb-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Events That Created a ‘Wow’ Factor
                </m.h2>

                {/* Content Wrapper with Arrows */}
                <div className="relative w-full flex items-center justify-center">

                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 z-10 p-3 bg-[#1a2b5d] text-white hover:bg-[#7A0C0C] transition-colors rounded-sm shadow-lg -translate-x-1/2 md:-translate-x-0"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Grid Display (Carousel) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 w-full px-8 md:px-12 lg:px-16 overflow-hidden">
                        <AnimatePresence mode="sync">
                            {getVisibleEvents().map((event, index) => (
                                <m.div
                                    key={`${currentIndex}-${index}`}
                                    className="flex flex-col items-center text-center group min-w-0"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Icon */}
                                    <div className="mb-8 text-[#1a2b5d] group-hover:text-[#7A0C0C] group-hover:-translate-y-2 transition-all duration-300">
                                        {event.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-[#1a1a1a] mb-4 min-h-[56px] flex items-center justify-center">
                                        {event.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {event.text}
                                    </p>
                                </m.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 z-10 p-3 bg-[#1a2b5d] text-white hover:bg-[#7A0C0C] transition-colors rounded-sm shadow-lg translate-x-1/2 md:translate-x-0"
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>

                {/* Dots Indicator */}
                <div className="flex gap-2 mt-12">
                    {events.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? "bg-[#7A0C0C]" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WowEventsSection;
