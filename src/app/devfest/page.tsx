"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Ticket,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Users,
  Layers,
  Cpu,
  Shield,
  Zap,
  Radio,
  ExternalLink,
  Camera,
} from "lucide-react";
import DevFestBracketsBackground from "@/components/home/DevFestBracketsBackground";
import {
  DEVFEST_CONFIG,
  DEVFEST_TRACKS,
  DEVFEST_SPEAKERS,
  DEVFEST_GAMES,
  DEVFEST_TICKETS,
  DEVFEST_ARCHIVE,
} from "@/data/devfestData";

export default function DevFestHomePage() {
  const featuredSpeakers = DEVFEST_SPEAKERS.slice(0, 8);
  const previewArchive = DEVFEST_ARCHIVE.slice(0, 6);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Brackets Particle Field & Lite Mode Controller */}
      <DevFestBracketsBackground />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-4 py-1.5 backdrop-blur-md shadow-[0_4px_25px_rgba(2,8,19,0.7)] mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#80D8FF] animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
              OCTOBER 17, 2026 · IIT MADRAS RESEARCH PARK
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            DevFest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80D8FF] via-[#4DA8DA] to-[#2B6CB0]">Chennai 2026</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            India’s flagship developer festival. 8 tracks, 30+ industry leaders, 68 deep-dive sessions, and 4 interactive mini-games on one unified stage.
          </p>

          {/* Metadata chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 rounded-xl bg-[#091B32]/70 px-3.5 py-2">
              <Calendar className="h-4 w-4 text-[#80D8FF]" />
              <span>Saturday, October 17, 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#091B32]/70 px-3.5 py-2">
              <MapPin className="h-4 w-4 text-[#80D8FF]" />
              <span>IITM Research Park, Taramani</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#091B32]/70 px-3.5 py-2">
              <Users className="h-4 w-4 text-[#80D8FF]" />
              <span>1,200+ Engineers</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/devfest/tickets"
              className="ag-btn-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold shadow-[0_0_30px_rgba(43,108,176,0.4)]"
            >
              <Ticket className="h-4 w-4" />
              <span>Get Your Tickets</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/devfest/agenda"
              className="ag-btn-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold"
            >
              <Calendar className="h-4 w-4 text-[#80D8FF]" />
              <span>Explore 68 Sessions</span>
            </Link>
            <Link
              href="/devfest/games"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#091B32]/80 px-5 py-3.5 text-sm font-medium text-slate-200 hover:bg-[#163B63] transition-colors"
            >
              <Gamepad2 className="h-4 w-4 text-amber-400" />
              <span>Play 4 Mini-Games</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {DEVFEST_CONFIG.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#051020]/75 p-6 backdrop-blur-md shadow-[0_12px_30px_rgba(2,8,19,0.6)]"
            >
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#80D8FF]">
                {s.value}
              </span>
              <span className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Conference Tracks */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#80D8FF]">
              <Layers className="h-4 w-4" />
              <span>Curated Engineering Tracks</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              8 Specialization Tracks
            </h2>
          </div>
          <Link
            href="/devfest/agenda"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#80D8FF] hover:text-white transition-colors"
          >
            <span>View Full Timetable</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEVFEST_TRACKS.map((t) => (
            <Link
              key={t.slug}
              href={`/devfest/agenda?track=${t.slug}`}
              className="group rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(43,108,176,0.3)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                  EXPLORE →
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#80D8FF] transition-colors">
                {t.name}
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mini-Games Spotlight */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#091B32]/90 via-[#051020]/90 to-[#020813] p-8 sm:p-12 shadow-[0_20px_60px_rgba(2,8,19,0.8)] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-amber-400/10 px-3 py-1 font-mono text-xs font-bold text-amber-300 mb-3">
                <Gamepad2 className="h-4 w-4" />
                <span>INTERACTIVE CONFERENCE GAMIFICATION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                DevFest Play: 4 Playable Mini-Games
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Test your pattern memory, solve ecosystem crosswords, assemble stage jigsaws, and benchmark your syntax typing speed to win conference badges and swag.
              </p>
            </div>
            <Link
              href="/devfest/games"
              className="ag-btn-primary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold"
            >
              <span>Launch Games Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEVFEST_GAMES.map((game) => (
              <Link
                key={game.id}
                href={`/devfest/games?game=${game.id}`}
                className="group rounded-2xl bg-[#051020]/70 p-5 backdrop-blur-sm transition-all hover:bg-[#091B32] hover:scale-[1.02]"
              >
                <div className="text-3xl mb-3">{game.icon}</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-300 font-bold">
                    {game.xpReward}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {game.difficulty}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-white group-hover:text-[#80D8FF] transition-colors">
                  {game.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  {game.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Keynote Speakers */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#80D8FF]">
              <Users className="h-4 w-4" />
              <span>World-Class Leaders</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Featured Speakers
            </h2>
          </div>
          <Link
            href="/devfest/speakers"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#80D8FF] hover:text-white transition-colors"
          >
            <span>All 29 Speakers →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSpeakers.map((s) => (
            <Link
              key={s.slug}
              href={`/devfest/speakers#${s.slug}`}
              className="group rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(43,108,176,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#091B32]">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/images/team/neutral-placeholder-01.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#80D8FF] transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-[#80D8FF] font-medium">
                  {s.title} · {s.company}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-0 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span className="truncate">Keynote Speaker</span>
                <span className="text-[#80D8FF] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Venue Spotlight: IITM Research Park */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#051020]/85 p-8 lg:p-12 shadow-[0_20px_50px_rgba(2,8,19,0.7)] backdrop-blur-xl">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#2B6CB0]/20 px-3 py-1 font-mono text-xs font-bold text-[#80D8FF] mb-4">
              <MapPin className="h-4 w-4" />
              <span>THE VENUE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              IIT Madras Research Park
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Located in the heart of Chennai’s IT corridor on Kanagam Road, Taramani. Features multi-hall acoustic auditoriums, fiber gigabit Wi-Fi, exhibition halls, and developer lounges.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs text-slate-300">
              <div className="rounded-xl bg-[#091B32]/70 p-3">
                <span className="text-slate-500 block text-[10px]">MAIN STAGE</span>
                <span className="font-bold text-white">Auditorium 1</span>
              </div>
              <div className="rounded-xl bg-[#091B32]/70 p-3">
                <span className="text-slate-500 block text-[10px]">TRANSIT</span>
                <span className="font-bold text-white">MRTS Taramani</span>
              </div>
              <div className="rounded-xl bg-[#091B32]/70 p-3">
                <span className="text-slate-500 block text-[10px]">PARKING</span>
                <span className="font-bold text-white">Multi-Level Deck</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=IIT+Madras+Research+Park"
                target="_blank"
                rel="noreferrer"
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
              >
                <MapPin className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-[#091B32]">
            <img
              src="/archive/2025-full-house.webp"
              alt="IIT Madras Research Park Auditorium"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/illustrations/footer_chennai.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs font-bold text-white">
                Main Auditorium · 1,200 Developer Capacity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Tier Quick Preview */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#80D8FF]">
            <Ticket className="h-4 w-4" />
            <span>Pass Options</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your DevFest Pass
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Every pass includes access to sessions, swag kit, food, and community lounges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEVFEST_TICKETS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-[#051020]/80 p-6 backdrop-blur-md flex flex-col justify-between shadow-[0_12px_30px_rgba(2,8,19,0.6)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-[#2B6CB0]/25 px-2 py-0.5 font-mono text-[10px] font-bold text-[#80D8FF]">
                    {t.badge}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {t.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{t.price}</span>
                  <span className="text-sm text-slate-500 line-through">{t.originalPrice}</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#80D8FF] mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href={`/devfest/tickets?tier=${t.id}`}
                  className="ag-btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  <span>Select Pass</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DevFest Memories Carousel */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#80D8FF]">
              <Camera className="h-4 w-4" />
              <span>Memories & Moments</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Moments from Past DevFests
            </h2>
          </div>
          <Link
            href="/devfest/memories"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#80D8FF] hover:text-white transition-colors"
          >
            <span>Full Gallery →</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {previewArchive.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#091B32]"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/illustrations/footer_chennai.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="block font-mono text-[10px] text-white truncate font-medium">
                  {photo.title}
                </span>
                <span className="font-mono text-[9px] text-[#80D8FF]">
                  {photo.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
