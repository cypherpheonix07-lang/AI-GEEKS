import React from "react";
import {
  Compass,
  Code2,
  Trophy,
  Mic2,
  Users2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const DEVFEST_PILLARS = [
  {
    icon: Compass,
    title: "Roadshows",
    description:
      "Catch a DevFest Roadshow near you. A month long celebration hosted across the city.",
    gradient: "from-[#2B6CB0]/30 to-[#163B63]/10",
  },
  {
    icon: Code2,
    title: "Build sessions",
    description:
      "Come, vibe, build, share your projects with an amazing audience.",
    gradient: "from-[#4DA8DA]/30 to-[#163B63]/10",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Bring your A game to our favorite competitions ranging from pitchathons to CTFs and 24-hour hackathons.",
    gradient: "from-[#80D8FF]/30 to-[#163B63]/10",
  },
  {
    icon: Mic2,
    title: "Talks",
    description:
      "Hear from some of the best minds out there as they talk about real stories, production systems, and research.",
    gradient: "from-[#2B6CB0]/30 to-[#163B63]/10",
  },
  {
    icon: Users2,
    title: "Networking",
    description:
      "Not your average social media connections. Real networking, projects, careers, and collaborative teams.",
    gradient: "from-[#4DA8DA]/30 to-[#163B63]/10",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description:
      "Join us as we celebrate the Chennai tech ecosystem while you find your builder tribe right here.",
    gradient: "from-[#80D8FF]/30 to-[#163B63]/10",
  },
];

export default function DevFestPillars() {
  return (
    <section className="relative py-16 px-6 max-w-6xl mx-auto text-slate-100">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF] backdrop-blur-md mb-3">
          <Sparkles className="h-3 w-3 text-[#80D8FF]" />
          <span>DEVFEST PILLARS &amp; COMMUNITY EXPERIENCE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          About <span className="ag-text-gradient">DevFest.</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Get ready to join the biggest tech festival in Tamil Nadu, hosted in partnership with GDG Chennai &amp; AI GEEKS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEVFEST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-3xl bg-[#091B32]/70 hover:bg-[#0F2744]/90 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(2,8,19,0.5)] hover:shadow-[0_16px_40px_rgba(43,108,176,0.25)] flex flex-col justify-between"
            >
              {/* Specular Top Rim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.gradient} text-[#80D8FF] mb-6 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]`}
                >
                  <Icon className="h-6 w-6 text-[#80D8FF]" />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#C4EEFF] transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 flex items-center gap-1 font-mono text-xs font-semibold text-[#80D8FF] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore details</span>
                <span>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
