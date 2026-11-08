"use client";
import { motion } from "motion/react";
import { Bot, Network, TrendingUp, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/** Tela Principal do PDF: "informacoes dos produtos com as respectivas descricoes". */
const PRODUTOS: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: Bot,
    titulo: "Tutor IA",
    texto: "Tire dúvidas sobre a sua trilha e receba um plano de melhoria, materiais e exemplos práticos.",
  },
  {
    icon: Network,
    titulo: "Mapas Mentais",
    texto: "Veja as etapas do seu aprendizado organizadas visualmente, do básico ao objetivo final.",
  },
  {
    icon: TrendingUp,
    titulo: "Atividades e Progresso",
    texto: "Marque exercícios como feitos e acompanhe a sua evolução etapa por etapa.",
  },
];

export function Produtos() {
  return (
    <section id="produtos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-8">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Tudo para estudar com direção
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 max-w-xl text-muted">
          Três ferramentas que trabalham juntas a partir do seu diagnóstico.
        </motion.p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRODUTOS.map(({ icon: Icon, titulo, texto }) => (
            <SpotlightCard key={titulo}>
              <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{texto}</p>
            </SpotlightCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
