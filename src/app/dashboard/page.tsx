"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Bot, Map as MapIcon, Sparkles, Wand2, type LucideIcon } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useSession } from "@/lib/auth";
import { stagger } from "@/lib/motion";

/** Painel do usuario: as duas IAs e o mapa/progresso da trilha. */
const CARDS: { href: string; icon: LucideIcon; titulo: string; texto: string; tag: string }[] = [
  { href: "/diagnostico", icon: Wand2, titulo: "Criar nova trilha", texto: "Responda o diagnóstico e deixe a IA montar seu plano de estudo.", tag: "IA construtora de trilhas" },
  { href: "/trilha", icon: MapIcon, titulo: "Minha trilha", texto: "Veja o mapa das etapas, marque exercícios e acompanhe sua evolução.", tag: "Mapa e progresso" },
  { href: "/tutor", icon: Bot, titulo: "Tutor", texto: "Converse com o tutor para tirar dúvidas sobre a etapa em que você está.", tag: "IA tutor (chat)" },
];

export default function DashboardPage() {
  const { user } = useSession();
  return (
    <AppPage title={`Olá, ${user?.nome.split(" ")[0] ?? ""}`} subtitle="O que você quer fazer agora?" wide>
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-3">
        {CARDS.map(({ href, icon: Icon, titulo, texto, tag }) => (
          <Link key={href} href={href} className="block">
            <SpotlightCard className="h-full">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-primary"><Icon className="size-5" aria-hidden /></span>
                <ArrowUpRight className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold">{titulo}</h2>
              <p className="mt-2 text-sm text-muted">{texto}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" aria-hidden /> {tag}
              </span>
            </SpotlightCard>
          </Link>
        ))}
      </motion.div>
    </AppPage>
  );
}
