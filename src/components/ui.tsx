"use client";
/** Componentes de UI reutilizaveis: Field, Button, Notice, Spinner, PageShell, Modal. */
import { forwardRef, useEffect, useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, tFast } from "@/lib/motion";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  multiline?: boolean; // renderiza <textarea> (tipagem de input; os handlers sao compativeis)
  right?: React.ReactNode; // ex.: botao de mostrar/ocultar senha
} & React.InputHTMLAttributes<HTMLInputElement>;

const control =
  "w-full rounded-[var(--radius-control)] border bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-primary disabled:opacity-60";

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, hint, multiline, right, className, ...props },
  ref,
) {
  const id = useId();
  const msg = error ?? hint;
  const Tag = (multiline ? "textarea" : "input") as "input";
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Tag
          id={id}
          ref={ref as never}
          aria-invalid={!!error}
          aria-describedby={msg ? `${id}-m` : undefined}
          className={cn(control, error ? "border-danger" : "border-line", right && "pr-12")}
          {...(props as object)}
        />
        {right && <div className="absolute inset-y-0 right-1 flex items-center">{right}</div>}
      </div>
      {msg && (
        <p id={`${id}-m`} className={cn("mt-1.5 text-xs", error ? "text-danger" : "text-muted")}>
          {msg}
        </p>
      )}
    </div>
  );
});

/** Lista suspensa com o mesmo visual do Field. */
export function Select({
  label, error, className, children, ...props
}: { label: string; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        id={id}
        aria-invalid={!!error}
        className={cn(control, error ? "border-danger" : "border-line")}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

/** Superficie padrao (borda + raio unicos em todo o site). */
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-[var(--radius-card)] border border-line bg-surface p-6", className)}>{children}</div>;
}

export function Button({
  variant = "solid", loading, className, children, ...props
}: { variant?: "solid" | "ghost" | "danger"; loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50",
        variant === "solid" && "bg-primary text-primary-fg shadow-md shadow-brand-700/20",
        variant === "ghost" && "border border-line bg-surface hover:border-primary",
        variant === "danger" && "bg-danger text-white",
        className,
      )}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

export function Spinner({ label = "Carregando" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-muted" role="status">
      <Loader2 className="size-5 animate-spin" aria-hidden />
      <span className="text-sm">{label}...</span>
    </div>
  );
}

export function Notice({ title, children, tone = "warn" }: { title: string; children?: React.ReactNode; tone?: "warn" | "info" }) {
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4", tone === "warn" ? "border-warn/40 bg-warn/10" : "border-line bg-surface-2")}>
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warn" aria-hidden />
      <div className="text-sm">
        <p className="font-medium">{title}</p>
        {children && <div className="mt-1 text-muted">{children}</div>}
      </div>
    </div>
  );
}

/** Cabecalho + area de conteudo das telas internas (padrao unico de espacamento). */
export function PageShell({
  title, subtitle, actions, children, wide,
}: { title: string; subtitle?: string; actions?: React.ReactNode; children: React.ReactNode; wide?: boolean }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className={cn("mx-auto px-4 pb-24 pt-28 sm:px-8", wide ? "max-w-6xl" : "max-w-4xl")}
    >
      <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-xl text-muted">{subtitle}</p>}
        </div>
        {actions}
      </motion.div>
      <motion.div variants={fadeUp} className="mt-10">
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Modal acessivel (Esc fecha, foco na caixa). Substitui confirm() do navegador. */
export function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-brand-950/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="w-full max-w-md rounded-[var(--radius-card)] border border-line bg-surface p-6"
            initial={{ y: 16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.98 }}
            transition={tFast}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-semibold">{title}</h2>
            <div className="mt-3">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
