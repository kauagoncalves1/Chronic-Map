"use client";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Field, Notice, Select, Spinner } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, isUnavailable, type LogOut } from "@/lib/api";

/**
 * Logs de autenticacao (PDF, so master): filtro por nome, CPF ou todos; colunas dia/hora, nome e
 * segundo fator; mais recentes primeiro.
 * [?] O back NAO tem GET /logs (e nao registra o 2FA): a tela avisa em vez de quebrar.
 */
export default function LogsPage() {
  const toast = useToast();
  const [campo, setCampo] = useState("todos");
  const [busca, setBusca] = useState("");
  const [logs, setLogs] = useState<LogOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [indisponivel, setIndisponivel] = useState(false);

  const carregar = useCallback(async (c: string, q: string) => {
    setLoading(true);
    try {
      const r = await api.admin.logs(c, q.trim());
      setLogs([...r].sort((a, b) => +new Date(b.criado_em) - +new Date(a.criado_em)));
      setIndisponivel(false);
    } catch (e) {
      if (isUnavailable(e)) setIndisponivel(true);
      else toast((e as Error).message, "error");
      setLogs([]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    const t = setTimeout(() => carregar(campo, busca), 300);
    return () => clearTimeout(t);
  }, [campo, busca, carregar]);

  return (
    <AppPage title="Logs de autenticação" subtitle="Acessos dos usuários comuns, do mais recente ao mais antigo." master wide>
      <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
        <Select label="Filtrar por" value={campo} onChange={(e) => setCampo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="nome">Nome</option>
          <option value="cpf">CPF</option>
        </Select>
        <div className="relative">
          <Search className="pointer-events-none absolute bottom-3.5 left-4 size-4 text-muted" aria-hidden />
          <Field label="Busca" value={busca} disabled={campo === "todos"} onChange={(e) => setBusca(e.target.value)}
            placeholder={campo === "todos" ? "Mostrando todos" : `Digite o ${campo}`} className="[&_input]:pl-11" />
        </div>
      </div>

      <div className="mt-6">
        {indisponivel && (
          <Notice title="Logs indisponíveis no servidor">
            A API ainda não registra nem expõe os logs de autenticação (<code>GET /logs</code>). A tela está pronta para quando existirem.
          </Notice>
        )}
        {loading ? <Spinner /> : !indisponivel && (
          logs.length === 0 ? <p className="py-12 text-center text-muted">Nenhum registro encontrado.</p> : (
            <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr><th className="px-5 py-3 font-medium">Dia e hora</th><th className="px-5 py-3 font-medium">Nome</th><th className="px-5 py-3 font-medium">Segundo fator</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {logs.map((l, i) => (
                    <tr key={l.id ?? i}>
                      <td className="px-5 py-3">{new Date(l.criado_em).toLocaleString("pt-BR")}</td>
                      <td className="px-5 py-3">{l.nome}</td>
                      <td className="px-5 py-3">{l.segundo_fator ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </AppPage>
  );
}
