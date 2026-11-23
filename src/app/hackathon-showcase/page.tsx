import type { Metadata } from "next";
import HackathonLeaderboard from "@/components/events/HackathonLeaderboard";
import { SITE_CONFIG } from "@/data/communityData";

export const metadata: Metadata = {
  title: `24-Hour Pure-Software Hackathon Showcase | ${SITE_CONFIG.name}`,
  description:
    "Live Leaderboard, Project Submissions, and Real-Time Podiums for the AI GEEKS Pure-Software Hackathon.",
};

export default function HackathonShowcasePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-gradient-to-tr from-[#163B63]/50 via-[#4DA8DA]/20 to-transparent blur-[140px]"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <HackathonLeaderboard />
      </div>
    </div>
  );
}
