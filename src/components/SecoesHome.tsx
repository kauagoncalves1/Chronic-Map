"use client";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Accessibility, ArrowRight, ChevronDown, Code2, GraduationCap, Languages, Megaphone, Palette,
  ShieldCheck, Smartphone, Timer, ChartColumn, type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { BlogLista, type PostResumo } from "./BlogLista";
import { ShinyLink } from "./ShinyLink";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/** Cabecalho padrao das secoes da home. */
function Titulo({ id, titulo, texto }: { id?: string; titulo: string; texto?: string }) {
  return (
    <>
      <motion.h2 id={id} variants={fadeUp} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{titulo}</motion.h2>
      {texto && <motion.p variants={fadeUp} className="mt-3 max-w-xl text-muted">{texto}</motion.p>}
    </>
  );
}

const Secao = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-8">
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>{children}</motion.div>
  </section>
);

/* ---------------- Areas ---------------- */
const AREAS: { icon: LucideIcon; nome: string; texto: string }[] = [
  { icon: Code2, nome: "Programação", texto: "Web, back-end, banco de dados e lógica." },
  { icon: ChartColumn, nome: "Dados e IA", texto: "Análise de dados e aprendizado de máquina." },
  { icon: Palette, nome: "Design", texto: "Interfaces, experiência do usuário e identidade." },
  { icon: Megaphone, nome: "Marketing e negócios", texto: "Presença digital, vendas e gestão." },
  { icon: Languages, nome: "Idiomas", texto: "Conversação, escrita e vocabulário." },
  { icon: GraduationCap, nome: "Carreira e concursos", texto: "Planejamento para provas e transição de área." },
];

export function Areas() {
  return (
    <Secao id="areas">
      <Titulo titulo="Escolha o que você quer aprender" texto="Algumas áreas para começar. No questionário você escolhe a sua e a trilha é montada para ela." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map(({ icon: Icon, nome, texto }) => (
          <SpotlightCard key={nome} className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-primary"><Icon className="size-5" aria-hidden /></span>
            <div>
              <h3 className="font-display font-semibold">{nome}</h3>
              <p className="mt-1 text-sm text-muted">{texto}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Secao>
  );
}

/* ---------------- Para todos ---------------- */
const RECURSOS: { icon: LucideIcon; titulo: string; texto: string }[] = [
  { icon: Accessibility, titulo: "Acessível", texto: "Tema escuro, alto contraste e tamanho de letra ajustável, direto na barra do topo." },
  { icon: Smartphone, titulo: "No celular e no computador", texto: "O mesmo mapa de estudo em qualquer tela, com navegação simples." },
  { icon: Timer, titulo: "No seu ritmo", texto: "Você informa o tempo que tem por semana e a trilha respeita isso." },
  { icon: ShieldCheck, titulo: "Seus dados protegidos", texto: "Pedimos só o necessário e seguimos a LGPD. Você nunca fica sem controle." },
];

export function ParaTodos() {
  return (
    <Secao>
      <Titulo titulo="Feito para todo mundo" texto="Seja qual for sua idade, nível ou tempo livre, o Chronic Map se adapta a você." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECURSOS.map(({ icon: Icon, titulo, texto }) => (
          <motion.div key={titulo} variants={fadeUp} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
            <Icon className="size-6 text-primary" aria-hidden />
            <h3 className="mt-4 font-display font-semibold">{titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{texto}</p>
          </motion.div>
        ))}
      </div>
    </Secao>
  );
}

/* ---------------- Dicas (blog) ---------------- */
export function Dicas({ posts }: { posts: PostResumo[] }) {
  return (
    <Secao id="dicas">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Titulo titulo="Dicas de estudo" texto="Leituras rápidas para estudar melhor e manter a constância." />
        </div>
        <motion.div variants={fadeUp}>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Ver todos os artigos <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
      <div className="mt-10"><BlogLista posts={posts} /></div>
    </Secao>
  );
}

/* ---------------- FAQ ---------------- */
const PERGUNTAS: { q: string; a: string }[] = [
  { q: "Como a IA monta a minha trilha?", a: "Você responde um questionário com a área, o objetivo, o nível de conhecimento e o tempo semanal. Essas respostas vão para a IA, que divide o estudo em etapas com exercícios e marcos." },
  { q: "O que o tutor faz?", a: "É um chat para tirar dúvidas sobre a sua trilha. Ele explica de outro jeito, sugere materiais e dá exemplos práticos ligados à etapa em que você está." },
  { q: "Posso refazer o questionário?", a: "Sim. Se o plano ficar pesado ou o seu objetivo mudar, responda o questionário de novo e gere uma nova trilha." },
  { q: "Que dados vocês pedem?", a: "Para criar a conta, o servidor recebe apenas nome, e-mail e senha. Os demais campos do cadastro, como CPF e endereço, são conferidos no seu navegador e não são enviados." },
  { q: "Funciona no celular?", a: "Sim. O site foi pensado para funcionar bem tanto no celular quanto no computador." },
];

export function Faq() {
  return (
    <Secao id="perguntas">
      <Titulo titulo="Perguntas frequentes" />
      <div className="mt-8 max-w-3xl divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface">
        {PERGUNTAS.map(({ q, a }) => (
          <motion.details key={q} variants={fadeUp} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
          </motion.details>
        ))}
      </div>
    </Secao>
  );
}

/* ---------------- CTA final ---------------- */
export function CtaFinal() {
  return (
    <Secao>
      <motion.div variants={fadeUp} className="rounded-[var(--radius-card)] border border-line bg-surface px-6 py-14 text-center sm:px-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Pronto para começar?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">Crie sua conta, responda o questionário e receba sua primeira trilha em poucos minutos.</p>
        <div className="mt-8 flex justify-center">
          <ShinyLink href="/cadastro">Criar minha conta <ArrowRight className="size-4" aria-hidden /></ShinyLink>
        </div>
      </motion.div>
    </Secao>
  );
}
