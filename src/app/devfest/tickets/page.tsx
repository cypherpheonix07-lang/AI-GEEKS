"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ticket, CheckCircle2, Shield, Sparkles, ArrowRight, X, Download } from "lucide-react";
import { DEVFEST_TICKETS } from "@/data/devfestData";

export default function DevFestTicketsPage() {
  const [selectedTier, setSelectedTier] = useState<string>("early-bird-student");
  const [quantity, setQuantity] = useState<number>(1);
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [checkoutModal, setCheckoutModal] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const activeTicket = DEVFEST_TICKETS.find((t) => t.id === selectedTier) || DEVFEST_TICKETS[0];
  const priceNumber = parseInt(activeTicket.price.replace("₹", "").replace(",", ""), 10);
  const totalAmount = priceNumber * quantity;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail) {
      alert("Please fill in attendee name and email.");
      return;
    }
    setOrderConfirmed(true);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#051020]/90 px-3.5 py-1 text-xs font-mono font-bold text-[#80D8FF] mb-3">
          <Ticket className="h-3.5 w-3.5" />
          <span>PASS SELECTOR · OCTOBER 17, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Secure Your DevFest Chennai Pass
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          All passes grant full access to 8 technical stages, keynote halls, swag kits, catered buffet lunch, and developer lounges at IIT Madras Research Park.
        </p>
      </div>

      {/* Main Grid: Ticket Cards & Checkout Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tier Cards (Left Col) */}
        <div className="lg:col-span-7 space-y-4">
          {DEVFEST_TICKETS.map((t) => {
            const isSelected = selectedTier === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all backdrop-blur-xl ${
                  isSelected
                    ? "bg-[#091B32] shadow-[0_0_30px_rgba(43,108,176,0.45)] ring-1 ring-[#80D8FF]"
                    : "bg-[#051020]/80 shadow-[0_8px_25px_rgba(2,8,19,0.6)] hover:bg-[#07152B]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                        isSelected ? "bg-[#80D8FF] text-[#020813]" : "bg-[#091B32] text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#2B6CB0]/25 px-2 py-0.5 font-mono text-[10px] font-bold text-[#80D8FF]">
                      {t.badge}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-white">{t.price}</span>
                      <span className="text-xs text-slate-500 line-through">{t.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 pl-7">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#80D8FF]">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Order Summary / Registration Card (Right Col) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-[#051020]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,8,19,0.8)]">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

            <div className="rounded-2xl bg-[#091B32]/70 p-4 mb-6">
              <span className="font-mono text-[10px] text-slate-400 block uppercase">
                SELECTED PASS
              </span>
              <span className="text-base font-bold text-[#80D8FF] block mt-0.5">
                {activeTicket.name}
              </span>
              <div className="mt-3 flex items-center justify-between pt-3 border-t-0 font-mono text-xs">
                <span className="text-slate-300">Unit Price</span>
                <span className="font-bold text-white">{activeTicket.price}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-300">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#091B32] font-mono font-bold text-white hover:bg-[#163B63]"
                >
                  -
                </button>
                <span className="font-mono text-sm font-bold text-white w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#091B32] font-mono font-bold text-white hover:bg-[#163B63]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-baseline justify-between mb-6 pt-4 border-t-0">
              <span className="text-sm font-mono text-slate-400">Total Payable</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#80D8FF]">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutModal(true)}
              className="ag-btn-primary w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold"
            >
              <span>Proceed to Registration</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
              <Shield className="h-3 w-3 text-emerald-400" />
              <span>Instant Confirmation · Valid at IITM Registration Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#051020] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <button
              type="button"
              onClick={() => {
                setCheckoutModal(false);
                setOrderConfirmed(false);
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#091B32] text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {!orderConfirmed ? (
              <form onSubmit={handleRegister}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#80D8FF] mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>DEVFEST CHENNAI 2026 REGISTRATION</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Attendee Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Phanindra Puli"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="ag-input-metallic w-full px-4 py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. dev@example.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="ag-input-metallic w-full px-4 py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div className="rounded-xl bg-[#091B32]/70 p-3 text-xs font-mono text-slate-300">
                    <span className="block text-slate-400">Total:</span>
                    <span className="text-base font-bold text-white">
                      ₹{totalAmount.toLocaleString("en-IN")} ({quantity} × {activeTicket.name})
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="ag-btn-primary w-full mt-6 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm & Generate Digital Pass</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 mb-4 animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Registration Confirmed!</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Your pass for <strong>{activeTicket.name}</strong> has been generated for <strong>{attendeeName}</strong>.
                </p>

                {/* Simulated Digital Badge */}
                <div className="my-6 rounded-2xl bg-gradient-to-br from-[#091B32] via-[#051020] to-[#020813] p-5 text-left font-mono border border-blue-500/20 shadow-[0_8px_30px_rgba(2,8,19,0.8)]">
                  <div className="flex items-center justify-between text-[10px] text-[#80D8FF] mb-2">
                    <span>DEVFEST CHENNAI 2026</span>
                    <span>PASS #DFC-9281</span>
                  </div>
                  <span className="text-base font-bold text-white block">{attendeeName}</span>
                  <span className="text-xs text-slate-400 block">{attendeeEmail}</span>
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-blue-500/10 text-[10px] text-slate-400">
                    <span>VENUE: IITM RESEARCH PARK</span>
                    <span className="text-emerald-400 font-bold">CONFIRMED</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert("Ticket PDF downloaded to device.");
                    setCheckoutModal(false);
                  }}
                  className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Pass (.PDF)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
