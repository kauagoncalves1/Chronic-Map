import { Hero } from "@/components/Hero";
import { ComoFunciona } from "@/components/ComoFunciona";

/** Tela Principal (publica): painel de entrada + produtos com descricao. */
export default function Page() {
  return (
    <>
      <Hero />
      <ComoFunciona />
      <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
        Chronic Map · Projeto acadêmico UNISUAM
      </footer>
    </>
  );
}
