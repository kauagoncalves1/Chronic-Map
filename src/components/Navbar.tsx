"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, LogOut, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { cn } from "@/lib/cn";
import { tFast } from "@/lib/motion";
import { endSession, isMaster, useSession } from "@/lib/auth";

type Item = { href: string; label: string };

const PUBLICO: Item[] = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/blog", label: "Blog" },
  { href: "/login", label: "Entrar" },
];

/** Menu principal das telas logadas (so o essencial; o resto fica no menu do usuario). */
const LOGADO: Item[] = [
  { href: "/dashboard", label: "Início" },
  { href: "/trilha", label: "Minha trilha" },
  { href: "/tutor", label: "Tutor" },
  { href: "/blog", label: "Blog" },
];

/** Menu do usuario. Perfil master ganha "Administracao" (exigida pelo PDF); o comum altera a propria senha. */
const contaItens = (master: boolean): Item[] => [
  { href: "/perfil", label: "Meu perfil" },
  ...(master ? [] : [{ href: "/senha", label: "Alterar senha" }]),
];
const ADMIN: Item[] = [
  { href: "/usuarios", label: "Usuários" },
  { href: "/logs", label: "Logs de acesso" },
  { href: "/modelo-bd", label: "Modelo do banco" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSession();
  const path = usePathname();
  const router = useRouter();
  const master = isMaster(user);
  const links = user ? LOGADO : PUBLICO;
  const [conta, setConta] = useState(false);
  const contaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); setConta(false); }, [path]);

  // Menu do usuario: fecha ao clicar fora ou apertar Esc.
  useEffect(() => {
    if (!conta) return;
    const fora = (e: PointerEvent) => !contaRef.current?.contains(e.target as Node) && setConta(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setConta(false);
    window.addEventListener("pointerdown", fora);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", fora);
      window.removeEventListener("keydown", esc);
    };
  }, [conta]);

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
    cn("text-sm font-medium transition-colors hover:text-fg", path === href || (href !== "/" && path.startsWith(`${href}/`)) ? "text-fg" : "text-muted");

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
            // PDF: login do usuario no canto superior direito + logout acessivel em todas as telas
            <div ref={contaRef} className="relative">
              <button
                type="button"
                onClick={() => setConta((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={conta}
                className="flex max-w-44 items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm"
                title={user.email}
              >
                <UserRound className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{user.nome.split(" ")[0]}</span>
                <ChevronDown className={cn("size-4 shrink-0 text-muted transition-transform", conta && "rotate-180")} aria-hidden />
              </button>
              <AnimatePresence>
                {conta && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={tFast}
                    className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-line bg-surface p-2 shadow-xl"
                  >
                    <p className="truncate px-3 pb-2 pt-1 text-xs text-muted">{user.email}</p>
                    {contaItens(master).map((l) => (
                      <Link key={l.href} href={l.href} role="menuitem" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-2">{l.label}</Link>
                    ))}
                    {master && (
                      <>
                        <p className="mt-2 flex items-center gap-1.5 border-t border-line px-3 pb-1 pt-3 text-xs font-medium text-muted">
                          <ShieldCheck className="size-3.5" aria-hidden /> Administração
                        </p>
                        {ADMIN.map((l) => (
                          <Link key={l.href} href={l.href} role="menuitem" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-2">{l.label}</Link>
                        ))}
                      </>
                    )}
                    <button onClick={sair} role="menuitem" className="mt-2 flex w-full items-center gap-2 border-t border-line px-3 pb-2 pt-3 text-left text-sm hover:text-danger">
                      <LogOut className="size-4" aria-hidden /> Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
              {[...links, ...(user ? contaItens(master) : []), ...(user && master ? ADMIN : [])].map((l) => (
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
