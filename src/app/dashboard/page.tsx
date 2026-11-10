"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Bot, Map as MapIcon, Wand2, type LucideIcon } from "lucide-react";
import { AppPage } from "@/components/AppPage";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button, Card } from "@/components/ui";
import { trilhaAtiva, useSession } from "@/lib/auth";
import { fadeUp, stagger } from "@/lib/motion";

/** Painel do usuario: atalhos para o questionario, a trilha, o tutor e o blog. */
const CARDS: { href: string; icon: LucideIcon; titulo: string; texto: string }[] = [
  { href: "/diagnostico", icon: Wand2, titulo: "Nova trilha", texto: "Responda o questionário e deixe a IA montar seu plano de estudo." },
  { href: "/trilha", icon: MapIcon, titulo: "Minha trilha", texto: "Veja o mapa das etapas, marque exercícios e acompanhe sua evolução." },
  { href: "/tutor", icon: Bot, titulo: "Tutor", texto: "Tire dúvidas sobre a etapa em que você está, direto no chat." },
  { href: "/blog", icon: BookOpen, titulo: "Dicas de estudo", texto: "Artigos curtos para estudar melhor e manter a constância." },
];

export default function DashboardPage() {
  const { user } = useSession();
  // undefined = ainda checando (evita piscar o aviso); null = sem trilha ativa
  const [trilha, setTrilha] = useState<number | null | undefined>(undefined);
  useEffect(() => { if (user) setTrilha(trilhaAtiva.get(user.id)); }, [user]);

  return (
    <AppPage title={`Olá, ${user?.nome.split(" ")[0] ?? ""}`} subtitle="O que você quer fazer agora?" wide>
      {trilha === null && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6">
          <Card className="flex flex-col gap-4 border-primary/40 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Comece pelo questionário</h2>
              <p className="mt-1 text-sm text-muted">Conte qual área quer estudar, seu objetivo, seu nível e o tempo que tem. Com isso a IA monta a sua primeira trilha.</p>
            </div>
            <Link href="/diagnostico" className="shrink-0"><Button><Wand2 className="size-4" aria-hidden /> Responder agora</Button></Link>
          </Card>
        </motion.div>
      )}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ href, icon: Icon, titulo, texto }) => (
          <Link key={href} href={href} className="block">
            <SpotlightCard className="h-full">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-primary"><Icon className="size-5" aria-hidden /></span>
                <ArrowUpRight className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold">{titulo}</h2>
              <p className="mt-2 text-sm text-muted">{texto}</p>
            </SpotlightCard>
          </Link>
        ))}
      </motion.div>
    </AppPage>
  );
}
