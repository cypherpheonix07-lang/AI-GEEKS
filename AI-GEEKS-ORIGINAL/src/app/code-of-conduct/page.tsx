import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  HeartHandshake,
  AlertTriangle,
  Scale,
  Mail,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/communityData";

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-[#020813] py-20 px-6 text-slate-100 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[420px] w-[780px] rounded-full bg-gradient-to-b from-[#163B63]/45 via-[#4DA8DA]/20 to-transparent blur-[130px]"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <ShieldCheck className="h-4 w-4 text-[#80D8FF]" />
          <span className="font-mono text-xs uppercase tracking-widest">
            COMMUNITY SAFETY &amp; INCLUSION CHARTER
          </span>
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Code of <span className="ag-text-gradient">Conduct.</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
          All attendees, speakers, sponsors, hackathon participants, and
          volunteers at {SITE_CONFIG.name} in-person meetups and online channels
          are required to agree with the following code of conduct. Organizers
          will enforce this code throughout all events.
        </p>

        <div className="mt-12 space-y-8">
          {/* 1. The Quick Version */}
          <section className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 text-[#C4EEFF]">
              <HeartHandshake className="h-6 w-6 text-[#80D8FF]" />
              <h2 className="text-2xl font-bold text-white">
                1. The Quick Version
              </h2>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed">
              {SITE_CONFIG.name} is dedicated to providing a harassment-free
              community experience for everyone, regardless of skill level,
              gender, gender identity and expression, age, sexual orientation,
              disability, physical appearance, body size, race, ethnicity,
              religion (or lack thereof), or technology choices. We do not
              tolerate harassment of community participants in any form.
            </p>
          </section>

          {/* 2. Expected Builder Behavior */}
          <section className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 text-[#C4EEFF]">
              <Users className="h-6 w-6 text-[#80D8FF]" />
              <h2 className="text-2xl font-bold text-white">
                2. Expected Builder Behavior
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-300 list-disc list-inside leading-relaxed">
              <li>
                Be welcoming, constructive, and patient with first-time speakers,
                student developers, and newcomers asking questions.
              </li>
              <li>
                Critique architectures and code patterns respectfully—never
                attack the individual behind the code.
              </li>
              <li>
                Respect venue facilities, security check-in protocols, and
                session time limits during lightning talks and workshops.
              </li>
              <li>
                Uphold pure-software hackathon integrity by writing original
                code during the event window and crediting open-source libraries.
              </li>
            </ul>
          </section>

          {/* 3. Unacceptable Behavior (The Less Quick Version) */}
          <section className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 text-[#C4EEFF]">
              <AlertTriangle className="h-6 w-6 text-[#80D8FF]" />
              <h2 className="text-2xl font-bold text-white">
                3. The Less Quick Version
              </h2>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Harassment includes offensive verbal comments related to gender,
              age, sexual orientation, disability, physical appearance, race, or
              religion; deliberate intimidation, stalking, or following;
              harassing photography or recording; sustained disruption of talks
              or other events; inappropriate physical contact; and unwelcome
              sexual attention.
            </p>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Sponsors and partners are also subject to the anti-harassment
              policy. Participants asked to stop any harassing behavior are
              expected to comply immediately.
            </p>
          </section>

          {/* 4. Enforcement & Reporting */}
          <section className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 text-[#C4EEFF]">
              <Scale className="h-6 w-6 text-[#80D8FF]" />
              <h2 className="text-2xl font-bold text-white">
                4. Reporting &amp; Enforcement
              </h2>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed">
              If you are being harassed, notice that someone else is being
              harassed, or have any other safety concerns, please contact a
              member of the {SITE_CONFIG.name} Core Team immediately. All
              organizers wear identifiable crew badges at in-person meetups.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#80D8FF]/35 bg-[#051020]/90 p-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#80D8FF]" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Direct Safety &amp; Ombuds Desk
                  </p>
                  <p className="text-xs text-slate-300">
                    Handled confidentially by Kamatchi Subramani &amp; Core Team Leads
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link className="ag-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold" href="/team">
                  View Core Team Contacts
                </Link>
                <a
                  href="mailto:safety@aigeeks.community"
                  className="ag-btn-primary rounded-xl px-4 py-2 text-xs font-bold"
                >
                  safety@aigeeks.community
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
