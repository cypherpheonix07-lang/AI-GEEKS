import React from "react";
import Link from "next/link";
import {
  Cpu,
  Code2,
  Users,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Layers,
  HelpCircle,
} from "lucide-react";
import { SITE_CONFIG, COMMUNITY_STATS } from "@/data/communityData";

const PILLARS = [
  {
    icon: Cpu,
    badge: "PILLAR 01",
    title: "Applied AI & Multi-Agent Engineering",
    description:
      "Deep-dive architectural sessions covering deterministic LLM agent workflows, RAG evaluation pipelines, vector indexing, and production TypeScript SDKs.",
  },
  {
    icon: Code2,
    badge: "PILLAR 02",
    title: "24-Hour Pure-Software Hackathons",
    description:
      "High-velocity software build sprints where developers team up to ship working prototypes, open-source developer tools, and full-stack web apps.",
  },
  {
    icon: Users,
    badge: "PILLAR 03",
    title: "Peer Mentorship & Open Stage",
    description:
      "An inclusive builder collective connecting student innovators, first-time lightning talk speakers, and principal engineers across Chennai.",
  },
];

const FAQS = [
  {
    question: "Are AI GEEKS meetups free to attend?",
    answer:
      "Yes. Every monthly meetup, hands-on workshop, and community mixer is 100% free and community-driven. Simply RSVP via our Luma calendar to secure your venue pass.",
  },
  {
    question: "What tracks do your hackathons focus on?",
    answer:
      "We focus strictly on pure-software engineering tracks—autonomous LLM agents, developer tooling, React/Next.js web applications, and cognitive engineering workflows.",
  },
  {
    question: "How can I give a talk or mentor at an upcoming event?",
    answer:
      "Head over to our Sponsors & Speakers page and complete the Detailed Speaker Application Form (CFP). Our core team reviews submissions within 48 hours and offers 1-on-1 slide coaching for first-time speakers.",
  },
  {
    question: "Where are in-person meetups hosted?",
    answer:
      "We rotate across top enterprise auditoriums and research hubs in Chennai, including IIT Madras Research Park, TIDEL Park, Thoughtworks Olympus, and WSO2.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-20 px-6 text-slate-100">
      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[440px] w-[860px] rounded-full bg-gradient-to-tr from-[#163B63]/55 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Hero Header */}
        <div className="max-w-3xl">
          <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
            <span className="font-mono text-xs uppercase tracking-widest">
              ABOUT {SITE_CONFIG.name} · BUILDER COLLECTIVE
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Built by developers, for the{" "}
            <span className="ag-text-gradient">AI generation.</span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-slate-300 leading-relaxed">
            {SITE_CONFIG.description} Born out of a shared passion for shipping
            real code, we bring together frontend architects, AI engineers, and
            open-source contributors across Chennai.
          </p>
        </div>

        {/* Specular Stat Counter Row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {COMMUNITY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel relative overflow-hidden rounded-3xl p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-85"
              />
              <p className="text-4xl md:text-5xl font-extrabold ag-text-gradient">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#80D8FF]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Core Community Pillars */}
        <div className="mt-20">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              WHAT DRIVES US
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">
              Three pillars of <span className="ag-text-gradient">{SITE_CONFIG.name}.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C4EEFF]/40 bg-gradient-to-br from-[#4DA8DA]/40 via-[#163B63] to-[#051020] text-[#C4EEFF] shadow-[0_0_20px_rgba(128,216,255,0.25)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#80D8FF]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ & Onboarding Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1">
              <Layers className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                COMMUNITY FAQ
              </span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
              Everything you need to know before your first meetup.
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
              New to the community? Here are common questions from first-time
              attendees, speakers, and sponsors.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.lumaCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm"
              >
                <span>Join on Luma</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/sponsor#speak"
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold"
              >
                <Terminal className="h-4 w-4 text-[#80D8FF]" />
                <span>Apply to Speak</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/60 to-transparent"
                />
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-[#80D8FF] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
