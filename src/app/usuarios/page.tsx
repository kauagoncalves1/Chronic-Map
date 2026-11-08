"use client";
import { useCallback, useEffect, useState } from "react";
import { FileDown, Search, Trash2 } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Field, Modal, Notice, Spinner } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, isUnavailable, type UsuarioOut } from "@/lib/api";

/**
 * Consulta de usuarios (PDF, so master): busca por trecho do nome, exclusao com confirmacao
 * e PDF da lista (Desafio Plus). Lista so usuarios comuns.
 * [?] O back NAO tem GET /usuarios nem DELETE /usuarios/{id}: se responder 404/405, a tela avisa
 * em vez de quebrar. Quando as rotas existirem, ela passa a funcionar sem mudar nada aqui.
 */
export default function UsuariosPage() {
  const toast = useToast();
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState<UsuarioOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [indisponivel, setIndisponivel] = useState(false);
  const [alvo, setAlvo] = useState<UsuarioOut | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const carregar = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const r = await api.admin.usuarios(q.trim());
      setLista(r.filter((u) => u.perfil !== "master"));
      setIndisponivel(false);
    } catch (e) {
      if (isUnavailable(e)) setIndisponivel(true);
      else toast((e as Error).message, "error");
      setLista([]);
    }
    setLoading(false);
  }, [toast]);

  // Busca com atraso de 300 ms para nao chamar a API a cada tecla.
  useEffect(() => {
    const t = setTimeout(() => carregar(busca), 300);
    return () => clearTimeout(t);
  }, [busca, carregar]);

  async function excluir() {
    if (!alvo) return;
    setExcluindo(true);
    try {
      await api.admin.excluir(alvo.id);
      toast("Usuário excluído.", "success");
      setAlvo(null);
      await carregar(busca);
    } catch (e) {
      toast(isUnavailable(e) ? "O servidor ainda não permite excluir usuários." : (e as Error).message, "error");
    }
    setExcluindo(false);
  }

  async function baixarPdf() {
    const { jsPDF } = await import("jspdf"); // carregado so quando clica (nao pesa na pagina)
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Chronic Map - Usuários", 14, 18);
    doc.setFontSize(10);
    let y = 30;
    lista.forEach((u, i) => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(`${i + 1}. ${u.nome}  |  ${u.email}  |  ${new Date(u.criado_em).toLocaleDateString("pt-BR")}`, 14, y);
      y += 7;
    });
    doc.save("usuarios-chronic-map.pdf");
  }

  return (
    <AppPage title="Usuários" subtitle="Consulte os usuários comuns e gerencie o acesso." master wide>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute bottom-3.5 left-4 size-4 text-muted" aria-hidden />
          <Field label="Buscar por nome" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Digite parte do nome" className="[&_input]:pl-11" />
        </div>
        <Button variant="ghost" onClick={baixarPdf} disabled={!lista.length}><FileDown className="size-4" aria-hidden /> Baixar PDF</Button>
      </div>

      <div className="mt-6">
        {indisponivel && (
          <Notice title="Consulta de usuários indisponível no servidor">
            A API ainda não tem a rota de listagem (<code>GET /usuarios</code>). Esta tela já está pronta e passa a funcionar assim que a rota existir.
          </Notice>
        )}
        {loading ? <Spinner /> : !indisponivel && (
          lista.length === 0 ? <p className="py-12 text-center text-muted">Nenhum usuário encontrado.</p> : (
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
              {lista.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{u.nome}</p>
                    <p className="truncate text-sm text-muted">{u.email}</p>
                  </div>
                  <button onClick={() => setAlvo(u)} aria-label={`Excluir ${u.nome}`} className="grid size-10 shrink-0 place-items-center rounded-lg text-danger hover:bg-danger/10">
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )
        )}
      </div>

      <Modal open={!!alvo} onClose={() => setAlvo(null)} title="Excluir usuário?">
        <p className="text-sm text-muted">Você vai excluir <strong className="text-fg">{alvo?.nome}</strong>. Esta ação não pode ser desfeita.</p>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setAlvo(null)}>Cancelar</Button>
          <Button variant="danger" className="flex-1" loading={excluindo} onClick={excluir}>Excluir</Button>
        </div>
      </Modal>
    </AppPage>
  );
}
