"use client";
import { motion } from "motion/react";
import { AppPage } from "@/components/AppPage";
import { EASE } from "@/lib/motion";

/**
 * Modelo do BD (PDF: "uma imagem com a modelagem do banco"). Diagrama SVG gerado a partir do MER
 * do README e dos schemas do back; acompanha tema e contraste. Mudou o modelo? Edite ENTIDADES/LIGACOES.
 */
type Campo = { n: string; k?: "PK" | "FK" };
type Ent = { nome: string; x: number; y: number; campos: Campo[] };

const W = 210;
const HEAD = 34;
const ROW = 22;

const ENTIDADES: Ent[] = [
  { nome: "Usuario", x: 30, y: 30, campos: [{ n: "id", k: "PK" }, { n: "nome" }, { n: "email" }, { n: "senha_hash" }, { n: "criado_em" }] },
  { nome: "AreaMacro", x: 680, y: 30, campos: [{ n: "id", k: "PK" }, { n: "nome" }] },
  { nome: "AreaMicro", x: 680, y: 180, campos: [{ n: "id", k: "PK" }, { n: "nome" }, { n: "area_macro_id", k: "FK" }] },
  { nome: "Diagnostico", x: 355, y: 150, campos: [{ n: "id", k: "PK" }, { n: "usuario_id", k: "FK" }, { n: "area_micro_id", k: "FK" }, { n: "nivel_conhecimento" }, { n: "tempo_semanal_horas" }, { n: "objetivo" }, { n: "estilo_aprendizado" }, { n: "experiencia_previa" }, { n: "criado_em" }] },
  { nome: "Trilha", x: 355, y: 440, campos: [{ n: "id", k: "PK" }, { n: "diagnostico_id", k: "FK" }, { n: "conteudo_json" }, { n: "criado_em" }] },
  { nome: "Progresso", x: 680, y: 440, campos: [{ n: "id", k: "PK" }, { n: "trilha_id", k: "FK" }, { n: "usuario_id", k: "FK" }, { n: "etapa_atual" }, { n: "exercicios_concluidos" }, { n: "atualizado_em" }] },
  { nome: "Duvida", x: 30, y: 400, campos: [{ n: "id", k: "PK" }, { n: "usuario_id", k: "FK" }, { n: "trilha_id", k: "FK" }, { n: "etapa_referencia" }, { n: "pergunta" }, { n: "resposta_json" }, { n: "criado_em" }] },
];

/** Ligacoes: caminho + rotulos de cardinalidade (posicao x,y de cada rotulo). */
const LIGACOES: { d: string; a: [number, number, string]; b: [number, number, string] }[] = [
  { d: "M240 100 H298 V220 H355", a: [246, 92, "1"], b: [338, 212, "N"] },       // Usuario -> Diagnostico
  { d: "M785 116 V180", a: [793, 126, "1"], b: [793, 172, "N"] },                // AreaMacro -> AreaMicro
  { d: "M680 235 H565", a: [660, 227, "1"], b: [573, 227, "N"] },                // AreaMicro -> Diagnostico
  { d: "M460 390 V440", a: [468, 400, "1"], b: [468, 432, "1"] },                // Diagnostico -> Trilha
  { d: "M565 500 H680", a: [572, 492, "1"], b: [662, 492, "1"] },                // Trilha -> Progresso
  { d: "M135 182 V400", a: [143, 192, "1"], b: [143, 392, "N"] },                // Usuario -> Duvida
  { d: "M355 500 H240", a: [338, 492, "1"], b: [248, 492, "N"] },                // Trilha -> Duvida
];

export default function ModeloBdPage() {
  return (
    <AppPage title="Modelo do banco de dados" subtitle="Entidades e relacionamentos usados pelo sistema." wide>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface p-2 sm:p-4">
        <svg viewBox="0 0 930 640" className="mx-auto h-auto w-full min-w-[720px]" role="img"
          aria-label="Diagrama entidade-relacionamento: Usuario, Diagnostico, Trilha, Progresso, Duvida, AreaMacro e AreaMicro">
          {LIGACOES.map((l, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: EASE }}>
              <path d={l.d} fill="none" className="stroke-muted" strokeWidth="1.5" />
              {[l.a, l.b].map(([x, y, t], j) => (
                <text key={j} x={x} y={y} className="fill-primary" fontSize="13" fontWeight="600">{t}</text>
              ))}
            </motion.g>
          ))}
          {ENTIDADES.map((e, i) => {
            const h = HEAD + e.campos.length * ROW + 8;
            return (
              <motion.g key={e.nome} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}>
                <rect x={e.x} y={e.y} width={W} height={h} rx="12" className="fill-surface stroke-line" strokeWidth="1.5" />
                <path d={`M${e.x} ${e.y + 12} a12 12 0 0 1 12 -12 h${W - 24} a12 12 0 0 1 12 12 v${HEAD - 12} h-${W} z`} className="fill-primary" />
                <text x={e.x + 14} y={e.y + 22} className="fill-primary-fg" fontSize="14" fontWeight="700">{e.nome}</text>
                {e.campos.map((c, j) => (
                  <g key={c.n}>
                    <text x={e.x + 14} y={e.y + HEAD + 18 + j * ROW} className="fill-fg" fontSize="12" fontWeight={c.k === "PK" ? 700 : 400}>{c.n}</text>
                    {c.k && <text x={e.x + W - 14} y={e.y + HEAD + 18 + j * ROW} textAnchor="end" className="fill-muted" fontSize="10" fontWeight="600">{c.k}</text>}
                  </g>
                ))}
              </motion.g>
            );
          })}
        </svg>
      </div>
      <p className="mt-4 text-sm text-muted">PK = chave primária, FK = chave estrangeira. 1 e N indicam a cardinalidade de cada relacionamento.</p>
    </AppPage>
  );
}
