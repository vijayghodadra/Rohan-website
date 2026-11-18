'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login, register, user, logout } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBusiness, setRegBusiness] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isAuthOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setMessage({ text: 'Please enter your email and password.', type: 'error' });
      return;
    }
    setLoginLoading(true);
    setMessage(null);
    setTimeout(async () => {
      await login(loginEmail);
      setLoginLoading(false);
    }, 600);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setMessage({ text: 'Please fill in your name, email, and password.', type: 'error' });
      return;
    }
    setRegLoading(true);
    setMessage(null);
    setTimeout(async () => {
      await register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        businessName: regBusiness,
        isWholesale,
      });
      setRegLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-roshan-obsidian/65 backdrop-blur-xl transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg rounded-[2.2rem] bg-[#FAF9F5]/98 backdrop-blur-3xl border border-roshan-gold-champagne/70 shadow-2xl overflow-hidden z-10 my-auto max-h-[94vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-roshan-obsidian hover:text-roshan-crimson shadow-xs transition-all active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>

        <div className="overflow-y-auto no-scrollbar p-6 sm:p-8">
          
          {/* Header Brand Badge */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative overflow-hidden rounded-xl border border-roshan-gold/40 shadow-xs bg-[#BD0100] px-3 py-1.5 flex items-center justify-center mb-3">
              <Image
                src="/images/roshan-logo.png"
                alt="Roshan Logo"
                width={78}
                height={30}
                className="w-16 h-auto object-contain"
              />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roshan-obsidian">
              {authMode === 'login' ? 'Welcome Back' : 'Join Roshan Privilege'}
            </h2>
            <p className="text-xs sm:text-sm text-roshan-taupe mt-1 max-w-xs">
              {authMode === 'login'
                ? 'Sign in to access saved orders, track shipments & wholesale pricing.'
                : 'Create an account for direct factory prices & priority B2B dispatch.'}
            </p>
          </div>

          {/* Interactive Sliding Navigation Pill Toggle */}
          <div className="relative flex items-center p-1 rounded-full bg-stone-200/80 border border-roshan-gold-champagne/40 mb-6 max-w-xs mx-auto shadow-inner">
            <button
              onClick={() => { setAuthMode('login'); setMessage(null); }}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                authMode === 'login' ? 'text-white' : 'text-roshan-obsidian hover:text-roshan-crimson'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setMessage(null); }}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                authMode === 'register' ? 'text-white' : 'text-roshan-obsidian hover:text-roshan-crimson'
              }`}
            >
              Create Account
            </button>

            {/* Sliding Pill Background with Spring Physics */}
            <motion.div
              layoutId="auth-pill-slider"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              className="absolute inset-y-1 rounded-full bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-md"
              style={{
                left: authMode === 'login' ? '4px' : '50%',
                right: authMode === 'login' ? '50%' : '4px',
              }}
            />
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`p-3 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                message.type === 'error'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              <span>{message.text}</span>
            </div>
          )}

          {/* Sliding Forms Container */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {authMode === 'login' ? (
                /* ================= LOGIN FORM ================= */
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1.5">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. name@company.com or 9876543210"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-roshan-obsidian">Password</label>
                      <button
                        type="button"
                        onClick={() => alert('Please contact Roshan customer support at +91 96621 37795 to reset your password.')}
                        className="text-[11px] text-roshan-crimson hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-roshan-taupe hover:text-roshan-obsidian"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
                  >
                    <span>{loginLoading ? 'Signing In...' : 'Sign In to Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                /* ================= REGISTER FORM ================= */
                <motion.form
                  key="register-form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  onSubmit={handleRegisterSubmit}
                  className="space-y-3.5"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Wholesale Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-roshan-obsidian mb-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-roshan-obsidian mb-1">Company / Store (Optional)</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                        <input
                          type="text"
                          value={regBusiness}
                          onChange={(e) => setRegBusiness(e.target.value)}
                          placeholder="Store or Retail Name"
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:ring-1 focus:ring-roshan-crimson transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-roshan-taupe hover:text-roshan-obsidian"
                      >
                        {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Wholesale Pricing Checkbox */}
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-roshan-sand/30 border border-roshan-gold-champagne/40 cursor-pointer text-xs text-roshan-obsidian">
                    <input
                      type="checkbox"
                      checked={isWholesale}
                      onChange={(e) => setIsWholesale(e.target.checked)}
                      className="rounded text-roshan-crimson focus:ring-roshan-crimson"
                    />
                    <span className="font-semibold">I am a Retailer / Wholesaler requesting B2B Carton Pricing</span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    <span>{regLoading ? 'Creating Account...' : 'Create Roshan Account'}</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Perks / Trust Footer */}
          <div className="mt-6 pt-5 border-t border-roshan-taupe-border/60 grid grid-cols-2 gap-2 text-[11px] text-roshan-taupe">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-roshan-green shrink-0" />
              <span>100% Virgin Polymer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-roshan-crimson shrink-0" />
              <span>Vadodara Factory Dispatch</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

