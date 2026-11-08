"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Maximize2, Send, Wand2, X } from "lucide-react";
import { Resposta, type Msg } from "./RespostaTutor";
import { Button } from "./ui";
import { useToast } from "./Toast";
import { api } from "@/lib/api";
import { trilhaAtiva, useSession } from "@/lib/auth";
import { spring } from "@/lib/motion";

/**
 * Chatbot do site (IA 2, tutor): botao flutuante em todas as telas logadas.
 * Usa o mesmo endpoint do /tutor (POST /assistente/perguntar) com a trilha ativa.
 * Conversa completa e historico: pagina /tutor. Aqui as mensagens vivem so na tela (nada no navegador).
 */
const OCULTAR_EM = ["/", "/login", "/cadastro", "/2fa", "/erro", "/tutor"];

export function ChatWidget() {
  const { user } = useSession();
  const path = usePathname();
  const toast = useToast();
  const [aberto, setAberto] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => { fim.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, enviando, aberto]);
  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  if (!user || OCULTAR_EM.includes(path)) return null;
  const tid = trilhaAtiva.get(user.id);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const pergunta = texto.trim();
    if (pergunta.length < 3 || !tid || enviando) return;
    setTexto("");
    setMsgs((m) => [...m, { id: `u${Date.now()}`, autor: "user", texto: pergunta }]);
    setEnviando(true);
    try {
      const d = await api.assistente.perguntar(tid, pergunta);
      setMsgs((m) => [...m, { id: `i${d.id}`, autor: "ia", resp: d.resposta_json }]);
    } catch (er) {
      toast((er as Error).message, "error");
      setMsgs((m) => [...m, { id: `e${Date.now()}`, autor: "ia", texto: "Não consegui responder agora. Tente de novo." }]);
    }
    setEnviando(false);
  }

  return (
    <>
      <AnimatePresence>
        {aberto && (
          <motion.section
            role="dialog"
            aria-label="Chat do tutor"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={spring}
            className="fixed inset-x-3 bottom-24 z-40 flex h-[min(34rem,calc(100svh-8rem))] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-2xl shadow-brand-950/20 sm:inset-x-auto sm:right-6 sm:w-[24rem]"
          >
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="flex items-center gap-2 font-display font-semibold"><Bot className="size-4 text-primary" aria-hidden /> Tutor</p>
              <div className="flex">
                <Link href="/tutor" aria-label="Abrir conversa completa" className="grid size-9 place-items-center rounded-lg hover:bg-surface-2"><Maximize2 className="size-4" aria-hidden /></Link>
                <button onClick={() => setAberto(false)} aria-label="Fechar chat" className="grid size-9 place-items-center rounded-lg hover:bg-surface-2"><X className="size-4" aria-hidden /></button>
              </div>
            </header>

            {tid ? (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
                  {msgs.length === 0 && <p className="py-8 text-center text-sm text-muted">Pergunte algo sobre a sua trilha.</p>}
                  {msgs.map((m) => (
                    <div key={m.id} className={m.autor === "user" ? "flex justify-end" : "flex"}>
                      {m.autor === "user"
                        ? <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-fg">{m.texto}</p>
                        : <Resposta m={m} />}
                    </div>
                  ))}
                  {enviando && <p className="text-sm text-muted">O tutor está digitando...</p>}
                  <div ref={fim} />
                </div>
                <form onSubmit={enviar} className="flex gap-2 border-t border-line p-2">
                  <label htmlFor="chat-widget" className="sr-only">Sua dúvida</label>
                  <input id="chat-widget" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={2000} placeholder="Digite sua dúvida..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted/70" />
                  <Button type="submit" loading={enviando} disabled={texto.trim().length < 3} aria-label="Enviar" className="!px-3.5 !py-2.5"><Send className="size-4" aria-hidden /></Button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                <p className="text-sm text-muted">O tutor precisa de uma trilha para entender seu nível e objetivo.</p>
                <Link href="/diagnostico" onClick={() => setAberto(false)}><Button><Wand2 className="size-4" aria-hidden /> Criar trilha</Button></Link>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? "Fechar chat do tutor" : "Abrir chat do tutor"}
        aria-expanded={aberto}
        className="fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-fg shadow-xl shadow-brand-700/30 transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        {aberto ? <X className="size-6" aria-hidden /> : <Bot className="size-6" aria-hidden />}
      </button>
    </>
  );
}
