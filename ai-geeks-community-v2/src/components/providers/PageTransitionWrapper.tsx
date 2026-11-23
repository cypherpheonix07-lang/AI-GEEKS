"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const ROUTE_ORDER = [
  "/",
  "/about",
  "/events",
  "/past-speakers",
  "/gallery",
  "/platforms",
  "/forum",
  "/team",
  "/sponsor",
  "/code-of-conduct",
  "/join",
  "/settings",
  "/admin/hackathons",
  "/team-portal",
  "/hackathon-showcase",
];

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
