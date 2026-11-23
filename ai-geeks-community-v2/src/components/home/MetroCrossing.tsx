"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface MetroCrossingProps {
  direction?: "left" | "right";
}

export default function MetroCrossing({ direction = "left" }: MetroCrossingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLImageElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, trainWidth: 0 });
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left"
      ? [dimensions.width, -dimensions.trainWidth]
      : [-dimensions.trainWidth, dimensions.width]
  );

  useEffect(() => {
    const measure = () => {
      setDimensions({
        width: containerRef.current?.clientWidth ?? 0,
        trainWidth: trainRef.current?.offsetWidth ?? 1000,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80px] sm:h-[110px] overflow-hidden bg-transparent pointer-events-none my-4"
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#163B63]/60 to-transparent" />
        <motion.img
          ref={trainRef}
          src="/illustrations/chennai-metro-horizontal.svg"
          alt=""
          className="absolute bottom-0 left-0 w-[760px] sm:w-[1000px] max-w-none h-auto will-change-transform opacity-80"
          style={{
            x: reducedMotion ? 0 : x,
            scaleX: direction === "right" ? -1 : 1,
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
