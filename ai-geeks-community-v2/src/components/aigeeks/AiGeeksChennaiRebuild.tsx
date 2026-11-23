"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Film,
  Handshake,
  Heart,
  Image as ImageIcon,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  COMMUNITY_MOMENTS,
  COMMUNITY_PARTNERS,
  COMMUNITY_STATS,
  EXPLORER_PHOTOS,
  GALLERY_MEDIA,
  LUMA_EVENTS,
  NAV_LINKS,
  PREVIOUS_SPONSORS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/data/communityData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Identical slider motion physics shared across both Photos and Videos
const UNIFIED_SLIDER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UNIFIED_SLIDER_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
};

// Matches website_main asset paths under public/website_main/
function resolveWebsiteMainAsset(
  fallbackPath: string,
  index: number,
  kind: "explorer" | "moment" | "media"
): string {
  if (kind === "explorer") {
    return `/website_main/explorer/photo-${String(index + 1).padStart(2, "0")}.jpg`;
  }
  if (kind === "moment") {
    return `/website_main/moments/moment-${String(index + 1).padStart(2, "0")}.jpg`;
  }
  if (kind === "media") {
    return `/website_main/gallery/media-${String(index + 1).padStart(2, "0")}.jpg`;
  }
  return fallbackPath;
}

export interface AiGeeksChennaiRebuildProps {
  showFooter?: boolean;
}

export default function AiGeeksChennaiRebuild({
  showFooter = false,
}: AiGeeksChennaiRebuildProps = {}) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const momentsSectionRef = useRef<HTMLDivElement | null>(null);
  const momentsTrackRef = useRef<HTMLDivElement | null>(null);

  // 01 / 06 Explorer state (matches reverse-engineered "Ideas worth sharing")
  const [explorerIdx, setExplorerIdx] = useState<number>(1);
  const [explorerDir, setExplorerDir] = useState<number>(1);
  const [explorerImgFailed, setExplorerImgFailed] = useState<Record<string, boolean>>({});

  // Events fallback / live list state (matches reverse-engineered Luma boundary)
  const [showEventsFallback, setShowEventsFallback] = useState<boolean>(false);
  const [isSyncingEvents, setIsSyncingEvents] = useState<boolean>(false);

  // Unified Photo & Video Slider state (identical slider motion for both)
  const photoReel = GALLERY_MEDIA.filter((m) => m.type === "photo");
  const videoReel = GALLERY_MEDIA.filter((m) => m.type === "video");

  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const [photoDir, setPhotoDir] = useState<number>(1);
  const [videoIdx, setVideoIdx] = useState<number>(0);
  const [videoDir, setVideoDir] = useState<number>(1);

  const [lightboxItem, setLightboxItem] = useState<{
    id: string;
    type: "photo" | "video";
    title: string;
    caption: string;
    date: string;
    location: string;
    duration?: string;
    assetSrc: string;
    direction: number;
  } | null>(null);
  const [isPlayingLightboxVideo, setIsPlayingLightboxVideo] = useState<boolean>(true);
  const [lightboxProgress, setLightboxProgress] = useState<number>(32);

  // Horizontal 01 / 14 moments counter
  const [momentCounter, setMomentCounter] = useState<number>(1);

  const activeExplorer = EXPLORER_PHOTOS[explorerIdx] || EXPLORER_PHOTOS[0];
  const activePhoto = photoReel[photoIdx % Math.max(1, photoReel.length)] || photoReel[0];
  const activeVideo = videoReel[videoIdx % Math.max(1, videoReel.length)] || videoReel[0];

  const stepExplorer = (dir: number) => {
    setExplorerDir(dir);
    setExplorerIdx((prev) =>
      dir > 0
        ? (prev + 1) % EXPLORER_PHOTOS.length
        : prev - 1 < 0
        ? EXPLORER_PHOTOS.length - 1
        : prev - 1
    );
  };

  const stepPhoto = (dir: number) => {
    if (!photoReel.length) return;
    setPhotoDir(dir);
    setPhotoIdx((prev) =>
      dir > 0
        ? (prev + 1) % photoReel.length
        : prev - 1 < 0
        ? photoReel.length - 1
        : prev - 1
    );
  };

  const stepVideo = (dir: number) => {
    if (!videoReel.length) return;
    setVideoDir(dir);
    setVideoIdx((prev) =>
      dir > 0
        ? (prev + 1) % videoReel.length
        : prev - 1 < 0
        ? videoReel.length - 1
        : prev - 1
    );
  };

  const handleRetryEvents = () => {
    setIsSyncingEvents(true);
    setTimeout(() => {
      setShowEventsFallback(false);
      setIsSyncingEvents(false);
    }, 350);
  };

  useEffect(() => {
    if (!lightboxItem || lightboxItem.type !== "video" || !isPlayingLightboxVideo) {
      return;
    }
    const timer = setInterval(() => {
      setLightboxProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 350);
    return () => clearInterval(timer);
  }, [lightboxItem, isPlayingLightboxVideo]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ag-hero-reveal",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out" }
      );

      const section = momentsSectionRef.current;
      const track = momentsTrackRef.current;
      if (section && track) {
        const scrollDistance = () =>
          -(track.scrollWidth - window.innerWidth + 96);

        const tween = gsap.to(track, {
          x: scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(400, track.scrollWidth - window.innerWidth)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextNum = Math.min(
                COMMUNITY_MOMENTS.length,
                Math.max(1, Math.ceil(self.progress * COMMUNITY_MOMENTS.length))
              );
              setMomentCounter(nextNum);
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    },
    { scope: pageRef }
  );

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#020813] text-slate-100 selection:bg-[#4DA8DA] selection:text-[#020813]"
    >
      {/* ====================================================================
          1. HERO SECTION (REVERSE-ENGINEERED CADENCE + SKY METALLIC GLASS BLUE)
         ==================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020813] via-[#051020] to-[#091B32] pt-16 pb-24 px-6 border-b border-[#4DA8DA]/25">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-gradient-to-tr from-[#163B63]/65 via-[#4DA8DA]/30 to-[#C4EEFF]/18 blur-[135px]"
        />

        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="ag-hero-reveal ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#C4EEFF]">
                {SITE_CONFIG.name} · CHENNAI DEVELOPER COMMUNITY
              </span>
            </div>

            <h1 className="ag-hero-reveal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              Chennai&apos;s own{" "}
              <span className="ag-text-gradient">AI &amp; React</span>{" "}
              community.
            </h1>

            <p className="ag-hero-reveal max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              {SITE_CONFIG.description} Built on the community-first rhythm of
              meetups, talks, and live builder sessions across Chennai.
            </p>

            <div className="ag-hero-reveal flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/events"
                className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold"
              >
                <Calendar className="h-4 w-4 text-[#020813]" />
                <span>Explore events</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/join"
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
              >
                <Users className="h-4 w-4 text-[#80D8FF]" />
                <span>Join the community</span>
              </Link>
            </div>
          </div>

          {/* Right Specular Mascot & Status Card */}
          <div className="lg:col-span-5 ag-hero-reveal">
            <div className="glass-panel relative overflow-hidden rounded-3xl p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
              />
              <div className="flex items-center justify-between rounded-xl bg-[#16202C] px-4 py-2.5 border border-[#80D8FF]/30">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#C4EEFF]">
                  AIGEEKS // CHENNAI_BUILD
                </span>
                <span className="rounded bg-[#091B32] border border-[#80D8FF]/40 px-2 py-0.5 font-mono text-[10px] text-[#80D8FF]">
                  ACTIVE
                </span>
              </div>

              <div className="my-6 flex min-h-[220px] items-center justify-center rounded-2xl border border-[#80D8FF]/20 bg-gradient-to-br from-[#163B63]/55 via-[#091B32]/85 to-[#020813] p-6 text-center">
                <img
                  src="/website_main/brand/aigeeks-3d-mascot.png"
                  alt="AI GEEKS community mascot"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      SITE_CONFIG.mascotAssetPath;
                  }}
                  className="max-h-48 w-auto object-contain drop-shadow-[0_18px_32px_rgba(128,216,255,0.35)]"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#80D8FF]/25 bg-[#051020]/90 px-4 py-3 text-xs font-mono">
                <span className="text-[#C4EEFF] font-bold">
                  MADE FOR THE COMMUNITY
                </span>
                <span className="text-[#80D8FF]">CHENNAI · IST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. IDEAS WORTH SHARING (01 / 06 EXPLORER + 10k+ / 12+ / 2+ STATS)
         ==================================================================== */}
      <section className="py-24 px-6 bg-[#020813] border-b border-[#4DA8DA]/25">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                Our community.
              </p>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white">
                Ideas worth <span className="ag-text-gradient">sharing.</span>
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[#4DA8DA]">
                THE PEOPLE BEHIND THE CODE
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-[#80D8FF]/30 bg-[#051020] px-4 py-2 font-mono text-lg font-extrabold">
                <span className="text-[#C4EEFF]">{activeExplorer.indexLabel}</span>{" "}
                <span className="text-[#4DA8DA]/60">/</span>{" "}
                <span className="text-[#80D8FF]">
                  {String(EXPLORER_PHOTOS.length).padStart(2, "0")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => stepExplorer(-1)}
                aria-label="Previous explorer slide"
                className="ag-btn-secondary rounded-xl p-2.5"
              >
                <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
              </button>
              <button
                type="button"
                onClick={() => stepExplorer(1)}
                aria-label="Next explorer slide"
                className="ag-btn-secondary rounded-xl p-2.5"
              >
                <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 glass-panel relative min-h-[360px] overflow-hidden rounded-3xl p-8 flex flex-col justify-between">
              <AnimatePresence custom={explorerDir} initial={false} mode="wait">
                <motion.div
                  key={activeExplorer.id}
                  custom={explorerDir}
                  variants={UNIFIED_SLIDER_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.36, ease: UNIFIED_SLIDER_EASE }}
                  className="relative z-10 flex min-h-[290px] flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="ag-badge-cyan rounded-full px-3.5 py-1 font-mono text-xs uppercase">
                      {activeExplorer.speakerOrContext}
                    </span>
                    {!explorerImgFailed[activeExplorer.id] && (
                      <img
                        src={resolveWebsiteMainAsset(
                          activeExplorer.imageUrl,
                          explorerIdx,
                          "explorer"
                        )}
                        alt={activeExplorer.title}
                        onError={() =>
                          setExplorerImgFailed((prev) => ({
                            ...prev,
                            [activeExplorer.id]: true,
                          }))
                        }
                        className="h-14 w-24 rounded-xl object-cover border border-[#80D8FF]/40"
                      />
                    )}
                  </div>

                  <div className="pt-10">
                    <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                      {activeExplorer.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
                      {activeExplorer.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#80D8FF]">
                PICK A PHOTO TO EXPLORE
              </p>
              <div className="grid grid-cols-2 gap-3">
                {EXPLORER_PHOTOS.map((item, idx) => {
                  const selected = idx === explorerIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setExplorerDir(idx > explorerIdx ? 1 : -1);
                        setExplorerIdx(idx);
                      }}
                      className={`rounded-2xl p-4 text-left border transition-all flex flex-col justify-between h-24 ${
                        selected
                          ? "border-[#C4EEFF] bg-gradient-to-br from-[#2B6CB0]/60 via-[#163B63]/85 to-[#091B32] shadow-[0_0_24px_rgba(128,216,255,0.35)]"
                          : "border-[#80D8FF]/20 bg-[#0F2744]/55 hover:border-[#80D8FF]/55"
                      }`}
                    >
                      <span className="font-mono text-xs font-extrabold text-[#C4EEFF]">
                        {item.indexLabel}
                      </span>
                      <span className="text-xs font-semibold text-white line-clamp-2">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {COMMUNITY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-3xl p-8 text-center"
              >
                <p className="text-4xl md:text-6xl font-extrabold ag-text-gradient">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. UNIFIED PHOTO SLIDER & VIDEO SLIDER (IDENTICAL SLIDER MOTION)
         ==================================================================== */}
      <section className="py-24 px-6 bg-[#051020] border-b border-[#4DA8DA]/25">
        <div className="mx-auto max-w-7xl space-y-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              MEDIA ARCHIVE · SYNCHRONIZED SLIDER MOTION
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white">
              Photos &amp; Videos <span className="ag-text-gradient">Sliders.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Photo Slider Card */}
            {activePhoto && (
              <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold">
                    <Camera className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>PHOTOS · {String(photoIdx + 1).padStart(2, "0")}/{String(photoReel.length).padStart(2, "0")}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepPhoto(-1)}
                      aria-label="Slide previous photo"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepPhoto(1)}
                      aria-label="Slide next photo"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[250px] overflow-hidden rounded-2xl border border-[#80D8FF]/30 bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813]">
                  <AnimatePresence custom={photoDir} initial={false} mode="wait">
                    <motion.div
                      key={activePhoto.id}
                      custom={photoDir}
                      variants={UNIFIED_SLIDER_VARIANTS}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.36, ease: UNIFIED_SLIDER_EASE }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -55) stepPhoto(1);
                        if (info.offset.x > 55) stepPhoto(-1);
                      }}
                      className="p-6 min-h-[250px] flex flex-col justify-between cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#80D8FF]">
                        <span>{activePhoto.eventTag} · {activePhoto.date}</span>
                        <span>{activePhoto.location}</span>
                      </div>
                      <div className="my-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {activePhoto.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300">
                          {activePhoto.caption}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#4DA8DA]/20">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#C4EEFF]">
                          <ImageIcon className="h-3.5 w-3.5 text-[#80D8FF]" />
                          <span>Photo Slide</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlayingLightboxVideo(false);
                            setLightboxProgress(0);
                            setLightboxItem({
                              id: activePhoto.id,
                              type: "photo",
                              title: activePhoto.title,
                              caption: activePhoto.caption,
                              date: activePhoto.date,
                              location: activePhoto.location,
                              assetSrc: resolveWebsiteMainAsset(
                                activePhoto.thumbnailUrl,
                                photoIdx,
                                "media"
                              ),
                              direction: photoDir,
                            });
                          }}
                          className="ag-btn-primary rounded-xl px-4 py-2 text-xs"
                        >
                          Inspect Photo
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Video Slider Card (Identical Motion Variant to Photo Slider) */}
            {activeVideo && (
              <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold">
                    <Film className="h-3.5 w-3.5 text-[#C4EEFF]" />
                    <span>VIDEOS · {String(videoIdx + 1).padStart(2, "0")}/{String(videoReel.length).padStart(2, "0")}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepVideo(-1)}
                      aria-label="Slide previous video"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepVideo(1)}
                      aria-label="Slide next video"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[250px] overflow-hidden rounded-2xl border border-[#80D8FF]/30 bg-gradient-to-br from-[#0F2744] via-[#091B32] to-[#020813]">
                  <AnimatePresence custom={videoDir} initial={false} mode="wait">
                    <motion.div
                      key={activeVideo.id}
                      custom={videoDir}
                      variants={UNIFIED_SLIDER_VARIANTS}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.36, ease: UNIFIED_SLIDER_EASE }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -55) stepVideo(1);
                        if (info.offset.x > 55) stepVideo(-1);
                      }}
                      className="p-6 min-h-[250px] flex flex-col justify-between cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#80D8FF]">
                        <span>{activeVideo.eventTag} · {activeVideo.duration}</span>
                        <span>{activeVideo.location}</span>
                      </div>
                      <div className="my-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {activeVideo.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300">
                          {activeVideo.caption}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#4DA8DA]/20">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#C4EEFF]">
                          <Play className="h-3.5 w-3.5 fill-[#80D8FF] text-[#80D8FF]" />
                          <span>Video Slide ({activeVideo.duration})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlayingLightboxVideo(true);
                            setLightboxProgress(24);
                            setLightboxItem({
                              id: activeVideo.id,
                              type: "video",
                              title: activeVideo.title,
                              caption: activeVideo.caption,
                              date: activeVideo.date,
                              location: activeVideo.location,
                              duration: activeVideo.duration,
                              assetSrc: resolveWebsiteMainAsset(
                                activeVideo.thumbnailUrl,
                                videoIdx,
                                "media"
                              ),
                              direction: videoDir,
                            });
                          }}
                          className="ag-btn-primary rounded-xl px-4 py-2 text-xs"
                        >
                          Play Video
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. UPCOMING EVENTS & MAKE IT HAPPEN (SPEAKERS, SPONSORS, PARTNERS)
         ==================================================================== */}
      <section className="py-24 px-6 bg-[#020813] border-b border-[#4DA8DA]/25">
        <div className="mx-auto max-w-7xl space-y-20">
          <div>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                  EVENTS &amp; MEETUPS
                </p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-white">
                  Upcoming <span className="ag-text-gradient">events.</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowEventsFallback((v) => !v)}
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-[#80D8FF] ${
                    isSyncingEvents ? "animate-spin" : ""
                  }`}
                />
                <span>{showEventsFallback ? "Show Feed" : "Test Fallback"}</span>
              </button>
            </div>

            {showEventsFallback ? (
              <div className="glass-panel rounded-3xl p-10 text-center max-w-2xl mx-auto">
                <h3 className="text-xl font-extrabold text-white">
                  We couldn&apos;t load events right now.
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Click &ldquo;Try again&rdquo; or view the calendar directly on
                  Luma.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRetryEvents}
                    className="ag-btn-secondary rounded-xl px-4 py-2.5 text-xs font-bold"
                  >
                    Try again
                  </button>
                  <a
                    href={SITE_CONFIG.lumaCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-primary rounded-xl px-4 py-2.5 text-xs"
                  >
                    View on Luma
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LUMA_EVENTS.map((evt) => (
                  <article
                    key={evt.id}
                    className="glass-panel rounded-3xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                        {evt.status} · {evt.track}
                      </span>
                      <h3 className="mt-3 text-lg font-extrabold text-white">
                        {evt.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs text-[#80D8FF]">
                        {evt.date} · {evt.time}
                      </p>
                      <p className="mt-1 text-xs text-slate-300">{evt.venue}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#4DA8DA]/20">
                      <a
                        href={evt.lumaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs"
                      >
                        <span>View on Luma</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Make It Happen — Call for Speakers & Call for Sponsors */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              BE PART OF THE STORY
            </p>
            <h2 className="mt-1 text-3xl md:text-5xl font-extrabold text-white">
              Make it <span className="ag-text-gradient">happen.</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              There&apos;s more than one way to help our community grow.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs">
                    <Mic className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>CALL FOR SPEAKERS</span>
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold text-white">
                    Have a story to share?
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Bring your ideas, lessons, and experiences to the community.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/sponsor#speak"
                    className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm"
                  >
                    <span>Speak at a meetup</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs">
                    <Handshake className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>CALL FOR SPONSORS</span>
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold text-white">
                    Help good things grow.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Support the people and meetups that bring developers together.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/sponsor"
                    className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold"
                  >
                    <span>Partner with us</span>
                    <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Sponsors & Community Partners */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                Our previous sponsors
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Thank you for supporting the community.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {PREVIOUS_SPONSORS.map((sp) => (
                  <a
                    key={sp.id}
                    href={sp.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel flex h-24 flex-col items-center justify-center rounded-2xl p-4 text-center hover:-translate-y-1 transition-all"
                  >
                    <span className="font-mono text-sm font-extrabold text-white">
                      {sp.name}
                    </span>
                    {sp.tier && (
                      <span className="mt-1 font-mono text-[10px] text-[#80D8FF]">
                        {sp.tier}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                Community partners
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Better together, across communities.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {COMMUNITY_PARTNERS.map((cp) => (
                  <a
                    key={cp.id}
                    href={cp.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel flex h-20 items-center justify-center rounded-2xl px-4 text-center font-mono text-xs font-bold text-slate-200 hover:text-[#C4EEFF] transition-colors"
                  >
                    {cp.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. HORIZONTAL PINNED MOMENTS STRIP (01 / 14)
         ==================================================================== */}
      <section
        ref={momentsSectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#020813] py-16 flex flex-col justify-between"
      >
        <div className="mx-auto w-full max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              THE MOMENTS WE SHARE
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white">
              Good times, <span className="ag-text-gradient">together.</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              A little look back at the people and moments that make{" "}
              {SITE_CONFIG.shortName}.
            </p>
          </div>
          <span className="ag-badge-cyan rounded-full px-4 py-1.5 font-mono text-xs self-start md:self-end">
            Scroll to explore ↓
          </span>
        </div>

        <div className="my-auto py-8 flex items-center">
          <div
            ref={momentsTrackRef}
            className="flex gap-6 px-6 md:px-12 will-change-transform"
          >
            {COMMUNITY_MOMENTS.map((moment, idx) => (
              <article
                key={moment.id}
                className="glass-panel relative h-[350px] w-[280px] md:h-[410px] md:w-[360px] shrink-0 overflow-hidden rounded-3xl"
              >
                <img
                  src={resolveWebsiteMainAsset(moment.imageUrl, idx, "moment")}
                  alt={moment.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#051020]/70 to-transparent p-6 flex flex-col justify-end">
                  <span className="font-mono text-xs font-bold text-[#80D8FF]">
                    {moment.number}
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {moment.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{moment.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 flex items-center justify-between border-t border-[#4DA8DA]/25 pt-6 font-mono text-sm">
          <p className="text-slate-300">
            Community moment{" "}
            <span className="font-bold text-[#C4EEFF]">
              {String(momentCounter).padStart(2, "0")}
            </span>{" "}
            — A moment from the {SITE_CONFIG.shortName} community.
          </p>
          <span className="rounded-xl border border-[#80D8FF]/30 bg-[#051020] px-4 py-2 font-extrabold text-[#C4EEFF]">
            {String(momentCounter).padStart(2, "0")} /{" "}
            {String(COMMUNITY_MOMENTS.length).padStart(2, "0")}
          </span>
        </div>
      </section>

      {/* ====================================================================
          6. FOOTER (REVERSE-ENGINEERED 3-COLUMN STRUCTURE + FIND US ONLINE)
         ==================================================================== */}
      {showFooter && (
        <footer className="border-t border-[#4DA8DA]/30 bg-[#051020] py-16 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-5 space-y-4">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C4EEFF]/45 bg-[#163B63] text-[#C4EEFF]">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-extrabold text-white">
                    {SITE_CONFIG.name}
                  </span>
                </Link>
                <p className="max-w-sm text-sm text-slate-300">
                  {SITE_CONFIG.description}
                </p>
              </div>

              <div className="md:col-span-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
                  Explore
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-[#C4EEFF] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
                  Find us online
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[#4DA8DA]/30 bg-[#091B32]/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-[#C4EEFF] hover:text-[#C4EEFF] transition-colors"
                    >
                      <span className="truncate">{item.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#80D8FF]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#4DA8DA]/25 pt-8 font-mono text-xs text-slate-400">
              <p className="inline-flex items-center gap-1.5 text-slate-300">
                <span>© {SITE_CONFIG.name} COMMUNITY</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-[#C4EEFF]">
                  MADE WITH{" "}
                  <Heart className="h-3.5 w-3.5 fill-[#80D8FF] text-[#80D8FF]" />{" "}
                  IN CHENNAI
                </span>
              </p>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold text-[#C4EEFF]"
              >
                <span>BACK TO TOP ↑</span>
                <ArrowUp className="h-3.5 w-3.5 text-[#80D8FF]" />
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* ====================================================================
          7. UNIFIED LIGHTBOX MODAL FOR BOTH PHOTOS & VIDEOS
         ==================================================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-2xl p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: UNIFIED_SLIDER_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#4DA8DA]/25 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase text-[#80D8FF]">
                    {lightboxItem.type.toUpperCase()} · {lightboxItem.date} ·{" "}
                    {lightboxItem.location}
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold text-white">
                    {lightboxItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Close preview"
                  className="ag-btn-secondary rounded-xl p-2"
                >
                  <X className="h-4 w-4 text-[#C4EEFF]" />
                </button>
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-[#80D8FF]/30 bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813] flex flex-col items-center justify-center p-6 text-center">
                {lightboxItem.type === "video" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPlayingLightboxVideo((p) => !p)}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C4EEFF] bg-[#020813]/85 text-[#C4EEFF] mb-4"
                    >
                      {isPlayingLightboxVideo ? (
                        <Pause className="h-7 w-7 text-[#80D8FF]" />
                      ) : (
                        <Play className="h-7 w-7 fill-[#80D8FF] ml-0.5" />
                      )}
                    </button>
                    <p className="text-sm text-slate-200 max-w-lg">
                      {lightboxItem.caption}
                    </p>
                    <div className="mt-6 w-full max-w-md h-2 overflow-hidden rounded-full bg-[#020813]">
                      <div
                        style={{ width: `${lightboxProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#4DA8DA] to-[#C4EEFF] transition-all duration-200"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-[#80D8FF] mb-3" />
                    <p className="text-sm text-slate-200 max-w-lg">
                      {lightboxItem.caption}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
