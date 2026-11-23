"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users2, ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";
import { CORE_TEAM, SITE_CONFIG, TeamMember } from "@/data/communityData";
import { PhosphorIcons } from "@/components/layout/Footer";

const VIT_DEPARTMENTS = [
  "All Teams",
  "Architecture & AI",
  "Operations & Venues",
  "Stage & Emcee",
  "Design & Community",
] as const;

export default function VitStyleTeamSection() {
  const [activeDept, setActiveDept] = useState<string>("All Teams");

  const filteredMembers =
    activeDept === "All Teams"
      ? CORE_TEAM
      : CORE_TEAM.filter((m) => m.department === activeDept);

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#020813] py-24 px-6 text-slate-100"
    >
      {/* Specular Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/3 h-[420px] w-[700px] rounded-full bg-gradient-to-bl from-[#163B63]/40 via-[#4DA8DA]/20 to-transparent blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header (Inspired by DSC VIT Teams Showcase) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
              <Users2 className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>THE BUILDERS BEHIND {SITE_CONFIG.name}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Core <span className="ag-text-gradient">Team.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
              Engineers, researchers, community leads, and creators passionate about advancing developer culture in Chennai.
            </p>
          </div>

          {/* Department Filter (DSC VIT Style) */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {VIT_DEPARTMENTS.map((dept) => {
              const isActive = activeDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  className={`rounded-xl px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "ag-btn-primary shadow-[0_4px_16px_rgba(43,108,176,0.4)]"
                      : "bg-[#091B32]/70 text-slate-300 hover:text-white hover:bg-[#163B63]/60 backdrop-blur-md"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Holographic Member Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-[#091B32]/70 hover:bg-[#0F2744]/90 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(2,8,19,0.5)] hover:shadow-[0_18px_45px_rgba(43,108,176,0.3)]"
            >
              {/* Specular Top Rim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Portrait */}
              <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-2xl bg-[#020813]/60 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]">
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
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020813]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"
                />

                {/* Floating Department Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-lg bg-[#020813]/85 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#80D8FF] backdrop-blur-md">
                    {member.department.split("&")[0].trim()}
                  </span>
                </div>
              </div>

              {/* Details & Socials */}
              <div className="mt-3.5 flex items-start justify-between gap-2 px-1">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400 truncate">
                    {member.role || "Core Team"}
                  </p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn profile`}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#020813]/60 text-slate-400 group-hover:text-[#C4EEFF] hover:bg-[#2B6CB0] transition-all shrink-0"
                >
                  <PhosphorIcons.LinkedIn className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Team Link */}
        <div className="mt-12 text-center">
          <Link
            href="/team"
            className="ag-btn-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#C4EEFF] hover:text-white"
          >
            <span>Meet all 17 team organizers &amp; leads</span>
            <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
