import { Hero } from "@/components/Hero";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Areas, CtaFinal, Dicas, Faq, ParaTodos } from "@/components/SecoesHome";
import { Footer } from "@/components/Footer";
import { postsRecentes } from "@/lib/blog";

/** Tela Principal (publica): painel de entrada + como funciona + areas + dicas + FAQ. */
export default function Page() {
  // So titulo/resumo vao ao navegador (o texto completo fica no blog).
  const dicas = postsRecentes(3).map(({ slug, titulo, resumo, categoria, minutos }) => ({ slug, titulo, resumo, categoria, minutos }));
  return (
    <>
      <Hero />
      <ComoFunciona />
      <Areas />
      <ParaTodos />
      <Dicas posts={dicas} />
      <Faq />
      <CtaFinal />
      <Footer />
    </>
  );
}
