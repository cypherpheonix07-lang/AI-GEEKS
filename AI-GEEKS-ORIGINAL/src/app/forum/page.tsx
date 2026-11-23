"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  ArrowBigUp,
  CheckCircle2,
  Plus,
  Send,
  Terminal,
  Sparkles,
} from "lucide-react";
import { FORUM_THREADS, ForumThread } from "@/data/communityData";

const FORUM_CATEGORIES = [
  "All",
  "LLM Agents",
  "RAG & Vector DBs",
  "TypeScript & Next.js",
  "Hackathons",
] as const;

export default function ForumPage() {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeThreadId, setActiveThreadId] = useState<string>(FORUM_THREADS[0].id);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newCategory, setNewCategory] = useState<ForumThread["category"]>("LLM Agents");
  const [showNewModal, setShowNewModal] = useState(false);
  const [replyText, setReplyText] = useState("");

  const visibleThreads = threads.filter((t) =>
    selectedCategory === "All" ? true : t.category === selectedCategory
  );

  const activeThread =
    threads.find((t) => t.id === activeThreadId) || visibleThreads[0];

  const handleUpvote = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;
    const created: ForumThread = {
      id: `thd-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: "Community Builder",
      authorRole: "AI GEEKS Member",
      createdAt: "Just now",
      upvotes: 1,
      solved: false,
      summary: newSummary.trim(),
      replies: [],
    };
    setThreads((prev) => [created, ...prev]);
    setActiveThreadId(created.id);
    setNewTitle("");
    setNewSummary("");
    setShowNewModal(false);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              replies: [
                ...t.replies,
                {
                  id: `rep-${Date.now()}`,
                  author: "You (AI Builder)",
                  role: "Community Member",
                  content: replyText.trim(),
                  timestamp: "Just now",
                },
              ],
            }
          : t
      )
    );
    setReplyText("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-20 px-6 text-slate-100">
      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/3 h-[420px] w-[760px] rounded-full bg-gradient-to-tr from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                BUILDER KNOWLEDGE BASE · Q&amp;A
              </span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              AI Forum &amp; <span className="ag-text-gradient">Q&amp;A Threads.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              Discuss multi-agent architectures, debug Next.js + TypeScript
              builds, and find teammates for upcoming pure-software hackathons.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold self-start"
          >
            <Plus className="h-4 w-4" />
            <span>New Q&amp;A Thread</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FORUM_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 font-mono text-xs uppercase transition-all ${
                selectedCategory === cat ? "ag-btn-primary" : "ag-btn-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Master-Detail Forum Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Thread List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {visibleThreads.map((thread) => {
              const isSelected = activeThread?.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all border ${
                    isSelected
                      ? "border-[#C4EEFF] bg-gradient-to-br from-[#091B32] via-[#0F2744] to-[#020813] shadow-[0_0_30px_rgba(128,216,255,0.3)]"
                      : "border-[#80D8FF]/20 bg-[#051020]/75 hover:border-[#80D8FF]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[11px]">
                      {thread.category}
                    </span>
                    {thread.solved && (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#80D8FF]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        SOLVED
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-white">
                    {thread.title}
                  </h2>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>
                      {thread.author} · {thread.createdAt}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(thread.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#16202C] px-2.5 py-1 text-[#C4EEFF] hover:bg-[#163B63] border border-[#80D8FF]/30"
                      >
                        <ArrowBigUp className="h-4 w-4" />
                        <span>{thread.upvotes}</span>
                      </button>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-[#4DA8DA]" />
                        {thread.replies.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Thread & Q&A Replies */}
          {activeThread && (
            <div className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#4DA8DA]/25 pb-5">
                  <span className="ag-badge-cyan rounded-full px-3.5 py-1 font-mono text-xs">
                    {activeThread.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Posted by {activeThread.author} ({activeThread.authorRole})
                  </span>
                </div>

                <h2 className="mt-6 text-2xl md:text-3xl font-bold text-white">
                  {activeThread.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">
                  {activeThread.summary}
                </p>

                {activeThread.codeSnippet && (
                  <pre className="mt-5 overflow-x-auto rounded-2xl border border-[#80D8FF]/30 bg-[#16202C] p-4 font-mono text-xs text-[#C4EEFF]">
                    <code>{activeThread.codeSnippet}</code>
                  </pre>
                )}

                {/* Replies Section */}
                <div className="mt-8 border-t border-[#4DA8DA]/25 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                    {activeThread.replies.length} COMMUNITY ANSWERS
                  </h3>

                  <div className="mt-4 space-y-4">
                    {activeThread.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`rounded-2xl p-5 border ${
                          reply.isAcceptedAnswer
                            ? "border-[#C4EEFF] bg-[#163B63]/40"
                            : "border-[#80D8FF]/20 bg-[#020813]/80"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white">
                            {reply.author}{" "}
                            <span className="text-[#80D8FF]">({reply.role})</span>
                          </span>
                          {reply.isAcceptedAnswer && (
                            <span className="inline-flex items-center gap-1 text-[#C4EEFF]">
                              <Terminal className="h-3.5 w-3.5 text-[#80D8FF]" />
                              ACCEPTED SOLUTION
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Reply Form */}
              <form onSubmit={handleAddReply} className="mt-8 pt-6 border-t border-[#4DA8DA]/25">
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Contribute an Answer
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Share your architecture fix, code snippet, or insight..."
                    className="ag-input-metallic flex-1 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                  >
                    <Send className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Create New Thread Modal */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-xl p-6">
            <form
              onSubmit={handleCreateThread}
              className="glass-panel w-full max-w-xl rounded-3xl p-8 space-y-5"
            >
              <h3 className="text-2xl font-bold text-white">
                Start a New Q&amp;A Thread
              </h3>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Topic Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as ForumThread["category"])
                  }
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                >
                  <option value="LLM Agents">LLM Agents</option>
                  <option value="RAG & Vector DBs">RAG &amp; Vector DBs</option>
                  <option value="TypeScript & Next.js">TypeScript &amp; Next.js</option>
                  <option value="Hackathons">Hackathons</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Question or Discussion Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., How to optimize streaming tokens in Next.js 16?"
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Technical Context &amp; Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Describe your stack, reproduction steps, or hackathon idea..."
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="ag-btn-secondary rounded-xl px-5 py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ag-btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
