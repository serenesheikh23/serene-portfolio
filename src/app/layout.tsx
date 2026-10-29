import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import MobileActionBar from "@/components/MobileActionBar";
import SectionProgress from "@/components/SectionProgress";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Serene Sheikhalard — Full-Stack & Front-End Software Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Serene Sheikhalard",
  },
  description: site.description,
  applicationName: "Serene Sheikhalard — Portfolio",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Serene Sheikhalard",
    "front-end engineer",
    "full-stack engineer",
    "React developer",
    "Next.js developer",
    "Laravel developer",
    "Dallas Fort Worth software engineer",
    "entry-level software engineer",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Serene Sheikhalard",
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4efe6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <MobileActionBar />
        <SectionProgress />
      </body>
    </html>
  );
}
