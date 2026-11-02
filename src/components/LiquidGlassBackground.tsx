import React from 'react';

export default function LiquidGlassBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu"
    >
      {/* Hardware-accelerated ambient glowing gradients */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-roshan-crimson/15 via-roshan-gold-champagne/20 to-transparent blur-3xl opacity-75 will-change-transform animate-float-slow" />
      
      <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-roshan-gold/15 via-roshan-crimson-light/10 to-transparent blur-3xl opacity-60 will-change-transform animate-float-reverse" />
      
      <div className="absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-roshan-gold-sand/20 via-roshan-crimson/10 to-transparent blur-3xl opacity-60 will-change-transform animate-float-slow" />

      {/* Subtle fine mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B1512_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
    </div>
  );
}
