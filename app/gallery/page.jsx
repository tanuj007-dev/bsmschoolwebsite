import React from 'react';
import PageHero from '../Components/page-hero';
import WhatsAppSticky from '../Components/stickywhatup';
import GallerySection from '../Components/gallery-section';



export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Gallery"
        breadcrumbItems={[
          { label: "Gallery" }
        ]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
      />
      <WhatsAppSticky />
      <GallerySection />
    
    </>
  );
}