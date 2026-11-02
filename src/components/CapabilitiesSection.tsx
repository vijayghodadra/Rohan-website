'use client';

import React from 'react';
import Link from 'next/link';
import { CAPABILITIES, COMPANY_INFO } from '@/data/company';
import {
  Sparkles,
  Box,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Factory,
  Cpu,
  FileCheck,
  PackageCheck,
  Compass,
} from 'lucide-react';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '@/components/ScrollReveal';

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 lg:py-28 relative overflow-hidden bg-white">
      {/* Decorative ambient glass tint */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-roshan-crimson/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-roshan-gold-champagne/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.15} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F5] border border-roshan-gold-champagne/60 shadow-specular-light text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-4">
            <Layers className="w-3.5 h-3.5 text-roshan-gold" />
            <span>Industrial Core Competencies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roshan-obsidian">
            Precision Capabilities That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson">
              Scale Your Brand.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-roshan-taupe">
            From consumer-loved homeware to heavy-tonnage contract injection moulding for multinational FMCG and retail enterprises.
          </p>
        </ScrollReveal>

        {/* 1. HOUSEHOLD PLASTIC PRODUCTS CAPABILITY */}
        <div id="household-plastics" className="mb-20">
          <ScrollReveal duration={0.95} distance={40} amount={0.1}>
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#FAF9F5] border border-roshan-gold-champagne/50 shadow-glass-lg relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roshan-crimson/10 text-roshan-crimson text-xs font-bold uppercase tracking-wider">
                    <Box className="w-3.5 h-3.5" />
                    <span>{CAPABILITIES.householdProducts.badge}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-roshan-obsidian">
                    {CAPABILITIES.householdProducts.title}
                  </h3>
                  <p className="text-sm sm:text-base text-roshan-taupe leading-relaxed">
                    {CAPABILITIES.householdProducts.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {CAPABILITIES.householdProducts.qualityFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-roshan-crimson text-white flex items-center justify-center text-xs font-bold shrink-0">
                          ✓
                        </div>
                        <span className="text-sm font-semibold text-roshan-obsidian">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-liquid-crimson hover:shadow-lg transition-all"
                    >
                      <span>Browse Retail Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Product Range Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CAPABILITIES.householdProducts.categoriesCovered.map((cat, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-roshan-gold-champagne/30 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="text-xs font-bold text-roshan-crimson uppercase tracking-wider mb-1">
                        Range 0{i + 1}
                      </div>
                      <h4 className="font-serif text-lg font-bold text-roshan-obsidian group-hover:text-roshan-crimson transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-roshan-taupe mt-2 leading-relaxed">
                        {cat.summary}
                      </p>
                    </div>
                  ))}

                  {/* Additional Spec Highlight */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-roshan-obsidian to-roshan-crimson text-white shadow-md flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-roshan-gold uppercase tracking-wider">
                        Polymer Integrity
                      </span>
                      <div className="font-serif text-lg font-bold mt-1">100% Virgin Grade Only</div>
                      <p className="text-xs text-roshan-gold-sand/80 mt-1 leading-relaxed">
                        Zero regrind adulteration on all consumer food-contact and bathroom ranges.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-roshan-gold-champagne mt-4">
                      Tested for 50,000+ flex cycles →
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. CONTRACT MANUFACTURING (OEM / ODM) CAPABILITY */}
        <div id="contract-manufacturing">
          <ScrollReveal duration={0.95} distance={40} amount={0.1}>
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1B1512] via-[#2A1E18] to-[#1B1512] text-white shadow-2xl relative overflow-hidden">
              
              {/* Ambient specular highlight */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-roshan-gold/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-roshan-gold/40 text-xs font-bold text-roshan-gold tracking-wider uppercase">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{CAPABILITIES.contractManufacturing.badge}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {CAPABILITIES.contractManufacturing.title}
                  </h3>
                  <p className="text-sm sm:text-base text-roshan-gold-sand/80 leading-relaxed font-sans">
                    {CAPABILITIES.contractManufacturing.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {CAPABILITIES.contractManufacturing.b2bHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-roshan-gold text-roshan-obsidian flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="text-xs sm:text-sm text-gray-200">{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                        'Hello Roshan team, I am interested in discussing Contract Manufacturing / OEM tooling solutions.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-roshan-obsidian bg-roshan-gold hover:bg-roshan-gold-champagne shadow-liquid-glow transition-all active:scale-95"
                    >
                      <span>Request OEM Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                    >
                      <span>Send RFQ Details</span>
                    </Link>
                  </div>
                </div>

                {/* B2B OEM Services Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CAPABILITIES.contractManufacturing.services.map((srv, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-roshan-gold/50 transition-colors"
                    >
                      <div className="text-xs font-bold text-roshan-gold-champagne uppercase tracking-wider mb-1">
                        Step 0{i + 1}
                      </div>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
