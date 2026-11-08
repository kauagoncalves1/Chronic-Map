/**
 * Presets de animacao (biblioteca: Motion, pacote "motion/react").
 * Regras: so animar `transform` e `opacity` (GPU, sem travar), duracoes curtas,
 * mesma curva em todo o site para tudo parecer parte do mesmo sistema.
 * `prefers-reduced-motion` e tratado por <MotionConfig reducedMotion="user"> no layout.
 */
import type { Transition, Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const; // ease-out-expo

export const tFast: Transition = { duration: 0.25, ease: EASE };
export const tBase: Transition = { duration: 0.6, ease: EASE };
export const spring: Transition = { type: "spring", stiffness: 260, damping: 28 };

/** Sobe 16px com fade. Uso: <motion.div variants={fadeUp} initial="hidden" whileInView="show" /> */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: tBase },
};

/** Container que escalona os filhos (60ms entre cada). */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
