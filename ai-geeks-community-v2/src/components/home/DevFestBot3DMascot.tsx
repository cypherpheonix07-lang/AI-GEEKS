"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles, Cpu, Zap, MessageSquare, Activity, Award, Settings,
  RotateCcw, Volume2, VolumeX, Radio, Layers, ChevronRight
} from 'lucide-react';

// --- EXTRACTED 9-TOKEN BLUE & OBSIDIAN PALETTE ---
export const MASCOT_PALETTE = {
  void: '#000521',      // 5-Tier Blue Scale (Bottom)
  midnight: '#020C47',  // 5-Tier Blue Scale (4th)
  sapphire: '#011F65',  // 5-Tier Blue Scale (3rd)
  cobalt: '#0E4EB2',    // 5-Tier Blue Scale (2nd)
  azure: '#2078CF',     // 5-Tier Blue Scale (Top)
  charcoal: '#1F1F1F',  // 02 Dark & Elegant
  navy: '#0A1A2F',      // 02 Dark & Elegant
  cyan: '#00D4FF',      // 04 Neon Dusk
  dusk: '#020024'       // 04 Neon Dusk
} as const;

export type MascotMood = 'idle' | 'excited' | 'thinking' | 'celebrate' | 'sleep';

export interface DevFestBot3DMascotProps {
  activeTab?: string;
  userXP?: number;
  soundEnabled?: boolean;
  onTriggerAction?: (action: 'qa' | 'badge' | 'members' | 'gallery') => void;
  className?: string;
}

const playBotChime = (mood: MascotMood, enabled: boolean) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    const notes =
      mood === 'celebrate' ? [523.25, 659.25, 783.99, 1046.5] :
      mood === 'excited' ? [440, 587.33, 880] :
      mood === 'thinking' ? [392, 440] :
      [330, 440];

    notes.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
    });
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + notes.length * 0.06 + 0.08);
    osc.start(now);
    osc.stop(now + notes.length * 0.06 + 0.09);
  } catch {
    // Ignore audio autoplay restrictions
  }
};

export const DevFestBot3DMascot: React.FC<DevFestBot3DMascotProps> = ({
  activeTab = 'overview',
  userXP = 1350,
  soundEnabled = true,
  onTriggerAction,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pointer & 3D Tilt / Eye Tracking State
  const [tilt, setTilt] = useState<{ rx: number; ry: number; eyeX: number; eyeY: number }>({
    rx: 0,
    ry: 0,
    eyeX: 0,
    eyeY: 0
  });
  const [mood, setMood] = useState<MascotMood>('idle');
  const [bobPhase, setBobPhase] = useState<number>(0);
  const [wavePulse, setWavePulse] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  // Sync mood automatically when activeTab changes
  useEffect(() => {
    setCustomMessage(null);
    if (activeTab === 'qa') setMood('thinking');
    else if (activeTab === 'badge') setMood('excited');
    else if (activeTab === 'members') setMood('excited');
    else setMood('idle');
  }, [activeTab]);

  // Smooth 60fps-friendly hover bobbing & orbital phase ticker
  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      setBobPhase(elapsed);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Track pointer across viewport for 3D chassis tilt & pupil gaze
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (mood === 'sleep') return;
      const rect = containerRef.current?.getBoundingClientRect();
      const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / 360));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / 360));

      setTilt({
        rx: Number((-normY * 16).toFixed(2)),
        ry: Number((normX * 20).toFixed(2)),
        eyeX: Number((normX * 7).toFixed(2)),
        eyeY: Number((normY * 5).toFixed(2))
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mood]);

  // Automatic Idle State & speech bubble when user stays on home screen
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    const triggerIdleSpeech = () => {
      const idleMessages = [
        "Vanakkam builder! Chilling on the home screen? 👋",
        "Exploring Chennai's React & AI ecosystem? Scroll down for events! ⚡",
        "DevFest '26 standby · Click me to toggle overdrive animations! 🚀",
        "Pro tip: Switch between 3D Full (?lite=0) and Lite Mode at bottom right!",
      ];
      const randomMsg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
      setCustomMessage(randomMsg);
      setMood("excited");
      setTimeout(() => {
        setMood("idle");
      }, 3500);
    };

    const handleActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(triggerIdleSpeech, 6000);
    };

    window.addEventListener("pointermove", handleActivity, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity);

    idleTimer = setTimeout(triggerIdleSpeech, 6000);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("pointermove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  const handleMascotClick = () => {
    const nextMood: MascotMood =
      mood === 'idle' ? 'excited' :
      mood === 'excited' ? 'celebrate' :
      mood === 'celebrate' ? 'thinking' : 'idle';

    setMood(nextMood);
    setWavePulse(true);
    playBotChime(nextMood, soundEnabled);

    const lines: Record<MascotMood, string> = {
      idle: `DevFest '26 online! ${userXP} XP synced across your builder pass.`,
      excited: 'Scanning multi-agent threads & 2x Retina badge layers!',
      thinking: 'Analyzing tool-call graphs & 52-week contribution telemetry...',
      celebrate: '⚡ Overdrive boost active! Ready to ship at DevFest!',
      sleep: 'Power saver mode active. Move pointer to wake GEEKO-3D.'
    };
    setCustomMessage(lines[nextMood]);
    setTimeout(() => setWavePulse(false), 750);
  };

  const floatY = Math.sin(bobPhase * 2.4) * 9;
  const ringAngle = (bobPhase * 38) % 360;
  const thrusterScale = 0.92 + Math.sin(bobPhase * 9) * 0.12;

  const statusBubbleText = useMemo(() => {
    if (customMessage) return customMessage;
    switch (activeTab) {
      case 'qa':
        return 'Need help debugging agent loops or WebGPU shaders?';
      case 'members':
        return 'Inspecting 52-week blue contribution heatmaps!';
      case 'badge':
        return 'Customize your Neon Dusk or 5-Tier Blue badge!';
      case 'gallery':
        return 'Browsing DevFest keynotes in 4K MP4 & RAW PNG!';
      case 'settings':
        return 'Tuning audio synth & blue surface tokens.';
      default:
        return `Welcome to AI Geeks • ${userXP} Builder XP active`;
    }
  }, [customMessage, activeTab, userXP]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ perspective: '950px' }}
    >
      {/* Floating Speech Telemetry Pill */}
      <div
        className="mb-4 px-4 py-2.5 rounded-2xl backdrop-blur-xl text-xs font-medium text-center max-w-xs transition-all duration-300 shadow-lg"
        style={{
          backgroundColor: 'rgba(10, 26, 47, 0.92)',
          borderColor: mood === 'celebrate' || mood === 'excited' ? MASCOT_PALETTE.cyan : MASCOT_PALETTE.sapphire,
          color: '#F9FAFB',
          boxShadow: `0 12px 30px -10px rgba(0, 212, 255, 0.25)`
        }}
      >
        <div className="flex items-center justify-center space-x-1.5 mb-0.5">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: MASCOT_PALETTE.cyan }}
          />
          <span
            className="text-[10px] font-mono uppercase tracking-widest font-bold"
            style={{ color: MASCOT_PALETTE.cyan }}
          >
            GEEKO-3D • {mood.toUpperCase()}
          </span>
        </div>
        <p className="text-slate-200 leading-snug">{statusBubbleText}</p>
      </div>

      {/* 3D Rotatable Mascot Stage */}
      <div
        onClick={handleMascotClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMascotClick();
          }
        }}
        aria-label="Interactive 3D AI Geeks Mascot — click to cycle expression and boost"
        className="relative cursor-pointer group focus:outline-none"
        style={{
          transform: `translate3d(0px, ${floatY}px, 0px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${wavePulse ? 1.05 : 1})`,
          transformStyle: 'preserve-3d',
          transition: wavePulse
            ? 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 90ms linear'
        }}
      >
        {/* Ambient Neon Dusk Radial Glow Behind Mascot */}
        <div
          className="absolute -inset-6 rounded-full blur-2xl opacity-55 pointer-events-none transition-opacity group-hover:opacity-85"
          style={{
            background: `radial-gradient(circle, ${MASCOT_PALETTE.cyan} 0%, ${MASCOT_PALETTE.azure} 45%, transparent 75%)`,
            transform: 'translateZ(-40px)'
          }}
        />

        {/* 3D Extruded SVG Mascot Chassis */}
        <svg
          viewBox="0 0 320 340"
          className="w-60 h-64 sm:w-72 sm:h-76 overflow-visible drop-shadow-[0_24px_35px_rgba(0,5,33,0.9)]"
        >
          <defs>
            {/* 04 Neon Dusk Gradient */}
            <linearGradient id="agNeonDuskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={MASCOT_PALETTE.cyan} />
              <stop offset="52%" stopColor={MASCOT_PALETTE.azure} />
              <stop offset="100%" stopColor={MASCOT_PALETTE.cobalt} />
            </linearGradient>

            {/* 02 Dark & Elegant Shell Gradient */}
            <linearGradient id="agDarkShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={MASCOT_PALETTE.navy} />
              <stop offset="65%" stopColor={MASCOT_PALETTE.midnight} />
              <stop offset="100%" stopColor={MASCOT_PALETTE.charcoal} />
            </linearGradient>

            {/* Deep Extrusion Side Shade */}
            <linearGradient id="agExtrudeDepth" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={MASCOT_PALETTE.sapphire} />
              <stop offset="100%" stopColor={MASCOT_PALETTE.void} />
            </linearGradient>

            {/* Visor Glass Reflection */}
            <linearGradient id="agVisorGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={MASCOT_PALETTE.void} />
              <stop offset="100%" stopColor={MASCOT_PALETTE.midnight} />
            </linearGradient>

            <filter id="agCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbital Gyro Ring (3D Perspective Ellipse) */}
          <g transform={`translate(160, 145) rotate(${ringAngle})`}>
            <ellipse
              cx="0"
              cy="0"
              rx="126"
              ry="42"
              fill="none"
              stroke={MASCOT_PALETTE.azure}
              strokeWidth="1.5"
              strokeDasharray="10 8"
              opacity="0.55"
            />
            <circle cx="126" cy="0" r="5" fill={MASCOT_PALETTE.cyan} filter="url(#agCyanGlow)" />
            <circle cx="-126" cy="0" r="4" fill={MASCOT_PALETTE.cobalt} />
          </g>

          {/* Top Antenna Spire & Beacon */}
          <line
            x1="160"
            y1="26"
            x2="160"
            y2="62"
            stroke={MASCOT_PALETTE.azure}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle
            cx="160"
            cy="22"
            r={mood === 'celebrate' ? 11 : 8.5}
            fill={MASCOT_PALETTE.cyan}
            filter="url(#agCyanGlow)"
          />

          {/* Left & Right 3D Ear Pods */}
          <g>
            <rect
              x="42"
              y="108"
              width="24"
              height="64"
              rx="12"
              fill="url(#agExtrudeDepth)"
              stroke={MASCOT_PALETTE.azure}
              strokeWidth="2"
            />
            <rect
              x="254"
              y="108"
              width="24"
              height="64"
              rx="12"
              fill="url(#agExtrudeDepth)"
              stroke={MASCOT_PALETTE.azure}
              strokeWidth="2"
            />
          </g>

          {/* 3D Extruded Back/Side Layer for Head */}
          <rect
            x="72"
            y="66"
            width="182"
            height="148"
            rx="46"
            fill="url(#agExtrudeDepth)"
            opacity="0.9"
          />

          {/* Primary 3D Head Shell */}
          <rect
            x="66"
            y="60"
            width="182"
            height="148"
            rx="46"
            fill="url(#agDarkShellGrad)"
            stroke="url(#agNeonDuskGrad)"
            strokeWidth="3"
          />

          {/* Specular Top Rim Highlight */}
          <path
            d="M 102 72 Q 160 63 214 72"
            fill="none"
            stroke={MASCOT_PALETTE.cyan}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* OLED Glass Visor Screen */}
          <rect
            x="84"
            y="84"
            width="146"
            height="94"
            rx="30"
            fill="url(#agVisorGlass)"
            stroke={MASCOT_PALETTE.sapphire}
            strokeWidth="2.5"
          />

          {/* Dynamic Eyes & Expression Inside Visor */}
          <g transform={`translate(${tilt.eyeX}, ${tilt.eyeY})`}>
            {mood === 'celebrate' ? (
              <>
                {/* Happy Arc Eyes */}
                <path
                  d="M 106 132 Q 122 112 138 132"
                  fill="none"
                  stroke={MASCOT_PALETTE.cyan}
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#agCyanGlow)"
                />
                <path
                  d="M 176 132 Q 192 112 208 132"
                  fill="none"
                  stroke={MASCOT_PALETTE.cyan}
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#agCyanGlow)"
                />
              </>
            ) : (
              <>
                {/* Left Eye */}
                <rect
                  x="110"
                  y="108"
                  width="24"
                  height={mood === 'thinking' ? 14 : 32}
                  rx="10"
                  fill={MASCOT_PALETTE.cyan}
                  filter="url(#agCyanGlow)"
                />
                <circle cx="118" cy="116" r="4" fill="#FFFFFF" />

                {/* Right Eye */}
                <rect
                  x="180"
                  y="108"
                  width="24"
                  height={mood === 'thinking' ? 32 : 32}
                  rx="10"
                  fill={MASCOT_PALETTE.cyan}
                  filter="url(#agCyanGlow)"
                />
                <circle cx="188" cy="116" r="4" fill="#FFFFFF" />
              </>
            )}

            {/* Visor Mouth / Equalizer Bar */}
            <path
              d={
                mood === 'celebrate'
                  ? 'M 136 154 Q 157 172 178 154'
                  : mood === 'thinking'
                  ? 'M 142 158 L 172 154'
                  : 'M 140 155 Q 157 165 174 155'
              }
              fill="none"
              stroke={MASCOT_PALETTE.azure}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Left & Right Articulated Arms */}
          <g
            transform={
              wavePulse || mood === 'celebrate'
                ? 'translate(254, 225) rotate(-38)'
                : 'translate(254, 225) rotate(8)'
            }
            style={{ transition: 'transform 250ms ease-out' }}
          >
            <rect
              x="0"
              y="0"
              width="34"
              height="16"
              rx="8"
              fill="url(#agNeonDuskGrad)"
            />
          </g>
          <g transform="translate(30, 225) rotate(-8)">
            <rect
              x="0"
              y="0"
              width="34"
              height="16"
              rx="8"
              fill="url(#agNeonDuskGrad)"
            />
          </g>

          {/* 3D Torso Core Module */}
          <rect
            x="92"
            y="216"
            width="136"
            height="76"
            rx="28"
            fill="url(#agDarkShellGrad)"
            stroke={MASCOT_PALETTE.azure}
            strokeWidth="2.5"
          />

          {/* Chest Arc Reactor / "AG" Emblem */}
          <circle
            cx="160"
            cy="254"
            r="22"
            fill={MASCOT_PALETTE.void}
            stroke={MASCOT_PALETTE.cyan}
            strokeWidth="2.5"
          />
          <text
            x="160"
            y="260"
            textAnchor="middle"
            fill={MASCOT_PALETTE.cyan}
            fontFamily="JetBrains Mono, monospace"
            fontWeight="800"
            fontSize="16"
          >
            AG
          </text>

          {/* Plasma Hover Thruster Plume */}
          <g transform={`translate(160, 296) scale(1, ${thrusterScale})`}>
            <path
              d="M -24 0 L 0 38 L 24 0 Z"
              fill="url(#agNeonDuskGrad)"
              opacity="0.85"
              filter="url(#agCyanGlow)"
            />
            <path d="M -11 0 L 0 22 L 11 0 Z" fill="#FFFFFF" opacity="0.9" />
          </g>
        </svg>

        {/* Ground Shadow Ellipse (Scales inversely with hover height) */}
        <div
          className="mx-auto mt-1 h-3 rounded-full blur-md transition-all"
          style={{
            width: `${Math.max(85, 140 - Math.abs(floatY) * 2)}px`,
            backgroundColor: MASCOT_PALETTE.azure,
            opacity: 0.45
          }}
        />
      </div>

      {/* Quick Action Trigger Strip */}
      {onTriggerAction && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onTriggerAction('qa')}
            style={{ backgroundColor: MASCOT_PALETTE.navy, borderColor: MASCOT_PALETTE.sapphire }}
            className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
          >
            <MessageSquare className="w-3 h-3" style={{ color: MASCOT_PALETTE.cyan }} />
            <span>Ask Q&A</span>
          </button>
          <button
            onClick={() => onTriggerAction('badge')}
            style={{ backgroundColor: MASCOT_PALETTE.navy, borderColor: MASCOT_PALETTE.sapphire }}
            className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
          >
            <Award className="w-3 h-3" style={{ color: MASCOT_PALETTE.cyan }} />
            <span>Make Badge</span>
          </button>
          <button
            onClick={() => onTriggerAction('members')}
            style={{ backgroundColor: MASCOT_PALETTE.navy, borderColor: MASCOT_PALETTE.sapphire }}
            className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
          >
            <Activity className="w-3 h-3" style={{ color: MASCOT_PALETTE.cyan }} />
            <span>Heatmaps</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DevFestBot3DMascot;
