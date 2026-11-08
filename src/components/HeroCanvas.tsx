"use client";
import { useEffect, useRef } from "react";

/**
 * Fundo animado do painel de entrada: globo de pontos conectados com anel orbital
 * (ecoa a elipse e o globo da logo CHRNC). Canvas 2D puro, sem video e sem libs.
 *
 * Performance:
 *  - so desenha com o elemento visivel (IntersectionObserver) e a aba ativa;
 *  - DPR limitado a 2; pares de vizinhos calculados uma unica vez;
 *  - prefers-reduced-motion: desenha um quadro estatico.
 * Cores vem das variaveis CSS (--primary, --color-glow), entao acompanha tema e contraste.
 */
const N = 340;        // pontos na esfera
const LINK = 0.3;     // distancia maxima (corda) para ligar dois pontos

type V = [number, number, number];

function sphere(n: number): V[] {
  const out: V[] = [];
  const g = Math.PI * (3 - Math.sqrt(5)); // angulo de ouro (distribuicao uniforme)
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r]);
  }
  return out;
}

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pts = sphere(N);
    const links: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], dz = pts[i][2] - pts[j][2];
        if (dx * dx + dy * dy + dz * dz < LINK * LINK) links.push([i, j]);
      }

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = false;
    let primary = "#02329f", glow = "#3dd6f5";
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const proj = new Float32Array(N * 3); // x, y, profundidade 0..1

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      primary = s.getPropertyValue("--primary").trim() || primary;
      glow = s.getPropertyValue("--color-glow").trim() || glow;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05; // suaviza o paralaxe
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const a = reduced ? 0.6 : t * 0.00014;
      const tilt = 0.38 + mouse.y * 0.25;
      const ca = Math.cos(a + mouse.x * 0.4), sa = Math.sin(a + mouse.x * 0.4);
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const R = Math.min(w, h) * 0.36, cx = w / 2, cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Anel orbital (atras e na frente do globo, como na logo)
      const ring = (front: boolean) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * 1.38, R * 0.46, -0.32, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2);
        ctx.globalAlpha = front ? 0.5 : 0.18;
        ctx.strokeStyle = glow;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };
      ring(false);

      for (let i = 0; i < N; i++) {
        const [x, y, z] = pts[i];
        const x1 = x * ca + z * sa, z1 = -x * sa + z * ca;
        const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
        proj[i * 3] = cx + x1 * R;
        proj[i * 3 + 1] = cy + y2 * R;
        proj[i * 3 + 2] = (z2 + 1) / 2;
      }

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = primary;
      for (const [i, j] of links) {
        const d = (proj[i * 3 + 2] + proj[j * 3 + 2]) / 2;
        ctx.globalAlpha = 0.04 + d * 0.3;
        ctx.beginPath();
        ctx.moveTo(proj[i * 3], proj[i * 3 + 1]);
        ctx.lineTo(proj[j * 3], proj[j * 3 + 1]);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const d = proj[i * 3 + 2];
        ctx.globalAlpha = 0.15 + d * 0.85;
        ctx.fillStyle = d > 0.82 && i % 7 === 0 ? glow : primary; // alguns "nos" brilham
        ctx.beginPath();
        ctx.arc(proj[i * 3], proj[i * 3 + 1], 0.8 + d * 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ring(true);
      // Satelite percorrendo o anel
      const s = reduced ? 1 : t * 0.0004;
      const ex = Math.cos(s) * R * 1.38, ey = Math.sin(s) * R * 0.46;
      const rx = ex * Math.cos(-0.32) - ey * Math.sin(-0.32);
      const ry = ex * Math.sin(-0.32) + ey * Math.cos(-0.32);
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.shadowColor = glow;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx + rx, cy + ry, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      frame(t);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    readColors();
    resize();
    frame(0);

    const ro = new ResizeObserver(() => { resize(); frame(0); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);
    const mo = new MutationObserver(() => { readColors(); if (!running) frame(0); }); // troca de tema/contraste
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-contrast"] });
    const move = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      stop(); ro.disconnect(); io.disconnect(); mo.disconnect();
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
