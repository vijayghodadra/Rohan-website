'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Search,
  SlidersHorizontal,
  Sparkles,
  Check,
  Tag,
  ArrowUpDown,
  Bath,
  Home,
  Sparkle,
} from 'lucide-react';
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from '@/components/ScrollReveal';

function ProductsContent() {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'bathroom' && product.categorySlug !== 'bathroom') return false;
        if (selectedCategory === 'household' && product.categorySlug !== 'household') return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.12} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-roshan-gold-champagne/60 shadow-specular-light text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-roshan-gold" />
            <span>Storefront & Catalog</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roshan-obsidian">
            Explore Our Signature{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson">
              Homeware Ranges
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-roshan-taupe">
            Premium unbreakable plastic essentials manufactured from 100% virgin polymer. Available for instant consumer checkout and wholesale B2B carton orders.
          </p>
        </ScrollReveal>

        {/* E-Commerce Category Filter Tabs & Search Controls */}
        <ScrollReveal duration={0.8} distance={25} delay={0.1} amount={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson scale-105'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              All Products ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('bathroom')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'bathroom'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson scale-105'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              <Bath className="w-4 h-4" />
              <span>Bathroom Products ({PRODUCTS.filter((p) => p.categorySlug === 'bathroom').length})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('household')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'household'
                  ? 'bg-roshan-crimson text-white shadow-liquid-crimson scale-105'
                  : 'bg-white/80 backdrop-blur-md text-roshan-obsidian hover:bg-white border border-roshan-gold-champagne/40'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Household & Kitchen ({PRODUCTS.filter((p) => p.categorySlug === 'household').length})</span>
            </button>
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-roshan-gold-champagne/30 shadow-sm">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search buckets, dinner sets, flasks, mops..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white/90 border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson text-roshan-obsidian placeholder-roshan-taupe/70 transition-all"
              />
            </div>

            {/* Sort Dropdown & Product Counter */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-roshan-taupe">
                Showing <strong className="text-roshan-obsidian font-bold">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-roshan-taupe" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold rounded-full bg-white/90 px-3 py-2 border border-roshan-gold-champagne/40 text-roshan-obsidian focus:outline-none focus:border-roshan-crimson"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Product Cards Grid with iPhone Liquid Glass Aesthetic */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/60 border border-dashed border-roshan-gold-champagne/50">
            <ShoppingBag className="w-12 h-12 text-roshan-taupe/40 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-roshan-obsidian">No products found</h3>
            <p className="text-xs text-roshan-taupe mt-1">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-roshan-crimson text-white shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const selectedColor = selectedColorMap[product.id] || product.colors[0];
              const discountPercent = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              );

              return (
                <ScrollStaggerItem key={product.id}>
                  <div
                    className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-roshan-gold-champagne/40 hover:border-roshan-crimson/50 shadow-glass-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-full"
                  >
                  {/* Liquid Glass Hover Sheen */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />

                  {/* Card Top: Badges & Image */}
                  <div className="relative p-3">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#FAF9F5] to-[#EFE4CD] shadow-inner">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                        {product.badge && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md ${
                              product.badge === 'Bestseller'
                                ? 'bg-roshan-crimson'
                                : product.badge === 'New'
                                ? 'bg-roshan-gold-deep'
                                : product.badge === 'Eco Choice'
                                ? 'bg-roshan-green'
                                : 'bg-roshan-obsidian'
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-roshan-crimson shadow-sm">
                          {discountPercent}% OFF
                        </span>
                      </div>

                      {/* Wishlist Heart Button overlay on image */}
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

                      {/* Quick View Button overlay on image */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-roshan-obsidian hover:text-roshan-crimson hover:bg-white shadow-md transition-all opacity-90 group-hover:opacity-100"
                        title="Quick View Product"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body: Details */}
                  <div className="p-4 pt-1 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Category tag & Rating */}
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-roshan-crimson uppercase tracking-wider text-[10px]">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-roshan-amber">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-roshan-obsidian">{product.rating}</span>
                          <span className="text-roshan-taupe">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-serif text-base font-bold text-roshan-obsidian hover:text-roshan-crimson cursor-pointer transition-colors line-clamp-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-roshan-taupe line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Color swatches */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="text-[10px] text-roshan-taupe mr-1">Shades:</span>
                          {product.colors.map((c, i) => (
                            <button
                              key={i}
                              onClick={() => handleColorSelect(product.id, c)}
                              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                selectedColor === c
                                  ? 'border-roshan-obsidian scale-125 shadow-sm'
                                  : 'border-transparent opacity-80 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: c }}
                              title={`Select color ${c}`}
                              aria-label={`Color option ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Add to Cart Footer */}
                    <div className="mt-4 pt-3 border-t border-roshan-taupe-border flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-lg font-bold text-roshan-obsidian">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-roshan-taupe line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {product.minOrderB2B && (
                          <div className="text-[10px] text-roshan-gold-deep font-semibold">
                            MOQ: {product.minOrderB2B} pcs (B2B)
                          </div>
                        )}
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={() => addToCart(product, 1, selectedColor)}
                        className="relative overflow-hidden group/btn px-3.5 py-2 rounded-full font-medium text-xs text-white bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
        )}
      </div>
    </section>
  );
}

export default function ProductsSection() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-roshan-taupe">Loading product catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

