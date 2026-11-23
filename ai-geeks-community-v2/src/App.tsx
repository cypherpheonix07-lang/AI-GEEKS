import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Bookmark, Download, Search, CheckCircle, X, Award, ArrowRight,
  Play, Cpu, Zap, Image, ThumbsUp, MessageSquare, Plus, Check,
  Code, Flame, Award as Trophy, Volume2, VolumeX, Upload, ChevronLeft,
  Command, GitCommit, Star, Activity, Palette, Users
} from 'lucide-react';

// --- EXTRACTED 9-TOKEN BLUE & OBSIDIAN PALETTE ---
const PALETTE_TOKENS = {
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

// --- WEB AUDIO API SYNTHESIZER ---
const playSynthSound = (type: 'upvote' | 'success' | 'click' | 'palette' | 'mascot', enabled: boolean) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'upvote') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.08);
      osc.frequency.setValueAtTime(659.25, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'mascot') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(587.33, now + 0.06);
      osc.frequency.setValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'palette') {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.frequency.setValueAtTime(380, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Ignore audio context autoplay restrictions
  }
};

// --- 3D ANIMATED LIVE MASCOT COMPONENT (GEEKO-3D) ---
type MascotMood = 'idle' | 'excited' | 'thinking' | 'celebrate';

interface DevFestBot3DMascotProps {
  activeTab: string;
  userXP: number;
  soundEnabled: boolean;
  onTriggerAction: (tab: 'qa' | 'badge' | 'members' | 'gallery') => void;
}

export const DevFestBot3DMascot: React.FC<DevFestBot3DMascotProps> = ({
  activeTab,
  userXP,
  soundEnabled,
  onTriggerAction
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    setCustomMessage(null);
    if (activeTab === 'qa') setMood('thinking');
    else if (activeTab === 'badge' || activeTab === 'members') setMood('excited');
    else setMood('idle');
  }, [activeTab]);

  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const tick = (now: number) => {
      setBobPhase((now - start) / 1000);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
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
  }, []);

  const handleMascotClick = () => {
    const nextMood: MascotMood =
      mood === 'idle' ? 'excited' :
      mood === 'excited' ? 'celebrate' :
      mood === 'celebrate' ? 'thinking' : 'idle';

    setMood(nextMood);
    setWavePulse(true);
    playSynthSound('mascot', soundEnabled);

    const lines: Record<MascotMood, string> = {
      idle: `DevFest '26 online! ${userXP} XP synced to your builder pass.`,
      excited: 'Scanning multi-agent Q&A threads & 2x Retina badge layers!',
      thinking: 'Analyzing tool-call graphs & 52-week blue contribution telemetry...',
      celebrate: '⚡ Plasma overdrive active! Ready to ship at AI Geeks DevFest!'
    };
    setCustomMessage(lines[nextMood]);
    setTimeout(() => setWavePulse(false), 750);
  };

  const floatY = Math.sin(bobPhase * 2.4) * 8;
  const ringAngle = (bobPhase * 38) % 360;
  const thrusterScale = 0.92 + Math.sin(bobPhase * 9) * 0.12;

  const statusBubbleText = useMemo(() => {
    if (customMessage) return customMessage;
    return `GEEKO-3D Online • ${userXP} Builder XP • Click me to boost!`;
  }, [customMessage, userXP]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      style={{ perspective: '950px' }}
    >
      {/* Floating Speech Telemetry Pill */}
      <div
        className="mb-3 px-4 py-2 rounded-2xl backdrop-blur-xl text-xs font-medium text-center max-w-xs transition-all duration-300 shadow-lg"
        style={{
          backgroundColor: 'rgba(10, 26, 47, 0.92)',
          borderColor: mood === 'celebrate' || mood === 'excited' ? PALETTE_TOKENS.cyan : PALETTE_TOKENS.sapphire,
          color: '#F9FAFB',
          boxShadow: '0 12px 30px -10px rgba(0, 212, 255, 0.25)'
        }}
      >
        <div className="flex items-center justify-center space-x-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: PALETTE_TOKENS.cyan }} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: PALETTE_TOKENS.cyan }}>
            GEEKO-3D • {mood.toUpperCase()}
          </span>
        </div>
        <p className="text-slate-200 leading-snug">{statusBubbleText}</p>
      </div>

      {/* 3D Rotatable Mascot Chassis */}
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
        aria-label="Interactive 3D AI Geeks Mascot"
        className="relative cursor-pointer group focus:outline-none"
        style={{
          transform: `translate3d(0px, ${floatY}px, 0px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${wavePulse ? 1.05 : 1})`,
          transformStyle: 'preserve-3d',
          transition: wavePulse ? 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 90ms linear'
        }}
      >
        {/* Ambient Neon Dusk Radial Glow */}
        <div
          className="absolute -inset-6 rounded-full blur-2xl opacity-55 pointer-events-none transition-opacity group-hover:opacity-85"
          style={{
            background: `radial-gradient(circle, ${PALETTE_TOKENS.cyan} 0%, ${PALETTE_TOKENS.azure} 45%, transparent 75%)`,
            transform: 'translateZ(-40px)'
          }}
        />

        <svg viewBox="0 0 320 340" className="w-56 h-60 sm:w-64 sm:h-68 overflow-visible drop-shadow-[0_24px_35px_rgba(0,5,33,0.9)]">
          <defs>
            <linearGradient id="agNeonDuskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PALETTE_TOKENS.cyan} />
              <stop offset="52%" stopColor={PALETTE_TOKENS.azure} />
              <stop offset="100%" stopColor={PALETTE_TOKENS.cobalt} />
            </linearGradient>
            <linearGradient id="agDarkShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={PALETTE_TOKENS.navy} />
              <stop offset="65%" stopColor={PALETTE_TOKENS.midnight} />
              <stop offset="100%" stopColor={PALETTE_TOKENS.charcoal} />
            </linearGradient>
            <linearGradient id="agExtrudeDepth" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PALETTE_TOKENS.sapphire} />
              <stop offset="100%" stopColor={PALETTE_TOKENS.void} />
            </linearGradient>
            <linearGradient id="agVisorGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={PALETTE_TOKENS.void} />
              <stop offset="100%" stopColor={PALETTE_TOKENS.midnight} />
            </linearGradient>
            <filter id="agCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbital Gyro Ring */}
          <g transform={`translate(160, 145) rotate(${ringAngle})`}>
            <ellipse cx="0" cy="0" rx="126" ry="42" fill="none" stroke={PALETTE_TOKENS.azure} strokeWidth="1.5" strokeDasharray="10 8" opacity="0.55" />
            <circle cx="126" cy="0" r="5" fill={PALETTE_TOKENS.cyan} filter="url(#agCyanGlow)" />
            <circle cx="-126" cy="0" r="4" fill={PALETTE_TOKENS.cobalt} />
          </g>

          {/* Antenna Spire */}
          <line x1="160" y1="26" x2="160" y2="62" stroke={PALETTE_TOKENS.azure} strokeWidth="5" strokeLinecap="round" />
          <circle cx="160" cy="22" r={mood === 'celebrate' ? 11 : 8.5} fill={PALETTE_TOKENS.cyan} filter="url(#agCyanGlow)" />

          {/* Ear Pods */}
          <rect x="42" y="108" width="24" height="64" rx="12" fill="url(#agExtrudeDepth)" stroke={PALETTE_TOKENS.azure} strokeWidth="2" />
          <rect x="254" y="108" width="24" height="64" rx="12" fill="url(#agExtrudeDepth)" stroke={PALETTE_TOKENS.azure} strokeWidth="2" />

          {/* 3D Extruded Head Layers */}
          <rect x="72" y="66" width="182" height="148" rx="46" fill="url(#agExtrudeDepth)" opacity="0.9" />
          <rect x="66" y="60" width="182" height="148" rx="46" fill="url(#agDarkShellGrad)" stroke="url(#agNeonDuskGrad)" strokeWidth="3" />
          <path d="M 102 72 Q 160 63 214 72" fill="none" stroke={PALETTE_TOKENS.cyan} strokeWidth="3" strokeLinecap="round" opacity="0.75" />

          {/* OLED Glass Visor */}
          <rect x="84" y="84" width="146" height="94" rx="30" fill="url(#agVisorGlass)" stroke={PALETTE_TOKENS.sapphire} strokeWidth="2.5" />

          {/* Gaze-Tracked Eyes */}
          <g transform={`translate(${tilt.eyeX}, ${tilt.eyeY})`}>
            {mood === 'celebrate' ? (
              <>
                <path d="M 106 132 Q 122 112 138 132" fill="none" stroke={PALETTE_TOKENS.cyan} strokeWidth="6" strokeLinecap="round" filter="url(#agCyanGlow)" />
                <path d="M 176 132 Q 192 112 208 132" fill="none" stroke={PALETTE_TOKENS.cyan} strokeWidth="6" strokeLinecap="round" filter="url(#agCyanGlow)" />
              </>
            ) : (
              <>
                <rect x="110" y="108" width="24" height={mood === 'thinking' ? 14 : 32} rx="10" fill={PALETTE_TOKENS.cyan} filter="url(#agCyanGlow)" />
                <circle cx="118" cy="116" r="4" fill="#FFFFFF" />
                <rect x="180" y="108" width="24" height="32" rx="10" fill={PALETTE_TOKENS.cyan} filter="url(#agCyanGlow)" />
                <circle cx="188" cy="116" r="4" fill="#FFFFFF" />
              </>
            )}
            <path
              d={
                mood === 'celebrate' ? 'M 136 154 Q 157 172 178 154' :
                mood === 'thinking' ? 'M 142 158 L 172 154' :
                'M 140 155 Q 157 165 174 155'
              }
              fill="none"
              stroke={PALETTE_TOKENS.azure}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Articulated Arms */}
          <g
            transform={wavePulse || mood === 'celebrate' ? 'translate(254, 225) rotate(-38)' : 'translate(254, 225) rotate(8)'}
            style={{ transition: 'transform 250ms ease-out' }}
          >
            <rect x="0" y="0" width="34" height="16" rx="8" fill="url(#agNeonDuskGrad)" />
          </g>
          <g transform="translate(30, 225) rotate(-8)">
            <rect x="0" y="0" width="34" height="16" rx="8" fill="url(#agNeonDuskGrad)" />
          </g>

          {/* Torso & AG Core */}
          <rect x="92" y="216" width="136" height="76" rx="28" fill="url(#agDarkShellGrad)" stroke={PALETTE_TOKENS.azure} strokeWidth="2.5" />
          <circle cx="160" cy="254" r="22" fill={PALETTE_TOKENS.void} stroke={PALETTE_TOKENS.cyan} strokeWidth="2.5" />
          <text x="160" y="260" textAnchor="middle" fill={PALETTE_TOKENS.cyan} fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="16">
            AG
          </text>

          {/* Hover Thruster Plume */}
          <g transform={`translate(160, 296) scale(1, ${thrusterScale})`}>
            <path d="M -24 0 L 0 38 L 24 0 Z" fill="url(#agNeonDuskGrad)" opacity="0.85" filter="url(#agCyanGlow)" />
            <path d="M -11 0 L 0 22 L 11 0 Z" fill="#FFFFFF" opacity="0.9" />
          </g>
        </svg>

        {/* Ground Shadow Ellipse */}
        <div
          className="mx-auto mt-1 h-2.5 rounded-full blur-md transition-all"
          style={{
            width: `${Math.max(80, 136 - Math.abs(floatY) * 2)}px`,
            backgroundColor: PALETTE_TOKENS.azure,
            opacity: 0.45
          }}
        />
      </div>

      {/* Quick Action Trigger Strip */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onTriggerAction('qa')}
          style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
        >
          <MessageSquare className="w-3 h-3" style={{ color: PALETTE_TOKENS.cyan }} />
          <span>Ask Q&A</span>
        </button>
        <button
          onClick={() => onTriggerAction('badge')}
          style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
        >
          <Award className="w-3 h-3" style={{ color: PALETTE_TOKENS.cyan }} />
          <span>Make Badge</span>
        </button>
        <button
          onClick={() => onTriggerAction('members')}
          style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 flex items-center space-x-1 transition-all"
        >
          <Activity className="w-3 h-3" style={{ color: PALETTE_TOKENS.cyan }} />
          <span>Heatmaps</span>
        </button>
      </div>
    </div>
  );
};

// --- INTERFACES ---
type TierType = 'Seed 🌱' | 'Builder 🔨' | 'Architect ⚡' | 'Legend 👑';

interface PinnedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
}

interface MemberProfile {
  id: string;
  name: string;
  handle: string;
  role: string;
  company: string;
  tier: TierType;
  xp: number;
  avatar: string;
  bio: string;
  location: string;
  github: string;
  skills: string[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  heatmapSeed: number;
  pinnedRepos: PinnedRepo[];
}

interface Answer {
  id: string;
  author: string;
  authorRole: string;
  authorTier: TierType;
  content: string;
  codeSnippet?: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}

interface QuestionThread {
  id: string;
  title: string;
  category: 'LLM Agents' | 'RAG & Vector DB' | 'WebGPU & UI' | 'Cloud & K8s' | 'Rust & Systems';
  tags: string[];
  author: string;
  authorTier: TierType;
  createdAt: string;
  views: number;
  votes: number;
  isSolved: boolean;
  body: string;
  codeSnippet?: string;
  answers: Answer[];
}

interface Session {
  id: string;
  title: string;
  track: 'AI' | 'Cloud' | 'Web' | 'Systems';
  time: string;
  room: string;
  speaker: string;
  speakerRole: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  abstract: string;
  day: 'Day 1' | 'Day 2';
}

interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  fileFormat: 'RAW PNG' | 'WebP' | 'JPG' | '4K MP4' | '1080p WebM';
  category: 'Keynote' | 'Hackathon' | 'Workshop' | 'Networking';
  url: string;
  duration?: string;
  author: string;
  date: string;
}

// --- DETERMINISTIC 52-WEEK HEATMAP GENERATOR ---
const generateHeatmapGrid = (seed: number): { level: 0 | 1 | 2 | 3 | 4; count: number; dateLabel: string }[][] => {
  const weeks: { level: 0 | 1 | 2 | 3 | 4; count: number; dateLabel: string }[][] = [];
  const baseDate = new Date(2026, 10, 19);

  for (let w = 0; w < 52; w++) {
    const days: { level: 0 | 1 | 2 | 3 | 4; count: number; dateLabel: string }[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (51 - w) * 7 + (6 - d);
      const cellDate = new Date(baseDate);
      cellDate.setDate(baseDate.getDate() - dayOffset);

      const hash = Math.sin(seed * 997 + w * 31 + d * 17) * 10000;
      const frac = hash - Math.floor(hash);

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      let count = 0;
      if (frac > 0.86) { level = 4; count = Math.floor(frac * 14) + 8; }
      else if (frac > 0.68) { level = 3; count = Math.floor(frac * 8) + 5; }
      else if (frac > 0.45) { level = 2; count = Math.floor(frac * 5) + 2; }
      else if (frac > 0.25) { level = 1; count = 1; }

      const dateLabel = cellDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      days.push({ level, count, dateLabel });
    }
    weeks.push(days);
  }
  return weeks;
};

// --- INITIAL MOCK DATA ---
const MEMBERS_DATA: MemberProfile[] = [
  {
    id: 'm1',
    name: 'Dr. Maya Lin',
    handle: '@mayalin_ai',
    role: 'Staff AI Researcher',
    company: 'Google DeepMind Ecosystem',
    tier: 'Legend 👑',
    xp: 4820,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Architecting deterministic multi-agent reasoning loops, tool-use verifiers, and low-latency RAG systems.',
    location: 'San Francisco / Chennai DevFest Keynote',
    github: 'github.com/mayalin-ai',
    skills: ['Gemini 1.5 Pro', 'Multi-Agent Systems', 'LangGraph', 'Rust', 'Vector Search'],
    totalContributions: 1842,
    currentStreak: 46,
    longestStreak: 112,
    heatmapSeed: 101,
    pinnedRepos: [
      { name: 'agent-loop-verifier', description: 'Zero-hallucination state verifier for cyclic LLM tool calls', language: 'TypeScript', stars: 1240 },
      { name: 'bq-hnsw-rs', description: 'Binary quantized HNSW vector index with sub-20ms p99 latency', language: 'Rust', stars: 890 }
    ]
  },
  {
    id: 'm2',
    name: 'Vikram Patel',
    handle: '@vikram_systems',
    role: 'Systems Architect',
    company: 'Rust Foundation & ReproState',
    tier: 'Architect ⚡',
    xp: 3190,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Building stateful bug-to-test synthesizers, AST parsers, and high-throughput WebAssembly sandboxes.',
    location: 'Bengaluru, India',
    github: 'github.com/vikrampatel-sys',
    skills: ['Rust', 'AST Synthesis', 'Vitest', 'Playwright', 'WASM'],
    totalContributions: 1410,
    currentStreak: 29,
    longestStreak: 84,
    heatmapSeed: 202,
    pinnedRepos: [
      { name: 'reprostate-engine', description: 'Stateful Bug-to-Test Synthesizer converting bug reports into Vitest scripts', language: 'TypeScript', stars: 960 },
      { name: 'wasm-sandbox-runtime', description: 'Isolated deterministic execution engine for untrusted AI code', language: 'Rust', stars: 640 }
    ]
  },
  {
    id: 'm3',
    name: 'Sarah Jenkins',
    handle: '@sarah_webgpu',
    role: 'Core UI Engineer & GDE',
    company: 'Vercel Ecosystem',
    tier: 'Architect ⚡',
    xp: 2875,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    bio: 'Pushing browser compute limits with WebGPU shaders, React 19 concurrent architectures, and glassmorphic token systems.',
    location: 'London, UK',
    github: 'github.com/sarahjenkins-ui',
    skills: ['WebGPU', 'WGSL', 'React 19', 'Tailwind CSS', 'Design Systems'],
    totalContributions: 1195,
    currentStreak: 19,
    longestStreak: 67,
    heatmapSeed: 303,
    pinnedRepos: [
      { name: 'webgpu-llm-runner', description: '4-bit quantized 7B local inference in browser via WGSL compute shaders', language: 'WGSL', stars: 1530 },
      { name: 'neon-dusk-tokens', description: 'Zero-runtime CSS token architecture for dark blue glassmorphic apps', language: 'CSS', stars: 710 }
    ]
  },
  {
    id: 'm4',
    name: 'Alex Rivera',
    handle: '@alex_cloudnative',
    role: 'Principal SRE',
    company: 'CloudNative Labs',
    tier: 'Builder 🔨',
    xp: 2140,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Multi-region Kubernetes orchestration, eBPF observability, and serverless GPU inference scaling.',
    location: 'Austin, TX',
    github: 'github.com/alexrivera-sre',
    skills: ['Kubernetes', 'eBPF', 'Go', 'Terraform', 'vLLM'],
    totalContributions: 980,
    currentStreak: 14,
    longestStreak: 52,
    heatmapSeed: 404,
    pinnedRepos: [
      { name: 'k8s-canary-mesh', description: 'Automated zero-downtime traffic shifting controller for GPU clusters', language: 'Go', stars: 520 }
    ]
  }
];

const INITIAL_QUESTIONS: QuestionThread[] = [
  {
    id: 'q1',
    title: 'How to prevent cyclic tool-call loops in multi-agent LangGraph / Gemini 1.5 Pro workflows?',
    category: 'LLM Agents',
    tags: ['gemini-1.5-pro', 'multi-agent', 'function-calling', 'typescript'],
    author: 'Dr. Maya Lin',
    authorTier: 'Legend 👑',
    createdAt: '2 hours ago',
    views: 342,
    votes: 42,
    isSolved: true,
    body: 'When orchestrating a 3-agent loop (Planner -> Executor -> Verifier), our Executor occasionally enters a deterministic retry cycle when a tool returns an empty array. What is the cleanest state-guard pattern to break cyclic tool invocations without losing context?',
    codeSnippet: `const verifyStep = async (state: AgentState) => {\n  if (state.toolRetries >= 3) {\n    return { next: 'fallback_synthesizer', reason: 'MAX_RETRIES_EXCEEDED' };\n  }\n  return { next: 'executor' };\n};`,
    answers: [
      {
        id: 'a1',
        author: 'Vikram Patel',
        authorRole: 'Systems Architect',
        authorTier: 'Architect ⚡',
        content: 'Hash the tool name + serialized arguments into a sliding window state array (`visitedSignatures`). Before invoking any tool, check if the exact signature hash appeared in the last N steps. If detected, inject a system critique message forcing the model to synthesize from existing telemetry.',
        codeSnippet: `const sig = crypto.createHash('sha256').update(toolName + JSON.stringify(args)).digest('hex');\nif (state.visitedSignatures.includes(sig)) {\n  throw new DuplicateToolCallError('Loop detected: synthesize current findings.');\n}`,
        votes: 29,
        isAccepted: true,
        createdAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Optimizing WebGPU compute shader memory alignment for local 7B quantized LLM inference in browser',
    category: 'WebGPU & UI',
    tags: ['webgpu', 'wgsl', 'quantization', 'react-19'],
    author: 'Sarah Jenkins',
    authorTier: 'Architect ⚡',
    createdAt: '5 hours ago',
    views: 218,
    votes: 31,
    isSolved: false,
    body: 'We are hitting a storage buffer binding alignment bottleneck when streaming 4-bit quantized weights into WebGPU `storage, read` buffers on Chrome 130+. Has anyone benchmarked `vec4<u32>` vs packed `u32` tile loads?',
    codeSnippet: `@group(0) @binding(0) var<storage, read> weights: array<vec4<u32>>;\n@compute @workgroup_size(64)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  let w = weights[global_id.x];\n}`,
    answers: [
      {
        id: 'a3',
        author: 'Alex Rivera',
        authorRole: 'Principal SRE',
        authorTier: 'Builder 🔨',
        content: 'Always align storage buffer offsets to 256 bytes (`minStorageBufferOffsetAlignment`) and use `vec4<u32>` loads with workgroup shared memory (`var<workgroup>`) to coalesce memory reads across the 64-thread wave.',
        votes: 14,
        isAccepted: false,
        createdAt: '3 hours ago'
      }
    ]
  }
];

const SESSIONS_DATA: Session[] = [
  {
    id: 's1',
    title: 'Autonomous Multi-Agent Systems with Gemini 1.5 Pro',
    track: 'AI',
    time: '10:00 AM - 11:15 AM',
    room: 'Main Arena (Hall A)',
    speaker: 'Dr. Maya Lin',
    speakerRole: 'Staff AI Researcher, Google',
    level: 'Advanced',
    abstract: 'Architect autonomous agent loops that orchestrate complex multi-step developer workflows using function calling and structured reasoning.',
    day: 'Day 1'
  },
  {
    id: 's2',
    title: 'Zero-Downtime Kubernetes Migrations at Scale',
    track: 'Cloud',
    time: '11:30 AM - 12:30 PM',
    room: 'Cloud Theater (Hall B)',
    speaker: 'Alex Rivera',
    speakerRole: 'Principal SRE, CloudNative Labs',
    level: 'Intermediate',
    abstract: 'Deep dive into advanced traffic shifting, canary rollouts, and service mesh patterns for zero-downtime multi-region Kubernetes cluster upgrades.',
    day: 'Day 1'
  },
  {
    id: 's3',
    title: 'Local-First React 19 & WebGPU Performance Architecture',
    track: 'Web',
    time: '02:00 PM - 03:00 PM',
    room: 'Web Studio (Hall C)',
    speaker: 'Sarah Jenkins',
    speakerRole: 'Core UI Engineer & GDE',
    level: 'Advanced',
    abstract: 'Leverage React 19 Server Actions, optimistic state patterns, and WebGPU hardware acceleration for blazing-fast browser applications.',
    day: 'Day 1'
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'g1', title: 'DevFest Opening Keynote Arena', type: 'photo', fileFormat: 'RAW PNG', category: 'Keynote', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80', author: 'AI Geeks Media', date: 'Nov 2026' },
  { id: 'g2', title: '24-Hour Hackathon Final Pitch', type: 'video', fileFormat: '4K MP4', category: 'Hackathon', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80', duration: '03:45', author: 'DevFest Crew', date: 'Nov 2026' },
  { id: 'g3', title: 'Autonomous Agents Hands-on Lab', type: 'photo', fileFormat: 'WebP', category: 'Workshop', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80', author: 'Dr. Maya Lin', date: 'Oct 2026' },
  { id: 'g4', title: 'Cloud Native Architects Panel', type: 'video', fileFormat: '1080p WebM', category: 'Keynote', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80', duration: '12:20', author: 'CloudLive', date: 'Oct 2026' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'members' | 'agenda' | 'gallery' | 'badge' | 'settings'>('overview');
  const [userXP, setUserXP] = useState<number>(1350);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [surfacePreset, setSurfacePreset] = useState<'dark-elegant' | 'neon-dusk' | 'royal-tier'>('dark-elegant');
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState<boolean>(false);

  // Command Palette (⌘K) State
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState<boolean>(false);
  const [cmdQuery, setCmdQuery] = useState<string>('');

  // Member Profile & 52-Week Blue Heatmap Drawer State
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ count: number; dateLabel: string; hex: string } | null>(null);

  // Q&A Forum State
  const [questions, setQuestions] = useState<QuestionThread[]>(INITIAL_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [qaCategoryFilter, setQaCategoryFilter] = useState<string>('All');
  const [qaSortBy, setQaSortBy] = useState<'trending' | 'top' | 'solved'>('trending');
  const [qaSearch, setQaSearch] = useState<string>('');
  const [isAskModalOpen, setIsAskModalOpen] = useState<boolean>(false);
  const [newQTitle, setNewQTitle] = useState<string>('');
  const [newQCategory, setNewQCategory] = useState<QuestionThread['category']>('LLM Agents');
  const [newQTags, setNewQTags] = useState<string>('gemini, agents, typescript');
  const [newQBody, setNewQBody] = useState<string>('');
  const [newQCode, setNewQCode] = useState<string>('');
  const [newAnswerText, setNewAnswerText] = useState<string>('');

  // Agenda & Gallery State
  const [savedSessions, setSavedSessions] = useState<string[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [galleryTypeFilter, setGalleryTypeFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [galleryFormatFilter, setGalleryFormatFilter] = useState<string>('All Formats');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [uploadFormat, setUploadFormat] = useState<GalleryItem['fileFormat']>('RAW PNG');
  const [uploadCategory, setUploadCategory] = useState<GalleryItem['category']>('Keynote');
  const [uploadUrl, setUploadUrl] = useState<string>('');

  // Settings & Badge Studio State
  const [userName, setUserName] = useState<string>('Alex Developer');
  const [userEmail, setUserEmail] = useState<string>('alex@aigeeks.dev');
  const [badgeName, setBadgeName] = useState<string>('Alex Developer');
  const [badgeRole, setBadgeRole] = useState<string>('AI Agent Architect');
  const [badgePalette, setBadgePalette] = useState<'neon-dusk' | 'five-tier-blue' | 'dark-elegant'>('neon-dusk');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const addXP = (amount: number) => setUserXP(prev => prev + amount);

  const cardSurfaceStyle = useMemo(() => {
    if (surfacePreset === 'neon-dusk') {
      return { background: 'linear-gradient(145deg, #020C47 0%, #020024 100%)', borderColor: '#0E4EB2' };
    }
    if (surfacePreset === 'royal-tier') {
      return { background: 'linear-gradient(145deg, #011F65 0%, #020C47 100%)', borderColor: '#2078CF' };
    }
    return { background: 'linear-gradient(145deg, #0A1A2F 0%, #1F1F1F 100%)', borderColor: '#011F65' };
  }, [surfacePreset]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playSynthSound('palette', soundEnabled);
        setIsCmdPaletteOpen(prev => !prev);
        setCmdQuery('');
      } else if (e.key === 'Escape') {
        setIsCmdPaletteOpen(false);
        setSelectedMember(null);
        setSelectedLightboxItem(null);
        setIsAskModalOpen(false);
        setIsUploadModalOpen(false);
        setIsRSVPModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  const openMemberByName = (name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSynthSound('click', soundEnabled);
    const found = MEMBERS_DATA.find(m => m.name.toLowerCase() === name.toLowerCase());
    setSelectedMember(found || MEMBERS_DATA[0]);
  };

  const commandItems = useMemo(() => {
    const items = [
      { id: 'nav-overview', category: 'Navigation', label: 'Go to Overview & GEEKO-3D Mascot Stage', sub: 'Main dashboard & blue palette matrix', action: () => setActiveTab('overview') },
      { id: 'nav-qa', category: 'Navigation', label: 'Go to AI Discussion & Q&A Forum', sub: `${questions.length} active technical threads`, action: () => { setActiveTab('qa'); setSelectedQuestionId(null); } },
      { id: 'nav-members', category: 'Navigation', label: 'Go to Members & 52-Week Blue Heatmaps', sub: 'Inspect builder contribution telemetry', action: () => setActiveTab('members') },
      { id: 'nav-agenda', category: 'Navigation', label: 'Go to DevFest Agenda', sub: `${savedSessions.length} bookmarked sessions`, action: () => setActiveTab('agenda') },
      { id: 'nav-gallery', category: 'Navigation', label: 'Go to Media Gallery', sub: 'Filter photos & videos by format', action: () => setActiveTab('gallery') },
      { id: 'nav-badge', category: 'Navigation', label: 'Go to 2x Retina Badge Studio', sub: 'Render Neon Dusk & 5-Tier Blue badges', action: () => setActiveTab('badge') },
      { id: 'nav-settings', category: 'Navigation', label: 'Go to Settings', sub: 'Configure account & audio synthesizer', action: () => setActiveTab('settings') },
      ...questions.map(q => ({
        id: `qa-${q.id}`,
        category: 'Q&A Threads',
        label: q.title,
        sub: `${q.category} • ${q.votes} votes`,
        action: () => { setActiveTab('qa'); setSelectedQuestionId(q.id); }
      }))
    ];
    if (!cmdQuery.trim()) return items;
    const q = cmdQuery.toLowerCase();
    return items.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q));
  }, [cmdQuery, questions, savedSessions.length]);

  const handleVoteQuestion = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSynthSound('upvote', soundEnabled);
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q));
    addXP(5);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQTitle.trim() || !newQBody.trim()) return;
    playSynthSound('success', soundEnabled);
    const created: QuestionThread = {
      id: 'q_' + Date.now(),
      title: newQTitle.trim(),
      category: newQCategory,
      tags: newQTags.split(',').map(t => t.trim()).filter(Boolean),
      author: userName,
      authorTier: 'Architect ⚡',
      createdAt: 'Just now',
      views: 1,
      votes: 1,
      isSolved: false,
      body: newQBody.trim(),
      codeSnippet: newQCode.trim() || undefined,
      answers: []
    };
    setQuestions([created, ...questions]);
    addXP(25);
    setNewQTitle('');
    setNewQBody('');
    setNewQCode('');
    setIsAskModalOpen(false);
    setSelectedQuestionId(created.id);
  };

  const handleAddAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestionId || !newAnswerText.trim()) return;
    playSynthSound('success', soundEnabled);
    const newAns: Answer = {
      id: 'ans_' + Date.now(),
      author: userName,
      authorRole: badgeRole,
      authorTier: 'Architect ⚡',
      content: newAnswerText.trim(),
      votes: 1,
      isAccepted: false,
      createdAt: 'Just now'
    };
    setQuestions(prev => prev.map(q => q.id === selectedQuestionId ? { ...q, answers: [...q.answers, newAns] } : q));
    addXP(15);
    setNewAnswerText('');
  };

  const handleToggleAcceptAnswer = (questionId: string, answerId: string) => {
    playSynthSound('success', soundEnabled);
    setQuestions(prev => prev.map(q => {
      if (q.id !== questionId) return q;
      const updatedAnswers = q.answers.map(a => ({ ...a, isAccepted: a.id === answerId ? !a.isAccepted : false }));
      return { ...q, isSolved: updatedAnswers.some(a => a.isAccepted), answers: updatedAnswers };
    }));
    addXP(20);
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter(q => {
        const matchesCat = qaCategoryFilter === 'All' || q.category === qaCategoryFilter;
        const matchesSearch = q.title.toLowerCase().includes(qaSearch.toLowerCase()) || q.body.toLowerCase().includes(qaSearch.toLowerCase());
        const matchesSolved = qaSortBy === 'solved' ? q.isSolved : true;
        return matchesCat && matchesSearch && matchesSolved;
      })
      .sort((a, b) => qaSortBy === 'top' ? b.votes - a.votes : b.views - a.views);
  }, [questions, qaCategoryFilter, qaSearch, qaSortBy]);

  const activeQuestion = useMemo(
    () => questions.find(q => q.id === selectedQuestionId) || null,
    [questions, selectedQuestionId]
  );

  const handleAddGalleryMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    playSynthSound('success', soundEnabled);
    const newItem: GalleryItem = {
      id: 'g_' + Date.now(),
      title: uploadTitle.trim(),
      type: uploadType,
      fileFormat: uploadFormat,
      category: uploadCategory,
      url: uploadUrl.trim() || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      duration: uploadType === 'video' ? '04:15' : undefined,
      author: userName,
      date: 'Nov 2026'
    };
    setGalleryItems([newItem, ...galleryItems]);
    addXP(20);
    setUploadTitle('');
    setUploadUrl('');
    setIsUploadModalOpen(false);
  };

  const filteredGallery = useMemo(() => {
    return galleryItems.filter(item => {
      const matchType = galleryTypeFilter === 'all' || item.type === galleryTypeFilter;
      const matchCat = galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter;
      const matchFormat = galleryFormatFilter === 'All Formats' || item.fileFormat === galleryFormatFilter;
      return matchType && matchCat && matchFormat;
    });
  }, [galleryItems, galleryTypeFilter, galleryCategoryFilter, galleryFormatFilter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 750;

    const grad = ctx.createLinearGradient(0, 0, 600, 750);
    if (badgePalette === 'neon-dusk') {
      grad.addColorStop(0, PALETTE_TOKENS.dusk);
      grad.addColorStop(0.55, PALETTE_TOKENS.sapphire);
      grad.addColorStop(1, PALETTE_TOKENS.cyan);
    } else if (badgePalette === 'five-tier-blue') {
      grad.addColorStop(0, PALETTE_TOKENS.void);
      grad.addColorStop(0.4, PALETTE_TOKENS.midnight);
      grad.addColorStop(0.75, PALETTE_TOKENS.cobalt);
      grad.addColorStop(1, PALETTE_TOKENS.azure);
    } else {
      grad.addColorStop(0, PALETTE_TOKENS.charcoal);
      grad.addColorStop(0.6, PALETTE_TOKENS.navy);
      grad.addColorStop(1, PALETTE_TOKENS.void);
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 750);
    ctx.strokeStyle = PALETTE_TOKENS.cyan;
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 528, 678);

    ctx.fillStyle = PALETTE_TOKENS.cyan;
    ctx.font = 'bold 15px JetBrains Mono, monospace';
    ctx.fillText("AI GEEKS • DEVFEST '26 OFFICIAL BUILDER PASS", 68, 90);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px Inter, sans-serif';
    ctx.fillText(badgeName || 'Alex Developer', 68, 175);

    ctx.fillStyle = PALETTE_TOKENS.cyan;
    ctx.font = '20px Inter, sans-serif';
    ctx.fillText(badgeRole || 'AI Agent Architect', 68, 215);

    ctx.fillStyle = PALETTE_TOKENS.navy;
    ctx.fillRect(68, 265, 464, 280);
    ctx.strokeStyle = PALETTE_TOKENS.azure;
    ctx.lineWidth = 2;
    ctx.strokeRect(68, 265, 464, 280);

    ctx.fillStyle = PALETTE_TOKENS.cyan;
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('⚡ VERIFIED BLUE-STACK ARCHITECT', 96, 335);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '16px JetBrains Mono, monospace';
    ctx.fillText(`REPUTATION XP: ${userXP} XP`, 96, 390);
    ctx.fillText(`PALETTE: ${badgePalette.toUpperCase()}`, 96, 430);
    ctx.fillText('ID: AG-DF26-BLUE-9084', 96, 470);
    ctx.fillText('ACCESS: All Keynote & Sandbox Labs', 96, 510);

    ctx.fillStyle = PALETTE_TOKENS.cobalt;
    ctx.fillRect(36, 634, 528, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('AI Geeks Global Developer Ecosystem • 2026', 68, 680);
  }, [badgeName, badgeRole, badgePalette, userXP, activeTab]);

  const downloadBadgePNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playSynthSound('success', soundEnabled);
    const link = document.createElement('a');
    link.download = `ai-geeks-${badgePalette}-badge.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const activeMemberHeatmap = useMemo(() => {
    if (!selectedMember) return [];
    return generateHeatmapGrid(selectedMember.heatmapSeed);
  }, [selectedMember]);

  return (
    <div
      className="min-h-screen text-[#F9FAFB] font-sans selection:bg-[#0E4EB2] selection:text-[#00D4FF]"
      style={{ backgroundColor: PALETTE_TOKENS.void }}
    >
      {/* --- STICKY COMMAND NAVBAR --- */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(2, 12, 71, 0.88)', borderColor: PALETTE_TOKENS.sapphire }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('overview')}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${PALETTE_TOKENS.cyan} 0%, ${PALETTE_TOKENS.azure} 50%, ${PALETTE_TOKENS.cobalt} 100%)`,
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.35)'
              }}
            >
              AG
            </div>
            <div>
              <span
                className="font-bold text-lg tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, #FFFFFF, ${PALETTE_TOKENS.cyan})` }}
              >
                AI GEEKS
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: PALETTE_TOKENS.cyan }} />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: PALETTE_TOKENS.cyan }}>
                  DEVFEST '26 LIVE
                </span>
              </div>
            </div>
          </div>

          <nav
            className="flex items-center space-x-1 overflow-x-auto p-1.5 rounded-full"
            style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'qa', label: `Q&A (${questions.length})` },
              { id: 'members', label: `Members (${MEMBERS_DATA.length})` },
              { id: 'agenda', label: `Agenda (${savedSessions.length})` },
              { id: 'gallery', label: `Gallery (${galleryItems.length})` },
              { id: 'badge', label: 'Badge Studio' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSynthSound('click', soundEnabled);
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${PALETTE_TOKENS.azure} 0%, ${PALETTE_TOKENS.cobalt} 100%)`,
                          boxShadow: '0 0 16px rgba(32, 120, 207, 0.45)'
                        }
                      : undefined
                  }
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
 isActive ? 'text-white' : 'text-slate-300 hover:text-[#00D4FF]'
 }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
            <button
              onClick={() => {
                playSynthSound('palette', soundEnabled);
                setIsCmdPaletteOpen(true);
              }}
              style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
              className="px-3 py-2 rounded-xl flex items-center space-x-2 text-xs text-slate-300 hover:text-white transition-all"
            >
              <Search className="w-3.5 h-3.5" style={{ color: PALETTE_TOKENS.cyan }} />
              <span>Search...</span>
              <kbd
                className="px-1.5 py-0.5 text-[10px] font-mono text-slate-200 rounded"
                style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
              >
                ⌘K
              </kbd>
            </button>

            <div
              className="px-3 py-2 rounded-xl flex items-center space-x-1.5 text-xs font-mono font-bold"
              style={{ backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.cobalt, color: PALETTE_TOKENS.cyan }}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{userXP} XP</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" style={{ color: PALETTE_TOKENS.cyan }} /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsRSVPModalOpen(true)}
              style={{
                background: `linear-gradient(135deg, ${PALETTE_TOKENS.cyan} 0%, ${PALETTE_TOKENS.azure} 50%, ${PALETTE_TOKENS.cobalt} 100%)`
              }}
              className="text-[#000521] font-bold px-4 py-2.5 rounded-xl text-xs hover:opacity-95 transition-all shadow-lg"
            >
              Claim Pass
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* 1. OVERVIEW TAB (WITH LIVE 3D GEEKO MASCOT STAGE) */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.cobalt }}
                >
                  <Zap className="w-4 h-4" style={{ color: PALETTE_TOKENS.cyan }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: PALETTE_TOKENS.cyan }}>
                    5-Tier Blue, Dark & Elegant & Neon Dusk Architecture
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08]">
                  Where AI Builders{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${PALETTE_TOKENS.cyan} 0%, ${PALETTE_TOKENS.azure} 55%, ${PALETTE_TOKENS.cobalt} 100%)`
                    }}
                  >
                    Solve, Ship & Connect
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Unified developer ecosystem combining Stack Overflow-grade Q&A architecture, 52-week blue contribution telemetry, and GEEKO-3D live community guidance.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('qa')}
                    style={{
                      background: `linear-gradient(135deg, ${PALETTE_TOKENS.azure} 0%, ${PALETTE_TOKENS.cobalt} 100%)`,
                      boxShadow: '0 10px 25px -5px rgba(14, 78, 178, 0.5)'
                    }}
                    className="text-white px-6 py-4 rounded-xl font-semibold flex items-center space-x-2.5 transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Launch Q&A Forum</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('members')}
                    style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
                    className="text-slate-100 px-6 py-4 rounded-xl font-semibold flex items-center space-x-2.5 transition-all"
                  >
                    <Activity className="w-5 h-5" style={{ color: PALETTE_TOKENS.cyan }} />
                    <span>52-Week Blue Heatmaps</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live 3D Animated Mascot Stage */}
              <div
                style={cardSurfaceStyle}
                className="lg:col-span-5 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl"
              >
                <DevFestBot3DMascot
                  activeTab={activeTab}
                  userXP={userXP}
                  soundEnabled={soundEnabled}
                  onTriggerAction={(tab) => setActiveTab(tab)}
                />
              </div>
            </div>

            {/* Interactive Blue Palette Architecture Inspector */}
            <div style={cardSurfaceStyle} className="rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Palette className="w-6 h-6" style={{ color: PALETTE_TOKENS.cyan }} />
                  <div>
                    <h2 className="text-xl font-bold">Active Blue Color System & Surface Preset</h2>
                    <p className="text-xs text-slate-400">Click any swatch to copy its hex token or switch the live card surface preset.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {[
                    { id: 'dark-elegant', label: '02 Dark & Elegant' },
                    { id: 'neon-dusk', label: '04 Neon Dusk' },
                    { id: 'royal-tier', label: '5-Tier Royal Blue' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playSynthSound('click', soundEnabled);
                        setSurfacePreset(p.id as typeof surfacePreset);
                      }}
                      style={
                        surfacePreset === p.id
                          ? { backgroundColor: PALETTE_TOKENS.cobalt, borderColor: PALETTE_TOKENS.cyan }
                          : { backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire }
                      }
                      className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
                {[
                  { hex: '#2078CF', name: 'Azure Top' },
                  { hex: '#0E4EB2', name: 'Cobalt CTA' },
                  { hex: '#011F65', name: 'Sapphire' },
                  { hex: '#020C47', name: 'Midnight' },
                  { hex: '#000521', name: 'Void Base' },
                  { hex: '#1F1F1F', name: 'Charcoal' },
                  { hex: '#0A1A2F', name: 'Slate Navy' },
                  { hex: '#00D4FF', name: 'Neon Cyan' },
                  { hex: '#020024', name: 'Dusk Base' }
                ].map(swatch => (
                  <div
                    key={swatch.hex}
                    onClick={() => navigator.clipboard?.writeText(swatch.hex)}
                    className="p-3 rounded-2xl cursor-pointer hover:scale-105 transition-transform text-center space-y-2"
                    style={{ backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire }}
                  >
                    <div className="w-full h-10 rounded-xl" style={{ backgroundColor: swatch.hex }} />
                    <div className="text-[11px] font-mono font-bold text-white">{swatch.hex}</div>
                    <div className="text-[10px] text-slate-400">{swatch.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Q&A FORUM TAB */}
        {activeTab === 'qa' && (
          <div className="space-y-8">
            {activeQuestion ? (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}
                  className="inline-flex items-center space-x-2 text-sm text-slate-300 hover:text-white px-4 py-2 rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Forum Threads</span>
                </button>

                <div style={cardSurfaceStyle} className="rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{ backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.cobalt, color: PALETTE_TOKENS.cyan }}
                      >
                        {activeQuestion.category}
                      </span>
                      {activeQuestion.isSolved && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center space-x-1"
                          style={{ backgroundColor: 'rgba(0, 212, 255, 0.12)', borderColor: PALETTE_TOKENS.cyan, color: PALETTE_TOKENS.cyan }}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Verified Solution</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleVoteQuestion(activeQuestion.id, e)}
                      style={{ backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.azure, color: PALETTE_TOKENS.cyan }}
                      className="px-4 py-2 rounded-xl flex items-center space-x-2 text-sm font-bold"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{activeQuestion.votes}</span>
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold">{activeQuestion.title}</h2>
                  <p className="text-slate-200 leading-relaxed">{activeQuestion.body}</p>

                  {activeQuestion.codeSnippet && (
                    <div
                      className="rounded-2xl p-4 overflow-x-auto"
                      style={{ backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire }}
                    >
                      <pre className="text-xs sm:text-sm font-mono" style={{ color: PALETTE_TOKENS.cyan }}>
                        <code>{activeQuestion.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Answers */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{activeQuestion.answers.length} Answers</h3>
                  {activeQuestion.answers.map(ans => (
                    <div
                      key={ans.id}
                      style={
                        ans.isAccepted
                          ? { backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.cyan }
                          : cardSurfaceStyle
                      }
                      className="p-6 rounded-3xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => openMemberByName(ans.author, e)}
                          className="font-bold text-sm hover:underline"
                          style={{ color: PALETTE_TOKENS.cyan }}
                        >
                          {ans.author} ({ans.authorTier})
                        </button>
                        <button
                          onClick={() => handleToggleAcceptAnswer(activeQuestion.id, ans.id)}
                          style={{
                            backgroundColor: ans.isAccepted ? PALETTE_TOKENS.cobalt : PALETTE_TOKENS.void,
                            borderColor: ans.isAccepted ? PALETTE_TOKENS.cyan : PALETTE_TOKENS.sapphire
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                        >
                          {ans.isAccepted ? '✓ Accepted Solution' : 'Mark Accepted'}
                        </button>
                      </div>
                      <p className="text-sm text-slate-200">{ans.content}</p>
                      {ans.codeSnippet && (
                        <pre
                          className="rounded-2xl p-4 text-xs font-mono overflow-x-auto"
                          style={{ backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire, color: PALETTE_TOKENS.cyan }}
                        >
                          <code>{ans.codeSnippet}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Answer Form */}
                <form onSubmit={handleAddAnswer} style={cardSurfaceStyle} className="rounded-3xl p-6 space-y-4">
                  <h4 className="font-bold text-lg">Post Technical Answer (+15 XP)</h4>
                  <textarea
                    rows={3}
                    required
                    value={newAnswerText}
                    onChange={(e) => setNewAnswerText(e.target.value)}
                    placeholder="Write your solution..."
                    style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
                    className="w-full rounded-2xl p-4 text-sm text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: PALETTE_TOKENS.cobalt }}
                    className="hover:bg-[#2078CF] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Submit Answer
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">AI Developer Q&A Forum</h2>
                    <p className="text-slate-400 text-sm">Peer-reviewed engineering solutions styled with the 02 Dark & Elegant card system.</p>
                  </div>
                  <button
                    onClick={() => setIsAskModalOpen(true)}
                    style={{ background: `linear-gradient(135deg, ${PALETTE_TOKENS.azure}, ${PALETTE_TOKENS.cobalt})` }}
                    className="text-white px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center space-x-2 self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ask Question (+25 XP)</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {filteredQuestions.map(q => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuestionId(q.id)}
                      style={cardSurfaceStyle}
                      className="rounded-3xl p-6 cursor-pointer transition-all flex flex-col sm:flex-row gap-6 justify-between"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                            style={{ backgroundColor: PALETTE_TOKENS.midnight, borderColor: PALETTE_TOKENS.cobalt, color: PALETTE_TOKENS.cyan }}
                          >
                            {q.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">▲ {q.votes} votes • {q.answers.length} answers</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{q.title}</h3>
                        <p className="text-sm text-slate-300 line-clamp-2">{q.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. MEMBERS & 52-WEEK BLUE HEATMAPS */}
        {activeTab === 'members' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Community Builders & 52-Week Blue Heatmaps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEMBERS_DATA.map(member => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  style={cardSurfaceStyle}
                  className="p-6 rounded-3xl cursor-pointer transition-all space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 shrink-0 rounded-2xl object-cover shadow-[0_0_15px_rgba(128,216,255,0.2)]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/brand/aigeeks-3d-mascot.png";
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-xs text-slate-300">{member.role} • {member.company}</p>
                      <p className="text-xs font-mono mt-1" style={{ color: PALETTE_TOKENS.cyan }}>
                        {member.totalContributions} contributions • Click to inspect 52w Blue Heatmap →
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. AGENDA TAB */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">DevFest '26 Schedule</h2>
            {SESSIONS_DATA.map(s => {
              const saved = savedSessions.includes(s.id);
              return (
                <div key={s.id} style={cardSurfaceStyle} className="p-6 rounded-3xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono" style={{ color: PALETTE_TOKENS.cyan }}>{s.track} • {s.time} • {s.room}</span>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="text-sm text-slate-300">{s.abstract}</p>
                  </div>
                  <button
                    onClick={() => setSavedSessions(prev => saved ? prev.filter(x => x !== s.id) : [...prev, s.id])}
                    style={{
                      backgroundColor: saved ? PALETTE_TOKENS.cobalt : PALETTE_TOKENS.void,
                      borderColor: saved ? PALETTE_TOKENS.cyan : PALETTE_TOKENS.sapphire
                    }}
                    className="p-4 rounded-2xl"
                  >
                    <Bookmark className="w-5 h-5 text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Media Gallery</h2>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                style={{ backgroundColor: PALETTE_TOKENS.cobalt }}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-white flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Media</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGallery.map(item => (
                <div key={item.id} onClick={() => setSelectedLightboxItem(item)} style={cardSurfaceStyle} className="rounded-3xl overflow-hidden cursor-pointer">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full aspect-video shrink-0 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/website_main/explorer/photo-01.jpg";
                    }}
                  />
                  <div className="p-5">
                    <span className="text-xs font-mono" style={{ color: PALETTE_TOKENS.cyan }}>{item.fileFormat} • {item.category}</span>
                    <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BADGE STUDIO TAB */}
        {activeTab === 'badge' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div style={cardSurfaceStyle} className="lg:col-span-6 p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-bold">2x Retina Blue Badge Studio</h2>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">ATTENDEE NAME</label>
                <input
                  type="text"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                  style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">ROLE / TRACK</label>
                <input
                  type="text"
                  value={badgeRole}
                  onChange={(e) => setBadgeRole(e.target.value)}
                  style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">UPLOADED PALETTE THEME</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'neon-dusk', label: '04 Neon Dusk' },
                    { id: 'five-tier-blue', label: '5-Tier Blue' },
                    { id: 'dark-elegant', label: '02 Dark & Elegant' }
                  ].map(th => (
                    <button
                      key={th.id}
                      onClick={() => setBadgePalette(th.id as typeof badgePalette)}
                      style={
                        badgePalette === th.id
                          ? { backgroundColor: PALETTE_TOKENS.cobalt, borderColor: PALETTE_TOKENS.cyan }
                          : { backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire }
                      }
                      className="py-2.5 rounded-xl text-xs font-mono text-white"
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={downloadBadgePNG}
                style={{ background: `linear-gradient(135deg, ${PALETTE_TOKENS.azure}, ${PALETTE_TOKENS.cobalt})` }}
                className="w-full text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download 2x Retina Badge (.PNG)</span>
              </button>
            </div>
            <div style={cardSurfaceStyle} className="lg:col-span-6 flex justify-center p-6 rounded-3xl">
              <canvas ref={canvasRef} className="max-w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        )}

        {/* 7. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={cardSurfaceStyle} className="max-w-2xl mx-auto p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold">Account & Blue Theme Settings</h2>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">DISPLAY NAME</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
                className="w-full rounded-xl px-4 py-3 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{ backgroundColor: PALETTE_TOKENS.charcoal, borderColor: PALETTE_TOKENS.sapphire }}
                className="w-full rounded-xl px-4 py-3 text-sm text-white"
              />
            </div>
            <button
              onClick={() => playSynthSound('success', soundEnabled)}
              style={{ backgroundColor: PALETTE_TOKENS.cobalt }}
              className="w-full text-white font-semibold py-4 rounded-xl"
            >
              Save Preferences
            </button>
          </div>
        )}
      </main>

      {/* --- 52-WEEK CONTRIBUTION HEATMAP DRAWER --- */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-md flex justify-end"
          style={{ backgroundColor: 'rgba(2, 0, 36, 0.85)' }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="w-full max-w-3xl h-full overflow-y-auto p-6 sm:p-8 space-y-8 shadow-2xl"
            style={{ backgroundColor: PALETTE_TOKENS.void, borderColor: PALETTE_TOKENS.sapphire }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-6" style={{ borderColor: PALETTE_TOKENS.sapphire }}>
              <div className="flex items-center space-x-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-20 h-20 shrink-0 rounded-2xl object-cover shadow-[0_0_20px_rgba(128,216,255,0.25)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/brand/aigeeks-3d-mascot.png";
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                  <p className="text-sm text-slate-300">{selectedMember.role} • {selectedMember.company}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="p-2 rounded-xl" style={{ backgroundColor: PALETTE_TOKENS.navy, borderColor: PALETTE_TOKENS.sapphire }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div style={cardSurfaceStyle} className="p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitCommit className="w-4 h-4" style={{ color: PALETTE_TOKENS.cyan }} />
                  <span className="font-bold text-sm">52-Week Blue-Scale Contribution Matrix</span>
                </div>
                <span className="text-xs font-mono" style={{ color: PALETTE_TOKENS.cyan }}>
                  {hoveredCell ? `${hoveredCell.count} commits on ${hoveredCell.dateLabel} (${hoveredCell.hex})` : 'Hover a cell to inspect shade'}
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="inline-flex space-x-1 min-w-max">
                  {activeMemberHeatmap.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col space-y-1">
                      {week.map((day, dIdx) => {
                        const cellHex =
                          day.level === 4 ? PALETTE_TOKENS.cyan :
                          day.level === 3 ? PALETTE_TOKENS.azure :
                          day.level === 2 ? PALETTE_TOKENS.cobalt :
                          day.level === 1 ? PALETTE_TOKENS.sapphire :
                          PALETTE_TOKENS.midnight;
                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredCell({ count: day.count, dateLabel: day.dateLabel, hex: cellHex })}
                            onMouseLeave={() => setHoveredCell(null)}
                            style={{ backgroundColor: cellHex }}
                            className="w-3 h-3 rounded-[3px] cursor-pointer transition-transform hover:scale-125"
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- GLOBAL COMMAND PALETTE (⌘K) --- */}
      {isCmdPaletteOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-md flex items-start justify-center pt-20 p-4"
          style={{ backgroundColor: 'rgba(2, 0, 36, 0.85)' }}
          onClick={() => setIsCmdPaletteOpen(false)}
        >
          <div
            style={cardSurfaceStyle}
            className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-5 py-4" style={{ borderColor: PALETTE_TOKENS.sapphire }}>
              <Command className="w-5 h-5 mr-3" style={{ color: PALETTE_TOKENS.cyan }} />
              <input
                type="text"
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Search views, Q&A threads, or palette actions..."
                className="w-full bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-3 space-y-1">
              {commandItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { item.action(); setIsCmdPaletteOpen(false); }}
                  className="px-4 py-3 rounded-2xl cursor-pointer hover:bg-[#011F65] flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.sub}</div>
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: PALETTE_TOKENS.cyan }}>{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
