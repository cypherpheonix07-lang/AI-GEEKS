import React, { useState } from 'react';
import { Search, X, BookOpen, HelpCircle, Calendar, Trophy, Users, Briefcase, Plus, ArrowRight } from 'lucide-react';
import { Post, Question, User } from '../types/community';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  questions: Question[];
  members: User[];
  onSelectPost: (post: Post) => void;
  onSelectQuestion: (question: Question) => void;
  onSelectMember: (member: User) => void;
  onNavigateTab: (tab: string) => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  posts,
  questions,
  members,
  onSelectPost,
  onSelectQuestion,
  onSelectMember,
  onNavigateTab
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(query.toLowerCase()) ||
    q.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) || 
    m.username.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl bg-[#111118] border border-[#27272A] rounded-3xl p-4 shadow-2xl space-y-4">
        
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#27272A] pb-3">
          <Search className="w-5 h-5 text-cyan-400 absolute left-3" />
          <input 
            type="text"
            autoFocus
            placeholder="Search articles, questions, members, or type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-11 pr-10 text-sm text-white focus:outline-none font-sans"
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-80 overflow-y-auto space-y-4 text-xs">
          
          {/* Quick Nav Actions */}
          {!query && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase px-2">QUICK JUMP</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Explore Community Feed', tab: 'explore', icon: Search },
                  { label: 'Read Technical Blog', tab: 'blog', icon: BookOpen },
                  { label: 'Browse Q&A Forum', tab: 'questions', icon: HelpCircle },
                  { label: 'Upcoming AI Events', tab: 'events', icon: Calendar },
                  { label: 'Hackathons & Sprints', tab: 'hackathons', icon: Trophy },
                  { label: 'AI Jobs Board', tab: 'jobs', icon: Briefcase }
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => { onNavigateTab(act.tab); onClose(); }}
                      className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition text-left"
                    >
                      <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span className="truncate">{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matching Posts */}
          {filteredPosts.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase px-2">ARTICLES & POSTS</div>
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => { onSelectPost(post); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition"
                >
                  <div className="flex items-center space-x-2 truncate mr-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate font-medium">{post.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{post.readTime}</span>
                </div>
              ))}
            </div>
          )}

          {/* Matching Questions */}
          {filteredQuestions.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase px-2">Q&A QUESTIONS</div>
              {filteredQuestions.map(q => (
                <div
                  key={q.id}
                  onClick={() => { onSelectQuestion(q); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition"
                >
                  <div className="flex items-center space-x-2 truncate mr-2">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate font-medium">{q.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{q.votes} votes</span>
                </div>
              ))}
            </div>
          )}

          {/* Matching Members */}
          {filteredMembers.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase px-2">MEMBERS</div>
              {filteredMembers.map(m => (
                <div
                  key={m.id}
                  onClick={() => { onSelectMember(m); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition"
                >
                  <div className="flex items-center space-x-2.5">
                    <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="font-medium text-white">{m.name}</span>
                    <span className="text-slate-500 font-mono">@{m.username}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">{m.reputation} pts</span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Shortcut Helper */}
        <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono text-slate-500 px-2">
          <span>Navigate with mouse or tap</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
}
