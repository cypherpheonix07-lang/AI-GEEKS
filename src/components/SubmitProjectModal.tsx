import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { Project, User } from '../types/community';
import { playAudioFeedback } from '../utils/communityUtils';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSubmitProject: (project: Project) => void;
}

export function SubmitProjectModal({ isOpen, onClose, currentUser, onSubmitProject }: SubmitProjectModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [techStackStr, setTechStackStr] = useState('React, TypeScript, Gemini');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80');
  const [category, setCategory] = useState<'AI Tools' | 'Research' | 'Open Source' | 'Datasets' | 'Web Apps'>('AI Tools');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;

    const techStack = techStackStr.split(',').map(s => s.trim()).filter(Boolean);

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      tagline,
      description: description || tagline,
      thumbnail,
      author: currentUser,
      techStack: techStack.length ? techStack : ['AI', 'TypeScript'],
      githubUrl: githubUrl || 'https://github.com',
      liveUrl: liveUrl || undefined,
      starsCount: 1,
      hasStarred: true,
      category,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmitProject(newProject);
    playAudioFeedback('success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#111118] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-lg text-white">Showcase Community Project</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">PROJECT NAME *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. ReproState AI Synthesizer" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#18181B] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">ONE-LINE TAGLINE *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. 120fps local-first canvas for multi-agent workflows" 
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#18181B] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">GITHUB REPO URL</label>
              <input 
                type="url" 
                placeholder="https://github.com/..." 
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">LIVE DEMO URL</label>
              <input 
                type="url" 
                placeholder="https://myproject.dev" 
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#18181B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="AI Tools">AI Tools</option>
                <option value="Open Source">Open Source</option>
                <option value="Research">Research & Evals</option>
                <option value="Web Apps">Web Apps</option>
                <option value="Datasets">Datasets</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">TECH STACK (COMMA SEPARATED)</label>
              <input 
                type="text" 
                placeholder="Rust, React, WebGPU" 
                value={techStackStr}
                onChange={(e) => setTechStackStr(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 transition flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Project (+15 XP)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
