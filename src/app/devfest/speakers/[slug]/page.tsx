import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { DEVFEST_SPEAKERS, DEVFEST_AGENDA } from "@/data/devfestData";

export async function generateStaticParams() {
  return DEVFEST_SPEAKERS.map((s) => ({ slug: s.slug }));
}

export default async function SpeakerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = DEVFEST_SPEAKERS.find((s) => s.slug === slug);
  if (!speaker) notFound();

  const talks = DEVFEST_AGENDA.filter(
    (a) => a.speakerSlugs && a.speakerSlugs.includes(slug)
  );

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/devfest/speakers"
        className="inline-flex items-center gap-2 font-mono text-xs text-[#80D8FF] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Speakers Directory</span>
      </Link>

      {/* Speaker Hero Card */}
      <div className="rounded-3xl bg-[#051020]/90 p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)] border-0">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden bg-[#091B32] shrink-0 shadow-[0_0_30px_rgba(43,108,176,0.3)]">
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#2B6CB0]/25 px-2.5 py-1 font-mono text-[10px] font-bold text-[#80D8FF] mb-3">
              <Sparkles className="h-3 w-3" />
              <span>KEYNOTE SPEAKER · DEVFEST CHENNAI 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {speaker.name}
            </h1>
            <p className="text-base text-[#80D8FF] font-medium mt-1">
              {speaker.title} · {speaker.company}
            </p>

            {/* Social Links */}
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-slate-300">
              {speaker.links.linkedin && (
                <a
                  href={speaker.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#80D8FF] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {speaker.links.twitter && (
                <a
                  href={speaker.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#80D8FF] transition-colors"
                >
                  <span>Twitter / X</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {speaker.links.github && (
                <a
                  href={speaker.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#80D8FF] transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 pt-6 border-t-0">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Biography
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {speaker.bio}
          </p>
        </div>

        {/* Sessions */}
        {talks.length > 0 && (
          <div className="mt-8 pt-6 border-t-0">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Sessions Led by {speaker.name}
            </h3>
            <div className="space-y-4">
              {talks.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-[#091B32]/70 p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 font-mono text-xs text-[#80D8FF]">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{t.hall}</span>
                    </span>
                    {t.start && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(t.start).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white">{t.title}</h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
