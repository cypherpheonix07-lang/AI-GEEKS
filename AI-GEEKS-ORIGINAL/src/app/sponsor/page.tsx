"use client";

import React, { useState } from "react";
import {
  Check,
  Handshake,
  Mic,
  Send,
  Sparkles,
  Building2,
  CheckCircle2,
  Globe,
  Github,
  Linkedin,
  Presentation,
} from "lucide-react";
import {
  SPONSOR_TIERS,
  PREVIOUS_SPONSORS,
  COMMUNITY_PARTNERS,
  SITE_CONFIG,
} from "@/data/communityData";

interface SpeakerApplicationState {
  fullName: string;
  email: string;
  phoneOrCity: string;
  roleAndCompany: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  talkTitle: string;
  talkFormat: "Lightning Talk (10 mins)" | "Deep Dive Session (30 mins)" | "Hands-On Workshop (60 mins)";
  trackCategory: "LLM Agents & Orchestration" | "React 19 & Next.js 16 Architecture" | "RAG, Vector DBs & Evaluation" | "Open-Source Tooling & DevEx";
  audienceLevel: "Beginner-Friendly" | "Intermediate Builders" | "Advanced / Production Architects";
  abstract: string;
  keyTakeaways: string;
  slidesOrRepoUrl: string;
  firstTimeSpeaker: boolean;
  avOrSpecialNotes: string;
}

export default function SponsorAndSpeakPage() {
  const [sponsorModalTier, setSponsorModalTier] = useState<string | null>(null);
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);

  const [speakerForm, setSpeakerForm] = useState<SpeakerApplicationState>({
    fullName: "",
    email: "",
    phoneOrCity: "Chennai, India",
    roleAndCompany: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    talkTitle: "",
    talkFormat: "Deep Dive Session (30 mins)",
    trackCategory: "LLM Agents & Orchestration",
    audienceLevel: "Intermediate Builders",
    abstract: "",
    keyTakeaways: "",
    slidesOrRepoUrl: "",
    firstTimeSpeaker: false,
    avOrSpecialNotes: "",
  });

  const [speakerSubmitted, setSpeakerSubmitted] = useState(false);

  const handleSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpeakerSubmitted(true);
  };

  const handleSponsorInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[880px] rounded-full bg-gradient-to-tr from-[#163B63]/50 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ====================================================================
            PART 1: SPONSORSHIP TIERS & PREVIOUS SPONSORS SHOWCASE
           ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <Handshake className="h-4 w-4 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                CALL FOR SPONSORS &amp; SPEAKERS · {SITE_CONFIG.name}
              </span>
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Help good things <span className="ag-text-gradient">grow.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-300">
              Support the people, venues, and 24-hour software hackathons that
              bring Chennai&apos;s developers together—or apply below to take
              our stage as a speaker.
            </p>
          </div>

          <a
            href="#speak"
            className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm self-start md:self-end"
          >
            <Mic className="h-4 w-4" />
            <span>Jump to Speaker Application</span>
          </a>
        </div>

        {/* Sponsorship Prospectus Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between ${
                tier.highlighted
                  ? "border-[#C4EEFF] shadow-[0_0_40px_rgba(128,216,255,0.3)]"
                  : ""
              }`}
            >
              <div>
                <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[11px] uppercase">
                  {tier.badge}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-white">
                  {tier.name}
                </h2>
                <p className="mt-1 font-mono text-sm text-[#80D8FF]">
                  {tier.priceLabel}
                </p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-[#80D8FF] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSponsorModalTier(tier.name);
                  setSponsorSubmitted(false);
                }}
                className="ag-btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm"
              >
                <Building2 className="h-4 w-4" />
                <span>Partner on {tier.name}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Our Previous Sponsors Grid */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
              BACKED BY INDUSTRY LEADERS
            </p>
            <h2 className="mt-1 text-2xl md:text-4xl font-bold text-white">
              Our previous sponsors
            </h2>
            <p className="mt-1 text-sm md:text-base text-slate-400">
              Thank you for supporting the community.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PREVIOUS_SPONSORS.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all hover:-translate-y-1"
              >
                <span className="font-mono text-base font-extrabold text-white group-hover:text-[#C4EEFF] transition-colors">
                  {sponsor.name}
                </span>
                {sponsor.tier && (
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#80D8FF]/80">
                    {sponsor.tier}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Community Partners Grid */}
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            Community partners — Better together, across communities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {COMMUNITY_PARTNERS.map((partner) => (
              <a
                key={partner.id}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel flex h-20 items-center justify-center rounded-2xl px-4 text-center font-mono text-xs font-bold text-slate-200 hover:text-[#C4EEFF]"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>

        {/* ====================================================================
            PART 2: DETAILED SPEAKER APPLICATION FORM (CALL FOR SPEAKERS / CFP)
           ==================================================================== */}
        <section id="speak" className="mt-28 scroll-mt-28">
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-[#80D8FF]/35">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#4DA8DA]/25 pb-8">
              <div>
                <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                  <Mic className="h-3.5 w-3.5 text-[#80D8FF]" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    OFFICIAL CALL FOR SPEAKERS (CFP)
                  </span>
                </div>
                <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white">
                  Detailed Speaker <span className="ag-text-gradient">Application Form</span>
                </h2>
                <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-300">
                  Have a production AI workflow, React 19 architecture, or live
                  open-source build to share? Submit your session proposal below
                  for upcoming {SITE_CONFIG.name} meetups.
                </p>
              </div>

              <div className="rounded-2xl border border-[#80D8FF]/30 bg-[#051020]/90 p-4 font-mono text-xs text-[#C4EEFF] shrink-0">
                <p className="font-bold text-white">CFP REVIEW SLA</p>
                <p className="mt-1 text-[#80D8FF]">Response within 48 Hours</p>
                <p className="mt-0.5 text-slate-400">10m / 30m / 60m Slots Open</p>
              </div>
            </div>

            {speakerSubmitted ? (
              <div className="my-10 rounded-3xl border border-[#C4EEFF] bg-[#091B32]/90 p-8 md:p-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#80D8FF]" />
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Speaker Proposal Submitted!
                </h3>
                <p className="mt-2 max-w-xl mx-auto text-sm md:text-base text-slate-200">
                  Thank you, <span className="font-bold text-[#C4EEFF]">{speakerForm.fullName}</span>.
                  Your proposal <span className="font-semibold text-[#80D8FF]">&ldquo;{speakerForm.talkTitle}&rdquo;</span> ({speakerForm.talkFormat}) has been routed to Nikhil Kumaran S and the CFP curation team.
                </p>
                <button
                  type="button"
                  onClick={() => setSpeakerSubmitted(false)}
                  className="ag-btn-secondary mt-6 rounded-xl px-6 py-2.5 text-xs font-mono uppercase"
                >
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSpeakerSubmit} className="mt-10 space-y-10">
                {/* Step 1: Speaker Identity & Contact */}
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF] mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#163B63] text-[#C4EEFF]">
                      01
                    </span>
                    <span>SPEAKER PROFILE &amp; CONTACT DETAILS</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={speakerForm.fullName}
                        onChange={(e) =>
                          setSpeakerForm({ ...speakerForm, fullName: e.target.value })
                        }
                        placeholder="e.g., Aravind Kumar"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={speakerForm.email}
                        onChange={(e) =>
                          setSpeakerForm({ ...speakerForm, email: e.target.value })
                        }
                        placeholder="builder@company.com"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Current Role &amp; Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={speakerForm.roleAndCompany}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            roleAndCompany: e.target.value,
                          })
                        }
                        placeholder="e.g., Staff AI Engineer at ReproState"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        City &amp; WhatsApp / Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={speakerForm.phoneOrCity}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            phoneOrCity: e.target.value,
                          })
                        }
                        placeholder="Chennai · +91 98765 43210"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Portfolio, GitHub & LinkedIn Proof-of-Work Links */}
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF] mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#163B63] text-[#C4EEFF]">
                      02
                    </span>
                    <span>PORTFOLIO, GITHUB &amp; LINKEDIN PROFILES</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 font-mono text-xs uppercase text-slate-300 mb-2">
                        <Globe className="h-3.5 w-3.5 text-[#80D8FF]" />
                        <span>Portfolio / Personal Website *</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={speakerForm.portfolioUrl}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            portfolioUrl: e.target.value,
                          })
                        }
                        placeholder="https://yourportfolio.dev"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 font-mono text-xs uppercase text-slate-300 mb-2">
                        <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                        <span>GitHub Profile URL *</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={speakerForm.githubUrl}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            githubUrl: e.target.value,
                          })
                        }
                        placeholder="https://github.com/username"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 font-mono text-xs uppercase text-slate-300 mb-2">
                        <Linkedin className="h-3.5 w-3.5 text-[#80D8FF]" />
                        <span>LinkedIn Profile URL *</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={speakerForm.linkedinUrl}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            linkedinUrl: e.target.value,
                          })
                        }
                        placeholder="https://linkedin.com/in/username"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Session Format, Track & Title */}
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF] mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#163B63] text-[#C4EEFF]">
                      03
                    </span>
                    <span>SESSION FORMAT, TRACK &amp; TALK SPECIFICATION</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Session Format *
                      </label>
                      <select
                        value={speakerForm.talkFormat}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            talkFormat: e.target.value as SpeakerApplicationState["talkFormat"],
                          })
                        }
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      >
                        <option value="Lightning Talk (10 mins)">
                          Lightning Talk (10 mins)
                        </option>
                        <option value="Deep Dive Session (30 mins)">
                          Deep Dive Session (30 mins)
                        </option>
                        <option value="Hands-On Workshop (60 mins)">
                          Hands-On Workshop (60 mins)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Primary Technical Track *
                      </label>
                      <select
                        value={speakerForm.trackCategory}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            trackCategory: e.target.value as SpeakerApplicationState["trackCategory"],
                          })
                        }
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      >
                        <option value="LLM Agents & Orchestration">
                          LLM Agents &amp; Orchestration
                        </option>
                        <option value="React 19 & Next.js 16 Architecture">
                          React 19 &amp; Next.js 16 Architecture
                        </option>
                        <option value="RAG, Vector DBs & Evaluation">
                          RAG, Vector DBs &amp; Evaluation
                        </option>
                        <option value="Open-Source Tooling & DevEx">
                          Open-Source Tooling &amp; DevEx
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Target Audience Depth *
                      </label>
                      <select
                        value={speakerForm.audienceLevel}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            audienceLevel: e.target.value as SpeakerApplicationState["audienceLevel"],
                          })
                        }
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      >
                        <option value="Beginner-Friendly">Beginner-Friendly</option>
                        <option value="Intermediate Builders">
                          Intermediate Builders
                        </option>
                        <option value="Advanced / Production Architects">
                          Advanced / Production Architects
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                        Proposed Talk Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={speakerForm.talkTitle}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            talkTitle: e.target.value,
                          })
                        }
                        placeholder="e.g., Deterministic State Checkpoints for Multi-Agent Code Triage"
                        className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                          Session Abstract &amp; Live Demo Breakdown *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={speakerForm.abstract}
                          onChange={(e) =>
                            setSpeakerForm({
                              ...speakerForm,
                              abstract: e.target.value,
                            })
                          }
                          placeholder="Outline the problem, architecture, and live code demonstration..."
                          className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                          3 Key Takeaways for Builders *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={speakerForm.keyTakeaways}
                          onChange={(e) =>
                            setSpeakerForm({
                              ...speakerForm,
                              keyTakeaways: e.target.value,
                            })
                          }
                          placeholder="1. How to structure agent state...\n2. Benchmarking latency...\n3. Production repo template..."
                          className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 font-mono text-xs uppercase text-slate-300 mb-2">
                          <Presentation className="h-3.5 w-3.5 text-[#80D8FF]" />
                          <span>Draft Slides / Demo GitHub Repo URL (Optional)</span>
                        </label>
                        <input
                          type="url"
                          value={speakerForm.slidesOrRepoUrl}
                          onChange={(e) =>
                            setSpeakerForm({
                              ...speakerForm,
                              slidesOrRepoUrl: e.target.value,
                            })
                          }
                          placeholder="https://github.com/username/talk-demo"
                          className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                          AV Setup / Preferred Meetup Month
                        </label>
                        <input
                          type="text"
                          value={speakerForm.avOrSpecialNotes}
                          onChange={(e) =>
                            setSpeakerForm({
                              ...speakerForm,
                              avOrSpecialNotes: e.target.value,
                            })
                          }
                          placeholder="e.g., December / January · USB-C HDMI + Lapel Mic"
                          className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-[#4DA8DA]/30 bg-[#051020]/70 p-4">
                      <input
                        type="checkbox"
                        checked={speakerForm.firstTimeSpeaker}
                        onChange={(e) =>
                          setSpeakerForm({
                            ...speakerForm,
                            firstTimeSpeaker: e.target.checked,
                          })
                        }
                        className="h-4 w-4 accent-[#80D8FF]"
                      />
                      <span className="text-sm text-slate-200">
                        I am a <strong>first-time speaker</strong> and would love
                        1-on-1 slide review and stage coaching from the{" "}
                        {SITE_CONFIG.name} Emcee team.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#4DA8DA]/25 pt-6">
                  <p className="font-mono text-xs text-slate-400">
                    All speakers agree to abide by the {SITE_CONFIG.name} Code of
                    Conduct.
                  </p>
                  <button
                    type="submit"
                    className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Official Speaker Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Sponsor Partnership Modal */}
        {sponsorModalTier && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-xl p-6"
            onClick={() => setSponsorModalTier(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-lg rounded-3xl p-8"
            >
              <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                SPONSORSHIP DESK
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white">
                Partner on {sponsorModalTier}
              </h3>

              {sponsorSubmitted ? (
                <div className="mt-6 rounded-2xl border border-[#80D8FF] bg-[#091B32] p-6 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-[#C4EEFF]" />
                  <p className="mt-2 font-bold text-white">
                    Sponsorship Request Sent!
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Surya Venkat from our Venue &amp; Partnerships team will
                    reach out with the prospectus deck shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSponsorInquirySubmit} className="mt-6 space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Company / Organization Name"
                    className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your hiring, DevRel, or venue hosting goals..."
                    className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSponsorModalTier(null)}
                      className="ag-btn-secondary rounded-xl px-4 py-2.5 text-xs"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="ag-btn-primary rounded-xl px-5 py-2.5 text-xs"
                    >
                      Request Prospectus
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
