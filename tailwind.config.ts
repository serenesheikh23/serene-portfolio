import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lux: {
          bg: "#0A0A0A",       // Deep obsidian
          card: "#141414",     // Slightly lighter card
          text: "#F5F5F5",     // Off-white cream
          muted: "#A3A3A3",    // Subtle grey
          gold: "#D4AF37",     // Rich gold
          "gold-light": "#F3E5AB",
          border: "#262626",
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
