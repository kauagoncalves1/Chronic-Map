"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";
import { WordReveal } from "./WordReveal";
import { ShinyLink } from "./ShinyLink";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * Painel de entrada. Mobile: globo atras do texto, mais suave (leitura primeiro).
 * Desktop: texto a esquerda e globo a direita. Orquestracao: titulo -> subtitulo -> CTAs.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Brilho de fundo: gradiente radial barato (sem blur filter) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ background: "radial-gradient(60% 50% at 75% 45%, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 top-[34%] -z-10 opacity-35 md:inset-y-0 md:left-[46%] md:top-0 md:opacity-100"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroCanvas className="h-full w-full" />
      </motion.div>

      <motion.div
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8"
        variants={stagger}
        initial="hidden"
        animate="show"
      >

        <WordReveal
          text="Seu mapa para aprender qualquer área"
          delay={0.2}
          className="max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        />

        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted">
          Responda um diagnóstico rápido e receba uma trilha personalizada, com exercícios e um tutor para tirar suas dúvidas.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ShinyLink href="/cadastro">
            Começar agora <ArrowRight className="size-4" aria-hidden />
          </ShinyLink>
          <ShinyLink href="/login" variant="ghost">
            Já tenho conta
          </ShinyLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
