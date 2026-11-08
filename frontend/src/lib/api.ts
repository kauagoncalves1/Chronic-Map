/**
 * Cliente HTTP unico do front para a API FastAPI (porta 8000).
 * Regra: NENHUMA tela chama fetch direto. Tudo passa por aqui, entao quando o
 * back mudar so este arquivo muda. Nao altera o back nem a IA.
 *
 * Endpoints existentes (conforme README do projeto):
 *   GET   /areas                      GET /areas/{id}/subareas
 *   GET   /diagnostico/perguntas      POST /diagnostico
 *   POST  /trilha/gerar               GET /trilha/{id}
 *   GET   /progresso/{trilha_id}      PATCH /progresso/{trilha_id}/etapa|exercicio
 *   POST  /assistente/perguntar       GET /assistente/historico/{usuario_id}
 *
 * AINDA NAO EXISTEM no back (README: "futuramente"): /auth/login, /auth/cadastro,
 * consulta/exclusao de usuarios, logs e troca de senha. Ver `authAvailable`.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Erro padronizado: as telas mostram `message` num toast, nunca um alert(). */
export class ApiError extends Error {
  constructor(message: string, public status: number, public detail?: unknown) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    // RNF04: falha de rede/IA nao quebra a tela; permite tentar de novo.
    throw new ApiError("Servidor indisponivel. Tente novamente em instantes.", 0);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.detail?.toString?.() ?? "Algo deu errado.", res.status, body);
  }
  return res.json() as Promise<T>;
}

/* ---------- Tipos espelhando os schemas do README ---------- */
export type AreaMacro = { id: number; nome: string };
export type Etapa = { titulo: string; descricao: string; exercicios: string[]; marco: string };
export type Trilha = { id: number; diagnostico_id: number; conteudo_json: { etapas: Etapa[] } };
export type Material = { tipo: string; plataforma: string; titulo: string; url?: string };
export type RespostaAssistente = {
  diagnostico: string;
  plano_de_melhoria: string[];
  materiais: Material[];
  exemplo_pratico: string;
};

export const api = {
  areas: () => request<AreaMacro[]>("/areas"),
  subareas: (id: number) => request<AreaMacro[]>(`/areas/${id}/subareas`),
  trilha: (id: number) => request<Trilha>(`/trilha/${id}`),
  perguntar: (body: { usuario_id: number; trilha_id: number; etapa_referencia: string; pergunta: string }) =>
    request<RespostaAssistente>("/assistente/perguntar", { method: "POST", body: JSON.stringify(body) }),
  historico: (usuarioId: number) => request<unknown[]>(`/assistente/historico/${usuarioId}`),
};

/** false enquanto o back nao tiver /auth: as telas de login usam o modo local (mock). */
export const authAvailable = false;
