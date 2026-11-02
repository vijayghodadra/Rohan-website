'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { COMPANY_INFO } from '@/data/company';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    getWhatsAppOrderUrl,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-roshan-obsidian/50 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5]/95 backdrop-blur-3xl border-l border-roshan-gold-champagne/40 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-roshan-taupe-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-roshan-crimson" />
                <h2 className="font-serif text-xl font-bold text-roshan-obsidian">
                  Shopping Bag
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-roshan-crimson-blush text-roshan-crimson">
                  {totalItems} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-roshan-obsidian transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping threshold progress */}
            <div className="mt-4 p-3 rounded-2xl bg-white/80 border border-roshan-gold-champagne/30 text-xs text-roshan-taupe">
              {totalPrice >= 999 ? (
                <div className="flex items-center gap-1.5 text-roshan-green font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>🎉 Congratulations! You unlocked Free Shipping across India!</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span>Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for Free Shipping</span>
                  <Truck className="w-4 h-4 text-roshan-crimson" />
                </div>
              )}
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 my-2 pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-roshan-crimson-blush flex items-center justify-center text-roshan-crimson mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-roshan-obsidian">
                  Your bag is empty
                </h3>
                <p className="text-xs text-roshan-taupe max-w-xs mt-1">
                  Discover our bestselling unbreakable bathroom suites, dinnerware, and cleaning essentials.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-roshan-crimson shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}`}
                  className="p-3.5 rounded-2xl bg-white/90 border border-roshan-gold-champagne/30 shadow-sm flex items-center gap-3"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF9F5] to-[#EFE4CD] shrink-0 border border-roshan-gold-champagne/20">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-roshan-obsidian truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-roshan-crimson">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.selectedColor && (
                        <span className="flex items-center gap-1 text-[10px] text-roshan-taupe">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-full bg-[#FAF9F5] border border-roshan-gold-champagne/30 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-black/5 text-roshan-obsidian"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-roshan-obsidian">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-black/5 text-roshan-obsidian"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-roshan-taupe hover:text-roshan-crimson transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-roshan-taupe-border space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-roshan-taupe">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-roshan-obsidian">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-roshan-taupe">
                  <span>Standard Shipping:</span>
                  <span className="font-semibold text-roshan-green">
                    {totalPrice >= 999 ? 'FREE' : '₹80'}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-roshan-obsidian pt-1 border-t border-dashed border-roshan-taupe-border">
                  <span>Estimated Total:</span>
                  <span className="text-roshan-crimson">
                    ₹{(totalPrice >= 999 ? totalPrice : totalPrice + 80).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-liquid-crimson hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-roshan-gold-champagne" />
                <span>Instant Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Clear Cart Link */}
              <div className="flex items-center justify-between text-[11px] text-roshan-taupe pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-roshan-crimson underline transition-colors"
                >
                  Clear all items
                </button>
                <span>100% Virgin Polymer Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

