import React from 'react';
import PageHero from '../Components/page-hero';
import WhatsAppSticky from '../Components/stickywhatup';
import GallerySection from '../Components/gallery-section';
import AdmissionsFormSection from '../Components/admissionformsec';


export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Gallery"
        breadcrumbItems={[
          { label: "Gallery" }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop"
      />
      <WhatsAppSticky />
      <GallerySection />
      <AdmissionsFormSection />
    </>
  );
}