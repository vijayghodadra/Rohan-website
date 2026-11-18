'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
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
  ArrowLeft,
} from 'lucide-react';

export default function LoginPage() {
  const { login, register, user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Register extra
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isWholesale, setIsWholesale] = useState(false);

  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFeedback({ text: 'Please fill in both email and password.', type: 'error' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    setTimeout(async () => {
      await login(email);
      setFeedback({ text: 'Welcome back! You are now logged in.', type: 'success' });
      setLoading(false);
    }, 600);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setFeedback({ text: 'Please fill in your name, email, and password.', type: 'error' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    setTimeout(async () => {
      await register({ name, email, phone, businessName, isWholesale });
      setFeedback({ text: 'Account created successfully! Welcome to Roshan.', type: 'success' });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE7] to-[#FAF9F5]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-roshan-crimson/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-roshan-gold-champagne/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-roshan-taupe hover:text-roshan-crimson transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div className="rounded-[2.5rem] bg-white/90 backdrop-blur-3xl border border-roshan-gold-champagne/60 shadow-2xl p-6 sm:p-8">
          
          {/* Brand Logo & Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative overflow-hidden rounded-xl border border-roshan-gold/40 shadow-xs bg-[#BD0100] px-3 py-1.5 flex items-center justify-center mb-3">
              <Image
                src="/images/roshan-logo.png"
                alt="Roshan Logo"
                width={78}
                height={30}
                className="w-16 h-auto object-contain"
                priority
              />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-roshan-obsidian">
              {mode === 'login' ? 'Customer Sign In' : 'Create Account'}
            </h1>
            <p className="text-xs text-roshan-taupe mt-1 max-w-xs">
              {mode === 'login'
                ? 'Access your orders, saved cart items & wholesale inquiries.'
                : 'Register for priority factory dispatch and wholesale carton quotes.'}
            </p>
          </div>

          {/* Slider Pill Controls */}
          <div className="relative flex items-center p-1 rounded-full bg-stone-100 border border-roshan-gold-champagne/40 mb-6 shadow-inner">
            <button
              onClick={() => { setMode('login'); setFeedback(null); }}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                mode === 'login' ? 'text-white' : 'text-roshan-obsidian hover:text-roshan-crimson'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setFeedback(null); }}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                mode === 'register' ? 'text-white' : 'text-roshan-obsidian hover:text-roshan-crimson'
              }`}
            >
              Register
            </button>

            {/* Sliding Pill Indicator */}
            <motion.div
              layoutId="page-auth-pill-slider"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              className="absolute inset-y-1 rounded-full bg-gradient-to-r from-roshan-crimson to-roshan-crimson-light shadow-md"
              style={{
                left: mode === 'login' ? '4px' : '50%',
                right: mode === 'login' ? '50%' : '4px',
              }}
            />
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div
              className={`p-3 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                feedback.type === 'error'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Form with Sliding Animation */}
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login-page-form"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-roshan-obsidian mb-1">
                    Email or Mobile
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com or 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-roshan-obsidian">Password</label>
                    <button
                      type="button"
                      onClick={() => alert('Please contact Roshan customer support at +91 96621 37795 to reset your password.')}
                      className="text-[11px] text-roshan-crimson hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-roshan-taupe hover:text-roshan-obsidian"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register-page-form"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onSubmit={handleRegister}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-bold text-roshan-obsidian mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-roshan-obsidian mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1">Mobile</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765..."
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-roshan-obsidian mb-1">Business Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Store Name"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-roshan-obsidian mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-roshan-taupe hover:text-roshan-obsidian"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-roshan-sand/30 border border-roshan-gold-champagne/40 cursor-pointer text-xs text-roshan-obsidian">
                  <input
                    type="checkbox"
                    checked={isWholesale}
                    onChange={(e) => setIsWholesale(e.target.checked)}
                    className="rounded text-roshan-crimson focus:ring-roshan-crimson"
                  />
                  <span className="font-semibold text-[11px]">Request Wholesale B2B Account</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  <span>{loading ? 'Creating...' : 'Register'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trust points */}
          <div className="mt-6 pt-5 border-t border-roshan-taupe-border/60 flex items-center justify-between text-[11px] text-roshan-taupe">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-roshan-green" />
              100% Virgin Polymer
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-roshan-crimson" />
              Direct Vadodara Plant
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

