"use client";

import React, { useState } from "react";
import { MessageSquare, Heart, Repeat, Share2, CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";
import { PhosphorIcons } from "@/components/layout/Footer";

export interface SocialPostItem {
  id: string;
  platform: "x" | "linkedin";
  authorName: string;
  authorHandle: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  date: string;
  likes: number;
  reposts: number;
  url: string;
  tag?: string;
}

export const TWEET_POSTS: SocialPostItem[] = [
  {
    id: "tweet-01",
    platform: "x",
    authorName: "Karthik Subramanian",
    authorHandle: "@karthik_codes",
    authorRole: "Senior Frontend Engineer",
    authorAvatar: "/images/team/member-01.jpg",
    content: "Just attended @AIGeeks x Chennai React Meetup at Walmart Global Tech! The session on Next.js 16 RSC streaming and multi-agent coordination was mind-blowing. Hands down Chennai's best developer community! 🔥 #ChennaiReact #AIGeeks",
    date: "Sep 20",
    likes: 184,
    reposts: 42,
    url: "https://x.com/chennaireact",
    tag: "Meetup #12",
  },
  {
    id: "tweet-02",
    platform: "x",
    authorName: "Divya Nambiar",
    authorHandle: "@divya_ml",
    authorRole: "AI Research Fellow @ IITM",
    authorAvatar: "/images/team/member-02.jpg",
    content: "Fireside chat on stateful LLM evaluation was packed today. 280+ engineers in one room sharing production post-mortems and tool-calling patterns. Proud to be part of @AIGeeks! 🚀",
    date: "Nov 08",
    likes: 246,
    reposts: 67,
    url: "https://x.com/chennaireact",
    tag: "Speaker",
  },
  {
    id: "tweet-03",
    platform: "x",
    authorName: "Arun Prasad",
    authorHandle: "@arun_dev",
    authorRole: "Full Stack Builder",
    authorAvatar: "/images/team/member-03.jpg",
    content: "First time at @AIGeeks meetup today. The networking is unreal — ended up finding two co-builders for our pure-software hackathon project before lunch. Chennai tech scene is buzzing! ⚡",
    date: "Oct 18",
    likes: 142,
    reposts: 28,
    url: "https://x.com/chennaireact",
    tag: "Community",
  },
  {
    id: "tweet-04",
    platform: "x",
    authorName: "Siddharth Verma",
    authorHandle: "@sidd_systems",
    authorRole: "Principal Systems Architect",
    authorAvatar: "/images/team/member-04.jpg",
    content: "Demoed local SLM fine-tuning using Ollama and WebGPU today. The questions from the audience were as sharp as any major international tech conference. Massive respect to the organizers! 👏",
    date: "Aug 23",
    likes: 310,
    reposts: 89,
    url: "https://x.com/chennaireact",
    tag: "Keynote",
  },
];

export const LINKEDIN_POSTS: SocialPostItem[] = [
  {
    id: "linkedin-01",
    platform: "linkedin",
    authorName: "Pooja Sundaram",
    authorHandle: "poojasundaram",
    authorRole: "Engineering Manager · Talentship",
    authorAvatar: "/images/team/member-05.jpg",
    content: "Sponsoring and hosting AI GEEKS was one of our team's highlights this quarter. The caliber of engineers building autonomous agent tooling and production React systems in Chennai is truly world-class. Looking forward to our next collaboration!",
    date: "2 weeks ago",
    likes: 420,
    reposts: 58,
    url: "https://www.linkedin.com/company/chennaireact/",
    tag: "Venue Sponsor",
  },
  {
    id: "linkedin-02",
    platform: "linkedin",
    authorName: "Rajesh Kannan",
    authorHandle: "rajesh-kannan-ai",
    authorRole: "Winner · AI GEEKS 24-Hour Pure-Software Hackathon",
    authorAvatar: "/images/team/member-06.jpg",
    content: "Our team just took 1st place in the Multi-Agent Triage Track! 24 hours of pure software development, automated CI evaluations, and live stage presentations. Huge thanks to the mentors and jury for incredible feedback. #AIGeeks #Hackathon",
    date: "1 month ago",
    likes: 567,
    reposts: 84,
    url: "https://www.linkedin.com/company/chennaireact/",
    tag: "Hackathon Winner",
  },
  {
    id: "linkedin-03",
    platform: "linkedin",
    authorName: "Meera Krishnan",
    authorHandle: "meerakrishnan-ux",
    authorRole: "Lead Design Technologist",
    authorAvatar: "/images/team/member-07.jpg",
    content: "Loved presenting on 'Metallic Glass Tokens and Framer Motion Spring Physics' at the AI GEEKS Creators Lounge. Seeing Chennai designers and frontend engineers bridge the gap to production code is inspiring.",
    date: "3 weeks ago",
    likes: 389,
    reposts: 45,
    url: "https://www.linkedin.com/company/chennaireact/",
    tag: "Workshop Lead",
  },
  {
    id: "linkedin-04",
    platform: "linkedin",
    authorName: "Anand Venkatesh",
    authorHandle: "anandv-cloud",
    authorRole: "Cloud Solutions Architect",
    authorAvatar: "/images/team/member-08.jpg",
    content: "Chennai is rapidly emerging as a premier hub for AI engineering in India. Communities like AI GEEKS & Chennai React are the engine driving grassroots innovation, peer learning, and hands-on open source contributions.",
    date: "1 month ago",
    likes: 612,
    reposts: 96,
    url: "https://www.linkedin.com/company/chennaireact/",
    tag: "Industry Leader",
  },
];

function SocialCard({ post }: { post: SocialPostItem }) {
  const isTwitter = post.platform === "x";

  return (
    <article className="group relative w-[340px] sm:w-[400px] shrink-0 overflow-hidden rounded-3xl bg-[#091B32]/75 hover:bg-[#0F2744]/95 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_36px_rgba(2,8,19,0.55)] hover:shadow-[0_18px_45px_rgba(43,108,176,0.3)] flex flex-col justify-between">
      {/* Specular Top Rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div>
        {/* Header: Avatar, Names, Platform Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#163B63] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/team/member-01.jpg";
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <strong className="text-sm font-bold text-white group-hover:text-[#C4EEFF] transition-colors truncate">
                  {post.authorName}
                </strong>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#80D8FF] shrink-0" />
              </div>
              <p className="text-xs text-slate-400 font-mono truncate">
                {isTwitter ? post.authorHandle : post.authorRole}
              </p>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#020813]/60 text-slate-300 group-hover:text-white transition-colors shrink-0">
            {isTwitter ? (
              <PhosphorIcons.X className="h-4 w-4" />
            ) : (
              <PhosphorIcons.LinkedIn className="h-4 w-4" />
            )}
          </div>
        </div>

        {/* Content */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Footer Meta & Stats */}
      <div className="mt-5 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-[#80D8FF] transition-colors">
            <Heart className="h-3.5 w-3.5 text-rose-400/80" />
            <span>{post.likes}</span>
          </span>
          <span className="flex items-center gap-1 hover:text-[#80D8FF] transition-colors">
            <Repeat className="h-3.5 w-3.5 text-emerald-400/80" />
            <span>{post.reposts}</span>
          </span>
        </div>

        <span className="text-[11px] text-slate-500">{post.date}</span>
      </div>
    </article>
  );
}

export default function AceternitySocialMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="community-voices"
      className="relative overflow-hidden bg-[#020813] py-24 text-slate-100"
    >
      {/* Specular Divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/50 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#091B32]/80 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[#80D8FF] backdrop-blur-md mb-3 shadow-[inset_0_1px_0_0_rgba(196,238,255,0.15)]">
          <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
          <span>REAL COMMUNITY FEEDBACK &amp; SHOUTOUTS</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Loved by builders. <br />
          <span className="ag-text-gradient">Celebrated across Chennai.</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Hear from founders, attendees, hackathon teams, and speakers sharing their experiences across X and LinkedIn.
        </p>
      </div>

      {/* Marquee Container with Left/Right Ambient Fade Masks */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Shadows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#020813] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#020813] to-transparent z-10"
        />

        {/* Row 1: Scrolling LEFT (Tweets) */}
        <div className="flex gap-6 mb-6 w-max animate-marquee-left" style={{ animationPlayState: isPaused ? "paused" : "running" }}>
          {[...TWEET_POSTS, ...TWEET_POSTS, ...TWEET_POSTS].map((post, idx) => (
            <SocialCard post={post} key={`tweet-${post.id}-${idx}`} />
          ))}
        </div>

        {/* Row 2: Scrolling RIGHT (LinkedIn Posts) */}
        <div className="flex gap-6 w-max animate-marquee-right" style={{ animationPlayState: isPaused ? "paused" : "running" }}>
          {[...LINKEDIN_POSTS, ...LINKEDIN_POSTS, ...LINKEDIN_POSTS].map((post, idx) => (
            <SocialCard post={post} key={`linkedin-${post.id}-${idx}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
