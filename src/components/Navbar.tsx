"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { cn } from "@/lib/cn";
import { tFast } from "@/lib/motion";

const LINKS = [
  { href: "/#produtos", label: "Produtos" },
  { href: "/login", label: "Entrar" },
];

/**
 * Navbar fixa. Desktop: logo, links, barra de acessibilidade e CTA.
 * Mobile: logo + botao que abre um painel (AnimatePresence).
 * Ganha fundo com blur depois de rolar 8px.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-9" />
          <span className="font-display text-lg font-semibold tracking-tight">Chronic Map</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-fg">
              {l.label}
            </Link>
          ))}
          <AccessibilityBar />
          <Link
            href="/cadastro"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-fg transition-transform hover:-translate-y-0.5"
          >
            Criar conta
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="overflow-hidden border-t border-line md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={tFast}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium hover:bg-surface-2"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/cadastro"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-fg"
              >
                Criar conta
              </Link>
              <AccessibilityBar className="mt-3 justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
