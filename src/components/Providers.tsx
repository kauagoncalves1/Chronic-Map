"use client";
import { MotionConfig } from "motion/react";
import { ToastProvider } from "./Toast";

/** Respeita prefers-reduced-motion em TODAS as animacoes e injeta os toasts. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
