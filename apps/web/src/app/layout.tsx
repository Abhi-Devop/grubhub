import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { CartAnimationProvider } from "@/components/FlyingCartAnimation";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import { getCurrentUser } from "@/app/actions/auth";
import AuthProvider from "@/components/AuthProvider";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    template: '%s | GrubHub',
    default: 'GrubHub - Premium Food Delivery',
  },
  description: "Order delicious food from top restaurants near you. Fast delivery, live tracking, and premium service.",
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://grubhub.clone',
    siteName: 'GrubHub Clone',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GrubHub Food Delivery',
      },
    ],
  },
};

import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cormorant.variable} font-sans`}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <AuthProvider user={user}>
          <Providers>
            <CartAnimationProvider>
              <div className="min-h-screen">
                  {children}
              </div>
            </CartAnimationProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
