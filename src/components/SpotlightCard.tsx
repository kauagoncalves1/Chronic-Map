"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Card com "spotlight" que segue o mouse (estilo React Bits / 21st.dev).
 * A posicao vai para variaveis CSS (--mx/--my) sem re-render do React: zero custo de layout.
 */
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = el.current!.getBoundingClientRect();
    el.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={el}
      variants={fadeUp}
      onPointerMove={move}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-primary/50",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-glow) 22%, transparent), transparent 70%)" }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
