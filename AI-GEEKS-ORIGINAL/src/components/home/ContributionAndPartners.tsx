"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mic, Handshake, ArrowUpRight, Sparkles } from "lucide-react";
import {
  SITE_CONFIG,
  PREVIOUS_SPONSORS,
  COMMUNITY_PARTNERS,
  PartnerItem,
} from "@/data/communityData";

function PartnerLogoCard({ item }: { item: PartnerItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-panel group relative flex h-24 flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-4 text-center transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Top Specular Frosted Sheen on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/75 to-transparent opacity-40 group-hover:opacity-100 transition-opacity"
      />

      {!imgError && item.logoUrl ? (
        <img
          src={item.logoUrl}
          alt={item.name}
          className="max-h-9 max-w-[135px] object-contain opacity-85 transition-all group-hover:scale-105 group-hover:opacity-100"
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <span className="font-mono text-sm font-extrabold tracking-wider text-white group-hover:text-[#C4EEFF] transition-colors">
            {item.name}
          </span>
          {item.tier && (
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#80D8FF]/80">
              {item.tier}
            </span>
          )}
        </>
      )}
    </a>
  );
}

export default function ContributionAndPartners() {
  return (
    <section className="relative overflow-hidden bg-[#051020] py-24 px-6 text-slate-100 border-t border-[#4DA8DA]/25">
      {/* Top Specular Frosted Sky Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/60 to-transparent"
      />

      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[840px] rounded-full bg-gradient-to-tr from-[#163B63]/45 via-[#4DA8DA]/20 to-[#C4EEFF]/10 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* BE PART OF THE STORY Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
            BE PART OF THE STORY
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Make it <span className="ag-text-gradient">happen.</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-300">
            There&apos;s more than one way to help our community grow.
          </p>
        </div>

        {/* Dual Metallic Sky Glass Callout Cards: Speakers & Sponsors */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Call for Speakers */}
          <div
            style={{ background: "var(--ag-gradient-speaker)" }}
            className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent opacity-90"
            />

            <div>
              <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-xl px-3.5 py-2">
                <Mic className="h-4 w-4 text-[#80D8FF]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest">
                  CALL FOR SPEAKERS
                </span>
              </div>

              <h3 className="mt-6 text-2xl md:text-3xl font-extrabold text-white">
                Have a story to share?
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-200/90 leading-relaxed">
                Bring your ideas, lessons, and experiences to the community.
                Submit a 10-minute lightning talk, a 30-minute architecture deep
                dive, or a hands-on AI &amp; React builder lab.
              </p>
            </div>

            <div className="mt-8">
              <Link className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm" href={SITE_CONFIG.callForSpeakersUrl}>
                <span>Speak at a meetup</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Call for Sponsors */}
          <div className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col justify-between">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#80D8FF] to-transparent opacity-80"
            />

            <div>
              <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-xl px-3.5 py-2">
                <Handshake className="h-4 w-4 text-[#80D8FF]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest">
                  CALL FOR SPONSORS
                </span>
              </div>

              <h3 className="mt-6 text-2xl md:text-3xl font-extrabold text-white">
                Help good things grow.
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-200/90 leading-relaxed">
                Support the people and meetups that bring developers together.
                Host an upcoming meetup at your auditorium or power a problem
                track at our 24-hour pure-software hackathon.
              </p>
            </div>

            <div className="mt-8">
              <Link className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold" href={SITE_CONFIG.callForSponsorsUrl}>
                <span>Partner with us</span>
                <ArrowUpRight className="h-4 w-4 text-[#80D8FF]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Previous Sponsors Grid */}
        <div className="mt-24">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                INDUSTRY SUPPORTERS
              </p>
              <h3 className="mt-1 text-2xl md:text-4xl font-extrabold text-white">
                Our previous <span className="ag-text-gradient">sponsors.</span>
              </h3>
              <p className="mt-1 text-sm md:text-base text-slate-400">
                Thank you for supporting the community.
              </p>
            </div>
            <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs self-start sm:self-end">
              <Sparkles className="h-3 w-3 text-[#80D8FF]" />
              <span>{PREVIOUS_SPONSORS.length} Partners</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PREVIOUS_SPONSORS.map((sponsor) => (
              <PartnerLogoCard item={sponsor} key={sponsor.id} />
            ))}
          </div>
        </div>

        {/* Community Partners Grid */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              ECOSYSTEM ALLIANCES
            </p>
            <h3 className="mt-1 text-2xl md:text-4xl font-extrabold text-white">
              Community <span className="ag-text-gradient">partners.</span>
            </h3>
            <p className="mt-1 text-sm md:text-base text-slate-400">
              Better together, across communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {COMMUNITY_PARTNERS.map((partner) => (
              <PartnerLogoCard item={partner} key={partner.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
