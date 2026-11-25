"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, Phone } from "lucide-react";

export default function DevFestContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Mail className="h-3.5 w-3.5" />
          <span>HELP DESK · DEVFEST CHENNAI 2026</span>
        </div>
        <h1 className="text-3xl font-black text-white">Contact & Support</h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Have questions about ticketing, venue transit, speaking, or sponsorship? Reach out to the organizing team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md">
            <span className="font-mono text-[10px] text-slate-400 uppercase block">EMAIL</span>
            <span className="text-sm font-bold text-white mt-1 block">devfest@gdgchennai.in</span>
            <span className="text-xs text-slate-400 mt-1 block">Response within 24 hours</span>
          </div>

          <div className="rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md">
            <span className="font-mono text-[10px] text-slate-400 uppercase block">VENUE</span>
            <span className="text-sm font-bold text-white mt-1 block">IIT Madras Research Park</span>
            <span className="text-xs text-slate-400 mt-1 block">Kanagam Road, Taramani, Chennai 600113</span>
          </div>

          <div className="rounded-2xl bg-[#051020]/80 p-5 backdrop-blur-md">
            <span className="font-mono text-[10px] text-slate-400 uppercase block">COMMUNITY DESK</span>
            <span className="text-sm font-bold text-white mt-1 block">AI GEEKS & Chennai React</span>
            <span className="text-xs text-slate-400 mt-1 block">Discord & WhatsApp Help channels open 24/7</span>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-3xl bg-[#051020]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send an Inquiry</h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ag-input-metallic w-full px-3.5 py-2 text-xs rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="ag-btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message to Organizing Team</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 mb-4 animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Thank you, <strong>{formData.name}</strong>. A DevFest organizing team lead will get back to you at <strong>{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="ag-btn-secondary mt-6 px-4 py-2 text-xs font-mono"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
