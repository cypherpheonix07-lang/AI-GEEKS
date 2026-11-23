"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Cpu, Heart } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/data/communityData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden border-t border-[#4DA8DA]/30 bg-gradient-to-b from-[#051020] to-[#020813] text-slate-200">
      {/* Top Specular Frosted Sky Edge Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
      />

      {/* Ambient Sky Metallic Footer Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-[320px] w-[760px] rounded-full bg-gradient-to-t from-[#163B63]/45 via-[#4DA8DA]/15 to-transparent blur-[125px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1: Brand Identity & Mission */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link className="group inline-flex items-center gap-3" href="/">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C4EEFF]/45 bg-gradient-to-br from-[#80D8FF]/30 via-[#2B6CB0] to-[#0F2744] shadow-[0_0_22px_rgba(128,216,255,0.3)] transition-transform duration-300 group-hover:scale-105">
                  <Cpu className="h-5 w-5 text-[#C4EEFF]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#C4EEFF] transition-colors">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                    MADE FOR THE COMMUNITY
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm md:text-base text-slate-300/90 leading-relaxed">
                {SITE_CONFIG.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs" href="/sponsor#speak">
                  <span>Speak at a meetup</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold" href="/sponsor">
                  <span>Become a sponsor</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#C4EEFF] transition-colors" href={link.href}>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link className="inline-flex items-center gap-1.5 text-[#80D8FF] hover:text-[#C4EEFF] transition-colors font-medium" href="/sponsor#speak">
                  <span>Speaker CFP Application</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 10-Link Social & Ecosystem Matrix */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
              Find us online
            </h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-[#4DA8DA]/30 bg-[#091B32]/75 px-3 py-2.5 text-xs font-semibold text-slate-200 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)] transition-all hover:-translate-y-0.5 hover:border-[#C4EEFF] hover:bg-[#163B63]/80 hover:text-[#C4EEFF]"
                >
                  <span className="truncate">{social.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#80D8FF] opacity-60 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Smooth Scroll-to-Top Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#4DA8DA]/25 pt-8 text-xs font-mono text-slate-400">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-slate-300 font-semibold">
              © {new Date().getFullYear()} {SITE_CONFIG.name} COMMUNITY
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#C4EEFF]">
              MADE WITH{" "}
              <Heart className="h-3.5 w-3.5 text-[#80D8FF] fill-[#80D8FF]" /> IN
              CHENNAI
            </span>
          </p>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold text-[#C4EEFF]"
          >
            <span>BACK TO TOP ↑</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#80D8FF]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
