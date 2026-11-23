import React, { useState } from 'react';
import { X, HelpCircle, Send } from 'lucide-react';
import { Question, User } from '../types/community';
import { playAudioFeedback } from '../utils/communityUtils';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPostQuestion: (question: Question) => void;
}

export function AskQuestionModal({ isOpen, onClose, currentUser, onPostQuestion }: AskQuestionModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsStr, setTagsStr] = useState('AI, Agents');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      body,
      author: currentUser,
      tags: tags.length ? tags : ['AI', 'Engineering'],
      votes: 1,
      hasVoted: 'up',
      answersCount: 0,
      views: 1,
      isSolved: false,
      answers: [],
      createdAt: new Date().toISOString()
    };

    onPostQuestion(newQuestion);
    playAudioFeedback('success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#111118] border border-[#27272A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-lg text-white">Ask Community Question</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">TITLE *</label>
            <input 
              type="text"
              required
              placeholder="e.g. How to prevent context window overflow in multi-turn agents?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">WHAT ARE THE DETAILS OF YOUR PROBLEM? *</label>
            <textarea 
              required
              rows={7}
              placeholder="Describe what you tried, share relevant error messages, code snippets, or architecture constraints..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">TAGS (COMMA SEPARATED)</label>
            <input 
              type="text"
              placeholder="e.g. LangChain, Gemini, TypeScript"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-black font-extrabold text-xs shadow-md shadow-emerald-500/20 transition flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Question (+10 XP)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
