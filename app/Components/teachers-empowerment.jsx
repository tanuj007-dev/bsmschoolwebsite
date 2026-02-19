"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Presentation, Globe, Lightbulb, GraduationCap } from "lucide-react";

const TeachersEmpowermentSection = () => {
    const features = [
        {
            icon: <UserCheck size={32} strokeWidth={1.5} />,
            title: "Child-Centric Awareness",
            text: "Our teachers are trained to understand and address the unique needs, learning styles, and emotional well-being of every child.",
            borderColor: "border-b-[#7A0C0C]", // Red
            iconColor: "text-[#7A0C0C]",
            iconBg: "bg-[#FDF2F2]" // Light red
        },
        {
            icon: <Presentation size={32} strokeWidth={1.5} />,
            title: "Ongoing Workshops",
            text: "Regular professional development sessions keep our educators updated with the latest teaching methods and CBSE best practices.",
            borderColor: "border-b-[#D4AF37]", // Gold
            iconColor: "text-[#D4AF37]",
            iconBg: "bg-[#FFFbeb]" // Light gold
        },
        {
            icon: <Globe size={32} strokeWidth={1.5} />,
            title: "Global-Ready Approach",
            text: "Teachers are encouraged to innovate in the classroom and groom students for success on global platforms through critical thinking.",
            borderColor: "border-b-[#1a2b5d]", // Navy
            iconColor: "text-[#1a2b5d]",
            iconBg: "bg-[#EEF2FF]" // Light navy
        },
    ];

    return (
        <section className="relative w-full bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fafafa] to-transparent pointer-events-none" />
            <div className="absolute top-10 left-10 opacity-5 rotate-12 text-[#7A0C0C]">
                <GraduationCap size={150} strokeWidth={1} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-5 -rotate-12 text-[#1a2b5d]">
                <Lightbulb size={150} strokeWidth={1} />
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
                        Faculty Excellence
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#1a0505] leading-tight">
                        Empowering Our <span className="text-[#7A0C0C] italic">Educators</span>
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

export default TeachersEmpowermentSection;
