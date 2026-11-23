"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Download, Sparkles, RefreshCw, Share2, Check } from 'lucide-react';
import { copyToClipboard, playAudioFeedback } from '../utils/communityUtils';

export function DevFestBadgeStudio() {
  const [badgeName, setBadgeName] = useState('Aarav Patel');
  const [badgeRole, setBadgeRole] = useState('Principal AI Systems Architect');
  const [badgeHandle, setBadgeHandle] = useState('@aarav_dev');
  const [badgeTheme, setBadgeTheme] = useState<'violet' | 'cyan' | 'emerald' | 'amber'>('violet');
  const [badgeType, setBadgeType] = useState<'BUILDER' | 'SPEAKER' | 'RESEARCHER' | 'VIP'>('BUILDER');
  const [copiedShare, setCopiedShare] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 420;
    const height = 540;
    const dpr = window.devicePixelRatio || 2;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let primaryColor = '#7C3AED';
    let secondaryColor = '#06B6D4';
    if (badgeTheme === 'cyan') {
      primaryColor = '#06B6D4';
      secondaryColor = '#3B82F6';
    } else if (badgeTheme === 'emerald') {
      primaryColor = '#10B981';
      secondaryColor = '#06B6D4';
    } else if (badgeTheme === 'amber') {
      primaryColor = '#F59E0B';
      secondaryColor = '#EF4444';
    }

    // Outer Card Fill
    ctx.fillStyle = '#0B0F19';
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 28);
    ctx.fill();

    // Radial Glow
    const radGlow = ctx.createRadialGradient(width / 2, 80, 10, width / 2, 80, 220);
    radGlow.addColorStop(0, primaryColor + '35');
    radGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, width, height);

    // Glowing Specular Border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = primaryColor;
    ctx.beginPath();
    ctx.roundRect(8, 8, width - 16, height - 16, 24);
    ctx.stroke();

    // Top Lanyard Slot
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 35, 16, 70, 8, 4);
    ctx.fill();

    // Header Branding
    ctx.fillStyle = '#F9FAFB';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillText('AI GEEKS • TECH COMMUNITY', 28, 55);

    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('GLOBAL BUILDER NETWORK // 2026', 28, 72);

    // Badge Tier Pill
    ctx.fillStyle = primaryColor + '25';
    ctx.beginPath();
    ctx.roundRect(width - 120, 42, 92, 26, 13);
    ctx.fill();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(badgeType, width - 74, 59);
    ctx.textAlign = 'left';

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(28, 92);
    ctx.lineTo(width - 28, 92);
    ctx.stroke();

    // Avatar Center Circle
    const avatarCenterX = width / 2;
    const avatarCenterY = 175;
    const avatarRadius = 55;

    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createLinearGradient(
      avatarCenterX - avatarRadius, avatarCenterY - avatarRadius,
      avatarCenterX + avatarRadius, avatarCenterY + avatarRadius
    );
    grad.addColorStop(0, primaryColor);
    grad.addColorStop(1, secondaryColor);
    ctx.fillStyle = grad;
    ctx.fillRect(avatarCenterX - avatarRadius, avatarCenterY - avatarRadius, avatarRadius * 2, avatarRadius * 2);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '52px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', avatarCenterX, avatarCenterY + 4);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.restore();

    // Avatar Glowing Ring
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 3, 0, Math.PI * 2);
    ctx.stroke();

    // Attendee Name & Role
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.fillText(badgeName || 'Builder Name', width / 2, 268);

    ctx.fillStyle = primaryColor;
    ctx.font = '600 13px "Inter", sans-serif';
    ctx.fillText(badgeRole || 'AI Engineer', width / 2, 290);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillText(`AI Geeks Member • ${badgeHandle || '@builder'}`, width / 2, 310);

    // Skill Stickers
    const stickerY = 345;
    const stickers = ['⚡ Multi-Agent Swarms', '🦀 Systems & Wasm'];
    let startX = (width - stickers.length * 170) / 2 + 10;
    stickers.forEach((st) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.roundRect(startX, stickerY, 155, 26, 13);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      ctx.fillStyle = '#E2E8F0';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(st, startX + 77, stickerY + 17);
      startX += 170;
    });

    // Bottom Ticket & QR Verification Strip
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(24, 405, width - 48, 105, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Simulated QR Code
    const qrSize = 75;
    const qrX = 38;
    const qrY = 420;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);

    // QR finder patterns
    ctx.fillStyle = '#090D16';
    ctx.fillRect(qrX + 4, qrY + 4, 20, 20);
    ctx.fillRect(qrX + qrSize - 24, qrY + 4, 20, 20);
    ctx.fillRect(qrX + 4, qrY + qrSize - 24, 20, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 8, qrY + 8, 12, 12);
    ctx.fillRect(qrX + qrSize - 20, qrY + 8, 12, 12);
    ctx.fillRect(qrX + 8, qrY + qrSize - 20, 12, 12);
    ctx.fillStyle = '#090D16';
    ctx.fillRect(qrX + 12, qrY + 12, 4, 4);
    ctx.fillRect(qrX + qrSize - 16, qrY + 12, 4, 4);
    ctx.fillRect(qrX + 12, qrY + qrSize - 16, 4, 4);

    // Pseudo Data bits
    ctx.fillRect(qrX + 32, qrY + 8, 10, 10);
    ctx.fillRect(qrX + 32, qrY + 26, 14, 14);
    ctx.fillRect(qrX + 50, qrY + 34, 10, 14);
    ctx.fillRect(qrX + 30, qrY + 50, 18, 14);

    // Meta Text
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 12px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED COMMUNITY PASS', qrX + qrSize + 16, 442);

    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('ID: AG26-9842X-VIP', qrX + qrSize + 16, 464);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px "Inter", sans-serif';
    ctx.fillText('AI Geeks Global Community Pass', qrX + qrSize + 16, 486);
    ctx.fillText('Scan at official meetups & hackathons', qrX + qrSize + 16, 500);

  }, [badgeName, badgeRole, badgeHandle, badgeTheme, badgeType]);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playAudioFeedback('success');
    const link = document.createElement('a');
    link.download = `aigeeks-badge-${badgeName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    // Badge successfully downloaded
  };

  const copyShareText = async () => {
    const text = `Just generated my official @AIGeeks community badge! Excited to build autonomous AI systems and collaborate with builders worldwide. Join us at https://aigeeks.community #AIGeeks #BuildWithAI`;
    await copyToClipboard(text);
    setCopiedShare(true);
    playAudioFeedback('click');
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold">
          HTML5 CANVAS BADGE STUDIO
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Generate Your Official Member Badge
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Customize your credentials, choose your accent theme, and download your 2x Retina badge for your social profile and community pass.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start bg-[#111118] rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">MEMBER FULL NAME</label>
            <input 
              type="text" 
              value={badgeName} 
              onChange={(e) => setBadgeName(e.target.value)}
              className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" 
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">ROLE / TITLE</label>
            <input 
              type="text" 
              value={badgeRole} 
              onChange={(e) => setBadgeRole(e.target.value)}
              className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" 
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">COMMUNITY HANDLE (@)</label>
            <input 
              type="text" 
              value={badgeHandle} 
              onChange={(e) => setBadgeHandle(e.target.value)}
              className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" 
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1.5">BADGE THEME ACCENT</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'violet', label: 'Violet', bg: 'bg-violet-600' },
                { id: 'cyan', label: 'Cyan', bg: 'bg-cyan-500' },
                { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
                { id: 'amber', label: 'Amber', bg: 'bg-amber-500' }
              ].map(th => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setBadgeTheme(th.id as any)}
                  className={`py-2 rounded-xl text-xs font-mono flex items-center justify-center space-x-1.5 transition ${
 badgeTheme === th.id ? 'bg-white/10 text-white font-bold' : 'bg-white/5 text-slate-400'
 }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${th.bg}`}></span>
                  <span>{th.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1.5">BADGE TIER</label>
            <div className="grid grid-cols-4 gap-2">
              {(['BUILDER', 'SPEAKER', 'RESEARCHER', 'VIP'] as const).map(bt => (
                <button
                  key={bt}
                  type="button"
                  onClick={() => setBadgeType(bt)}
                  className={`py-1.5 rounded-xl text-[10px] font-mono transition ${
                    badgeType === bt ? 'bg-[#2B6CB0] text-white font-bold' : 'text-slate-400 hover:text-white'
 }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={downloadPNG}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Badge (.PNG)</span>
            </button>
            <button
              onClick={copyShareText}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition flex items-center justify-center space-x-1.5"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Copied Share Text!' : 'Copy Social Share Text'}</span>
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="lg:col-span-6 flex justify-center p-4 bg-black/40 rounded-3xl">
          <canvas ref={canvasRef} className="rounded-2xl max-w-full h-auto shadow-2xl block" style={{ width: '360px', height: '462px' }} />
        </div>

      </div>
    </div>
  );
}
