"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Eye, Zap, Volume2, VolumeX, Moon, Cpu } from "lucide-react";

interface BracketParticle {
  x: number;
  y: number;
  z: number;
  char: "<" | ">" | "{" | "}" | "/";
  size: number;
  rot: number;
  rotSpeed: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  vz: number;
}

interface StarParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  speed: number;
}

// DevFest Chennai & React Metallic Color Palette
const BRACKET_COLORS = [
  "#80D8FF", // Sky Cyan
  "#4DA8DA", // Ice Blue
  "#2B6CB0", // Cobalt
  "#C4EEFF", // Specular White-Blue
  "#00D4FF", // Neon Cyan
  "#F9AB00", // DevFest Amber
];

export default function DevFestBracketsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Lite Mode State (?lite=0 for full 3D experience, ?lite=1 for low-power static mode)
  const [isLiteMode, setIsLiteMode] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Web Audio Context reference for ambient synth drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Track initial mount so we don't trigger redundant replaceState during hydration
  const isInitialMount = useRef(true);

  // Initialize query param ?lite=0 or ?lite=1 from URL / localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const liteParam = params.get("lite");
    if (liteParam === "1") {
      setIsLiteMode(true);
    } else if (liteParam === "0") {
      setIsLiteMode(false);
    } else {
      const stored = localStorage.getItem("aigeeks_experience_lite");
      if (stored === "1") setIsLiteMode(true);
    }
  }, []);

  // Synchronize URL search params and localStorage safely in an effect (outside render phase)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("lite", isLiteMode ? "1" : "0");
    window.history.replaceState({}, "", url.toString());
    try {
      localStorage.setItem("aigeeks_experience_lite", isLiteMode ? "1" : "0");
    } catch {
      // Storage quota or privacy fallback
    }
  }, [isLiteMode]);

  const toggleLiteMode = useCallback(() => {
    setIsLiteMode((prev) => !prev);
  }, []);

  // Toggle ambient synth drone using Web Audio API
  const toggleAmbientSound = () => {
    if (ambientSound) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          audioCtxRef.current?.suspend();
        }, 700);
      }
      setAmbientSound(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
          const osc1 = audioCtxRef.current.createOscillator();
          const osc2 = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();

          osc1.type = "sine";
          osc1.frequency.setValueAtTime(110, audioCtxRef.current.currentTime); // A2 fundamental
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(164.81, audioCtxRef.current.currentTime); // E3 warm fifth

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(audioCtxRef.current.destination);

          gain.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
          gain.gain.linearRampToValueAtTime(0.025, audioCtxRef.current.currentTime + 1.2);

          osc1.start();
          osc2.start();
          gainNodeRef.current = gain;
        } else {
          audioCtxRef.current.resume();
          gainNodeRef.current?.gain.linearRampToValueAtTime(0.025, audioCtxRef.current.currentTime + 1.2);
        }
        setAmbientSound(true);
      } catch {
        // Audio policy fallback
      }
    }
  };

  // Idle Screen Tracker (Activates deep ambient idle mode when user stays on screen for 4.5 seconds)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 4500);
    };

    const handlePointer = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
      resetIdle();
    };

    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);
    window.addEventListener("touchstart", resetIdle, { passive: true });

    resetIdle();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
    };
  }, []);

  // Canvas WebGL / 2D High-Performance 3D BracketsField Simulation
  useEffect(() => {
    if (isLiteMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 3D Floating Bracket Particles
    const brackets: BracketParticle[] = [];
    const chars: Array<"<" | ">" | "{" | "}" | "/"> = ["<", ">", "{", "}", "/"];
    const bracketCount = Math.min(38, Math.floor(width / 35));

    for (let i = 0; i < bracketCount; i++) {
      brackets.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        char: chars[Math.floor(Math.random() * chars.length)],
        size: Math.random() * 22 + 18,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        color: BRACKET_COLORS[Math.floor(Math.random() * BRACKET_COLORS.length)],
        alpha: Math.random() * 0.45 + 0.25,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.6,
      });
    }

    // Initialize Cyber Star Particles
    const stars: StarParticle[] = [];
    const starCount = Math.min(80, Math.floor(width / 18));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000 + 50,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      const cx = width / 2;
      const cy = height / 2;

      // Mouse Parallax factor (calm dampening when idle)
      const mouseParallaxX = isIdle ? Math.sin(time * 0.5) * 15 : mousePos.x * 45;
      const mouseParallaxY = isIdle ? Math.cos(time * 0.5) * 15 : mousePos.y * 35;

      // Render Cyber Stars
      for (const star of stars) {
        star.y -= star.speed * (isIdle ? 0.4 : 1);
        if (star.y < 0) star.y = height;

        const starAlpha = star.alpha * (0.8 + 0.2 * Math.sin(time * 2 + star.x));
        ctx.fillStyle = `rgba(128, 216, 255, ${starAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 3D BracketsField
      for (const b of brackets) {
        // Drift Physics
        b.x += b.vx + (isIdle ? Math.sin(time + b.z) * 0.2 : 0);
        b.y += b.vy + (isIdle ? Math.cos(time + b.x) * 0.2 : 0);
        b.z += b.vz;
        b.rot += b.rotSpeed * (isIdle ? 0.6 : 1);

        // Boundary wrapping in 3D
        if (b.z < 50) b.z = 900;
        if (b.z > 900) b.z = 50;
        if (b.x < -width) b.x = width;
        if (b.x > width) b.x = -width;
        if (b.y < -height) b.y = height;
        if (b.y > height) b.y = -height;

        // 3D Perspective Projection
        const scale = fov / (fov + b.z);
        const projX = (b.x + mouseParallaxX) * scale + cx;
        const projY = (b.y - mouseParallaxY) * scale + cy;

        if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) {
          continue;
        }

        const fontSize = Math.max(10, b.size * scale);
        const dynamicAlpha = Math.min(0.65, Math.max(0.08, b.alpha * scale * (isIdle ? 1.25 : 1)));

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(b.rot);
        ctx.font = `800 ${fontSize}px "Fira Code", monospace, sans-serif`;
        ctx.fillStyle = b.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = isIdle ? 16 : 8;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.char, 0, 0);
        ctx.restore();
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLiteMode, isIdle, mousePos]);

  return (
    <>
      {/* Dynamic 3D WebGL / Canvas Bracket Field Background */}
      {!isLiteMode && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 transition-opacity duration-1000"
        />
      )}

      {/* Atmospheric Background Nebulae */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,78,178,0.18),rgba(2,8,19,0))]"
      />

      {/* Floating Experience & Idle Controller Dock (Zero Borders, Glass Metallic Blue) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-2xl bg-[#051020]/80 p-2 backdrop-blur-xl shadow-[0_12px_35px_rgba(2,8,19,0.7)]">
        {/* Idle Mode Indicator Dot */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] text-[#80D8FF]"
          title={isIdle ? "Idle ambient drift active" : "Interactive pointer tracking active"}
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              isIdle ? "bg-[#80D8FF] animate-ping" : "bg-emerald-400"
            }`}
          />
          <span className="hidden sm:inline">
            {isIdle ? "AMBIENT DRIFT" : "ACTIVE 3D"}
          </span>
        </div>

        {/* Ambient Sound FX Toggle */}
        <button
          type="button"
          onClick={toggleAmbientSound}
          aria-label={ambientSound ? "Mute ambient synth drone" : "Enable ambient synth drone"}
          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
            ambientSound
              ? "bg-[#2B6CB0] text-white shadow-[0_0_15px_rgba(128,216,255,0.45)]"
              : "bg-[#091B32] text-slate-400 hover:text-white"
          }`}
          title={ambientSound ? "Mute ambient synth" : "Synthesize ambient drone"}
        >
          {ambientSound ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>

        {/* Lite Mode Toggle (?lite=0 vs ?lite=1) */}
        <button
          type="button"
          onClick={toggleLiteMode}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all ${
            isLiteMode
              ? "bg-[#163B63] text-slate-300 hover:text-white"
              : "bg-gradient-to-r from-[#2B6CB0] to-[#163B63] text-[#C4EEFF] shadow-[0_0_20px_rgba(43,108,176,0.35)]"
          }`}
          title={isLiteMode ? "Switch to 3D Full Experience (?lite=0)" : "Switch to 2D Lite Mode (?lite=1)"}
        >
          {isLiteMode ? (
            <>
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Lite (2D)</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>3D Full (?lite=0)</span>
            </>
          )}
        </button>
      </div>

      {/* Idle Screen Ambient Notice when user stays on home screen */}
      {isIdle && (
        <div
          aria-live="polite"
          className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-[#051020]/90 px-4 py-1.5 font-mono text-[11px] text-[#80D8FF] backdrop-blur-md shadow-[0_8px_30px_rgba(2,8,19,0.7)] animate-pulse"
        >
          <Sparkles className="h-3 w-3 text-[#C4EEFF]" />
          <span>Resting on home screen · DevFestBot in peaceful idle hover</span>
        </div>
      )}
    </>
  );
}
