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
  MapPin,
  Search,
  ExternalLink,
  Layers,
  Users,
  Compass,
  Radio,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import {
  ALL_UNIFIED_PLATFORMS,
  REGIONAL_HUB_PLATFORMS,
  UnifiedPlatformEntry,
  PlatformCategory,
} from "@/data/platformsData";
import { SITE_CONFIG, COMMUNITY_STATS } from "@/data/communityData";

type FilterTab =
  | "All Platforms"
  | "Chennai & Tamil Nadu Hubs"
  | "Event & Campus Platforms"
  | "Social & Developer Channels";

const FILTER_TABS: FilterTab[] = [
  "All Platforms",
  "Chennai & Tamil Nadu Hubs",
  "Event & Campus Platforms",
  "Social & Developer Channels",
];

export default function PlatformsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All Platforms");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPlatforms = useMemo(() => {
    let list: UnifiedPlatformEntry[] = ALL_UNIFIED_PLATFORMS;

    if (activeTab === "Chennai & Tamil Nadu Hubs") {
      list = REGIONAL_HUB_PLATFORMS;
    } else if (activeTab === "Event & Campus Platforms") {
      list = ALL_UNIFIED_PLATFORMS.filter(
        (p) => p.platformCategory === "Event & Campus Platforms"
      );
    } else if (activeTab === "Social & Developer Channels") {
      list = ALL_UNIFIED_PLATFORMS.filter(
        (p) => p.platformCategory === "Social & Developer Channels"
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.handle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q) ||
          (p.regionLabel && p.regionLabel.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  const handleCopyLink = async (id: string, url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const getPlatformIcon = (item: UnifiedPlatformEntry) => {
    if (item.joinCategory === "Real-Time Chat") {
      return <MessageCircle className="h-5 w-5 shrink-0 text-[#80D8FF]" />;
    }
    if (item.joinCategory === "Events & Video") {
      return <Calendar className="h-5 w-5 shrink-0 text-[#C4EEFF]" />;
    }
    return <Code2 className="h-5 w-5 shrink-0 text-[#80D8FF]" />;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      {/* Ambient Sky Metallic Specular Lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[960px] rounded-full bg-gradient-to-tr from-[#163B63]/60 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[500px] rounded-full bg-[#2B6CB0]/15 blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        {/* ====================================================================
            1. HERO HEADER WITH PLATFORM METRICS
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
                <Compass className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  COMMUNITY DISCOVERY &amp; PLATFORM ECOSYSTEM
                </span>
              </div>

              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.06]">
                Our Connected{" "}
                <span className="ag-text-gradient">Platform Network.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Explore the complete ecosystem of{" "}
                <strong className="text-[#C4EEFF]">
                  {ALL_UNIFIED_PLATFORMS.length} developer platforms, campus hubs,
                  regional directories, and social channels
                </strong>{" "}
                powering AI GEEKS across Chennai, Tamil Nadu, and global builder
                networks.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 lg:w-96">
              <div className="rounded-2xl bg-[#051020]/90 p-4 text-center">
                <span className="block font-mono text-2xl font-black text-[#C4EEFF]">
                  {ALL_UNIFIED_PLATFORMS.length}
                </span>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  Total Platforms
                </span>
              </div>
              <div className="rounded-2xl bg-[#051020]/90 p-4 text-center">
                <span className="block font-mono text-2xl font-black text-[#80D8FF]">
                  {REGIONAL_HUB_PLATFORMS.length}
                </span>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  Chennai &amp; TN Hubs
                </span>
              </div>
              <div className="rounded-2xl bg-[#051020]/90 p-4 text-center col-span-2 sm:col-span-1">
                <span className="block font-mono text-2xl font-black text-[#4DA8DA]">
                  {COMMUNITY_STATS[0]?.value ?? "10k+"}
                </span>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  Active Builders
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            2. INTERACTIVE FILTER TABS & SEARCH CONTROLS
           ==================================================================== */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => {
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
 isSelected
 ? "ag-btn-primary shadow-[0_0_15px_rgba(128,216,255,0.25)]"
 : "ag-btn-secondary"
 }`}
                  >
                    {tab}
                    {tab === "Chennai & Tamil Nadu Hubs" && (
                      <span className="ml-2 rounded-full bg-[#163B63] px-2 py-0.5 text-[10px] text-[#C4EEFF]">
                        {REGIONAL_HUB_PLATFORMS.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#80D8FF]" />
              <input
                type="text"
                placeholder="Search platforms or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-[#051020]/90 py-2 pl-10 pr-4 font-mono text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#80D8FF]">
            <span>
              Showing {filteredPlatforms.length} of {ALL_UNIFIED_PLATFORMS.length}{" "}
              Integrated Platforms
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="hover:underline text-slate-400"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* ====================================================================
            3. PLATFORM GRID CARDS
           ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPlatforms.map((platform, idx) => {
              const isCopied = copiedId === platform.id;
              return (
                <motion.article
                  key={platform.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, delay: idx * 0.03 }}
                  className={`glass-panel group relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
 platform.isRegionalHub
 ? "shadow-[0_0_24px_rgba(128,216,255,0.15)]"
 : ""
 }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
                  />

                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {platform.badge}
                      </span>

                      {platform.isRegionalHub && platform.regionLabel && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#163B63]/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#C4EEFF]">
                          <MapPin className="h-3 w-3 text-[#80D8FF]" />
                          <span>{platform.regionLabel}</span>
                        </span>
                      )}

                      {platform.recommendedForNewJoiners && (
                        <span className="rounded-full bg-[#163B63] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#C4EEFF]">
                          RECOMMENDED
                        </span>
                      )}
                    </div>

                    {/* Platform Title & Handle */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4DA8DA]/30 via-[#163B63] to-[#051020] text-[#C4EEFF]">
                        {getPlatformIcon(platform)}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                          {platform.name}
                        </h2>
                        <p className="font-mono text-xs text-[#80D8FF] truncate">
                          {platform.handle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(platform.id, platform.url)}
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
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ag-btn-primary inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs"
                    >
                      <span>Visit {platform.name}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ====================================================================
            4. CROSS-NAVIGATION CTA FOOTER
           ==================================================================== */}
        <div className="glass-panel rounded-3xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#163B63] text-[#C4EEFF]">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">
                Looking to connect directly or attend our next gathering?
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Join our real-time channels on WhatsApp and Discord, RSVP for
                upcoming meetups, or participate in the builder forum.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold"
              href="/join"
            >
              <Users className="h-4 w-4 text-[#80D8FF]" />
              <span>Join Directory</span>
            </Link>
            <Link
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs"
              href="/events"
            >
              <span>Explore Events</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold"
              href="/forum"
            >
              <MessageCircle className="h-4 w-4 text-[#80D8FF]" />
              <span>AI Forum &amp; Q&amp;A</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
