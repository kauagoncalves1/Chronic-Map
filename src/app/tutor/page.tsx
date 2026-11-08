"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Send, Wand2 } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { Button, Card, Spinner } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, type DuvidaOut } from "@/lib/api";
import { trilhaAtiva, useSession } from "@/lib/auth";
import { fadeUp } from "@/lib/motion";
import { Resposta, type Msg } from "@/components/RespostaTutor";

/**
 * Tutor (IA 2, chat de duvidas). O historico vem do back (GET /assistente/historico/{usuario_id}),
 * filtrado pela trilha ativa; nada do chat fica no navegador (LGPD).
 * [?] Formato exato de `resposta_json`: tratamos como Partial<RespostaAssistente> para nao quebrar.
 */

const SUGESTOES = ["Não entendi a etapa atual, pode explicar de outro jeito?", "Quais materiais você recomenda para praticar?", "Como organizar meu tempo de estudo nesta semana?"];

const paraMsgs = (d: DuvidaOut): Msg[] => [
  { id: `u${d.id}`, autor: "user", texto: d.pergunta },
  { id: `i${d.id}`, autor: "ia", resp: d.resposta_json },
];

export default function TutorPage() {
  const toast = useToast();
  const { user } = useSession();
  const [tid, setTid] = useState<number | null | undefined>(undefined);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const fim = useRef<HTMLDivElement>(null);

  const carregar = useCallback(async (uid: number, trilha: number) => {
    try {
      const h = await api.assistente.historico(uid);
      setMsgs(h.filter((d) => d.trilha_id === trilha).sort((a, b) => a.id - b.id).flatMap(paraMsgs));
    } catch (e) {
      toast((e as Error).message, "warning");
    }
    setCarregando(false);
  }, [toast]);

  useEffect(() => {
    if (!user) return;
    const t = trilhaAtiva.get(user.id);
    setTid(t);
    if (t) carregar(user.id, t); else setCarregando(false);
  }, [user, carregar]);

  useEffect(() => { fim.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, enviando]);

  async function enviar(p: string) {
    const pergunta = p.trim();
    if (pergunta.length < 3 || !tid || enviando) return;
    setTexto("");
    setMsgs((m) => [...m, { id: `tmp${Date.now()}`, autor: "user", texto: pergunta }]);
    setEnviando(true);
    try {
      const d = await api.assistente.perguntar(tid, pergunta);
      setMsgs((m) => [...m, { id: `i${d.id}`, autor: "ia", resp: d.resposta_json }]);
    } catch (e) {
      toast((e as Error).message, "error"); // RNF04: o chat continua utilizavel
      setMsgs((m) => [...m, { id: `err${Date.now()}`, autor: "ia", texto: "Não consegui responder agora. Tente enviar de novo." }]);
    }
    setEnviando(false);
  }

  return (
    <AppPage title="Tutor" subtitle="Tire dúvidas sobre a sua trilha. O tutor usa o contexto da sua etapa.">
      {tid === undefined || carregando ? <Spinner /> : tid === null ? (
        <Card className="flex flex-col items-center gap-4 py-14 text-center">
          <p className="font-display text-xl font-semibold">O tutor precisa de uma trilha</p>
          <p className="max-w-md text-muted">Crie sua trilha primeiro para ele entender seu nível e objetivo.</p>
          <Link href="/diagnostico"><Button><Wand2 className="size-4" aria-hidden /> Criar minha trilha</Button></Link>
        </Card>
      ) : (
        <div className="flex flex-col">
          <div className="min-h-[40vh] space-y-4 pb-6" aria-live="polite">
            {msgs.length === 0 && (
              <Card className="text-center">
                <Bot className="mx-auto size-8 text-primary" aria-hidden />
                <p className="mt-3 font-medium">Pergunte qualquer coisa sobre a sua trilha.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {SUGESTOES.map((s) => (
                    <button key={s} onClick={() => enviar(s)} className="rounded-full border border-line px-4 py-2 text-sm hover:border-primary">{s}</button>
                  ))}
                </div>
              </Card>
            )}
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div key={m.id} variants={fadeUp} initial="hidden" animate="show" className={m.autor === "user" ? "flex justify-end" : "flex"}>
                  {m.autor === "user" ? (
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-fg">{m.texto}</p>
                  ) : (
                    <Resposta m={m} />
                  )}
                </motion.div>
              ))}
              {enviando && (
                <motion.div key="typing" variants={fadeUp} initial="hidden" animate="show" className="flex" aria-label="O tutor está digitando">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-4">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="size-2 rounded-full bg-muted" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={fim} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); enviar(texto); }} className="sticky bottom-4 flex gap-2 rounded-2xl border border-line bg-surface/90 p-2 shadow-xl backdrop-blur">
            <label htmlFor="pergunta" className="sr-only">Sua dúvida</label>
            <input id="pergunta" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={2000} placeholder="Digite sua dúvida..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted/70" />
            <Button type="submit" loading={enviando} disabled={texto.trim().length < 3} aria-label="Enviar"><Send className="size-4" aria-hidden /></Button>
          </form>
        </div>
      )}
    </AppPage>
  );
}
