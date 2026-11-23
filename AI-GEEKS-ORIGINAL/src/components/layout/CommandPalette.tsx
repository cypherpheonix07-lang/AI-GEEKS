"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Compass,
  Calendar,
  Mic2,
  MessageSquare,
  ArrowUpRight,
  CornerDownLeft,
  X,
  Command,
} from "lucide-react";
import {
  NAV_LINKS,
  LUMA_EVENTS,
  PAST_SPEAKERS,
  FORUM_THREADS,
  SITE_CONFIG,
} from "@/data/communityData";

type CommandCategory = "All" | "Routes" | "Events" | "Speakers" | "Forum Q&A";

interface CommandEntry {
  id: string;
  category: Exclude<CommandCategory, "All">;
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  external?: boolean;
}

const CATEGORIES: CommandCategory[] = [
  "All",
  "Routes",
  "Events",
  "Speakers",
  "Forum Q&A",
];

export function triggerCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("aigeeks:open-command-palette"));
  }
}

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CommandCategory>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Build unified search index from centralized communityData.ts
  const entries: CommandEntry[] = useMemo(() => {
    const list: CommandEntry[] = [];

    // 1. Navigation Routes
    for (const nav of NAV_LINKS) {
      list.push({
        id: `route-${nav.href}`,
        category: "Routes",
        title: nav.label,
        subtitle: `Navigate directly to ${nav.href}`,
        badge: "PAGE",
        href: nav.href,
      });
    }

    // Additional Core Pages
    list.push({
      id: "route-home",
      category: "Routes",
      title: "Home",
      subtitle: `Return to the ${SITE_CONFIG.name} landing stage`,
      badge: "PAGE",
      href: "/",
    });
    list.push({
      id: "route-cfp",
      category: "Routes",
      title: "Call for Speakers (CFP)",
      subtitle: "Submit a talk proposal for upcoming meetups",
      badge: "CFP",
      href: "/sponsor#speak",
    });

    // 2. Luma Events
    for (const evt of LUMA_EVENTS) {
      list.push({
        id: `evt-${evt.id}`,
        category: "Events",
        title: evt.title,
        subtitle: `${evt.date} · ${evt.venue}`,
        badge: evt.status.toUpperCase(),
        href: evt.lumaUrl,
        external: true,
      });
    }

    // 3. Past Speakers
    for (const spk of PAST_SPEAKERS) {
      list.push({
        id: `spk-${spk.id}`,
        category: "Speakers",
        title: `${spk.name} — ${spk.talkTitle}`,
        subtitle: `${spk.roleAndCompany} (${spk.eventEdition})`,
        badge: spk.topicCategory.toUpperCase(),
        href: `/past-speakers#${spk.id}`,
      });
    }

    // 4. Forum Q&A Threads
    for (const thd of FORUM_THREADS) {
      list.push({
        id: `thd-${thd.id}`,
        category: "Forum Q&A",
        title: thd.title,
        subtitle: `${thd.author} (${thd.authorRole}) · ${thd.replies.length} replies`,
        badge: thd.solved ? "SOLVED" : "OPEN",
        href: `/forum#${thd.id}`,
      });
    }

    return list;
  }, []);

  // Filter entries based on search query & active category tab
  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    return entries.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }, [entries, query, activeCategory]);

  // Keep selection index clamped when result count changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredEntries.length, activeCategory, query]);

  // Listen for global Ctrl+K / Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(
      "aigeeks:open-command-palette",
      handleCustomTrigger
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "aigeeks:open-command-palette",
        handleCustomTrigger
      );
    };
  }, []);

  // Autofocus input on open and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setActiveCategory("All");
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll active item into view smoothly
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector(
      `[data-cmd-index="${selectedIndex}"]`
    );
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const executeSelection = (entry: CommandEntry) => {
    setIsOpen(false);
    if (entry.external) {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(entry.href);
    }
  };

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredEntries.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredEntries.length - 1
      );
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredEntries[selectedIndex];
      if (current) {
        executeSelection(current);
      }
    }
  };

  const renderCategoryIcon = (cat: CommandEntry["category"]) => {
    switch (cat) {
      case "Routes":
        return <Compass className="h-4 w-4 text-[#80D8FF]" />;
      case "Events":
        return <Calendar className="h-4 w-4 text-[#4DA8DA]" />;
      case "Speakers":
        return <Mic2 className="h-4 w-4 text-[#C4EEFF]" />;
      case "Forum Q&A":
        return <MessageSquare className="h-4 w-4 text-[#80D8FF]" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI GEEKS Command Palette"
      onKeyDown={handleModalKeyDown}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#020813]/85 px-4 pt-20 pb-8 backdrop-blur-xl"
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-2xl overflow-hidden rounded-3xl border border-[#80D8FF]/35 bg-[#091B32]/95 shadow-[0_20px_70px_-10px_rgba(2,8,19,0.95)]"
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 border-b border-[#80D8FF]/25 bg-[#020813] px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-[#80D8FF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, Luma events, speakers, or AI Q&A threads..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search query"
              className="rounded-lg bg-[#16202C] p-1 text-slate-300 hover:text-[#C4EEFF]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg border border-[#80D8FF]/35 bg-[#16202C] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#80D8FF] hover:border-[#C4EEFF]"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#16202C] bg-[#051020]/80 px-5 py-3">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-3 py-1.5 font-mono text-xs uppercase transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-[#4DA8DA] to-[#163B63] text-white border border-[#C4EEFF]/60 shadow-[0_0_15px_rgba(128,216,255,0.45)]"
                    : "bg-[#091B32]/60 text-slate-300 border border-[#80D8FF]/25 hover:border-[#80D8FF]/50 hover:text-[#C4EEFF]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto divide-y divide-[#16202C]/80 p-3"
        >
          {filteredEntries.length === 0 ? (
            <div className="py-14 text-center">
              <Command className="mx-auto h-8 w-8 text-[#4DA8DA]" />
              <p className="mt-3 text-sm font-semibold text-white">
                No matching items found for “{query}”
              </p>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Try searching for “Agents”, “Hackathon”,
                “GSAP”, or “Team”.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={entry.id}
                  type="button"
                  data-cmd-index={idx}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => executeSelection(entry)}
                  className={`group flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left transition-all ${
                    isSelected
                      ? "bg-[#163B63]/90 border border-[#C4EEFF]/60 shadow-[0_0_25px_rgba(128,216,255,0.25)]"
                      : "border border-transparent hover:bg-[#051020]/70"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "border-[#C4EEFF] bg-[#091B32]"
                          : "border-[#80D8FF]/30 bg-[#020813]"
                      }`}
                    >
                      {renderCategoryIcon(entry.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#80D8FF]">
                          {entry.category}
                        </span>
                        <span className="rounded-md bg-[#16202C] px-2 py-0.5 font-mono text-[10px] text-slate-300">
                          {entry.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm font-bold text-white">
                        {entry.title}
                      </p>
                      <p className="truncate text-xs text-slate-300">
                        {entry.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-[#80D8FF]">
                    {isSelected ? (
                      <CornerDownLeft className="h-4 w-4 text-[#C4EEFF]" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Keyboard Shortcut Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#80D8FF]/25 bg-[#020813] px-5 py-3 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded bg-[#16202C] border border-[#80D8FF]/30 px-1.5 py-0.5 text-[#C4EEFF]">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded bg-[#16202C] border border-[#80D8FF]/30 px-1.5 py-0.5 text-[#C4EEFF]">
                ↵
              </kbd>
              <span>Open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded bg-[#16202C] border border-[#80D8FF]/30 px-1.5 py-0.5 text-[#C4EEFF]">
                ESC
              </kbd>
              <span>Close</span>
            </span>
          </div>
          <span className="text-[#4DA8DA]">
            {filteredEntries.length} RESULTS INDEXED
          </span>
        </div>
      </div>
    </div>
  );
}
