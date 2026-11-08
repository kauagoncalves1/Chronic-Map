"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { cn } from "@/lib/cn";
import { tFast } from "@/lib/motion";
import { endSession, isMaster, useSession } from "@/lib/auth";

type Item = { href: string; label: string };

const PUBLICO: Item[] = [{ href: "/#como-funciona", label: "Como funciona" }, { href: "/login", label: "Entrar" }];

/** Menu das telas logadas. Perfil master ganha Usuarios e Logs (PDF: master tem mais funcoes). */
const logado = (master: boolean): Item[] => [
  { href: "/dashboard", label: "Início" },
  { href: "/trilha", label: "Minha trilha" },
  { href: "/tutor", label: "Tutor" },
  ...(master ? [{ href: "/usuarios", label: "Usuários" }, { href: "/logs", label: "Logs" }] : [{ href: "/senha", label: "Senha" }]),
  { href: "/modelo-bd", label: "Modelo do BD" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSession();
  const path = usePathname();
  const router = useRouter();
  const links = user ? logado(isMaster(user)) : PUBLICO;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const sair = () => {
    endSession();
    router.push("/login");
  };

  const linkCls = (href: string) =>
    cn("text-sm font-medium transition-colors hover:text-fg", path === href ? "text-fg" : "text-muted");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={user ? "/dashboard" : "/"} className="flex shrink-0 items-center gap-3">
          <Logo className="h-9" />
          <span className="font-display text-lg font-semibold tracking-tight">Chronic Map</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls(l.href)}>{l.label}</Link>
          ))}
          <AccessibilityBar />
          {user ? (
            // PDF: login do usuario no canto superior direito + logout em todas as telas
            <div className="flex items-center gap-2">
              <span className="flex max-w-40 items-center gap-2 truncate rounded-xl border border-line bg-surface px-3 py-2 text-sm" title={user.email}>
                <UserRound className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{user.nome.split(" ")[0]}</span>
              </span>
              <button onClick={sair} aria-label="Sair" className="grid size-10 place-items-center rounded-xl hover:bg-surface-2">
                <LogOut className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <Link href="/cadastro" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-fg transition-transform hover:-translate-y-0.5">
              Criar conta
            </Link>
          )}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg lg:hidden"
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
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={tFast}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {user && <p className="px-3 pb-2 text-sm text-muted">Olá, {user.nome.split(" ")[0]} ({user.email})</p>}
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-lg px-3 py-3 font-medium hover:bg-surface-2">{l.label}</Link>
              ))}
              {user ? (
                <button onClick={sair} className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 font-medium">
                  <LogOut className="size-4" aria-hidden /> Sair
                </button>
              ) : (
                <Link href="/cadastro" className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-fg">Criar conta</Link>
              )}
              <AccessibilityBar className="mt-3 justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
