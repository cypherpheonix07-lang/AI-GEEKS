"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Bookmark,
  Users,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  DEVFEST_AGENDA,
  DEVFEST_TRACKS,
  DEVFEST_SPEAKERS,
  DevFestSession,
} from "@/data/devfestData";

export default function DevFestAgendaPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedHall, setSelectedHall] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Collect unique halls
  const halls = useMemo(() => {
    const set = new Set<string>();
    DEVFEST_AGENDA.forEach((s) => {
      if (s.hall) set.add(s.hall);
    });
    return Array.from(set);
  }, []);

  // Filter sessions
  const filteredSessions = useMemo(() => {
    return DEVFEST_AGENDA.filter((session) => {
      const matchesTrack =
        selectedTrack === "all" ||
        (session.track &&
          session.track.toLowerCase().includes(selectedTrack.toLowerCase()));
      const matchesHall =
        selectedHall === "all" || session.hall === selectedHall;
      const matchesSearch =
        searchQuery === "" ||
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.speakerSlugs.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesTrack && matchesHall && matchesSearch;
    });
  }, [selectedTrack, selectedHall, searchQuery]);

  // Group by start time
  const groupedSessions = useMemo(() => {
    const groups: { [time: string]: DevFestSession[] } = {};
    filteredSessions.forEach((s) => {
      const timeStr = s.start
        ? new Date(s.start).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "All Day";
      if (!groups[timeStr]) groups[timeStr] = [];
      groups[timeStr].push(s);
    });
    return groups;
  }, [filteredSessions]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getSpeakerDetails = (slug: string) => {
    return DEVFEST_SPEAKERS.find((s) => s.slug === slug);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Calendar className="h-3.5 w-3.5" />
          <span>FULL CONFERENCE TIMETABLE · OCTOBER 17, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          DevFest Chennai Agenda
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          68 sessions across 8 tracks and 6 halls. Filter by technical track, auditorium, or search by keyword.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl bg-[#051020]/85 p-5 backdrop-blur-xl shadow-[0_12px_35px_rgba(2,8,19,0.7)] mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search session title, topic, or speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ag-input-metallic w-full pl-10 pr-4 py-2 text-xs rounded-xl"
            />
          </div>

          {/* Hall Filter */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">Hall:</span>
            <select
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
              className="ag-input-metallic rounded-xl px-3 py-2 text-xs"
            >
              <option value="all">All Halls</option>
              {halls.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Track Pills */}
        <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t-0">
          <button
            type="button"
            onClick={() => setSelectedTrack("all")}
            className={`rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all ${
              selectedTrack === "all"
                ? "bg-[#2B6CB0] text-white shadow-[0_0_15px_rgba(128,216,255,0.4)]"
                : "bg-[#091B32]/80 text-slate-300 hover:text-white"
            }`}
          >
            All Tracks ({DEVFEST_AGENDA.length})
          </button>
          {DEVFEST_TRACKS.map((t) => {
            const count = DEVFEST_AGENDA.filter(
              (s) => s.track && s.track.toLowerCase().includes(t.slug.toLowerCase())
            ).length;
            return (
              <button
                key={t.slug}
                type="button"
                onClick={() => setSelectedTrack(t.slug)}
                className={`rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                  selectedTrack === t.slug
                    ? "bg-[#2B6CB0] text-[#C4EEFF] shadow-[0_0_15px_rgba(128,216,255,0.4)]"
                    : "bg-[#091B32]/70 text-slate-300 hover:text-white"
                }`}
              >
                <span>{t.name}</span>
                {count > 0 && (
                  <span className="ml-1.5 text-[10px] opacity-75">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-xs text-slate-400">
          SHOWING {filteredSessions.length} SESSIONS
        </span>
        {bookmarkedIds.length > 0 && (
          <span className="font-mono text-xs text-[#80D8FF]">
            ⭐ {bookmarkedIds.length} BOOKMARKED
          </span>
        )}
      </div>

      {/* Grouped Timetable */}
      {Object.keys(groupedSessions).length === 0 ? (
        <div className="rounded-2xl bg-[#051020]/70 p-12 text-center text-slate-400">
          <p className="text-sm">No sessions match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedTrack("all");
              setSelectedHall("all");
              setSearchQuery("");
            }}
            className="mt-4 font-mono text-xs text-[#80D8FF] hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedSessions).map(([time, sessions]) => (
            <div key={time} className="relative">
              {/* Sticky Time Header */}
              <div className="sticky top-20 z-20 mb-4 inline-flex items-center gap-2 rounded-xl bg-[#091B32]/95 px-4 py-1.5 backdrop-blur-md shadow-[0_4px_20px_rgba(2,8,19,0.8)]">
                <Clock className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span className="font-mono text-xs font-bold text-white">
                  {time}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  ({sessions.length} {sessions.length === 1 ? "slot" : "slots"})
                </span>
              </div>

              {/* Grid of Sessions in this Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessions.map((s) => {
                  const isBookmarked = bookmarkedIds.includes(s.id);
                  const isBreak = s.type === "break";
                  return (
                    <div
                      key={s.id}
                      className={`group rounded-2xl p-5 backdrop-blur-md transition-all flex flex-col justify-between ${
                        isBreak
                          ? "bg-[#091B32]/40 text-slate-300"
                          : "bg-[#051020]/80 shadow-[0_8px_25px_rgba(2,8,19,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(43,108,176,0.3)]"
                      }`}
                    >
                      <div>
                        {/* Top Metadata */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#091B32] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#80D8FF]">
                            <MapPin className="h-3 w-3" />
                            <span>{s.hall || "Main Stage"}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleBookmark(s.id)}
                            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark session"}
                            className="text-slate-500 hover:text-amber-300 transition-colors"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                isBookmarked ? "text-amber-400 fill-amber-400" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-white group-hover:text-[#80D8FF] transition-colors leading-snug">
                          {s.title}
                        </h3>

                        {/* Description */}
                        {s.description && (
                          <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                            {s.description}
                          </p>
                        )}
                      </div>

                      {/* Speakers & Footer */}
                      <div className="mt-5 pt-3 border-t-0">
                        {s.speakerSlugs && s.speakerSlugs.length > 0 ? (
                          <div className="space-y-2">
                            {s.speakerSlugs.map((slug) => {
                              const spk = getSpeakerDetails(slug);
                              return (
                                <Link
                                  key={slug}
                                  href={`/devfest/speakers#${slug}`}
                                  className="flex items-center gap-2.5 group/spk hover:text-white"
                                >
                                  <div className="h-7 w-7 rounded-full overflow-hidden bg-[#091B32] shrink-0">
                                    <img
                                      src={spk?.photo || "/images/team/neutral-placeholder-01.svg"}
                                      alt={spk?.name || slug}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src =
                                          "/images/team/neutral-placeholder-01.svg";
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col truncate">
                                    <span className="text-xs font-semibold text-white group-hover/spk:text-[#80D8FF] truncate">
                                      {spk?.name || slug}
                                    </span>
                                    {spk?.company && (
                                      <span className="text-[10px] text-slate-400 truncate">
                                        {spk.company}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                            {s.type.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
