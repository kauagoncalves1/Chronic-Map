"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button, Field } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { pending, startSession } from "@/lib/auth";
import { checkTwoFA, hasTwoFA, PERGUNTAS, saveTwoFA, sorteia, type Fator } from "@/lib/twofa";

/**
 * 2FA (PDF): pergunta aleatoria; 3 tentativas; ao errar 3 vezes mostra a mensagem do PDF
 * e volta ao login. Em dispositivo sem respostas salvas, cadastra as respostas (primeiro acesso aqui).
 */
const MAX = 3;
const TRIES = "cm-2fa-tries";
const MSG_FALHA = "3 tentativas sem sucesso! Favor realizar Login novamente.";

export default function DoisFatoresPage() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fator, setFator] = useState<Fator | null>(null);
  const [enroll, setEnroll] = useState(false);
  const [resp, setResp] = useState("");
  const [erro, setErro] = useState("");
  const [tent, setTent] = useState(1);
  const [busy, setBusy] = useState(false);
  const [all, setAll] = useState<Record<Fator, string>>({ mae: "", nascimento: "", cep: "" });

  useEffect(() => {
    const p = pending.get();
    if (!p) return void router.replace("/login");
    setEmail(p.usuario.email);
    setEnroll(!hasTwoFA(p.usuario.email));
    setFator(sorteia()); // sorteio so no cliente (evita divergencia de hidratacao)
    setTent(Number(sessionStorage.getItem(TRIES) ?? 0) + 1);
  }, [router]);

  const concluir = () => {
    const p = pending.get();
    if (!p) return router.replace("/login");
    sessionStorage.removeItem(TRIES);
    pending.clear();
    startSession(p);
    router.replace("/dashboard");
  };

  async function verificar(e: React.FormEvent) {
    e.preventDefault();
    if (!fator) return;
    if (!resp.trim()) return setErro("A resposta deve ser preenchida.");
    setBusy(true);
    if (await checkTwoFA(email, fator, resp)) {
      toast("Identidade confirmada!", "success");
      return concluir();
    }
    const n = Number(sessionStorage.getItem(TRIES) ?? 0) + 1;
    sessionStorage.setItem(TRIES, String(n));
    setBusy(false);
    if (n >= MAX) {
      toast(MSG_FALHA, "error");
      sessionStorage.removeItem(TRIES);
      pending.clear();
      return void setTimeout(() => router.replace("/login"), 1800);
    }
    setTent(n + 1);
    setResp("");
    setErro("Resposta incorreta.");
  }

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    if (Object.values(all).some((x) => !x.trim())) return setErro("Preencha as três respostas.");
    await saveTwoFA(email, all);
    toast("Respostas salvas neste dispositivo.", "success");
    concluir();
  }

  if (!fator) return null;
  if (enroll)
    return (
      <AuthShell title="Verificação em duas etapas" subtitle="Primeiro acesso neste dispositivo: cadastre suas respostas de segurança.">
        <form onSubmit={cadastrar} className="space-y-4" noValidate>
          <Field label={PERGUNTAS.mae} value={all.mae} onChange={(e) => setAll({ ...all, mae: e.target.value })} />
          <Field label={PERGUNTAS.nascimento} type="date" value={all.nascimento} onChange={(e) => setAll({ ...all, nascimento: e.target.value })} />
          <Field label={PERGUNTAS.cep} inputMode="numeric" value={all.cep} onChange={(e) => setAll({ ...all, cep: e.target.value })} />
          {erro && <p className="text-sm text-danger">{erro}</p>}
          <Button type="submit" className="w-full">Salvar e entrar</Button>
        </form>
      </AuthShell>
    );

  return (
    <AuthShell title="Verificação em duas etapas" subtitle={`Tentativa ${tent} de ${MAX}`}>
      <form onSubmit={verificar} className="space-y-4" noValidate>
        <Field
          label={PERGUNTAS[fator]}
          type={fator === "nascimento" ? "date" : "text"}
          inputMode={fator === "cep" ? "numeric" : undefined}
          value={resp}
          error={erro}
          onChange={(e) => { setResp(e.target.value); setErro(""); }}
          autoFocus
        />
        <Button type="submit" loading={busy} className="w-full"><ShieldCheck className="size-4" aria-hidden /> Confirmar</Button>
      </form>
    </AuthShell>
  );
}
