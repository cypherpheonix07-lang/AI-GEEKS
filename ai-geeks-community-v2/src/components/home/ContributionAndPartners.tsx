"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  SITE_CONFIG,
  PREVIOUS_SPONSORS,
  COMMUNITY_PARTNERS,
  PartnerItem,
} from "@/data/communityData";

function SponsorLogoItem({ item }: { item: PartnerItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-20 md:h-24 items-center justify-center p-3 transition-transform duration-300 hover:scale-105"
      aria-label={`${item.name} website`}
    >
      {!imgError && item.logoUrl ? (
        <img
          src={item.logoUrl}
          alt={item.name}
          className="max-h-9 md:max-h-11 max-w-[140px] md:max-w-[160px] object-contain opacity-80 brightness-95 contrast-105 transition-opacity group-hover:opacity-100"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-mono text-sm font-extrabold tracking-wider text-slate-200 group-hover:text-[#C4EEFF] transition-colors">
          {item.name}
        </span>
      )}
    </a>
  );
}

function CommunityPartnerItem({ item }: { item: PartnerItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 hover:-translate-y-1"
      aria-label={`${item.name} website`}
    >
      <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-white/5 p-2 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10">
        {!imgError && item.logoUrl ? (
          <img
            src={item.logoUrl}
            alt={item.name}
            className="h-full w-full object-contain rounded-xl"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#091B32] font-mono text-xs font-bold text-[#80D8FF]">
            {item.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <span className="mt-2.5 text-xs md:text-[13px] font-semibold text-slate-300 group-hover:text-[#70baff] transition-colors">
        {item.name}
      </span>
    </a>
  );
}

export default function ContributionAndPartners() {
  return (
    <section className="relative overflow-hidden bg-[#051020] py-24 px-6 text-slate-100">
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
        {/* ====================================================================
            MAKE IT HAPPEN. (Exact layout & asymmetric organic border radius - Image #7)
           ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
              BE PART OF THE STORY
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Make it happen.
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-300 max-w-md">
            There&apos;s more than one way to help our community grow.
          </p>
        </div>

        {/* Dual Organic Asymmetric Invitation Cards */}
        <div className="grid grid-cols-1 gap-6">
          {/* Tile 1: Call for Speakers (Organic Radius: tl:26px tr:90px br:26px bl:70px) */}
          <div className="relative min-h-[380px] md:min-h-[440px] overflow-hidden rounded-tl-[26px] rounded-tr-[90px] rounded-br-[26px] rounded-bl-[70px] bg-[#091723] flex items-center justify-start p-8 md:p-14 shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
            {/* Background Speaker Photo */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/moments/moment-01.jpg"
                alt=""
                className="h-full w-full object-cover object-[55%_center]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/explorer/photo-01.jpg";
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#091723]/95 via-[#091723]/75 to-[#091723]/25 md:to-transparent"
              />
            </div>

            {/* Left Copy */}
            <div className="relative z-10 max-w-lg">
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#80D8FF]">
                CALL FOR SPEAKERS
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Have a story to share?
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-200/90 leading-relaxed max-w-md">
                Bring your ideas, lessons, and experiences to the community.
              </p>
              <div className="mt-7">
                <Link
                  href={SITE_CONFIG.callForSpeakersUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white hover:text-[#091B32] px-6 py-3 text-xs md:text-sm font-bold text-white transition-all shadow-[0_4px_18px_rgba(255,255,255,0.15)] backdrop-blur-md"
                >
                  <span>Speak at a meetup</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tile 2: Call for Sponsors (Organic Radius: tl:90px tr:26px br:70px bl:26px) */}
          <div className="relative min-h-[380px] md:min-h-[440px] overflow-hidden rounded-tl-[90px] rounded-tr-[26px] rounded-br-[70px] rounded-bl-[26px] bg-[#091723] flex items-center justify-end p-8 md:p-14 shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
            {/* Background Audience Photo */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/moments/moment-02.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/explorer/photo-02.jpg";
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-l from-[#091723]/95 via-[#091723]/75 to-[#091723]/25 md:to-transparent"
              />
            </div>

            {/* Right Copy */}
            <div className="relative z-10 max-w-lg text-left md:text-right">
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#80D8FF]">
                CALL FOR SPONSORS
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Help good things grow.
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-200/90 leading-relaxed max-w-md ml-auto">
                Support the people and meetups that bring Chennai’s developers together.
              </p>
              <div className="mt-7">
                <Link
                  href={SITE_CONFIG.callForSponsorsUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white hover:text-[#091B32] px-6 py-3 text-xs md:text-sm font-bold text-white transition-all shadow-[0_4px_18px_rgba(255,255,255,0.15)] backdrop-blur-md"
                >
                  <span>Partner with us</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            OUR PREVIOUS SPONSORS (5-Column Grid x 2 Rows - Image #1)
           ==================================================================== */}
        <div className="mt-28">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Our previous sponsors
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Thank you for supporting the community.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-6 items-center">
            {PREVIOUS_SPONSORS.map((sponsor) => (
              <SponsorLogoItem item={sponsor} key={sponsor.id} />
            ))}
          </div>
        </div>

        {/* ====================================================================
            COMMUNITY PARTNERS (Row 1: 5 Partners, Row 2: 2 Partners - Image #1)
           ==================================================================== */}
        <div className="mt-24">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Community partners
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Better together, across communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-start">
            {COMMUNITY_PARTNERS.map((partner) => (
              <CommunityPartnerItem item={partner} key={partner.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
