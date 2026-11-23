"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/communityData";

export interface AgendaSession {
  id: string;
  time: string;
  title: string;
  speaker: string;
  speakerRole: string;
  track:
    | "Tech"
    | "Deep Tech"
    | "Agent Wars"
    | "Workshop"
    | "Lightning Talks"
    | "Creators Lounge"
    | "Meetup Lounge";
  venue: string;
  duration: string;
  description: string;
}

const DEVFEST_TRACKS = [
  "All Tracks",
  "Tech",
  "Deep Tech",
  "Agent Wars",
  "Workshop",
  "Lightning Talks",
  "Creators Lounge",
  "Meetup Lounge",
] as const;

export const AGENDA_SESSIONS: AgendaSession[] = [
  {
    id: "session-01",
    time: "08:30 AM – 09:30 AM",
    title: "Check-in, Morning Filter Coffee & Builder Networking",
    speaker: "Community Welcome Team",
    speakerRole: "AI GEEKS & GDG Chennai Crew",
    track: "Meetup Lounge",
    venue: "Main Atrium & Lounge",
    duration: "60 mins",
    description:
      "Arrive early, collect your personalized 2x Retina badge, grab traditional South Indian filter coffee, and connect with fellow builders.",
  },
  {
    id: "session-02",
    time: "09:30 AM – 10:30 AM",
    title: "Keynote: The Age of Autonomous Coding Agents & Native Front-End Systems",
    speaker: "Siddharth Ramesh & Lead Researchers",
    speakerRole: "Principal AI Systems Architect",
    track: "Tech",
    venue: "D7 Main Auditorium",
    duration: "60 mins",
    description:
      "Exploring deterministic multi-agent orchestration, streaming generative UI in Next.js 16, and the shift from static assistants to autonomous software swarms.",
  },
  {
    id: "session-03",
    time: "10:45 AM – 11:45 AM",
    title: "Deep Tech: Scaling Agentic Workflows & Model Context Protocol (MCP) in Production",
    speaker: "Kavya Sundaram",
    speakerRole: "Infrastructure Lead, Distributed Systems",
    track: "Deep Tech",
    venue: "Hall 1 · Deep Tech Arena",
    duration: "60 mins",
    description:
      "A deep technical dive into building resilient MCP servers, managing tool permissions, low-latency token streaming, and cross-model evaluations.",
  },
  {
    id: "session-04",
    time: "11:45 AM – 12:45 PM",
    title: "Agent Wars: Live 60-Minute Autonomous Coding Showdown",
    speaker: "Top 8 Chennai Hackathon Finalists",
    speakerRole: "Contestant Teams",
    track: "Agent Wars",
    venue: "Arena Alpha Stage",
    duration: "60 mins",
    description:
      "Live developer face-off where teams pit autonomous agent scripts against real-world production bug queues and algorithmic challenge sets with live spectator voting.",
  },
  {
    id: "session-05",
    time: "12:45 PM – 01:45 PM",
    title: "Community Lunch, Sponsor Demos & Tech Exhibition",
    speaker: "Talentship, ImageKit & Ecosystem Partners",
    speakerRole: "Sponsor & Partner Pavilions",
    track: "Meetup Lounge",
    venue: "Dining Concourse & Innovation Alley",
    duration: "60 mins",
    description:
      "Networking lunch, recruiting meetups with hiring engineering teams, and hands-on demos from local startups and sponsors.",
  },
  {
    id: "session-06",
    time: "01:45 PM – 03:00 PM",
    title: "Workshop: Building Local-First SLMs with Ollama, WebGPU & React 19",
    speaker: "Vikram Nathan",
    speakerRole: "Senior ML Engineer & Open Source Core",
    track: "Workshop",
    venue: "Lab 3 · Hands-On Workspace",
    duration: "75 mins",
    description:
      "Bring your laptops. Code a local-first voice & text reasoning app running 100% in-browser on client hardware with zero cloud API keys.",
  },
  {
    id: "session-07",
    time: "03:15 PM – 04:15 PM",
    title: "Creators Lounge: Designing High-Performance Metallic Glass Web Experiences",
    speaker: "Ananya Krishnan & UI Architects",
    speakerRole: "Staff Front-End Engineer",
    track: "Creators Lounge",
    venue: "Design & UX Studio",
    duration: "60 mins",
    description:
      "Mastering dark & light metallic sky gradients, eliminating 1px border lines with specular lighting, and building 60 FPS Framer Motion spring physics.",
  },
  {
    id: "session-08",
    time: "04:30 PM – 05:15 PM",
    title: "Rapid Fire Lightning Talks: 5-Minute Open Source Innovations",
    speaker: "Selected Community Builders",
    speakerRole: "Lightning Stage Speakers",
    track: "Lightning Talks",
    venue: "D7 Main Auditorium",
    duration: "45 mins",
    description:
      "8 fast-paced 5-minute lightning talks from indie developers, college student builders, and open source package authors.",
  },
  {
    id: "session-09",
    time: "05:15 PM – 06:00 PM",
    title: "DevFest Chennai Finale & Pure-Software Hackathon Awards Ceremony",
    speaker: "AI GEEKS & Community Jury",
    speakerRole: "Judging Panel & Organizers",
    track: "Tech",
    venue: "D7 Main Auditorium",
    duration: "45 mins",
    description:
      "Announcement of the 24-Hour Pure-Software Hackathon winners, prize distributions, community recognitions, and closing group photo.",
  },
];

export default function DevFestAgenda() {
  const [selectedTrack, setSelectedTrack] = useState<string>("All Tracks");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(["session-02", "session-04"]));

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredSessions =
    selectedTrack === "All Tracks"
      ? AGENDA_SESSIONS
      : AGENDA_SESSIONS.filter((s) => s.track === selectedTrack);

  return (
    <section id="agenda" className="relative py-16 px-6 max-w-6xl mx-auto text-slate-100">
      {/* Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[320px] w-[600px] rounded-full bg-gradient-to-b from-[#2B6CB0]/20 via-[#163B63]/25 to-transparent blur-[120px]"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF] backdrop-blur-md mb-3">
              <Layers className="h-3 w-3 text-[#80D8FF]" />
              <span>DEVFEST 2026 OFFICIAL AGENDA · GDG CHENNAI &amp; {SITE_CONFIG.name}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Schedule &amp; <span className="ag-text-gradient">Tracks.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore keynotes, hands-on workshops, live Agent Wars, and technical deep-dives across 8 specialized tracks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-400">
              {filteredSessions.length} {filteredSessions.length === 1 ? "Session" : "Sessions"}
            </span>
            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#C4EEFF]"
            >
              <Calendar className="h-4 w-4 text-[#80D8FF]" />
              <span>Add to Calendar</span>
              <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
            </a>
          </div>
        </div>

        {/* 8 Track Horizontal Pill Filter */}
        <div className="relative mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {DEVFEST_TRACKS.map((track) => {
              const isActive = selectedTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "ag-btn-primary shadow-[0_4px_16px_rgba(43,108,176,0.4)]"
                      : "bg-[#091B32]/70 text-slate-300 hover:text-white hover:bg-[#163B63]/60 backdrop-blur-md"
                  }`}
                >
                  {track}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule List (Borderless Metallic Glass Blue) */}
        <div className="flex flex-col gap-4">
          {filteredSessions.map((session) => {
            const isBookmarked = bookmarkedIds.has(session.id);
            return (
              <article
                key={session.id}
                className="group relative overflow-hidden rounded-2xl bg-[#091B32]/75 hover:bg-[#0F2744]/95 p-6 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_25px_rgba(2,8,19,0.45)] hover:shadow-[0_16px_40px_rgba(43,108,176,0.25)]"
              >
                {/* Specular Top Rim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Time & Venue Column */}
                  <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shrink-0 md:w-56">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#80D8FF]">
                      <Clock className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>{session.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-[#4DA8DA]" />
                      <span>{session.venue}</span>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-[#16202C] px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#C4EEFF]">
                        {session.track}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {session.duration}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C4EEFF] transition-colors leading-snug">
                      {session.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {session.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#80D8FF]">
                      <span className="text-white font-semibold">{session.speaker}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-300">{session.speakerRole}</span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <div className="flex items-center self-end md:self-start shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(session.id)}
                      title={isBookmarked ? "Remove from my schedule" : "Bookmark session"}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        isBookmarked
                          ? "bg-[#2B6CB0] text-white shadow-[0_4px_14px_rgba(43,108,176,0.5)]"
                          : "bg-[#020813]/60 text-slate-400 hover:text-[#C4EEFF] hover:bg-[#163B63]/60"
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
