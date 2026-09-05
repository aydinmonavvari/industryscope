import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
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
  title: "IndustryScope — AI Operating System for Industry & Supply Chain",
  description:
    "IndustryScope turns fragmented industrial operational data into an intelligent command center. SEE → UNDERSTAND → PREDICT → ACT. The Digital Brain of Industrial Operations.",
  keywords: [
    "IndustryScope", "industrial intelligence", "supply chain", "AI operations",
    "command center", "inventory intelligence", "logistics control tower",
  ],
  authors: [{ name: "Scope" }],
  openGraph: {
    title: "IndustryScope — AI Operating System for Industry & Supply Chain",
    description: "See Your Entire Operation. Understand Every Signal. Act Before the Problem.",
    siteName: "IndustryScope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndustryScope",
    description: "AI Operating System for Industry & Supply Chain.",
  },
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
      </body>
    </html>
  );
}
