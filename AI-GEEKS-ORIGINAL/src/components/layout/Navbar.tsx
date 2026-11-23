"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Cpu, Search } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/data/communityData";
import { triggerCommandPalette } from "@/components/layout/CommandPalette";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const marqueeItems = Array.from(
    { length: 6 },
    () => SITE_CONFIG.topBannerText
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Metallic Sky Announcement Ticker */}
      <div
        style={{ background: "var(--ag-gradient-banner)" }}
        className="w-full overflow-hidden border-b border-[#80D8FF]/25 py-2"
      >
        <div className="ag-animate-marquee flex items-center gap-10 whitespace-nowrap">
          {marqueeItems.map((text, idx) => (
            <span
              key={idx}
              className="font-mono text-[11px] font-semibold tracking-widest text-[#C4EEFF] uppercase"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Glassmorphic Header with Precision 3-Column Alignment */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#020813]/88 backdrop-blur-2xl border-b border-[#80D8FF]/25 py-3 shadow-[0_12px_36px_-10px_rgba(15,39,68,0.75)]"
            : "bg-[#020813]/72 backdrop-blur-xl border-b border-[#4DA8DA]/15 py-3.5"
        }`}
      >
        <nav
          aria-label="Global Navigation"
          className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6"
        >
          {/* Column 1 (Left): Brand Identity */}
          <Link className="group flex shrink-0 items-center gap-3 justify-self-start focus:outline-none" href="/">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C4EEFF]/45 bg-gradient-to-br from-[#80D8FF]/30 via-[#2B6CB0] to-[#0F2744] shadow-[0_0_20px_rgba(128,216,255,0.3)] transition-transform duration-300 group-hover:scale-105">
              {!logoError && SITE_CONFIG.logoAssetPath ? (
                <img
                  src={SITE_CONFIG.logoAssetPath}
                  alt={SITE_CONFIG.name}
                  className="h-5 w-5 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Cpu className="h-5 w-5 text-[#C4EEFF]" />
              )}
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-[#80D8FF] transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#80D8FF]/85">
                Developer Community
              </span>
            </div>
          </Link>

          {/* Column 2 (Center): Centered Metallic Sky Glass Navigation Pill */}
          <div className="hidden xl:flex items-center justify-center justify-self-center">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-[#80D8FF]/25 bg-[#091B32]/75 p-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-b from-[#4DA8DA]/35 to-[#163B63]/80 text-[#C4EEFF] border border-[#80D8FF]/55 shadow-[0_0_14px_rgba(128,216,255,0.28)]"
                        : "text-slate-200/90 hover:bg-[#163B63]/45 hover:text-[#C4EEFF]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3 (Right): Search Command Pill + Join CTA (Locked to h-10) */}
          <div className="hidden xl:flex shrink-0 items-center justify-end gap-2.5 justify-self-end">
            <button
              type="button"
              onClick={triggerCommandPalette}
              aria-label="Open Command Palette"
              className="ag-btn-secondary inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-medium"
            >
              <Search className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>Search</span>
              <kbd className="rounded bg-[#020813]/80 border border-[#80D8FF]/35 px-1.5 py-0.5 font-mono text-[10px] text-[#C4EEFF]">
                ⌘K
              </kbd>
            </button>

            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ag-btn-primary inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xl px-4 text-xs sm:text-sm font-semibold"
            >
              <span>Join the community</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Tablet / Mobile Controls */}
          <div className="col-start-3 flex xl:hidden items-center justify-end gap-2 justify-self-end">
            <button
              type="button"
              onClick={triggerCommandPalette}
              aria-label="Search"
              className="ag-btn-secondary inline-flex h-10 w-10 items-center justify-center rounded-xl"
            >
              <Search className="h-4 w-4 text-[#80D8FF]" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="ag-btn-secondary inline-flex h-10 w-10 items-center justify-center rounded-xl"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#80D8FF]" />
              ) : (
                <Menu className="h-5 w-5 text-[#C4EEFF]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 border-t border-[#80D8FF]/25 bg-[#020813]/95 backdrop-blur-2xl px-6 pt-4 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#163B63]/80 text-[#C4EEFF] border border-[#80D8FF]/55"
                        : "text-slate-200 hover:bg-[#0F2744]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link className="ag-btn-secondary flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold" href="/sponsor#speak">
                <span>Speak at a meetup</span>
              </Link>
              <a
                href={SITE_CONFIG.lumaCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ag-btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
              >
                <span>Join the community</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
