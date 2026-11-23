"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Copy,
  MessageCircle,
  Calendar,
  Code2,
  Globe,
  Users,
  Rocket,
  ShieldCheck,
  Compass,
  MapPin,
} from "lucide-react";
import {
  SITE_CONFIG,
  COMMUNITY_STATS,
} from "@/data/communityData";
import {
  ALL_UNIFIED_PLATFORMS,
  REGIONAL_HUB_PLATFORMS,
  UnifiedPlatformEntry,
  JoinChannelSubCategory,
} from "@/data/platformsData";

type JoinFilterCategory =
  | "All Channels"
  | "Chennai & Tamil Nadu Hubs"
  | "Real-Time Chat"
  | "Events & Video"
  | "Code & Social";

const JOIN_CATEGORIES: JoinFilterCategory[] = [
  "All Channels",
  "Chennai & Tamil Nadu Hubs",
  "Real-Time Chat",
  "Events & Video",
  "Code & Social",
];

export default function JoinCommunityPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<JoinFilterCategory>("All Channels");
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const visibleChannels = useMemo<UnifiedPlatformEntry[]>(() => {
    if (selectedCategory === "All Channels") {
      return ALL_UNIFIED_PLATFORMS;
    }
    if (selectedCategory === "Chennai & Tamil Nadu Hubs") {
      return REGIONAL_HUB_PLATFORMS;
    }
    return ALL_UNIFIED_PLATFORMS.filter(
      (p) => p.joinCategory === selectedCategory
    );
  }, [selectedCategory]);

  const handleCopyLink = async (label: string, href: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(href);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2200);
    }
  };

  const getChannelIcon = (channel: UnifiedPlatformEntry) => {
    if (channel.joinCategory === "Real-Time Chat") {
      return <MessageCircle className="h-5 w-5 shrink-0 text-[#80D8FF]" />;
    }
    if (channel.joinCategory === "Events & Video") {
      return <Calendar className="h-5 w-5 shrink-0 text-[#C4EEFF]" />;
    }
    return <Code2 className="h-5 w-5 shrink-0 text-[#80D8FF]" />;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[920px] rounded-full bg-gradient-to-tr from-[#163B63]/55 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        {/* ====================================================================
            1. HERO WELCOME HEADER FOR NEW JOINERS
           ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  WELCOME TO {SITE_CONFIG.name} · NEW JOINER DIRECTORY
                </span>
              </div>

              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.06]">
                Join the{" "}
                <span className="ag-text-gradient">AI GEEKS Community.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect with{" "}
                <strong className="text-[#C4EEFF]">
                  {COMMUNITY_STATS[0]?.value ?? "10k+"} AI builders, React
                  engineers, and community practitioners
                </strong>{" "}
                across our synchronized network of {ALL_UNIFIED_PLATFORMS.length} official
                platforms, regional Tamil Nadu hubs, real-time chat rooms, and event calendars.
              </p>
            </div>

            {/* Quick Start 3-Step Onboarding Card */}
            <div className="rounded-2xl bg-[#051020]/90 p-5 sm:p-6 lg:w-96 shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
                  3-STEP NEW JOINER CHECKLIST
                </p>
                <Link
                  href="/platforms"
                  className="font-mono text-[10px] text-[#C4EEFF] hover:underline flex items-center gap-0.5"
                >
                  <span>All Platforms</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#163B63] font-mono text-[10px] font-bold text-[#C4EEFF]">
                    1
                  </span>
                  <span>
                    Join <strong>WhatsApp</strong> &amp; <strong>Discord</strong>{" "}
                    for instant Chennai meetup alerts and voice labs.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#163B63] font-mono text-[10px] font-bold text-[#C4EEFF]">
                    2
                  </span>
                  <span>
                    Subscribe on <strong>Luma</strong> to RSVP for free monthly
                    in-person sessions and demo days.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#163B63] font-mono text-[10px] font-bold text-[#C4EEFF]">
                    3
                  </span>
                  <span>
                    Star our <strong>GitHub</strong> repos and introduce
                    yourself in the <strong>Forum &amp; Q&amp;A</strong>.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            2. CATEGORY FILTER BAR
           ==================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {JOIN_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
 isSelected ? "ag-btn-primary shadow-[0_0_15px_rgba(128,216,255,0.2)]" : "ag-btn-secondary"
 }`}
                >
                  {category}
                  {category === "Chennai & Tamil Nadu Hubs" && (
                    <span className="ml-2 rounded-full bg-[#163B63] px-2 py-0.5 text-[10px] text-[#C4EEFF]">
                      {REGIONAL_HUB_PLATFORMS.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#80D8FF]">
              Showing {visibleChannels.length} of {ALL_UNIFIED_PLATFORMS.length}{" "}
              Integrated Handles
            </span>
            <Link
              href="/platforms"
              className="ag-btn-secondary hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs text-[#C4EEFF]"
            >
              <Compass className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>Full Directory</span>
            </Link>
          </div>
        </div>

        {/* ====================================================================
            3. SYNCHRONIZED COMMUNITY HANDLE CARDS
           ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleChannels.map((channel, idx) => {
              const isCopied = copiedLabel === channel.name;
              return (
                <motion.article
                  key={channel.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`glass-panel group relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
 channel.recommendedForNewJoiners
 ? "shadow-[0_0_30px_rgba(128,216,255,0.2)]"
 : ""
 }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/85 to-transparent"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {channel.badge}
                      </span>

                      {channel.isRegionalHub && channel.regionLabel && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#163B63]/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#C4EEFF]">
                          <MapPin className="h-3 w-3 text-[#80D8FF]" />
                          <span>{channel.regionLabel}</span>
                        </span>
                      )}

                      {channel.recommendedForNewJoiners && (
                        <span className="rounded-full bg-[#163B63] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#C4EEFF]">
                          START HERE
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4DA8DA]/35 via-[#163B63] to-[#051020] text-[#C4EEFF]">
                        {getChannelIcon(channel)}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                          {channel.name}
                        </h2>
                        <p className="font-mono text-xs text-[#80D8FF] truncate">
                          {channel.handle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(channel.name, channel.url)}
                      className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#80D8FF]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-[#80D8FF]" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ag-btn-primary inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs"
                    >
                      <span>Join on {channel.name}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ====================================================================
            4. INTERNAL COMMUNITY WORKSPACES FOR NEW MEMBERS
           ==================================================================== */}
        <div className="glass-panel rounded-3xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#163B63] text-[#C4EEFF]">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">
                Already connected on social? Explore our interactive workspaces
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Ask technical questions in the AI Forum, browse our discovery platforms,
                or review our Code of Conduct.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold"
              href="/forum"
            >
              <Users className="h-4 w-4 text-[#80D8FF]" />
              <span>AI Forum &amp; Q&amp;A</span>
            </Link>
            <Link
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs"
              href="/platforms"
            >
              <Compass className="h-4 w-4" />
              <span>Platform Network</span>
            </Link>
            <Link
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold"
              href="/code-of-conduct"
            >
              <ShieldCheck className="h-4 w-4 text-[#80D8FF]" />
              <span>Code of Conduct</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
