'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { COMPANY_INFO } from '@/data/company';
import {
  X,
  Star,
  ShieldCheck,
  Check,
  ShoppingBag,
  Heart,
  MessageCircle,
  Truck,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';

export default function ProductModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : '#7C1620');
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddAndClose = () => {
    addToCart(product, quantity, activeColor);
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
    `Hello Roshan team, I am inquiring about product: ${product.name} (Code: ${product.id}). Price: ₹${product.price}. Please provide stock availability & B2B carton pricing.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Liquid Glass Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-roshan-obsidian/60 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-[2.5rem] bg-[#FAF9F5]/95 backdrop-blur-3xl border border-roshan-gold-champagne/60 shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-roshan-obsidian hover:text-roshan-crimson shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Product Image */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5EFE6] to-[#EFE4CD] shadow-inner border border-roshan-gold-champagne/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-roshan-crimson shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Trust highlights below image */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-roshan-taupe">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/60 border border-white">
                <ShieldCheck className="w-3.5 h-3.5 text-roshan-green" />
                <span>100% Virgin Polymer</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/60 border border-white">
                <Truck className="w-3.5 h-3.5 text-roshan-crimson" />
                <span>24-Hour Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-roshan-crimson uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-roshan-amber">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-roshan-obsidian">{product.rating}</span>
                  <span className="text-roshan-taupe">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-roshan-obsidian leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-serif text-3xl font-bold text-roshan-obsidian">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-roshan-taupe line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-roshan-crimson-blush text-roshan-crimson">
                  Save {discountPercent}%
                </span>
              </div>

              {/* Long Description */}
              <p className="text-xs text-roshan-taupe leading-relaxed mt-3">
                {product.longDescription || product.description}
              </p>

              {/* Specifications List */}
              <div className="mt-4 p-3 rounded-2xl bg-white/80 border border-roshan-gold-champagne/30 text-xs space-y-1.5">
                {product.capacity && (
                  <div className="flex justify-between">
                    <span className="text-roshan-taupe">Capacity:</span>
                    <span className="font-semibold text-roshan-obsidian">{product.capacity}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-roshan-taupe">Material:</span>
                  <span className="font-semibold text-roshan-obsidian">{product.material}</span>
                </div>
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-roshan-taupe">Dimensions:</span>
                    <span className="font-semibold text-roshan-obsidian">{product.dimensions}</span>
                  </div>
                )}
                {product.minOrderB2B && (
                  <div className="flex justify-between text-roshan-gold-deep font-semibold">
                    <span>Wholesale MOQ:</span>
                    <span>{product.minOrderB2B} units</span>
                  </div>
                )}
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-roshan-obsidian mb-2">Select Color Shade:</div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          activeColor === c
                            ? 'border-roshan-obsidian scale-110 shadow-md'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Color option ${i + 1}`}
                      >
                        {activeColor === c && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-roshan-taupe-border space-y-3">
              <div className="flex items-center gap-4">
                {/* Quantity incrementor */}
                <div className="flex items-center rounded-full bg-white border border-roshan-gold-champagne/40 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-full hover:bg-black/5 text-roshan-obsidian transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-roshan-obsidian">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-full hover:bg-black/5 text-roshan-obsidian transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddAndClose}
                  className="flex-1 py-3 px-6 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-liquid-crimson hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full border transition-all active:scale-95 flex items-center justify-center shadow-xs ${
                    isInWishlist(product.id)
                      ? 'bg-roshan-crimson border-roshan-crimson text-white shadow-md'
                      : 'bg-white border-roshan-gold-champagne/40 text-roshan-obsidian hover:text-roshan-crimson hover:bg-black/5'
                  }`}
                  title={isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Instant Order / Quote */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full font-semibold text-xs text-roshan-obsidian bg-white hover:bg-roshan-crimson-blush/40 border border-roshan-gold-champagne/40 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>Inquire Wholesale / Order via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

