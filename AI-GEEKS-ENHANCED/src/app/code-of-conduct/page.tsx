"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/communityData";

const GALLERY_PHOTOS = [
  {
    id: "cell-1",
    src: "/images/moments/moment-01.jpg",
    alt: "AI GEEKS community members learning together",
    gridClass: "col-start-2 row-start-1 row-end-3",
  },
  {
    id: "cell-2",
    src: "/images/moments/moment-02.jpg",
    alt: "Community members collaborating at meetup",
    gridClass: "col-start-1 row-start-2 row-end-4",
  },
  {
    id: "cell-4",
    src: "/images/moments/moment-04.jpg",
    alt: "Attendees networking and discussing projects",
    gridClass: "col-start-2 row-start-3 row-end-5",
  },
  {
    id: "cell-3",
    src: "/images/moments/moment-03.jpg",
    alt: "Speaker sharing technical insights on stage",
    gridClass: "col-start-1 row-start-4 row-end-6",
  },
];

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      {/* Specular Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/3 h-[450px] w-[850px] rounded-full bg-gradient-to-b from-[#163B63]/45 via-[#4DA8DA]/20 to-transparent blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Code of Conduct Text (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Intro Header - Matching Screenshot #2 */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                {SITE_CONFIG.name} COMMUNITY
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                Code of <span className="ag-text-gradient">conduct.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                Let&apos;s make this a place where everyone feels welcome to learn, share, and belong.
              </p>
            </div>

            {/* Message from the organisers */}
            <section className="space-y-4 pt-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Message from the organisers
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  We invite you to join events organized by {SITE_CONFIG.name} Community, our Discord servers, and other community gatherings in a spirit of curiosity, friendliness, open-mindedness, and respect.
                </p>
                <p>
                  {SITE_CONFIG.name} is a community for collaboration and for building free and open developer events and conferences. To maintain the quality of these conversations, there are rules that all of us are expected to follow.
                </p>
                <p>
                  All attendees, speakers, sponsors, and volunteers at our events are required to agree to this code of conduct. We expect everyone&apos;s cooperation in creating a safe environment.
                </p>
              </div>
            </section>

            {/* The short version */}
            <section className="space-y-4 pt-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The short version
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  {SITE_CONFIG.name} is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices.
                </p>
                <p>
                  We do not tolerate harassment of participants, volunteers, sponsors, or anyone else associated with the community in any form. Sexual language and imagery are not appropriate for our events, including talks, webinars, and other online media.
                </p>
                <p>
                  Participants who violate these rules may be sanctioned or expelled. If you feel uncomfortable or harassed at an event or in a community communication channel, please report it using the procedure below.
                </p>
              </div>
            </section>

            {/* The not so short version */}
            <section className="space-y-4 pt-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The not so short version
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Harassment includes, but is not limited to, offensive verbal or non-verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, or technology choices; sexual images in public spaces; deliberate intimidation; stalking; following; harassing photography or recording; sustained disruption of an event; inappropriate physical contact; and unwelcome sexual attention.
                </p>
                <p>
                  Participants asked to stop any such behaviour are expected to comply immediately.
                </p>
                <p>
                  If a participant engages in harassing behaviour, the {SITE_CONFIG.name} team may take appropriate action, including a warning or expulsion from the event.
                </p>
                <p>
                  This code of conduct and its anti-harassment policies apply to everyone participating, including sponsors, judges, mentors, volunteers, organisers, and {SITE_CONFIG.name} team members, both online and offline.
                </p>
              </div>
            </section>

            {/* Reporting violations */}
            <section className="space-y-6 pt-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Reporting violations
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  If you are being harassed, notice that someone else is being harassed, or encounter a violation of this code, please contact a volunteer or organiser immediately. You can also email{" "}
                  <a
                    href="mailto:safety@aigeeks.community"
                    className="font-semibold text-[#80D8FF] hover:underline hover:text-[#C4EEFF]"
                  >
                    safety@aigeeks.community
                  </a>{" "}
                  with reports or questions.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#C4EEFF]">
                  All reporters will remain anonymous.
                </p>
              </div>

              {/* Special incidents */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Special incidents
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  If you are uncomfortable reporting directly to a volunteer or core team member, you can contact the Code of Conduct team:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-base text-white">Dhanush Kandhan</p>
                      <p className="text-xs text-slate-400 mt-0.5">Code of Conduct Committee</p>
                    </div>
                    <a
                      href="mailto:dhanush@aigeeks.community"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[#80D8FF] hover:text-[#C4EEFF] hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>dhanush@aigeeks.community</span>
                    </a>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-base text-white">Shanthi Palani</p>
                      <p className="text-xs text-slate-400 mt-0.5">Code of Conduct Committee</p>
                    </div>
                    <a
                      href="mailto:shanthi@aigeeks.community"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[#80D8FF] hover:text-[#C4EEFF] hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>shanthi@aigeeks.community</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Credit */}
            <section className="space-y-3 pt-6 text-xs sm:text-sm text-slate-400 leading-relaxed">
              <h2 className="text-base font-bold text-slate-300">Credit</h2>
              <p>
                Portions of this Code of Conduct are based on the example code of conduct from{" "}
                <a
                  href="https://mlh.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#80D8FF] hover:underline"
                >
                  Major League Hacking&apos;s policies
                </a>
                , shared under a{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#80D8FF] hover:underline"
                >
                  Creative Commons Attribution-ShareAlike 4.0 International license
                </a>
                , and the code of conduct of{" "}
                <a
                  href="https://fossunited.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#80D8FF] hover:underline"
                >
                  FOSS United
                </a>
                .
              </p>
            </section>
          </div>

          {/* Right Column: Staggered Mosaic Photo Gallery (Matching Screenshot #2) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="grid grid-cols-2 grid-rows-[45px_135px_45px_135px_45px] gap-3.5">
              {GALLERY_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  className={`group relative overflow-hidden rounded-2xl bg-[#091B32]/80 shadow-[0_8px_24px_rgba(2,8,19,0.8)] ${photo.gridClass}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/website_main/explorer/photo-01.jpg";
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020813]/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity"
                  />
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-2xl p-4 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                IN-PERSON · COMMUNITY · FIRST
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Safe, respectful, and open environments at every {SITE_CONFIG.name} meetup.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
