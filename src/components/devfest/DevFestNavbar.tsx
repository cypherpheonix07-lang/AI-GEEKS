"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Sparkles, Ticket, Calendar, Users, Gamepad2, Camera, Radio, Menu, X } from "lucide-react";

export default function DevFestNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/devfest", icon: Sparkles },
    { label: "Agenda", href: "/devfest/agenda", icon: Calendar },
    { label: "Speakers", href: "/devfest/speakers", icon: Users },
    { label: "Tickets", href: "/devfest/tickets", icon: Ticket },
    { label: "Games", href: "/devfest/games", icon: Gamepad2 },
    { label: "Memories", href: "/devfest/memories", icon: Camera },
    { label: "Live", href: "/devfest/live", icon: Radio },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#020813]/85 transition-all">
      {/* Top Ambient Bar linking to Chennai React / AI GEEKS */}
      <div className="w-full bg-gradient-to-r from-[#051020] via-[#091B32] to-[#051020] px-4 py-1.5 text-center text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-[#80D8FF] hover:text-[#C4EEFF] transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            <span>← Back to AI GEEKS / Chennai React JS Portal</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OCTOBER 17, 2026 · IIT MADRAS RESEARCH PARK</span>
          </div>
        </div>
      </div>

      {/* Main DevFest Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand */}
        <Link href="/devfest" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2B6CB0] via-[#163B63] to-[#091B32] shadow-[0_0_20px_rgba(43,108,176,0.35)] transition-transform group-hover:scale-105">
            <span className="font-mono text-lg font-black text-[#80D8FF]">{"{}"}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-[#80D8FF] transition-colors">
                DevFest Chennai
              </span>
              <span className="rounded-md bg-[#2B6CB0]/30 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#80D8FF]">
                2026
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              BY GDG CHENNAI & AI GEEKS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#2B6CB0]/25 text-[#80D8FF] shadow-[0_0_15px_rgba(43,108,176,0.25)]"
                    : "text-slate-300 hover:bg-[#091B32]/60 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#80D8FF]" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/devfest/tickets"
            className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold"
          >
            <Ticket className="h-3.5 w-3.5" />
            <span>Get Tickets</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-[#091B32] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-0 bg-[#051020]/95 px-4 py-4 backdrop-blur-2xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#2B6CB0]/30 text-[#80D8FF]"
                      : "text-slate-300 hover:bg-[#091B32] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 text-[#80D8FF]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
