/**
 * Validacoes e mascaras do cadastro (regras da secao 5 do PDF). Funcoes puras, sem efeitos.
 */
export const soDigitos = (s: string) => s.replace(/\D/g, "");

/** CPF com conferencia dos dois digitos verificadores (regra 3). */
export function cpfValido(cpf: string): boolean {
  const d = soDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const dv = (len: number) => {
    let soma = 0;
    for (let i = 0; i < len; i++) soma += Number(d[i]) * (len + 1 - i);
    const r = (soma * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10]);
}

/** Nome: 15 a 80 caracteres alfabeticos, espacos permitidos (regra 2). */
export const nomeValido = (s: string) => /^[A-Za-zÀ-ÿ' ]{15,80}$/.test(s.trim());

export const emailValido = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.trim());

/** Senha: o back aceita 8 a 72 caracteres (bcrypt trunca em 72 bytes). */
export const senhaValida = (s: string) => s.length >= 8 && s.length <= 72;

export const cepValido = (s: string) => soDigitos(s).length === 8;

/** Telefone no formato (+55)XX-XXXXXXXX (8 digitos fixo ou 9 celular) - regra 5. */
export const telefoneValido = (s: string) => /^\(\+55\)\d{2}-\d{8,9}$/.test(s);

export function dataNascimentoValida(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00`);
  return !Number.isNaN(d.getTime()) && d <= new Date() && d.getFullYear() >= 1900;
}

/* ---------------- Mascaras (formatam enquanto digita) ---------------- */
export const maskCpf = (v: string) =>
  soDigitos(v).slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

export const maskCep = (v: string) => soDigitos(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

/** (+55)21-999999999. Aceita colar com ou sem o 55. */
export function maskTelefone(v: string): string {
  let d = soDigitos(v);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (!d) return "";
  return `(+55)${d.slice(0, 2)}${d.length > 2 ? `-${d.slice(2)}` : ""}`;
}
