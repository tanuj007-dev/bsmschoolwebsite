
import React from 'react';
import PageHero from '../Components/page-hero';
import WhatsAppSticky from '../Components/stickywhatup';
import TermsAndConditions from '../Components/terms-and-conditions';





export default function Terms() {
  return (
   <>
   
      <PageHero
        title="Our Terms & Conditions"
        breadcrumbItems={[
          { label: "Terms & Conditions" }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
      />
        <WhatsAppSticky />
        <TermsAndConditions />
     
      
   
   
   
   
   </>
  );
}