import { ReputationTier, Role } from '../types/community';

export function calculateTier(reputation: number): ReputationTier {
  if (reputation >= 25000) return 'Legend';
  if (reputation >= 10000) return 'Master';
  if (reputation >= 4000) return 'Expert';
  if (reputation >= 1500) return 'Contributor';
  if (reputation >= 500) return 'Builder';
  if (reputation >= 100) return 'Explorer';
  return 'Seed';
}

export function getTierColor(tier: ReputationTier): { bg: string; text: string; border: string } {
  switch (tier) {
    case 'Legend':
      return { bg: 'bg-rose-500/15', text: 'text-rose-400', border: '' };
    case 'Master':
      return { bg: 'bg-amber-500/15', text: 'text-amber-400', border: '' };
    case 'Expert':
      return { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: '' };
    case 'Contributor':
      return { bg: 'bg-purple-500/15', text: 'text-purple-400', border: '' };
    case 'Builder':
      return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: '' };
    case 'Explorer':
      return { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: '' };
    default:
      return { bg: 'bg-slate-500/15', text: 'text-slate-400', border: '' };
  }
}

export function getRoleRingColor(role: Role): string {
  switch (role) {
    case 'ADMIN':
      return 'shadow-[0_0_15px_rgba(249,115,22,0.4)]';
    case 'MODERATOR':
      return 'shadow-[0_0_15px_rgba(6,182,212,0.4)]';
    case 'SPEAKER':
      return 'shadow-[0_0_15px_rgba(168,85,247,0.4)]';
    case 'CONTRIBUTOR':
      return 'shadow-[0_0_15px_rgba(99,102,241,0.4)]';
    default:
      return 'shadow-[0_0_12px_rgba(51,65,85,0.3)]';
  }
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function calculateTrendingScore(reactionsCount: number, commentsCount: number, views: number, hoursAgo: number): number {
  const recencyBoost = Math.max(0, 100 - hoursAgo * 2);
  return reactionsCount * 3 + commentsCount * 2 + views * 0.1 + recencyBoost;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return true;
    }
  } catch {
    return false;
  }
}

export function playAudioFeedback(type: 'success' | 'click' | 'pop' = 'click') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'pop') {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // audio context blocked or unsupported
  }
}
