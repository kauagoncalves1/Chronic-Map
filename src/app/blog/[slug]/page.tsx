import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { BlogLista } from "@/components/BlogLista";
import { Footer } from "@/components/Footer";
import { POSTS, formataData, postPorSlug, postsRecentes } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

/** Gera as paginas dos artigos no build (rapido e bom para SEO). */
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postPorSlug((await params).slug);
  return post ? { title: post.titulo, description: post.resumo } : {};
}

export default async function ArtigoPage({ params }: Props) {
  const post = postPorSlug((await params).slug);
  if (!post) notFound();
  const outros = postsRecentes(2, post.slug);

  return (
    <>
      <article className="mx-auto max-w-2xl px-4 pb-16 pt-28 sm:px-0">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> Todos os artigos
        </Link>
        <p className="text-sm font-medium text-primary">{post.categoria}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.titulo}</h1>
        <p className="mt-4 flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.data}>{formataData(post.data)}</time>
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden /> {post.minutos} min de leitura</span>
        </p>

        <div className="mt-10 space-y-5 text-[1.0625rem] leading-relaxed">
          {post.conteudo.map((b, i) =>
            b.t === "h2" ? (
              <h2 key={i} className="pt-4 font-display text-xl font-semibold tracking-tight">{b.texto}</h2>
            ) : b.t === "ul" ? (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                {b.itens.map((it) => <li key={it}>{it}</li>)}
              </ul>
            ) : (
              <p key={i}>{b.texto}</p>
            ),
          )}
        </div>

        <div className="mt-14 rounded-[var(--radius-card)] border border-line bg-surface p-6">
          <p className="font-display text-lg font-semibold">Quer um plano de estudo só seu?</p>
          <p className="mt-1 text-sm text-muted">Responda o questionário e a IA monta uma trilha com o seu objetivo, nível e tempo disponível.</p>
          <Link href="/cadastro" className="mt-4 inline-block rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-fg transition-transform hover:-translate-y-0.5">
            Criar minha trilha
          </Link>
        </div>
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-8" aria-labelledby="mais">
        <h2 id="mais" className="mb-6 font-display text-xl font-semibold">Continue lendo</h2>
        <BlogLista posts={outros} colunas={2} />
      </section>
      <Footer />
    </>
  );
}
