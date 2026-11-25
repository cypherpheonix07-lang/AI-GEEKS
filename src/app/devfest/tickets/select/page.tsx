"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ticket, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { DEVFEST_TICKETS } from "@/data/devfestData";

export default function TicketSelectPage() {
  const [profile, setProfile] = useState<"professional" | "student">("professional");
  const [diversity, setDiversity] = useState<"general" | "diverse">("general");

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/devfest/tickets"
        className="inline-flex items-center gap-2 font-mono text-xs text-[#80D8FF] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Tickets Overview</span>
      </Link>

      <div className="rounded-3xl bg-[#051020]/90 p-8 sm:p-12 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-mono text-xs font-bold uppercase text-[#80D8FF] block mb-2">
            STEP 1 OF 2 · PROFILE SELECTION
          </span>
          <h1 className="text-3xl font-black text-white">Select Your Ticket Type</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Tell us about yourself so we can match you with the right pass and community discount tier.
          </p>
        </div>

        {/* Profile Selector */}
        <div className="space-y-6 max-w-lg mx-auto">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
              I am joining as a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProfile("professional")}
                className={`rounded-2xl p-4 font-mono text-xs font-bold transition-all text-left ${
                  profile === "professional"
                    ? "bg-[#2B6CB0] text-white shadow-[0_0_20px_rgba(43,108,176,0.4)]"
                    : "bg-[#091B32] text-slate-300 hover:bg-[#163B63]"
                }`}
              >
                <span className="text-base block mb-1">💼</span>
                <span>Professional / Working Dev</span>
              </button>

              <button
                type="button"
                onClick={() => setProfile("student")}
                className={`rounded-2xl p-4 font-mono text-xs font-bold transition-all text-left ${
                  profile === "student"
                    ? "bg-[#2B6CB0] text-white shadow-[0_0_20px_rgba(43,108,176,0.4)]"
                    : "bg-[#091B32] text-slate-300 hover:bg-[#163B63]"
                }`}
              >
                <span className="text-base block mb-1">🎓</span>
                <span>College / University Student</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
              Community Track:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiversity("general")}
                className={`rounded-2xl p-4 font-mono text-xs font-bold transition-all text-left ${
                  diversity === "general"
                    ? "bg-[#2B6CB0] text-white shadow-[0_0_20px_rgba(43,108,176,0.4)]"
                    : "bg-[#091B32] text-slate-300 hover:bg-[#163B63]"
                }`}
              >
                <span className="text-base block mb-1">🎟️</span>
                <span>General Access</span>
              </button>

              <button
                type="button"
                onClick={() => setDiversity("diverse")}
                className={`rounded-2xl p-4 font-mono text-xs font-bold transition-all text-left ${
                  diversity === "diverse"
                    ? "bg-[#2B6CB0] text-white shadow-[0_0_20px_rgba(43,108,176,0.4)]"
                    : "bg-[#091B32] text-slate-300 hover:bg-[#163B63]"
                }`}
              >
                <span className="text-base block mb-1">🌸</span>
                <span>Women in Tech / Diversity</span>
              </button>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href={`/devfest/tickets?tier=${
                diversity === "diverse"
                  ? "women-diverse"
                  : profile === "student"
                  ? "early-bird-student"
                  : "pro-general"
              }`}
              className="ag-btn-primary w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold"
            >
              <span>View Matched Passes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
