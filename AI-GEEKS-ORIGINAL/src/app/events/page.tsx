import React from "react";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { SITE_CONFIG } from "@/data/communityData";

export default function EventsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] pt-14 pb-24 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/3 h-[420px] w-[760px] rounded-full bg-gradient-to-tr from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
          LUMA EVENT DIRECTORY · {SITE_CONFIG.name}
        </p>
        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Events &amp; <span className="ag-text-gradient">Meetups.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
          Explore upcoming and past {SITE_CONFIG.name} meetups, technical
          workshops, and 24-hour software hackathons across Chennai.
        </p>
      </div>

      <UpcomingEvents defaultShowFallback={false} showTabs={true} />
    </div>
  );
}
