"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { EXPLORER_PHOTOS, COMMUNITY_STATS } from "@/data/communityData";

export default function CommunityExplorer() {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // Default 02 / 06
  const activePhoto = EXPLORER_PHOTOS[selectedIdx] || EXPLORER_PHOTOS[0];
  const totalFormatted = String(EXPLORER_PHOTOS.length).padStart(2, "0");

  const handlePrev = () => {
    setSelectedIdx((prev) =>
      prev === 0 ? EXPLORER_PHOTOS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIdx((prev) =>
      prev === EXPLORER_PHOTOS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#020813] py-24 px-6 text-slate-100 border-t border-[#4DA8DA]/25">
      {/* Ambient Sky Metallic Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#163B63]/40 via-[#4DA8DA]/20 to-transparent blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header + Live 01 / 06 Counter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              Our community.
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Ideas worth <span className="ag-text-gradient">sharing.</span>
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[#4DA8DA]">
              THE PEOPLE BEHIND THE CODE
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-[#80D8FF]/30 bg-[#051020]/85 px-4 py-2 font-mono text-lg font-extrabold shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]">
              <span className="text-[#C4EEFF]">{activePhoto.indexLabel}</span>{" "}
              <span className="text-[#4DA8DA]/60">/</span>{" "}
              <span className="text-[#80D8FF]">{totalFormatted}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous community photo"
                className="ag-btn-secondary rounded-xl p-2.5"
              >
                <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next community photo"
                className="ag-btn-secondary rounded-xl p-2.5"
              >
                <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Active Photo Preview + 6-Item Metallic Thumbnail Picker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Active Photo Stage */}
          <div className="lg:col-span-8 glass-panel relative min-h-[400px] overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col justify-between">
            {/* Top Specular Frosted Sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-85"
            />
            {/* Brushed Metallic Sky Backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#020813] via-[#091B32]/85 to-[#2B6CB0]/35"
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-widest">
                <Sparkles className="h-3 w-3 text-[#80D8FF]" />
                <span>{activePhoto.speakerOrContext}</span>
              </span>
              <span className="rounded-lg bg-[#051020]/90 border border-[#80D8FF]/35 px-3 py-1 font-mono text-xs font-bold text-[#C4EEFF]">
                MOMENT #{activePhoto.indexLabel}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-12">
              <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {activePhoto.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200/90 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>

          {/* 01 / 06 Thumbnail Picker Grid */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#80D8FF]">
              PICK A PHOTO TO EXPLORE
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
              {EXPLORER_PHOTOS.map((item, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`group relative h-28 rounded-2xl p-4 text-left transition-all flex flex-col justify-between overflow-hidden border ${
                      isSelected
                        ? "border-[#C4EEFF] bg-gradient-to-br from-[#2B6CB0]/65 via-[#163B63]/85 to-[#091B32] shadow-[0_0_28px_rgba(128,216,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                        : "border-[#80D8FF]/20 bg-[#0F2744]/55 hover:border-[#80D8FF]/55 hover:bg-[#163B63]/45"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`font-mono text-xs font-extrabold ${
                          isSelected ? "text-[#C4EEFF]" : "text-[#80D8FF]"
                        }`}
                      >
                        {item.indexLabel}
                      </span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[#C4EEFF] shadow-[0_0_8px_#C4EEFF]" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 10k+ Members / 12+ Meetups / 2+ Years Specular Stat Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {COMMUNITY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel relative overflow-hidden rounded-3xl p-8 text-center flex flex-col items-center justify-center"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
              />
              <span className="text-4xl md:text-6xl font-extrabold ag-text-gradient">
                {stat.value}
              </span>
              <span className="mt-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#80D8FF]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
