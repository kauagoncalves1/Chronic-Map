"use client";
import { ExternalLink, Sparkles } from "lucide-react";
import type { RespostaAssistente } from "@/lib/api";

/** Mensagem do chat do tutor (usada na pagina /tutor e no widget flutuante). */
export type Msg = { id: string; autor: "user" | "ia"; texto?: string; resp?: Partial<RespostaAssistente> };

/** Resposta estruturada da IA: diagnostico, plano, materiais (so links http/https) e exemplo. */
export function Resposta({ m }: { m: Msg }) {
  const r = m.resp;
  if (m.texto) return <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3">{m.texto}</p>;
  return (
    <div className="max-w-[92%] space-y-4 rounded-2xl rounded-bl-md border border-line bg-surface p-5">
      <p className="flex items-center gap-2 text-xs font-medium text-primary"><Sparkles className="size-3.5" aria-hidden /> Tutor</p>
      {r?.diagnostico && <p className="whitespace-pre-wrap">{r.diagnostico}</p>}
      {!!r?.plano_de_melhoria?.length && (
        <div>
          <p className="mb-1.5 text-sm font-semibold">Plano de melhoria</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm">{r.plano_de_melhoria.map((p, i) => <li key={i}>{p}</li>)}</ol>
        </div>
      )}
      {!!r?.materiais?.length && (
        <div>
          <p className="mb-1.5 text-sm font-semibold">Materiais sugeridos</p>
          <ul className="space-y-1.5 text-sm">
            {r.materiais.map((x, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted">{x.plataforma || x.tipo}:</span>
                {x.url ? (
                  <a href={x.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                    {x.titulo} <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                ) : <span>{x.titulo}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {r?.exemplo_pratico && (
        <div className="rounded-xl bg-surface-2 p-4 text-sm"><p className="mb-1 font-semibold">Exemplo prático</p><p className="whitespace-pre-wrap">{r.exemplo_pratico}</p></div>
      )}
      {!r?.diagnostico && !r?.plano_de_melhoria?.length && !r?.exemplo_pratico && <p className="text-muted">Resposta vazia. Tente reformular a pergunta.</p>}
    </div>
  );
}
