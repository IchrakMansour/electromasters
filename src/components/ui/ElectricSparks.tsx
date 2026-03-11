"use client";

import { useEffect, useRef } from "react";

function buildSegments(
  x1: number, y1: number, x2: number, y2: number,
  depth: number, spread: number
): { x: number; y: number }[] {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  // Mostly perpendicular displacement — like real arc discharge
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * spread * 0.25;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * spread;
  return [
    ...buildSegments(x1, y1, mx, my, depth - 1, spread * 0.6),
    ...buildSegments(mx, my, x2, y2, depth - 1, spread * 0.6).slice(1),
  ];
}

interface Arc {
  x1: number; y1: number;
  x2: number; y2: number;
  life: number;
  maxLife: number;
  // flicker state
  flickerPhase: number;
}

function spawnArc(W: number, H: number): Arc {
  const x1 = Math.random() * W;
  const y1 = Math.random() * H;
  const angle = Math.random() * Math.PI * 2;
  const len = 35 + Math.random() * 75; // shorter = more spark-like
  const x2 = x1 + Math.cos(angle) * len;
  const y2 = y1 + Math.sin(angle) * len;
  const maxLife = 50 + Math.floor(Math.random() * 50); // slower: 50-100 ticks
  return { x1, y1, x2, y2, life: maxLife, maxLife, flickerPhase: Math.random() * Math.PI * 2 };
}

export function ElectricSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const arcs: Arc[] = [];
    const MAX_ARCS = 6;
    let frame = 0;

    for (let i = 0; i < MAX_ARCS; i++) {
      const a = spawnArc(canvas.width, canvas.height);
      a.life = Math.floor(Math.random() * a.maxLife);
      arcs.push(a);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Respawn dead arcs
      for (let i = 0; i < arcs.length; i++) {
        if (arcs[i].life <= 0) arcs[i] = spawnArc(canvas.width, canvas.height);
      }
      if (frame % 8 === 0 && arcs.length < MAX_ARCS) {
        arcs.push(spawnArc(canvas.width, canvas.height));
      }

      for (const arc of arcs) {
        if (arc.life <= 0) continue;

        const progress = arc.life / arc.maxLife;

        // Sharp flash-in, sustained flicker, quick fade-out — like real arc
        const envelope =
          progress > 0.9 ? (1 - progress) / 0.1   // fast fade-in at birth
          : progress < 0.15 ? progress / 0.15       // quick fade-out at end
          : 1.0;

        // Erratic flicker: occasional near-blackout to simulate arc instability
        arc.flickerPhase += 0.35 + Math.random() * 0.4;
        const flicker =
          Math.random() < 0.08
            ? 0.05 + Math.random() * 0.15  // sudden blackout flash
            : 0.55 + Math.abs(Math.sin(arc.flickerPhase)) * 0.45;

        const alpha = envelope * flicker;

        // Rebuild every frame for jitter
        const segs = buildSegments(arc.x1, arc.y1, arc.x2, arc.y2, 4, 48);

        // Outer glow
        ctx.beginPath();
        ctx.moveTo(segs[0].x, segs[0].y);
        for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
        ctx.strokeStyle = `rgba(150, 60, 255, ${alpha * 0.28})`;
        ctx.lineWidth = 6;
        ctx.shadowColor = "#9333ea";
        ctx.shadowBlur = 24;
        ctx.stroke();

        // Mid glow
        ctx.beginPath();
        ctx.moveTo(segs[0].x, segs[0].y);
        for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
        ctx.strokeStyle = `rgba(195, 130, 255, ${alpha * 0.62})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.stroke();

        // White-lavender core
        ctx.beginPath();
        ctx.moveTo(segs[0].x, segs[0].y);
        for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
        ctx.strokeStyle = `rgba(238, 218, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 0.9;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 7;
        ctx.stroke();

        // Branches — short offshoots like real arc discharge
        const numBranches = 1 + Math.floor(Math.random() * 3);
        for (let b = 0; b < numBranches; b++) {
          const t0 = 0.2 + Math.random() * 0.6;
          const idx = Math.floor(t0 * (segs.length - 1));
          const bx = segs[idx].x;
          const by = segs[idx].y;
          const bAngle = Math.atan2(arc.y2 - arc.y1, arc.x2 - arc.x1) + (Math.random() - 0.5) * 2.2;
          const bLen = 10 + Math.random() * 30;
          const bsegs = buildSegments(bx, by, bx + Math.cos(bAngle) * bLen, by + Math.sin(bAngle) * bLen, 2, 18);
          ctx.beginPath();
          ctx.moveTo(bsegs[0].x, bsegs[0].y);
          for (let i = 1; i < bsegs.length; i++) ctx.lineTo(bsegs[i].x, bsegs[i].y);
          ctx.strokeStyle = `rgba(185, 110, 255, ${alpha * 0.40})`;
          ctx.lineWidth = 0.8;
          ctx.shadowColor = "#c084fc";
          ctx.shadowBlur = 8;
          ctx.stroke();
        }

        // Endpoint glow dots
        for (const pt of [segs[0], segs[segs.length - 1]]) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 185, 255, ${alpha * 0.9})`;
          ctx.shadowColor = "#e9d5ff";
          ctx.shadowBlur = 10;
          ctx.fill();
        }

        // Decrement every other frame → half speed
        if (frame % 2 === 0) arc.life--;
      }

      frame++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    />
  );
}
