export interface NavItem {
  label: string;
  href: string;
}

export interface CommunityStat {
  value: string;
  label: string;
}

export interface ExplorerPhoto {
  id: string;
  indexLabel: string;
  title: string;
  speakerOrContext: string;
  description: string;
  imageUrl: string;
}

export interface MomentItem {
  id: string;
  number: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface GalleryMediaItem {
  id: string;
  type: "photo" | "video";
  title: string;
  caption: string;
  eventTag: string;
  date: string;
  location: string;
  duration?: string;
  thumbnailUrl: string;
  mediaUrl: string;
}

export interface ForumReply {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  isAcceptedAnswer?: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  category:
    | "LLM Agents"
    | "RAG & Vector DBs"
    | "TypeScript & Next.js"
    | "Hackathons";
  author: string;
  authorRole: string;
  createdAt: string;
  upvotes: number;
  solved: boolean;
  summary: string;
  codeSnippet?: string;
  replies: ForumReply[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department:
    | "Architecture & AI"
    | "Operations & Venues"
    | "Stage & Emcee"
    | "Design & Community";
  inChargeOf: string;
  bio: string;
  avatarUrl: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

export interface PastSpeaker {
  id: string;
  name: string;
  roleAndCompany: string;
  role?: string;
  organization?: string;
  talkTitle?: string;
  abstract?: string;
  topicCategory?: "AI Agents" | "Frontend & React" | "Infrastructure" | "Architecture";
  eventEdition?: string;
  eventDate?: string;
  avatarUrl?: string;
  slidesUrl?: string;
  portfolio?: string;
  github?: string;
  linkedin: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  tier?: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface LumaEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  lumaUrl: string;
  status: "upcoming" | "past";
  track: string;
  month?: string;
  day?: string;
  year?: string;
}

export interface SponsorTier {
  id: string;
  name: string;
  badge: string;
  priceLabel: string;
  description: string;
  perks: string[];
  highlighted?: boolean;
}

export type HackathonTrack =
  | "LLM Agents & Triage"
  | "Next.js & Generative UI"
  | "RAG & Vector Infrastructure"
  | "Open-Source DevTools";

export interface HackathonProject {
  id: string;
  projectName: string;
  teamName: string;
  builders: string[];
  track: HackathonTrack;
  tagline: string;
  techStack: string[];
  judgeScore: number;
  communityVotes: number;
  githubUrl: string;
  demoUrl: string;
  badge?: string;
}

export interface SocialLinkItem extends NavItem {
  packageOrSource: "npm" | "github" | "social" | "events" | "docs";
  handleLabel: string;
}

export const SITE_CONFIG = {
  name: "AI GEEKS",
  shortName: "AI Geeks",
  domain: "https://aigeeks.community",
  tagline: "The home for AI builders, React developers, and innovators.",
  topBannerText:
    "✳ VANAKKAM, DEVELOPERS & AI BUILDERS! ✳ MADE FOR THE COMMUNITY, BY THE COMMUNITY ✳",
  description:
    "Our community for people who love to learn, build, and share AI, LLMs, React, and modern software.",
  lumaCalendarUrl: "https://lu.ma/aigeeks",
  callForSpeakersUrl: "/sponsor#speak",
  callForSponsorsUrl: "/sponsor",
  mascotAssetPath: "/images/brand/aigeeks-3d-mascot.png",
  logoAssetPath: "/images/brand/aigeeks-logo.svg",
};

// Settings, Admin, and Search removed from Navbar per specification
export const NAV_LINKS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Past speakers", href: "/past-speakers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Platforms", href: "/platforms" },
  { label: "Forum & Q&A", href: "/forum" },
  { label: "Team", href: "/team" },
  { label: "Sponsors", href: "/sponsor" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
];

export const COMMUNITY_STATS: CommunityStat[] = [
  { value: "10k+", label: "Members" },
  { value: "12+", label: "Meetups & Hackathons" },
  { value: "2+", label: "Years" },
];

export const EXPLORER_PHOTOS: ExplorerPhoto[] = [
  {
    id: "exp-01",
    indexLabel: "01",
    title: "Multi-Agent Systems in Production",
    speakerOrContext: "AI Architecture Deep Dive",
    description:
      "Community members sharing ideas, experiences, and the autonomous workflows they have learned to ship.",
    imageUrl: "/images/explorer/photo-01.jpg",
  },
  {
    id: "exp-02",
    indexLabel: "02",
    title: "Hands-On LLM Fine-Tuning & RAG Lab",
    speakerOrContext: "Weekend Builder Lab",
    description:
      "Live coding sessions walking through local inference, quantization, and deterministic RAG evaluation.",
    imageUrl: "/images/explorer/photo-02.jpg",
  },
  {
    id: "exp-03",
    indexLabel: "03",
    title: "24-Hour Software Hackathon Demos",
    speakerOrContext: "Ship-It Finale",
    description:
      "Builders presenting working pure-software prototypes to peers, mentors, and engineering leaders.",
    imageUrl: "/images/explorer/photo-03.jpg",
  },
  {
    id: "exp-04",
    indexLabel: "04",
    title: "Fireside Chat on Modern Front-End & AI UX",
    speakerOrContext: "Panel Discussion",
    description:
      "Exploring how streaming React Server Components and metallic glassmorphic tokens reshape web apps.",
    imageUrl: "/images/explorer/photo-04.jpg",
  },
  {
    id: "exp-05",
    indexLabel: "05",
    title: "Open Source Lightning Talks",
    speakerOrContext: "Community Stage",
    description:
      "Five-minute rapid-fire demos from first-time speakers, student innovators, and indie hackers.",
    imageUrl: "/images/explorer/photo-05.jpg",
  },
  {
    id: "exp-06",
    indexLabel: "06",
    title: "Networking & Builder Mixer",
    speakerOrContext: "Post-Meetup Connect",
    description:
      "Where hackathon teammates, co-founders, and open-source collaborators connect in person.",
    imageUrl: "/images/explorer/photo-06.jpg",
  },
];

export const COMMUNITY_MOMENTS: MomentItem[] = Array.from({ length: 14 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: `moment-${num}`,
    number: num,
    title: `Community moment ${num}`,
    caption: "A moment from the AI GEEKS community.",
    imageUrl: `/images/moments/moment-${num}.jpg`,
  };
});

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: "gal-01",
    type: "photo",
    title: "Packed Auditorium at AI GEEKS Meetup #12",
    caption:
      "Over 280 builders gathered for deep-dive sessions on LLM agents and React 19.",
    eventTag: "Meetup #12",
    date: "Nov 2026",
    location: "IIT Madras Research Park, Chennai",
    thumbnailUrl: "/images/moments/moment-01.jpg",
    mediaUrl: "/images/moments/moment-01.jpg",
  },
  {
    id: "gal-02",
    type: "video",
    title: "Keynote Replay: Building Stateful Triage Agents in TypeScript",
    caption:
      "Full stage recording with live repository debugging and architecture walk-through.",
    eventTag: "Session Video",
    date: "Oct 2026",
    location: "Thoughtworks Olympus, Chennai",
    duration: "28:14",
    thumbnailUrl: "/images/moments/moment-02.jpg",
    mediaUrl: "https://www.youtube.com",
  },
  {
    id: "gal-03",
    type: "photo",
    title: "24-Hour Pure-Software Hackathon Finale & Judging",
    caption:
      "Top 10 software teams pitching live prototypes to the community judging panel.",
    eventTag: "Hackathon",
    date: "Oct 2026",
    location: "TIDEL Park Auditorium, Chennai",
    thumbnailUrl: "/images/moments/moment-03.jpg",
    mediaUrl: "/images/moments/moment-03.jpg",
  },
  {
    id: "gal-04",
    type: "video",
    title: "AI GEEKS 2026 Community Aftermovie",
    caption:
      "Highlights from 12+ meetups, lightning talks, and builder networking mixers.",
    eventTag: "Aftermovie",
    date: "Sep 2026",
    location: "Chennai, India",
    duration: "03:45",
    thumbnailUrl: "/images/moments/moment-04.jpg",
    mediaUrl: "https://www.youtube.com",
  },
  {
    id: "gal-05",
    type: "photo",
    title: "Speaker Q&A Panel & Live Code Walkthrough",
    caption:
      "Interactive audience Q&A dissecting RAG latency and edge caching strategies.",
    eventTag: "Meetup #11",
    date: "Sep 2026",
    location: "WSO2 Chennai Hub",
    thumbnailUrl: "/images/moments/moment-05.jpg",
    mediaUrl: "/images/moments/moment-05.jpg",
  },
  {
    id: "gal-06",
    type: "video",
    title: "Workshop Replay: GSAP ScrollTrigger + Next.js 16 App Router",
    caption:
      "Step-by-step live coding session building pinned horizontal galleries.",
    eventTag: "Workshop Video",
    date: "Aug 2026",
    location: "Yuniq Innovation Center",
    duration: "41:10",
    thumbnailUrl: "/images/moments/moment-06.jpg",
    mediaUrl: "https://www.youtube.com",
  },
];

export const FORUM_THREADS: ForumThread[] = [
  {
    id: "thd-01",
    title:
      "How do you prevent state drift in multi-agent bug reproduction pipelines?",
    category: "LLM Agents",
    author: "Aravind Kumar",
    authorRole: "Staff AI Engineer",
    createdAt: "2 hours ago",
    upvotes: 42,
    solved: true,
    summary:
      "When running an automated developer triage loop across 5+ tool calls, context windows often accumulate stale AST diffs. What deterministic checkpoint pattern works best?",
    codeSnippet: `const checkpoint = await agentState.snapshot({
  verifyDeterministic: true,
  pruneStaleDiffs: true,
});`,
    replies: [
      {
        id: "rep-101",
        author: "Aarav Mehta",
        role: "Lead Organizer",
        content:
          "Use an immutable state reducer between every tool execution step and store only verified execution hashes rather than raw stdout logs.",
        timestamp: "1 hour ago",
        isAcceptedAnswer: true,
      },
    ],
  },
  {
    id: "thd-02",
    title:
      "Best practices for syncing Lenis smooth scroll with GSAP ScrollTrigger in Next.js 16?",
    category: "TypeScript & Next.js",
    author: "Diya Menon",
    authorRole: "Core team",
    createdAt: "5 hours ago",
    upvotes: 31,
    solved: true,
    summary:
      "Pinned horizontal sections can jitter on route transitions if ScrollTrigger isn't refreshed after App Router hydration.",
    replies: [
      {
        id: "rep-201",
        author: "Ananya Rao",
        role: "Core team",
        content:
          "Bind lenis.on('scroll', ScrollTrigger.update), disable gsap.ticker.lagSmoothing(0), and trigger ScrollTrigger.refresh() inside a pathname useEffect.",
        timestamp: "3 hours ago",
        isAcceptedAnswer: true,
      },
    ],
  },
];

export const LUMA_EVENTS: LumaEventItem[] = [
  {
    id: "evt-01",
    title: "AI GEEKS Meetup #13: Multi-Agent Architectures & Next.js 16 Streaming UIs",
    date: "Sat, 12 Dec, 2026",
    time: "10:00 am IST",
    venue: "IIT Madras Research Park, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "upcoming",
    track: "AI & Frontend Architecture",
    month: "DEC",
    day: "12",
    year: "2026",
  },
  {
    id: "evt-02",
    title: "AI GEEKS 24-Hour Pure Software Hackathon 2027",
    date: "Sat, 09 Jan, 2027",
    time: "9:00 am IST",
    venue: "TIDEL Park Main Auditorium, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "upcoming",
    track: "Pure-Software Hackathon",
    month: "JAN",
    day: "09",
    year: "2027",
  },
  {
    id: "evt-03",
    title: "React India x AI GEEKS Meetup 2026",
    date: "Sat, 19 Sept, 2026",
    time: "1:30 pm IST",
    venue: "Walmart Global Tech, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Flagship Collaboration",
    month: "SEPT",
    day: "19",
    year: "2026",
  },
  {
    id: "evt-04",
    title: "AI GEEKS Meetup #12: RAG Evaluation, Vector Indexing & TypeScript SDKs",
    date: "Sat, 07 Nov, 2026",
    time: "10:00 am IST",
    venue: "Thoughtworks Olympus, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Applied AI Engineering",
    month: "NOV",
    day: "07",
    year: "2026",
  },
  {
    id: "evt-05",
    title: "AI GEEKS Meetup #11: Fine-Tuning SLMs on Consumer GPUs & Local Ollama",
    date: "Sat, 17 Oct, 2026",
    time: "1:30 pm IST",
    venue: "Ascendas IT Park Phase 2, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Local Inference & SLMs",
    month: "OCT",
    day: "17",
    year: "2026",
  },
  {
    id: "evt-06",
    title: "AI GEEKS Meetup #10: Production Next.js Server Actions & Edge AI Runtime",
    date: "Sat, 19 Sept, 2026",
    time: "2:00 pm IST",
    venue: "ImageKit India Engineering Hub, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Next.js & Edge AI",
    month: "SEPT",
    day: "19",
    year: "2026",
  },
  {
    id: "evt-07",
    title: "AI GEEKS Meetup #9: Generative UI, Dynamic Tool Calling & Fast Prototypes",
    date: "Sat, 22 Aug, 2026",
    time: "10:30 am IST",
    venue: "WSO2 Engineering Lounge, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Generative UI",
    month: "AUG",
    day: "22",
    year: "2026",
  },
  {
    id: "evt-08",
    title: "AI GEEKS Meetup #8: Building High-Throughput Agentic Swarms & MCP Servers",
    date: "Sat, 18 Jul, 2026",
    time: "1:30 pm IST",
    venue: "IBM Software Labs, DLF Cybercity, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Agent Swarms & MCP",
    month: "JUL",
    day: "18",
    year: "2026",
  },
  {
    id: "evt-09",
    title: "AI GEEKS Meetup #7: AI in Healthcare, Genomics & Computational Biology",
    date: "Sat, 20 Jun, 2026",
    time: "10:00 am IST",
    venue: "Ticel Bio Park Phase 2, Taramani, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Biotech & Healthcare AI",
    month: "JUN",
    day: "20",
    year: "2026",
  },
  {
    id: "evt-10",
    title: "AI GEEKS Meetup #6: DevFest 2026 AI Track & Cloud Infrastructure",
    date: "Sat, 16 May, 2026",
    time: "1:30 pm IST",
    venue: "Ascendas IT Park Phase 2, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "DevFest AI Track",
    month: "MAY",
    day: "16",
    year: "2026",
  },
  {
    id: "evt-11",
    title: "Online AI GEEKS Meetup #5: Autonomous Coding Agents in Practice",
    date: "Sat, 26 Oct, 2024",
    time: "4:00 pm IST",
    venue: "Online event",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Virtual Keynote",
    month: "OCT",
    day: "26",
    year: "2024",
  },
  {
    id: "evt-12",
    title: "AI GEEKS Meetup #4: Modern Vector DBs & Hybrid Search Architecture",
    date: "Sat, 31 Aug, 2024",
    time: "2:00 pm IST",
    venue: "Talentship - TSI Technologies, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Vector Search",
    month: "AUG",
    day: "31",
    year: "2024",
  },
  {
    id: "evt-13",
    title: "AI GEEKS Meetup #3: From Prompts to Production LLM Pipelines",
    date: "Sat, 29 Jun, 2024",
    time: "2:00 pm IST",
    venue: "Talentship - TSI Technologies, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "LLM Pipelines",
    month: "JUN",
    day: "29",
    year: "2024",
  },
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "tier-community",
    name: "Venue & Beverage Partner",
    badge: "MEETUP SUPPORTER",
    priceLabel: "In-Kind / Custom",
    description:
      "Host 150–300 builders at your office auditorium or sponsor snacks and coffee for a monthly meetup.",
    perks: [
      "5-minute welcome spotlight on stage",
      "Logo featured on Luma event page & social banners",
      "Permanent placement in 'Our previous sponsors' grid",
      "Direct access to hiring-ready AI & React engineers",
    ],
  },
  {
    id: "tier-hackathon",
    name: "Hackathon Track Sponsor",
    badge: "MOST POPULAR",
    priceLabel: "Flagship Partner",
    description:
      "Power a dedicated pure-software problem track at our flagship 24-hour AI GEEKS Hackathon.",
    perks: [
      "Custom API/SDK bounty track & judging seat",
      "Dedicated mentor booth & recruiting lounge",
      "Full branding on stage backdrops, lanyards & merch",
      "Featured thread & announcement in AI GEEKS Forum",
    ],
    highlighted: true,
  },
  {
    id: "tier-annual",
    name: "Annual Ecosystem Partner",
    badge: "STRATEGIC PARTNER",
    priceLabel: "Annual Alliance",
    description:
      "Year-round brand visibility across all meetups, workshops, livestreams, and open-source initiatives.",
    perks: [
      "Co-branded technical workshops & hands-on labs",
      "Top-tier logo placement on homepage & video replays",
      "Priority speaker slot for principal engineering talks",
      "Year-round talent & developer relations amplification",
    ],
  },
];

export const PREVIOUS_SPONSORS: PartnerItem[] = [
  {
    id: "sp-1",
    name: "Talentship",
    tier: "Venue & Talent Partner",
    logoUrl: "/sponsors/talentship.webp",
    websiteUrl: "https://talentship.io",
  },
  {
    id: "sp-2",
    name: "imagekit.io",
    tier: "Media Cloud Partner",
    logoUrl: "/sponsors/imagekit-io.webp",
    websiteUrl: "https://imagekit.io",
  },
  {
    id: "sp-3",
    name: "WSO2",
    tier: "Enterprise Venue Host",
    logoUrl: "/sponsors/wso2.webp",
    websiteUrl: "https://wso2.com",
  },
  {
    id: "sp-4",
    name: "IBM",
    tier: "Hackathon Ecosystem Partner",
    logoUrl: "/sponsors/ibm.webp",
    websiteUrl: "https://ibm.com",
  },
  {
    id: "sp-5",
    name: "Yuniq",
    tier: "Community Supporter",
    logoUrl: "/sponsors/yuniq.webp",
    websiteUrl: "#",
  },
  {
    id: "sp-6",
    name: "think42 Labs",
    tier: "Community Partner",
    logoUrl: "/sponsors/think42-labs.webp",
    websiteUrl: "#",
  },
  {
    id: "sp-7",
    name: "FULL",
    tier: "Creative Sponsor",
    logoUrl: "/sponsors/full.webp",
    websiteUrl: "#",
  },
  {
    id: "sp-8",
    name: "Mahathaan",
    tier: "Community Supporter",
    logoUrl: "/sponsors/mahathaan.webp",
    websiteUrl: "#",
  },
  {
    id: "sp-9",
    name: "St. Joseph's",
    tier: "Academic Partner",
    logoUrl: "/sponsors/st-joseph-s-group.webp",
    websiteUrl: "#",
  },
  {
    id: "sp-10",
    name: "7 Angle",
    tier: "Tech Sponsor",
    logoUrl: "/sponsors/7-angle.webp",
    websiteUrl: "#",
  },
];

export const COMMUNITY_PARTNERS: PartnerItem[] = [
  {
    id: "cp-1",
    name: "React India",
    logoUrl: "/partners/react-india.webp",
    websiteUrl: "https://reactindia.io",
  },
  {
    id: "cp-2",
    name: "React Nexus",
    logoUrl: "/partners/react-nexus.webp",
    websiteUrl: "https://reactnexus.com",
  },
  {
    id: "cp-3",
    name: "JS Lovers",
    logoUrl: "/partners/js-lovers.webp",
    websiteUrl: "#",
  },
  {
    id: "cp-4",
    name: "GDG Chennai",
    logoUrl: "/partners/gdg-chennai.webp",
    websiteUrl: "#",
  },
  {
    id: "cp-5",
    name: "FOSS United Chennai",
    logoUrl: "/partners/foss-united-chennai.webp",
    websiteUrl: "https://fossunited.org",
  },
  {
    id: "cp-6",
    name: "TechXConf",
    logoUrl: "/partners/techx.webp",
    websiteUrl: "#",
  },
  {
    id: "cp-7",
    name: "Global Freelance Festival",
    logoUrl: "/partners/global-freelance-festival.webp",
    websiteUrl: "#",
  },
];

export const CORE_TEAM: TeamMember[] = [
  {
    id: "tm-01",
    name: "Nikhil Kumaran S",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Platform Architecture & Engineering",
    bio: "Senior Software Engineer building welcoming developer community platforms.",
    avatarUrl: "/images/team/member-01.jpg",
    portfolio: "https://www.linkedin.com/in/nikhilkumaran/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/nikhilkumaran/",
  },
  {
    id: "tm-02",
    name: "Surya Venkat",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Engineering & Ecosystem Partnerships",
    bio: "Engineering Manager orchestrating community meetups and operations.",
    avatarUrl: "/images/team/member-02.jpg",
    portfolio: "https://www.linkedin.com/in/suryavenky/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/suryavenky/",
  },
  {
    id: "tm-03",
    name: "Arun Kumar V",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "AI/ML Engineering & Technical Tracks",
    bio: "AI/ML Engineer curating machine learning sessions and technical labs.",
    avatarUrl: "/images/team/member-03.jpg",
    portfolio: "https://www.linkedin.com/in/arunkumarvallal/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/arunkumarvallal/",
  },
  {
    id: "tm-04",
    name: "Dhanush Kandhan",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Product Design & Community Safety",
    bio: "Product Engineer driving community experience and Code of Conduct safety.",
    avatarUrl: "/images/team/member-04.jpg",
    portfolio: "https://www.linkedin.com/in/dhanushkandhan/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/dhanushkandhan/",
  },
  {
    id: "tm-05",
    name: "Jai Saravanan",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Frontend Systems & Architecture",
    bio: "Senior Software Engineer passionate about React and scalable web systems.",
    avatarUrl: "/images/team/member-05.jpg",
    portfolio: "https://www.linkedin.com/in/jai-saravanan-dev/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/jai-saravanan-dev/",
  },
  {
    id: "tm-06",
    name: "Nithin Kamlesh",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Stage Hosting & Meetup Moderation",
    bio: "Core team emcee bringing high energy and seamless coordination to every event.",
    avatarUrl: "/images/team/member-06.jpg",
    portfolio: "https://www.linkedin.com/in/nithin-kamlesh/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/nithin-kamlesh/",
  },
  {
    id: "tm-07",
    name: "SB Praveen",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Audience Engagement & Stage Operations",
    bio: "Core team host and emcee engaging developers on stage.",
    avatarUrl: "/images/team/member-07.jpg",
    portfolio: "https://www.linkedin.com/in/sb-praveen-38423a154/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/sb-praveen-38423a154/",
  },
  {
    id: "tm-08",
    name: "Shanthi Palani",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Technical Leadership & Safety",
    bio: "Technical Lead and Code of Conduct committee member supporting safe meetups.",
    avatarUrl: "/images/team/member-08.jpg",
    portfolio: "https://www.linkedin.com/in/shanthi-palani-0500a9100/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/shanthi-palani-0500a9100/",
  },
  {
    id: "tm-09",
    name: "Navin Balaji",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Community Operations & Design",
    bio: "Organizing lead helping create vibrant spaces for Chennai builders.",
    avatarUrl: "/images/team/member-09.jpg",
    portfolio: "https://www.linkedin.com/in/navinbalaji/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/navinbalaji/",
  },
  {
    id: "tm-10",
    name: "Aravind Kumar",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "AI & Full-Stack Deep Dives",
    bio: "Software developer driving technical discussions and engineering workshops.",
    avatarUrl: "/images/team/member-10.jpg",
    portfolio: "https://www.linkedin.com/in/iamaravindkumar",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/iamaravindkumar",
  },
  {
    id: "tm-11",
    name: "Namma Hari",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Ecosystem Building & Outreach",
    bio: "Founder and community champion connecting builders across Chennai.",
    avatarUrl: "/images/team/member-11.jpg",
    portfolio: "https://www.linkedin.com/in/nammahari/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/nammahari/",
  },
  {
    id: "tm-12",
    name: "Sarvesh M Rao",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Logistics & Event Experience",
    bio: "Core organizer coordinating venue arrangements, schedules, and flow.",
    avatarUrl: "/images/team/member-12.jpg",
    portfolio: "https://www.linkedin.com/in/sarvesh-m-rao/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/sarvesh-m-rao/",
  },
  {
    id: "tm-13",
    name: "Kamatchi Subramani",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Community Outreach & Welcoming",
    bio: "Core organizer creating an approachable, inclusive environment for all attendees.",
    avatarUrl: "/images/team/member-13.jpg",
    portfolio: "https://www.linkedin.com/in/kamatchi-subramani/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/kamatchi-subramani/",
  },
  {
    id: "tm-14",
    name: "Chandramouli S",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Frontend Innovations & Talks",
    bio: "Frontend engineer contributing to meetup talk curation and mentoring.",
    avatarUrl: "/images/team/member-14.jpg",
    portfolio: "https://www.linkedin.com/in/chandramouli05/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/chandramouli05/",
  },
  {
    id: "tm-15",
    name: "Roja Gnanavel",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Attendee Welcome & Experience",
    bio: "Core team member ensuring every developer feels valued from their first meetup.",
    avatarUrl: "/images/team/member-15.jpg",
    portfolio: "https://www.linkedin.com/in/roja-gnanavel-55a350161/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/roja-gnanavel-55a350161/",
  },
  {
    id: "tm-16",
    name: "Udhayaprakasha V",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Architecture Workshops & Lightning Talks",
    bio: "Module Lead and speaker championing technical knowledge sharing.",
    avatarUrl: "/images/team/member-16.jpg",
    portfolio: "https://www.linkedin.com/in/udhayaprakasha-v-a71975a0/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/udhayaprakasha-v-a71975a0/",
  },
  {
    id: "tm-17",
    name: "Pranav Vikraman",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Digital Operations & Logistics",
    bio: "Core team member supporting stage logistics and digital communications.",
    avatarUrl: "/images/team/member-17.jpg",
    portfolio: "https://www.linkedin.com/in/pranav-vikraman-322020242/",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/pranav-vikraman-322020242/",
  },
];

export const PAST_SPEAKERS: PastSpeaker[] = [
  {
    id: "spk-01",
    name: "Sathya Gunasekaran",
    role: "CTO · Ex-React Team @ Meta",
    organization: "Numero",
    roleAndCompany: "CTO · Ex-React Team @ Meta, Numero",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/sathyagunasekaran/",
    topicCategory: "Architecture",
  },
  {
    id: "spk-02",
    name: "Karan Ganesan",
    role: "Founding Engineer",
    organization: "Luma AI",
    roleAndCompany: "Founding Engineer, Luma AI",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/karanganesan/",
    topicCategory: "AI Agents",
  },
  {
    id: "spk-03",
    name: "Vilva Athiban",
    role: "Software Architect",
    organization: "Omni",
    roleAndCompany: "Software Architect, Omni",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/vilvaathiban/",
    topicCategory: "Architecture",
  },
  {
    id: "spk-04",
    name: "Sreetam Das",
    role: "Senior Frontend Engineer II",
    organization: "Remote",
    roleAndCompany: "Senior Frontend Engineer II, Remote",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/sreetamdas/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-05",
    name: "Udhayaprakasha V",
    role: "Module Lead",
    organization: "Full Creative",
    roleAndCompany: "Module Lead, Full Creative",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/udhayaprakasha-v-a71975a0/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-06",
    name: "Tapas Adhikary",
    role: "Founder & CEO",
    organization: "CreoWis",
    roleAndCompany: "Founder & CEO, CreoWis",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/tapasadhikary/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-07",
    name: "Santosh Selvasundar",
    role: "Founding Engineer",
    organization: "Brackett AI",
    roleAndCompany: "Founding Engineer, Brackett AI",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/santosh-selvasundar/",
    topicCategory: "AI Agents",
  },
  {
    id: "spk-08",
    name: "Dani Akash",
    role: "Founding Engineer",
    organization: "BrowserOS (YC S24)",
    roleAndCompany: "Founding Engineer, BrowserOS (YC S24)",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/daniakash/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-09",
    name: "Rishab Bhattacharyya",
    role: "Senior Software Engineer",
    organization: "Ford Pro",
    roleAndCompany: "Senior Software Engineer, Ford Pro",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/rishab-bhattacharyya/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-10",
    name: "Syed Umair",
    role: "Lead Frontend Engineer",
    organization: "Full Creative",
    roleAndCompany: "Lead Frontend Engineer, Full Creative",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/syed-umair/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-11",
    name: "Gayathri Perumal",
    role: "Senior Software Engineer",
    organization: "Tech Innovator",
    roleAndCompany: "Senior Software Engineer",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/gayathrithedev/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-12",
    name: "Harshit Budhraja",
    role: "Software Engineer",
    organization: "ImageKit",
    roleAndCompany: "Software Engineer, ImageKit",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/harshitbudhraja/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-13",
    name: "Hareesh Rajendran",
    role: "Founder and YouTuber",
    organization: "Hayan Tech",
    roleAndCompany: "Founder and YouTuber, Hayan Tech",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/hareesh-r/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-14",
    name: "Deepa Sankaranarayanan",
    role: "Software Development Manager",
    organization: "IBM",
    roleAndCompany: "Software Development Manager, IBM",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/deepa-sankaranarayanan-28093361/",
    topicCategory: "Architecture",
  },
  {
    id: "spk-15",
    name: "Adithya Viswamithiran",
    role: "Staff Software Engineer",
    organization: "Levels.fyi",
    roleAndCompany: "Staff Software Engineer, Levels.fyi",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/adithya-vis/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-16",
    name: "Ragavendhar Thiyagharajan",
    role: "Engineering Manager",
    organization: "Workday",
    roleAndCompany: "Engineering Manager, Workday",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/ragavendhar-t/",
    topicCategory: "Architecture",
  },
  {
    id: "spk-17",
    name: "Saravanan Ramupillai",
    role: "Engineering Manager",
    organization: "Kissflow",
    roleAndCompany: "Engineering Manager, Kissflow",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://in.linkedin.com/in/saravananramupillai",
    topicCategory: "Architecture",
  },
  {
    id: "spk-18",
    name: "Surya Venkatapathi",
    role: "Engineering Manager",
    organization: "Talentship",
    roleAndCompany: "Engineering Manager, Talentship",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/suryavenky/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-19",
    name: "Brion Silva",
    role: "Technical Lead",
    organization: "WSO2",
    roleAndCompany: "Technical Lead, WSO2",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/brionmario/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-20",
    name: "Shanthi Palani",
    role: "Technical Lead",
    organization: "Talentship",
    roleAndCompany: "Technical Lead, Talentship",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/shanthi-palani-0500a9100/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-21",
    name: "Bavithra Ravichandran",
    role: "Senior Software Engineer",
    organization: "ACV Auctions",
    roleAndCompany: "Senior Software Engineer, ACV Auctions",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/bavithra07/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-22",
    name: "Nikhil Kumaran S",
    role: "Senior Software Engineer",
    organization: "Snowflake",
    roleAndCompany: "Senior Software Engineer, Snowflake",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/nikhilkumaran/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-23",
    name: "Dhanush Kandhan",
    role: "Product Engineer",
    organization: "letRetro Inc.",
    roleAndCompany: "Product Engineer, letRetro Inc.",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/dhanushkandhan/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-24",
    name: "Arun Kumar V",
    role: "AI/ML Engineer",
    organization: "Tiger Analytics",
    roleAndCompany: "AI/ML Engineer, Tiger Analytics",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/arunkumarvallal/",
    topicCategory: "AI Agents",
  },
  {
    id: "spk-25",
    name: "Jai Saravanan",
    role: "Senior Software Engineer",
    organization: "Walmart",
    roleAndCompany: "Senior Software Engineer, Walmart",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/jai-saravanan-dev/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-26",
    name: "Joel Sameul Raj",
    role: "Software Engineer",
    organization: "Microsoft (Azure Team)",
    roleAndCompany: "Software Engineer, Microsoft (Azure Team)",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/useeffects/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-27",
    name: "Ragav Kumar V",
    role: "Corporate Trainer & Mentor",
    organization: "Self-employed",
    roleAndCompany: "Corporate Trainer & Mentor",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/ragavkumarv/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-28",
    name: "Hari Prasanth S (Namma Hari)",
    role: "Founder",
    organization: "Mahathaan",
    roleAndCompany: "Founder, Mahathaan",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/nammahari/",
    topicCategory: "Architecture",
  },
  {
    id: "spk-29",
    name: "Justin Benito",
    role: "Founder",
    organization: "Lime Green Studios",
    roleAndCompany: "Founder, Lime Green Studios",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/justinbenito/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-30",
    name: "Chandrakumar S",
    role: "Lead Software Engineer",
    organization: "Chargebee",
    roleAndCompany: "Lead Software Engineer, Chargebee",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/iam-chandrakumar/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-31",
    name: "Jagadeesh J",
    role: "Lead Frontend Developer",
    organization: "Turing",
    roleAndCompany: "Lead Frontend Developer, Turing",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/jjayy/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-32",
    name: "TamilSelvan Subramaniyan",
    role: "Lead Associate",
    organization: "KANINI Software Solutions",
    roleAndCompany: "Lead Associate, KANINI Software Solutions",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/tamilselvan-subramaniyan-88b847144/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-33",
    name: "Dharmendra Kumar Gupta",
    role: "Development Engineer IV",
    organization: "Comcast",
    roleAndCompany: "Development Engineer IV, Comcast",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/dharmendra-kumar-gupta/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-34",
    name: "Basavaraj Patil",
    role: "Software Engineer",
    organization: "Octonomy",
    roleAndCompany: "Software Engineer, Octonomy",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/basavaraj-patil-56137017a/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-35",
    name: "Anita R",
    role: "Software Developer",
    organization: "DataTerrain Inc.",
    roleAndCompany: "Software Developer, DataTerrain Inc.",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/anitha-r-10734712b/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-36",
    name: "Jagan Javid",
    role: "Full Stack Developer",
    organization: "Stoz",
    roleAndCompany: "Full Stack Developer, Stoz",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/codejavid/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-37",
    name: "Vignesh M",
    role: "SDE II",
    organization: "IBM Software Labs",
    roleAndCompany: "SDE II, IBM Software Labs",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/vigneshrajan-m/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-38",
    name: "Gopi Agasthia S",
    role: "SDE",
    organization: "IBM Software Labs",
    roleAndCompany: "SDE, IBM Software Labs",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    linkedin: "https://www.linkedin.com/in/gopi-agasthia/",
    topicCategory: "Infrastructure",
  },
  {
    id: "spk-39",
    name: "Praveen Kumar Purushothaman",
    role: "Associate Director - UI",
    organization: "Fitch Group Inc.",
    roleAndCompany: "Associate Director - UI, Fitch Group Inc.",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    linkedin: "https://www.linkedin.com/in/praveentech/",
    topicCategory: "Frontend & React",
  },
  {
    id: "spk-40",
    name: "Leonard Selvaraja",
    role: "CEO and Director",
    organization: "iCrewsystems",
    roleAndCompany: "CEO and Director, iCrewsystems",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    linkedin: "https://www.linkedin.com/in/leonardselvaraja/",
    topicCategory: "Architecture",
  },
];

export const HACKATHON_PROJECTS: HackathonProject[] = [
  {
    id: "hack-01",
    projectName: "ReproState",
    teamName: "Autonomous Triage Lab",
    builders: ["Ishaan Verma", "Aarav Mehta"],
    track: "LLM Agents & Triage",
    tagline:
      "Deterministic multi-agent bug reproduction and automated developer triage pipeline with AST state snapshots.",
    techStack: ["Next.js 16", "TypeScript", "LLM Agents", "AST Walker"],
    judgeScore: 96,
    communityVotes: 148,
    githubUrl: "https://github.com/aigeeks-demo/reprostate",
    demoUrl: "https://reprostate.demo.aigeeks.community",
    badge: "1ST PLACE · GRAND WINNER",
  },
  {
    id: "hack-02",
    projectName: "Vyron Cognitive Studio",
    teamName: "SkyGlass Systems",
    builders: ["Ananya Rao", "Diya Menon"],
    track: "Next.js & Generative UI",
    tagline:
      "High-density cognitive engineering workspace with real-time streaming React Server Components and metallic glass tokens.",
    techStack: ["React 19", "Next.js 16", "Tailwind CSS", "GSAP"],
    judgeScore: 93,
    communityVotes: 132,
    githubUrl: "https://github.com/aigeeks-demo/vyron-studio",
    demoUrl: "https://vyron.demo.aigeeks.community",
    badge: "2ND PLACE · BEST UI ARCHITECTURE",
  },
  {
    id: "hack-03",
    projectName: "VectorPulse HNSW",
    teamName: "Sub-20ms Collective",
    builders: ["Kavya Raman", "Rohan Iyer"],
    track: "RAG & Vector Infrastructure",
    tagline:
      "Hybrid BM25 + dense vector retrieval engine with live citation grounding and zero-hallucination guardrails.",
    techStack: ["TypeScript", "HNSW", "Edge Runtime"],
    judgeScore: 91,
    communityVotes: 119,
    githubUrl: "https://github.com/aigeeks-demo/vectorpulse",
    demoUrl: "https://vectorpulse.demo.aigeeks.community",
    badge: "3RD PLACE · INFRASTRUCTURE TRACK",
  },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    packageOrSource: "social",
    handleLabel: "@aigeeks.community",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    packageOrSource: "social",
    handleLabel: "company/aigeeks",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com",
    packageOrSource: "social",
    handleLabel: "Chennai Builder Group",
  },
  {
    label: "Discord",
    href: "https://discord.com",
    packageOrSource: "social",
    handleLabel: "discord.gg/aigeeks",
  },
  {
    label: "X",
    href: "https://x.com",
    packageOrSource: "social",
    handleLabel: "@aigeeks_dev",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    packageOrSource: "github",
    handleLabel: "github.com/aigeeks",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app",
    packageOrSource: "social",
    handleLabel: "@aigeeks.bsky.social",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    packageOrSource: "events",
    handleLabel: "youtube.com/@aigeeks",
  },
  {
    label: "Luma",
    href: "https://lu.ma/aigeeks",
    packageOrSource: "events",
    handleLabel: "lu.ma/aigeeks",
  },
  {
    label: "react.dev",
    href: "https://react.dev",
    packageOrSource: "npm",
    handleLabel: "react.dev",
  },
];
