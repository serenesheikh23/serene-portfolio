import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Serene Sheikhalard | Full-Stack Developer",
  description: "Full-stack developer building Laravel, React, and Next.js applications. Open to relocation and remote.",
  openGraph: {
    title: "Serene Sheikhalard | Full-Stack Developer",
    description: "Full-stack developer building Laravel, React, and Next.js applications. Open to relocation and remote.",
    url: "https://serenesheikh23.github.io/serene-portfolio/",
    siteName: "Serene Sheikhalard Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} font-sans bg-lux-bg text-lux-text antialiased overflow-x-hidden selection:bg-lux-gold selection:text-black`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}