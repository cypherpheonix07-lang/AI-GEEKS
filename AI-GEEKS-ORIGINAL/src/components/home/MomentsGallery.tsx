"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { COMMUNITY_MOMENTS } from "@/data/communityData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MomentsGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () =>
        -(track.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.min(
              COMMUNITY_MOMENTS.length,
              Math.max(1, Math.ceil(self.progress * COMMUNITY_MOMENTS.length))
            );
            setActiveIndex(current);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  const formattedIndex = String(activeIndex).padStart(2, "0");
  const formattedTotal = String(COMMUNITY_MOMENTS.length).padStart(2, "0");
  const progressPercent = Math.round(
    (activeIndex / COMMUNITY_MOMENTS.length) * 100
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#020813] text-slate-100 flex flex-col justify-between py-16 border-t border-[#4DA8DA]/30"
    >
      {/* Ambient Metallic Sky Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[860px] rounded-full bg-gradient-to-r from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[140px]"
      />

      {/* Section Header */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#80D8FF]">
            THE MOMENTS WE SHARE
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Good times, <span className="ag-text-gradient">together.</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-300 max-w-xl">
            A little look back at the builders, hackathons, and moments that
            make AI GEEKS.
          </p>
        </div>

        <span className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs self-start md:self-end">
          <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
          <span>Scroll to explore ↓</span>
        </span>
      </div>

      {/* Horizontal GSAP Scroll Track */}
      <div className="relative z-10 flex items-center my-auto py-8">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-12 will-change-transform"
        >
          {COMMUNITY_MOMENTS.map((moment, idx) => {
            const isCurrent = idx + 1 === activeIndex;
            return (
              <article
                key={moment.id}
                className={`glass-panel group relative h-[360px] w-[290px] md:h-[430px] md:w-[375px] shrink-0 overflow-hidden rounded-3xl transition-all duration-300 ${
                  isCurrent
                    ? "border-[#C4EEFF]/80 shadow-[0_0_35px_rgba(128,216,255,0.32)]"
                    : ""
                }`}
              >
                {/* Specular Top Edge Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
                />

                {/* Metallic Sky Card Surface */}
                <div className="h-full w-full bg-gradient-to-br from-[#2B6CB0]/35 via-[#0F2744] to-[#020813] flex flex-col items-center justify-center p-6 text-center">
                  <span className="rounded-full border border-[#80D8FF]/35 bg-[#051020]/75 px-3.5 py-1 font-mono text-xs font-bold text-[#C4EEFF]">
                    FRAME #{moment.number}
                  </span>
                  <span className="mt-3 font-mono text-sm font-semibold text-[#80D8FF]/90 group-hover:text-[#C4EEFF] transition-colors">
                    {moment.title}
                  </span>
                </div>

                {/* Frosted Bottom Caption Scrim */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020813] via-[#051020]/90 to-transparent p-6">
                  <p className="font-mono text-xs font-bold text-[#80D8FF]">
                    {moment.number}
                  </p>
                  <h3 className="text-lg font-extrabold text-white mt-0.5 group-hover:text-[#C4EEFF] transition-colors">
                    {moment.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {moment.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Live Counter & Specular Progress Footer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#4DA8DA]/25 pt-6">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <p className="text-sm text-slate-300">
            Community moment{" "}
            <span className="font-mono font-bold text-[#C4EEFF]">
              {formattedIndex}
            </span>{" "}
            — A moment from the AI GEEKS community.
          </p>
          {/* Specular Sky Progress Bar */}
          <div className="h-1.5 w-full sm:w-64 overflow-hidden rounded-full bg-[#091B32] border border-[#4DA8DA]/30">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#4DA8DA] via-[#80D8FF] to-[#C4EEFF] transition-all duration-150"
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#80D8FF]/35 bg-[#051020]/90 px-4 py-2 font-mono text-lg font-extrabold shadow-[inset_0_1px_0_0_rgba(196,238,255,0.22)]">
          <span className="text-[#C4EEFF]">{formattedIndex}</span>{" "}
          <span className="text-[#4DA8DA]/60">/</span>{" "}
          <span className="text-[#80D8FF]">{formattedTotal}</span>
        </div>
      </div>
    </section>
  );
}
