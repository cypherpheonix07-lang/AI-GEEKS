import React, { useState } from 'react';
import { Sparkles, Send, Check } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon, YouTubeIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { playAudioFeedback } from '../utils/communityUtils';

interface FooterProps {
  setActiveTab: (tab: any) => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    playAudioFeedback('success');
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.85 } });
    } catch {
      // ignore
    }
  };

  return (
    <footer className="border-t border-[#27272A] bg-[#0A0A0F] pt-16 pb-12 px-4 sm:px-8 mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/20">
                ⚡
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">AI GEEKS</span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Where AI Enthusiasts Build, Learn & Lead Together. An open, high-signal community combining the best patterns of DEV.to, Hugging Face, Stack Overflow, and Google Developer Groups.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-slate-400 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition" title="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition" title="X / Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition" title="Discord">
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition" title="YouTube">
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">EXPLORE</div>
            <ul className="text-xs text-slate-400 space-y-2">
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-cyan-400 transition">Community Feed</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-cyan-400 transition">Articles & Guides</button></li>
              <li><button onClick={() => setActiveTab('questions')} className="hover:text-cyan-400 transition">Q&A Forum</button></li>
              <li><button onClick={() => setActiveTab('events')} className="hover:text-cyan-400 transition">Upcoming Events</button></li>
              <li><button onClick={() => setActiveTab('hackathons')} className="hover:text-cyan-400 transition">Hackathons & Sprints</button></li>
              <li><button onClick={() => setActiveTab('projects')} className="hover:text-cyan-400 transition">Project Showcase</button></li>
            </ul>
          </div>

          {/* Column 3: Learn & Grow */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">LEARN & GROW</div>
            <ul className="text-xs text-slate-400 space-y-2">
              <li><button onClick={() => setActiveTab('learn')} className="hover:text-cyan-400 transition">Learning Paths</button></li>
              <li><button onClick={() => setActiveTab('leaderboard')} className="hover:text-cyan-400 transition">Leaderboard & XP</button></li>
              <li><button onClick={() => setActiveTab('jobs')} className="hover:text-cyan-400 transition">AI Job Board</button></li>
              <li><button onClick={() => setActiveTab('badge')} className="hover:text-cyan-400 transition">Badge Studio</button></li>
              <li><button onClick={() => setActiveTab('members')} className="hover:text-cyan-400 transition">Members Directory</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">WEEKLY DIGEST</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated top papers, autonomous workflows, and jobs delivered to 12,000+ builders every Monday.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input 
                  type="email" 
                  required 
                  placeholder="engineer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" 
                />
                <button 
                  type="submit" 
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Free</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© 2026 AI GEEKS Community. Independent developer & researcher network.</div>
          <div className="flex items-center space-x-6">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition">About</button>
            <span className="hover:text-slate-300 transition cursor-pointer">Code of Conduct</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Privacy Policy</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-cyan-400 hover:underline font-mono">
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
