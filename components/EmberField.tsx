"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  hue: number;
};

/**
 * A slow field of rising golden embers rendered on canvas.
 * Gives the hero real depth and motion without being distracting.
 * Automatically disabled for users who prefer reduced motion.
 */
export function EmberField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let embers: Ember[] = [];

    const spawn = (initial = false): Ember => {
      const maxLife = 260 + Math.random() * 320;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + Math.random() * 60,
        r: 0.7 + Math.random() * 2.1,
        vy: 0.16 + Math.random() * 0.42,
        vx: (Math.random() - 0.5) * 0.22,
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        hue: 24 + Math.random() * 18, // warm gold → amber
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(70, Math.round((width * height) / 22000));
      embers = Array.from({ length: target }, () => spawn(true));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += 1;
        e.y -= e.vy;
        e.x += e.vx + Math.sin((e.life + i * 40) / 90) * 0.16;

        if (e.life > e.maxLife || e.y < -20) {
          embers[i] = spawn();
          continue;
        }

        // fade in, hold, fade out
        const t = e.life / e.maxLife;
        const alpha =
          (t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1) * 0.75;

        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5);
        glow.addColorStop(0, `hsla(${e.hue}, 92%, 68%, ${alpha})`);
        glow.addColorStop(0.4, `hsla(${e.hue}, 88%, 55%, ${alpha * 0.42})`);
        glow.addColorStop(1, `hsla(${e.hue}, 85%, 45%, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${e.hue}, 100%, 82%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
