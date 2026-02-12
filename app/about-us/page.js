import React from 'react';
import PageHero from '../Components/page-hero';
import AboutSchoolSection from '../Components/aboutschool-section';
import LeadershipInsights from '../Components/messegesection';
import PhilosophySection from '../Components/hiloso';



export default function AboutUs() {
  return (
    <>
      <PageHero
        title="About Us"
        breadcrumbItems={[
          { label: "About Us" }
        ]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
        subtitle="Nurturing minds, building character, and shaping the leaders of tomorrow."
      />
      <AboutSchoolSection />
      <LeadershipInsights />
      <PhilosophySection />
     
    </>
  );
}