'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    totalWishlistItems,
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-roshan-obsidian/50 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5]/98 backdrop-blur-3xl border-l border-roshan-gold-champagne/40 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-roshan-taupe-border">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-roshan-crimson fill-roshan-crimson" />
                <h2 className="font-serif text-xl font-bold text-roshan-obsidian">
                  Saved Wishlist
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-roshan-crimson-blush text-roshan-crimson">
                  {totalWishlistItems} {totalWishlistItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-roshan-obsidian transition-colors"
                aria-label="Close wishlist drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Items or Empty state */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-roshan-crimson-blush/60 flex items-center justify-center text-roshan-crimson">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-roshan-obsidian">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-roshan-taupe mt-1 max-w-xs leading-relaxed">
                    Save your favorite unbreakable homeware, bath sets, and storage bins to buy later.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-roshan-crimson text-white shadow-md hover:bg-roshan-crimson-light transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Products</span>
                </Link>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-white/90 border border-roshan-gold-champagne/30 shadow-xs hover:border-roshan-gold-champagne/60 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-roshan-sand/30 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-xs font-bold text-roshan-obsidian line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-roshan-taupe/60 hover:text-roshan-crimson p-1 -mr-1 transition-colors"
                          aria-label="Remove item from wishlist"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-roshan-taupe">
                        {product.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="font-bold text-xs text-roshan-crimson">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-roshan-taupe line-through ml-1.5">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-roshan-obsidian text-white hover:bg-roshan-crimson transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          {wishlist.length > 0 && (
            <div className="pt-4 border-t border-roshan-taupe-border space-y-2">
              <button
                onClick={() => {
                  wishlist.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

