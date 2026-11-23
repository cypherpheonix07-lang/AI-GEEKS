"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mic, ArrowUpRight, Sparkles, Linkedin, Github, Building, Tag } from "lucide-react";
import { PAST_SPEAKERS, PastSpeaker } from "@/data/communityData";

const SPEAKER_TRACKS = [
  "All Tracks",
  "AI Agents",
  "Frontend & React",
  "Architecture",
] as const;

export default function DevFestFeaturedSpeakers() {
  const [activeTrack, setActiveTrack] = useState<string>("All Tracks");

  // Select top featured speakers for the home showcase
  const featuredSpeakers = PAST_SPEAKERS.slice(0, 8);

  const filteredSpeakers =
    activeTrack === "All Tracks"
      ? featuredSpeakers
      : featuredSpeakers.filter((spk) => spk.topicCategory === activeTrack);

  return (
    <section
      id="speakers"
      className="relative overflow-hidden bg-[#020813] py-24 px-6 text-slate-100"
    >
      {/* Specular Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[800px] rounded-full bg-gradient-to-r from-[#163B63]/25 via-[#4DA8DA]/15 to-transparent blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
              <Mic className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>DEVFEST & CHENNAI REACT TALKS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Featured <span className="ag-text-gradient">Speakers.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
              Visionary engineers, core contributors, and founders sharing battle-tested architecture from Meta, Luma AI, Elastic, and Walmart Global Tech.
            </p>
          </div>

          <Link
            href="/past-speakers"
            className="ag-btn-secondary inline-flex items-center gap-2 self-start md:self-end rounded-xl px-5 py-2.5 font-mono text-xs font-bold text-[#C4EEFF]"
          >
            <span>View all 40 speakers</span>
            <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
          </Link>
        </div>

        {/* Track Filter Pills (Zero Borders, Glass Metallic Blue) */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {SPEAKER_TRACKS.map((track) => {
            const isActive = activeTrack === track;
            return (
              <button
                key={track}
                type="button"
                onClick={() => setActiveTrack(track)}
                className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#2B6CB0] to-[#163B63] text-white shadow-[0_0_20px_rgba(43,108,176,0.35)]"
                    : "bg-[#091B32]/70 text-slate-300 hover:text-white hover:bg-[#0F2744]/90"
                }`}
              >
                {track}
              </button>
            );
          })}
        </div>

        {/* Speakers Grid (DevFest / DSC VIT Inspired Holographic Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpeakers.map((speaker, idx) => (
            <article
              key={speaker.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#091B32]/65 hover:bg-[#0F2744]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_35px_rgba(2,8,19,0.55)] hover:shadow-[0_20px_50px_rgba(43,108,176,0.25)]"
            >
              {/* Specular Top Line Highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div>
                {/* Speaker Portrait & Company Badge */}
                <div className="relative mb-5 flex items-center justify-between">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2B6CB0] to-[#020813] shadow-[0_0_22px_rgba(128,216,255,0.25)]">
                    <img
                      src={speaker.avatarUrl || `/images/speakers/speaker-0${(idx % 4) + 1}.jpg`}
                      alt={speaker.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#051020]/90 px-3 py-1 font-mono text-[10px] font-bold text-[#80D8FF]">
                    <Tag className="h-3 w-3" />
                    <span>{speaker.topicCategory || "General"}</span>
                  </span>
                </div>

                {/* Speaker Identity */}
                <h3 className="text-lg font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                  {speaker.name}
                </h3>

                <p className="mt-1 text-xs font-mono text-[#80D8FF] flex items-center gap-1.5 truncate">
                  <Building className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{speaker.roleAndCompany}</span>
                </p>

                {/* Talk Topic Preview */}
                <div className="mt-4 rounded-xl bg-[#020813]/60 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    KEYNOTE TALK
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-200 line-clamp-2">
                    {speaker.talkTitle || "Building Next-Gen AI & Modern Full-Stack Workflows in Production"}
                  </p>
                </div>
              </div>

              {/* Card Footer: Social Connections */}
              <div className="mt-6 flex items-center justify-between pt-4">
                <span className="font-mono text-[11px] text-slate-400">
                  {speaker.eventEdition || "Meetup Edition"}
                </span>

                <div className="flex items-center gap-2">
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${speaker.name} LinkedIn`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#051020] text-slate-300 hover:text-[#80D8FF] hover:bg-[#163B63] transition-all"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {speaker.github && (
                    <a
                      href={speaker.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${speaker.name} GitHub`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#051020] text-slate-300 hover:text-white hover:bg-[#163B63] transition-all"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
