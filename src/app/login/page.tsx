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
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const { login, register, loginWithGoogle, user, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Register extra
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFeedback({ text: 'Please fill in both email and password.', type: 'error' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setFeedback({ text: res.error || 'Failed to sign in. Please verify your credentials.', type: 'error' });
      return;
    }
    setFeedback({ text: 'Welcome back! You are now logged in.', type: 'success' });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setFeedback({ text: 'Please fill in your name, email, and password.', type: 'error' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    const res = await register({ name, email, phone }, password);
    setLoading(false);
    if (!res.success) {
      setFeedback({ text: res.error || 'Registration failed.', type: 'error' });
      return;
    }
    setFeedback({ text: 'Account created successfully! Welcome to Roshan.', type: 'success' });
  };

  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden bg-[#FAF9F5]">
      {/* Subtle Warm Luxury Accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#BD0100]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E3C687]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Link */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-[#BD0100] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Roshan Home</span>
          </Link>
          <span className="text-[11px] font-semibold text-stone-400">Vadodara, Gujarat</span>
        </div>

        {/* Main Solid Luxury Card */}
        <div
          className="rounded-3xl sm:rounded-[2.25rem] border-2 border-[#E3C687]/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="p-6 sm:p-8">
            {/* Brand Logo & Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative overflow-hidden rounded-xl border-2 border-[#E3C687]/60 shadow-md bg-[#BD0100] px-3.5 py-1.5 flex items-center justify-center mb-3">
                <Image
                  src="/images/roshan-logo.png"
                  alt="Roshan Logo"
                  width={78}
                  height={30}
                  className="w-16 h-auto object-contain"
                  priority
                />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                {mode === 'login' ? 'Customer Sign In' : 'Create Account'}
              </h1>
            </div>

            {/* Slider Pill Controls */}
            <div className="relative flex items-center p-1 rounded-full bg-stone-100 border border-stone-300/80 mb-6 max-w-xs mx-auto shadow-inner">
              <button
                onClick={() => { setMode('login'); setFeedback(null); }}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                  mode === 'login' ? 'text-white' : 'text-stone-700 hover:text-[#BD0100]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setFeedback(null); }}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                  mode === 'register' ? 'text-white' : 'text-stone-700 hover:text-[#BD0100]'
                }`}
              >
                Create Account
              </button>

              {/* Sliding Pill Indicator */}
              <motion.div
                layoutId="page-auth-pill-slider-luxury"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-y-1 rounded-full bg-gradient-to-r from-[#BD0100] to-[#E52E2E] shadow-md"
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
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {feedback.type === 'error' ? (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            {/* Active User State Banner (if already logged in) */}
            {user && (
              <div className="mb-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">Signed in as {user.name}</div>
                  <div className="text-stone-500 text-[11px]">{user.email}</div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded-full text-[11px] font-bold text-[#BD0100] bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Form with Sliding Animation */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                {mode === 'login' ? (
                  <motion.form
                    key="login-page-form"
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                        Email or Mobile Number
                      </label>
                      <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                        <Mail className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com or 9876543210"
                          className="w-full py-3 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

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
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full py-3 pl-3 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-700"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#BD0100] via-[#D81E1E] to-[#BD0100] shadow-lg shadow-[#BD0100]/25 hover:shadow-xl hover:shadow-[#BD0100]/35 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
                    >
                      <span>{loading ? 'Signing In...' : 'Sign In to Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex-1 h-px bg-stone-200" />
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">or</span>
                      <div className="flex-1 h-px bg-stone-200" />
                    </div>

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
                  <motion.form
                    key="register-page-form"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onSubmit={handleRegister}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Full Name *</label>
                      <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                        <User className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full py-2.5 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Email Address *</label>
                      <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                        <Mail className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full py-2.5 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Mobile Phone</label>
                      <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                        <Phone className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full py-2.5 pl-3 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">Password *</label>
                      <div className="relative flex items-center rounded-2xl bg-stone-50 border border-stone-300 focus-within:border-[#BD0100] focus-within:ring-2 focus-within:ring-[#BD0100]/20 focus-within:bg-white transition-all shadow-xs">
                        <Lock className="w-4 h-4 text-stone-400 ml-3.5 shrink-0" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create strong password"
                          className="w-full py-2.5 pl-3 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-700"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#BD0100] via-[#D81E1E] to-[#BD0100] shadow-lg shadow-[#BD0100]/25 hover:shadow-xl hover:shadow-[#BD0100]/35 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 pt-2 disabled:opacity-75"
                    >
                      <span>{loading ? 'Creating Account...' : 'Create Roshan Account'}</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
