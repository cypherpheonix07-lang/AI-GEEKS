"use client";

import React from "react";
import Link from "next/link";
import { Award, ArrowUpRight, ShieldCheck, HeartHandshake, Download, Sparkles, Building2 } from "lucide-react";
import { PREVIOUS_SPONSORS, COMMUNITY_PARTNERS } from "@/data/communityData";

export default function DevFestSponsorsShowcase() {
  const venueHosts = [
    {
      name: "Walmart Global Tech",
      role: "Official Venue Host & Hackathon Sponsor",
      badge: "TITLE VENUE PARTNER",
      logo: "/sponsors/wso2.webp",
      desc: "Hosting 400+ developers at RMZ Millenia, Chennai.",
    },
    {
      name: "IITM Research Park",
      role: "Deep Tech & Innovation Campus Host",
      badge: "INNOVATION HUB",
      logo: "/sponsors/talentship.webp",
      desc: "Chennai's premier frontier tech & incubation ecosystem.",
    },
  ];

  return (
    <section
      id="sponsors-showcase"
      className="relative overflow-hidden bg-[#051020] py-24 px-6 text-slate-100"
    >
      {/* Specular Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-[350px] w-[500px] rounded-full bg-gradient-to-l from-[#163B63]/30 via-[#4DA8DA]/15 to-transparent blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
              <Award className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>VENUE & ECOSYSTEM SUPPORTERS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Our <span className="ag-text-gradient">Sponsors.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
              Powering world-class events, open-source workshops, and zero-cost community meetups across Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/sponsor"
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-bold"
            >
              <span>Become a Sponsor</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Tier 1: Title & Venue Sponsors (Large Feature Cards) */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF] mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>VENUE &amp; HOST PARTNERS</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venueHosts.map((host) => (
              <div
                key={host.name}
                className="group relative overflow-hidden rounded-3xl bg-[#091B32]/75 hover:bg-[#0F2744]/90 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_14px_40px_rgba(2,8,19,0.6)]"
              >
                {/* Specular Top Line Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16202C] px-3.5 py-1 font-mono text-xs font-bold text-[#80D8FF]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{host.badge}</span>
                  </span>
                  <span className="font-mono text-xs text-slate-400">CHENNAI, TN</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                  {host.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#80D8FF]">
                  {host.role}
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  {host.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Technology & Platform Sponsors Grid */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF] mb-4">
            PREVIOUS &amp; CURRENT PLATFORM PARTNERS
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PREVIOUS_SPONSORS.map((sp) => (
              <div
                key={sp.id}
                className="group relative flex flex-col items-center justify-center rounded-2xl bg-[#091B32]/60 hover:bg-[#0F2744]/80 p-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_25px_rgba(2,8,19,0.4)]"
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#80D8FF] mb-1">
                  {sp.tier}
                </span>
                <span className="text-sm font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                  {sp.name}
                </span>
                <span className="mt-1 text-[11px] font-mono text-slate-400">Verified Sponsor</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics Banner (Zero Borders) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-3xl bg-[#020813]/70 p-6 sm:p-8 backdrop-blur-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <div>
            <strong className="block text-3xl sm:text-4xl font-extrabold text-white">10,000+</strong>
            <span className="text-xs font-mono text-[#80D8FF] uppercase tracking-wider">
              Developer Reach
            </span>
          </div>
          <div>
            <strong className="block text-3xl sm:text-4xl font-extrabold text-white">12+</strong>
            <span className="text-xs font-mono text-[#80D8FF] uppercase tracking-wider">
              Meetups &amp; Hackathons
            </span>
          </div>
          <div>
            <strong className="block text-3xl sm:text-4xl font-extrabold text-white">450+</strong>
            <span className="text-xs font-mono text-[#80D8FF] uppercase tracking-wider">
              Average Turnout
            </span>
          </div>
          <div>
            <strong className="block text-3xl sm:text-4xl font-extrabold text-white">100%</strong>
            <span className="text-xs font-mono text-[#80D8FF] uppercase tracking-wider">
              Free &amp; Community-Led
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
