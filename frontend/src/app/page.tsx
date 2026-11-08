import { Logo } from "@/components/Logo";

const brand = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** Pagina temporaria da Parte 1: so valida tokens, logo e tipografia. Sera substituida na Parte 2. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <Logo className="h-24" />
      <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Chronic Map</h1>
      <p className="mt-4 text-muted">Fundacao visual: tokens, logo vetorizada e tipografia.</p>

      <h2 className="mt-12 font-display text-xl font-semibold">Escala da marca (700 = azul da logo)</h2>
      <div className="mt-4 grid grid-cols-11 overflow-hidden rounded-xl border border-line">
        {brand.map((n) => (
          <div key={n} className="h-16" style={{ background: `var(--color-brand-${n})` }} title={`brand-${n}`} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-fg">Botao primario</button>
        <button className="rounded-xl border border-line bg-surface px-5 py-3 font-medium">Secundario</button>
      </div>
    </div>
  );
}
