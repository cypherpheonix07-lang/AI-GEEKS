import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] bg-[#020813] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[320px] w-[600px] rounded-full bg-gradient-to-tr from-[#163B63]/40 via-[#4DA8DA]/20 to-transparent blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 text-[#80D8FF]" />
          <span>ERROR 404 · ROUTE NOT FOUND</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white">
          Lost in the <span className="ag-text-gradient">latent space.</span>
        </h1>
        <p className="mt-4 max-w-md text-slate-300">
          The page you requested doesn&apos;t exist in the AI GEEKS platform.
        </p>
        <Link className="ag-btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold" href="/">
          <span>Return to Home</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
