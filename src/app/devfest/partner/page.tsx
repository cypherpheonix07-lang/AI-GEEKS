"use client";

import React from "react";
import Link from "next/link";
import { Users, Sparkles, ExternalLink, Heart, ArrowRight } from "lucide-react";

export default function DevFestPartnerPage() {
  const partners = [
    { name: "AI GEEKS", logo: "/partners/ai-geeks.svg", category: "Core Co-Host", description: "Chennai's premier developer community for generative AI, agent architectures, and autonomous software." },
    { name: "Chennai React", logo: "/partners/chennai-react.svg", category: "Core Community", description: "The official Chennai React meetup community building the modern React 19 and Next.js frontend ecosystem." },
    { name: "GDG Cloud Chennai", logo: "/partners/gdg-cloud.svg", category: "Google Cloud", description: "Google Developer Group specializing in Google Cloud Platform, Kubernetes, and enterprise architectures." },
    { name: "United AI Alliance (UAI)", logo: "/partners/uai.svg", category: "AI Research", description: "Collaborative consortium of researchers and developers advancing applied foundation models." },
    { name: "Grafana Chennai", logo: "/partners/grafana.svg", category: "Observability", description: "Open-source telemetry, metrics, and visualization community." },
    { name: "KUG Chennai", logo: "/partners/kug.svg", category: "Kotlin User Group", description: "Kotlin and Android engineers sharing best practices in multiplatform development." },
    { name: "MongoDB User Group", logo: "/partners/mongo.svg", category: "Databases", description: "Document database architects and modern data modeling practitioners." },
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Heart className="h-3.5 w-3.5 text-rose-400" />
          <span>COMMUNITY ALLIANCE · DEVFEST CHENNAI 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Community Partners
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          DevFest Chennai 2026 is powered by a coalition of passionate developer user groups, open-source chapters, and student technology clubs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl bg-[#051020]/80 p-6 backdrop-blur-xl shadow-[0_8px_25px_rgba(2,8,19,0.6)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-[#091B32] p-2 flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/logo/react-atom.svg";
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#80D8FF] font-bold rounded-md bg-[#2B6CB0]/25 px-2 py-0.5">
                  {p.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t-0 flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Partner Community</span>
              <span className="text-[#80D8FF]">Active Collaboration</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
