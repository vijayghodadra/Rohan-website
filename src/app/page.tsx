import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import FeaturedProductsPreview from '@/components/FeaturedProductsPreview';

export default function Home() {
  return (
    <>
      {/* 1. Hero Showcase with iPhone Liquid Glass aesthetics */}
      <HeroSection />

      {/* 2. About Us Section (Vision & Mission, Manufacturing, Customers, Director) */}
      <AboutUsSection />

      {/* 3. Capabilities Section (Household Plastic Products, Contract Manufacturing) */}
      <CapabilitiesSection />

      {/* 4. Signature Products Spotlight (Full catalog at /products) */}
      <FeaturedProductsPreview />
    </>
  );
}

