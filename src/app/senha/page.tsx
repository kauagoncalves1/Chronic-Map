"use client";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Card, Field, Notice } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, isUnavailable } from "@/lib/api";
import { isMaster, useSession } from "@/lib/auth";
import { senhaValida } from "@/lib/validators";

/**
 * Alteracao de senha (PDF: so o usuario comum altera a propria).
 * [?] O back NAO tem a rota de troca de senha (PATCH /auth/senha): se responder 404/405, avisamos.
 */
export default function SenhaPage() {
  const toast = useToast();
  const { user } = useSession();
  const [f, setF] = useState({ atual: "", nova: "", confirma: "" });
  const [erros, setErros] = useState<Partial<typeof f>>({});
  const [loading, setLoading] = useState(false);
  const [indisponivel, setIndisponivel] = useState(false);

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    const e: Partial<typeof f> = {};
    if (!f.atual) e.atual = "Informe a senha atual.";
    if (!senhaValida(f.nova)) e.nova = "Use de 8 a 72 caracteres.";
    else if (f.nova === f.atual) e.nova = "A nova senha deve ser diferente da atual.";
    if (f.confirma !== f.nova) e.confirma = "As senhas não coincidem.";
    setErros(e);
    if (Object.keys(e).length) return toast("Corrija os campos destacados.", "error");

    setLoading(true);
    try {
      await api.admin.alterarSenha(f.atual, f.nova);
      toast("Senha alterada com sucesso.", "success");
      setF({ atual: "", nova: "", confirma: "" });
    } catch (err) {
      if (isUnavailable(err)) { setIndisponivel(true); toast("O servidor ainda não permite alterar a senha.", "warning"); }
      else toast((err as Error).message, "error");
    }
    setLoading(false);
  }

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <AppPage title="Alterar senha" subtitle="Escolha uma senha nova para a sua conta.">
      {isMaster(user) ? (
        <Notice tone="info" title="Somente usuários comuns alteram a senha por aqui." />
      ) : (
        <Card className="max-w-md">
          {indisponivel && (
            <div className="mb-5"><Notice title="Troca de senha indisponível no servidor">A rota ainda não existe na API; o formulário está pronto para quando existir.</Notice></div>
          )}
          <form onSubmit={enviar} noValidate className="space-y-4">
            <Field label="Senha atual" type="password" autoComplete="current-password" value={f.atual} onChange={set("atual")} error={erros.atual} />
            <Field label="Nova senha" type="password" autoComplete="new-password" value={f.nova} onChange={set("nova")} error={erros.nova} hint="Mínimo de 8 caracteres." />
            <Field label="Confirmar nova senha" type="password" autoComplete="new-password" value={f.confirma} onChange={set("confirma")} error={erros.confirma} />
            <Button type="submit" loading={loading} className="w-full"><KeyRound className="size-4" aria-hidden /> Salvar nova senha</Button>
          </form>
        </Card>
      )}
    </AppPage>
  );
}
