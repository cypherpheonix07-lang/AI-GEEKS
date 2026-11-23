"use client";

import React, { useState } from "react";
import {
  Play,
  Image as ImageIcon,
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Film,
  Camera,
} from "lucide-react";
import { GALLERY_MEDIA, SITE_CONFIG } from "@/data/communityData";

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleMedia = GALLERY_MEDIA.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  const activeItem =
    activeIndex !== null ? visibleMedia[activeIndex] || null : null;

  const photoCount = GALLERY_MEDIA.filter((m) => m.type === "photo").length;
  const videoCount = GALLERY_MEDIA.filter((m) => m.type === "video").length;

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex(
      activeIndex === 0 ? visibleMedia.length - 1 : activeIndex - 1
    );
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex(
      activeIndex === visibleMedia.length - 1 ? 0 : activeIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[420px] w-[720px] rounded-full bg-gradient-to-bl from-[#4DA8DA]/25 via-[#163B63]/40 to-transparent blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header & Media Type Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              THE MOMENTS WE SHARE · {SITE_CONFIG.name}
            </p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Photos &amp; <span className="ag-text-gradient">Videos.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
              A look back at the people, full-house meetups, keynote replays,
              and 24-hour software hackathons that make {SITE_CONFIG.name}.
            </p>
          </div>

          {/* Metallic Sky Filter Tabs */}
          <div className="inline-flex rounded-2xl border border-[#80D8FF]/30 bg-[#051020]/90 p-1.5 backdrop-blur-xl self-start">
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setActiveIndex(null);
              }}
              className={`rounded-xl px-4 py-2 font-mono text-xs uppercase transition-all ${
                filter === "all"
                  ? "ag-btn-primary"
                  : "text-slate-300 hover:text-[#C4EEFF]"
              }`}
            >
              All ({GALLERY_MEDIA.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setFilter("photo");
                setActiveIndex(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs uppercase transition-all ${
                filter === "photo"
                  ? "ag-btn-primary"
                  : "text-slate-300 hover:text-[#C4EEFF]"
              }`}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Photos ({photoCount})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFilter("video");
                setActiveIndex(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs uppercase transition-all ${
                filter === "video"
                  ? "ag-btn-primary"
                  : "text-slate-300 hover:text-[#C4EEFF]"
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>Videos ({videoCount})</span>
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleMedia.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="glass-panel group text-left rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Visual Stage */}
              <div className="relative h-60 w-full bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813] flex items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,216,255,0.22),transparent_70%)] opacity-75 group-hover:opacity-100 transition-opacity" />

                {item.type === "video" ? (
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#C4EEFF] bg-[#020813]/80 text-[#80D8FF] shadow-[0_0_25px_rgba(128,216,255,0.45)] group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 fill-[#80D8FF] ml-0.5" />
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-2 text-[#C4EEFF]/80 group-hover:scale-105 transition-transform">
                    <ImageIcon className="h-10 w-10 text-[#80D8FF]" />
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      Moment {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                <span className="ag-badge-cyan absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  {item.eventTag}
                </span>

                {item.duration ? (
                  <span className="absolute bottom-4 right-4 rounded-lg bg-[#020813]/90 border border-[#80D8FF]/40 px-2.5 py-1 font-mono text-xs text-[#C4EEFF]">
                    {item.duration}
                  </span>
                ) : (
                  <span className="absolute bottom-4 right-4 rounded-lg bg-[#020813]/80 border border-[#4DA8DA]/30 px-2.5 py-1 font-mono text-[10px] uppercase text-[#80D8FF]">
                    HD PHOTO
                  </span>
                )}
              </div>

              {/* Card Description */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-[#C4EEFF] transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#4DA8DA]/20 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#80D8FF]" />
                    {item.date}
                  </span>
                  <span className="inline-flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="h-3.5 w-3.5 text-[#4DA8DA] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Lightbox Modal with Prev/Next Controls */}
        {activeItem && activeIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setActiveIndex(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative w-full max-w-4xl rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#4DA8DA]/25 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase text-[#80D8FF]">
                    {activeItem.eventTag} · {activeItem.date} · {activeItem.location}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="ag-btn-secondary rounded-xl p-2"
                >
                  <X className="h-5 w-5 text-[#C4EEFF]" />
                </button>
              </div>

              <div className="my-6 h-72 sm:h-96 rounded-2xl border border-[#80D8FF]/30 bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813] flex flex-col items-center justify-center p-6 text-center">
                {activeItem.type === "video" ? (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C4EEFF] bg-[#020813]/80 text-[#80D8FF] mb-4">
                      <Play className="h-7 w-7 fill-[#80D8FF] ml-0.5" />
                    </div>
                    <p className="text-base font-bold text-white">
                      {activeItem.title} ({activeItem.duration})
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-slate-300">
                      {activeItem.caption}
                    </p>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-14 w-14 text-[#80D8FF] mb-4" />
                    <p className="text-base font-bold text-white">
                      {activeItem.title}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-slate-300">
                      {activeItem.caption}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#80D8FF]">
                  ITEM {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(visibleMedia.length).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
