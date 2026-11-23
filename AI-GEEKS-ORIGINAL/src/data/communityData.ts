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
  category: "LLM Agents" | "RAG & Vector DBs" | "TypeScript & Next.js" | "Hackathons";
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
  role: "Core team" | "Core Team, Emcee" | "Lead Organizer" | "AI Architect";
  department: "Architecture & AI" | "Operations & Venues" | "Stage & Emcee" | "Design & Community";
  inChargeOf: string;
  bio: string;
  avatarUrl: string;
  portfolio: string;
  github: string;
  linkedin: string;
  x?: string;
}

export interface PastSpeaker {
  id: string;
  name: string;
  roleAndCompany: string;
  talkTitle: string;
  abstract: string;
  topicCategory: "AI Agents" | "Frontend & React" | "Infrastructure";
  eventEdition: string;
  eventDate: string;
  avatarUrl: string;
  slidesUrl?: string;
  portfolio: string;
  github: string;
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

export const SITE_CONFIG = {
  name: "AI GEEKS",
  shortName: "AI Geeks",
  domain: "https://aigeeks.community",
  contactEmail: "contact@aigeeks.community",
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

export const NAV_LINKS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Past speakers", href: "/past-speakers" },
  { label: "Gallery", href: "/gallery" },
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
    caption: "Over 280 builders gathered for deep-dive sessions on LLM agents and React 19.",
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
    caption: "Full stage recording with live repository debugging and architecture walk-through.",
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
    caption: "Top 10 software teams pitching live prototypes to the community judging panel.",
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
    caption: "Highlights from 12+ meetups, lightning talks, and builder networking mixers.",
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
    caption: "Interactive audience Q&A dissecting RAG latency and edge caching strategies.",
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
    caption: "Step-by-step live coding session building pinned horizontal galleries.",
    eventTag: "Workshop Video",
    date: "Aug 2026",
    location: "Yuniq Innovation Center",
    duration: "41:10",
    thumbnailUrl: "/images/moments/moment-06.jpg",
    mediaUrl: "https://www.youtube.com",
  },
  {
    id: "gal-07",
    type: "photo",
    title: "First-Time Speakers Lightning Track",
    caption: "Community members delivering 10-minute rapid-fire open-source demos.",
    eventTag: "Lightning Talks",
    date: "Aug 2026",
    location: "Talentship Arena, Chennai",
    thumbnailUrl: "/images/moments/moment-07.jpg",
    mediaUrl: "/images/moments/moment-07.jpg",
  },
  {
    id: "gal-08",
    type: "video",
    title: "Panel Discussion: Scaling Developer Communities in India",
    caption: "Organizers and ecosystem partners sharing playbooks on sustainable tech meetups.",
    eventTag: "Panel Video",
    date: "Jul 2026",
    location: "IITM RP, Chennai",
    duration: "34:50",
    thumbnailUrl: "/images/moments/moment-08.jpg",
    mediaUrl: "https://www.youtube.com",
  },
];

export const FORUM_THREADS: ForumThread[] = [
  {
    id: "thd-01",
    title: "How do you prevent state drift in multi-agent bug reproduction pipelines?",
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
        author: "Nikhil Kumaran S",
        role: "Core team",
        content:
          "Use an immutable state reducer between every tool execution step and store only verified execution hashes rather than raw stdout logs.",
        timestamp: "1 hour ago",
        isAcceptedAnswer: true,
      },
    ],
  },
  {
    id: "thd-02",
    title: "Best practices for syncing Lenis smooth scroll with GSAP ScrollTrigger in Next.js 16?",
    category: "TypeScript & Next.js",
    author: "Shanthi Palani",
    authorRole: "Core team",
    createdAt: "5 hours ago",
    upvotes: 31,
    solved: true,
    summary:
      "Pinned horizontal sections can jitter on route transitions if ScrollTrigger isn't refreshed after App Router hydration.",
    replies: [
      {
        id: "rep-201",
        author: "Surya Venkat",
        role: "Core team",
        content:
          "Bind lenis.on('scroll', ScrollTrigger.update), disable gsap.ticker.lagSmoothing(0), and trigger ScrollTrigger.refresh() inside a pathname useEffect.",
        timestamp: "3 hours ago",
        isAcceptedAnswer: true,
      },
    ],
  },
  {
    id: "thd-03",
    title: "Looking for 2 pure-software frontend/AI teammates for the upcoming 24hr Hackathon!",
    category: "Hackathons",
    author: "Arun Kumar V",
    authorRole: "Core team",
    createdAt: "1 day ago",
    upvotes: 24,
    solved: false,
    summary:
      "We are building an autonomous code review bot that uses local small-parameter models for instant AST security linting. Looking for teammates with Next.js 16 and Rust/Wasm experience.",
    replies: [
      {
        id: "rep-301",
        author: "Pranav Vikraman",
        role: "Core team",
        content:
          "I have the ts-morph AST parser pipeline ready. Let's sync up on Discord before kickoff!",
        timestamp: "18 hours ago",
      },
    ],
  },
];

export const LUMA_EVENTS: LumaEventItem[] = [
  {
    id: "evt-01",
    title: "AI GEEKS Meetup #13: Multi-Agent Architectures & Next.js 16 Streaming UIs",
    date: "Saturday, Dec 12, 2026",
    time: "10:00 AM – 1:30 PM IST",
    venue: "IIT Madras Research Park, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "upcoming",
    track: "AI & Frontend Architecture",
  },
  {
    id: "evt-02",
    title: "AI GEEKS 24-Hour Pure Software Hackathon 2027",
    date: "Saturday, Jan 09, 2027",
    time: "9:00 AM – Sunday 9:00 AM IST",
    venue: "TIDEL Park Main Auditorium, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "upcoming",
    track: "Pure-Software Hackathon",
  },
  {
    id: "evt-03",
    title: "AI GEEKS Meetup #12: RAG Evaluation, Vector Indexing & TypeScript SDKs",
    date: "Saturday, Nov 07, 2026",
    time: "10:00 AM – 1:00 PM IST",
    venue: "Thoughtworks Olympus, Chennai",
    lumaUrl: "https://lu.ma/aigeeks",
    status: "past",
    track: "Applied AI Engineering",
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
  { id: "sp-1", name: "Talentship", tier: "Venue & Talent Partner", logoUrl: "/images/sponsors/talentship.svg", websiteUrl: "https://talentship.io" },
  { id: "sp-2", name: "ImageKit", tier: "Media Cloud Partner", logoUrl: "/images/sponsors/imagekit.svg", websiteUrl: "https://imagekit.io" },
  { id: "sp-3", name: "WSO2", tier: "Enterprise Venue Host", logoUrl: "/images/sponsors/wso2.svg", websiteUrl: "https://wso2.com" },
  { id: "sp-4", name: "IBM", tier: "Hackathon Ecosystem Partner", logoUrl: "/images/sponsors/ibm.svg", websiteUrl: "https://ibm.com" },
  { id: "sp-5", name: "Yuniq", tier: "Community Supporter", logoUrl: "/images/sponsors/yuniq.svg", websiteUrl: "#" },
  { id: "sp-6", name: "Think42 Labs", tier: "Meetup Sponsor", logoUrl: "/images/sponsors/think42.svg", websiteUrl: "#" },
  { id: "sp-7", name: "FULL", tier: "Venue Host", logoUrl: "/images/sponsors/full.svg", websiteUrl: "#" },
  { id: "sp-8", name: "Mahathaan", tier: "Community Supporter", logoUrl: "/images/sponsors/mahathaan.svg", websiteUrl: "#" },
  { id: "sp-9", name: "St. Joseph's Group", tier: "Academic Partner", logoUrl: "/images/sponsors/stjosephs.svg", websiteUrl: "#" },
  { id: "sp-10", name: "7 Angle", tier: "Creative Partner", logoUrl: "/images/sponsors/7angle.svg", websiteUrl: "#" },
];

export const COMMUNITY_PARTNERS: PartnerItem[] = [
  { id: "cp-1", name: "React India", logoUrl: "/images/partners/react-india.svg", websiteUrl: "https://reactindia.io" },
  { id: "cp-2", name: "React Nexus", logoUrl: "/images/partners/react-nexus.svg", websiteUrl: "https://reactnexus.com" },
  { id: "cp-3", name: "JS Lovers", logoUrl: "/images/partners/js-lovers.svg", websiteUrl: "#" },
  { id: "cp-4", name: "GDG Chennai", logoUrl: "/images/partners/gdg-chennai.svg", websiteUrl: "#" },
  { id: "cp-5", name: "FOSS United Chennai", logoUrl: "/images/partners/foss-united.svg", websiteUrl: "https://fossunited.org" },
  { id: "cp-6", name: "TechXConf", logoUrl: "/images/partners/techxconf.svg", websiteUrl: "#" },
  { id: "cp-7", name: "Global Freelance Festival", logoUrl: "/images/partners/gff.svg", websiteUrl: "#" },
];

export const CORE_TEAM: TeamMember[] = [
  {
    id: "tm-01",
    name: "Nikhil Kumaran S",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Community Architecture, CFP Curation & Technical Roadmaps",
    bio: "Leads speaker vetting, technical tracks, and open-source web architecture for the community.",
    avatarUrl: "/images/team/member-01.jpg",
    portfolio: "https://nikhilkumaran.dev",
    github: "https://github.com/nikhilkumaran",
    linkedin: "https://linkedin.com/in/nikhilkumaran",
  },
  {
    id: "tm-02",
    name: "Surya Venkat",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Sponsorship Relations, Enterprise Venues & Ecosystem Partnerships",
    bio: "Orchestrates sponsor onboarding, venue logistics, and cross-community alliances across Chennai.",
    avatarUrl: "/images/team/member-02.jpg",
    portfolio: "https://suryavenkat.dev",
    github: "https://github.com/suryavenkat",
    linkedin: "https://linkedin.com/in/suryavenkat",
  },
  {
    id: "tm-03",
    name: "Arun Kumar V",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "24-Hour Software Hackathon Tracks & Judge Coordination",
    bio: "Designs pure-software hackathon problem statements, evaluation rubrics, and mentor clinics.",
    avatarUrl: "/images/team/member-03.jpg",
    portfolio: "https://arunkumarv.dev",
    github: "https://github.com/arunkumarv",
    linkedin: "https://linkedin.com/in/arunkumarv",
  },
  {
    id: "tm-04",
    name: "Dhanush Kandhan",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Web Platform Engineering, GSAP Motion & Open-Source Repos",
    bio: "Maintains the community web platform, design token system, and interactive animation pipelines.",
    avatarUrl: "/images/team/member-04.jpg",
    portfolio: "https://dhanushkandhan.dev",
    github: "https://github.com/dhanushkandhan",
    linkedin: "https://linkedin.com/in/dhanushkandhan",
  },
  {
    id: "tm-05",
    name: "Jai Saravanan",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Event Production, AV Streaming & Luma Registration Ops",
    bio: "Manages attendee check-in workflows, Luma calendar pipelines, and live session recording.",
    avatarUrl: "/images/team/member-05.jpg",
    portfolio: "https://jaisaravanan.dev",
    github: "https://github.com/jaisaravanan",
    linkedin: "https://linkedin.com/in/jaisaravanan",
  },
  {
    id: "tm-06",
    name: "Nithin Kamlesh",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Main Stage Hosting, Fireside Moderation & Audience Engagement",
    bio: "Drives stage energy, moderates technical panels, and hosts live Q&A sessions during meetups.",
    avatarUrl: "/images/team/member-06.jpg",
    portfolio: "https://nithinkamlesh.dev",
    github: "https://github.com/nithinkamlesh",
    linkedin: "https://linkedin.com/in/nithinkamlesh",
  },
  {
    id: "tm-07",
    name: "SB Praveen",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Lightning Talk Hosting, Icebreakers & First-Time Speaker Coaching",
    bio: "Guides first-time speakers through stage prep and keeps meetup timelines running smoothly.",
    avatarUrl: "/images/team/member-07.jpg",
    portfolio: "https://sbpraveen.dev",
    github: "https://github.com/sbpraveen",
    linkedin: "https://linkedin.com/in/sbpraveen",
  },
  {
    id: "tm-08",
    name: "Shanthi Palani",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Frontend & React Curriculum, Hands-On Workshops & Code Clinics",
    bio: "Leads weekend builder labs focused on Next.js, TypeScript, and modern UI engineering.",
    avatarUrl: "/images/team/member-08.jpg",
    portfolio: "https://shanthipalani.dev",
    github: "https://github.com/shanthipalani",
    linkedin: "https://linkedin.com/in/shanthipalani",
  },
  {
    id: "tm-09",
    name: "Navin Balaji",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Brand Design System, 3D Visual Assets & Social Media Creative",
    bio: "Crafts event posters, speaker announcement decks, and the metallic glass visual identity.",
    avatarUrl: "/images/team/member-09.jpg",
    portfolio: "https://navinbalaji.design",
    github: "https://github.com/navinbalaji",
    linkedin: "https://linkedin.com/in/navinbalaji",
  },
  {
    id: "tm-10",
    name: "Aravind Kumar",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Applied AI Labs, Multi-Agent Triage Tracks & Forum Moderation",
    bio: "Spearheads LLM agent engineering sessions and curates accepted solutions in the Q&A forum.",
    avatarUrl: "/images/team/member-10.jpg",
    portfolio: "https://aravindkumar.ai",
    github: "https://github.com/aravindkumar",
    linkedin: "https://linkedin.com/in/aravindkumar",
  },
  {
    id: "tm-11",
    name: "Namma Hari",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Community Growth, Discord/WhatsApp Channels & Member Onboarding",
    bio: "Keeps our 10k+ developer channels active with daily technical threads and job opportunities.",
    avatarUrl: "/images/team/member-11.jpg",
    portfolio: "https://nammahari.dev",
    github: "https://github.com/nammahari",
    linkedin: "https://linkedin.com/in/nammahari",
  },
  {
    id: "tm-12",
    name: "Sarvesh M Rao",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "University Outreach, Student Builder Chapters & Volunteer Ops",
    bio: "Bridges student innovators and industry mentors through campus hackathons and study jams.",
    avatarUrl: "/images/team/member-12.jpg",
    portfolio: "https://sarveshmrao.dev",
    github: "https://github.com/sarveshmrao",
    linkedin: "https://linkedin.com/in/sarveshmrao",
  },
  {
    id: "tm-13",
    name: "Kamatchi Subramani",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Diversity & Inclusion Initiatives, Speaker Care & Community Safety",
    bio: "Ensures an inclusive, welcoming environment and oversees Code of Conduct readiness at events.",
    avatarUrl: "/images/team/member-13.jpg",
    portfolio: "https://kamatchi.dev",
    github: "https://github.com/kamatchisubramani",
    linkedin: "https://linkedin.com/in/kamatchisubramani",
  },
  {
    id: "tm-14",
    name: "Chandramouli S",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Media Production, Photography Direction & Aftermovie Curation",
    bio: "Captures high-impact community moments and curates the official photo and video archive.",
    avatarUrl: "/images/team/member-14.jpg",
    portfolio: "https://chandramouli.dev",
    github: "https://github.com/chandramoulis",
    linkedin: "https://linkedin.com/in/chandramoulis",
  },
  {
    id: "tm-15",
    name: "Roja Gnanavel",
    role: "Core team",
    department: "Design & Community",
    inChargeOf: "Content Strategy, Post-Meetup Recaps & Newsletter Editorial",
    bio: "Publishes technical session summaries, slide archives, and speaker spotlights after every event.",
    avatarUrl: "/images/team/member-15.jpg",
    portfolio: "https://rojagnanavel.dev",
    github: "https://github.com/rojagnanavel",
    linkedin: "https://linkedin.com/in/rojagnanavel",
  },
  {
    id: "tm-16",
    name: "Udhayaprakasha V",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "On-Ground Logistics, Swag Distribution & Hospitality Desk",
    bio: "Coordinates venue setup, badge printing, catering, and contributor merchandise.",
    avatarUrl: "/images/team/member-16.jpg",
    portfolio: "https://udhayaprakasha.dev",
    github: "https://github.com/udhayaprakasha",
    linkedin: "https://linkedin.com/in/udhayaprakasha",
  },
  {
    id: "tm-17",
    name: "Pranav Vikraman",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Open-Source Starter Kits, CLI Tooling & Hackathon Boilerplates",
    bio: "Builds template repositories and evaluation scripts for community coding challenges.",
    avatarUrl: "/images/team/member-17.jpg",
    portfolio: "https://pranavvikraman.dev",
    github: "https://github.com/pranavvikraman",
    linkedin: "https://linkedin.com/in/pranavvikraman",
  },
];

export const PAST_SPEAKERS: PastSpeaker[] = [
  {
    id: "spk-01",
    name: "Aravind Kumar",
    roleAndCompany: "Staff AI Engineer · ReproState Labs",
    talkTitle: "Building Stateful Multi-Agent Code Verification Pipelines",
    abstract:
      "How to orchestrate deterministic AST verification loops and sandboxed tool calls without context drift.",
    topicCategory: "AI Agents",
    eventEdition: "Meetup #12",
    eventDate: "November 2026",
    avatarUrl: "/images/speakers/speaker-01.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://aravindkumar.ai",
    github: "https://github.com/aravindkumar",
    linkedin: "https://linkedin.com/in/aravindkumar",
  },
  {
    id: "spk-02",
    name: "Shanthi Palani",
    roleAndCompany: "Principal Frontend Architect · Talentship",
    talkTitle: "Next.js 16, React Server Actions, and Real-Time Streaming UIs",
    abstract:
      "Patterns for low-latency token streaming, optimistic UI updates, and partial prerendering at scale.",
    topicCategory: "Frontend & React",
    eventEdition: "Meetup #11",
    eventDate: "October 2026",
    avatarUrl: "/images/speakers/speaker-02.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://shanthipalani.dev",
    github: "https://github.com/shanthipalani",
    linkedin: "https://linkedin.com/in/shanthipalani",
  },
  {
    id: "spk-03",
    name: "Dhanush Kandhan",
    roleAndCompany: "Developer Advocate · Open Source",
    talkTitle: "High-Performance Web Animations with GSAP ScrollTrigger & Lenis",
    abstract:
      "Engineering butter-smooth 60fps pinned horizontal galleries and custom WebGL/Canvas layers in React.",
    topicCategory: "Frontend & React",
    eventEdition: "Meetup #10",
    eventDate: "September 2026",
    avatarUrl: "/images/speakers/speaker-03.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://dhanushkandhan.dev",
    github: "https://github.com/dhanushkandhan",
    linkedin: "https://linkedin.com/in/dhanushkandhan",
  },
  {
    id: "spk-04",
    name: "Nikhil Kumaran S",
    roleAndCompany: "Lead Distributed Systems Engineer",
    talkTitle: "Low-Latency Vector Indexing & Hybrid Search at Production Scale",
    abstract:
      "Combining BM25 lexical scoring with HNSW dense embeddings for sub-25ms retrieval in RAG applications.",
    topicCategory: "Infrastructure",
    eventEdition: "Meetup #09",
    eventDate: "August 2026",
    avatarUrl: "/images/speakers/speaker-04.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://nikhilkumaran.dev",
    github: "https://github.com/nikhilkumaran",
    linkedin: "https://linkedin.com/in/nikhilkumaran",
  },
  {
    id: "spk-05",
    name: "Surya Venkat",
    roleAndCompany: "Engineering Manager · Cloud Native",
    talkTitle: "Zero-Downtime Edge Deployments & Observability for AI APIs",
    abstract:
      "Tracing token latency, rate-limit circuit breakers, and multi-region failover for LLM gateways.",
    topicCategory: "Infrastructure",
    eventEdition: "Meetup #08",
    eventDate: "July 2026",
    avatarUrl: "/images/speakers/speaker-05.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://suryavenkat.dev",
    github: "https://github.com/suryavenkat",
    linkedin: "https://linkedin.com/in/suryavenkat",
  },
  {
    id: "spk-06",
    name: "Pranav Vikraman",
    roleAndCompany: "Founding AI Engineer",
    talkTitle: "Automated Repository Refactoring with TypeScript ASTs & LLMs",
    abstract:
      "Combining ts-morph codemods with structured LLM outputs to safely migrate large enterprise monorepos.",
    topicCategory: "AI Agents",
    eventEdition: "Meetup #07",
    eventDate: "June 2026",
    avatarUrl: "/images/speakers/speaker-06.jpg",
    slidesUrl: "https://github.com",
    portfolio: "https://pranavvikraman.dev",
    github: "https://github.com/pranavvikraman",
    linkedin: "https://linkedin.com/in/pranavvikraman",
  },
];

export const SOCIAL_LINKS: NavItem[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "WhatsApp", href: "https://whatsapp.com" },
  { label: "Discord", href: "https://discord.com" },
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Bluesky", href: "https://bsky.app" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Luma", href: "https://lu.ma/aigeeks" },
  { label: "react.dev", href: "https://react.dev" },
];
