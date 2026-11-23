import React, { useState } from 'react';
import { X, Sparkles, Image, Tag, Code, Eye, Send } from 'lucide-react';
import { Post, User } from '../types/community';
import { playAudioFeedback } from '../utils/communityUtils';
import confetti from 'canvas-confetti';

interface WritePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPublishPost: (post: Post) => void;
}

export function WritePostModal({ isOpen, onClose, currentUser, onPublishPost }: WritePostModalProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('AI, LLMs, Agents');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [category, setCategory] = useState<'Tutorial' | 'Research' | 'Opinion' | 'Case Study' | 'News'>('Tutorial');
  const [previewMode, setPreviewMode] = useState(false);

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: excerpt || content.slice(0, 160) + '...',
      content,
      coverImage: coverUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
      author: currentUser,
      tags: tags.length ? tags : ['AI', 'Tech'],
      readTime: `${Math.max(1, Math.ceil(content.split(' ').length / 200))} min read`,
      views: 1,
      publishedAt: new Date().toISOString(),
      reactions: { like: 1, love: 0, fire: 1, mind_blown: 0, celebrate: 0, bookmark: 0 },
      commentsCount: 0,
      comments: [],
      category
    };

    onPublishPost(newPost);
    playAudioFeedback('success');
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#111118] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            <h3 className="font-extrabold text-lg text-white">Write Community Post</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
 previewMode ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-300 hover:text-white'
 }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{previewMode ? 'Edit Mode' : 'Preview'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {previewMode ? (
          <div className="space-y-4">
            <img
              src={coverUrl}
              alt="Cover preview"
              className="w-full h-48 shrink-0 object-cover rounded-2xl"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/website_main/explorer/photo-01.jpg";
              }}
            />
            <h1 className="text-2xl sm:text-3xl font-black text-white">{title || 'Untitled Post'}</h1>
            <div className="flex flex-wrap gap-1.5">
              {tagsStr.split(',').map((t, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400">
                  #{t.trim()}
                </span>
              ))}
            </div>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans p-4 rounded-2xl bg-black/40">
              {content || 'No content written yet.'}
            </div>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">POST TITLE *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Architecting Autonomous Multi-Agent Loops with Gemini 2.5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            {/* Category & Tags Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Tutorial">Tutorial / Guide</option>
                  <option value="Research">Research & Papers</option>
                  <option value="Case Study">Production Case Study</option>
                  <option value="Opinion">Opinion / Architecture</option>
                  <option value="News">AI News & Releases</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">TAGS (COMMA SEPARATED)</label>
                <input 
                  type="text"
                  placeholder="LLMs, Agents, TypeScript"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">COVER IMAGE URL</label>
              <input 
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Short Excerpt */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">SHORT SUMMARY / EXCERPT</label>
              <input 
                type="text"
                placeholder="A 2-line summary of what builders will learn..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Markdown Body */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">POST BODY (MARKDOWN SUPPORTED) *</label>
              <textarea 
                required
                rows={9}
                placeholder="Share your technical findings, architecture diagrams, code blocks (```typescript ... ```), and lessons learned..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#18181B] rounded-xl p-4 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-indigo-600/30 transition flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post (+20 XP)</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
