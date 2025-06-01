import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `About | ${siteConfig.siteName}`,
  description: `Personal blog and research showcase for ${siteConfig.name.first} ${siteConfig.name.last}, ${siteConfig.title}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${lora.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Amir N." />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <Navbar />
        <main className="flex-grow max-w-3xl mx-auto px-4 py-6 sm:py-8 w-full">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
