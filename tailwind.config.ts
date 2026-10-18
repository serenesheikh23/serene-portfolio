import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1714", paper: "#F3ECE4", text: "#EDE4D9",
        "text-dim": "#A79A8C", rose: "#C17A6E", gold: "#C9A15A", line: "#3A332C",
      },
      fontFamily: { sans: ["var(--font-manrope)"], serif: ["var(--font-newsreader)"] },
    },
  },
  plugins: [],
};
export default config;
