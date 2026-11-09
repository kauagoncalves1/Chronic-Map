/**
 * MODO DE PRE-VISUALIZACAO (somente para desenvolvimento).
 *
 * Liga com `npm run dev:preview` (define NEXT_PUBLIC_PREVIEW=1). Quando ligado:
 *  - a sessao nasce ja logada como usuario master de exemplo;
 *  - `request()` em api.ts NAO chama o back: responde com os dados de exemplo abaixo.
 * Assim da para ver e navegar TODAS as telas reais sem Docker/back/IA.
 * Desligado (padrao) este arquivo nao e usado e nada muda no comportamento real.
 * NAO altera back nem IA. Os dados abaixo sao ficticios (sem dados pessoais reais, LGPD).
 */
import type {
  AreaMacro, AreaMicro, DuvidaOut, LogEntry, Pergunta, ProgressoOut, TokenOut, TrilhaOut, UsuarioOut,
} from "./api";

export const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";
/** Sentinela: rota sem exemplo. api.ts converte em ApiError 404 (as telas mostram "indisponivel"). */
export const PREVIEW_404 = Symbol("preview-404");

const agora = () => new Date().toISOString();
const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const PREVIEW_USER: UsuarioOut = {
  id: 1, nome: "Kauã Gonçalves Exemplo", email: "exemplo@chronicmap.dev", criado_em: agora(), perfil: "master",
};
export const PREVIEW_TOKEN: TokenOut = { access_token: "preview-token", token_type: "bearer", usuario: PREVIEW_USER };

/* ---------------- Dados de exemplo ---------------- */
const areas: AreaMacro[] = [
  { id: 1, nome: "Tecnologia" }, { id: 2, nome: "Dados e IA" }, { id: 3, nome: "Design" }, { id: 4, nome: "Negócios" },
];
const subareas: AreaMicro[] = [
  { id: 11, nome: "Desenvolvimento Web", area_macro_id: 1 }, { id: 12, nome: "Back-end com Python", area_macro_id: 1 },
  { id: 21, nome: "Ciência de Dados", area_macro_id: 2 }, { id: 22, nome: "Machine Learning", area_macro_id: 2 },
  { id: 31, nome: "UI/UX Design", area_macro_id: 3 }, { id: 41, nome: "Marketing Digital", area_macro_id: 4 },
];
const perguntas: Pergunta[] = [
  { id: 1, numero: 1, total: 4, campo: "nivel_conhecimento", pergunta: "Qual é o seu nível de conhecimento hoje?", tipo: "multipla_escolha",
    opcoes: [{ valor: "iniciante", rotulo: "Iniciante" }, { valor: "intermediario", rotulo: "Intermediário" }, { valor: "avancado", rotulo: "Avançado" }] },
  { id: 2, numero: 2, total: 4, campo: "tempo_semanal_horas", pergunta: "Quantas horas por semana você pode estudar?", tipo: "multipla_escolha",
    opcoes: [{ valor: 3, rotulo: "Até 3 horas" }, { valor: 6, rotulo: "Cerca de 6 horas" }, { valor: 10, rotulo: "10 horas ou mais" }] },
  { id: 3, numero: 3, total: 4, campo: "estilo_aprendizado", pergunta: "Como você aprende melhor?", tipo: "multipla_escolha",
    opcoes: [{ valor: "video", rotulo: "Vídeos" }, { valor: "leitura", rotulo: "Leitura" }, { valor: "pratica", rotulo: "Mão na massa" }] },
  { id: 4, numero: 4, total: 4, campo: "objetivo", pergunta: "Qual é o seu objetivo com essa trilha?", tipo: "texto_livre", opcoes: [] },
];
const trilha: TrilhaOut = {
  id: 1, diagnostico_id: 1, criado_em: agora(),
  conteudo_json: {
    etapas: [
      { titulo: "Fundamentos da web", descricao: "HTML semântico, CSS moderno e como o navegador funciona.", marco: "Publicar uma página responsiva",
        exercicios: ["Montar uma página com HTML semântico", "Estilizar com Flexbox e Grid", "Tornar a página responsiva"] },
      { titulo: "JavaScript na prática", descricao: "Lógica, DOM, eventos e consumo de APIs com fetch.", marco: "Criar uma lista de tarefas interativa",
        exercicios: ["Manipular o DOM com eventos", "Consumir uma API pública", "Salvar dados no navegador"] },
      { titulo: "React e componentes", descricao: "Estado, props e composição de interfaces.", marco: "Construir um app de várias telas",
        exercicios: ["Criar componentes reutilizáveis", "Gerenciar estado com hooks", "Navegar entre páginas"] },
      { titulo: "Projeto final", descricao: "Juntar tudo em um projeto de portfólio com deploy.", marco: "Projeto publicado online",
        exercicios: ["Planejar o escopo", "Implementar as telas principais", "Publicar e documentar"] },
    ],
  },
};
let progresso: ProgressoOut = { id: 1, trilha_id: 1, usuario_id: 1, etapa_atual: 1, exercicios_concluidos: ["0:0", "0:1", "0:2", "1:0"], atualizado_em: agora() };
let usuarios: UsuarioOut[] = [
  PREVIEW_USER,
  { id: 2, nome: "Ana Beatriz Exemplo Lima", email: "ana@exemplo.dev", criado_em: agora(), perfil: "comum" },
  { id: 3, nome: "Carlos Henrique Exemplo Souza", email: "carlos@exemplo.dev", criado_em: agora(), perfil: "comum" },
  { id: 4, nome: "Marina Exemplo Oliveira Costa", email: "marina@exemplo.dev", criado_em: agora(), perfil: "comum" },
];
const logs: (LogEntry & { criado_em: string; segundo_fator: string })[] = [
  { id: 1, data_hora: agora(), criado_em: agora(), nome: "Kauã Gonçalves Exemplo", cpf: "***.***.***-00", fator_2fa: "Nome da mãe", segundo_fator: "Nome da mãe" },
  { id: 2, data_hora: agora(), criado_em: agora(), nome: "Ana Beatriz Exemplo Lima", cpf: "***.***.***-11", fator_2fa: "Data de nascimento", segundo_fator: "Data de nascimento" },
  { id: 3, data_hora: agora(), criado_em: agora(), nome: "Carlos Henrique Exemplo Souza", cpf: "***.***.***-22", fator_2fa: "CEP", segundo_fator: "CEP" },
];
const duvidas: DuvidaOut[] = [{
  id: 1, usuario_id: 1, trilha_id: 1, etapa_referencia: 1, criado_em: agora(),
  pergunta: "Qual a diferença entre let e const?",
  resposta_json: {
    diagnostico: "Você já domina variáveis; a dúvida é sobre reatribuição.",
    plano_de_melhoria: ["Use const por padrão", "Use let só quando o valor mudar", "Evite var"],
    materiais: [{ tipo: "artigo", plataforma: "MDN", titulo: "let e const", url: null }],
    exemplo_pratico: "const nome = 'Ana'; let contador = 0; contador++;",
  },
}];

/* ---------------- Roteador ---------------- */
export async function previewRequest(path: string, init: RequestInit = {}): Promise<unknown> {
  await dormir(350); // simula latencia: deixa ver spinners e animacoes de carregamento
  const m = (init.method ?? "GET").toUpperCase();
  const [rota, qs = ""] = path.split("?");
  const q = new URLSearchParams(qs);
  const corpo = init.body ? JSON.parse(String(init.body)) : {};
  const termo = (q.get("busca") ?? q.get("termo") ?? "").toLowerCase();

  if (m === "POST" && rota === "/auth/cadastro") return { id: 99, nome: corpo.nome, email: corpo.email, criado_em: agora(), perfil: "comum" };
  if (m === "POST" && rota === "/auth/login") return PREVIEW_TOKEN;
  if (m === "PATCH" && rota === "/auth/senha") return { ok: true };
  if (m === "GET" && rota === "/usuarios") return usuarios.filter((u) => `${u.nome} ${u.email}`.toLowerCase().includes(termo));
  const del = rota.match(/^\/usuarios\/(\d+)$/);
  if (m === "DELETE" && del) { usuarios = usuarios.filter((u) => u.id !== Number(del[1])); return undefined; }
  if (m === "GET" && rota === "/logs") return logs.filter((l) => !termo || l.nome.toLowerCase().includes(termo) || (l.cpf ?? "").includes(termo));
  if (m === "GET" && rota === "/areas") return areas;
  const sub = rota.match(/^\/areas\/(\d+)\/subareas$/);
  if (m === "GET" && sub) return subareas.filter((s) => s.area_macro_id === Number(sub[1]));
  if (m === "GET" && rota === "/diagnostico/perguntas") return perguntas;
  if (m === "POST" && rota === "/diagnostico") return { ...corpo, id: 1, usuario_id: 1, criado_em: agora() };
  if (m === "POST" && rota === "/trilha/gerar") { await dormir(1400); return trilha; } // a "IA" demora um pouco
  if (m === "GET" && /^\/trilha\/\d+$/.test(rota)) return trilha;
  if (m === "GET" && /^\/progresso\/\d+$/.test(rota)) return progresso;
  if (m === "PATCH" && /^\/progresso\/\d+\/etapa$/.test(rota)) { progresso = { ...progresso, etapa_atual: corpo.etapa_atual, atualizado_em: agora() }; return progresso; }
  if (m === "PATCH" && /^\/progresso\/\d+\/exercicio$/.test(rota)) {
    const k = `${corpo.etapa}:${corpo.indice}`;
    if (!progresso.exercicios_concluidos.includes(k)) progresso = { ...progresso, exercicios_concluidos: [...progresso.exercicios_concluidos, k], atualizado_em: agora() };
    return progresso;
  }
  if (m === "POST" && rota === "/assistente/perguntar") {
    await dormir(900);
    const d: DuvidaOut = {
      id: duvidas.length + 1, usuario_id: 1, trilha_id: corpo.trilha_id, etapa_referencia: progresso.etapa_atual, criado_em: agora(), pergunta: corpo.pergunta,
      resposta_json: {
        diagnostico: "Resposta de exemplo do modo de pré-visualização (a IA real responde quando o back está ligado).",
        plano_de_melhoria: ["Releia a etapa atual com calma", "Refaça o exercício sem consultar", "Anote as dúvidas que sobrarem"],
        materiais: [{ tipo: "vídeo", plataforma: "YouTube", titulo: "Material de exemplo", url: null }],
        exemplo_pratico: "console.log('Olá, Chronic Map!');",
      },
    };
    duvidas.push(d);
    return d;
  }
  if (m === "GET" && /^\/assistente\/historico\/\d+$/.test(rota)) return duvidas;
  return PREVIEW_404;
}
