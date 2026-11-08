import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Botao com brilho que varre no hover (inspirado nos "shiny buttons" do Uiverse).
 * CSS puro: so transform, sem JS. Variante "ghost" para a acao secundaria.
 */
export function ShinyLink({
  href, children, variant = "solid", className,
}: { href: string; children: React.ReactNode; variant?: "solid" | "ghost"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 font-medium transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
        variant === "solid"
          ? "bg-primary text-primary-fg shadow-lg shadow-brand-700/25"
          : "border border-line bg-surface text-fg hover:border-primary",
        className,
      )}
    >
      {variant === "solid" && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}
