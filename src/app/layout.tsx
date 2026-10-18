import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Serene Sheikhalard | Full-Stack Developer",
  description: "Digital experiences, engineered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} font-sans bg-lux-bg text-lux-text antialiased overflow-x-hidden selection:bg-lux-gold selection:text-lux-bg`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
