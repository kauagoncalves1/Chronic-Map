"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { KeyRound, LogOut, Wand2 } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Card, Spinner } from "@/components/ui";
import { api, type ProgressoOut, type TrilhaOut } from "@/lib/api";
import { endSession, isMaster, trilhaAtiva, useSession } from "@/lib/auth";
import { tFast } from "@/lib/motion";

/**
 * Perfil do proprio usuario: dados da conta, resumo da trilha ativa e atalhos de seguranca.
 * So exibe o que o back ja entrega (nome, e-mail, data de criacao); nada novo e coletado (LGPD).
 */
const iniciais = (nome: string) =>
  nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

const data = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
};

export default function PerfilPage() {
  const { user } = useSession();
  const router = useRouter();
  const [trilha, setTrilha] = useState<TrilhaOut | null>(null);
  const [prog, setProg] = useState<ProgressoOut | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [temTrilha, setTemTrilha] = useState(false);

  useEffect(() => {
    if (!user) return;
    const id = trilhaAtiva.get(user.id);
    setTemTrilha(!!id);
    if (!id) return void setCarregando(false);
    // Se a API falhar, o perfil continua abrindo (so o resumo da trilha some).
    Promise.all([api.trilha.obter(id), api.progresso.obter(id).catch(() => null)])
      .then(([t, p]) => { setTrilha(t); setProg(p); })
      .catch(() => undefined)
      .finally(() => setCarregando(false));
  }, [user]);

  if (!user) return <AppPage title="Meu perfil"><Spinner /></AppPage>;

  const total = trilha?.conteudo_json.etapas?.length ?? 0;
  const atual = Math.min(prog?.etapa_atual ?? 0, total);
  const pct = total ? Math.round((atual / total) * 100) : 0;

  const sair = () => { endSession(); router.push("/login"); };

  return (
    <AppPage title="Meu perfil" subtitle="Seus dados e o andamento dos seus estudos.">
      <div className="grid gap-4">
        <Card className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span aria-hidden className="grid size-20 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-fg">
            {iniciais(user.nome)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-display text-xl font-semibold">{user.nome}</h2>
            <p className="truncate text-muted">{user.email}</p>
            <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm">
              <div><dt className="inline text-muted">Membro desde </dt><dd className="inline font-medium">{data(user.criado_em)}</dd></div>
              <div><dt className="inline text-muted">Conta </dt><dd className="inline font-medium">{isMaster(user) ? "Master" : "Comum"}</dd></div>
            </dl>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">Minha trilha</h2>
          {carregando ? <div className="mt-4"><Spinner /></div> : !temTrilha || !trilha ? (
            <div className="mt-3 flex flex-col items-start gap-3">
              <p className="text-muted">Você ainda não tem uma trilha ativa. Responda o questionário para criar a sua.</p>
              <Link href="/diagnostico"><Button><Wand2 className="size-4" aria-hidden /> Responder questionário</Button></Link>
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Etapa {Math.min(atual + 1, total)} de {total}</span>
                <span className="font-medium">{pct}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da trilha">
                <motion.div className="h-full origin-left rounded-full bg-primary" style={{ width: "100%" }} initial={{ scaleX: 0 }} animate={{ scaleX: pct / 100 }} transition={tFast} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/trilha"><Button>Continuar estudando</Button></Link>
                <Link href="/diagnostico"><Button variant="ghost">Refazer questionário</Button></Link>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">Segurança e privacidade</h2>
          <p className="mt-2 text-sm text-muted">
            Sua senha nunca é exibida. Seus dados são tratados conforme a LGPD e usados apenas para o funcionamento da sua conta e da sua trilha.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {!isMaster(user) && <Link href="/senha"><Button variant="ghost"><KeyRound className="size-4" aria-hidden /> Alterar senha</Button></Link>}
            <Button variant="ghost" onClick={sair}><LogOut className="size-4" aria-hidden /> Sair da conta</Button>
          </div>
        </Card>
      </div>
    </AppPage>
  );
}
