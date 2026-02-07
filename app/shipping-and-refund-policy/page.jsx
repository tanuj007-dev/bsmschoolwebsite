import React from 'react';
import PageHero from '../Components/page-hero';
import WhatsAppSticky from '../Components/stickywhatup';
import ShippingAndRefundPolicy from '../Components/shipping-and-refund-policy';



export default function Policy() {
  return (
   <>

        <PageHero
        title="Shipping and Refund Policy"
        breadcrumbItems={[
            { label: "Shipping and Refund Policy" }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
      />
        <WhatsAppSticky />
        <ShippingAndRefundPolicy />
       
     
    </>
    );
}