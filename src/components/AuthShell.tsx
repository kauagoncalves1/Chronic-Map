"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { HeroCanvas } from "./HeroCanvas";
import { fadeUp, stagger } from "@/lib/motion";

/** Moldura das telas de acesso (login, cadastro, 2FA): cartao central sobre o globo suavizado. */
export function AuthShell({
  title, subtitle, children, footer, wide,
}: { title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode; wide?: boolean }) {
  return (
    <div className="relative isolate grid min-h-[100svh] place-items-center px-4 pb-12 pt-24">
      <HeroCanvas className="absolute inset-0 -z-10 h-full w-full opacity-25" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`w-full rounded-[var(--radius-card)] border border-line bg-surface/90 p-6 shadow-xl shadow-brand-950/5 backdrop-blur-xl sm:p-8 ${wide ? "max-w-2xl" : "max-w-md"}`}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <Logo className="h-9" />
          <span className="font-display font-semibold">Chronic Map</span>
        </motion.div>
        <motion.h1 variants={fadeUp} className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p variants={fadeUp} className="mt-2 text-sm text-muted">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="mt-6">
          {children}
        </motion.div>
        {footer && (
          <motion.div variants={fadeUp} className="mt-6 text-center text-sm text-muted">
            {footer}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export const AuthLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-medium text-primary underline-offset-4 hover:underline">
    {children}
  </Link>
);
