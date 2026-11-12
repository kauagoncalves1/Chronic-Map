"use client";
import Link from "next/link";
import { AlertOctagon } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { ShinyLink } from "./ShinyLink";

/** Tela de erro (PDF): algo inesperado, como falha de autenticacao ou acesso negado. */
export function ErrorView({ titulo, texto, onRetry }: { titulo: string; texto: string; onRetry?: () => void }) {
  return (
    <AuthShell title={titulo} subtitle={texto}>
      <div className="flex flex-col items-center gap-5">
        <span className="grid size-14 place-items-center rounded-2xl bg-danger/10 text-danger">
          <AlertOctagon className="size-7" aria-hidden />
        </span>
        <div className="flex w-full flex-col gap-3">
          {onRetry && (
            <button onClick={onRetry} className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-fg">Tentar novamente</button>
          )}
          <ShinyLink href="/login" variant="ghost">Ir para o login</ShinyLink>
          <Link href="/" className="text-center text-sm text-muted hover:text-fg">Voltar ao início</Link>
        </div>
      </div>
    </AuthShell>
  );
}
