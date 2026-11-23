import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Calendar, 
  Globe, 
  Cpu 
} from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS, COMMUNITY_STATS } from "@/data/communityData";

export const metadata = {
  title: `Community Matrix & Socials — ${SITE_CONFIG.name}`,
  description: `Official links, Discord channels, WhatsApp groups, event passes, and GitHub repositories for ${SITE_CONFIG.name}.`,
};

export default function SocialsPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Brand Profile Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl glass-panel p-2 flex items-center justify-center border border-[var(--ag-cyan)]/40 relative">
            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[var(--ag-midnight)] to-[var(--ag-cobalt)] flex items-center justify-center">
              <Cpu className="w-12 h-12 text-[var(--ag-cyan)] animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--ag-cobalt)] text-white border border-[var(--ag-cyan)]">
              AI GEEKS
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
            {SITE_CONFIG.tagline}
          </p>

          <div className="flex justify-center gap-6 text-xs font-mono text-slate-400">
            {COMMUNITY_STATS.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="font-bold text-[var(--ag-cyan)]">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Action: RSVP / Next Event */}
        <div className="glass-panel p-5 rounded-2xl mb-8 border border-[var(--ag-cyan)]/30 hover:border-[var(--ag-cyan)] transition-all">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--ag-cobalt)]/30 border border-[var(--ag-azure)]/50 flex items-center justify-center text-[var(--ag-cyan)]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--ag-cyan)] block">
                  FEATURED EVENT
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  AI Geeks Community Summit &amp; Meetup
                </h3>
              </div>
            </div>
            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noreferrer"
              className="ag-btn-primary px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5"
            >
              RSVP on Luma
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Social Links List */}
        <div className="space-y-3 mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 px-1 mb-2">
            Official Channels &amp; Ecosystem
          </h2>

          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="glass-panel p-4 rounded-xl flex items-center justify-between hover:scale-[1.01] hover:border-[var(--ag-cyan)]/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--ag-void)] border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-[var(--ag-cyan)] group-hover:border-[var(--ag-cyan)]/40 transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[var(--ag-cyan)] transition-colors">
                    {link.label}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Connect on {link.label}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--ag-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </div>

        {/* Secondary Links & Navigation */}
        <div className="glass-panel p-6 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-white mb-2">Explore the AI GEEKS Platform</h3>
          <p className="text-xs text-slate-400 mb-4">
            Access past talks, speaker slides, code of conduct, and sponsorship packages.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <Link href="/" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Home
            </Link>
            <Link href="/about" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              About
            </Link>
            <Link href="/events" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Events
            </Link>
            <Link href="/past-speakers" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Speakers
            </Link>
            <Link href="/team" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Team
            </Link>
            <Link href="/sponsor" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Sponsor
            </Link>
            <Link href="/code-of-conduct" className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
