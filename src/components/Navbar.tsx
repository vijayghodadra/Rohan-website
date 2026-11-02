'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { COMPANY_INFO } from '@/data/company';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Factory,
  Users,
  Award,
  Box,
  Wrench,
  Bath,
  Home,
  Sparkle,
  ArrowRight,
  MessageCircle,
  Building2,
  Layers,
  PhoneCall,
} from 'lucide-react';

export default function Navbar() {
  const { totalItems, setIsCartOpen, totalWishlistItems, setIsWishlistOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const scheduleCloseDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const closeDropdownImmediately = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled((prev) => (prev ? window.scrollY > 15 : window.scrollY > 35));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-wrapper')) {
        closeDropdownImmediately();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const closeDropdown = closeDropdownImmediately;

  return (
    <>
      <header className="liquid-nav-outer">
        {/* Nav Container: Morphs smoothly between 100% Full-Width and Small Centered Rounded Circle Capsule Island */}
        <nav className={`liquid-nav-pill ${scrolled ? 'is-scrolled' : ''}`}>
          {/* Top Specular Rim Reflection */}
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95)]" />

          {/* Left: Brand Identity Logo */}
          <Link
            href="/"
            className="flex items-center group relative z-10 shrink-0 whitespace-nowrap"
            onClick={closeDropdown}
            aria-label="Roshan Home"
          >
            {/* Authentic Brand Logo Badge */}
            <div
              className={`relative overflow-hidden rounded-xl shadow-xs border border-roshan-gold/40 group-hover:border-roshan-crimson group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#BD0100] flex items-center justify-center shrink-0 ${
                scrolled ? 'h-7 sm:h-8 px-1.5' : 'h-8.5 sm:h-10 px-2'
              }`}
            >
              <Image
                src="/images/roshan-logo.png"
                alt="Roshan Logo"
                width={95}
                height={40}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-10 shrink-0">
            
            {/* 0. Home Link */}
            <Link
              href="/"
              onClick={closeDropdownImmediately}
              className={`flex items-center gap-1.5 rounded-full font-semibold text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs xl:text-sm'
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0 text-roshan-gold" />
              <span>Home</span>
            </Link>

            {/* 1. About Us Dropdown */}
            <div
              className="relative nav-dropdown-wrapper"
              onMouseEnter={() => openDropdown('about')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeDropdown === 'about') {
                    closeDropdownImmediately();
                  } else {
                    openDropdown('about');
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                  scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs xl:text-sm'
                } ${
                  activeDropdown === 'about'
                    ? 'text-roshan-crimson bg-roshan-crimson-blush/80 shadow-xs'
                    : 'text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5'
                }`}
              >
                <Building2
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    activeDropdown === 'about' ? 'text-roshan-crimson' : 'text-roshan-gold'
                  }`}
                />
                <span className="whitespace-nowrap">About Us</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === 'about' ? 'rotate-180 text-roshan-crimson' : 'text-roshan-taupe'
                  }`}
                />
              </button>

              {activeDropdown === 'about' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={() => openDropdown('about')}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <div className="w-88 sm:w-96 p-2 sm:p-2.5 rounded-[1.75rem] bg-[#FAF9F5] border border-roshan-gold-champagne/70 shadow-[0_20px_50px_rgba(27,21,18,0.28),0_0_0_1px_rgba(255,255,255,0.9)_inset] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <Link
                        href="#vision-mission"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-roshan-crimson/10 text-roshan-crimson group-hover:bg-roshan-crimson group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Vision & Mission</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Zero-compromise durability & circular polymers
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#manufacturing"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-roshan-gold/15 text-roshan-gold-deep group-hover:bg-roshan-gold group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Factory className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Manufacturing Facility</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            85,000 sq.ft plant in Vadodara, Gujarat
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#customers"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Customers & Reach</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Nationwide footprint across 24+ states
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#director"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Directors & Leadership</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Pioneering polymer stewardship
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Capabilities Dropdown */}
            <div
              className="relative nav-dropdown-wrapper"
              onMouseEnter={() => openDropdown('capabilities')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeDropdown === 'capabilities') {
                    closeDropdownImmediately();
                  } else {
                    openDropdown('capabilities');
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                  scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs xl:text-sm'
                } ${
                  activeDropdown === 'capabilities'
                    ? 'text-roshan-crimson bg-roshan-crimson-blush/80 shadow-xs'
                    : 'text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5'
                }`}
              >
                <Layers
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    activeDropdown === 'capabilities' ? 'text-roshan-crimson' : 'text-roshan-gold'
                  }`}
                />
                <span className="whitespace-nowrap">Capabilities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === 'capabilities' ? 'rotate-180 text-roshan-crimson' : 'text-roshan-taupe'
                  }`}
                />
              </button>

              {activeDropdown === 'capabilities' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={() => openDropdown('capabilities')}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <div className="w-88 sm:w-96 p-2 sm:p-2.5 rounded-[1.75rem] bg-[#FAF9F5] border border-roshan-gold-champagne/70 shadow-[0_20px_50px_rgba(27,21,18,0.28),0_0_0_1px_rgba(255,255,255,0.9)_inset] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <Link
                        href="#household-plastics"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-roshan-crimson/10 text-roshan-crimson group-hover:bg-roshan-crimson group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Box className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Household Plastic Products</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Bath sets, dinnerware, storage bins & bottles
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#contract-manufacturing"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-roshan-gold/15 text-roshan-gold-deep group-hover:bg-roshan-gold group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Contract Manufacturing (OEM/ODM)</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Custom tooling, 80T - 950T injection cells
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Products Dropdown */}
            <div
              className="relative nav-dropdown-wrapper"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeDropdown === 'products') {
                    closeDropdownImmediately();
                  } else {
                    openDropdown('products');
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                  scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs xl:text-sm'
                } ${
                  activeDropdown === 'products'
                    ? 'text-roshan-crimson bg-roshan-crimson-blush/80 shadow-xs'
                    : 'text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5'
                }`}
              >
                <Box
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    activeDropdown === 'products' ? 'text-roshan-crimson' : 'text-roshan-gold'
                  }`}
                />
                <span className="whitespace-nowrap">Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === 'products' ? 'rotate-180 text-roshan-crimson' : 'text-roshan-taupe'
                  }`}
                />
              </button>

              {activeDropdown === 'products' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={() => openDropdown('products')}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <div className="w-88 sm:w-96 p-2 sm:p-2.5 rounded-[1.75rem] bg-[#FAF9F5] border border-roshan-gold-champagne/70 shadow-[0_20px_50px_rgba(27,21,18,0.28),0_0_0_1px_rgba(255,255,255,0.9)_inset] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <Link
                        href="/products?category=bathroom"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Bath className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Bathroom Products (7)</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Buckets, tubs, bath sets, stools & bins
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/products?category=household"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <Home className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>Household & Kitchen (11)</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Dinnerware, fridge bottles, flasks & trays
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/products"
                        onClick={closeDropdownImmediately}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all duration-200 border border-transparent hover:border-roshan-gold-champagne/30 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-roshan-crimson/10 text-roshan-crimson group-hover:bg-roshan-crimson group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-roshan-obsidian group-hover:text-roshan-crimson flex items-center justify-between">
                            <span>All Products Catalog (18+)</span>
                            <ChevronRight className="w-3.5 h-3.5 text-roshan-taupe/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div className="text-[11px] text-roshan-taupe leading-snug mt-0.5">
                            Browse full store with search & filters
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Contact Us */}
            <Link
              href="/contact"
              className={`flex items-center gap-1.5 rounded-full font-semibold text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs xl:text-sm'
              }`}
              onClick={closeDropdownImmediately}
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0 text-roshan-gold" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Right: Wishlist & Cart Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0 whitespace-nowrap">
            
            {/* 1. Wishlist Trigger with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`relative rounded-full text-roshan-obsidian hover:text-roshan-crimson hover:bg-roshan-crimson-blush/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent hover:border-roshan-gold-champagne/40 active:scale-95 flex items-center justify-center shrink-0 ${
                scrolled ? 'p-1.5 sm:p-2' : 'p-2 sm:p-2.5'
              }`}
              aria-label="View wishlist"
              title="Saved Wishlist"
            >
              <Heart className={scrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-roshan-crimson text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-1.5 ring-white">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* 2. Shopping Bag (Cart) Trigger with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative rounded-full text-roshan-obsidian hover:text-roshan-crimson hover:bg-roshan-crimson-blush/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent hover:border-roshan-gold-champagne/40 active:scale-95 flex items-center justify-center shrink-0 ${
                scrolled ? 'p-1.5 sm:p-2' : 'p-2 sm:p-2.5'
              }`}
              aria-label="View shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag className={scrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-roshan-crimson text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-1.5 ring-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-roshan-obsidian hover:bg-black/5 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-roshan-obsidian/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md max-h-[85vh] overflow-y-auto p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FAF9F5]/98 backdrop-blur-2xl border border-roshan-gold-champagne/50 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-roshan-taupe-border">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 rounded-lg overflow-hidden border border-roshan-gold/40 bg-[#BD0100] px-1.5 flex items-center justify-center shadow-xs">
                    <Image
                      src="/images/roshan-logo.png"
                      alt="Roshan Logo"
                      width={65}
                      height={32}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-roshan-taupe"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions (Wishlist & Cart) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-white border border-roshan-gold-champagne/40 text-xs font-semibold text-roshan-obsidian shadow-2xs hover:bg-roshan-crimson hover:text-white transition-all group"
                >
                  <Heart className="w-4 h-4 text-roshan-crimson group-hover:text-white transition-colors" />
                  <span>Wishlist ({totalWishlistItems})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-white border border-roshan-gold-champagne/40 text-xs font-semibold text-roshan-obsidian shadow-2xs hover:bg-roshan-crimson hover:text-white transition-all group"
                >
                  <ShoppingBag className="w-4 h-4 text-roshan-crimson group-hover:text-white transition-colors" />
                  <span>Bag ({totalItems})</span>
                </button>
              </div>

              {/* 0. Home Link */}
              <div>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-roshan-obsidian hover:text-roshan-crimson py-1"
                >
                  <Home className="w-4 h-4 text-roshan-gold" />
                  <span>Home</span>
                </Link>
              </div>

              {/* 1. About Us */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-roshan-crimson">
                  1. About Us
                </span>
                <div className="mt-2 pl-3 flex flex-col gap-2 border-l-2 border-roshan-gold-champagne/40">
                  <Link
                    href="#vision-mission"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Vision & Mission
                  </Link>
                  <Link
                    href="#manufacturing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Manufacturing Facility (Vadodara)
                  </Link>
                  <Link
                    href="#customers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Customers & Reach (24+ States)
                  </Link>
                  <Link
                    href="#director"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Directors & Leadership
                  </Link>
                </div>
              </div>

              {/* 2. Capabilities */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-roshan-crimson">
                  2. Capabilities
                </span>
                <div className="mt-2 pl-3 flex flex-col gap-2 border-l-2 border-roshan-gold-champagne/40">
                  <Link
                    href="#household-plastics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Household Plastic Products
                  </Link>
                  <Link
                    href="#contract-manufacturing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Contract Manufacturing (OEM/ODM)
                  </Link>
                </div>
              </div>

              {/* 3. Product Categories */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-roshan-crimson">
                  3. Product Categories
                </span>
                <div className="mt-2 pl-3 flex flex-col gap-2 border-l-2 border-roshan-gold-champagne/40">
                  <Link
                    href="/products?category=bathroom"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Bathroom Products (7)
                  </Link>
                  <Link
                    href="/products?category=household"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-roshan-obsidian hover:text-roshan-crimson"
                  >
                    Household & Kitchen (11)
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold text-roshan-crimson hover:underline"
                  >
                    View All 18+ Products →
                  </Link>
                </div>
              </div>

              {/* 4. Contact Us */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-roshan-obsidian hover:text-roshan-crimson pt-2 border-t border-roshan-taupe-border flex items-center justify-between"
              >
                <span>4. Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* 5. Browse Products Store */}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full py-3 rounded-full text-center font-bold text-xs text-white bg-roshan-obsidian hover:bg-roshan-crimson transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Products Catalog</span>
              </Link>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 text-center">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                    'Hello Roshan team, I am contacting you from the mobile website.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-green-700 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp: {COMPANY_INFO.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
