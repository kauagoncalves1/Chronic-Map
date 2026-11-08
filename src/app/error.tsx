"use client";
import { ErrorView } from "@/components/ErrorView";

/** Captura erros inesperados de qualquer tela e oferece tentar de novo. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorView titulo="Algo deu errado" texto="Ocorreu um erro inesperado nesta tela." onRetry={reset} />;
}
