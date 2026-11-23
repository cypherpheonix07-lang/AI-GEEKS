"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface StickerItem {
  id: string;
  label: string;
  subtitle: string;
  emoji: string;
  rotation: number;
  bgGradient: string;
  textColor: string;
}

const STICKERS: StickerItem[] = [
  {
    id: "st-01",
    label: "React 19",
    subtitle: "RSC & Server Actions",
    emoji: "⚛️",
    rotation: -6,
    bgGradient: "from-[#163B63] to-[#091B32]",
    textColor: "text-[#80D8FF]",
  },
  {
    id: "st-02",
    label: "AI GEEKS",
    subtitle: "Chennai Chapter",
    emoji: "🚀",
    rotation: 4,
    bgGradient: "from-[#2B6CB0] to-[#163B63]",
    textColor: "text-white",
  },
  {
    id: "st-03",
    label: "Vanakkam Devs",
    subtitle: "Made in Chennai",
    emoji: "✳️",
    rotation: -3,
    bgGradient: "from-[#0F2744] to-[#020813]",
    textColor: "text-[#C4EEFF]",
  },
  {
    id: "st-04",
    label: "Pure Software",
    subtitle: "24h Hackathon",
    emoji: "⚡",
    rotation: 7,
    bgGradient: "from-[#163B63] to-[#2B6CB0]",
    textColor: "text-[#80D8FF]",
  },
  {
    id: "st-05",
    label: "Next.js 16",
    subtitle: "Turbopack Engine",
    emoji: "▲",
    rotation: -5,
    bgGradient: "from-[#091B32] to-[#051020]",
    textColor: "text-white",
  },
  {
    id: "st-06",
    label: "Agent Swarms",
    subtitle: "Autonomous Triage",
    emoji: "🤖",
    rotation: 5,
    bgGradient: "from-[#2B6CB0] to-[#0F2744]",
    textColor: "text-[#C4EEFF]",
  },
];

export default function InteractiveStickers() {
  const [peeledId, setPeeledId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#051020] py-16 px-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#80D8FF] backdrop-blur-md mb-2 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
              <Sparkles className="h-3 w-3 text-[#80D8FF]" />
              <span>REACTBITS · INTERACTIVE STICKER PEEL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Community <span className="ag-text-gradient">Stickers.</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Drag, tilt, and peel stickers around the screen ↗
          </p>
        </div>

        {/* Sticker Cloud */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 py-4">
          {STICKERS.map((st) => {
            const isPeeled = peeledId === st.id;
            return (
              <motion.div
                key={st.id}
                drag
                dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                dragElastic={0.3}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setPeeledId(st.id)}
                onHoverEnd={() => setPeeledId(null)}
                style={{ rotate: st.rotation }}
                className={`group relative cursor-grab active:cursor-grabbing select-none rounded-2xl bg-gradient-to-br ${st.bgGradient} p-4 sm:p-5 shadow-[0_12px_30px_rgba(2,8,19,0.7)] transition-shadow duration-200 hover:shadow-[0_20px_45px_rgba(43,108,176,0.35)]`}
              >
                {/* 3D Peel Curl Top Corner */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 right-0 h-6 w-6 rounded-bl-xl bg-white/20 backdrop-blur-md transition-all duration-300 ${
                    isPeeled ? "h-8 w-8 bg-white/35" : ""
                  }`}
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{st.emoji}</span>
                  <div>
                    <strong className={`block text-sm sm:text-base font-extrabold ${st.textColor}`}>
                      {st.label}
                    </strong>
                    <span className="block font-mono text-[10px] text-slate-300">
                      {st.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
