/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        roshan: {
          obsidian: "#1B1512",
          mocha: "#3A2C25",
          charcoal: "#2A221E",
          crimson: "#7C1620",
          "crimson-dark": "#5C0E16",
          "crimson-light": "#9E1E27",
          "crimson-blush": "#FBEAEA",
          "crimson-tint": "#F5E6E6",
          gold: "#B8903F",
          "gold-deep": "#9C762E",
          "gold-champagne": "#E3C687",
          "gold-sand": "#DED0AE",
          cream: "#EFE4CD",
          parchment: "#FAF9F5",
          ivory: "#F7F2E9",
          taupe: "#7A6F62",
          "taupe-light": "#C7BCAE",
          "taupe-border": "#E5DED4",
          green: "#2D5934",
          "green-light": "#EEF4EC",
          amber: "#F0B429",
        },
      },
      fontFamily: {
        serif: ["var(--font-caslon)", "Libre Caslon Display", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        "liquid-glow": "0 8px 32px 0 rgba(184, 144, 63, 0.22)",
        "liquid-crimson": "0 10px 40px -10px rgba(124, 22, 32, 0.35)",
        "glass-sm": "0 4px 16px 0 rgba(27, 21, 18, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(27, 21, 18, 0.14)",
        "specular-light": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), 0 8px 32px rgba(27, 21, 18, 0.08)",
        "specular-dark": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 16px 40px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "fluid-drift": "fluidDrift 14s ease-in-out infinite alternate",
        "liquid-sheen": "liquidSheen 3.5s ease-in-out infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        "hero-zoom": "heroZoom 24s ease-in-out infinite alternate",
      },
      keyframes: {
        heroZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        fluidDrift: {
          "0%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "50%": { transform: "translate(40px, -30px) scale(1.08) rotate(180deg)" },
          "100%": { transform: "translate(-30px, 25px) scale(0.95) rotate(360deg)" },
        },
        liquidSheen: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "50%": { transform: "translateX(150%) skewX(-20deg)" },
          "100%": { transform: "translateX(150%) skewX(-20deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(14px)" },
        },
      },
    },
  },
  plugins: [],
};

