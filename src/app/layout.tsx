import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import LiquidGlassBackground from '@/components/LiquidGlassBackground';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import ProductModal from '@/components/ProductModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Roshan | Everyday Homeware & Precision Polymer Manufacturing',
  description:
    'Manufactured in Vadodara, Gujarat. Unbreakable homeware, bathroom suites, kitchen essentials, and precision OEM contract manufacturing with 100% virgin-grade polymer.',
  keywords: [
    'Roshan',
    'Roshan Houseware',
    'Plastic homeware manufacturer Vadodara',
    'Bathroom plastic products',
    'Contract manufacturing plastic India',
    'Injection moulding Vadodara',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Libre+Caslon+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col relative bg-[#FAF9F5] text-[#1B1512] font-sans">
        <CartProvider>
          {/* Ambient iPhone Liquid Glass Fluid Dynamics */}
          <LiquidGlassBackground />

          {/* Morphing Full-Width to Small Rounded Capsule Header Nav */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1 z-10">{children}</main>

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <ProductModal />

          {/* Luxury Obsidian & Gold Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
