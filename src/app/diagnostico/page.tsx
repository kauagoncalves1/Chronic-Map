"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Card, Field, Spinner } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, type AreaMacro, type AreaMicro, type DiagnosticoIn, type Pergunta } from "@/lib/api";
import { trilhaAtiva, useSession } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { tFast } from "@/lib/motion";

/**
 * Diagnostico + geracao da trilha (IA construtora). Fluxo (RF01-RF07, RF11):
 * area -> subarea -> perguntas (com "pergunta n de total" e voltar) -> IA gera -> abre a trilha.
 * Se a IA falhar (RNF04), a tela NAO quebra: mostra o erro e deixa tentar de novo.
 */
type Passo = "area" | "sub" | "perg" | "gerando";

const slide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: tFast },
  exit: { opacity: 0, x: -24, transition: { duration: 0.15 } },
};

export default function DiagnosticoPage() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useSession();
  const [passo, setPasso] = useState<Passo>("area");
  const [areas, setAreas] = useState<AreaMacro[] | null>(null);
  const [subs, setSubs] = useState<AreaMicro[] | null>(null);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [area, setArea] = useState<AreaMacro | null>(null);
  const [sub, setSub] = useState<AreaMicro | null>(null);
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<Record<string, string>>({});
  const [erroGerar, setErroGerar] = useState("");

  const carregaAreas = useCallback(() => {
    setAreas(null);
    api.areas().then(setAreas).catch((e) => { toast(e.message, "error"); setAreas([]); });
  }, [toast]);
  useEffect(() => { if (user) carregaAreas(); }, [user, carregaAreas]);

  const escolheArea = (a: AreaMacro) => {
    setArea(a); setSubs(null); setPasso("sub");
    api.subareas(a.id).then(setSubs).catch((e) => { toast(e.message, "error"); setSubs([]); });
  };

  const escolheSub = (s: AreaMicro) => {
    setSub(s); setI(0); setPasso("perg");
    api.diagnostico.perguntas()
      // area_micro_id ja foi escolhido nos passos anteriores: nao perguntar de novo
      .then((p) => setPerguntas(p.filter((q) => q.campo !== "area_micro_id").sort((a, b) => a.numero - b.numero)))
      .catch((e) => { toast(e.message, "error"); setPasso("sub"); });
  };

  async function gerar() {
    if (!sub || !user) return;
    setPasso("gerando"); setErroGerar("");
    const body: Record<string, unknown> = { area_micro_id: sub.id };
    for (const p of perguntas) {
      const v = resp[p.campo];
      if (v === undefined || v === "") continue;
      body[p.campo] = p.campo === "tempo_semanal_horas" ? Number(v) : v;
    }
    try {
      const d = await api.diagnostico.enviar(body as unknown as DiagnosticoIn);
      const t = await api.trilha.gerar(d.id);
      trilhaAtiva.set(user.id, t.id);
      toast("Sua trilha está pronta!", "success");
      router.push("/trilha");
    } catch (e) {
      setErroGerar((e as Error).message);
    }
  }

  const q = perguntas[i];
  const valor = q ? resp[q.campo] ?? "" : "";
  const prox = () => (i + 1 < perguntas.length ? setI(i + 1) : gerar());

  return (
    <AppPage title="Criar nova trilha" subtitle="Responda algumas perguntas e a IA monta o seu plano de estudo.">
      <AnimatePresence mode="wait">
        {passo === "area" && (
          <motion.div key="area" {...slide}>
            <Etapa titulo="Qual área você quer estudar?" />
            {areas === null ? <Spinner /> : areas.length === 0 ? (
              <Vazio onRetry={carregaAreas} texto="Não foi possível carregar as áreas." />
            ) : (
              <Opcoes itens={areas.map((a) => ({ id: a.id, rotulo: a.nome }))} onPick={(id) => escolheArea(areas.find((a) => a.id === id)!)} />
            )}
          </motion.div>
        )}

        {passo === "sub" && (
          <motion.div key="sub" {...slide}>
            <Etapa titulo={`Qual subárea de ${area?.nome}?`} voltar={() => setPasso("area")} />
            {subs === null ? <Spinner /> : subs.length === 0 ? (
              <Vazio onRetry={() => area && escolheArea(area)} texto="Nenhuma subárea encontrada." />
            ) : (
              <Opcoes itens={subs.map((s) => ({ id: s.id, rotulo: s.nome }))} onPick={(id) => escolheSub(subs.find((s) => s.id === id)!)} />
            )}
          </motion.div>
        )}

        {passo === "perg" && (
          <motion.div key={`p${i}`} {...slide}>
            {!q ? <Spinner /> : (
              <>
                <Progresso n={i + 1} total={perguntas.length} />
                <Etapa titulo={q.pergunta} voltar={() => (i > 0 ? setI(i - 1) : setPasso("sub"))} />
                {q.tipo === "texto_livre" ? (
                  <Field label="Sua resposta" value={valor} maxLength={1000}
                    onChange={(e) => setResp({ ...resp, [q.campo]: e.target.value })} autoFocus />
                ) : (
                  <Opcoes
                    itens={q.opcoes.map((o) => ({ id: String(o.valor), rotulo: o.rotulo }))}
                    selecionado={valor}
                    onPick={(id) => setResp({ ...resp, [q.campo]: String(id) })}
                  />
                )}
                <div className="mt-8 flex justify-end">
                  <Button onClick={prox} disabled={valor.trim().length < (q.tipo === "texto_livre" ? 3 : 1)}>
                    {i + 1 < perguntas.length ? <>Próxima <ArrowRight className="size-4" aria-hidden /></> : <>Gerar minha trilha <Sparkles className="size-4" aria-hidden /></>}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {passo === "gerando" && (
          <motion.div key="gerando" {...slide}>
            <Card className="flex flex-col items-center gap-5 py-14 text-center">
              {erroGerar ? (
                <>
                  <p className="font-display text-xl font-semibold">Não conseguimos gerar a trilha</p>
                  <p className="max-w-md text-muted">{erroGerar}</p>
                  <div className="flex gap-3">
                    <Button onClick={gerar}>Tentar de novo</Button>
                    <Button variant="ghost" onClick={() => setPasso("perg")}>Revisar respostas</Button>
                  </div>
                </>
              ) : (
                <>
                  <GeradorAnimado />
                  <p className="font-display text-xl font-semibold">A IA está montando sua trilha</p>
                  <p className="text-muted">Isso pode levar alguns segundos.</p>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </AppPage>
  );
}

function Etapa({ titulo, voltar }: { titulo: string; voltar?: () => void }) {
  return (
    <div className="mb-6">
      {voltar && (
        <button onClick={voltar} className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> Voltar
        </button>
      )}
      <h2 className="font-display text-2xl font-semibold tracking-tight">{titulo}</h2>
    </div>
  );
}

/** "Pergunta 2 de 5" (RF06) com barra animada. */
function Progresso({ n, total }: { n: number; total: number }) {
  return (
    <div className="mb-6" aria-label={`Pergunta ${n} de ${total}`}>
      <p className="mb-2 text-sm font-medium text-muted">Pergunta {n} de {total}</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div className="h-full origin-left rounded-full bg-primary" initial={false} animate={{ scaleX: n / total }} style={{ width: "100%" }} transition={tFast} />
      </div>
    </div>
  );
}

function Opcoes({
  itens, onPick, selecionado,
}: { itens: { id: number | string; rotulo: string }[]; onPick: (id: never) => void; selecionado?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="listbox">
      {itens.map((o) => {
        const ativo = selecionado === String(o.id);
        return (
          <button key={o.id} role="option" aria-selected={ativo} onClick={() => onPick(o.id as never)}
            className={cn("flex items-center justify-between rounded-[var(--radius-control)] border bg-surface px-5 py-4 text-left font-medium transition-all hover:-translate-y-0.5 hover:border-primary",
              ativo ? "border-primary ring-4 ring-primary/15" : "border-line")}>
            {o.rotulo}
            {ativo && <Check className="size-5 text-primary" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}

function Vazio({ texto, onRetry }: { texto: string; onRetry: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="text-muted">{texto}</p>
      <Button variant="ghost" onClick={onRetry}>Tentar de novo</Button>
    </Card>
  );
}

/** Indicador de carregamento da IA (RNF01): aneis orbitando um nucleo. So transform. */
function GeradorAnimado() {
  return (
    <div className="relative grid size-20 place-items-center" aria-hidden>
      <motion.span className="absolute inset-0 rounded-full border-2 border-primary/30" animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.span className="absolute inset-2 rounded-full border-2 border-t-primary border-transparent" animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} />
      <Sparkles className="size-7 text-primary" />
    </div>
  );
}
