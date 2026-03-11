"use client";

import { useEffect, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  maxLife: number;
}

function buildZigzag(
  x1: number, y1: number,
  x2: number, y2: number,
  depth: number,
  spread: number
): { x: number; y: number }[] {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * spread * 0.4;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * spread;
  return [
    ...buildZigzag(x1, y1, mx, my, depth - 1, spread * 0.65),
    ...buildZigzag(mx, my, x2, y2, depth - 1, spread * 0.65).slice(1),
  ];
}

function strokeSegs(
  ctx: CanvasRenderingContext2D,
  segs: { x: number; y: number }[],
  color: string, width: number, blur: number, shadowColor: string
) {
  ctx.beginPath();
  ctx.moveTo(segs[0].x, segs[0].y);
  for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = blur;
  ctx.stroke();
}

function drawTrail(ctx: CanvasRenderingContext2D, t: Trail) {
  const progress = t.life / t.maxLife;
  const alpha = Math.pow(progress, 0.7);

  const dx = t.x - t.px;
  const dy = t.y - t.py;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 2) return;

  // Perpendicular spread for realistic arc
  const spread = Math.min(22, dist * 0.5);

  const segs = buildZigzag(t.px, t.py, t.x, t.y, 4, spread);

  // Outer glow — purple
  strokeSegs(ctx, segs, `rgba(140,60,255,${alpha * 0.15})`, 9, 26, "#7c3aed");
  // Mid — violet
  strokeSegs(ctx, segs, `rgba(180,100,255,${alpha * 0.45})`, 3.5, 14, "#a855f7");
  // Inner — lavender
  strokeSegs(ctx, segs, `rgba(220,170,255,${alpha * 0.8})`, 1.2, 7, "#d8b4fe");
  // Core white
  strokeSegs(ctx, segs, `rgba(245,235,255,${alpha})`, 0.6, 3, "#ffffff");

  // Branches
  const numBranches = 2 + Math.floor(Math.random() * 2);
  for (let b = 0; b < numBranches; b++) {
    const t0 = 0.2 + Math.random() * 0.6;
    const bx = t.px + dx * t0;
    const by = t.py + dy * t0;
    const bAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.4;
    const bLen = 12 + Math.random() * 20;
    const bsegs = buildZigzag(bx, by, bx + Math.cos(bAngle) * bLen, by + Math.sin(bAngle) * bLen, 3, 8);
    strokeSegs(ctx, bsegs, `rgba(160,80,255,${alpha * 0.3})`, 2.5, 10, "#a855f7");
    strokeSegs(ctx, bsegs, `rgba(220,180,255,${alpha * 0.6})`, 0.6, 4, "#e9d5ff");
  }

  // Endpoint orb at cursor position
  const orbR = 10 * alpha;
  const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, orbR);
  grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`);
  grad.addColorStop(0.4, `rgba(200,150,255,${alpha * 0.6})`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.shadowBlur = 0;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(t.x, t.y, orbR, 0, Math.PI * 2);
  ctx.fill();
}

export function ClickLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<Trail[]>([]);
  const animRef = useRef<number>(0);
  const runningRef = useRef(false);
  const prevPos = useRef<{ x: number; y: number } | null>(null);

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

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trails = trailsRef.current;
      for (let i = trails.length - 1; i >= 0; i--) {
        drawTrail(ctx, trails[i]);
        trails[i].life--;
        if (trails[i].life <= 0) trails.splice(i, 1);
      }
      if (trails.length === 0) {
        runningRef.current = false;
        return;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const cur = { x: e.clientX, y: e.clientY };
      if (prevPos.current) {
        const dx = cur.x - prevPos.current.x;
        const dy = cur.y - prevPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 12) {
          trailsRef.current.push({
            x: cur.x, y: cur.y,
            px: prevPos.current.x, py: prevPos.current.y,
            life: 10, maxLife: 10,
          });
          // Keep max 20 trail segments
          if (trailsRef.current.length > 20) trailsRef.current.shift();
          if (!runningRef.current) {
            runningRef.current = true;
            loop();
          }
        }
      }
      prevPos.current = cur;
    };

    // Click burst
    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const numArcs = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numArcs; i++) {
        const angle = (i / numArcs) * Math.PI * 2;
        const len = 40 + Math.random() * 50;
        trailsRef.current.push({
          x: cx + Math.cos(angle) * len,
          y: cy + Math.sin(angle) * len,
          px: cx, py: cy,
          life: 14, maxLife: 14,
        });
      }
      if (!runningRef.current) {
        runningRef.current = true;
        loop();
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 9999 }}
    />
  );
}
