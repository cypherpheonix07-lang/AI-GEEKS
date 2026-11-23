"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Volume2,
  VolumeX,
  Play,
  RotateCw,
  Cpu,
  Zap,
  Activity,
  Smile,
  Brain,
  PartyPopper,
  Moon,
} from "lucide-react";
import { DevFestBot3DMascot, MascotMood } from "@/components/home/DevFestBot3DMascot";
import { SITE_CONFIG } from "@/data/communityData";

export default function MascotPlaygroundSection() {
  const [selectedMood, setSelectedMood] = useState<MascotMood>("excited");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [accentColor, setAccentColor] = useState<"cyan" | "azure" | "mint" | "amber">("cyan");

  const MOOD_ACTIONS: Array<{
    id: MascotMood;
    label: string;
    icon: React.ElementType;
    desc: string;
  }> = [
    { id: "excited", label: "Wave 👋", icon: Smile, desc: "Greeting Chennai builders" },
    { id: "celebrate", label: "Celebrate 🎉", icon: PartyPopper, desc: "Hackathon win sequence" },
    { id: "thinking", label: "Deep Think 🧠", icon: Brain, desc: "Analyzing multi-agent graphs" },
    { id: "idle", label: "Pulse ⚡", icon: Zap, desc: "Standard standby mode" },
    { id: "sleep", label: "Recharge 💤", icon: Moon, desc: "Energy saving overnight" },
  ];

  return (
    <section
      id="mascot-playground"
      className="relative overflow-hidden bg-[#051020] py-24 px-6 text-slate-100"
    >
      {/* Specular Ambient Top Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/50 to-transparent"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/4 h-[380px] w-[600px] rounded-full bg-gradient-to-tr from-[#163B63]/40 via-[#4DA8DA]/20 to-transparent blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
            <Bot className="h-3.5 w-3.5 text-[#80D8FF]" />
            <span>INTERACTIVE 3D MASCOT PLAYGROUND</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Meet the <span className="ag-text-gradient">AI Geeks Mascot.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Inspired by 3D robot playgrounds. Move your cursor to tilt the 3D chassis, track eyes, trigger animations, and synthesize audio feedback.
          </p>
        </div>

        {/* 3D Stage & Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#091B32]/65 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_18px_50px_rgba(2,8,19,0.7)]">
          {/* Left Column: Interactive 3D Mascot Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[420px] relative bg-[#020813]/60 rounded-3xl p-6 sm:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
            {/* Viewport Top Meta HUD */}
            <div className="w-full flex items-center justify-between font-mono text-[11px] text-slate-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">DEVFESTBOT V2.4</span>
              </div>
              <div className="flex items-center gap-3">
                <span>FPS: 60</span>
                <span>BATTERY: 99%</span>
                <button
                  type="button"
                  onClick={() => setSoundEnabled((v) => !v)}
                  className="hover:text-[#80D8FF] transition-colors"
                  title={soundEnabled ? "Mute chimes" : "Enable chimes"}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-[#80D8FF]" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {/* The 3D Mascot Canvas Component */}
            <div className="py-6 flex items-center justify-center w-full">
              <DevFestBot3DMascot
                activeTab={selectedMood === "thinking" ? "qa" : selectedMood === "celebrate" ? "badge" : "overview"}
                soundEnabled={soundEnabled}
              />
            </div>

            {/* Bottom Interaction Tip */}
            <div className="text-center font-mono text-xs text-slate-400 mt-2">
              <span>Click mascot or select actions to change state</span>
            </div>
          </div>

          {/* Right Column: Playground Control Console */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                ANIMATION &amp; MOOD TRIGGERS
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">
                Playground Controls
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Trigger state machines, audio feedback, and expression changes.
              </p>
            </div>

            {/* Mood Action Buttons */}
            <div className="flex flex-col gap-2.5">
              {MOOD_ACTIONS.map((action) => {
                const Icon = action.icon;
                const isActive = selectedMood === action.id;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => setSelectedMood(action.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 text-left ${
                      isActive
                        ? "ag-btn-primary shadow-[0_6px_20px_rgba(43,108,176,0.4)]"
                        : "bg-[#020813]/60 hover:bg-[#163B63]/60 text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                          isActive ? "bg-white/20 text-white" : "bg-[#091B32] text-[#80D8FF]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="block text-xs sm:text-sm font-bold">
                          {action.label}
                        </strong>
                        <span className="block text-[11px] opacity-80">
                          {action.desc}
                        </span>
                      </div>
                    </div>
                    <Play className="h-3.5 w-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>

            {/* Color Accent Themes */}
            <div className="pt-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF] block mb-2">
                SPECTRAL AURA
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "cyan", label: "Sky Cyan", bg: "bg-[#80D8FF]" },
                  { id: "azure", label: "Cobalt", bg: "bg-[#2B6CB0]" },
                  { id: "mint", label: "Mint", bg: "bg-[#4DA8DA]" },
                  { id: "amber", label: "Amber", bg: "bg-[#F59E0B]" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setAccentColor(th.id as any)}
                    className={`py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition ${
                      accentColor === th.id
                        ? "bg-[#163B63] text-white font-bold shadow-[0_4px_12px_rgba(43,108,176,0.35)]"
                        : "bg-[#020813]/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${th.bg}`} />
                    <span>{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Robot Diagnostic Status */}
            <div className="rounded-2xl bg-[#020813]/70 p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>INFERENCE ENGINE</span>
                <span className="text-[#80D8FF]">React 19 + Framer 12</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>COMMUNITY BASE</span>
                <span className="text-[#C4EEFF]">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
