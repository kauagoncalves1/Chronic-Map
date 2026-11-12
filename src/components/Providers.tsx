"use client";
import { MotionConfig } from "motion/react";
import { ToastProvider } from "./Toast";
import { PREVIEW } from "@/lib/preview";

/** Respeita prefers-reduced-motion em TODAS as animacoes e injeta os toasts. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        {children}
        {PREVIEW && (
          <div className="pointer-events-none fixed bottom-3 left-3 z-[60] rounded-full border border-line bg-surface/90 px-3 py-1 text-xs text-muted shadow-lg backdrop-blur">
            Pré-visualização · dados de exemplo
          </div>
        )}
      </ToastProvider>
    </MotionConfig>
  );
}
