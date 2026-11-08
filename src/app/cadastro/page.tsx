"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Eraser, Send } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button, Field, Select } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { api } from "@/lib/api";
import { saveTwoFA } from "@/lib/twofa";
import * as v from "@/lib/validators";

/**
 * Cadastro (PDF secao 5). Regras: todos os campos obrigatorios, nome 15-80 letras, CPF com digito,
 * CEP via API (ViaCEP) com preenchimento manual se falhar, telefones (+55)XX-XXXXXXXX,
 * login 6 letras, senha forte, confirmacao igual.
 * O back hoje so recebe nome, e-mail e senha: os demais campos sao validados aqui e NAO sao
 * enviados nem guardados (LGPD: nao coletamos o que nao temos onde proteger). 2FA guarda so hashes.
 */
const VAZIO = {
  nome: "", nascimento: "", sexo: "", mae: "", cpf: "", email: "", celular: "", fixo: "",
  cep: "", logradouro: "", numero: "", bairro: "", cidade: "", uf: "", login: "", senha: "", confirma: "",
};
type Form = typeof VAZIO;
type Erros = Partial<Record<keyof Form, string>>;

function validar(f: Form): Erros {
  const e: Erros = {};
  const obrig = (k: keyof Form, msg = "Campo obrigatório.") => { if (!f[k].trim()) e[k] = msg; };
  (Object.keys(VAZIO) as (keyof Form)[]).forEach((k) => obrig(k));
  if (!e.nome && !v.nomeValido(f.nome)) e.nome = "Use de 15 a 80 letras (sem números ou símbolos).";
  if (!e.cpf && !v.cpfValido(f.cpf)) e.cpf = "CPF inválido.";
  if (!e.email && !v.emailValido(f.email)) e.email = "E-mail inválido.";
  if (!e.celular && !v.telefoneValido(f.celular)) e.celular = "Use o formato (+55)XX-XXXXXXXX.";
  if (!e.fixo && !v.telefoneValido(f.fixo)) e.fixo = "Use o formato (+55)XX-XXXXXXXX.";
  if (!e.cep && !v.cepValido(f.cep)) e.cep = "CEP inválido.";
  if (!e.login && !v.loginValido(f.login)) e.login = "Exatamente 6 letras.";
  if (!e.senha && f.senha.length < 8) e.senha = "Mínimo de 8 caracteres.";
  if (!e.senha && f.senha.length > 72) e.senha = "Máximo de 72 caracteres.";
  if (!e.confirma && f.confirma !== f.senha) e.confirma = "As senhas não coincidem.";
  return e;
}

export default function CadastroPage() {
  const toast = useToast();
  const router = useRouter();
  const [f, setF] = useState<Form>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [loading, setLoading] = useState(false);
  const [cepBusy, setCepBusy] = useState(false);
  const numeroRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form, mask?: (s: string) => string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: mask ? mask(e.target.value) : e.target.value }));

  /** Preenche o endereco pelo CEP. Se faltar conexao ou der erro, o usuario digita (regra 4 do PDF). */
  async function buscaCep() {
    if (!v.cepValido(f.cep)) return;
    setCepBusy(true);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${v.soDigitos(f.cep)}/json/`);
      const d = await r.json();
      if (d.erro) throw new Error("nao encontrado");
      setF((p) => ({ ...p, logradouro: d.logradouro ?? "", bairro: d.bairro ?? "", cidade: d.localidade ?? "", uf: d.uf ?? "" }));
      numeroRef.current?.focus();
    } catch {
      toast("Não foi possível buscar o CEP. Preencha o endereço manualmente.", "warning");
    } finally {
      setCepBusy(false);
    }
  }

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validar(f);
    setErros(e);
    if (Object.keys(e).length) return toast("Corrija os campos destacados.", "error");

    setLoading(true);
    try {
      await api.auth.cadastro({ nome: f.nome.trim(), email: f.email.trim(), senha: f.senha });
      await saveTwoFA(f.email, { mae: f.mae, nascimento: f.nascimento, cep: f.cep });
      toast("Cadastro realizado! Faça login para continuar.", "success");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      toast((err as Error).message, "error");
      setLoading(false);
    }
  }

  const E = (k: keyof Form) => erros[k];
  return (
    <AuthShell title="Criar conta" subtitle="Preencha seus dados para começar." wide>
      <form onSubmit={enviar} noValidate className="grid gap-4 sm:grid-cols-2">
        <Field className="sm:col-span-2" label="Nome completo" value={f.nome} onChange={set("nome")} error={E("nome")} autoComplete="name" />
        <Field label="Data de nascimento" type="date" value={f.nascimento} onChange={set("nascimento")} error={E("nascimento")} autoComplete="bday" />
        <Select label="Sexo" value={f.sexo} onChange={set("sexo")} error={E("sexo")}>
          <option value="">Selecione</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
          <option value="O">Outro</option>
        </Select>
        <Field label="Nome materno" value={f.mae} onChange={set("mae")} error={E("mae")} />
        <Field label="CPF" inputMode="numeric" value={f.cpf} onChange={set("cpf", v.maskCpf)} error={E("cpf")} placeholder="000.000.000-00" />
        <Field className="sm:col-span-2" label="E-mail" type="email" value={f.email} onChange={set("email")} error={E("email")} autoComplete="email" />
        <Field label="Telefone celular" inputMode="tel" value={f.celular} onChange={set("celular", v.maskTelefone)} error={E("celular")} placeholder="(+55)21-999999999" />
        <Field label="Telefone fixo" inputMode="tel" value={f.fixo} onChange={set("fixo", v.maskTelefone)} error={E("fixo")} placeholder="(+55)21-22223333" />

        <Field label="CEP" inputMode="numeric" value={f.cep} onChange={set("cep", v.maskCep)} onBlur={buscaCep} error={E("cep")}
          hint={cepBusy ? "Buscando endereço..." : undefined} placeholder="00000-000" />
        <Field label="Logradouro" value={f.logradouro} onChange={set("logradouro")} error={E("logradouro")} />
        <Field ref={numeroRef} label="Número" value={f.numero} onChange={set("numero")} error={E("numero")} />
        <Field label="Bairro" value={f.bairro} onChange={set("bairro")} error={E("bairro")} />
        <Field label="Cidade" value={f.cidade} onChange={set("cidade")} error={E("cidade")} />
        <Field label="UF" maxLength={2} value={f.uf} onChange={set("uf", (s) => s.toUpperCase())} error={E("uf")} />

        <Field label="Login (6 letras)" maxLength={6} value={f.login} onChange={set("login")} error={E("login")} autoComplete="username" />
        <span className="hidden sm:block" />
        <Field label="Senha" type="password" value={f.senha} onChange={set("senha")} error={E("senha")} autoComplete="new-password" hint="Mínimo de 8 caracteres." />
        <Field label="Confirmar senha" type="password" value={f.confirma} onChange={set("confirma")} error={E("confirma")} autoComplete="new-password" />

        <div className="flex gap-3 pt-2 sm:col-span-2">
          <Button type="submit" loading={loading} className="flex-1"><Send className="size-4" aria-hidden /> Enviar</Button>
          <Button type="button" variant="ghost" className="flex-1" onClick={() => { setF(VAZIO); setErros({}); }}>
            <Eraser className="size-4" aria-hidden /> Limpar
          </Button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Já tem conta? <Link href="/login" className="font-medium text-primary hover:underline">Entrar</Link>
      </p>
    </AuthShell>
  );
}
