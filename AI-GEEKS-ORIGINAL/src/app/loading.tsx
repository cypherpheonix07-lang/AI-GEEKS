import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-[#020813] flex items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-sm text-[#C4EEFF]">
        <span className="h-3 w-3 rounded-full bg-[#80D8FF] animate-ping" />
        <span>INITIALIZING AI GEEKS VIEW...</span>
      </div>
    </div>
  );
}
