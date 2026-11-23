export type TrackId = 'ai' | 'cloud' | 'web' | 'systems';
export type SessionFormat = 'Keynote' | 'Deep Dive' | 'Codelab' | 'Lightning';
export type SkillLevel = '100 - Beginner' | '200 - Intermediate' | '300 - Advanced';

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  borderClass: string;
  bgGlow: string;
  badgeClass: string;
  lead: string;
  hall: string;
  description: string;
  topics: string[];
  distribution: { beginner: number; intermediate: number; advanced: number };
}

export interface Session {
  id: string;
  title: string;
  day: 1 | 2;
  startTime: string;
  endTime: string;
  slotId: string;
  track: TrackId;
  format: SessionFormat;
  level: SkillLevel;
  room: string;
  speakerIds: string[];
  abstract: string;
  takeaways: string[];
  prerequisites: string[];
  slideUrl: string;
  repoUrl: string;
  capacityPct: number;
  isLive?: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  track: TrackId;
  badge: string;
  avatar: string;
  initials: string;
  bio: string;
  tags: string[];
  github: string;
  twitter: string;
  linkedin: string;
  gde?: boolean;
}

export interface Codelab {
  id: string;
  title: string;
  track: TrackId;
  instructor: string;
  duration: string;
  room: string;
  seatsLeft: number;
  totalSeats: number;
  cloneCmd: string;
  prereqs: string[];
  steps: string[];
}

export interface HackathonTrack {
  id: string;
  code: string;
  title: string;
  prize: string;
  prompt: string;
  stack: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title' | 'Platinum' | 'Gold' | 'Community';
  tagline: string;
  track: TrackId;
  promoCode: string;
  creditOffer: string;
  docsUrl: string;
  boothCode: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  compensation: string;
  tags: string[];
}

export interface TicketPass {
  ticketId: string;
  fullName: string;
  email: string;
  github: string;
  organization: string;
  tier: 'General Builder' | 'Student Hacker' | 'Pro Workshop';
  favoriteTrack: TrackId;
  tshirt: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  dietary: string;
  issuedAt: string;
}

export interface BadgeConfig {
  name: string;
  role: string;
  org: string;
  handle: string;
  theme: TrackId | 'classic' | 'stealth';
  avatarPreset: number;
  customAvatarUrl: string | null;
  badgeType: 'BUILDER' | 'SPEAKER' | 'HACKER' | 'VIP';
  stickers: string[];
}

export interface VenueZone {
  id: string;
  name: string;
  level: 'Level 1' | 'Level 2' | 'Level 3';
  capacity: string;
  currentActivity: string;
  coords: { x: number; y: number; w: number; h: number };
  color: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  xp: number;
}
