"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  RefreshCw,
  ArrowUpRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, LUMA_EVENTS, LumaEventItem } from "@/data/communityData";

interface UpcomingEventsProps {
  showTabs?: boolean;
  defaultShowFallback?: boolean;
}

export default function UpcomingEvents({
  showTabs = false,
  defaultShowFallback = false,
}: UpcomingEventsProps) {
  const [events, setEvents] = useState<LumaEventItem[]>(LUMA_EVENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [showFallbackState, setShowFallbackState] = useState(defaultShowFallback);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const handleRetry = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.ok && Array.isArray(data.events)) {
        setEvents(data.events);
        setShowFallbackState(false);
      }
    } catch {
      setEvents(LUMA_EVENTS);
      setShowFallbackState(false);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter((evt) => evt.status === activeTab);

  // Helper to extract month and day cleanly
  const getEventDateParts = (evt: LumaEventItem) => {
    if (evt.month && evt.day) {
      return { month: evt.month, day: evt.day };
    }
    // Parse from date string "Sat, 19 Sept, 2026"
    const match = evt.date.match(/([A-Za-z]+),\s*(\d{1,2})\s*([A-Za-z]+)/);
    if (match) {
      return { month: match[3].slice(0, 4).toUpperCase(), day: match[2].padStart(2, "0") };
    }
    return { month: "EVENT", day: "•" };
  };

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#051020] py-20 px-6 text-slate-100"
    >
      {/* Specular Top Ambient Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/50 to-transparent"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[380px] w-[700px] rounded-full bg-gradient-to-bl from-[#2B6CB0]/20 via-[#163B63]/30 to-transparent blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header & Calendar Action (Matching Chennai React) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF] backdrop-blur-md mb-3">
              <Sparkles className="h-3 w-3 text-[#80D8FF]" />
              <span>COMMUNITY DIRECTORY · {SITE_CONFIG.name}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Community <span className="ag-text-gradient">events.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Meet the community, share ideas, and learn something new together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Calendar Action Button */}
            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#C4EEFF] shadow-[0_10px_25px_rgba(2,8,19,0.5)]"
            >
              <Calendar className="h-4 w-4 text-[#80D8FF]" />
              <span>View calendar</span>
              <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
            </a>
          </div>
        </div>

        {/* Tab Switcher (Matching Chennai React Navigation) */}
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex rounded-2xl bg-[#020813]/85 p-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("upcoming");
                setShowFallbackState(false);
              }}
              className={`rounded-xl px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                activeTab === "upcoming" && !showFallbackState
                  ? "ag-btn-primary shadow-[0_4px_16px_rgba(43,108,176,0.4)]"
                  : "text-slate-300 hover:text-[#C4EEFF]"
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("past");
                setShowFallbackState(false);
              }}
              className={`rounded-xl px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                activeTab === "past" && !showFallbackState
                  ? "ag-btn-primary shadow-[0_4px_16px_rgba(43,108,176,0.4)]"
                  : "text-slate-300 hover:text-[#C4EEFF]"
              }`}
            >
              Past events
            </button>
          </div>

          {/* Fallback Simulation Switch for Testing Resilience */}
          <button
            type="button"
            onClick={() => setShowFallbackState((prev) => !prev)}
            className="text-[11px] font-mono text-slate-400 hover:text-[#80D8FF] ml-auto transition-colors"
          >
            {showFallbackState ? "Show live feed" : "Simulate empty feed"}
          </button>
        </div>

        {/* Resilient Fallback State (1:1 Clone of Chennai React) */}
        {showFallbackState || (activeTab === "upcoming" && filteredEvents.length === 0) ? (
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-[#091B32]/70 p-10 sm:p-14 text-center backdrop-blur-md shadow-[0_16px_45px_rgba(2,8,19,0.6)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
            />

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4DA8DA]/30 via-[#163B63] to-[#051020] text-[#C4EEFF] shadow-[0_0_24px_rgba(128,216,255,0.25)]">
              <AlertCircle className="h-6 w-6 text-[#80D8FF]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Nothing on the calendar just yet.
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              Check back soon or explore our past meetups.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("past");
                  setShowFallbackState(false);
                }}
                className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-[0_8px_25px_rgba(43,108,176,0.35)]"
              >
                <span>Explore past events</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleRetry}
                disabled={isLoading}
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-4 w-4 text-[#80D8FF] ${isLoading ? "animate-spin" : ""}`}
                />
                <span>{isLoading ? "Syncing Feed..." : "Refresh Luma Feed"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Chennai React 1:1 Event Row List (Borderless Glass Muted Dark Sky) */
          <div className="flex flex-col gap-4">
            {filteredEvents.map((evt) => {
              const { month, day } = getEventDateParts(evt);
              return (
                <a
                  key={evt.id}
                  href={evt.lumaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 rounded-2xl bg-[#091B32]/75 hover:bg-[#0F2744]/95 p-5 sm:p-6 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 shadow-[0_8px_25px_rgba(2,8,19,0.45)] hover:shadow-[0_16px_40px_rgba(43,108,176,0.25)]"
                >
                  {/* Specular Top Rim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Left Event Art (Exact Chennai React Square Badge) */}
                  <div className="relative flex h-[76px] w-[76px] sm:h-[84px] sm:w-[84px] shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#163B63] to-[#091B32] p-2 text-center shadow-[inset_0_1px_0_0_rgba(196,238,255,0.25),0_6px_18px_rgba(2,8,19,0.5)] transition-transform duration-200 group-hover:scale-105">
                    {/* Top Right Corner Arrow */}
                    <span
                      aria-hidden="true"
                      className="absolute top-2 right-2 text-slate-400 group-hover:text-[#80D8FF] transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>

                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#80D8FF]">
                      {month}
                    </span>
                    <strong className="text-2xl sm:text-3xl font-extrabold text-white leading-none mt-0.5">
                      {day}
                    </strong>
                  </div>

                  {/* Right Event Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-medium text-[#80D8FF]">
                        {evt.date} · {evt.time}
                      </span>
                      {evt.track && (
                        <span className="inline-flex items-center rounded-full bg-[#16202C] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#C4EEFF]">
                          {evt.track}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C4EEFF] transition-colors leading-snug">
                      {evt.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-[#80D8FF] shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>

                  {/* Direct Arrow Action */}
                  <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-xl bg-[#020813]/60 text-slate-300 group-hover:text-white group-hover:bg-[#2B6CB0] transition-all shrink-0">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
