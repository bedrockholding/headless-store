import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { QueryProvider } from "@/components/query-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shopify Headless Storefront",
    template: "%s · Shopify Headless Storefront",
  },
  description: "A minimal headless storefront powered by the Shopify Storefront API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
        <QueryProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500">
            Powered by Shopify · Built with Next.js
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
