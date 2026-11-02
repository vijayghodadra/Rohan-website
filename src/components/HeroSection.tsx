'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/company';
import {
  ShieldCheck,
  Truck,
  Factory,
  ArrowRight,
  MessageCircle,
  Star,
  Sparkles,
  Layers,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#1B1512]">
      {/* 1. Full-Background Image with Slow Cinematic Zoom Animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Roshan Luxury Homeware Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-hero-zoom transform-gpu will-change-transform"
        />

        {/* 2. Sophisticated Multi-Layer Cinematic Gradient Overlays */}
        {/* Left-to-right gradient for crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1512]/95 via-[#1B1512]/80 to-[#1B1512]/30 lg:to-transparent" />
        
        {/* Top & bottom gentle fades for seamless section transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1512]/70 via-transparent to-[#FAF9F5]" />
      </div>

      {/* 3. Main Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-32 pb-20 lg:pt-36 lg:pb-28">
        <ScrollReveal duration={1.1} distance={32} delay={0.1} className="max-w-3xl flex flex-col gap-6 text-left">
          {/* Main Headline with Serif Caslon Elegance */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Everyday homeware,{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-roshan-crimson-light via-[#E3C687] to-roshan-gold">
              manufactured
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-roshan-gold-champagne/80"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0,8 Q50,0 100,8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            for the modern Indian household.
          </h1>

          {/* Descriptive Tagline */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans max-w-2xl font-normal drop-shadow-sm">
            From unbreakable bathroom suites and durable kitchen prep essentials to precision OEM contract manufacturing — crafted with{' '}
            <strong className="text-white font-semibold">100% virgin-grade polymer</strong> at our 85,000 sq.ft facility in Vadodara, Gujarat.
          </p>

          {/* Action CTAs with Liquid Shimmer & Glass Styling */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="relative overflow-hidden group px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#contract-manufacturing"
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-white/15 backdrop-blur-xl border border-white/30 hover:bg-white/25 hover:border-roshan-gold transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Factory className="w-4 h-4 text-roshan-gold" />
              <span>Contract Manufacturing</span>
            </Link>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hello Roshan team, I would like to inquire about wholesale orders.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-roshan-gold-champagne hover:text-white transition-colors flex items-center gap-1.5 px-3 py-2"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Customer Rating Proof */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-roshan-crimson text-white text-xs font-bold flex items-center justify-center border-2 border-[#1B1512]">
                SK
              </div>
              <div className="w-8 h-8 rounded-full bg-roshan-gold text-white text-xs font-bold flex items-center justify-center border-2 border-[#1B1512]">
                VP
              </div>
              <div className="w-8 h-8 rounded-full bg-roshan-obsidian text-white text-xs font-bold flex items-center justify-center border-2 border-[#1B1512]">
                RM
              </div>
            </div>
            <div className="text-xs text-gray-300">
              <div className="flex items-center gap-1 text-roshan-amber">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-bold text-white ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-gray-300">Trusted by over 12,000+ retail stores & households</span>
            </div>
          </div>

          {/* 4. Clean Integrated Bottom Trust Bar (Zero Clutter, No Overlapping Capsules) */}
          <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-roshan-green shrink-0" />
                <span className="text-xs font-bold text-white">100% Virgin</span>
              </div>
              <div className="text-[10px] text-gray-300 mt-0.5">Zero regrind polymer</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-roshan-gold shrink-0" />
                <span className="text-xs font-bold text-white">24+ States</span>
              </div>
              <div className="text-[10px] text-gray-300 mt-0.5">Pan-India distribution</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-roshan-crimson-light shrink-0" />
                <span className="text-xs font-bold text-white">650T / Mo.</span>
              </div>
              <div className="text-[10px] text-gray-300 mt-0.5">80T - 950T injection lines</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-roshan-gold-champagne shrink-0" />
                <span className="text-xs font-bold text-white">ISO 9001:2015</span>
              </div>
              <div className="text-[10px] text-gray-300 mt-0.5">Vadodara, Gujarat plant</div>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}
