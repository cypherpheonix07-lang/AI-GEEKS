"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import {
  COMMUNITY_MOMENTS,
  GALLERY_MEDIA,
  SITE_CONFIG,
} from "@/data/communityData";
import ChennaiReactParallaxHero from "@/components/home/ChennaiReactParallaxHero";
import MascotPlaygroundSection from "@/components/home/MascotPlaygroundSection";
import InteractiveStickers from "@/components/home/InteractiveStickers";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import DevFestFeaturedSpeakers from "@/components/home/DevFestFeaturedSpeakers";
import CommunityExplorer from "@/components/home/CommunityExplorer";
import MetroCrossing from "@/components/home/MetroCrossing";
import AceternitySocialMarquee from "@/components/home/AceternitySocialMarquee";
import VitStyleTeamSection from "@/components/home/VitStyleTeamSection";
import DevFestSponsorsShowcase from "@/components/home/DevFestSponsorsShowcase";
import ContributionAndPartners from "@/components/home/ContributionAndPartners";
import DevFestBracketsBackground from "@/components/home/DevFestBracketsBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Identical slider motion physics shared across both Photos and Videos
const UNIFIED_SLIDER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UNIFIED_SLIDER_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 128 : -128,
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
    x: direction > 0 ? -128 : 128,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
};

function resolveWebsiteMainAsset(
  folder: "explorer" | "moments" | "gallery",
  index: number,
  fallbackPath: string
): string {
  const num = String(index + 1).padStart(2, "0");
  if (folder === "explorer") {
    return `/website_main/explorer/photo-${num}.jpg`;
  }
  if (folder === "moments") {
    return `/website_main/moments/moment-${num}.jpg`;
  }
  if (folder === "gallery") {
    return `/website_main/gallery/media-${num}.jpg`;
  }
  return fallbackPath;
}

export default function HomePage() {
  const momentsSectionRef = useRef<HTMLDivElement | null>(null);
  const momentsTrackRef = useRef<HTMLDivElement | null>(null);

  // Unified Photo & Video Slider state (identical slider motion for both)
  const photoItems = GALLERY_MEDIA.filter((m) => m.type === "photo");
  const videoItems = GALLERY_MEDIA.filter((m) => m.type === "video");

  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const [photoDir, setPhotoDir] = useState<number>(1);
  const [videoIdx, setVideoIdx] = useState<number>(0);
  const [videoDir, setVideoDir] = useState<number>(1);

  const [previewModal, setPreviewModal] = useState<{
    id: string;
    type: "photo" | "video";
    title: string;
    caption: string;
    date: string;
    location: string;
    duration?: string;
    imageSrc: string;
  } | null>(null);
  const [isPlayingPreviewVideo, setIsPlayingPreviewVideo] = useState<boolean>(true);
  const [previewProgress, setPreviewProgress] = useState<number>(30);
  const [momentCounter, setMomentCounter] = useState<number>(1);

  const activePhoto = photoItems[photoIdx] ?? photoItems[0];
  const activeVideo = videoItems[videoIdx] ?? videoItems[0];

  const stepPhoto = (direction: number) => {
    setPhotoDir(direction);
    setPhotoIdx((curr) => {
      const next = curr + direction;
      if (next < 0) return photoItems.length - 1;
      if (next >= photoItems.length) return 0;
      return next;
    });
  };

  const stepVideo = (direction: number) => {
    setVideoDir(direction);
    setVideoIdx((curr) => {
      const next = curr + direction;
      if (next < 0) return videoItems.length - 1;
      if (next >= videoItems.length) return 0;
      return next;
    });
  };

  // Horizontal Moments ScrollTrigger
  useEffect(() => {
    const section = momentsSectionRef.current;
    const track = momentsTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth, 1200)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const total = COMMUNITY_MOMENTS.length;
            const current = Math.min(
              total,
              Math.max(1, Math.round(self.progress * (total - 1)) + 1)
            );
            setMomentCounter(current);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020813] text-slate-100">
      {/* ====================================================================
          DEVFEST 3D BRACKETSFIELD CANVAS & IDLE AMBIENT SYSTEM (?lite=0 / ?lite=1)
         ==================================================================== */}
      <DevFestBracketsBackground />

      {/* ====================================================================
          1. CHENNAI & REACTJS PARALLAX HERO SECTION
         ==================================================================== */}
      <ChennaiReactParallaxHero />

      {/* ====================================================================
          2. INTERACTIVE 3D MASCOT PLAYGROUND (SKETCHFAB ROBOT PLAYGROUND INSPIRED)
         ==================================================================== */}
      <MascotPlaygroundSection />

      {/* ====================================================================
          3. REACTBITS INTERACTIVE STICKER PEEL SECTION
         ==================================================================== */}
      <InteractiveStickers />

      {/* ====================================================================
          4. CHENNAI REACT 1:1 EVENTS SECTION (BORDERLESS WITH LUMA LINK)
         ==================================================================== */}
      <UpcomingEvents defaultShowFallback={false} showTabs={false} />

      {/* ====================================================================
          5. DEVFEST & CHENNAI REACT FEATURED SPEAKERS SHOWCASE
         ==================================================================== */}
      <DevFestFeaturedSpeakers />

      {/* ====================================================================
          6. "OUR COMMUNITY." STACKED PHOTO EXPLORER (01 / 06) + STATS
         ==================================================================== */}
      <CommunityExplorer />

      {/* MetroCrossing Track Line Left */}
      <MetroCrossing direction="left" />

      {/* ====================================================================
          6. UNIFIED PHOTO SLIDER & VIDEO SLIDER (IDENTICAL SLIDER MOTION)
         ==================================================================== */}
      <section className="bg-[#020813] px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              WEBSITE_MAIN MEDIA SLIDERS · IDENTICAL SLIDER MOTION
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
              Photos & Videos <span className="ag-text-gradient">Sliders.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Photo Slider */}
            {activePhoto && (
              <div className="relative overflow-hidden rounded-3xl bg-[#091B32]/75 hover:bg-[#0F2744]/90 p-6 sm:p-7 backdrop-blur-md shadow-[0_12px_36px_rgba(2,8,19,0.55)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent"
                />

                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16202C] px-3 py-1 font-mono text-xs font-bold text-[#80D8FF]">
                    <Camera className="h-3.5 w-3.5 text-[#80D8FF]" />
                    <span>
                      PHOTOS · {String(photoIdx + 1).padStart(2, "0")}/
                      {String(photoItems.length).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepPhoto(-1)}
                      aria-label="Previous photo slide"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepPhoto(1)}
                      aria-label="Next photo slide"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813]">
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
                      className="flex min-h-[250px] cursor-grab flex-col justify-between p-6 active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#80D8FF]">
                        <span>
                          {activePhoto.eventTag} · {activePhoto.date}
                        </span>
                        <span>{activePhoto.location}</span>
                      </div>
                      <div className="my-4">
                        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                          {activePhoto.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                          {activePhoto.caption}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#C4EEFF]">
                          <ImageIcon className="h-3.5 w-3.5 text-[#80D8FF]" />
                          <span>website_main photo</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlayingPreviewVideo(false);
                            setPreviewProgress(0);
                            setPreviewModal({
                              id: activePhoto.id,
                              type: "photo",
                              title: activePhoto.title,
                              caption: activePhoto.caption,
                              date: activePhoto.date,
                              location: activePhoto.location,
                              imageSrc: resolveWebsiteMainAsset(
                                "gallery",
                                photoIdx,
                                activePhoto.thumbnailUrl
                              ),
                            });
                          }}
                          className="ag-btn-primary rounded-xl px-4 py-2 text-xs font-bold"
                        >
                          View Photo
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Video Slider (Identical Motion Variant to Photo Slider) */}
            {activeVideo && (
              <div className="relative overflow-hidden rounded-3xl bg-[#091B32]/75 hover:bg-[#0F2744]/90 p-6 sm:p-7 backdrop-blur-md shadow-[0_12px_36px_rgba(2,8,19,0.55)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent"
                />

                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16202C] px-3 py-1 font-mono text-xs font-bold text-[#C4EEFF]">
                    <Film className="h-3.5 w-3.5 text-[#C4EEFF]" />
                    <span>
                      VIDEOS · {String(videoIdx + 1).padStart(2, "0")}/
                      {String(videoItems.length).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepVideo(-1)}
                      aria-label="Previous video slide"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepVideo(1)}
                      aria-label="Next video slide"
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2744] via-[#091B32] to-[#020813]">
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
                      className="flex min-h-[250px] cursor-grab flex-col justify-between p-6 active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#80D8FF]">
                        <span>
                          {activeVideo.eventTag} · {activeVideo.duration}
                        </span>
                        <span>{activeVideo.location}</span>
                      </div>
                      <div className="my-4">
                        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                          {activeVideo.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                          {activeVideo.caption}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#C4EEFF]">
                          <Play className="h-3.5 w-3.5 fill-[#80D8FF] text-[#80D8FF]" />
                          <span>website_main video ({activeVideo.duration})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlayingPreviewVideo(true);
                            setPreviewProgress(25);
                            setPreviewModal({
                              id: activeVideo.id,
                              type: "video",
                              title: activeVideo.title,
                              caption: activeVideo.caption,
                              date: activeVideo.date,
                              location: activeVideo.location,
                              duration: activeVideo.duration,
                              imageSrc: resolveWebsiteMainAsset(
                                "gallery",
                                videoIdx,
                                activeVideo.thumbnailUrl
                              ),
                            });
                          }}
                          className="ag-btn-primary rounded-xl px-4 py-2 text-xs font-bold"
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
          7. ACETERNITY OPPOSITE DIRECTION HORIZONTAL SCROLL (TWEETS & LINKEDIN)
         ==================================================================== */}
      <AceternitySocialMarquee />

      {/* ====================================================================
          8. DSC VIT STYLE TEAM SECTION (DEPARTMENT FILTERS & HOLOGRAPHIC CARDS)
         ==================================================================== */}
      <VitStyleTeamSection />

      {/* ====================================================================
          9. DEVFEST VENUE HOSTS & PLATFORM SPONSORS SHOWCASE
         ==================================================================== */}
      <DevFestSponsorsShowcase />

      {/* ====================================================================
          10. "MAKE IT HAPPEN." DUAL CARDS, PREVIOUS SPONSORS & COMMUNITY PARTNERS
         ==================================================================== */}
      <ContributionAndPartners />

      {/* Connected Developer Platforms & Campus Hubs */}
      <section className="bg-[#051020] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-6 pt-10">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                  CONNECT &amp; BUILD EVERYWHERE
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                  Connected platforms &amp; ecosystems
                </h3>
              </div>
              <Link
                href="/platforms"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#80D8FF] hover:text-[#C4EEFF]"
              >
                <span>View all 17 platforms</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "TamilNadu.tech", handle: "tamilnadu.tech", url: "https://tamilnadu.tech", badge: "TN TECH HUB" },
                { name: "Luma", handle: "lu.ma/aigeeks", url: "https://lu.ma/aigeeks", badge: "CALENDAR" },
                { name: "Hack2skill", handle: "hack2skill.com", url: "https://hack2skill.com", badge: "HACKATHONS" },
                { name: "Devpost", handle: "devpost.com", url: "https://devpost.com", badge: "PROJECTS" },
                { name: "KnowAFest", handle: "knowafest.com", url: "https://www.knowafest.com", badge: "CAMPUS FESTS" },
                { name: "Unstop", handle: "unstop.com", url: "https://unstop.com", badge: "CHALLENGES" },
              ].map((plat) => (
                <a
                  key={plat.name}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl bg-[#091B32]/70 hover:bg-[#0F2744]/90 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_25px_rgba(2,8,19,0.5)] hover:shadow-[0_14px_35px_rgba(43,108,176,0.25)]"
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#80D8FF]">
                      {plat.badge}
                    </span>
                    <h4 className="mt-1.5 font-bold text-sm text-white group-hover:text-[#C4EEFF] transition-colors">
                      {plat.name}
                    </h4>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-400 truncate">
                      {plat.handle}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-[#80D8FF] opacity-60 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MetroCrossing Track Line Right */}
      <MetroCrossing direction="right" />

      {/* ====================================================================
          10. HORIZONTAL MOMENTS STRIP (01 / 14)
         ==================================================================== */}
      <section
        ref={momentsSectionRef}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#020813] py-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 px-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              THE MOMENTS WE SHARE
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
              Good times, <span className="ag-text-gradient">together.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 md:text-base">
              A little look back at the people and moments that make {SITE_CONFIG.shortName}.
            </p>
          </div>
          <span className="self-start rounded-full bg-[#091B32] px-4 py-1.5 font-mono text-xs text-[#80D8FF] md:self-end">
            Scroll to explore ↓
          </span>
        </div>

        <div className="my-auto flex flex-col items-center py-6 w-full overflow-hidden">
          {/* Authentic Clothesline Memory String */}
          <div className="w-full px-6 max-w-7xl">
            <svg
              className="w-full h-8 text-[#4DA8DA]/35 mb-2 pointer-events-none"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 16 Q500 98 1000 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div
            ref={momentsTrackRef}
            className="flex gap-6 px-6 md:px-12 will-change-transform"
          >
            {COMMUNITY_MOMENTS.map((moment, idx) => (
              <article
                key={moment.id}
                className="relative h-[350px] w-[280px] shrink-0 overflow-hidden rounded-3xl bg-[#091B32]/75 md:h-[400px] md:w-[350px] shadow-[0_14px_35px_rgba(2,8,19,0.7)]"
              >
                <img
                  src={resolveWebsiteMainAsset("moments", idx, moment.imageUrl)}
                  alt={moment.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#020813] via-[#051020]/75 to-transparent p-6">
                  <span className="font-mono text-xs font-bold text-[#80D8FF]">
                    {moment.number}
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {moment.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">{moment.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 font-mono text-sm">
          <p className="text-slate-300">
            Community moment{" "}
            <span className="font-bold text-[#C4EEFF]">
              {String(momentCounter).padStart(2, "0")}
            </span>{" "}
            — A moment from the {SITE_CONFIG.shortName} community.
          </p>
          <span className="rounded-xl bg-[#051020] px-4 py-2 font-extrabold text-[#C4EEFF]">
            {String(momentCounter).padStart(2, "0")} /{" "}
            {String(COMMUNITY_MOMENTS.length).padStart(2, "0")}
          </span>
        </div>
      </section>

      {/* ====================================================================
          11. UNIFIED PHOTO / VIDEO PREVIEW MODAL
         ==================================================================== */}
      <AnimatePresence>
        {previewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 p-4 backdrop-blur-2xl sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: UNIFIED_SLIDER_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl space-y-5 rounded-3xl bg-[#091B32]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_25px_60px_rgba(2,8,19,0.85)]"
            >
              <div className="flex items-start justify-between gap-4 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase text-[#80D8FF]">
                    {previewModal.type.toUpperCase()} · {previewModal.date} ·{" "}
                    {previewModal.location}
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold text-white">
                    {previewModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  aria-label="Close modal"
                  className="ag-btn-secondary rounded-xl p-2"
                >
                  <X className="h-4 w-4 text-[#C4EEFF]" />
                </button>
              </div>

              <div className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813] p-6 text-center">
                {previewModal.type === "video" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPlayingPreviewVideo((p) => !p)}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#020813]/85 text-[#C4EEFF]"
                    >
                      {isPlayingPreviewVideo ? (
                        <Pause className="h-7 w-7 text-[#80D8FF]" />
                      ) : (
                        <Play className="ml-0.5 h-7 w-7 fill-[#80D8FF] text-[#80D8FF]" />
                      )}
                    </button>
                    <p className="max-w-lg text-sm text-slate-200">
                      {previewModal.caption}
                    </p>
                    <div className="mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-[#020813]">
                      <div
                        style={{ width: `${previewProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#4DA8DA] to-[#C4EEFF] transition-all duration-200"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="mb-3 h-12 w-12 text-[#80D8FF]" />
                    <p className="max-w-lg text-sm text-slate-200">
                      {previewModal.caption}
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
