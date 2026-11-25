"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, QrCode, Download, Share2, Shield, User, Mail, Building } from "lucide-react";

export default function DevFestProfilePage() {
  const [name, setName] = useState("Phanindra Puli");
  const [company, setCompany] = useState("AI GEEKS Community");
  const [role, setRole] = useState("Full-Stack AI Architect");
  const [accentColor, setAccentColor] = useState("#80D8FF");

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>ATTENDEE BADGE STUDIO · DEVFEST CHENNAI 2026</span>
        </div>
        <h1 className="text-3xl font-black text-white">Your Digital Conference Badge</h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Customize your official attendee credential. Use the QR code at registration counters for instant entry at IIT Madras Research Park.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Form Controls */}
        <div className="rounded-3xl bg-[#051020]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)] space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Badge Customization</h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Company / College</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Professional Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Chassis Accent Color</label>
            <div className="flex gap-2">
              {["#80D8FF", "#4DA8DA", "#34A853", "#FBBC04", "#EA4335", "#A78BFA"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccentColor(c)}
                  style={{ backgroundColor: c }}
                  className={`h-7 w-7 rounded-full transition-transform ${
                    accentColor === c ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Badge Preview */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#091B32] via-[#051020] to-[#020813] p-6 shadow-[0_25px_60px_rgba(2,8,19,0.9)] border border-blue-500/20 text-center font-mono">
            {/* Lanyard Slot */}
            <div className="mx-auto mb-4 h-3 w-16 rounded-full bg-[#020813] border border-blue-500/30" />

            {/* Badge Header */}
            <div className="flex items-center justify-between text-[10px] text-[#80D8FF] mb-4">
              <span>DEVFEST CHENNAI</span>
              <span>OCT 17, 2026</span>
            </div>

            {/* Avatar simulation */}
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#091B32] text-3xl shadow-[0_0_20px_rgba(43,108,176,0.3)]">
              🚀
            </div>

            <h2 className="text-xl font-black text-white">{name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{role}</p>
            <span
              style={{ color: accentColor }}
              className="inline-block text-[11px] font-bold mt-1"
            >
              {company}
            </span>

            {/* QR simulation */}
            <div className="my-5 mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-2">
              <QrCode className="h-full w-full text-[#020813]" />
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-500 pt-3 border-t border-blue-500/15">
              <span>VENUE: IITM RESEARCH PARK</span>
              <span className="text-emerald-400 font-bold">ALL-ACCESS</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => alert("Badge downloaded to device.")}
              className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Badge</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Badge link copied to clipboard.")}
              className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
