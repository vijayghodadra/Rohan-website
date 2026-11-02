import React from 'react';
import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us & B2B Inquiries | Roshan',
  description:
    'Get in touch with Roshan in Vadodara, Gujarat. Request wholesale pricing, distributorship inquiries, and OEM contract tooling consultation.',
};

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-28 pb-16 min-h-screen">
      <ContactSection />
    </div>
  );
}

