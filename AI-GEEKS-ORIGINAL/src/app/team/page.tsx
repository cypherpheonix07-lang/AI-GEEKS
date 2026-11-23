"use client";

import React, { useState } from "react";
import {
  Globe,
  Github,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { CORE_TEAM, SITE_CONFIG, TeamMember } from "@/data/communityData";

const DEPARTMENTS: Array<"All" | TeamMember["department"]> = [
  "All",
  "Architecture & AI",
  "Operations & Venues",
  "Stage & Emcee",
  "Design & Community",
];

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState<"All" | TeamMember["department"]>("All");

  const visibleMembers = CORE_TEAM.filter((m) =>
    selectedDept === "All" ? true : m.department === selectedDept
  );

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      {/* Sky Metallic Ambient Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gradient-to-r from-[#163B63]/45 via-[#4DA8DA]/25 to-[#80D8FF]/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                THE PEOPLE BEHIND {SITE_CONFIG.name}
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Meet the <span className="ag-text-gradient">core team.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
              The organizers, architects, emcees, and community leads bringing{" "}
              {SITE_CONFIG.name} together—one meetup and hackathon at a time.
            </p>
          </div>

          <div className="glass-panel rounded-2xl px-5 py-3.5 text-right self-start md:self-end">
            <span className="font-mono text-2xl font-extrabold text-[#C4EEFF]">
              {CORE_TEAM.length}
            </span>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#80D8FF]">
              ACTIVE ORGANIZING LEADS
            </p>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                selectedDept === dept ? "ag-btn-primary" : "ag-btn-secondary"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* 17-Member Metallic Sky Glass Profile Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleMembers.map((member, index) => {
            const initials = member.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);

            return (
              <article
                key={member.id}
                className="glass-panel group rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Row: Avatar Monogram + Name + Role & Department Badge */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#C4EEFF]/45 bg-gradient-to-br from-[#4DA8DA]/40 via-[#163B63] to-[#051020] shadow-[0_0_24px_rgba(128,216,255,0.25)]">
                      <span className="font-mono text-xl font-extrabold text-[#C4EEFF] group-hover:scale-110 transition-transform">
                        {initials}
                      </span>
                      <span className="absolute -bottom-1.5 -right-1.5 rounded-md bg-[#051020] border border-[#80D8FF]/40 px-1.5 py-0.5 font-mono text-[9px] text-[#80D8FF]">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="ag-badge-cyan rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                          {member.role}
                        </span>
                        <span className="rounded-full bg-[#051020]/90 border border-[#4DA8DA]/30 px-2.5 py-0.5 font-mono text-[10px] text-[#80D8FF]">
                          {member.department}
                        </span>
                      </div>

                      <h2 className="mt-2 text-xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                        {member.name}
                      </h2>
                    </div>
                  </div>

                  {/* Dedicated "IN CHARGE OF" Responsibility Box */}
                  <div className="mt-6 rounded-2xl border border-[#80D8FF]/30 bg-gradient-to-br from-[#091B32]/90 via-[#051020]/95 to-[#020813] p-4 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.18)]">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#80D8FF]">
                      <Briefcase className="h-3.5 w-3.5 text-[#C4EEFF]" />
                      <span>IN CHARGE OF</span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-[#C4EEFF] leading-snug">
                      {member.inChargeOf}
                    </p>
                    <p className="mt-2 text-xs text-slate-300/90 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Portfolio, GitHub & LinkedIn Links */}
                <div className="mt-6 pt-4 border-t border-[#4DA8DA]/20">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2.5">
                    CONNECT &amp; PROOF OF WORK
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
                    >
                      <Globe className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>Portfolio</span>
                    </a>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
                    >
                      <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Volunteer Callout Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#163B63] border border-[#80D8FF]/40 text-[#C4EEFF]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Want to volunteer or help organize a meetup?
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                We welcome builders who love stage ops, design, developer
                relations, and open-source mentorship.
              </p>
            </div>
          </div>
          <a
            href="/sponsor#speak"
            className="ag-btn-primary rounded-xl px-6 py-3 text-sm whitespace-nowrap"
          >
            Apply to Join the Crew
          </a>
        </div>
      </div>
    </div>
  );
}
