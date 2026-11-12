"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { stagger, viewportOnce } from "@/lib/motion";
import type { Post } from "@/lib/blog";

/**
 * Grade de artigos (usada na home e em /blog). Recebe so o necessario do post
 * (sem o texto completo) para nao enviar conteudo desnecessario ao navegador.
 */
export type PostResumo = Pick<Post, "slug" | "titulo" | "resumo" | "categoria" | "minutos">;

export function BlogLista({ posts, colunas = 3 }: { posts: PostResumo[]; colunas?: 2 | 3 }) {
  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`grid gap-4 sm:grid-cols-2 ${colunas === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {posts.map((p) => (
        <li key={p.slug} className="flex">
          <Link href={`/blog/${p.slug}`} className="flex w-full">
            <SpotlightCard className="flex h-full w-full flex-col">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-medium text-primary">{p.categoria}</span>
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden /> {p.minutos} min</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.resumo}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ler artigo <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </SpotlightCard>
          </Link>
        </li>
      ))}
    </motion.ul>
  );
}
