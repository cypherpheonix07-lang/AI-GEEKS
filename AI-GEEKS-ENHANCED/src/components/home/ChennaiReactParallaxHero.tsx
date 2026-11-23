"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Terminal, Code2, Cpu } from "lucide-react";
import { SITE_CONFIG, COMMUNITY_STATS } from "@/data/communityData";

export default function ChennaiReactParallaxHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transformations for layered elements
  const bgNebulaY = useTransform(smoothProgress, [0, 1], ["0%", "35%"]);
  const reactOrbitsY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const reactOrbitsRotate = useTransform(smoothProgress, [0, 1], [0, 90]);
  const chennaiLandmarksY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const metroTrainX = useTransform(smoothProgress, [0, 1], ["10%", "-85%"]);
  const heroContentY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const heroContentOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen overflow-hidden bg-[#020813] pt-16 pb-24 md:pt-24 md:pb-32 text-slate-100 flex items-center"
    >
      {/* ====================================================================
          LAYER 1: PARALLAX SKY METALLIC NEBULA & GLOWS
         ==================================================================== */}
      <motion.div
        style={{ y: bgNebulaY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-gradient-to-tr from-[#163B63]/60 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[140px]" />
        <div className="absolute top-1/3 -left-20 h-[360px] w-[500px] rounded-full bg-gradient-to-br from-[#2B6CB0]/25 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 -right-20 h-[400px] w-[540px] rounded-full bg-gradient-to-bl from-[#80D8FF]/20 via-[#163B63]/30 to-transparent blur-[130px]" />
      </motion.div>

      {/* ====================================================================
          LAYER 2: REACTJS 3D ATOMIC ORBITAL LOOPS (PARALLAX SPIN & FLOAT)
         ==================================================================== */}
      <motion.div
        style={{ y: reactOrbitsY, rotate: reactOrbitsRotate }}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 sm:right-16 top-1/4 z-[1] w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] opacity-25 md:opacity-35"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#80D8FF]">
          {/* React Core Nucleus */}
          <circle cx="200" cy="200" r="16" fill="#80D8FF" className="animate-pulse" />
          {/* Orbit 1 */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          {/* Orbit 2 (Rotated 60deg) */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            transform="rotate(60 200 200)"
          />
          {/* Orbit 3 (Rotated 120deg) */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            transform="rotate(120 200 200)"
          />
          {/* Orbiting Electron Nodes */}
          <circle cx="360" cy="200" r="7" fill="#C4EEFF" />
          <circle cx="120" cy="80" r="6" fill="#80D8FF" />
          <circle cx="280" cy="320" r="6" fill="#4DA8DA" />
        </svg>
      </motion.div>

      {/* Floating JSX Tokens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-[8%] hidden lg:flex items-center gap-2 rounded-xl bg-[#091B32]/70 px-3.5 py-1.5 font-mono text-xs text-[#80D8FF] backdrop-blur-md shadow-[0_8px_20px_rgba(2,8,19,0.5)]"
        >
          <Code2 className="h-3.5 w-3.5 text-[#C4EEFF]" />
          <span>&lt;Chennai.React /&gt;</span>
        </motion.div>

        <motion.div
          animate={{ y: [10, -10, 10], rotate: [1, -2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-44 right-[12%] hidden lg:flex items-center gap-2 rounded-xl bg-[#091B32]/70 px-3.5 py-1.5 font-mono text-xs text-[#C4EEFF] backdrop-blur-md shadow-[0_8px_20px_rgba(2,8,19,0.5)]"
        >
          <Cpu className="h-3.5 w-3.5 text-[#80D8FF]" />
          <span>RSC.Streaming(Next16)</span>
        </motion.div>
      </div>

      {/* ====================================================================
          LAYER 3: CHENNAI LANDMARKS SILHOUETTES & METRO TRACK
         ==================================================================== */}
      <motion.div
        style={{ y: chennaiLandmarksY }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 z-[3] h-40 overflow-hidden opacity-35"
      >
        {/* Napier Bridge Arches & Central Station Vector Silhouette */}
        <svg
          viewBox="0 0 1440 180"
          className="absolute bottom-0 w-full h-full text-[#163B63]"
          preserveAspectRatio="none"
        >
          {/* Central Station Clocktower & Dome Silhouette */}
          <path
            d="M 120 180 L 120 80 L 140 60 L 150 40 L 160 60 L 180 80 L 180 180 Z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Napier Bridge Arches Repeating Sequence */}
          <path
            d="M 280 180 Q 360 80 440 180 Q 520 80 600 180 Q 680 80 760 180 Q 840 80 920 180 Q 1000 80 1080 180 Q 1160 80 1240 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Marina Lighthouse Silhouette & Rotating Light Beam */}
          <path
            d="M 1320 180 L 1335 50 L 1355 50 L 1370 180 Z"
            fill="currentColor"
            opacity="0.9"
          />
          <polygon
            points="1345,55 1000,10 1100,10"
            fill="#80D8FF"
            opacity="0.15"
          />
        </svg>

        {/* Gliding Chennai Metro Train */}
        <motion.div
          style={{ x: metroTrainX }}
          className="absolute bottom-2 left-0 w-[500px] h-10 will-change-transform"
        >
          <img
            src="/illustrations/chennai-metro-horizontal.svg"
            alt=""
            className="w-full h-auto opacity-70 drop-shadow-[0_4px_12px_rgba(128,216,255,0.4)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      </motion.div>

      {/* ====================================================================
          LAYER 4: FOREGROUND HERO HEADINGS & DIRECT CTAS
         ==================================================================== */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 w-full"
      >
        <div className="flex flex-col items-start max-w-3xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/85 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-6 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-[#80D8FF] animate-spin" style={{ animationDuration: "8s" }} />
            <span>CHENNAI’S TECH &amp; REACT DEVELOPER COMMUNITY</span>
          </div>

          {/* Scroll-Float Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Built with React. <br />
            <span className="ag-text-gradient">Powered by AI Geeks.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            From Marina to TIDEL Park, we bring together Chennai&apos;s most curious developers,
            autonomous agent architects, and Next.js builders for monthly in-person meetups and pure-software hackathons.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/events"
              className="ag-btn-primary inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-bold shadow-[0_8px_25px_rgba(43,108,176,0.4)]"
            >
              <span>Explore Meetups &amp; Agenda</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/join"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-[#C4EEFF]"
            >
              <Terminal className="h-4 w-4 text-[#80D8FF]" />
              <span>Join WhatsApp &amp; Discord</span>
            </Link>

            <a
              href={SITE_CONFIG.lumaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#091B32]/70 hover:bg-[#163B63]/80 px-5 py-3.5 text-xs sm:text-sm font-mono text-slate-300 hover:text-white transition-all backdrop-blur-md"
            >
              <Calendar className="h-4 w-4 text-[#80D8FF]" />
              <span>lu.ma/aigeeks</span>
            </a>
          </div>

          {/* Community Stats Strip */}
          <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-transparent">
            <div>
              <strong className="block text-2xl sm:text-4xl font-extrabold text-white">
                {COMMUNITY_STATS[0]?.value || "10k+"}
              </strong>
              <span className="text-xs sm:text-sm font-mono text-[#80D8FF] uppercase tracking-wider">
                Community Members
              </span>
            </div>
            <div>
              <strong className="block text-2xl sm:text-4xl font-extrabold text-white">
                {COMMUNITY_STATS[1]?.value || "12+"}
              </strong>
              <span className="text-xs sm:text-sm font-mono text-[#80D8FF] uppercase tracking-wider">
                Meetups Hosted
              </span>
            </div>
            <div>
              <strong className="block text-2xl sm:text-4xl font-extrabold text-white">
                {COMMUNITY_STATS[2]?.value || "2+"}
              </strong>
              <span className="text-xs sm:text-sm font-mono text-[#80D8FF] uppercase tracking-wider">
                Years Building
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
