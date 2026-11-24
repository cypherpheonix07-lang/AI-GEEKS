import agendaData from "./devfest/agenda.json";
import speakersData from "./devfest/speakers.json";
import archiveData from "./devfest/archive.json";

export interface DevFestSpeaker {
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  links: {
    twitter: string | null;
    linkedin: string | null;
    github: string | null;
  };
  talkIds: string[];
}

export interface DevFestSession {
  id: string;
  track: string | null;
  start: string;
  end: string;
  title: string;
  hall: string;
  type: string;
  speakerSlugs: string[];
  description: string;
}

export interface DevFestArchivePhoto {
  src: string;
  title: string;
  description: string;
  year: number;
  width: number;
  height: number;
  source: string;
  role: string;
}

export interface DevFestTrack {
  slug: string;
  name: string;
  description: string;
  color: string;
  badgeBg: string;
}

export const DEVFEST_CONFIG = {
  name: "DevFest Chennai 2026",
  tagline: "India's Flagship Developer Festival · Chennai Chapter",
  date: "October 17, 2026",
  time: "08:00 AM - 06:30 PM IST",
  venue: {
    name: "IIT Madras Research Park",
    address: "Kanagam Road, Taramani, Chennai, Tamil Nadu 600113",
    capacity: "1,200+ Developers",
    halls: ["Auditorium 1", "Hall A", "Hall B", "Hall C", "Workshop Lab", "Community Lounge"],
  },
  stats: [
    { label: "Attendees", value: "1,200+" },
    { label: "Speakers", value: "30+" },
    { label: "Tracks", value: "8" },
    { label: "Sessions", value: "68" },
  ],
};

export const DEVFEST_TRACKS: DevFestTrack[] = [
  {
    slug: "ai-agents",
    name: "AI & Agents",
    description: "Multi-agent systems, LLM orchestration, RAG, and reasoning frameworks.",
    color: "#80D8FF",
    badgeBg: "bg-[#0A1A2F]/80 text-[#80D8FF]",
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    description: "Cloud-native infrastructure, Kubernetes, serverless, and edge compute.",
    color: "#4DA8DA",
    badgeBg: "bg-[#091B32]/80 text-[#4DA8DA]",
  },
  {
    slug: "web-react",
    name: "Web & React",
    description: "React 19, Next.js 16, RSC architecture, and frontend performance.",
    color: "#00D4FF",
    badgeBg: "bg-[#000521]/80 text-[#00D4FF]",
  },
  {
    slug: "mobile-android",
    name: "Mobile & Android",
    description: "Jetpack Compose, Kotlin Multiplatform, and on-device AI.",
    color: "#34A853",
    badgeBg: "bg-[#062412]/80 text-[#34A853]",
  },
  {
    slug: "open-source",
    name: "Open Source",
    description: "FOSS tooling, community infrastructure, and maintainer ecosystems.",
    color: "#FBBC04",
    badgeBg: "bg-[#251D04]/80 text-[#FBBC04]",
  },
  {
    slug: "security",
    name: "Security & Zero Trust",
    description: "AppSec, supply-chain verification, identity, and cryptographic audit.",
    color: "#EA4335",
    badgeBg: "bg-[#270805]/80 text-[#EA4335]",
  },
  {
    slug: "design-systems",
    name: "Design & UX",
    description: "Motion physics, spatial interfaces, design systems, and fluid ergonomics.",
    color: "#C4EEFF",
    badgeBg: "bg-[#0F2744]/80 text-[#C4EEFF]",
  },
  {
    slug: "emerging-tech",
    name: "Emerging Tech",
    description: "WebAssembly, quantum algorithms, local edge models, and robotics.",
    color: "#A78BFA",
    badgeBg: "bg-[#1E1138]/80 text-[#A78BFA]",
  },
];

export const DEVFEST_TICKETS = [
  {
    id: "early-bird-student",
    name: "Student Pass (Early Bird)",
    price: "₹349",
    originalPrice: "₹799",
    badge: "55% OFF",
    status: "SELLING FAST",
    features: [
      "Full 1-day access to all 8 stages and auditoriums",
      "Official DevFest Chennai 2026 swag kit & tee",
      "Lunch, refreshments & evening networking snacks",
      "Access to all 4 live mini-games & leaderboard perks",
      "Valid Student ID required at registration desk",
    ],
  },
  {
    id: "pro-general",
    name: "Professional Pass",
    price: "₹899",
    originalPrice: "₹1,499",
    badge: "POPULAR",
    status: "ON SALE",
    features: [
      "Access to all 68 keynote sessions and panels",
      "Priority entry into workshop labs and live lounges",
      "Official DevFest premium merch kit & metallic badge",
      "Catered gourmet buffet lunch & networking high tea",
      "Access to attendee recruitment portal & career hub",
    ],
  },
  {
    id: "women-diverse",
    name: "Women & Diversity in Tech",
    price: "₹499",
    originalPrice: "₹1,199",
    badge: "SUBSIDIZED",
    status: "ON SALE",
    features: [
      "Sponsored access subsidized by Community Partners",
      "Exclusive entry to Women Techmakers (WTM) Lounge",
      "1-on-1 mentorship sessions with keynote leaders",
      "Full access to all 8 conference tracks & halls",
      "DevFest community swag kit & certificate of participation",
    ],
  },
  {
    id: "vip-patron",
    name: "VIP / Community Patron",
    price: "₹2,499",
    originalPrice: "₹3,999",
    badge: "LIMITED",
    status: "FEW SEATS LEFT",
    features: [
      "Reserved front-row seating across all keynotes",
      "Exclusive Speaker & Patron Lounge access",
      "Special Edition commemorative hardware souvenir",
      "All-day curated executive hospitality & barista coffee",
      "Invitation to Private VIP Networking Dinner with Speakers",
    ],
  },
];

export const DEVFEST_GAMES = [
  {
    id: "jigsaw",
    title: "DevFest Jigsaw Puzzle",
    subtitle: "Reassemble iconic Chennai DevFest moments",
    category: "Visual Spatial",
    xpReward: "350 XP",
    icon: "🧩",
    difficulty: "Adaptive (3x3 to 5x5)",
    description: "Piece together real historical photography from DevFest Chennai 2024 & 2025 before the timer expires.",
  },
  {
    id: "crossword",
    title: "Google Ecosystem Crossword",
    subtitle: "Decipher cloud, mobile & AI clues",
    category: "Tech Trivia",
    xpReward: "450 XP",
    icon: "📝",
    difficulty: "Medium",
    description: "A tailored crossword puzzle featuring Android, Gemini, Cloud Run, Go, and React engineering concepts.",
  },
  {
    id: "memory-matrix",
    title: "Memory Matrix",
    subtitle: "Train your neural pattern recall",
    category: "Cognitive",
    xpReward: "500 XP",
    icon: "⚡",
    difficulty: "Progressive (Rounds 1-12)",
    description: "Observe the glowing quantum bracket pattern, remember the coordinate matrix, and repeat the sequence.",
  },
  {
    id: "speed-typer",
    title: "Syntax Speed Typer",
    subtitle: "Test your coding throughput (WPM)",
    category: "Skill & Reflex",
    xpReward: "400 XP",
    icon: "⌨️",
    difficulty: "Fast-Paced",
    description: "Type real production Next.js 16 and Gemini AI prompt code snippets with zero typos to climb the leaderboard.",
  },
];

export const DEVFEST_SPEAKERS: DevFestSpeaker[] = speakersData as DevFestSpeaker[];
export const DEVFEST_AGENDA: DevFestSession[] = agendaData as DevFestSession[];
export const DEVFEST_ARCHIVE: DevFestArchivePhoto[] = archiveData as DevFestArchivePhoto[];
