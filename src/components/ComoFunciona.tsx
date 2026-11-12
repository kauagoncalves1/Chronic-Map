"use client";
import { motion } from "motion/react";
import { Bot, ClipboardList, Map as MapIcon, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Tela principal: como o Chronic Map funciona. Deixa clara a ordem do fluxo e onde entram
 * as DUAS IAs: a construtora de trilhas (passo 2) e o tutor em chat (passo 3).
 */
const PASSOS: { icon: LucideIcon; n: string; titulo: string; texto: string }[] = [
  {
    icon: ClipboardList,
    n: "01",
    titulo: "Faça o diagnóstico",
    texto: "Escolha a área e responda poucas perguntas sobre seu nível, tempo semanal e objetivo.",
  },
  {
    icon: MapIcon,
    n: "02",
    titulo: "Receba sua trilha",
    texto: "A IA construtora monta um plano em etapas, com exercícios e marcos para você acompanhar.",
  },
  {
    icon: Bot,
    n: "03",
    titulo: "Estude com um tutor",
    texto: "Travou em algo? O tutor responde no chat, sugere materiais e exemplos ligados à sua etapa.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-8">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Como funciona
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 max-w-xl text-muted">
          Do diagnóstico ao objetivo, em três passos e com duas inteligências artificiais ajudando você.
        </motion.p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PASSOS.map(({ icon: Icon, n, titulo, texto }) => (
            <SpotlightCard key={n}>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold text-muted">{n}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{texto}</p>
            </SpotlightCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
