import React from "react";
import { Calendar, Trophy, Sparkles, Award, Layers } from "lucide-react";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import HackathonLeaderboard from "@/components/events/HackathonLeaderboard";
import HackathonControlCenter from "@/components/hackathon/HackathonControlCenter";
import { DevFestBadgeStudio } from "@/components/DevFestBadgeStudio";
import DevFestAgenda from "@/components/events/DevFestAgenda";
import DevFestPillars from "@/components/events/DevFestPillars";
import { SITE_CONFIG } from "@/data/communityData";

export default function EventsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] pt-16 pb-24 text-slate-100">
      {/* Specular Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gradient-to-tr from-[#163B63]/50 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md">
            <Calendar className="h-3.5 w-3.5 text-[#80D8FF]" />
            <span>
              EVENT DIRECTORY &amp; DEVFEST ARENA · {SITE_CONFIG.name}
            </span>
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Events &amp; <span className="ag-text-gradient">Hackathons.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300 leading-relaxed">
            Explore upcoming and past {SITE_CONFIG.name} meetups, hands-on
            builder labs, customized DevFest badges, official DevFest schedules, and live 24-hour pure-software hackathon standings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          <a
            href="#agenda"
            className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold"
          >
            <Layers className="h-4 w-4 text-[#80D8FF]" />
            <span>DevFest Schedule</span>
          </a>
          <a
            href="#badge-studio"
            className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold"
          >
            <Award className="h-4 w-4 text-[#80D8FF]" />
            <span>Badge Studio</span>
          </a>
          <a
            href="#hackathon-leaderboard"
            className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(43,108,176,0.35)]"
          >
            <Trophy className="h-4 w-4 text-white" />
            <span>Leaderboard &darr;</span>
          </a>
        </div>
      </div>

      {/* Chennai React 1:1 Upcoming & Past Events */}
      <UpcomingEvents defaultShowFallback={false} showTabs={true} />

      {/* DevFest Chennai Feature Pillars */}
      <DevFestPillars />

      {/* DevFest 8-Track Interactive Schedule & Agenda */}
      <DevFestAgenda />

      {/* DevFest Badge Studio */}
      <section id="badge-studio" className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF] backdrop-blur-md mb-3">
            <Sparkles className="h-3 w-3 text-[#80D8FF]" />
            <span>DEVFEST 2026 SPECIAL FEATURE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            DevFest <span className="ag-text-gradient">Badge Studio.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Generate and personalize your official AI GEEKS &amp; DevFest community badge for social sharing and in-person verification.
          </p>
        </div>

        <DevFestBadgeStudio />
      </section>

      {/* Pure-Software Hackathon Leaderboard & Arena */}
      <div id="hackathon-leaderboard">
        <HackathonLeaderboard />
      </div>

      <HackathonControlCenter />
    </div>
  );
}
