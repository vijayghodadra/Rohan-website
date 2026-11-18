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
  LogOut,
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
      setMessage({ text: 'Welcome back! You are now signed in.', type: 'success' });
      setTimeout(() => setIsAuthOpen(false), 900);
    }, 500);
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
      setMessage({ text: 'Account created successfully! Welcome to Roshan.', type: 'success' });
      setTimeout(() => setIsAuthOpen(false), 900);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    login('customer@example.com', 'Valued Customer');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark frosted overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      {/* Main Card: Solid 100% Opaque Clean White with Gold Rim */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-3xl sm:rounded-[2.5rem] bg-white text-stone-900 border-2 border-[#E3C687]/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Top Luxury Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#BD0100] via-[#E3C687] to-[#BD0100]" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 transition-colors shadow-xs active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto no-scrollbar p-6 sm:p-8">
          
          {/* Header Brand Emblem */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative overflow-hidden rounded-xl border-2 border-[#E3C687]/60 shadow-md bg-[#BD0100] px-3.5 py-1.5 flex items-center justify-center mb-3 group">
              <Image
                src="/images/roshan-logo.png"
                alt="Roshan Logo"
                width={78}
                height={30}
                className="w-16 h-auto object-contain"
                priority
              />
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              {user
                ? 'Your Account'
                : authMode === 'login'
                ? 'Welcome Back'
                : 'Create Account'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xs font-medium">
              {user
                ? `Signed in as ${user.name}`
                : authMode === 'login'
                ? 'Sign in to access your orders, saved items & wholesale carton rates.'
                : 'Join Roshan Privilege for direct Vadodara factory dispatch & wholesale quotes.'}
            </p>
          </div>

          {/* If Already Logged In */}
          {user ? (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Account Status</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Active</span>
                </div>
                <div className="pt-1">
                  <div className="text-base font-extrabold text-stone-950">{user.name}</div>
                  <div className="text-xs text-stone-600 font-medium">{user.email}</div>
                  {user.phone && <div className="text-xs text-stone-500 mt-0.5">{user.phone}</div>}
                  {user.businessName && (
                    <div className="text-xs text-stone-500 mt-0.5 font-semibold">Store: {user.businessName}</div>
                  )}
                </div>
                {user.isWholesale && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Wholesale Tier Verified
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(false)}
                  className="py-3 px-4 rounded-full font-bold text-xs text-white bg-gradient-to-r from-[#BD0100] to-[#E52E2E] shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMessage({ text: 'You have been signed out.', type: 'success' });
                  }}
                  className="py-3 px-4 rounded-full font-bold text-xs text-stone-700 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 border border-stone-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Luxury Sliding Pill Switch */}
              <div className="relative flex items-center p-1 rounded-full bg-stone-100 border border-stone-300/80 mb-6 max-w-xs mx-auto shadow-inner">
                <button
                  onClick={() => { setAuthMode('login'); setMessage(null); }}
                  className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                    authMode === 'login' ? 'text-white' : 'text-stone-700 hover:text-[#BD0100]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setMessage(null); }}
                  className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                    authMode === 'register' ? 'text-white' : 'text-stone-700 hover:text-[#BD0100]'
                  }`}
                >
                  Create Account
                </button>

                {/* Sliding Pill Background with Apple Spring Physics */}
                <motion.div
                  layoutId="auth-pill-slider-luxury"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute inset-y-1 rounded-full bg-gradient-to-r from-[#BD0100] to-[#E52E2E] shadow-md"
                  style={{
                    left: authMode === 'login' ? '4px' : '50%',
                    right: authMode === 'login' ? '50%' : '4px',
                  }}
                />
              </div>

              {/* Feedback Message */}
              {message && (
                <div
                  className={`p-3 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                    message.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {message.type === 'error' ? (
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Sliding Forms Animation */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {authMode === 'login' ? (
                    /* ================= LOGIN FORM ================= */
                    <motion.form
                      key="login-form-view"
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 25 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      onSubmit={handleLoginSubmit}
                      className="space-y-4"
                    >
                      {/* Email / Mobile */}
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                          Email or Mobile Number
                        </label>
                        <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                          <Mail className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                          <input
                            type="text"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="name@company.com or 9876543210"
                            className="w-full py-3 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Password</label>
                          <button
                            type="button"
                            onClick={() => alert('To reset your password, contact Roshan customer support at +91 96621 37795 or message us on WhatsApp.')}
                            className="text-xs font-semibold text-[#BD0100] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                          <Lock className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                          <input
                            type={showLoginPassword ? 'text' : 'password'}
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full py-3 pl-3 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-700"
                            aria-label="Toggle password visibility"
                          >
                            {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#BD0100] via-[#D81E1E] to-[#BD0100] shadow-lg shadow-[#BD0100]/25 hover:shadow-xl hover:shadow-[#BD0100]/35 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
                      >
                        <span>{loginLoading ? 'Signing In...' : 'Sign In to Account'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex-1 h-px bg-stone-200" />
                        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-stone-200" />
                      </div>

                      {/* One-Click Demo / Google Login */}
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full py-2.5 px-4 rounded-full font-semibold text-xs text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center gap-2 shadow-2xs"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Instant Sign In with Google</span>
                      </button>
                    </motion.form>
                  ) : (
                    /* ================= REGISTER FORM ================= */
                    <motion.form
                      key="register-form-view"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      onSubmit={handleRegisterSubmit}
                      className="space-y-3.5"
                    >
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Full Name *</label>
                        <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                          <User className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                          <input
                            type="text"
                            required
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full py-2.5 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Email Address *</label>
                        <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                          <Mail className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full py-2.5 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Phone & Business Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Mobile Phone</label>
                          <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                            <Phone className="w-4 h-4 text-stone-400 ml-3 shrink-0" />
                            <input
                              type="tel"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              placeholder="+91 98765..."
                              className="w-full py-2.5 pl-2.5 pr-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Store / Business</label>
                          <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                            <Building2 className="w-4 h-4 text-stone-400 ml-3 shrink-0" />
                            <input
                              type="text"
                              value={regBusiness}
                              onChange={(e) => setRegBusiness(e.target.value)}
                              placeholder="Retailer Name"
                              className="w-full py-2.5 pl-2.5 pr-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Password *</label>
                        <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                          <Lock className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Create strong password"
                            className="w-full py-2.5 pl-3 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-700"
                            aria-label="Toggle password visibility"
                          >
                            {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Wholesale B2B Privilege Option */}
                      <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/90 border border-amber-300/80 cursor-pointer text-xs text-stone-900 transition-colors hover:bg-amber-100/80">
                        <input
                          type="checkbox"
                          checked={isWholesale}
                          onChange={(e) => setIsWholesale(e.target.checked)}
                          className="w-4 h-4 rounded text-[#BD0100] focus:ring-[#BD0100] accent-[#BD0100]"
                        />
                        <div>
                          <div className="font-bold text-stone-950 flex items-center gap-1.5">
                            <span>Request B2B Wholesale Pricing</span>
                            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-extrabold">GST</span>
                          </div>
                          <div className="text-[10px] text-stone-600 mt-0.5">
                            Access carton quantity discounts & tax invoices directly from Vadodara plant.
                          </div>
                        </div>
                      </label>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={regLoading}
                        className="w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#BD0100] via-[#D81E1E] to-[#BD0100] shadow-lg shadow-[#BD0100]/25 hover:shadow-xl hover:shadow-[#BD0100]/35 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        <span>{regLoading ? 'Creating Account...' : 'Create Roshan Account'}</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Trust Banner Footer */}
          <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-[11px]">100% Virgin Polymer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#BD0100] shrink-0" />
              <span className="font-medium text-[11px]">Vadodara Plant Dispatch</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
