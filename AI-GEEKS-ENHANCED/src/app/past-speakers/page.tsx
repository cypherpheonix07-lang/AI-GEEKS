"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic2,
  Calendar,
  Search,
  Globe,
  Github,
  Linkedin,
  Presentation,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  List,
} from "lucide-react";
import { PAST_SPEAKERS, SITE_CONFIG } from "@/data/communityData";

const CATEGORIES = ["All", "AI Agents", "Frontend & React", "Infrastructure", "Architecture"] as const;

export default function PastSpeakersPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"gallery" | "detailed">("gallery");

  const filteredSpeakers = PAST_SPEAKERS.filter((spk) => {
    const matchesCategory =
      selectedCategory === "All" || spk.topicCategory === selectedCategory;
    const matchesQuery =
      spk.name.toLowerCase().includes(query.toLowerCase()) ||
      (spk.talkTitle && spk.talkTitle.toLowerCase().includes(query.toLowerCase())) ||
      spk.roleAndCompany.toLowerCase().includes(query.toLowerCase()) ||
      (spk.role && spk.role.toLowerCase().includes(query.toLowerCase())) ||
      (spk.organization && spk.organization.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      {/* Ambient Metallic Blue Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/3 h-[450px] w-[800px] rounded-full bg-gradient-to-tr from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl space-y-12">
        {/* Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              IDEAS WORTH SHARING · {SITE_CONFIG.name}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Past <span className="ag-text-gradient">speakers.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300">
              Meet the speakers who have shared their knowledge at {SITE_CONFIG.name} meetups,
              from software engineers and founders to principal architects.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="glass-panel rounded-xl p-1 flex items-center">
              <button
                type="button"
                onClick={() => setViewMode("gallery")}
                className={`p-2 rounded-lg transition-all ${
 viewMode === "gallery"
 ? "bg-[#2B6CB0] text-white shadow"
 : "text-slate-400 hover:text-white"
 }`}
                title="Circular Speaker Grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("detailed")}
                className={`p-2 rounded-lg transition-all ${
 viewMode === "detailed"
 ? "bg-[#2B6CB0] text-white shadow"
 : "text-slate-400 hover:text-white"
 }`}
                title="Detailed Talk Cards"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Link
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
              href="/sponsor#speak"
            >
              <Mic2 className="h-4 w-4" />
              <span>Apply to Speak</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
 selectedCategory === cat
 ? "ag-btn-primary"
 : "ag-btn-secondary"
 }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#80D8FF]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search speaker, role, or company..."
              className="ag-input-metallic w-full rounded-xl pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* ====================================================================
            VIEW MODE 1: CIRCULAR SPEAKER GRID (Matches Screenshot 03 / Visual Reference)
           ==================================================================== */}
        {viewMode === "gallery" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {filteredSpeakers.map((speaker, index) => {
              const initials = speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);

              return (
                <article
                  key={speaker.id}
                  className="group flex flex-col items-center justify-between p-3 text-center transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Circular Avatar - Matching Screenshot #3 */}
                    <div className="relative mb-4 w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-full bg-[#091B32] shadow-[0_8px_24px_rgba(2,8,19,0.7)] group-hover:scale-105 transition-transform duration-300">
                      {speaker.avatarUrl ? (
                        <img
                          src={speaker.avatarUrl}
                          alt={speaker.name}
                          className="h-full w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-xl sm:text-2xl font-black text-[#C4EEFF]">
                        {initials}
                      </span>
                    </div>

                    {/* Speaker Name */}
                    <h2 className="text-base font-bold text-white transition-colors group-hover:text-[#C4EEFF] line-clamp-1">
                      {speaker.name}
                    </h2>

                    {/* Speaker Role */}
                    <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                      {speaker.role || speaker.roleAndCompany.split("·")[0]?.trim()}
                    </p>

                    {/* Speaker Company / Organization */}
                    {speaker.organization && (
                      <span className="mt-0.5 text-xs text-[#80D8FF] line-clamp-1">
                        {speaker.organization}
                      </span>
                    )}
                  </div>

                  {/* LinkedIn Icon Link - Matching Screenshot #3 */}
                  <div className="mt-3 flex justify-center">
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-[#80D8FF] transition-colors"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* ====================================================================
              VIEW MODE 2: DETAILED TALK CARDS
             ==================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredSpeakers.map((speaker) => (
              <article
                key={speaker.id}
                className="glass-panel group rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {speaker.topicCategory || "Architecture"}
                    </span>
                    <span className="rounded-lg bg-[#051020] px-2.5 py-1 font-mono text-[10px] text-[#80D8FF]">
                      {speaker.eventEdition || "Community Meetup"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4DA8DA]/45 via-[#163B63] to-[#051020] font-mono text-lg font-extrabold text-[#C4EEFF]">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                        {speaker.name}
                      </h2>
                      <p className="text-xs font-mono text-[#80D8FF] truncate mt-0.5">
                        {speaker.roleAndCompany}
                      </p>
                    </div>
                  </div>

                  {speaker.talkTitle && (
                    <div className="mt-6 rounded-2xl bg-[#051020]/85 p-4">
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF]">
                        <Mic2 className="h-3.5 w-3.5 text-[#C4EEFF]" />
                        <span>FEATURED SESSION</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-white leading-snug">
                        {speaker.talkTitle}
                      </h3>
                      {speaker.abstract && (
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                          {speaker.abstract}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#80D8FF]" />
                      {speaker.eventDate || "Recent Meetup"}
                    </span>
                    {speaker.slidesUrl && (
                      <a
                        href={speaker.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#C4EEFF] hover:underline"
                      >
                        <Presentation className="h-3.5 w-3.5" />
                        <span>Slides</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ====================================================================
            CALL FOR SPEAKERS CTA (Matches Screenshot 03 / Visual Reference)
           ==================================================================== */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#051020] via-[#091B32] to-[#051020] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-80"
          />

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              CALL FOR SPEAKERS
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Have something to share?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Share your ideas, experiences, and lessons with our community.
              We welcome talks of all skill levels—from 10-minute lightning demos to deep architecture breakdowns.
            </p>
          </div>

          <Link
            href="/sponsor#speak"
            className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold shrink-0 self-start sm:self-auto"
          >
            <span>Apply to speak</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
