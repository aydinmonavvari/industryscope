import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
