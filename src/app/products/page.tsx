import React from 'react';
import type { Metadata } from 'next';
import ProductsSection from '@/components/ProductsSection';

export const metadata: Metadata = {
  title: 'Official Products Store | Roshan Private Limited',
  description:
    'Browse our complete range of 100% virgin-grade homeware, luxury bathroom sets, unbreakable dinnerware, and insulated thermal ware. Direct B2B & retail shopping.',
};

export default function ProductsPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen">
      <ProductsSection />
    </div>
  );
}

