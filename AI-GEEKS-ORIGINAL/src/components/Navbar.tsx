import React, { useState } from 'react';
import { 
  Sparkles, Search, Bell, Plus, Bookmark, User as UserIcon, 
  Menu, X, Sun, Moon, LogIn, Check, ExternalLink, Shield,
  Terminal, Award, Layers, Globe, Code2
} from 'lucide-react';
import { User, NotificationItem } from '../types/community';
import { getRoleRingColor, getTierColor } from '../utils/communityUtils';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  notifications: NotificationItem[];
  onOpenCommandPalette: () => void;
  onOpenAuthModal: () => void;
  onOpenWriteModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  unreadCount: number;
  onMarkNotificationsRead: () => void;
}

export function Navbar({
  currentUser,
  activeTab,
  setActiveTab,
  notifications,
  onOpenCommandPalette,
  onOpenAuthModal,
  onOpenWriteModal,
  isDarkMode,
  onToggleTheme,
  unreadCount,
  onMarkNotificationsRead
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'blog', label: 'Blog' },
    { id: 'questions', label: 'Q&A' },
    { id: 'events', label: 'Events' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'projects', label: 'Projects' },
    { id: 'learn', label: 'Learn' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0A0F]/85 border-b border-[#27272A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                AI GEEKS
              </span>
              <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>COMMUNITY</span>
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider">LEARN • BUILD • LEAD</div>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-1 bg-white/[0.04] p-1 rounded-full border border-white/10 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Search Bar / Cmd+K trigger */}
        <div 
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center space-x-2 bg-white/[0.05] hover:bg-white/[0.08] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer transition flex-1 max-w-[200px] lg:max-w-[240px]"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="truncate">Search community...</span>
          <kbd className="hidden lg:inline-block ml-auto text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-slate-500">⌘K</kbd>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2.5 flex-shrink-0">
          
          {/* Write / Create Post Button */}
          <button
            onClick={onOpenWriteModal}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-95 transition shadow-md shadow-indigo-600/20 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
                if (!isNotifDropdownOpen) onMarkNotificationsRead();
              }}
              className="p-2 rounded-xl bg-white/[0.05] border border-[#27272A] hover:bg-white/[0.08] text-slate-300 hover:text-white transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111118] border border-[#27272A] rounded-2xl shadow-2xl p-4 space-y-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#27272A]">
                  <span className="text-xs font-bold font-mono text-slate-300">COMMUNITY NOTIFICATIONS</span>
                  <span className="text-[11px] text-cyan-400 cursor-pointer" onClick={() => setIsNotifDropdownOpen(false)}>Done</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-violet-500/40 transition">
                      <div className="text-xs font-semibold text-white">{n.title}</div>
                      <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                      <div className="text-[10px] font-mono text-slate-500">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-white/[0.05] border border-[#27272A] hover:bg-white/[0.08] text-slate-300 hover:text-amber-400 transition"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Account / Profile or Sign In */}
          {currentUser ? (
            <div className="relative">
              <div 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-white/5 transition"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className={`w-8 h-8 rounded-full object-cover ring-2 ${getRoleRingColor(currentUser.role)}`} 
                />
              </div>

              {/* Profile Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#111118] border border-[#27272A] rounded-2xl shadow-2xl p-3 space-y-2 z-50">
                  <div className="px-2 py-1.5 border-b border-[#27272A]">
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">@{currentUser.username}</div>
                    <div className="text-[10px] font-mono text-amber-400 mt-0.5">{currentUser.reputation} Reputation pts</div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <button onClick={() => { setActiveTab('dashboard'); setIsUserMenuOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white">
                      Dashboard & Stats
                    </button>
                    <button onClick={() => { setActiveTab('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white">
                      Public Profile
                    </button>
                    <button onClick={() => { setActiveTab('badge'); setIsUserMenuOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white">
                      DevFest Badge Studio
                    </button>
                    <button onClick={() => { setActiveTab('settings'); setIsUserMenuOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white">
                      Account Settings
                    </button>
                    <button onClick={() => { setActiveTab('admin'); setIsUserMenuOpen(false); }} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-orange-400 font-semibold">
                      Admin Panel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/25 hover:opacity-95 transition"
            >
              Join Free
            </button>
          )}

          {/* Mobile Hamburger Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/[0.05] border border-[#27272A] text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Full-Screen Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0F]/95 backdrop-blur-2xl border-b border-[#27272A] px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === link.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
            <button
              onClick={() => { onOpenWriteModal(); setIsMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Write Post</span>
            </button>
            <button
              onClick={() => { setActiveTab('badge'); setIsMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold"
            >
              Badge Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
