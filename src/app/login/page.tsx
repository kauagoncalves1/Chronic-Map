"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, LogIn, Eraser } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button, Field } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api, ApiError } from "@/lib/api";
import { pending } from "@/lib/auth";

/** Login (PDF): campos login e senha obrigatorios, enviar e limpar. O back autentica por e-mail. */
export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ver, setVer] = useState(false);
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({});
  const [loading, setLoading] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const er = { email: email.trim() ? undefined : "Informe seu e-mail.", senha: senha ? undefined : "Informe sua senha." };
    setErros(er);
    if (er.email || er.senha) return toast("Preencha e-mail e senha.", "warning");

    setLoading(true);
    try {
      const token = await api.auth.login({ email, senha });
      pending.set(token); // so vira sessao depois do 2FA
      router.push("/2fa");
    } catch (err) {
      const msg = err instanceof ApiError && err.status === 401 ? "E-mail ou senha incorretos." : (err as Error).message;
      toast(msg, "error");
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Entrar" subtitle="Acesse suas trilhas de estudo.">
      <form onSubmit={enviar} noValidate className="space-y-4">
        <Field label="E-mail" type="email" autoComplete="email" value={email} error={erros.email}
          onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" />
        <div className="relative">
          <Field label="Senha" type={ver ? "text" : "password"} autoComplete="current-password" value={senha}
            error={erros.senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="button" onClick={() => setVer(!ver)} aria-label={ver ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-[2.35rem] text-muted hover:text-fg">
            {ver ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
          </button>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={loading} className="flex-1"><LogIn className="size-4" aria-hidden /> Entrar</Button>
          <Button type="button" variant="ghost" className="flex-1"
            onClick={() => { setEmail(""); setSenha(""); setErros({}); }}>
            <Eraser className="size-4" aria-hidden /> Limpar
          </Button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Ainda não tem conta? <Link href="/cadastro" className="font-medium text-primary hover:underline">Cadastre-se</Link>
      </p>
    </AuthShell>
  );
}
