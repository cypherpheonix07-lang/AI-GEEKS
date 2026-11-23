// src/data/platformsData.ts

import { SITE_CONFIG, SOCIAL_LINKS } from "@/data/communityData";

export type PlatformCategory =
  | "Event & Campus Platforms"
  | "Social & Developer Channels";

export type JoinChannelSubCategory =
  | "Real-Time Chat"
  | "Events & Video"
  | "Code & Social";

export interface UnifiedPlatformEntry {
  id: string;
  name: string;
  handle: string;
  url: string;
  platformCategory: PlatformCategory;
  joinCategory: JoinChannelSubCategory;
  badge: string;
  description: string;
  isRegionalHub?: boolean;
  regionLabel?: string;
  recommendedForNewJoiners?: boolean;
}

export const EVENT_AND_CAMPUS_PLATFORMS: UnifiedPlatformEntry[] = [
  {
    id: "plat-tamilnadu-tech",
    name: "TamilNadu.tech",
    handle: "tamilnadu.tech",
    url: "https://tamilnadu.tech",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "TAMIL NADU TECH HUB",
    description:
      "Regional open-source community directory indexing Chennai and Tamil Nadu tech meetups, speakers, and developer groups.",
    isRegionalHub: true,
    regionLabel: "Chennai & Tamil Nadu",
  },
  {
    id: "plat-luma",
    name: "Luma",
    handle: "lu.ma/aigeeks",
    url: "https://lu.ma/aigeeks",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "OFFICIAL EVENT CALENDAR",
    description:
      "Official RSVP calendar for AI GEEKS Chennai in-person meetups, workshops, and community gatherings.",
    isRegionalHub: true,
    regionLabel: "Chennai · IST",
    recommendedForNewJoiners: true,
  },
  {
    id: "plat-devcarnival",
    name: "DevCarnival Chennai",
    handle: "devcarnival.com/communities/ai-geeks-chennai",
    url: "https://devcarnival.com/communities/ai-geeks-chennai/",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "REGIONAL COLLABORATOR",
    description:
      "Chennai practitioner-led developer collective connecting regional AI, cloud, and web communities.",
    isRegionalHub: true,
    regionLabel: "Chennai Ecosystem",
  },
  {
    id: "plat-knowafest",
    name: "KnowAFest",
    handle: "knowafest.com",
    url: "https://www.knowafest.com",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "CAMPUS & TECH FESTS",
    description:
      "Discover technical symposiums, workshops, and student developer events across Chennai and Tamil Nadu colleges.",
    isRegionalHub: true,
    regionLabel: "Chennai & TN Campuses",
  },
  {
    id: "plat-hack2skill",
    name: "Hack2skill",
    handle: "hack2skill.com",
    url: "https://hack2skill.com",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "TECH CAMPS & CHALLENGES",
    description:
      "Discover developer challenges, technical camps, and builder programs across India and global ecosystems.",
  },
  {
    id: "plat-devpost",
    name: "Devpost",
    handle: "devpost.com",
    url: "https://devpost.com",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Code & Social",
    badge: "PROJECT SHOWCASE",
    description:
      "Browse software builds, community showcases, and open developer demonstrations.",
  },
  {
    id: "plat-unstop",
    name: "Unstop",
    handle: "unstop.com",
    url: "https://unstop.com",
    platformCategory: "Event & Campus Platforms",
    joinCategory: "Events & Video",
    badge: "STUDENT & BUILDER HUB",
    description:
      "Explore student tech programs, coding challenges, and campus community initiatives.",
  },
];

const SOCIAL_CHANNEL_METADATA: Record<
  string,
  Omit<UnifiedPlatformEntry, "id" | "name" | "url" | "platformCategory">
> = {
  WhatsApp: {
    handle: "chat.whatsapp.com/aigeeks-chennai",
    joinCategory: "Real-Time Chat",
    badge: "INSTANT ANNOUNCEMENTS",
    description:
      "Fastest way to get instant Chennai meetup RSVP alerts, venue gate passes, and builder team-finder pings.",
    isRegionalHub: true,
    regionLabel: "Chennai · IST",
    recommendedForNewJoiners: true,
  },
  Discord: {
    handle: "discord.gg/aigeeks",
    joinCategory: "Real-Time Chat",
    badge: "BUILDER VOICE & CODE LABS",
    description:
      "24/7 technical channels for LLM agents, Next.js 16 debugging, code reviews, and live study rooms.",
    isRegionalHub: true,
    regionLabel: "Chennai Builder Chat",
    recommendedForNewJoiners: true,
  },
  GitHub: {
    handle: "github.com/aigeeks-community",
    joinCategory: "Code & Social",
    badge: "OPEN-SOURCE REPOS",
    description:
      "Fork starter kits, workshop repositories, verification scripts, and community web components.",
  },
  LinkedIn: {
    handle: "linkedin.com/company/aigeeks",
    joinCategory: "Code & Social",
    badge: "CAREER & PARTNER NETWORK",
    description:
      "Connect with engineering leaders, speakers, hiring partners, and post-meetup highlight recaps.",
  },
  YouTube: {
    handle: "youtube.com/@aigeeks",
    joinCategory: "Events & Video",
    badge: "KEYNOTE REPLAYS",
    description:
      "Watch full-length stage recordings, architecture deep dives, and demo day showcases.",
  },
  X: {
    handle: "@aigeeks_dev",
    joinCategory: "Code & Social",
    badge: "LIVE THREADS & DEMOS",
    description:
      "Follow live meetup threads, speaker announcements, and quick AI engineering tips.",
  },
  Instagram: {
    handle: "@aigeeks.community",
    joinCategory: "Code & Social",
    badge: "MEETUP REELS & MOMENTS",
    description:
      "Behind-the-scenes photos, speaker portraits, and highlights from our Chennai builder gatherings.",
  },
  Bluesky: {
    handle: "@aigeeks.bsky.social",
    joinCategory: "Code & Social",
    badge: "OPEN SOCIAL FEED",
    description:
      "Join our open-protocol developer feed for daily AI research notes and community updates.",
  },
  "npm / react.dev": {
    handle: "npmjs.com/package/react",
    joinCategory: "Code & Social",
    badge: "OFFICIAL REACT ECOSYSTEM",
    description:
      "Explore official React 19 packages, Server Components guides, and global community resources.",
  },
  "react.dev": {
    handle: "react.dev · Ecosystem Hub",
    joinCategory: "Code & Social",
    badge: "OFFICIAL REACT ECOSYSTEM",
    description:
      "Explore official React 19 documentation, Server Components guides, and global community resources.",
  },
};

export const SOCIAL_AND_DEVELOPER_CHANNELS: UnifiedPlatformEntry[] =
  SOCIAL_LINKS.filter((item) => item.label !== "Luma").map((item, idx) => {
    const slug = item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const meta = SOCIAL_CHANNEL_METADATA[item.label] || {
      handle: item.handleLabel || item.href.replace(/^https?:\/\//, ""),
      joinCategory: "Code & Social" as const,
      badge: "OFFICIAL CHANNEL",
      description: `Official ${SITE_CONFIG.name} presence on ${item.label} for community updates, sessions, and discussions.`,
    };

    return {
      id: `social-${idx}-${slug}`,
      name: item.label,
      url: item.href,
      platformCategory: "Social & Developer Channels",
      ...meta,
    };
  });

export const ALL_UNIFIED_PLATFORMS: UnifiedPlatformEntry[] = [
  ...EVENT_AND_CAMPUS_PLATFORMS,
  ...SOCIAL_AND_DEVELOPER_CHANNELS,
];

export const REGIONAL_HUB_PLATFORMS: UnifiedPlatformEntry[] =
  ALL_UNIFIED_PLATFORMS.filter((item) => Boolean(item.isRegionalHub));
