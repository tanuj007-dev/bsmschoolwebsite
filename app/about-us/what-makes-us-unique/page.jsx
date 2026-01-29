import React from 'react';
import WhyChooseSection from '../../Components/whychoosesection';
import TeachersEmpowermentSection from '../../Components/teachers-empowerment';
import GrowthVisionSection from '../../Components/growth-vision';
import WowEventsSection from '../../Components/wow-events';
import PageHero from '../../Components/page-hero';

export default function WhatMakesUsUnique() {
    return (
        <>
            <PageHero
                title="What Makes Us Unique"
                breadcrumbItems={[
                    { label: "About Us", href: "/about-us" },
                    { label: "Unique Features" }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop"
            />

            <WhyChooseSection />
            <TeachersEmpowermentSection />
            <GrowthVisionSection />
            <WowEventsSection />
        </>
    );
}
