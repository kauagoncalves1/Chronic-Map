"use client";
import { Contrast, Minus, Moon, Plus, Sun } from "lucide-react";
import { useA11y } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Barra de acessibilidade (Desafio Plus): contraste, tema e tamanho de fonte. */
export function AccessibilityBar({ className }: { className?: string }) {
  const a = useA11y();
  const btn =
    "grid size-9 place-items-center rounded-lg text-fg transition-colors hover:bg-surface-2 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div role="toolbar" aria-label="Acessibilidade" className={cn("flex items-center gap-1", className)}>
      <button type="button" className={btn} onClick={a.shrink} disabled={!a.canShrink} aria-label="Diminuir fonte">
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="w-9 text-center text-xs font-medium text-muted" aria-live="polite">
        {Math.round(a.fontScale * 100)}%
      </span>
      <button type="button" className={btn} onClick={a.grow} disabled={!a.canGrow} aria-label="Aumentar fonte">
        <Plus className="size-4" aria-hidden />
      </button>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <button
        type="button"
        className={cn(btn, a.highContrast && "bg-surface-2 ring-1 ring-primary")}
        onClick={a.toggleContrast}
        aria-pressed={a.highContrast}
        aria-label="Alto contraste"
      >
        <Contrast className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        className={btn}
        onClick={a.toggleTheme}
        aria-label={a.theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
      >
        {a.theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
