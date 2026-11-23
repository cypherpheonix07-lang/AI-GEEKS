"use client";

import React, { useEffect, useRef } from "react";

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
}

// Dark & Light Sky Metallic Glass Blue Constants
const SKY_METALLIC_PALETTE = {
  abyss: "#020813",    // Deep Sky Gunmetal
  void: "#051020",     // Dark Metallic Sky
  obsidian: "#091B32", // Brushed Steel Navy
  cyber: "#0F2744",    // Dark Sky Glass
  imperial: "#163B63", // Anodized Cobalt Sky
  sapphire: "#2B6CB0", // Metallic Sapphire Sky
  azure: "#4DA8DA",    // Luminous Sky Blue
  cyan: "#80D8FF",     // Light Sky Chrome
  frost: "#C4EEFF",    // Frosted Sky Specular
} as const;

const NODE_COLORS = [
  SKY_METALLIC_PALETTE.frost,    // #C4EEFF - Specular frost hub nodes
  SKY_METALLIC_PALETTE.cyan,     // #80D8FF - Light sky chrome nodes
  SKY_METALLIC_PALETTE.azure,    // #4DA8DA - Luminous sky blue nodes
  SKY_METALLIC_PALETTE.sapphire, // #2B6CB0 - Mid-depth metallic sapphire nodes
];

interface HeroParticleCanvasProps {
  className?: string;
  maxDesktopParticles?: number;
  connectionDistance?: number;
  mouseGrabDistance?: number;
}

export default function HeroParticleCanvas({
  className = "",
  maxDesktopParticles = 72,
  connectionDistance = 148,
  mouseGrabDistance = 195,
}: HeroParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisibleInViewport = true;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let particles: ParticleNode[] = [];

    const initCanvasAndParticles = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count =
        width < 640
          ? Math.floor(maxDesktopParticles * 0.42)
          : width < 1024
          ? Math.floor(maxDesktopParticles * 0.68)
          : maxDesktopParticles;

      particles = Array.from({ length: count }, (_, idx) => {
        const isFrostHub = idx % 6 === 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.52,
          vy: (Math.random() - 0.5) * 0.52,
          radius: isFrostHub ? 2.6 : 1.4 + Math.random() * 1.1,
          color: isFrostHub
            ? SKY_METALLIC_PALETTE.frost
            : NODE_COLORS[idx % NODE_COLORS.length],
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    const renderFrame = (timestamp: number) => {
      if (!isVisibleInViewport || document.hidden) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Interactive metallic sky cursor aura (#C4EEFF -> #4DA8DA -> transparent)
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          6,
          mouse.x,
          mouse.y,
          mouseGrabDistance
        );
        cursorGlow.addColorStop(0, "rgba(196, 238, 255, 0.16)");
        cursorGlow.addColorStop(0.45, "rgba(128, 216, 255, 0.07)");
        cursorGlow.addColorStop(1, "rgba(2, 8, 19, 0)");

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseGrabDistance, 0, Math.PI * 2);
        ctx.fill();
      }

      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Connect nearby nodes in Luminous Sky Blue (#4DA8DA)
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = connectionDistance * connectionDistance;

          if (distSq < maxDistSq) {
            const alpha = (1 - Math.sqrt(distSq) / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(77, 168, 218, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Cursor specular tether lines (#C4EEFF & #80D8FF)
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const maxGrabSq = mouseGrabDistance * mouseGrabDistance;

          if (mDistSq < maxGrabSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseGrabDistance) * 0.62;
            ctx.strokeStyle = `rgba(196, 238, 255, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            if (!prefersReducedMotion && mDist > 45) {
              p.x -= (mdx / mDist) * 0.22;
              p.y -= (mdy / mDist) * 0.22;
            }
          }
        }

        const pulse =
          0.85 + Math.sin(timestamp * 0.0025 + p.pulsePhase) * 0.22;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    initCanvasAndParticles();
    animationFrameId = window.requestAnimationFrame(renderFrame);

    const handleResize = () => {
      initCanvasAndParticles();
      if (prefersReducedMotion) {
        renderFrame(performance.now());
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleInViewport = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [maxDesktopParticles, connectionDistance, mouseGrabDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
}
