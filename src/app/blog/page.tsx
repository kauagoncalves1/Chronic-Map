import type { Metadata } from "next";
import { BlogLista } from "@/components/BlogLista";
import { Footer } from "@/components/Footer";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas de estudo, técnicas de memorização e rotina para aprender melhor, sem complicação.",
};

/** Blog publico: lista dos artigos (conteudo local em src/lib/blog.ts). */
export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => b.data.localeCompare(a.data));
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-8">
        <header className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
          <p className="mt-2 text-muted">Dicas de estudo para você aprender melhor, com menos esforço e mais constância.</p>
        </header>
        <BlogLista posts={posts} />
      </div>
      <Footer />
    </>
  );
}
