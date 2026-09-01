import type { Metadata } from "next";
import { Cairo, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LocaleProvider, LOCALE_BOOT } from "@/components/providers/LocaleProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const arabic = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const description =
  "Academic portfolio of Dr. Hafez Mohamed Farid, Ph.D. — Assistant Professor of Business Administration and Certified Trainer. Research in HR sustainability, ethical climate, leadership and organizational behavior across 16 years in higher education.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dr. Hafez Mohamed Farid — Assistant Professor of Business Administration",
    template: "%s · Dr. Hafez Mohamed Farid",
  },
  description,
  keywords: [
    "Hafez Mohamed Farid",
    "Business Administration",
    "Assistant Professor",
    "Human Resource Management",
    "Organizational Behavior",
    "Strategic Management",
    "Certified Trainer",
    "Egypt",
    "GCC training",
  ],
  authors: [{ name: "Dr. Hafez Mohamed Farid" }],
  creator: "Dr. Hafez Mohamed Farid",
  openGraph: {
    title: "Dr. Hafez Mohamed Farid — Assistant Professor of Business Administration",
    description,
    type: "profile",
    locale: "en",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT }} />
        <noscript>
          {/* Framer Motion writes initial styles into SSR HTML; un-hide everything without JS. */}
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
