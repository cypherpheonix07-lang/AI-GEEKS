"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] bg-[#020813] flex flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#163B63] text-[#80D8FF]">
        <AlertCircle className="h-6 w-6" />
      </div>
      <p className="font-mono text-xs uppercase text-[#80D8FF]">
        RUNTIME BOUNDARY
      </p>
      <h2 className="mt-2 text-3xl font-bold text-white">
        Something went wrong rendering this view.
      </h2>
      <button
        type="button"
        onClick={() => reset()}
        className="ag-btn-primary mt-6 rounded-xl px-6 py-3 text-sm font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
