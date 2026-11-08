import { cn } from "@/lib/cn";
import { LOGO_PATH } from "./logo-path";

/**
 * Logo CHRNC vetorizada a partir do JPEG enviado.
 * Usa `currentColor`: acompanha o tema (azul no claro, azul claro no escuro).
 * Tamanho: controle por className, ex. <Logo className="h-10" />.
 */
export function Logo({ className, title = "Chronic Map" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 56 640 498"
      className={cn("aspect-[640/498] text-primary", className)}
      role="img"
      aria-label={title}
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
