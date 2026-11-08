"use client";
import { MotionConfig } from "motion/react";

/** Respeita prefers-reduced-motion em TODAS as animacoes do Motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
