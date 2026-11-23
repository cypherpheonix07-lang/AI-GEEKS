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
} from "lucide-react";
import { PAST_SPEAKERS, SITE_CONFIG } from "@/data/communityData";

const CATEGORIES = ["All", "AI Agents", "Frontend & React", "Infrastructure"] as const;

export default function PastSpeakersPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSpeakers = PAST_SPEAKERS.filter((spk) => {
    const matchesCategory =
      selectedCategory === "All" || spk.topicCategory === selectedCategory;
    const matchesQuery =
      spk.name.toLowerCase().includes(query.toLowerCase()) ||
      spk.talkTitle.toLowerCase().includes(query.toLowerCase()) ||
      spk.roleAndCompany.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/3 h-[420px] w-[760px] rounded-full bg-gradient-to-tr from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header + Speak CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              THE PEOPLE BEHIND THE TALKS · {SITE_CONFIG.name}
            </p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Past <span className="ag-text-gradient">speakers.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
              Engineers, researchers, and architects who have shared production
              war stories, live demos, and deep dives with our community.
            </p>
          </div>

          <Link className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm self-start md:self-end" href="/sponsor#speak">
            <Mic2 className="h-4 w-4" />
            <span>Apply to Speak</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
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
              placeholder="Search speaker, company, or talk..."
              className="ag-input-metallic w-full rounded-xl pl-10 pr-4 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredSpeakers.map((speaker) => (
            <article
              key={speaker.id}
              className="glass-panel group rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                    {speaker.topicCategory}
                  </span>
                  <span className="rounded-lg bg-[#051020] border border-[#4DA8DA]/30 px-2.5 py-1 font-mono text-[10px] text-[#80D8FF]">
                    {speaker.eventEdition}
                  </span>
                </div>

                {/* Speaker Identity */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C4EEFF]/45 bg-gradient-to-br from-[#4DA8DA]/45 via-[#163B63] to-[#051020] font-mono text-lg font-extrabold text-[#C4EEFF]">
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

                {/* Talk Details Box */}
                <div className="mt-6 rounded-2xl border border-[#80D8FF]/25 bg-[#051020]/85 p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF]">
                    <Mic2 className="h-3.5 w-3.5 text-[#C4EEFF]" />
                    <span>FEATURED SESSION</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white leading-snug">
                    {speaker.talkTitle}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {speaker.abstract}
                  </p>
                </div>
              </div>

              {/* Footer: Date + Social / Slide Links */}
              <div className="mt-6 pt-4 border-t border-[#4DA8DA]/20 flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#80D8FF]" />
                    {speaker.eventDate}
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

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={speaker.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                  >
                    <Globe className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>Web</span>
                  </a>
                  <a
                    href={speaker.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                  >
                    <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
