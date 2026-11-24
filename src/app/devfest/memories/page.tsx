"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Camera, Calendar, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { DEVFEST_ARCHIVE, DevFestArchivePhoto } from "@/data/devfestData";

export default function DevFestMemoriesPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<DevFestArchivePhoto | null>(null);

  const years = useMemo(() => {
    const set = new Set<number>();
    DEVFEST_ARCHIVE.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedYear === "all") return DEVFEST_ARCHIVE;
    return DEVFEST_ARCHIVE.filter((p) => p.year === parseInt(selectedYear, 10));
  }, [selectedYear]);

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Camera className="h-3.5 w-3.5" />
          <span>DEVFEST PHOTO ARCHIVE · CHENNAI MOMENTS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          DevFest Memories
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Revisit the energy, keynotes, hackathons, and community friendships forged across past DevFest Chennai editions.
        </p>
      </div>

      {/* Year Filter Buttons */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          type="button"
          onClick={() => setSelectedYear("all")}
          className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
            selectedYear === "all"
              ? "bg-[#2B6CB0] text-white shadow-[0_0_15px_rgba(128,216,255,0.4)]"
              : "bg-[#051020]/80 text-slate-300 hover:text-white"
          }`}
        >
          All Editions ({DEVFEST_ARCHIVE.length})
        </button>
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setSelectedYear(String(y))}
            className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
              selectedYear === String(y)
                ? "bg-[#2B6CB0] text-white shadow-[0_0_15px_rgba(128,216,255,0.4)]"
                : "bg-[#051020]/80 text-slate-300 hover:text-white"
            }`}
          >
            DevFest {y}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-[#051020]/80 backdrop-blur-md shadow-[0_8px_25px_rgba(2,8,19,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(43,108,176,0.3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#091B32]">
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/illustrations/footer_chennai.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-80" />
              <span className="absolute top-3 right-3 rounded-md bg-[#020813]/85 px-2 py-0.5 font-mono text-[10px] text-[#80D8FF]">
                {photo.year}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-base font-bold text-white group-hover:text-[#80D8FF] transition-colors">
                {photo.title}
              </h3>
              <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full rounded-3xl bg-[#051020] p-4 sm:p-6 shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#091B32] text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-4">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/illustrations/footer_chennai.jpg";
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#80D8FF] block">
                  DEVFEST CHENNAI {activePhoto.year}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {activePhoto.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="ag-btn-secondary px-4 py-2 text-xs font-mono font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
