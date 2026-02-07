import React from 'react';
import PageHero from '../Components/page-hero';
import BlogSection from '../Components/blog-section';

import WhatsAppSticky from '../Components/stickywhatup';

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Our Latest Blogs"
        breadcrumbItems={[
          { label: "Blogs" }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
      />
      <BlogSection />
  
      <WhatsAppSticky />
    </>
  );
}