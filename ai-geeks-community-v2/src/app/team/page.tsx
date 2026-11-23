"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
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
        {/* Header - Matching Chennai React Visual Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              THE PEOPLE BEHIND {SITE_CONFIG.name}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Meet the <span className="ag-text-gradient">team.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300">
              The people bringing our community together, one meetup at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`rounded-xl px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                  selectedDept === dept ? "ag-btn-primary" : "ag-btn-secondary"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Grid of 17 Team Cards - Matching Screenshot #5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {visibleMembers.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col justify-between rounded-2xl p-2 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Rounded Portrait (Aspect 4/4.5) */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl bg-[#091B32]/80 shadow-[0_8px_30px_rgba(2,8,19,0.7)]">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/team/member-01.jpg";
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020813]/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"
                />
              </div>

              {/* Info: Name, Role & LinkedIn Link */}
              <div className="flex items-start justify-between gap-2 pt-3.5 px-1">
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                    {member.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400 truncate">
                    {member.role || "Core team"}
                  </p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-[#80D8FF] hover:bg-[#163B63]/60 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Community Banner */}
        <div className="mt-20 glass-panel rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
            <span>COMMUNITY-FIRST</span>
          </div>
          <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            Want to get involved?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            We are always excited to collaborate with passionate developers, designers, and organizers.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/join"
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm"
            >
              <span>Join the Community</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/sponsor"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm font-semibold"
            >
              <span>Partner with Us</span>
              <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
