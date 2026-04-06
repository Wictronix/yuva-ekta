import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import SEOHeader from "@/components/seo/SEOHeader";
import { cn } from "@/lib/utils";
import { DonationProvider } from "@/components/providers/DonationProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)}>
      <body className="antialiased font-inter">
        <SEOHeader />
        <DonationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </DonationProvider>
      </body>
    </html>
  );
}
