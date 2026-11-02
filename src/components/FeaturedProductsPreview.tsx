'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  ArrowRight,
  Sparkles,
  Bath,
  Home,
} from 'lucide-react';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '@/components/ScrollReveal';

export default function FeaturedProductsPreview() {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();

  // Curate 4 signature flagship items for home page spotlight
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section id="featured-products" className="py-20 lg:py-28 relative overflow-hidden bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.12}>
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10 sm:mb-12 text-center md:text-left">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-roshan-crimson-blush text-roshan-crimson text-xs font-semibold mb-3 border border-roshan-crimson/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Flagship Range</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-roshan-obsidian tracking-tight">
                Curated everyday essentials,{' '}
                <span className="italic text-roshan-crimson font-normal">unbreakable luxury.</span>
              </h2>
              <p className="text-xs sm:text-base text-roshan-taupe mt-3 leading-relaxed max-w-xl">
                Engineered with 100% virgin-grade polymer at our Vadodara manufacturing plant. Explore our signature pieces or browse the complete 18+ product store.
              </p>
            </div>

            {/* Direct CTA to dedicated products page */}
            <div className="w-full sm:w-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore All Products ({PRODUCTS.length})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Featured Products Cards with Center Lock */}
        <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-sm sm:max-w-none mx-auto">
          {featured.map((product) => {
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <ScrollStaggerItem key={product.id}>
                <div className="group relative rounded-[2rem] sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-roshan-gold-champagne/40 shadow-xs hover:shadow-xl hover:border-roshan-gold-champagne/80 transition-all duration-300 flex flex-col overflow-hidden h-full">
                  {/* Product Image */}
                  <div className="relative aspect-4/3 w-full bg-roshan-sand/20 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-roshan-crimson shadow-md">
                          {product.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-roshan-crimson shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-md transition-all active:scale-90 ${
                        isInWishlist(product.id)
                          ? 'bg-roshan-crimson text-white shadow-lg'
                          : 'bg-white/90 text-roshan-obsidian hover:text-roshan-crimson hover:bg-white'
                      }`}
                      title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-roshan-obsidian hover:text-roshan-crimson hover:bg-white shadow-md transition-all opacity-90 group-hover:opacity-100"
                      title="Quick View Product"
                      aria-label="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-roshan-crimson uppercase tracking-wider text-[10px]">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-roshan-amber">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-roshan-obsidian">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-serif text-sm font-bold text-roshan-obsidian hover:text-roshan-crimson cursor-pointer transition-colors line-clamp-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-roshan-taupe line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-roshan-taupe-border/50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-roshan-obsidian">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-roshan-taupe line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3 py-1.5 rounded-full font-medium text-xs text-white bg-roshan-crimson hover:bg-roshan-crimson-light transition-all flex items-center gap-1 shadow-2xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        {/* Category Navigation Banner with Reveal & Center Lock */}
        <ScrollReveal duration={0.9} distance={30} amount={0.15}>
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl bg-gradient-to-r from-roshan-obsidian via-[#2A1E18] to-roshan-obsidian text-white flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-5 sm:gap-6 shadow-xl border border-roshan-gold/30">
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold">Looking for specific product categories?</div>
              <p className="text-xs text-roshan-gold-sand/80 mt-1">
                Filter our 18+ high-durability products by category on our dedicated store.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <Link
                href="/products?category=bathroom"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center justify-center gap-2"
              >
                <Bath className="w-4 h-4 text-roshan-gold" />
                <span>Bathroom Products (7)</span>
              </Link>
              <Link
                href="/products?category=household"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-roshan-gold" />
                <span>Household & Kitchen (11)</span>
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold bg-roshan-crimson hover:bg-roshan-crimson-light text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View All 18+</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
