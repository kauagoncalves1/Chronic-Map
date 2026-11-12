"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronRight, Flag, Wand2 } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Card, Spinner } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, ApiError, type Etapa, type ProgressoOut, type TrilhaOut } from "@/lib/api";
import { trilhaAtiva, useSession } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Minha trilha = mapa das etapas + progresso (substitui "mapas" e "progresso" do front antigo).
 * [?] O formato de `exercicios_concluidos` (list[str]) nao esta documentado: `feito()` aceita
 * "etapa:indice", "etapa-indice", "etapa.indice" e "etapa_indice". Confirme em /docs.
 */
const feito = (p: ProgressoOut | null, e: number, i: number) =>
  !!p?.exercicios_concluidos.some((k) => [`${e}:${i}`, `${e}-${i}`, `${e}.${i}`, `${e}_${i}`].includes(String(k)));

export default function TrilhaPage() {
  const toast = useToast();
  const { user } = useSession();
  const [id, setId] = useState<number | null | undefined>(undefined);
  const [trilha, setTrilha] = useState<TrilhaOut | null>(null);
  const [prog, setProg] = useState<ProgressoOut | null>(null);
  const [aberta, setAberta] = useState(0);
  const [busy, setBusy] = useState(false);

  const carregar = useCallback(async (tid: number) => {
    try {
      setTrilha(await api.trilha.obter(tid));
      setProg(await api.progresso.obter(tid).catch((e) => (e instanceof ApiError && e.status === 404 ? null : Promise.reject(e))));
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }, [toast]);

  useEffect(() => {
    if (!user) return;
    const t = trilhaAtiva.get(user.id);
    setId(t);
    if (t) carregar(t);
  }, [user, carregar]);

  useEffect(() => { if (prog) setAberta(Math.min(prog.etapa_atual, 999)); }, [prog?.etapa_atual]); // eslint-disable-line react-hooks/exhaustive-deps

  const etapas: Etapa[] = trilha?.conteudo_json.etapas ?? [];
  const atual = prog?.etapa_atual ?? 0;
  const pct = etapas.length ? Math.round((Math.min(atual, etapas.length) / etapas.length) * 100) : 0;

  async function marcar(e: number, i: number) {
    if (!id || feito(prog, e, i)) return;
    setBusy(true);
    try { setProg(await api.progresso.exercicio(id, e, i)); } catch (er) { toast((er as Error).message, "error"); }
    setBusy(false);
  }
  async function concluir(e: number) {
    if (!id) return;
    setBusy(true);
    try {
      setProg(await api.progresso.etapa(id, e + 1));
      toast(e + 1 >= etapas.length ? "Trilha concluída. Parabéns!" : "Etapa concluída!", "success");
    } catch (er) { toast((er as Error).message, "error"); }
    setBusy(false);
  }

  return (
    <AppPage title="Minha trilha" subtitle="Seu mapa de estudo, etapa por etapa." wide>
      {id === undefined ? <Spinner /> : id === null ? (
        <Card className="flex flex-col items-center gap-4 py-14 text-center">
          <p className="font-display text-xl font-semibold">Você ainda não tem uma trilha</p>
          <p className="max-w-md text-muted">Responda o diagnóstico e a IA monta um plano para o seu objetivo.</p>
          <Link href="/diagnostico"><Button><Wand2 className="size-4" aria-hidden /> Criar minha trilha</Button></Link>
        </Card>
      ) : !trilha ? <Spinner label="Carregando trilha" /> : (
        <>
          <Card className="mb-10">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Progresso</span><span>{pct}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </Card>

          {/* Mapa: linha vertical com nos; a linha "desenha" ao entrar na tela */}
          <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce} className="relative space-y-4 pl-10">
            <motion.span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-0.5 origin-top bg-line"
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce} transition={{ duration: 1.2, ease: "easeOut" }} />
            {etapas.map((et, e) => {
              const ok = e < atual, ativa = e === atual, open = aberta === e;
              return (
                <motion.li key={e} variants={fadeUp} className="relative">
                  <span aria-hidden className={cn("absolute -left-10 top-5 grid size-8 place-items-center rounded-full border-2 text-xs font-bold",
                    ok ? "border-ok bg-ok text-white" : ativa ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface text-muted")}>
                    {ok ? <Check className="size-4" /> : e + 1}
                  </span>
                  <Card className={cn("p-0", ativa && "border-primary/60")}>
                    <button className="flex w-full items-center justify-between gap-3 p-5 text-left" aria-expanded={open}
                      onClick={() => setAberta(open ? -1 : e)}>
                      <span className="font-display text-lg font-semibold">{et.titulo}</span>
                      <ChevronRight className={cn("size-5 shrink-0 text-muted transition-transform", open && "rotate-90")} aria-hidden />
                    </button>
                    {open && (
                      <div className="border-t border-line p-5">
                        <p className="text-muted">{et.descricao}</p>
                        {et.exercicios.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {et.exercicios.map((ex, i) => {
                              const d = feito(prog, e, i);
                              return (
                                <li key={i}>
                                  <label className={cn("flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-surface-2", d && "opacity-70")}>
                                    <input type="checkbox" checked={d} disabled={busy || d} onChange={() => marcar(e, i)} className="mt-1 size-4 accent-[var(--primary)]" />
                                    <span className={d ? "line-through" : ""}>{ex}</span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        <p className="mt-4 flex items-start gap-2 text-sm text-muted"><Flag className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> Marco: {et.marco}</p>
                        {ativa && <Button className="mt-5" loading={busy} onClick={() => concluir(e)}>Concluir etapa</Button>}
                      </div>
                    )}
                  </Card>
                </motion.li>
              );
            })}
          </motion.ol>
        </>
      )}
    </AppPage>
  );
}
