"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Cpu, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/data/communityData";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

// ============================================================================
// EXACT 10 PHOSPHOR-MATCHED SOCIAL ICONS (ViewBox 0 0 256 256 / 19px / Exact chennaireact.in Paths)
// ============================================================================

export function InstagramIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
    </svg>
  );
}

export function DiscordIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z" />
    </svg>
  );
}

export function XIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
    </svg>
  );
}

export function GithubIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
    </svg>
  );
}

export function BlueskyIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M232.7,50.48C229,45.7,221.84,40,209,40c-16.85,0-38.46,11.28-57.81,30.16A140.07,140.07,0,0,0,136,87.53V56a8,8,0,0,0-16,0V87.53a140.07,140.07,0,0,0-15.15-17.37C85.49,51.28,63.88,40,47,40,34.16,40,27,45.7,23.3,50.48c-6.82,8.77-12.18,24.08-.21,71.2,6.05,23.83,19.51,33,30.63,36.42A44,44,0,0,0,128,205.27a44,44,0,0,0,74.28-47.17c11.12-3.4,24.57-12.59,30.63-36.42C239.63,95.24,244.85,66.1,232.7,50.48ZM92,208A28.12,28.12,0,0,1,88.86,152a8,8,0,1,0-1.76-15.9A43.64,43.64,0,0,0,66.36,144c-8.43.09-22-3.57-27.76-26.26C35.72,106.39,27,71.86,35.94,60.3,37.37,58.46,40.09,56,47,56c27.27,0,73,44.88,73,71.67V180A28,28,0,0,1,92,208ZM217.4,117.74c-5.77,22.69-19.33,26.34-27.77,26.26a43.6,43.6,0,0,0-20.74-7.95,8,8,0,1,0-1.76,15.9A28.11,28.11,0,1,1,136,180V127.67C136,100.88,181.69,56,209,56c6.95,0,9.66,2.46,11.1,4.3C229.05,71.86,220.28,106.39,217.4,117.74Z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z" />
    </svg>
  );
}

export function LumaIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" />
    </svg>
  );
}

export function ReactDevIcon({ className = "w-[19px] h-[19px]" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z" />
    </svg>
  );
}

// PhosphorIcons bundle exported for other sections (e.g., AceternitySocialMarquee & VitStyleTeamSection)
export const PhosphorIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
  Discord: DiscordIcon,
  X: XIcon,
  GitHub: GithubIcon,
  Bluesky: BlueskyIcon,
  YouTube: YoutubeIcon,
  Luma: LumaIcon,
  ReactDev: ReactDevIcon,
};

// ============================================================================
// EXACT 10 SOCIALS SPLIT INTO 2 COLUMNS (Matching User Reference Image & chennaireact.in)
// Column 1: Instagram, WhatsApp, X, Bluesky, Luma
// Column 2: LinkedIn, Discord, GitHub, YouTube, react.dev
// ============================================================================

export const FOOTER_SOCIALS_COL_1 = [
  { name: "Instagram", url: "https://instagram.com/chennaireact", icon: InstagramIcon },
  { name: "WhatsApp", url: "https://chat.whatsapp.com/GVVDcSrckq2FTBXtKBwVbd?mode=r_c", icon: WhatsappIcon },
  { name: "X", url: "https://x.com/chennaireact", icon: XIcon },
  { name: "Bluesky", url: "https://bsky.app/profile/chennaireact.bsky.social", icon: BlueskyIcon },
  { name: "Luma", url: "https://lu.ma/chennai-react", icon: LumaIcon },
];

export const FOOTER_SOCIALS_COL_2 = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/chennaireact/", icon: LinkedinIcon },
  { name: "Discord", url: "https://bit.ly/chennaireactjs", icon: DiscordIcon },
  { name: "GitHub", url: "https://github.com/chennaireact", icon: GithubIcon },
  { name: "YouTube", url: "https://www.youtube.com/@ChennaiReactJS", icon: YoutubeIcon },
  { name: "react.dev", url: "https://react.dev/community/meetups#india", icon: ReactDevIcon },
];

export const FOOTER_SOCIALS = [...FOOTER_SOCIALS_COL_1, ...FOOTER_SOCIALS_COL_2];

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden bg-[#020813] text-slate-200">
      {/* ====================================================================
          NAPIER BRIDGE ARTWORK HEADER (Iconic Chennai React Signature Skyline)
         ==================================================================== */}
      <div className="w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <picture className="w-full block">
          <source media="(max-width: 600px)" srcSet="/illustrations/napier-bridge-mobile.svg" />
          <img
            src="/illustrations/napier-bridge-desktop.svg"
            alt=""
            className="w-full h-auto min-h-[90px] sm:min-h-[140px] max-h-[260px] object-cover object-bottom opacity-75"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </picture>
      </div>

      {/* Atmospheric Ambient Glow Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-[320px] w-[760px] rounded-full bg-gradient-to-t from-[#163B63]/40 via-[#4DA8DA]/10 to-transparent blur-[125px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1: Brand Identity & Mission */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#80D8FF]/30 via-[#2B6CB0] to-[#0F2744] shadow-[0_0_26px_rgba(128,216,255,0.35)] transition-transform duration-300 group-hover:scale-105">
                  <Cpu className="h-5 w-5 text-[#C4EEFF]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#C4EEFF] transition-colors">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                    MADE FOR THE COMMUNITY, BY THE COMMUNITY
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm md:text-base text-slate-300/90 leading-relaxed">
                Chennai’s community for people who love to learn, build, and share.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/join"
                  className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs"
                >
                  <span>Join the community</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/sponsor#speak"
                  className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  <span>Speak at a meetup</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <div className="md:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#a8bfd3] mb-5">
              Explore
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/past-speakers" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  Past speakers
                </Link>
              </li>
              <li>
                <Link href="/sponsor" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  Become a sponsor
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-[#e4edf4] hover:text-[#70baff] transition-colors font-medium">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: FIND US ONLINE (Exact 2-Column Vertical Layout Matching User Reference Image & chennaireact.in) */}
          <div className="md:col-span-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#8fa7bc] mb-5">
              FIND US ONLINE
            </h2>
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-10">
              {/* Column 1: Instagram, WhatsApp, X, Bluesky, Luma */}
              <div className="flex flex-col space-y-3.5">
                {FOOTER_SOCIALS_COL_1.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-[14px] font-normal text-white hover:text-[#70baff] transition-colors"
                  >
                    <Icon className="w-[19px] h-[19px] text-white/90 group-hover:text-[#70baff] transition-colors shrink-0" />
                    <span className="truncate">{name}</span>
                  </a>
                ))}
              </div>

              {/* Column 2: LinkedIn, Discord, GitHub, YouTube, react.dev */}
              <div className="flex flex-col space-y-3.5">
                {FOOTER_SOCIALS_COL_2.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-[14px] font-normal text-white hover:text-[#70baff] transition-colors"
                  >
                    <Icon className="w-[19px] h-[19px] text-white/90 group-hover:text-[#70baff] transition-colors shrink-0" />
                    <span className="truncate">{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Smooth Scroll-to-Top Bar with Zero Border Line */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-slate-400">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-slate-300 font-semibold">
              © {new Date().getFullYear()} {SITE_CONFIG.name} COMMUNITY
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#C4EEFF]">
              MADE WITH{" "}
              <Heart className="h-3.5 w-3.5 text-[#80D8FF] fill-[#80D8FF]" /> IN
              CHENNAI
            </span>
          </p>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold text-[#C4EEFF]"
          >
            <span>BACK TO TOP ↑</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#80D8FF]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
