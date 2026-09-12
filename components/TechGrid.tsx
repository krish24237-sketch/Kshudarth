"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot-matrix field.
 *
 * Ambient: two slowly orbiting waves interfere across the grid, brightening and
 * scaling each dot as they pass; neighbouring bright dots link with circuit
 * lines that form and dissolve.
 *
 * On cursor: a warm spotlight follows the pointer, dots are magnetically pushed
 * outward to create a lens-like bulge, and links near the cursor strengthen.
 * The pointer is smoothed so the field glides rather than snapping, and its
 * influence fades in and out when the cursor enters or leaves.
 *
 * Disabled entirely for reduced-motion users.
 */
export function TechGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  // raw target from events; smoothed values are interpolated each frame
  const target = useRef({ x: -9999, y: -9999, on: 0 });
  const smooth = useRef({ x: -9999, y: -9999, on: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 34;
    const CURSOR_R = 200; // influence radius
    const PUSH = 30; // max displacement in px

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;
    const start = performance.now();

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

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      originX = (width - (cols - 1) * SPACING) / 2;
      originY = (height - (rows - 1) * SPACING) / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    // Touch devices have no cursor, so the pointer listeners are dead weight —
    // the ambient waves still run, but nothing hovers.
    const canHover = window.matchMedia("(hover: hover)").matches;

    const parentEl = canvas.parentElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
      target.current.on = 1;
      if (smooth.current.x < -9000) {
        smooth.current.x = target.current.x;
        smooth.current.y = target.current.y;
      }
    };
    const onLeave = () => {
      target.current.on = 0;
    };
    if (canHover) {
      parentEl?.addEventListener("mousemove", onMove);
      parentEl?.addEventListener("mouseleave", onLeave);
    }

    let intensity = new Float32Array(0);
    let posX = new Float32Array(0);
    let posY = new Float32Array(0);

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // ease the pointer toward its target
      const s = smooth.current;
      const tg = target.current;
      s.x += (tg.x - s.x) * 0.12;
      s.y += (tg.y - s.y) * 0.12;
      s.on += (tg.on - s.on) * 0.07;

      ctx.clearRect(0, 0, width, height);

      const total = cols * rows;
      if (intensity.length !== total) {
        intensity = new Float32Array(total);
        posX = new Float32Array(total);
        posY = new Float32Array(total);
      }

      const ax = width * (0.5 + Math.cos(t * 0.16) * 0.28);
      const ay = height * (0.42 + Math.sin(t * 0.21) * 0.3);
      const bx = width * (0.5 + Math.cos(t * 0.11 + 2.1) * 0.34);
      const by = height * (0.55 + Math.sin(t * 0.14 + 1.2) * 0.26);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const gx = originX + c * SPACING;
          const gy = originY + r * SPACING;

          const da = Math.hypot(gx - ax, gy - ay);
          const db = Math.hypot(gx - bx, gy - by);

          let v =
            Math.sin(da * 0.019 - t * 1.5) * 0.5 +
            Math.sin(db * 0.015 - t * 1.1) * 0.5;
          v = (v + 1) / 2;

          let x = gx;
          let y = gy;

          // magnetic push + brightness boost around the cursor
          if (s.on > 0.01) {
            const dx = gx - s.x;
            const dy = gy - s.y;
            const d = Math.hypot(dx, dy) || 1;
            if (d < CURSOR_R) {
              const f = (1 - d / CURSOR_R) ** 2 * s.on;
              x += (dx / d) * f * PUSH;
              y += (dy / d) * f * PUSH;
              v = Math.min(1, v + f * 0.95);
            }
          }

          const fade =
            1 - Math.min(1, Math.max(0, (gy - height * 0.45) / (height * 0.6)));
          v *= 0.35 + fade * 0.65;

          intensity[i] = v;
          posX[i] = x;
          posY[i] = y;

          ctx.beginPath();
          ctx.arc(x, y, 0.7 + v * 1.9, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${30 + v * 12}, 92%, ${52 + v * 22}%, ${
            0.05 + v * 0.5
          })`;
          ctx.fill();
        }
      }

      // circuit links between adjacent bright dots
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const v = intensity[i];
          if (v < 0.62) continue;

          if (c + 1 < cols) {
            const j = i + 1;
            const v2 = intensity[j];
            if (v2 > 0.62) {
              ctx.strokeStyle = `hsla(32, 90%, 62%, ${(v + v2 - 1.24) * 0.5})`;
              ctx.beginPath();
              ctx.moveTo(posX[i], posY[i]);
              ctx.lineTo(posX[j], posY[j]);
              ctx.stroke();
            }
          }
          if (r + 1 < rows) {
            const j = i + cols;
            const v2 = intensity[j];
            if (v2 > 0.62) {
              ctx.strokeStyle = `hsla(32, 90%, 62%, ${(v + v2 - 1.24) * 0.45})`;
              ctx.beginPath();
              ctx.moveTo(posX[i], posY[i]);
              ctx.lineTo(posX[j], posY[j]);
              ctx.stroke();
            }
          }
        }
      }

      // warm spotlight following the cursor
      if (s.on > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        const glow = ctx.createRadialGradient(
          s.x,
          s.y,
          0,
          s.x,
          s.y,
          CURSOR_R * 1.15
        );
        glow.addColorStop(0, `hsla(32, 95%, 62%, ${0.16 * s.on})`);
        glow.addColorStop(0.45, `hsla(28, 90%, 52%, ${0.07 * s.on})`);
        glow.addColorStop(1, "hsla(28, 90%, 50%, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, CURSOR_R * 1.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      // `running` is flipped by the visibility/on-screen sync below.
      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    // The hero is only ~one screen tall, but the loop was painting for the
    // entire page. On a phone that's a full-time canvas repaint while the user
    // reads the FAQ. Run only when the hero is actually on screen and the tab
    // is in the foreground.
    let running = false;
    const play = () => {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) play();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    if (parentEl) io.observe(parentEl);

    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
      parentEl?.removeEventListener("mousemove", onMove);
      parentEl?.removeEventListener("mouseleave", onLeave);
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
