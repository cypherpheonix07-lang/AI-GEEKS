"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EXPLORER_PHOTOS } from "@/data/communityData";

export default function CommunityExplorer() {
  const [active, setActive] = useState<number>(4); // Default to 05 / 06 ("Learning together") as shown in screenshot #6
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setTimeout(() => {
      setActive((current) => (current + 1) % EXPLORER_PHOTOS.length);
    }, 4500);
    return () => clearTimeout(timer);
  }, [active, isPaused, reducedMotion]);

  const selected = EXPLORER_PHOTOS[active] || EXPLORER_PHOTOS[0];
  const totalCards = EXPLORER_PHOTOS.length;
  const hand = EXPLORER_PHOTOS.filter((_, idx) => idx !== active);

  return (
    <section className="relative overflow-hidden bg-[#020813] py-24 px-6 text-slate-100">
      {/* Ambient Sky Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-gradient-to-r from-[#163B63]/30 via-[#4DA8DA]/15 to-transparent blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Title: Our community. */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Our community.
          </h2>
        </div>

        {/* 3-Column Interactive Showcase Matching Screenshot #6 */}
        <div
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]"
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Overline, Description, PICK A PHOTO TO EXPLORE */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#80D8FF]">
              THE PEOPLE BEHIND THE CODE
            </span>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xs">
              {selected.description}
            </p>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#80D8FF]/70 pt-2">
              PICK A PHOTO TO EXPLORE
            </span>
          </div>

          {/* Center Column: Fanned Interactive Hand of Photo Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] md:min-h-[440px]">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] flex items-center justify-center">
              {EXPLORER_PHOTOS.map((item, index) => {
                const isActive = index === active;
                const handIndex = hand.findIndex((h) => h.id === item.id);
                const offset = handIndex - (hand.length - 1) / 2;

                return (
                  <motion.button
                    type="button"
                    key={item.id}
                    onClick={() => setActive(index)}
                    aria-label={`Show ${item.title}, photo ${index + 1} of ${totalCards}`}
                    aria-pressed={isActive}
                    initial={false}
                    animate={
                      isActive
                        ? { x: 0, y: -20, rotate: 0, scale: 1, zIndex: 30 }
                        : {
                            x: offset * 36,
                            y: 85 + Math.abs(offset) * 8,
                            rotate: offset * 6,
                            scale: 0.74,
                            zIndex: 10 + handIndex,
                          }
                    }
                    whileHover={
                      isActive || reducedMotion
                        ? undefined
                        : { y: 65 + Math.abs(offset) * 8, scale: 0.78 }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 240, damping: 25 }
                    }
                    className={`absolute inset-0 overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(2,8,19,0.9)] cursor-pointer focus:outline-none transition-shadow ${
                      isActive
                        ? "shadow-[0_25px_60px_rgba(128,216,255,0.35),0_0_30px_rgba(128,216,255,0.25)]"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `/images/moments/moment-0${(index % 6) + 1}.jpg`;
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020813]/60 via-transparent to-transparent"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Counter & Active Card Title */}
          <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right space-y-2">
            <span className="font-mono text-xs md:text-sm font-bold text-[#80D8FF]">
              {String(active + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {selected.title}
            </h3>
          </div>
        </div>

        {/* ====================================================================
            COMMUNITY AT A GLANCE STATS (10k+ Members, 12+ Meetups, 2+ Years)
           ==================================================================== */}
        <div className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-around gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              10k+
            </span>
            <span className="mt-2 flex items-center gap-1.5 font-mono text-xs md:text-sm uppercase tracking-widest text-slate-300">
              <span className="text-[#80D8FF]">•</span> Members
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              12+
            </span>
            <span className="mt-2 flex items-center gap-1.5 font-mono text-xs md:text-sm uppercase tracking-widest text-slate-300">
              <span className="text-[#80D8FF]">•</span> Meetups
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              2+
            </span>
            <span className="mt-2 flex items-center gap-1.5 font-mono text-xs md:text-sm uppercase tracking-widest text-slate-300">
              <span className="text-[#80D8FF]">•</span> Years
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
