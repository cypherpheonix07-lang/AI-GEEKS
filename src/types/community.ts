export type Role = 'MEMBER' | 'CONTRIBUTOR' | 'MODERATOR' | 'SPEAKER' | 'ADMIN';
export type ReputationTier = 'Seed' | 'Explorer' | 'Builder' | 'Contributor' | 'Expert' | 'Master' | 'Legend';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  coverImage?: string;
  role: Role;
  reputation: number;
  tier: ReputationTier;
  streak: number;
  longestStreak: number;
  location: string;
  company: string;
  website?: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  badges: Badge[];
  postsCount: number;
  projectsCount: number;
  followersCount: number;
  followingCount: number;
  joinedAt: string;
  isFollowing?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
}

export type ReactionType = 'like' | 'love' | 'fire' | 'mind_blown' | 'celebrate' | 'bookmark';

export interface ReactionCounts {
  like: number;
  love: number;
  fire: number;
  mind_blown: number;
  celebrate: number;
  bookmark: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  upvotes: number;
  hasUpvoted?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  tags: string[];
  readTime: string;
  views: number;
  publishedAt: string;
  reactions: ReactionCounts;
  userReactions?: ReactionType[];
  commentsCount: number;
  comments: Comment[];
  isBookmarked?: boolean;
  category: 'Tutorial' | 'Research' | 'Opinion' | 'Case Study' | 'News';
}

export interface Answer {
  id: string;
  questionId: string;
  author: User;
  body: string;
  votes: number;
  hasVoted?: 'up' | 'down' | null;
  isAccepted: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  slug: string;
  body: string;
  author: User;
  tags: string[];
  votes: number;
  hasVoted?: 'up' | 'down' | null;
  answersCount: number;
  views: number;
  isSolved: boolean;
  answers: Answer[];
  createdAt: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  time: string;
  type: 'Hackathon' | 'Workshop' | 'Webinar' | 'Meetup' | 'Conference';
  format: 'Online' | 'In-Person' | 'Hybrid';
  location: string;
  onlineLink?: string;
  speakers: EventSpeaker[];
  attendeeCount: number;
  isRsvpd?: boolean;
  status: 'Open' | 'Sold Out' | 'Completed';
  tags: string[];
}

export interface Hackathon {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  prizePool: string;
  startDate: string;
  deadline: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  tracks: string[];
  participantsCount: number;
  submissionsCount: number;
  sponsors: string[];
  isRegistered?: boolean;
  leaderboard: { rank: number; teamName: string; projectTitle: string; score: number; members: string[] }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  author: User;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  starsCount: number;
  hasStarred?: boolean;
  category: 'AI Tools' | 'Research' | 'Open Source' | 'Datasets' | 'Web Apps';
  createdAt: string;
}

export interface LearningModule {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz';
  completed?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  modulesCount: number;
  enrolledCount: number;
  isEnrolled?: boolean;
  progressPct?: number;
  topics: string[];
  modules: LearningModule[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  isRemote: boolean;
  salary: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  techStack: string[];
  description: string;
  applyUrl: string;
  postedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Tool' | 'Paper' | 'Course' | 'Dataset' | 'Repo';
  format: 'Free' | 'Open Source' | 'Paid';
  url: string;
  upvotes: number;
  hasUpvoted?: boolean;
  tags: string[];
  author: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'follower' | 'comment' | 'reaction' | 'event' | 'badge' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  country: string;
}
