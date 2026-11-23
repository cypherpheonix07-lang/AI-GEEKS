"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles, Calendar, Terminal } from "lucide-react";
import { SITE_CONFIG, COMMUNITY_STATS } from "@/data/communityData";
import HeroParticleCanvas from "@/components/home/HeroParticleCanvas";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mascotCardRef = useRef<HTMLDivElement | null>(null);
  const mascotFloatRef = useRef<HTMLDivElement | null>(null);
  const [mascotImageError, setMascotImageError] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(
          ".hero-desc",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.45"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-mascot-wrap",
          { scale: 0.92, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        );

      if (mascotFloatRef.current) {
        gsap.to(mascotFloatRef.current, {
          y: -14,
          rotationZ: 1.2,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: heroRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = mascotCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleMouseLeave = () => {
    const card = mascotCardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#020813] pt-12 pb-24 md:pt-20 md:pb-32 text-slate-100"
    >
      {/* Layer 1: Dark & Light Sky Metallic Ambient Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 h-[540px] w-[920px] rounded-full bg-gradient-to-tr from-[#163B63]/65 via-[#4DA8DA]/30 to-[#C4EEFF]/18 blur-[135px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#2B6CB0]/30 blur-[120px]"
      />

      {/* Layer 2: Interactive Sky Metallic Neural Particle Canvas */}
      <HeroParticleCanvas />

      {/* Layer 3: Foreground Hero Content & Specular 3D Mascot Stage */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Community Headline, Actions & Quick Metrics */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="hero-badge ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#C4EEFF]">
                {SITE_CONFIG.tagline}
              </span>
            </div>

            <h1 className="hero-title mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              The home for{" "}
              <span className="ag-text-gradient">AI builders</span> &amp;
              developers.
            </h1>

            <p className="hero-desc mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-300/95 leading-relaxed">
              {SITE_CONFIG.description} Join {COMMUNITY_STATS[0]?.value ?? "10k+"}{" "}
              engineers shipping multi-agent workflows, React architectures, and
              open-source tools across in-person meetups and 24-hour software
              hackathons.
            </p>

            {/* Primary & Secondary Metallic CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link className="hero-cta ag-btn-primary group inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm sm:text-base" href="/events">
                <Calendar className="h-4 w-4 text-[#020813]" />
                <span>Explore events</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link className="hero-cta ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold" href="/forum">
                <Terminal className="h-4 w-4 text-[#80D8FF]" />
                <span>Join AI Forum &amp; Q&amp;A</span>
              </Link>
            </div>

            {/* Metallic Sky Stat Highlights */}
            <div className="hero-cta mt-12 grid grid-cols-3 gap-6 border-t border-[#4DA8DA]/25 pt-8 w-full max-w-lg">
              {COMMUNITY_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold ag-text-gradient">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#80D8FF]/85">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Specular Metallic Sky Glass 3D Mascot Frame */}
          <div className="lg:col-span-5 hero-mascot-wrap">
            <div
              ref={mascotCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-panel relative mx-auto max-w-md overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              {/* Top Specular Frosted Sky Edge Highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-85"
              />

              {/* Gunmetal Terminal Header Bar */}
              <div className="flex items-center justify-between rounded-xl bg-[#16202C]/90 px-4 py-2.5 border border-[#80D8FF]/30 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.2)]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C4EEFF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#80D8FF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4DA8DA]" />
                </div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#C4EEFF]">
                  AIGEEKS::3D_MASCOT
                </span>
              </div>

              {/* Floating 3D Mascot Stage */}
              <div
                ref={mascotFloatRef}
                className="relative my-6 flex min-h-[280px] items-center justify-center"
              >
                <div className="pointer-events-none absolute inset-0 m-auto h-52 w-52 rounded-full bg-[#80D8FF]/25 blur-3xl" />

                {!mascotImageError ? (
                  <img
                    src={SITE_CONFIG.mascotAssetPath}
                    alt="Illustration of AI GEEKS 3D Mascot"
                    className="relative z-10 max-h-64 w-auto object-contain drop-shadow-[0_20px_38px_rgba(128,216,255,0.42)]"
                    onError={() => setMascotImageError(true)}
                  />
                ) : (
                  <svg
                    viewBox="0 0 260 260"
                    className="relative z-10 h-60 w-60 drop-shadow-[0_20px_38px_rgba(128,216,255,0.45)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Illustration of AI GEEKS 3D Mascot"
                  >
                    <defs>
                      <linearGradient id="agSkyBotBody" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#80D8FF" />
                        <stop offset="35%" stopColor="#4DA8DA" />
                        <stop offset="75%" stopColor="#2B6CB0" />
                        <stop offset="100%" stopColor="#163B63" />
                      </linearGradient>
                      <linearGradient id="agVisorSpecular" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C4EEFF" />
                        <stop offset="100%" stopColor="#80D8FF" />
                      </linearGradient>
                    </defs>
                    <line
                      x1="130"
                      y1="26"
                      x2="130"
                      y2="58"
                      stroke="#C4EEFF"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <circle cx="130" cy="22" r="10" fill="#80D8FF" />
                    <rect
                      x="55"
                      y="56"
                      width="150"
                      height="112"
                      rx="36"
                      fill="url(#agSkyBotBody)"
                      stroke="#C4EEFF"
                      strokeWidth="3"
                    />
                    <rect
                      x="74"
                      y="78"
                      width="112"
                      height="64"
                      rx="20"
                      fill="#020813"
                      stroke="#4DA8DA"
                      strokeWidth="2"
                    />
                    <circle cx="106" cy="110" r="12" fill="url(#agVisorSpecular)" />
                    <circle cx="154" cy="110" r="12" fill="url(#agVisorSpecular)" />
                    <circle cx="109" cy="106" r="4" fill="#FFFFFF" />
                    <circle cx="157" cy="106" r="4" fill="#FFFFFF" />
                    <path
                      d="M86 178 H174 C186 178 194 188 190 202 L180 232 C177 240 168 244 158 244 H102 C92 244 83 240 80 232 L70 202 C66 188 74 178 86 178 Z"
                      fill="url(#agSkyBotBody)"
                      stroke="#C4EEFF"
                      strokeWidth="2.5"
                    />
                    <text
                      x="130"
                      y="216"
                      textAnchor="middle"
                      fill="#C4EEFF"
                      fontFamily="monospace"
                      fontWeight="bold"
                      fontSize="16"
                    >
                      AI GEEKS
                    </text>
                  </svg>
                )}
              </div>

              {/* Bottom Specular Status Bar */}
              <div className="flex items-center justify-between rounded-2xl border border-[#80D8FF]/30 bg-[#051020]/90 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.18)]">
                <div>
                  <p className="font-mono text-xs font-bold text-[#C4EEFF]">
                    MADE FOR THE COMMUNITY
                  </p>
                  <p className="text-xs text-slate-300">
                    Meetups, AI labs &amp; pure-software hackathons
                  </p>
                </div>
                <span className="rounded-lg bg-[#16202C] border border-[#80D8FF]/50 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#80D8FF]">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
