/**
 * Segundo fator (2FA) - PDF: pergunta aleatoria entre nome da mae, data de nascimento e CEP.
 *
 * LIMITACAO DO BACK: o banco hoje nao guarda esses tres dados (Usuario so tem nome, e-mail e senha).
 * Enquanto isso, as respostas ficam NESTE navegador, ja como HASH SHA-256 com sal (o texto original
 * nunca e armazenado). Consequencia: o 2FA vale no dispositivo onde foi cadastrado; em outro
 * dispositivo a tela pede para cadastrar as respostas. Quando o back guardar os dados, trocar
 * `checkTwoFA` por uma chamada a API.
 */
import { soDigitos } from "./validators";

export type Fator = "mae" | "nascimento" | "cep";

export const PERGUNTAS: Record<Fator, string> = {
  mae: "Qual o nome da sua mãe?",
  nascimento: "Qual a data do seu nascimento?",
  cep: "Qual o CEP do seu endereço?",
};

const FATORES = Object.keys(PERGUNTAS) as Fator[];

/** Sorteio da pergunta (regra do PDF: geracao aleatoria). Usa o gerador criptografico do navegador. */
export const sorteia = (): Fator => FATORES[crypto.getRandomValues(new Uint32Array(1))[0] % FATORES.length];

const normalizar = (f: Fator, v: string) =>
  f === "mae"
    ? v.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ")
    : f === "cep"
      ? soDigitos(v)
      : v.trim();

async function sha256(texto: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const chave = (email: string) => `cm-2fa:${email.trim().toLowerCase()}`;

export async function saveTwoFA(email: string, dados: Record<Fator, string>) {
  const sal = crypto.randomUUID();
  const hashes: Record<string, string> = {};
  for (const f of FATORES) hashes[f] = await sha256(sal + normalizar(f, dados[f]));
  localStorage.setItem(chave(email), JSON.stringify({ sal, hashes }));
}

/** Ha respostas de 2FA salvas neste dispositivo para o e-mail? */
export function hasTwoFA(email: string): boolean {
  try {
    return !!JSON.parse(localStorage.getItem(chave(email)) ?? "null")?.hashes;
  } catch {
    return false;
  }
}

export async function checkTwoFA(email: string, fator: Fator, resposta: string): Promise<boolean> {
  try {
    const d = JSON.parse(localStorage.getItem(chave(email)) ?? "null");
    return !!d && d.hashes[fator] === (await sha256(d.sal + normalizar(fator, resposta)));
  } catch {
    return false;
  }
}
