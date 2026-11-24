"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Search, ExternalLink, Calendar, X, Sparkles } from "lucide-react";
import { DEVFEST_SPEAKERS, DEVFEST_AGENDA, DevFestSpeaker } from "@/data/devfestData";

export default function DevFestSpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<DevFestSpeaker | null>(null);

  const filteredSpeakers = useMemo(() => {
    return DEVFEST_SPEAKERS.filter((s) => {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q) ||
        s.bio.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const getSpeakerSessions = (slug: string) => {
    return DEVFEST_AGENDA.filter((session) =>
      session.speakerSlugs && session.speakerSlugs.includes(slug)
    );
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Users className="h-3.5 w-3.5" />
          <span>KEYNOTE DIRECTORY · 29 SPEAKERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          DevFest Chennai Speakers
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Meet the engineers, founders, open-source maintainers, and developer advocates taking the stage on October 17, 2026.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by speaker name, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ag-input-metallic w-full pl-10 pr-4 py-2.5 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSpeakers.map((s) => {
          const sessions = getSpeakerSessions(s.slug);
          return (
            <div
              key={s.slug}
              id={s.slug}
              onClick={() => setSelectedSpeaker(s)}
              className="group cursor-pointer rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md shadow-[0_8px_25px_rgba(2,8,19,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(43,108,176,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#091B32]">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/images/team/neutral-placeholder-01.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-2 right-2 rounded-md bg-[#020813]/80 px-2 py-0.5 font-mono text-[9px] text-[#80D8FF] backdrop-blur-sm">
                    {sessions.length} {sessions.length === 1 ? "TALK" : "TALKS"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#80D8FF] transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-[#80D8FF] font-medium mt-0.5">
                  {s.title}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {s.company}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-0 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>View Profile & Bio</span>
                <span className="text-[#80D8FF] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Speaker Bio Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#051020] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedSpeaker(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#091B32] text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl overflow-hidden bg-[#091B32] shrink-0">
                <img
                  src={selectedSpeaker.photo}
                  alt={selectedSpeaker.name}
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/team/neutral-placeholder-01.svg";
                  }}
                />
              </div>

              <div className="flex-1">
                <span className="font-mono text-[10px] text-[#80D8FF] uppercase tracking-wider font-bold">
                  KEYNOTE SPEAKER
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {selectedSpeaker.name}
                </h2>
                <p className="text-sm text-[#80D8FF] font-medium">
                  {selectedSpeaker.title} · {selectedSpeaker.company}
                </p>

                {/* Social links */}
                <div className="mt-3 flex items-center gap-3">
                  {selectedSpeaker.links.linkedin && (
                    <a
                      href={selectedSpeaker.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-slate-400 hover:text-[#80D8FF] transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {selectedSpeaker.links.twitter && (
                    <a
                      href={selectedSpeaker.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-slate-400 hover:text-[#80D8FF] transition-colors"
                    >
                      Twitter / X
                    </a>
                  )}
                  {selectedSpeaker.links.github && (
                    <a
                      href={selectedSpeaker.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-slate-400 hover:text-[#80D8FF] transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                About the Speaker
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedSpeaker.bio}
              </p>
            </div>

            {/* Sessions this speaker is leading */}
            {getSpeakerSessions(selectedSpeaker.slug).length > 0 && (
              <div className="mt-6 pt-4 border-t-0">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Sessions & Keynotes
                </h4>
                <div className="space-y-3">
                  {getSpeakerSessions(selectedSpeaker.slug).map((session) => (
                    <div
                      key={session.id}
                      className="rounded-xl bg-[#091B32]/70 p-4"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-[#80D8FF]">
                          {session.hall}
                        </span>
                        {session.start && (
                          <span className="font-mono text-[10px] text-slate-400">
                            {new Date(session.start).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-bold text-white">
                        {session.title}
                      </h5>
                      <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                        {session.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
