/**
 * Cliente HTTP unico do front para a API FastAPI (porta 8000).
 * Regra: NENHUMA tela chama fetch direto; tudo passa por aqui. Isto NAO altera o back nem a IA.
 *
 * Contratos: espelham app/schemas.py (Pydantic v2) do repositorio.
 * ATENCAO: os arquivos app/routers/* nao foram lidos (vieram vazios), entao os CAMINHOS
 * abaixo seguem o README. Os marcados com [?] precisam ser conferidos em http://localhost:8000/docs.
 */

import { PREVIEW, PREVIEW_404, previewRequest } from "./preview";

/**
 * Por padrao o navegador chama "/api/..." (mesma origem) e o Next repassa para a API FastAPI
 * (ver rewrites em next.config.ts). Assim nao depende de CORS no back. So defina
 * NEXT_PUBLIC_API_URL se quiser apontar direto para outra URL.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

/* ---------------- Sessao (token JWT) ----------------
 * Guardado em sessionStorage: some ao fechar a aba. Aceitavel para o escopo da disciplina;
 * em producao o ideal e cookie httpOnly emitido pelo servidor (precisaria de mudanca no back). */
const TOKEN_KEY = "cm-token";
const USER_KEY = "cm-user";

export const session = {
  token: () => (typeof window === "undefined" ? null : sessionStorage.getItem(TOKEN_KEY)),
  user: (): UsuarioOut | null => {
    try {
      return JSON.parse(sessionStorage.getItem(USER_KEY) ?? "null");
    } catch {
      return null;
    }
  },
  save: (t: TokenOut) => {
    sessionStorage.setItem(TOKEN_KEY, t.access_token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(t.usuario));
  },
  clear: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};

/** Erro padronizado: as telas mostram `message` num toast, nunca um alert(). */
export class ApiError extends Error {
  constructor(message: string, public status: number, public detail?: unknown) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // Modo de pre-visualizacao (npm run dev:preview): responde com dados de exemplo, sem chamar o back.
  if (PREVIEW) {
    const r = await previewRequest(path, init);
    if (r === PREVIEW_404) throw new ApiError("Recurso indisponível na pré-visualização.", 404);
    return r as T;
  }
  const token = session.token();
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    // RNF04: falha de rede/IA nao quebra a tela; permite tentar de novo.
    throw new ApiError("Não foi possível falar com o servidor. Verifique sua conexão e tente novamente.", 0);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    // Proxy sem resposta da API (back desligado): o Next devolve 5xx sem corpo JSON.
    if (res.status >= 500 && !body?.detail)
      throw new ApiError("A API não respondeu. Confirme se o back-end está no ar (docker compose up) e tente de novo.", res.status);
    const d = body?.detail;
    // FastAPI devolve string (erro de negocio) ou lista (erro de validacao 422).
    const msg = typeof d === "string" ? d : Array.isArray(d) ? d.map((e) => e.msg).join(" ") : "Algo deu errado. Tente novamente.";
    throw new ApiError(msg, res.status, body);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/* ---------------- Tipos (app/schemas.py) ---------------- */
/** `perfil` NAO existe no schema atual do back; fica opcional para quando o back enviar (master | comum). */
export type UsuarioOut = { id: number; nome: string; email: string; criado_em: string; perfil?: "master" | "comum" };
export type LogEntry = { id: number; data_hora: string; nome: string; cpf?: string; fator_2fa: string };
export type TokenOut = { access_token: string; token_type: string; usuario: UsuarioOut };
export type UsuarioCreate = { nome: string; email: string; senha: string };
export type LoginIn = { email: string; senha: string };

export type AreaMacro = { id: number; nome: string };
export type AreaMicro = { id: number; nome: string; area_macro_id: number };

export type Opcao = { valor: number | string; rotulo: string };
export type Pergunta = {
  id: number; numero: number; total: number; campo: string;
  pergunta: string; tipo: "multipla_escolha" | "texto_livre"; opcoes: Opcao[];
};
export type DiagnosticoIn = {
  area_micro_id: number; nivel_conhecimento: string; tempo_semanal_horas: number;
  objetivo: string; estilo_aprendizado: string; experiencia_previa?: string | null;
};
export type DiagnosticoOut = DiagnosticoIn & { id: number; usuario_id: number; criado_em: string };

export type Etapa = { titulo: string; descricao: string; exercicios: string[]; marco: string };
export type TrilhaOut = { id: number; diagnostico_id: number; conteudo_json: { etapas?: Etapa[] }; criado_em: string };

export type ProgressoOut = {
  id: number; trilha_id: number; usuario_id: number;
  etapa_atual: number; exercicios_concluidos: string[]; atualizado_em: string;
};

export type Material = { tipo: string; plataforma: string; titulo: string; url: string | null };
export type RespostaAssistente = {
  diagnostico: string; plano_de_melhoria: string[]; materiais: Material[]; exemplo_pratico: string;
};
export type DuvidaOut = {
  id: number; usuario_id: number; trilha_id: number; etapa_referencia: number | null;
  pergunta: string; resposta_json: Partial<RespostaAssistente>; criado_em: string;
};

export type LogOut = { id?: number; criado_em: string; nome: string; segundo_fator?: string; cpf?: string };

/** Recursos pedidos pelo PDF que NAO existem no back hoje. Se o servidor responder 404/405/501, a tela mostra "indisponivel". */
export const isUnavailable = (e: unknown) => e instanceof ApiError && [404, 405, 501].includes(e.status);

const post = <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) });
const patch = <T>(path: string, body: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) });

export const api = {
  auth: {
    cadastro: (b: UsuarioCreate) => post<UsuarioOut>("/auth/cadastro", b), // [?] caminho do README
    login: (b: LoginIn) => post<TokenOut>("/auth/login", b), //               [?] caminho do README
  },
  /** [?] Nenhum destes existe nos schemas atuais; as telas tratam 404/405 como "indisponivel". */
  usuarios: {
    listar: (busca: string) => request<UsuarioOut[]>(`/usuarios?busca=${encodeURIComponent(busca)}`),
    excluir: (id: number) => request<{ ok?: boolean }>(`/usuarios/${id}`, { method: "DELETE" }),
  },
  logs: {
    listar: (tipo: "nome" | "cpf" | "todos", termo: string) =>
      request<LogEntry[]>(`/logs?tipo=${tipo}&termo=${encodeURIComponent(termo)}`),
  },
  senha: (atual: string, nova: string) => patch<{ ok?: boolean }>("/auth/senha", { senha_atual: atual, senha_nova: nova }),
  admin: {
    usuarios: (busca: string) => request<UsuarioOut[]>(`/usuarios?busca=${encodeURIComponent(busca)}`), // [?] nao existe no back
    excluir: (id: number) => request<void>(`/usuarios/${id}`, { method: "DELETE" }), //                  [?] nao existe no back
    logs: (campo: string, busca: string) =>
      request<LogOut[]>(`/logs?campo=${encodeURIComponent(campo)}&busca=${encodeURIComponent(busca)}`), // [?] nao existe no back
    alterarSenha: (senha_atual: string, senha_nova: string) =>
      request<void>("/auth/senha", { method: "PATCH", body: JSON.stringify({ senha_atual, senha_nova }) }), // [?] nao existe no back
  },
  areas: () => request<AreaMacro[]>("/areas"),
  subareas: (id: number) => request<AreaMicro[]>(`/areas/${id}/subareas`),
  diagnostico: {
    perguntas: () => request<Pergunta[]>("/diagnostico/perguntas"),
    enviar: (b: DiagnosticoIn) => post<DiagnosticoOut>("/diagnostico", b),
  },
  trilha: {
    gerar: (diagnostico_id: number) => post<TrilhaOut>("/trilha/gerar", { diagnostico_id }),
    obter: (id: number) => request<TrilhaOut>(`/trilha/${id}`),
  },
  progresso: {
    obter: (trilhaId: number) => request<ProgressoOut>(`/progresso/${trilhaId}`),
    etapa: (trilhaId: number, etapa_atual: number) => patch<ProgressoOut>(`/progresso/${trilhaId}/etapa`, { etapa_atual }),
    exercicio: (trilhaId: number, etapa: number, indice: number) =>
      patch<ProgressoOut>(`/progresso/${trilhaId}/exercicio`, { etapa, indice }),
  },
  assistente: {
    perguntar: (trilha_id: number, pergunta: string) => post<DuvidaOut>("/assistente/perguntar", { trilha_id, pergunta }), // [?] resposta
    historico: (usuarioId: number) => request<DuvidaOut[]>(`/assistente/historico/${usuarioId}`),
  },
};

/** Endpoint inexistente no back atual (as telas mostram aviso em vez de quebrar). */
export const indisponivel = (e: unknown) => e instanceof ApiError && [404, 405, 501].includes(e.status);
