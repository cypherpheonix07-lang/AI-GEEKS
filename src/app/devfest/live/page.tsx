"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Radio, Users, MessageSquare, Heart, Flame, Sparkles, Send, Play } from "lucide-react";

export default function DevFestLivePage() {
  const [activeStage, setActiveStage] = useState<string>("main");
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const [chatMessages, setChatMessages] = useState<
    { id: number; author: string; text: string; time: string }[]
  >([
    { id: 1, author: "Priya S.", text: "The keynote on Next.js 16 and agent swarms is incredible!", time: "10:14 AM" },
    { id: 2, author: "Karthik R.", text: "Audio quality and stage lighting at IITM is top notch 🔥", time: "10:15 AM" },
    { id: 3, author: "Divya N.", text: "Hello from the Hall B AI workshop track!", time: "10:17 AM" },
  ]);
  const [newMsg, setNewMsg] = useState("");

  const triggerReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = Math.random() * 80 + 10;
    setReactions((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        text: newMsg.trim(),
        time: "Just now",
      },
    ]);
    setNewMsg("");
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 font-mono text-xs font-bold text-rose-400 mb-2">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>DEVFEST LIVE · MULTI-STAGE BROADCAST</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Live Conference Stream
          </h1>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex items-center gap-2">
          {[
            { id: "main", label: "Auditorium 1 (Main Stage)" },
            { id: "hall-a", label: "Hall A (AI & Cloud)" },
            { id: "hall-b", label: "Hall B (Frontend & Mobile)" },
          ].map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(stage.id)}
              className={`rounded-xl px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                activeStage === stage.id
                  ? "bg-[#2B6CB0] text-white shadow-[0_0_15px_rgba(43,108,176,0.4)]"
                  : "bg-[#051020]/80 text-slate-400 hover:text-white"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Broadcast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stream Viewport (Left Col) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#051020] shadow-[0_20px_50px_rgba(2,8,19,0.8)] border border-blue-500/10 flex items-center justify-center">
            {/* Background stage simulation */}
            <img
              src="/archive/2025-full-house.webp"
              alt="Stage stream"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/illustrations/footer_chennai.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/40 to-transparent" />

            {/* Live badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-rose-600 px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-lg">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span>LIVE</span>
              </span>
              <span className="rounded-md bg-[#020813]/80 px-2 py-1 font-mono text-[10px] text-slate-300 backdrop-blur-md">
                1,148 Viewers
              </span>
            </div>

            {/* Center Play Overlay */}
            <div className="relative z-10 flex flex-col items-center text-center p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2B6CB0]/80 text-white backdrop-blur-md shadow-[0_0_30px_rgba(43,108,176,0.5)] mb-3">
                <Play className="h-7 w-7 fill-white ml-1" />
              </div>
              <span className="font-mono text-sm font-bold text-white">
                Auditorium 1 · Keynote Broadcast
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Swaathi Kakarla · "Engineering Applied AI Systems at Scale"
              </span>
            </div>

            {/* Floating Reactions Canvas */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {reactions.map((r) => (
                <span
                  key={r.id}
                  style={{ left: `${r.left}%` }}
                  className="absolute bottom-6 text-3xl animate-float-up select-none"
                >
                  {r.emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Reaction Bar */}
          <div className="rounded-2xl bg-[#051020]/80 p-4 backdrop-blur-md flex items-center justify-between shadow-[0_8px_25px_rgba(2,8,19,0.6)]">
            <span className="font-mono text-xs text-slate-300">Live Reactions:</span>
            <div className="flex items-center gap-3">
              {[
                { emoji: "🔥", label: "Fire" },
                { emoji: "👏", label: "Clap" },
                { emoji: "🚀", label: "Rocket" },
                { emoji: "❤️", label: "Love" },
                { emoji: "💡", label: "Idea" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => triggerReaction(btn.emoji)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#091B32] text-xl transition-transform hover:scale-125 active:scale-95"
                >
                  {btn.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Chat (Right Col) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#051020]/90 p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)] flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b-0 mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#80D8FF]" />
              <span className="font-mono text-xs font-bold text-white">CONFERENCE CHAT</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="rounded-xl bg-[#091B32]/60 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#80D8FF]">{msg.author}</span>
                  <span className="font-mono text-[9px] text-slate-500">{msg.time}</span>
                </div>
                <p className="text-slate-300">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="mt-4 pt-3 flex gap-2 border-t-0">
            <input
              type="text"
              placeholder="Send a message to the room..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="ag-input-metallic flex-1 px-3 py-2 text-xs rounded-xl"
            />
            <button
              type="submit"
              className="ag-btn-primary flex h-9 w-9 items-center justify-center rounded-xl"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
