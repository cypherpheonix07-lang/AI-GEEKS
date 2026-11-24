import React from "react";
import type { Metadata } from "next";
import DevFestNavbar from "@/components/devfest/DevFestNavbar";

export const metadata: Metadata = {
  title: "DevFest Chennai 2026 · Flagship Tech Conference",
  description:
    "India's flagship community developer festival hosted at IIT Madras Research Park. 8 tracks, 30+ speakers, 68 sessions, and 4 interactive mini-games.",
};

export default function DevFestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020813] text-slate-100 flex flex-col selection:bg-[#2B6CB0] selection:text-white">
      <DevFestNavbar />
      <main className="flex-1 relative">{children}</main>
      <footer className="w-full bg-[#051020]/90 py-8 px-6 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#80D8FF]">DEVFEST CHENNAI 2026</span>
            <span>·</span>
            <span>ORGANIZED BY GDG CHENNAI & AI GEEKS</span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">
            OCTOBER 17, 2026 · IIT MADRAS RESEARCH PARK, CHENNAI
          </p>
        </div>
      </footer>
    </div>
  );
}
