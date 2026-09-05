import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://industryscope.io"),
  title: {
    default: "IndustryScope — AI Operating System for Industry & Supply Chain",
    template: "%s · IndustryScope",
  },
  description:
    "IndustryScope turns fragmented industrial operational data into an intelligent command center. SEE → UNDERSTAND → PREDICT → ACT. The Digital Brain of Industrial Operations — inventory intelligence, logistics control tower, supply-chain risk, AI copilot.",
  keywords: [
    "IndustryScope", "industrial intelligence", "supply chain", "AI operations",
    "command center", "inventory intelligence", "logistics control tower",
    "supply chain risk", "AI copilot", "digital twin", "operational intelligence",
    "هوش صنعتی", "زنجیره تأمین", "لجستیک", "موجودی",
  ],
  authors: [{ name: "Scope" }],
  creator: "Scope",
  publisher: "Scope",
  alternates: {
    canonical: "/",
    languages: { "fa-IR": "/", en: "/" },
  },
  openGraph: {
    title: "IndustryScope — AI Operating System for Industry & Supply Chain",
    description: "See Your Entire Operation. Understand Every Signal. Act Before the Problem. کل عملیات خود را یکجا ببینید.",
    url: "https://industryscope.io",
    siteName: "IndustryScope",
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "IndustryScope",
    description: "AI Operating System for Industry & Supply Chain.",
    creator: "@industryscope",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "IndustryScope",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "AI Operating System for Industry & Supply Chain. Inventory intelligence, logistics control tower, supply-chain risk engine, and AI copilot.",
              url: "https://industryscope.io",
              offers: { "@type": "Offer", priceCurrency: "USD", price: "0", description: "Demo free · Starter / Growth / Enterprise tiers" },
              publisher: { "@type": "Organization", name: "Scope", contactPoint: { "@type": "ContactPoint", telephone: "+989123326387", contactType: "sales", availableLanguage: ["fa", "en"] } },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "3" },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IndustryScope",
              url: "https://industryscope.io",
              logo: "https://industryscope.io/favicon.ico",
              contactPoint: { "@type": "ContactPoint", telephone: "+989123326387", email: "hello@industryscope.io", contactType: "sales", availableLanguage: ["fa", "en"] },
              sameAs: ["https://t.me/industryscope"],
            }),
          }}
        />
      </body>
    </html>
  );
}
