'use client';

import React, { useState } from 'react';
import { COMPANY_INFO } from '@/data/company';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    inquiryType: 'Wholesale B2B Distribution',
    orderSize: 'Carton (Wholesale)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const lines = [
      `*New Inquiry — ${COMPANY_INFO.fullName}*`,
      `-----------------------------------------`,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : null,
      form.city ? `*City/State:* ${form.city}` : null,
      `*Inquiry Nature:* ${form.inquiryType}`,
      `*Estimated Volume:* ${form.orderSize}`,
      form.message ? `*Message:* ${form.message}` : null,
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden bg-[#FAF9F5]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-roshan-crimson/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-roshan-gold-champagne/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Lazy Reveal */}
        <ScrollReveal duration={0.9} distance={36} amount={0.15} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-roshan-gold-champagne/60 shadow-specular-light text-xs font-bold uppercase tracking-wider text-roshan-crimson mb-4">
            <PhoneCall className="w-3.5 h-3.5 text-roshan-gold" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-roshan-obsidian">
            Get in Touch With Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson">
              Vadodara Team
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-roshan-taupe">
            For retail distributorship, bulk enterprise orders, OEM tooling discussions, or general customer support. We respond within 24 business hours.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 max-w-xl lg:max-w-none mx-auto">
          
          {/* Left Column: Official Contact Details */}
          <ScrollReveal direction="up" delay={0.1} duration={0.9} distance={35} className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-roshan-obsidian via-[#2A1E18] to-roshan-obsidian text-white shadow-xl relative overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-wider text-roshan-gold mb-2">
                Corporate Headquarters
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">
                {COMPANY_INFO.fullName}
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-roshan-gold shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Facility & Office Address</div>
                    <div className="text-roshan-gold-sand/80 mt-0.5 leading-relaxed">
                      {COMPANY_INFO.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-roshan-gold shrink-0 mt-0.5">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Phone & Direct Lines</div>
                    <div className="text-roshan-gold-sand/80 mt-0.5">
                      Office: {COMPANY_INFO.phone}
                    </div>
                    <div className="text-roshan-gold-sand/80">
                      WhatsApp: {COMPANY_INFO.whatsapp}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-roshan-gold shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Email Addresses</div>
                    <div className="text-roshan-gold-sand/80 mt-0.5">
                      B2B Sales: {COMPANY_INFO.b2bEmail}
                    </div>
                    <div className="text-roshan-gold-sand/80">
                      General: {COMPANY_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-roshan-gold shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Operating Hours</div>
                    <div className="text-roshan-gold-sand/80 mt-0.5">
                      {COMPANY_INFO.workingHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Dial Card */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                    'Hello Roshan team, I am contacting you from your official website.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-full font-semibold text-xs text-roshan-obsidian bg-roshan-gold hover:bg-roshan-gold-champagne shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Liquid Glass Send Inquiry / Place an Order Form */}
          <ScrollReveal direction="up" delay={0.2} duration={0.9} distance={35} className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-roshan-gold-champagne/60 shadow-glass-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-roshan-obsidian">
                    Send an Enquiry / Request a Quote
                  </h3>
                  <p className="text-xs text-roshan-taupe mt-1">
                    Fill the form below to receive wholesale pricing or OEM consultation.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-roshan-gold" />
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-roshan-green-light border border-roshan-green/30 text-roshan-green flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="font-bold block">Inquiry sent successfully!</strong>
                    WhatsApp has been opened with your inquiry pre-filled. Our team in Vadodara will review your requirements and respond shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    />
                  </div>

                  {/* City/State */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Ahmedabad, Gujarat"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    >
                      <option value="Wholesale B2B Distribution">Wholesale B2B Distribution</option>
                      <option value="Contract Manufacturing (OEM/ODM)">Contract Manufacturing (OEM/ODM)</option>
                      <option value="Retail Consumer Order">Retail Consumer Order</option>
                      <option value="Export Inquiry">Export Inquiry</option>
                      <option value="Corporate / Institutional Gifting">Corporate / Institutional Gifting</option>
                    </select>
                  </div>

                  {/* Estimated Order Size */}
                  <div>
                    <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                      Estimated Order Volume
                    </label>
                    <select
                      value={form.orderSize}
                      onChange={(e) => setForm({ ...form, orderSize: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian"
                    >
                      <option value="Sample / Trial Unit">Sample / Trial Unit</option>
                      <option value="Small Carton (50-200 pcs)">Small Carton (50-200 pcs)</option>
                      <option value="Bulk Pallet (500-2,000 pcs)">Bulk Pallet (500-2,000 pcs)</option>
                      <option value="Full Container Load (FCL)">Full Container Load (FCL)</option>
                      <option value="Custom Tooling Development">Custom Tooling Development</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-roshan-obsidian mb-1">
                    Requirement Details or Specific Products
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Specify bucket sizes, dinner set sets, or custom mould requirements..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-roshan-gold-champagne/40 focus:outline-none focus:border-roshan-crimson text-roshan-obsidian resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-roshan-gold-champagne" />
                  <span>Submit Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

