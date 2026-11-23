"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Play,
  Pause,
  Image as ImageIcon,
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Film,
  Camera,
  Sparkles,
  Maximize2,
  Volume2,
  SlidersHorizontal,
} from "lucide-react";
import { GALLERY_MEDIA, SITE_CONFIG } from "@/data/communityData";

// Identical slider motion physics shared across BOTH Photos and Videos
const SHARED_SLIDER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SHARED_SLIDER_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -140 : 140,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  }),
};

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");

  // Independent slider indices & directions for Photos and Videos (using identical motion)
  const [photoSlideIdx, setPhotoSlideIdx] = useState<number>(0);
  const [photoSlideDir, setPhotoSlideDir] = useState<number>(1);

  const [videoSlideIdx, setVideoSlideIdx] = useState<number>(0);
  const [videoSlideDir, setVideoSlideDir] = useState<number>(1);

  // Lightbox Slider State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState<number>(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(36);

  const photoItems = GALLERY_MEDIA.filter((m) => m.type === "photo");
  const videoItems = GALLERY_MEDIA.filter((m) => m.type === "video");

  const visibleMedia = GALLERY_MEDIA.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  const safePhotoIdx =
    photoItems.length > 0 ? photoSlideIdx % photoItems.length : 0;
  const activePhoto = photoItems[safePhotoIdx] || photoItems[0];

  const safeVideoIdx =
    videoItems.length > 0 ? videoSlideIdx % videoItems.length : 0;
  const activeVideo = videoItems[safeVideoIdx] || videoItems[0];

  const activeLightboxItem =
    lightboxIndex !== null ? visibleMedia[lightboxIndex] || null : null;

  const stepPhotoSlider = (dir: number) => {
    if (photoItems.length === 0) return;
    setPhotoSlideDir(dir);
    setPhotoSlideIdx((prev) =>
      dir > 0
        ? (prev + 1) % photoItems.length
        : prev - 1 < 0
        ? photoItems.length - 1
        : prev - 1
    );
  };

  const stepVideoSlider = (dir: number) => {
    if (videoItems.length === 0) return;
    setVideoSlideDir(dir);
    setVideoSlideIdx((prev) =>
      dir > 0
        ? (prev + 1) % videoItems.length
        : prev - 1 < 0
        ? videoItems.length - 1
        : prev - 1
    );
  };

  const stepLightboxSlider = (dir: number) => {
    if (lightboxIndex === null || visibleMedia.length === 0) return;
    setLightboxDirection(dir);
    setIsPlayingVideo(true);
    setVideoProgress(20);
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return dir > 0
        ? (prev + 1) % visibleMedia.length
        : prev - 1 < 0
        ? visibleMedia.length - 1
        : prev - 1;
    });
  };

  const openMediaInLightbox = (targetId: string) => {
    const idxInVisible = visibleMedia.findIndex((m) => m.id === targetId);
    if (idxInVisible !== -1) {
      setLightboxDirection(1);
      setIsPlayingVideo(true);
      setVideoProgress(25);
      setLightboxIndex(idxInVisible);
    } else {
      const idxInAll = GALLERY_MEDIA.findIndex((m) => m.id === targetId);
      setFilter("all");
      setLightboxDirection(1);
      setIsPlayingVideo(true);
      setVideoProgress(25);
      setLightboxIndex(idxInAll >= 0 ? idxInAll : 0);
    }
  };

  // Keyboard arrow & Escape support for Lightbox Slider
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") stepLightboxSlider(1);
      if (e.key === "ArrowLeft") stepLightboxSlider(-1);
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, visibleMedia.length]);

  // Smooth progress scrubber tick for active video in Lightbox
  useEffect(() => {
    if (
      !activeLightboxItem ||
      activeLightboxItem.type !== "video" ||
      !isPlayingVideo
    ) {
      return;
    }
    const interval = setInterval(() => {
      setVideoProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 350);
    return () => clearInterval(interval);
  }, [activeLightboxItem, isPlayingVideo]);

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      {/* Ambient Dark & Light Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[440px] w-[780px] rounded-full bg-gradient-to-bl from-[#4DA8DA]/25 via-[#163B63]/45 to-transparent blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-14">
        {/* ====================================================================
            1. PAGE HEADER & FILTER SWITCHER
           ==================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                THE MOMENTS WE SHARE · {SITE_CONFIG.name} PHOTO &amp; VIDEO SLIDERS
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Photos &amp; <span className="ag-text-gradient">Videos.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
              Browse meetup photographs and stage video replays using synchronized
              slider motion, drag gestures, and high-resolution previews.
            </p>
          </div>

          <div className="inline-flex rounded-2xl bg-[#051020]/90 p-1.5 backdrop-blur-xl self-start">
            {(
              [
                {
                  id: "all",
                  label: `All Media (${GALLERY_MEDIA.length})`,
                  icon: Sparkles,
                },
                {
                  id: "photo",
                  label: `Photos (${photoItems.length})`,
                  icon: Camera,
                },
                {
                  id: "video",
                  label: `Videos (${videoItems.length})`,
                  icon: Film,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilter(tab.id);
                    setLightboxIndex(null);
                  }}
                  className={`relative inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs uppercase transition-colors ${
 isSelected
 ? "text-[#020813] font-extrabold"
 : "text-slate-300 hover:text-[#C4EEFF]"
 }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="galleryTopFilterPill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C4EEFF] via-[#80D8FF] to-[#4DA8DA] shadow-[0_0_20px_rgba(128,216,255,0.45)]"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            2. DEDICATED PHOTO SLIDER (MOTION VARIANT A — IDENTICAL TO VIDEO SLIDER)
           ==================================================================== */}
        {(filter === "all" || filter === "photo") && activePhoto && (
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs font-bold uppercase">
                  <Camera className="h-3.5 w-3.5 text-[#80D8FF]" />
                  <span>PHOTO SLIDER · {activePhoto.eventTag}</span>
                </span>
                <span className="font-mono text-xs text-[#C4EEFF] font-bold">
                  {String(safePhotoIdx + 1).padStart(2, "0")} /{" "}
                  {String(photoItems.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepPhotoSlider(-1)}
                  aria-label="Previous photo slide"
                  className="ag-btn-secondary rounded-xl p-2.5"
                >
                  <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                </button>
                <button
                  type="button"
                  onClick={() => stepPhotoSlider(1)}
                  aria-label="Next photo slide"
                  className="ag-btn-secondary rounded-xl p-2.5"
                >
                  <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[290px] sm:min-h-[330px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813]">
              <AnimatePresence
                custom={photoSlideDir}
                initial={false}
                mode="wait"
              >
                <motion.div
                  key={activePhoto.id}
                  custom={photoSlideDir}
                  variants={SHARED_SLIDER_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: SHARED_SLIDER_EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) stepPhotoSlider(1);
                    if (info.offset.x > 60) stepPhotoSlider(-1);
                  }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 items-center min-h-[290px] sm:min-h-[330px] cursor-grab active:cursor-grabbing"
                >
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#80D8FF]">
                      <span>{activePhoto.date}</span>
                      <span>·</span>
                      <span>{activePhoto.location}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                      {activePhoto.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed">
                      {activePhoto.caption}
                    </p>
                    <button
                      type="button"
                      onClick={() => openMediaInLightbox(activePhoto.id)}
                      className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span>Open Full Photo Slider</span>
                    </button>
                  </div>

                  <div
                    onClick={() => openMediaInLightbox(activePhoto.id)}
                    className="lg:col-span-5 cursor-pointer rounded-2xl bg-[#020813]/75 p-8 flex flex-col items-center justify-center text-center group"
                  >
                    <ImageIcon className="h-14 w-14 text-[#80D8FF] group-hover:scale-110 transition-transform" />
                    <span className="mt-3 font-mono text-xs font-bold text-[#C4EEFF]">
                      PHOTO FRAME #{String(safePhotoIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-mono text-[10px] text-slate-400">
                      Drag left/right or click to inspect
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Photo Slide Dots */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {photoItems.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Go to photo ${i + 1}`}
                    onClick={() => {
                      setPhotoSlideDir(i > safePhotoIdx ? 1 : -1);
                      setPhotoSlideIdx(i);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
 i === safePhotoIdx
 ? "w-8 bg-gradient-to-r from-[#80D8FF] to-[#C4EEFF]"
 : "w-2.5 bg-[#163B63] hover:bg-[#4DA8DA]"
 }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#80D8FF]">
                SLIDER MOTION: HORIZONTAL + BLUR DISSOLVE
              </span>
            </div>
          </div>
        )}

        {/* ====================================================================
            3. DEDICATED VIDEO SLIDER (IDENTICAL MOTION VARIANT TO PHOTO SLIDER)
           ==================================================================== */}
        {(filter === "all" || filter === "video") && activeVideo && (
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#80D8FF] to-transparent"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs font-bold uppercase">
                  <Film className="h-3.5 w-3.5 text-[#C4EEFF]" />
                  <span>
                    VIDEO SLIDER · {activeVideo.eventTag} · {activeVideo.duration}
                  </span>
                </span>
                <span className="font-mono text-xs text-[#C4EEFF] font-bold">
                  {String(safeVideoIdx + 1).padStart(2, "0")} /{" "}
                  {String(videoItems.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepVideoSlider(-1)}
                  aria-label="Previous video slide"
                  className="ag-btn-secondary rounded-xl p-2.5"
                >
                  <ChevronLeft className="h-4 w-4 text-[#C4EEFF]" />
                </button>
                <button
                  type="button"
                  onClick={() => stepVideoSlider(1)}
                  aria-label="Next video slide"
                  className="ag-btn-secondary rounded-xl p-2.5"
                >
                  <ChevronRight className="h-4 w-4 text-[#C4EEFF]" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[290px] sm:min-h-[330px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2744] via-[#091B32] to-[#020813]">
              <AnimatePresence
                custom={videoSlideDir}
                initial={false}
                mode="wait"
              >
                <motion.div
                  key={activeVideo.id}
                  custom={videoSlideDir}
                  variants={SHARED_SLIDER_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: SHARED_SLIDER_EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) stepVideoSlider(1);
                    if (info.offset.x > 60) stepVideoSlider(-1);
                  }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 items-center min-h-[290px] sm:min-h-[330px] cursor-grab active:cursor-grabbing"
                >
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#80D8FF]">
                      <span>{activeVideo.date}</span>
                      <span>·</span>
                      <span>{activeVideo.location}</span>
                      {activeVideo.duration && (
                        <>
                          <span>·</span>
                          <span className="text-[#C4EEFF] font-bold">
                            {activeVideo.duration}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                      {activeVideo.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed">
                      {activeVideo.caption}
                    </p>
                    <button
                      type="button"
                      onClick={() => openMediaInLightbox(activeVideo.id)}
                      className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm"
                    >
                      <Play className="h-4 w-4 fill-[#020813]" />
                      <span>Play Video in Cinema Slider</span>
                    </button>
                  </div>

                  <div
                    onClick={() => openMediaInLightbox(activeVideo.id)}
                    className="lg:col-span-5 cursor-pointer rounded-2xl bg-[#020813]/75 p-8 flex flex-col items-center justify-center text-center group"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#163B63]/80 text-[#C4EEFF] shadow-[0_0_30px_rgba(128,216,255,0.5)] group-hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 fill-[#C4EEFF] ml-0.5" />
                    </div>
                    <span className="mt-3 font-mono text-xs font-bold text-[#C4EEFF]">
                      VIDEO REEL #{String(safeVideoIdx + 1).padStart(2, "0")} ·{" "}
                      {activeVideo.duration}
                    </span>
                    <span className="mt-1 font-mono text-[10px] text-slate-400">
                      Drag left/right or click to launch player
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Video Slide Dots */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {videoItems.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-label={`Go to video ${i + 1}`}
                    onClick={() => {
                      setVideoSlideDir(i > safeVideoIdx ? 1 : -1);
                      setVideoSlideIdx(i);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
 i === safeVideoIdx
 ? "w-8 bg-gradient-to-r from-[#80D8FF] to-[#C4EEFF]"
 : "w-2.5 bg-[#163B63] hover:bg-[#4DA8DA]"
 }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#80D8FF]">
                SLIDER MOTION: IDENTICAL HORIZONTAL + BLUR DISSOLVE
              </span>
            </div>
          </div>
        )}

        {/* ====================================================================
            4. FILTERABLE GALLERY GRID (PHOTOS & VIDEOS)
           ==================================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              <SlidersHorizontal className="h-4 w-4 text-[#C4EEFF]" />
              <span>COMPLETE ARCHIVE GRID · CLICK ANY ITEM FOR SLIDER VIEW</span>
            </div>
          </div>

          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              <AnimatePresence mode="popLayout">
                {visibleMedia.map((item, idx) => (
                  <motion.button
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -14 }}
                    transition={{ duration: 0.32, delay: idx * 0.03 }}
                    type="button"
                    onClick={() => {
                      setLightboxDirection(1);
                      setIsPlayingVideo(true);
                      setLightboxIndex(idx);
                    }}
                    className="glass-panel group text-left rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="relative h-60 w-full bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813] flex items-center justify-center overflow-hidden">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,216,255,0.24),transparent_70%)] opacity-75 group-hover:opacity-100 transition-opacity" />

                      {item.type === "video" ? (
                        <div className="relative z-10 flex h-15 w-15 items-center justify-center rounded-full bg-[#020813]/85 text-[#80D8FF] shadow-[0_0_25px_rgba(128,216,255,0.45)] group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 fill-[#80D8FF] ml-0.5" />
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col items-center gap-2 text-[#C4EEFF]/85 group-hover:scale-110 transition-transform">
                          <ImageIcon className="h-10 w-10 text-[#80D8FF]" />
                          <span className="font-mono text-[11px] uppercase tracking-widest">
                            Photo {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      <span className="ag-badge-cyan absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                        {item.eventTag}
                      </span>

                      {item.duration ? (
                        <span className="absolute bottom-4 right-4 rounded-lg bg-[#020813]/90 px-2.5 py-1 font-mono text-xs text-[#C4EEFF]">
                          {item.duration}
                        </span>
                      ) : (
                        <span className="absolute bottom-4 right-4 rounded-lg bg-[#020813]/80 px-2.5 py-1 font-mono text-[10px] uppercase text-[#80D8FF]">
                          HD PHOTO
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-white group-hover:text-[#C4EEFF] transition-colors">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 flex items-center justify-between font-mono text-[11px] text-slate-400">
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
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>

        {/* ====================================================================
            5. FULL-SCREEN SLIDER LIGHTBOX FOR BOTH PHOTOS & VIDEOS
           ==================================================================== */}
        <AnimatePresence>
          {activeLightboxItem && lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/92 backdrop-blur-2xl p-4 sm:p-6"
              onClick={() => setLightboxIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 18 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 18 }}
                transition={{ duration: 0.28, ease: SHARED_SLIDER_EASE }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-3xl p-6 md:p-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
                />

                <div className="flex items-start justify-between gap-4 pb-4">
                  <div>
                    <span className="font-mono text-xs uppercase text-[#80D8FF]">
                      {activeLightboxItem.type.toUpperCase()} SLIDER ·{" "}
                      {activeLightboxItem.eventTag} · {activeLightboxItem.date} ·{" "}
                      {activeLightboxItem.location}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                      {activeLightboxItem.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="ag-btn-secondary rounded-xl p-2"
                  >
                    <X className="h-5 w-5 text-[#C4EEFF]" />
                  </button>
                </div>

                <div className="relative my-6 h-72 sm:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B63] via-[#091B32] to-[#020813]">
                  <AnimatePresence
                    custom={lightboxDirection}
                    initial={false}
                    mode="wait"
                  >
                    <motion.div
                      key={activeLightboxItem.id}
                      custom={lightboxDirection}
                      variants={SHARED_SLIDER_VARIANTS}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: SHARED_SLIDER_EASE }}
                      className="flex h-full w-full flex-col items-center justify-center p-6 text-center relative"
                    >
                      {activeLightboxItem.type === "video" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsPlayingVideo((p) => !p)}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#020813]/85 text-[#C4EEFF] shadow-[0_0_35px_rgba(128,216,255,0.5)] mb-4 hover:scale-105 transition-transform"
                          >
                            {isPlayingVideo ? (
                              <Pause className="h-7 w-7 text-[#80D8FF]" />
                            ) : (
                              <Play className="h-7 w-7 fill-[#80D8FF] ml-0.5" />
                            )}
                          </button>
                          <p className="text-base sm:text-lg font-extrabold text-white">
                            {activeLightboxItem.title} (
                            {activeLightboxItem.duration})
                          </p>
                          <p className="mt-2 max-w-lg text-xs sm:text-sm text-slate-300">
                            {activeLightboxItem.caption}
                          </p>

                          <div className="absolute inset-x-6 bottom-5 rounded-xl bg-[#020813]/90 px-4 py-2.5 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setIsPlayingVideo((p) => !p)}
                              className="text-[#C4EEFF]"
                            >
                              {isPlayingVideo ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                            <div
                              onClick={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                const pct = Math.round(
                                  ((e.clientX - rect.left) / rect.width) * 100
                                );
                                setVideoProgress(
                                  Math.max(0, Math.min(100, pct))
                                );
                              }}
                              className="h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-[#091B32]"
                            >
                              <div
                                style={{ width: `${videoProgress}%` }}
                                className="h-full rounded-full bg-gradient-to-r from-[#4DA8DA] via-[#80D8FF] to-[#C4EEFF] transition-all duration-200"
                              />
                            </div>
                            <Volume2 className="h-4 w-4 text-[#80D8FF]" />
                            <span className="font-mono text-[11px] text-[#C4EEFF]">
                              {activeLightboxItem.duration}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-14 w-14 text-[#80D8FF] mb-4" />
                          <p className="text-base sm:text-lg font-extrabold text-white">
                            {activeLightboxItem.title}
                          </p>
                          <p className="mt-2 max-w-lg text-xs sm:text-sm text-slate-300">
                            {activeLightboxItem.caption}
                          </p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Filmstrip & Prev/Next Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
                    {visibleMedia.map((thumb, idx) => {
                      const active = idx === lightboxIndex;
                      return (
                        <button
                          key={thumb.id}
                          type="button"
                          onClick={() => {
                            setLightboxDirection(
                              idx > lightboxIndex ? 1 : -1
                            );
                            setLightboxIndex(idx);
                          }}
                          className={`rounded-xl px-3 py-1.5 font-mono text-[11px] transition-all ${
 active
 ? "bg-[#163B63] text-[#C4EEFF] font-bold"
 : "bg-[#051020] text-slate-400 hover:text-white"
 }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => stepLightboxSlider(-1)}
                      className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Prev</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => stepLightboxSlider(1)}
                      className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
