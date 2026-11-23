"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
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
  defaultShowFallback = true,
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

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#051020] py-24 px-6 text-slate-100 border-t border-[#4DA8DA]/25"
    >
      {/* Top Specular Frosted Sky Divider Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/60 to-transparent"
      />

      {/* Ambient Sky Metallic Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[380px] w-[700px] rounded-full bg-gradient-to-bl from-[#2B6CB0]/25 via-[#163B63]/35 to-transparent blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              LIVE MEETUPS &amp; 24-HOUR HACKATHONS
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Upcoming <span className="ag-text-gradient">events.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {showTabs && (
              <div className="inline-flex rounded-2xl border border-[#80D8FF]/30 bg-[#020813]/85 p-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("upcoming");
                    setShowFallbackState(false);
                  }}
                  className={`rounded-xl px-4 py-1.5 font-mono text-xs uppercase transition-all ${
                    activeTab === "upcoming" && !showFallbackState
                      ? "ag-btn-primary"
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
                  className={`rounded-xl px-4 py-1.5 font-mono text-xs uppercase transition-all ${
                    activeTab === "past" && !showFallbackState
                      ? "ag-btn-primary"
                      : "text-slate-300 hover:text-[#C4EEFF]"
                  }`}
                >
                  Past Meetups
                </button>
              </div>
            )}

            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#C4EEFF]"
            >
              <span>Open Luma Calendar</span>
              <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
            </a>
          </div>
        </div>

        {/* Resilient Luma Fallback State (1:1 Clone in Sky Metallic Glass) */}
        {showFallbackState ? (
          <div className="glass-panel relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-10 md:p-14 text-center">
            {/* Specular Top Rim Highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-85"
            />

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C4EEFF]/45 bg-gradient-to-br from-[#4DA8DA]/35 via-[#163B63] to-[#051020] text-[#C4EEFF] shadow-[0_0_24px_rgba(128,216,255,0.3)]">
              <AlertCircle className="h-6 w-6 text-[#80D8FF]" />
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-white">
              We couldn't load events right now.
            </h3>
            <p className="mt-2.5 text-sm md:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              Click “Try again” to sync live meetups and hackathons
              from our Luma feed, or view our calendar directly on Luma.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleRetry}
                disabled={isLoading}
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 text-[#80D8FF] ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Syncing Feed..." : "Try again"}</span>
              </button>

              <a
                href={SITE_CONFIG.lumaCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
              >
                <span>View on Luma</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : (
          /* Loaded Metallic Sky Glass Event Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                className="glass-panel group relative overflow-hidden rounded-3xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
                />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider">
                      <Sparkles className="h-3 w-3 text-[#80D8FF]" />
                      <span>{evt.track}</span>
                    </span>
                    <span className="rounded-lg bg-[#16202C] border border-[#80D8FF]/35 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase text-[#C4EEFF]">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl md:text-2xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                    {evt.title}
                  </h3>

                  <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#80D8FF]/20 bg-[#020813]/75 p-4 text-sm text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-[#80D8FF] shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-[#4DA8DA] shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[#C4EEFF] shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-[#4DA8DA]/25 flex items-center justify-between">
                  <a
                    href={evt.lumaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm"
                  >
                    <span>View on Luma</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowFallbackState(true)}
                    className="font-mono text-xs text-slate-400 hover:text-[#C4EEFF] transition-colors"
                  >
                    Reset feed
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
