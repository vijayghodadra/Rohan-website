'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  COMPANY_INFO,
  VISION_MISSION,
  MANUFACTURING_DETAILS,
  DIRECTORS,
  CUSTOMERS_REACH,
  REVIEWS,
} from '@/data/company';
import {
  Sparkles,
  Target,
  Compass,
  Factory,
  Cog,
  ShieldCheck,
  CheckCircle2,
  Users,
  MapPin,
  Award,
  Star,
  Quote,
  ChevronRight,
} from 'lucide-react';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '@/components/ScrollReveal';

export default function AboutUsSection() {
  const [activeTab, setActiveTab] = useState<'vision' | 'manufacturing' | 'customers' | 'director'>('vision');

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F5EFE6] to-[#FAF9F5]">
      {/* Decorative ambient elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with smooth Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.12} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-roshan-gold-champagne/60 shadow-specular-light text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-4">
            <Sparkles className="w-3.5 h-3.5 text-roshan-gold" />
            <span>About Roshan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roshan-obsidian">
            Rooted in Gujarat, trusted in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson">
              homes nationwide.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-roshan-taupe">
            Established in 2008 in Vadodara, Roshan is a premier Indian manufacturer of unbreakable household plasticware and high-precision OEM polymer components.
          </p>

          {/* Quick Section Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'vision'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              1. Vision & Mission
            </button>
            <button
              onClick={() => setActiveTab('manufacturing')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'manufacturing'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              2. Manufacturing Facility
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'customers'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              3. Customers & Reach
            </button>
            <button
              onClick={() => setActiveTab('director')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'director'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              4. Directors & Leadership
            </button>
          </div>
        </ScrollReveal>

        {/* 1. VISION & MISSION TAB CONTENT */}
        <div id="vision-mission" className={`space-y-12 ${activeTab === 'vision' ? 'block' : 'hidden md:block md:mb-16'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Liquid Glass Card */}
            <ScrollReveal direction="up" delay={0.1} duration={0.85} distance={32}>
              <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-roshan-gold-champagne/50 shadow-glass-lg hover:shadow-2xl transition-all duration-500 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-roshan-crimson to-roshan-crimson-light text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-roshan-gold mb-2">Long-Term Ambition</div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-roshan-obsidian mb-4">
                  {VISION_MISSION.vision.title}
                </h3>
                <p className="text-sm sm:text-base text-roshan-taupe leading-relaxed mb-6">
                  {VISION_MISSION.vision.description}
                </p>
                <div className="space-y-3 pt-4 border-t border-roshan-taupe-border">
                  {VISION_MISSION.vision.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-roshan-crimson shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-roshan-obsidian">{pillar.title}</div>
                        <div className="text-[12px] text-roshan-taupe">{pillar.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Liquid Glass Card */}
            <ScrollReveal direction="up" delay={0.2} duration={0.85} distance={32}>
              <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-roshan-gold-champagne/50 shadow-glass-lg hover:shadow-2xl transition-all duration-500 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-roshan-gold-deep to-roshan-gold text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-2">Our Daily Commitment</div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-roshan-obsidian mb-4">
                  {VISION_MISSION.mission.title}
                </h3>
                <p className="text-sm sm:text-base text-roshan-taupe leading-relaxed mb-6">
                  {VISION_MISSION.mission.description}
                </p>
                <div className="space-y-3 pt-4 border-t border-roshan-taupe-border">
                  {VISION_MISSION.mission.commitments.map((commit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-roshan-gold-deep shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-roshan-obsidian">{commit.title}</div>
                        <div className="text-[12px] text-roshan-taupe">{commit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 2. MANUFACTURING FACILITY TAB CONTENT */}
        <div id="manufacturing" className={`pt-8 ${activeTab === 'manufacturing' ? 'block' : 'hidden md:block md:mb-16'}`}>
          <ScrollReveal duration={0.95} distance={40} amount={0.1}>
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1B1512] via-[#2A1E18] to-[#1B1512] text-white shadow-2xl relative overflow-hidden">
              {/* Background specular lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-roshan-crimson/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-roshan-gold/15 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-roshan-gold/40 text-xs font-bold text-roshan-gold tracking-wider uppercase">
                    <Factory className="w-3.5 h-3.5" />
                    <span>Vadodara Industrial Hub</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {MANUFACTURING_DETAILS.title}
                  </h3>
                  <p className="text-sm sm:text-base text-roshan-gold-sand/80 leading-relaxed font-sans">
                    {MANUFACTURING_DETAILS.description}
                  </p>

                  {/* Facility Technical Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {MANUFACTURING_DETAILS.facilitySpecs.map((spec, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-roshan-gold/50 transition-colors">
                        <div className="text-xs font-semibold text-roshan-gold-champagne">{spec.title}</div>
                        <div className="text-base font-bold text-white mt-0.5">{spec.value}</div>
                        <div className="text-[11px] text-gray-300 mt-1 leading-snug">{spec.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturing Facility Image Container */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-roshan-gold-champagne/30 shadow-2xl group">
                    <Image
                      src="/images/facility.jpg"
                      alt="Roshan Manufacturing Plant Vadodara"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-roshan-obsidian/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20">
                      <div className="text-xs font-bold text-roshan-gold">Automated Injection Cells</div>
                      <div className="text-[11px] text-gray-200">28+ servo-hydraulic injection machines running 24/7 with robotic extraction</div>
                    </div>
                  </div>

                  {/* 5-Step Process Timeline */}
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-roshan-gold mb-3">
                      5-Stage Quality Engineering Workflow
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {MANUFACTURING_DETAILS.processes.map((p, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                          <span className="text-xs font-bold text-roshan-crimson-light">{p.step}</span>
                          <div className="text-[11px] font-semibold text-white mt-0.5 line-clamp-1">{p.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 3. CUSTOMERS & NATIONWIDE REACH TAB CONTENT */}
        <div id="customers" className={`pt-12 ${activeTab === 'customers' ? 'block' : 'hidden md:block md:mb-16'}`}>
          <div className="space-y-8">
            <ScrollReveal duration={0.85} distance={30} amount={0.15} className="text-center max-w-2xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-1">
                Distribution Network
              </div>
              <h3 className="font-serif text-3xl font-bold text-roshan-obsidian">
                {CUSTOMERS_REACH.title}
              </h3>
              <p className="text-sm text-roshan-taupe mt-2">
                {CUSTOMERS_REACH.description}
              </p>
            </ScrollReveal>

            {/* Reach Coverage Cards with Stagger */}
            <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CUSTOMERS_REACH.presenceStats.map((item, i) => (
                <ScrollStaggerItem key={i}>
                  <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-roshan-gold-champagne/40 shadow-glass-sm hover:shadow-glass-lg transition-all h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-xl bg-roshan-crimson/10 text-roshan-crimson">
                        <MapPin className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-roshan-green-light text-roshan-green">
                        {item.coverage}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-roshan-obsidian">{item.region}</h4>
                    <p className="text-xs text-roshan-taupe mt-1.5 leading-relaxed">{item.states}</p>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>

            {/* Customer Testimonials & Reviews */}
            <div className="pt-6">
              <ScrollReveal duration={0.8} distance={25} className="text-xs font-bold uppercase tracking-wider text-center text-roshan-gold-deep mb-6">
                What Retail Partners & Homemakers Say
              </ScrollReveal>
              <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {REVIEWS.map((rev) => (
                  <ScrollStaggerItem key={rev.id}>
                    <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-roshan-gold-champagne/30 shadow-sm flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-1 text-roshan-amber mb-3">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-roshan-taupe italic leading-relaxed">
                          &quot;{rev.comment}&quot;
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-roshan-taupe-border">
                        <div className="text-xs font-bold text-roshan-obsidian">{rev.author}</div>
                        <div className="text-[11px] text-roshan-taupe flex items-center justify-between">
                          <span>{rev.location}</span>
                          {rev.verified && <span className="text-roshan-green font-semibold">✓ Verified</span>}
                        </div>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                ))}
              </ScrollStagger>
            </div>
          </div>
        </div>

        {/* 4. DIRECTORS & LEADERSHIP TAB CONTENT */}
        <div id="director" className={`pt-12 ${activeTab === 'director' ? 'block' : 'hidden md:block'}`}>
          <ScrollReveal duration={0.85} distance={30} amount={0.15} className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roshan-gold/15 text-roshan-gold-deep text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Board of Directors</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-roshan-obsidian">
              Pioneering Leadership Steering Roshan&apos;s Growth
            </h3>
            <p className="text-sm text-roshan-taupe mt-2">
              Combining decades of industrial tooling mastery, manufacturing discipline, and nationwide retail execution.
            </p>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTORS.map((director, i) => (
              <ScrollStaggerItem key={i}>
                <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-roshan-gold-champagne/50 shadow-glass-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group h-full">
                  <div>
                    {/* Director Avatar / Monogram */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-roshan-obsidian to-roshan-crimson text-roshan-gold font-serif text-xl font-bold flex items-center justify-center shadow-lg border border-roshan-gold/40 mb-6 group-hover:scale-105 transition-transform">
                      {director.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>

                    <h4 className="font-serif text-xl font-bold text-roshan-obsidian">
                      {director.name}
                    </h4>
                    <div className="text-xs font-bold text-roshan-crimson mt-0.5">
                      {director.title}
                    </div>
                    <div className="text-[11px] font-medium text-roshan-taupe mb-4 uppercase tracking-wider">
                      {director.role}
                    </div>

                    <p className="text-xs sm:text-sm text-roshan-taupe leading-relaxed">
                      {director.bio}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 pt-4 border-t border-roshan-taupe-border space-y-2">
                    {director.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-roshan-obsidian font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-roshan-gold" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>

      </div>
    </section>
  );
}
