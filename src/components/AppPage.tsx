"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { isMaster, useSession } from "@/lib/auth";
import { fadeUp } from "@/lib/motion";
import { Spinner } from "./ui";

/**
 * Casca das telas logadas: exige sessao (senao vai para /login), aplica o espacamento
 * sob a navbar e anima o titulo. `master` restringe a tela ao perfil master.
 */
export function AppPage({
  title, subtitle, master, wide, children,
}: { title: string; subtitle?: string; master?: boolean; wide?: boolean; children: React.ReactNode }) {
  const { user, ready } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) return <div className="pt-32"><Spinner /></div>;
  if (master && !isMaster(user)) {
    router.replace("/erro?motivo=acesso");
    return null;
  }

  return (
    <div className={`mx-auto px-4 pb-24 pt-28 sm:px-8 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
      <motion.header variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
      </motion.header>
      {children}
    </div>
  );
}
