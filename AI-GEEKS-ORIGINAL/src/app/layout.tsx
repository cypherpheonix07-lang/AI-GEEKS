import type { Metadata } from "next";
import "@/styles/tokens.css";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import CommandPalette from "@/components/layout/CommandPalette";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/data/communityData";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | AI & React Developer Community`,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#020813] text-slate-100 antialiased selection:bg-[#4DA8DA] selection:text-[#020813]">
        <SmoothScrollProvider>
          <Navbar />
          <CommandPalette />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
