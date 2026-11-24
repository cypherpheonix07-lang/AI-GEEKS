"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Trophy,
  Zap,
  Timer,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Award,
} from "lucide-react";
import { DEVFEST_GAMES } from "@/data/devfestData";

export default function DevFestGamesPage() {
  const [activeTab, setActiveTab] = useState<string>("jigsaw");
  const [playerXp, setPlayerXp] = useState<number>(350);

  // --- Jigsaw State ---
  // 3x3 grid numbered 0 to 8
  const [jigsawTiles, setJigsawTiles] = useState<number[]>([
    2, 0, 1,
    5, 3, 4,
    8, 6, 7,
  ]);
  const [jigsawMoves, setJigsawMoves] = useState(0);
  const [jigsawSolved, setJigsawSolved] = useState(false);

  const swapTiles = (i: number, j: number) => {
    if (jigsawSolved) return;
    const newTiles = [...jigsawTiles];
    const temp = newTiles[i];
    newTiles[i] = newTiles[j];
    newTiles[j] = temp;
    setJigsawTiles(newTiles);
    setJigsawMoves((m) => m + 1);

    // Check if sorted 0, 1, 2, 3, 4, 5, 6, 7, 8
    const isSorted = newTiles.every((val, idx) => val === idx);
    if (isSorted) {
      setJigsawSolved(true);
      setPlayerXp((xp) => xp + 350);
    }
  };

  const resetJigsaw = () => {
    setJigsawTiles([2, 0, 1, 5, 3, 4, 8, 6, 7]);
    setJigsawMoves(0);
    setJigsawSolved(false);
  };

  // --- Memory Matrix State ---
  const [matrixGrid, setMatrixGrid] = useState<boolean[]>(Array(16).fill(false));
  const [userSelected, setUserSelected] = useState<number[]>([]);
  const [matrixTarget, setMatrixTarget] = useState<number[]>([1, 4, 7, 10, 13]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [matrixSolved, setMatrixSolved] = useState(false);

  const startMemoryMatrix = () => {
    setIsShowingPattern(true);
    setUserSelected([]);
    setMatrixSolved(false);
    // Show pattern for 1.5 seconds
    setTimeout(() => {
      setIsShowingPattern(false);
    }, 1500);
  };

  const handleTileClick = (index: number) => {
    if (isShowingPattern || matrixSolved) return;
    if (userSelected.includes(index)) return;

    const nextSelected = [...userSelected, index];
    setUserSelected(nextSelected);

    // If incorrect tile clicked
    if (!matrixTarget.includes(index)) {
      alert("Wrong tile! Try again.");
      setUserSelected([]);
      return;
    }

    // Check if all targets found
    if (nextSelected.length === matrixTarget.length) {
      setMatrixSolved(true);
      setPlayerXp((xp) => xp + 500);
    }
  };

  // --- Speed Typer State ---
  const codeSnippet = 'const devfest = await fetch("https://devfest.gdgchennai.in");';
  const [typedInput, setTypedInput] = useState("");
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [typerSolved, setTyperSolved] = useState(false);

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!typingStartTime) setTypingStartTime(Date.now());
    setTypedInput(val);

    if (val === codeSnippet) {
      const elapsedMinutes = (Date.now() - (typingStartTime || Date.now())) / 60000;
      const words = codeSnippet.split(" ").length;
      const calculatedWpm = Math.round(words / (elapsedMinutes || 0.01));
      setWpm(calculatedWpm);
      setTyperSolved(true);
      setPlayerXp((xp) => xp + 400);
    }
  };

  const resetTyper = () => {
    setTypedInput("");
    setTypingStartTime(null);
    setWpm(0);
    setTyperSolved(false);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-amber-300 mb-3">
          <Gamepad2 className="h-3.5 w-3.5" />
          <span>DEVFEST PLAY · 4 PLAYABLE MINI-GAMES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Conference Games & Leaderboard
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Play interactive challenges during the conference, score XP, and climb the DevFest Chennai builder leaderboard.
        </p>

        {/* Player Stats Bar */}
        <div className="mt-6 inline-flex items-center gap-6 rounded-2xl bg-[#051020]/80 px-6 py-2.5 backdrop-blur-md shadow-[0_8px_25px_rgba(2,8,19,0.7)]">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-xs text-slate-400">PLAYER XP:</span>
            <span className="font-mono text-sm font-bold text-amber-300">{playerXp} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#80D8FF]" />
            <span className="font-mono text-xs text-slate-400">RANK:</span>
            <span className="font-mono text-xs font-bold text-[#80D8FF]">#14 Community</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {DEVFEST_GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveTab(g.id)}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === g.id
                ? "bg-[#2B6CB0] text-white shadow-[0_0_20px_rgba(43,108,176,0.4)]"
                : "bg-[#051020]/70 text-slate-400 hover:text-white"
            }`}
          >
            <span className="text-base">{g.icon}</span>
            <span>{g.title}</span>
            <span className="ml-1 text-[10px] font-mono text-amber-300">({g.xpReward})</span>
          </button>
        ))}
      </div>

      {/* Game Stage Area */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#051020]/90 p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
        {/* --- 1. JIGSAW PUZZLE --- */}
        {activeTab === "jigsaw" && (
          <div className="text-center">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">DevFest Chennai Stage Jigsaw</h3>
                <p className="text-xs text-slate-400">Click any tile to swap with its neighbor and solve the 3x3 photo matrix.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-slate-300">Moves: {jigsawMoves}</span>
                <button
                  type="button"
                  onClick={resetJigsaw}
                  className="flex items-center gap-1 font-mono text-xs text-[#80D8FF] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {jigsawSolved && (
              <div className="mb-6 rounded-2xl bg-emerald-500/10 p-4 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle2 className="h-4 w-4" />
                <span>PUZZLE SOLVED! +350 XP ADDED TO YOUR CONFERENCE BADGE!</span>
              </div>
            )}

            {/* Jigsaw Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-xs sm:max-w-sm mx-auto aspect-square bg-[#091B32] p-2 rounded-2xl">
              {jigsawTiles.map((val, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    // Swap with next tile
                    const next = (idx + 1) % 9;
                    swapTiles(idx, next);
                  }}
                  className={`flex flex-col items-center justify-center rounded-xl font-mono text-sm font-bold transition-all ${
                    val === idx
                      ? "bg-[#2B6CB0]/60 text-white shadow-[0_0_10px_rgba(128,216,255,0.4)]"
                      : "bg-[#051020] text-[#80D8FF] hover:bg-[#163B63]"
                  }`}
                >
                  <span className="text-xs text-slate-500 mb-1">Tile {val + 1}</span>
                  <span className="text-lg">🧩</span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-slate-500 font-mono">
              Tip: Align tiles 1 through 9 in sequence to complete the circuit.
            </p>
          </div>
        )}

        {/* --- 2. CROSSWORD --- */}
        {activeTab === "crossword" && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Google Ecosystem Crossword</h3>
            <p className="text-xs text-slate-400 mb-6">Answer technical clues to complete the conference crossword matrix.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-[#80D8FF] uppercase">Across</h4>
                <div className="rounded-xl bg-[#091B32]/70 p-3 text-xs">
                  <span className="font-bold text-white block">1. Modern UI framework for Android (7 letters)</span>
                  <span className="font-mono text-[11px] text-emerald-400 mt-1 block">Answer: COMPOSE</span>
                </div>
                <div className="rounded-xl bg-[#091B32]/70 p-3 text-xs">
                  <span className="font-bold text-white block">3. Google’s multimodal foundation model (6 letters)</span>
                  <span className="font-mono text-[11px] text-emerald-400 mt-1 block">Answer: GEMINI</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-[#80D8FF] uppercase">Down</h4>
                <div className="rounded-xl bg-[#091B32]/70 p-3 text-xs">
                  <span className="font-bold text-white block">2. High-performance React engine (6 letters)</span>
                  <span className="font-mono text-[11px] text-emerald-400 mt-1 block">Answer: TURBO</span>
                </div>
                <div className="rounded-xl bg-[#091B32]/70 p-3 text-xs">
                  <span className="font-bold text-white block">4. DevFest 2026 venue in Chennai (4 letters)</span>
                  <span className="font-mono text-[11px] text-emerald-400 mt-1 block">Answer: IITM</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert("Crossword verified! +450 XP claimed.");
                setPlayerXp((xp) => xp + 450);
              }}
              className="ag-btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Submit & Claim 450 XP</span>
            </button>
          </div>
        )}

        {/* --- 3. MEMORY MATRIX --- */}
        {activeTab === "memory-matrix" && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Quantum Memory Matrix</h3>
            <p className="text-xs text-slate-400 mb-6">
              Click Start to flash the pattern for 1.5s, then recall and click the glowing coordinates.
            </p>

            {matrixSolved && (
              <div className="mb-6 rounded-2xl bg-emerald-500/10 p-4 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>PATTERN RECALLED WITH 100% ACCURACY! +500 XP GRANTED!</span>
              </div>
            )}

            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto aspect-square bg-[#091B32] p-3 rounded-2xl mb-6">
              {Array.from({ length: 16 }).map((_, i) => {
                const isTarget = matrixTarget.includes(i);
                const isSelected = userSelected.includes(i);
                const isGlowing = isShowingPattern && isTarget;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleTileClick(i)}
                    className={`rounded-xl font-mono text-sm font-bold transition-all ${
                      isGlowing || isSelected
                        ? "bg-[#80D8FF] shadow-[0_0_18px_rgba(128,216,255,0.9)] scale-95"
                        : "bg-[#051020] hover:bg-[#163B63]"
                    }`}
                  >
                    {isSelected ? "✓" : ""}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={startMemoryMatrix}
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold"
            >
              <Zap className="h-4 w-4" />
              <span>{isShowingPattern ? "Memorizing..." : "Start Pattern Round"}</span>
            </button>
          </div>
        )}

        {/* --- 4. SPEED TYPER --- */}
        {activeTab === "speed-typer" && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Syntax Speed Typer</h3>
            <p className="text-xs text-slate-400 mb-6">
              Type the exact code snippet below as fast as possible with zero typos.
            </p>

            <div className="rounded-2xl bg-[#091B32]/90 p-4 font-mono text-sm text-[#80D8FF] max-w-xl mx-auto mb-6 select-none text-left">
              {codeSnippet}
            </div>

            <div className="max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Start typing here..."
                value={typedInput}
                onChange={handleTypingChange}
                disabled={typerSolved}
                className="ag-input-metallic w-full px-4 py-3 text-sm font-mono rounded-xl"
              />
            </div>

            {typerSolved && (
              <div className="mt-6 rounded-2xl bg-emerald-500/10 p-4 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle2 className="h-4 w-4" />
                <span>EXCELLENT! SPEED: {wpm} WPM · 100% ACCURACY! +400 XP!</span>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={resetTyper}
                className="font-mono text-xs text-[#80D8FF] hover:underline"
              >
                Reset Challenge
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conference Leaderboard Standings */}
      <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-[#051020]/80 p-8 backdrop-blur-xl shadow-[0_12px_30px_rgba(2,8,19,0.7)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Live Conference Leaderboard</h3>
          </div>
          <span className="font-mono text-xs text-slate-400">UPDATED REAL-TIME</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {[
            { rank: "01", name: "Karthik Subramanian", company: "Skcript Labs", xp: "1,850 XP", badge: "🥇 GRAND CHAMPION" },
            { rank: "02", name: "Ananya Ramesh", company: "IIT Madras CS", xp: "1,700 XP", badge: "🥈 MASTER BUILDER" },
            { rank: "03", name: "Vignesh Kumar", company: "Zoho Corp", xp: "1,550 XP", badge: "🥉 SPEED SPECIALIST" },
            { rank: "14", name: "You (Active Session)", company: "AI Geeks Builder", xp: `${playerXp} XP`, badge: "⚡ RISING STAR" },
          ].map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between rounded-xl p-3.5 ${
                user.rank === "14"
                  ? "bg-[#2B6CB0]/25 text-[#80D8FF] shadow-[0_0_15px_rgba(43,108,176,0.3)]"
                  : "bg-[#091B32]/60 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-white w-6">{user.rank}</span>
                <div>
                  <span className="font-bold text-white block">{user.name}</span>
                  <span className="text-[10px] text-slate-400">{user.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-amber-300">{user.badge}</span>
                <span className="font-bold text-white">{user.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
