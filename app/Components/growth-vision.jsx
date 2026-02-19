"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wifi, TrendingUp, ShieldCheck, Paperclip, Scissors } from "lucide-react";

const GrowthVisionSection = () => {
    const features = [
        {
            icon: <Wifi size={32} strokeWidth={1.5} />,
            title: "Future-Ready Technology",
            text: "Invest in advanced digital tools and infrastructure to enhance learning outcomes and classroom experiences.",
            borderColor: "border-b-[#1a2b5d]", // Navy
            iconColor: "text-[#1a2b5d]",
            iconBg: "bg-[#EEF2FF]" // Light navy
        },
        {
            icon: <TrendingUp size={32} strokeWidth={1.5} />,
            title: "Higher Academic Standards",
            text: "Continuously raise the bar in teaching, assessments, and student performance to stay ahead of evolving benchmarks.",
            borderColor: "border-b-[#D4AF37]", // Gold
            iconColor: "text-[#D4AF37]",
            iconBg: "bg-[#FFFbeb]" // Light gold
        },
        {
            icon: <ShieldCheck size={32} strokeWidth={1.5} />,
            title: "Consistency in Quality",
            text: "Maintain excellence across all areas — from academics and co-curriculars to safety and staff training.",
            borderColor: "border-b-[#7A0C0C]", // Red
            iconColor: "text-[#7A0C0C]",
            iconBg: "bg-[#FDF2F2]" // Light red
        },
    ];

    return (
        <section className="relative w-full bg-[#fcfcfc] py-20 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute -top-10 -right-10 text-gray-200 rotate-12 opacity-50">
                <Paperclip size={150} strokeWidth={0.5} />
            </div>
            <div className="absolute -bottom-10 -left-10 text-gray-200 -rotate-45 opacity-50">
                <Scissors size={150} strokeWidth={0.5} />
            </div>

            <div className="container-wide flex flex-col items-center text-center relative z-10">

                {/* Heading */}
                <motion.div
                    className="mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="block text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">
                        Our Roadmap
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#1a0505] leading-tight">
                        Our 5-Year <span className="text-[#7A0C0C] italic">Growth Vision</span>
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`group relative bg-white p-8 rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] border border-gray-50 border-b-4 ${feature.borderColor} transition-all duration-300 hover:-translate-y-1`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            {/* Icon Container */}
                            <div className={`w-16 h-16 rounded-full ${feature.iconBg} flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300`}>
                                <div className={feature.iconColor}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GrowthVisionSection;
