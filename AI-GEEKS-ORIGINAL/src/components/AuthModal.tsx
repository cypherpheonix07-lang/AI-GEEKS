import React, { useState } from 'react';
import { X, LogIn, Check, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { User } from '../types/community';
import { CURRENT_USER } from '../data/communitySeedData';
import { playAudioFeedback } from '../utils/communityUtils';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleOAuth = (provider: 'github' | 'google') => {
    playAudioFeedback('success');
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    onLoginSuccess({
      ...CURRENT_USER,
      name: name || CURRENT_USER.name,
      username: username || CURRENT_USER.username,
      email: email || CURRENT_USER.email
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioFeedback('success');
    onLoginSuccess({
      ...CURRENT_USER,
      name: name || 'AI Builder',
      username: username || 'builder_dev',
      email: email || 'builder@aigeeks.dev'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111118] border border-[#27272A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-2xl text-white mx-auto shadow-lg shadow-indigo-500/25">
            ⚡
          </div>
          <h3 className="text-2xl font-black text-white pt-2">
            {tab === 'register' ? 'Join AI Geeks Free' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-400">Where AI Minds Meet, Build, and Lead</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#18181B] p-1 rounded-2xl border border-[#27272A]">
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`w-1/2 py-2 rounded-xl text-xs font-semibold transition ${
              tab === 'register' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`w-1/2 py-2 rounded-xl text-xs font-semibold transition ${
              tab === 'signin' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleOAuth('github')}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#27272A] text-xs font-semibold text-white flex items-center justify-center space-x-2 transition"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
          <button
            onClick={() => handleOAuth('google')}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#27272A] text-xs font-semibold text-white flex items-center justify-center space-x-2 transition"
          >
            <span>🌐 Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
          <div className="h-px bg-[#27272A] flex-1"></div>
          <span>OR WITH EMAIL</span>
          <div className="h-px bg-[#27272A] flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'register' && (
            <>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">FULL NAME</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Aarav Patel" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">USERNAME</label>
                <input 
                  type="text" 
                  required 
                  placeholder="aarav_ai" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" 
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">EMAIL ADDRESS</label>
            <input 
              type="email" 
              required 
              placeholder="engineer@domain.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" 
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-indigo-600/30 transition mt-2"
          >
            {tab === 'register' ? 'Join Community (+50 XP Welcome)' : 'Sign In to Account'}
          </button>
        </form>

        <p className="text-[10px] text-slate-500 text-center leading-tight">
          By signing up, you agree to our Code of Conduct and Anti-Harassment Policy.
        </p>

      </div>
    </div>
  );
}
