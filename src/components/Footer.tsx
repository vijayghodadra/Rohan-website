'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/data/company';
import {
  ShieldCheck,
  Factory,
  Award,
  PhoneCall,
  Mail,
  MapPin,
  ArrowUp,
  MessageCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hello Roshan team, I would like to inquire about bulk wholesale distribution and product catalog.'
  )}`;

  return (
    <footer className="relative bg-[#171210] text-white pt-16 sm:pt-20 pb-10 overflow-hidden border-t border-roshan-gold/30">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-roshan-crimson/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-roshan-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Footer: Grid with Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand Col (lg:col-span-4) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative overflow-hidden rounded-xl border border-roshan-gold/40 shadow-md group-hover:scale-105 group-hover:border-roshan-gold transition-all duration-300 bg-[#BD0100] px-2.5 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/roshan-logo.png"
                  alt="Roshan Logo"
                  width={110}
                  height={48}
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-roshan-gold-champagne transition-colors">
                  ROSHAN
                </span>
                <span className="text-[10px] uppercase tracking-widest text-roshan-gold-champagne font-semibold">
                  Everyday Homeware • Vadodara
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-roshan-gold-sand/85 leading-relaxed font-sans max-w-sm">
              Vadodara’s premier manufacturer of unbreakable homeware, luxury bathroom suites, and precision polymer components. Engineered with 100% virgin-grade polymer for modern Indian households.
            </p>

            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-[11px] text-gray-300">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 hover:border-roshan-gold/40 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-roshan-green" />
                <span>100% Virgin Polymer</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 hover:border-roshan-gold/40 transition-colors">
                <Award className="w-3.5 h-3.5 text-roshan-gold" />
                <span>ISO 9001:2015</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 hover:border-roshan-gold/40 transition-colors">
                <Factory className="w-3.5 h-3.5 text-roshan-crimson-light" />
                <span>Vadodara Plant</span>
              </span>
            </div>
          </div>

          {/* Website Menu (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <div className="font-serif text-xs font-bold text-roshan-gold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roshan-gold"></span>
              Website Menu
            </div>
            <ul className="space-y-2.5 text-xs text-roshan-gold-sand/80 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>All Products Store</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=bathroom" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Bathroom Products (7)</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=household" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Household & Kitchen (11)</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5 group text-roshan-gold-champagne font-semibold">
                  <ChevronRight className="w-3 h-3 text-roshan-gold" />
                  <span>Contact & B2B Inquiry</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Capabilities (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="font-serif text-xs font-bold text-roshan-gold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roshan-gold"></span>
              About & Factory
            </div>
            <ul className="space-y-2.5 text-xs text-roshan-gold-sand/80 font-medium">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>About Roshan Heritage</span>
                </Link>
              </li>
              <li>
                <Link href="/#vision-mission" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Vision & Mission</span>
                </Link>
              </li>
              <li>
                <Link href="/#manufacturing" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>85,000 sq.ft Vadodara Plant</span>
                </Link>
              </li>
              <li>
                <Link href="/#customers" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Reach (24+ States, 12K Stores)</span>
                </Link>
              </li>
              <li>
                <Link href="/#director" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>Board of Directors</span>
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-roshan-gold/60 group-hover:text-roshan-gold transition-colors" />
                  <span>OEM Contract Tooling (80T - 950T)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Plant & Contact Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="font-serif text-xs font-bold text-roshan-gold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-roshan-gold"></span>
              Vadodara Office & Plant
            </div>

            <div className="flex items-start gap-2.5 text-xs text-roshan-gold-sand/85">
              <MapPin className="w-4 h-4 text-roshan-gold shrink-0 mt-0.5" />
              <span>Plot No. 42-45, GIDC Industrial Estate, Makarpura, Vadodara, Gujarat 390010</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-roshan-gold-sand/85">
              <PhoneCall className="w-4 h-4 text-roshan-gold shrink-0" />
              <a href="tel:+912652638890" className="hover:text-white transition-colors">
                +91 (0265) 263-8890
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-roshan-gold-sand/85">
              <Mail className="w-4 h-4 text-roshan-gold shrink-0" />
              <a href="mailto:sales@roshan.com" className="hover:text-white transition-colors">
                sales@roshan.com
              </a>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {COMPANY_INFO.whatsapp}</span>
              </a>
            </div>
          </div>

        </div>
        </ScrollReveal>

        {/* Bottom Bar: Copyright & Back to top */}
        <ScrollReveal duration={0.8} distance={20} delay={0.1}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-roshan-taupe">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} {COMPANY_INFO.fullName}. All rights reserved.
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-right">
              <span>Vadodara, Gujarat, India</span>
              <span>•</span>
              <Link href="/contact" className="hover:text-roshan-gold transition-colors">
                B2B Inquiries
              </Link>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-roshan-gold hover:text-white transition-colors"
                aria-label="Back to top"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
