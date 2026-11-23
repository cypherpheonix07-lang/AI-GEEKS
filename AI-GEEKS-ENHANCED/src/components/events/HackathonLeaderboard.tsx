"use client";

import React, { useMemo, useState } from "react";
import {
  Trophy,
  ArrowBigUp,
  Github,
  ExternalLink,
  Plus,
  Code2,
  Sparkles,
  Award,
  Users,
  X,
  Send,
  Layers,
} from "lucide-react";
import {
  HACKATHON_PROJECTS,
  HackathonProject,
  HackathonTrack,
  SITE_CONFIG,
} from "@/data/communityData";

const TRACK_FILTERS: Array<"All Tracks" | HackathonTrack> = [
  "All Tracks",
  "LLM Agents & Triage",
  "Next.js & Generative UI",
  "RAG & Vector Infrastructure",
  "Open-Source DevTools",
];

type SortOption = "combined" | "judge" | "votes";

export default function HackathonLeaderboard() {
  const [projects, setProjects] = useState<HackathonProject[]>(HACKATHON_PROJECTS);
  const [selectedTrack, setSelectedTrack] = useState<"All Tracks" | HackathonTrack>("All Tracks");
  const [sortBy, setSortBy] = useState<SortOption>("combined");
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Submission Form State
  const [projectName, setProjectName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [buildersInput, setBuildersInput] = useState("");
  const [track, setTrack] = useState<HackathonTrack>("LLM Agents & Triage");
  const [tagline, setTagline] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  const handleVote = (id: string) => {
    const alreadyVoted = Boolean(upvotedIds[id]);
    setUpvotedIds((prev) => ({ ...prev, [id]: !alreadyVoted }));
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              communityVotes: alreadyVoted
                ? proj.communityVotes - 1
                : proj.communityVotes + 1,
            }
          : proj
      )
    );
  };

  // Calculate weighted score: 70% Judge Score + 30% Normalized Community Votes
  const computeCombinedScore = (proj: HackathonProject) => {
    const voteBonus = Math.min(30, proj.communityVotes * 0.2);
    return Number((proj.judgeScore * 0.7 + voteBonus).toFixed(1));
  };

  const rankedProjects = useMemo(() => {
    const filtered = projects.filter((p) =>
      selectedTrack === "All Tracks" ? true : p.track === selectedTrack
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "judge") return b.judgeScore - a.judgeScore;
      if (sortBy === "votes") return b.communityVotes - a.communityVotes;
      return computeCombinedScore(b) - computeCombinedScore(a);
    });
  }, [projects, selectedTrack, sortBy]);

  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !teamName.trim() || !tagline.trim()) return;

    const newEntry: HackathonProject = {
      id: `hack-${Date.now()}`,
      projectName: projectName.trim(),
      teamName: teamName.trim(),
      builders: buildersInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      track,
      tagline: tagline.trim(),
      techStack: techStackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      judgeScore: 86,
      communityVotes: 1,
      githubUrl: githubUrl.trim() || "https://github.com",
      demoUrl: demoUrl.trim() || "https://lu.ma/aigeeks",
      badge: "NEW SUBMISSION · PURE SOFTWARE",
    };

    setProjects((prev) => [newEntry, ...prev]);
    setProjectName("");
    setTeamName("");
    setBuildersInput("");
    setTagline("");
    setTechStackInput("");
    setGithubUrl("");
    setDemoUrl("");
    setShowSubmitModal(false);
  };

  return (
    <section
      id="hackathon-leaderboard"
      className="relative overflow-hidden bg-[#020813] py-24 px-6 text-slate-100"
    >
      {/* Top Specular Frosted Sky Edge Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
      />

      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[440px] w-[880px] rounded-full bg-gradient-to-tr from-[#163B63]/50 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header + Submit Project CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Trophy className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                24-HOUR PURE-SOFTWARE HACKATHON · LIVE STANDINGS
              </span>
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Hackathon Leaderboard &amp;{" "}
              <span className="ag-text-gradient">Project Showcase.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed">
              Explore pure-software builds shipped by {SITE_CONFIG.name} teams
              across autonomous LLM agents, Next.js 16 streaming UIs, RAG
              pipelines, and open-source developer tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Hackathon Project</span>
            </button>
          </div>
        </div>

        {/* Track Filters & Sort Bar */}
        <div className="mt-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4 rounded-3xl bg-[#051020]/85 p-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            {TRACK_FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedTrack(item)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
 selectedTrack === item
 ? "ag-btn-primary"
 : "ag-btn-secondary"
 }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start xl:self-auto">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#80D8FF]">
              Rank By:
            </span>
            <div className="inline-flex rounded-xl bg-[#020813] p-1">
              {(
                [
                  { id: "combined", label: "Combined Score" },
                  { id: "judge", label: "Judge Rubric" },
                  { id: "votes", label: "Community Votes" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase transition-all ${
 sortBy === opt.id
 ? "bg-gradient-to-r from-[#4DA8DA] to-[#2B6CB0] text-[#020813] font-bold"
 : "text-slate-300 hover:text-[#C4EEFF]"
 }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ranked Project Cards Grid */}
        <div className="mt-10 space-y-6">
          {rankedProjects.map((project, index) => {
            const rankNumber = String(index + 1).padStart(2, "0");
            const isTopThree = index < 3;
            const hasVoted = Boolean(upvotedIds[project.id]);
            const combinedScore = computeCombinedScore(project);

            return (
              <article
                key={project.id}
                className={`glass-panel group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
 index === 0
 ? "shadow-[0_0_42px_rgba(128,216,255,0.32)]"
 : ""
 }`}
              >
                {/* Top Specular Frosted Sky Sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-85"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Rank Badge & Project Identity */}
                  <div className="lg:col-span-7 flex items-start gap-5">
                    <div
                      className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl font-mono ${
 isTopThree
 ? "bg-gradient-to-br from-[#80D8FF]/35 via-[#2B6CB0] to-[#091B32] text-[#C4EEFF] shadow-[0_0_24px_rgba(128,216,255,0.3)]"
 : "bg-[#051020] text-[#80D8FF]"
 }`}
                    >
                      <span className="text-[10px] uppercase tracking-widest opacity-80">
                        RANK
                      </span>
                      <span className="text-xl font-extrabold">
                        #{rankNumber}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                          {project.track}
                        </span>
                        {project.badge && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#163B63]/80 px-3 py-0.5 font-mono text-[10px] font-bold text-[#C4EEFF]">
                            <Award className="h-3 w-3 text-[#80D8FF]" />
                            {project.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-baseline gap-3">
                        <h3 className="text-2xl font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                          {project.projectName}
                        </h3>
                        <span className="font-mono text-xs text-[#80D8FF]">
                          by {project.teamName}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-200/90 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Builders & Tech Stack Pills */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#051020] px-2.5 py-1 font-mono text-[11px] text-[#C4EEFF]">
                          <Users className="h-3 w-3 text-[#80D8FF]" />
                          {project.builders.join(", ")}
                        </span>

                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-[#16202C] px-2.5 py-1 font-mono text-[11px] text-[#80D8FF]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Telemetry Scores, Upvote Button & Proof-of-Work Links */}
                  <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-4 pt-4 lg:pt-0">
                    {/* Score Telemetry Box */}
                    <div className="grid grid-cols-2 gap-2.5 rounded-2xl bg-[#051020]/90 p-3.5 text-center min-w-[190px]">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          JUDGE RUBRIC
                        </p>
                        <p className="mt-0.5 font-mono text-lg font-extrabold text-[#80D8FF]">
                          {project.judgeScore}
                          <span className="text-xs text-slate-400">/100</span>
                        </p>
                      </div>
                      <div className="pl-2.5">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          FINAL INDEX
                        </p>
                        <p className="mt-0.5 font-mono text-lg font-extrabold text-[#C4EEFF]">
                          {combinedScore}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Upvote + Repo/Demo Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleVote(project.id)}
                        className={`inline-flex flex-col items-center justify-center rounded-2xl px-4 py-2.5 font-mono transition-all ${
                          hasVoted
                            ? "ag-btn-primary"
                            : "ag-btn-secondary"
                        }`}
                      >
                        <ArrowBigUp
                          className={`h-5 w-5 ${
 hasVoted
 ? "fill-[#020813] text-[#020813]"
 : "text-[#80D8FF]"
 }`}
                        />
                        <span className="text-xs font-extrabold">
                          {project.communityVotes}
                        </span>
                      </button>

                      <div className="flex flex-col gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                        >
                          <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                          <span>Source</span>
                        </a>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ag-btn-primary inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pure-Software Project Submission Modal */}
        {showSubmitModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setShowSubmitModal(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleCreateSubmission}
              className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
              />

              <div className="flex items-center justify-between pb-4">
                <div>
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                    <Code2 className="h-3 w-3 text-[#80D8FF]" />
                    <span>PURE-SOFTWARE HACKATHON SUBMISSION</span>
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    Ship Your Project to the Live Leaderboard
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="ag-btn-secondary rounded-xl p-2"
                >
                  <X className="h-4 w-4 text-[#C4EEFF]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., AgentTrace Studio"
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g., Latent Space Collective"
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Software Track *
                  </label>
                  <select
                    value={track}
                    onChange={(e) => setTrack(e.target.value as HackathonTrack)}
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  >
                    <option value="LLM Agents & Triage">
                      LLM Agents &amp; Triage
                    </option>
                    <option value="Next.js & Generative UI">
                      Next.js &amp; Generative UI
                    </option>
                    <option value="RAG & Vector Infrastructure">
                      RAG &amp; Vector Infrastructure
                    </option>
                    <option value="Open-Source DevTools">
                      Open-Source DevTools
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Team Builders (Comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={buildersInput}
                    onChange={(e) => setBuildersInput(e.target.value)}
                    placeholder="e.g., Builder 1, Builder 2"
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                  Architecture Pitch / Tagline *
                </label>
                <textarea
                  rows={3}
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Describe what your software project solves and how it was architected..."
                  className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Tech Stack Tags *
                  </label>
                  <input
                    type="text"
                    required
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="Next.js 16, TypeScript, GSAP"
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                    Live Deployment URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="ag-btn-secondary rounded-xl px-5 py-2.5 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish to Live Leaderboard</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
