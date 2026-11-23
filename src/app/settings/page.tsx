"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Unlock,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  RotateCcw,
  Users,
  BarChart3,
  MessageSquare,
  Film,
  Compass,
  Award,
} from "lucide-react";
import { useInternalAccess } from "@/components/providers/InternalAccessProvider";
import type { RBACRole } from "@/lib/hackathonEngine";

const CORE_RBAC_ROLES: RBACRole[] = [
  "Super Administrator",
  "Hackathon Administrator",
  "Organizer",
  "Evaluator",
];

const ENTIRE_SITE_MODULES = [
  {
    label: "Hackathon Admin Console",
    href: "/admin/hackathons",
    scope: "Admin & Analytics",
    icon: BarChart3,
  },
  {
    label: "Participant Team Portal",
    href: "/team-portal",
    scope: "Team & Submissions",
    icon: Users,
  },
  {
    label: "Hackathon Showcase",
    href: "/hackathon-showcase",
    scope: "Leaderboard & Podium",
    icon: Award,
  },
  {
    label: "AI Forum & Q&A",
    href: "/forum",
    scope: "Community Threads",
    icon: MessageSquare,
  },
  {
    label: "Photos & Videos Gallery",
    href: "/gallery",
    scope: "Media Sliders",
    icon: Film,
  },
  {
    label: "Join Community Hub",
    href: "/join",
    scope: "Social & Handles",
    icon: Compass,
  },
];

export default function SettingsPage() {
  const {
    session,
    isInternalAccessGranted,
    policy,
    rbacDirectory,
    grantRoleBasedInternalAccess,
    revokeInternalAccess,
    updateWebsiteAccessPolicy,
    resetWebsiteAccessPolicy,
    assignMemberRbacRole,
  } = useInternalAccess();

  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    rbacDirectory[0]?.memberId ?? "ct-demo-01"
  );
  const [selectedRbacRole, setSelectedRbacRole] = useState<RBACRole>(
    rbacDirectory[0]?.rbacRole ?? "Super Administrator"
  );
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleMemberChange = (memberId: string) => {
    setSelectedMemberId(memberId);
    const match = rbacDirectory.find((m) => m.memberId === memberId);
    if (match) {
      setSelectedRbacRole(match.rbacRole);
    }
  };

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    assignMemberRbacRole(selectedMemberId, selectedRbacRole);
    const res = grantRoleBasedInternalAccess({
      memberId: selectedMemberId,
      rbacRole: selectedRbacRole,
    });
    setBanner({
      type: res.ok ? "success" : "error",
      text: res.message,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[440px] w-[880px] rounded-full bg-gradient-to-tr from-[#163B63]/55 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* Top Settings Header */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                <Sliders className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  DEDICATED SETTINGS · CORE TEAM RBAC & SITE ACCESS
                </span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Website Settings &{" "}
                <span className="ag-text-gradient">RBAC Access.</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Verify Core Team roles using Role-Based Access Control (RBAC)
                to grant internal access across the website and manage access
                policies for every section.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-mono text-xs font-bold ${
 isInternalAccessGranted
 ? "bg-[#163B63]/85 text-[#C4EEFF]"
 : "bg-[#051020] text-slate-300"
 }`}
              >
                {isInternalAccessGranted ? (
                  <Unlock className="h-4 w-4 text-[#C4EEFF]" />
                ) : (
                  <Lock className="h-4 w-4 text-[#80D8FF]" />
                )}
                <span>
                  {isInternalAccessGranted && session
                    ? `ACTIVE · ${session.displayName} (${session.rbacRole})`
                    : "INTERNAL ACCESS LOCKED"}
                </span>
              </div>

              {isInternalAccessGranted && (
                <button
                  type="button"
                  onClick={() => {
                    revokeInternalAccess();
                    setBanner({
                      type: "success",
                      text: "Revoked active Core Team RBAC internal session.",
                    });
                  }}
                  className="ag-btn-secondary rounded-2xl px-4 py-3 font-mono text-xs font-bold"
                >
                  Revoke Session
                </button>
              )}
            </div>
          </div>
        </div>

        {banner && (
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-4 text-sm ${
 banner.type === "success"
 ? "bg-[#163B63]/80 text-[#C4EEFF]"
 : "bg-amber-950/80 text-amber-200"
 }`}
          >
            <div className="flex items-center gap-3">
              {banner.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-[#80D8FF] shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0" />
              )}
              <span>{banner.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="font-mono text-xs underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Core Team RBAC Verification + Website-Wide Access Toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Core Team RBAC Access Panel */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="pb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#80D8FF]">
                <ShieldCheck className="h-4 w-4 text-[#C4EEFF]" />
                <span>CORE TEAM ROLE-BASED ACCESS CONTROL (RBAC)</span>
              </div>
              <h2 className="mt-1.5 text-2xl font-extrabold text-white">
                Verify Core Team Role & Grant Internal Access
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Select a Core Team identity and assign an RBAC role to grant
                internal access across the AI GEEKS platform.
              </p>
            </div>

            <form onSubmit={handleGrantAccess} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                  Core Team Identity
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => handleMemberChange(e.target.value)}
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-bold text-[#C4EEFF]"
                >
                  {rbacDirectory.map((member) => (
                    <option key={member.memberId} value={member.memberId}>
                      {member.displayName} — {member.role} ({member.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                  Assigned RBAC Permission Role
                </label>
                <select
                  value={selectedRbacRole}
                  onChange={(e) => setSelectedRbacRole(e.target.value as RBACRole)}
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-bold text-white"
                >
                  {CORE_RBAC_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="ag-btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider"
              >
                <Unlock className="h-4 w-4" />
                <span>Grant Internal Website Access via RBAC</span>
              </button>
            </form>

            {session && (
              <div className="rounded-2xl bg-[#051020]/90 p-4 text-xs space-y-1">
                <p className="font-mono font-bold text-[#C4EEFF]">
                  Verified Core Team Session: {session.displayName}
                </p>
                <p className="text-slate-300">
                  Role: <strong>{session.rbacRole}</strong> · In Charge Of:{" "}
                  {session.inChargeOf}
                </p>
              </div>
            )}
          </div>

          {/* Website-Wide Access Policy Toggles */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#80D8FF]">
                  <Globe className="h-4 w-4 text-[#C4EEFF]" />
                  <span>ENTIRE-WEBSITE ACCESS CONTROLS</span>
                </div>
                <h2 className="mt-1.5 text-2xl font-extrabold text-white">
                  Configure Access Across the Entire Website
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetWebsiteAccessPolicy();
                  setBanner({
                    type: "success",
                    text: "Reset entire-website access policy toggles to default.",
                  });
                }}
                className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono text-[11px]"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "requireInternalPassForAdmin" as const,
                  title: "Require Core Team RBAC for /admin/hackathons",
                  desc: "Gates hackathon admin routes behind a verified Core Team RBAC role.",
                  checked: policy.requireInternalPassForAdmin,
                },
                {
                  key: "requireInternalPassForTeamPortal" as const,
                  title: "Require Core Team RBAC for /team-portal",
                  desc: "Restricts team portal mutations to verified RBAC sessions when enabled.",
                  checked: policy.requireInternalPassForTeamPortal,
                },
                {
                  key: "allowPublicForumAccess" as const,
                  title: "Allow Public Access to AI Forum & Q&A (/forum)",
                  desc: "Keeps forum threads open to community members across the site.",
                  checked: policy.allowPublicForumAccess,
                },
                {
                  key: "allowPublicGalleryAccess" as const,
                  title: "Allow Public Access to Media Gallery (/gallery)",
                  desc: "Keeps photo and video sliders accessible across the site.",
                  checked: policy.allowPublicGalleryAccess,
                },
                {
                  key: "maintenanceModeEnabled" as const,
                  title: "Internal Staging Mode Across Website",
                  desc: "Marks internal preview state while keeping RBAC-verified access active.",
                  checked: policy.maintenanceModeEnabled,
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start justify-between gap-4 rounded-2xl bg-[#051020]/85 p-4 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      updateWebsiteAccessPolicy({
                        [item.key]: e.target.checked,
                      })
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-[#80D8FF]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Entire-Website Direct Access Launchpad (Includes Admin & Settings Links) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div>
              <span className="font-mono text-xs uppercase text-[#80D8FF]">
                ENTIRE WEBSITE ACCESS DIRECTORY
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Navigate to Admin & Core Website Sections
              </h2>
            </div>
            <Link
              href="/admin/hackathons"
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
            >
              <span>Open Admin Console (/admin/hackathons)</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENTIRE_SITE_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="group flex items-center justify-between rounded-2xl bg-[#051020]/90 p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#163B63]/60 text-[#C4EEFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-[#C4EEFF] transition-colors">
                        {mod.label}
                      </p>
                      <p className="font-mono text-[10px] uppercase text-[#80D8FF]">
                        {mod.scope} · {mod.href}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#80D8FF] group-hover:text-[#C4EEFF]" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
