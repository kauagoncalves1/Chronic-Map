"use client";
/**
 * Sessao no front. Fluxo: login -> token fica PENDENTE -> 2FA ok -> sessao ativa.
 * Assim nenhuma tela protegida abre antes do segundo fator.
 * OBS: o back nao exige 2FA; esta barreira vale para o front (limite do back atual).
 */
import { useSyncExternalStore } from "react";
import { session, type TokenOut, type UsuarioOut } from "./api";
import { PREVIEW, PREVIEW_TOKEN } from "./preview";

const EVT = "cm-session";
const PEND = "cm-pending";
const emit = () => window.dispatchEvent(new Event(EVT));

export function startSession(t: TokenOut) {
  session.save(t);
  emit();
}
export function endSession() {
  session.clear();
  emit();
}

export const pending = {
  set: (t: TokenOut) => sessionStorage.setItem(PEND, JSON.stringify(t)),
  get: (): TokenOut | null => {
    try {
      return JSON.parse(sessionStorage.getItem(PEND) ?? "null");
    } catch {
      return null;
    }
  },
  clear: () => sessionStorage.removeItem(PEND),
};

/** Trilha ativa (uma por usuario), guardada so como id numerico. */
export const trilhaAtiva = {
  get: (userId: number): number | null => {
    const v = localStorage.getItem(`cm-trilha-${userId}`);
    return v ? Number(v) : null;
  },
  set: (userId: number, id: number) => localStorage.setItem(`cm-trilha-${userId}`, String(id)),
};

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
const snap = () => sessionStorage.getItem("cm-user") ?? "";

/** `ready` fica false no servidor/hidratacao: evita piscar "deslogado". */
export function useSession(): { user: UsuarioOut | null; ready: boolean } {
  const raw = useSyncExternalStore(subscribe, snap, () => undefined as unknown as string);
  if (raw === undefined) return { user: null, ready: false };
  let user: UsuarioOut | null = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch {
    /* ignora */
  }
  return { user, ready: true };
}

export const isMaster = (u: UsuarioOut | null) => u?.perfil === "master";

/** Pre-visualizacao: ja nasce logado (master) e com trilha ativa, para abrir todas as telas. */
if (PREVIEW && typeof window !== "undefined" && !session.token()) {
  session.save(PREVIEW_TOKEN);
  trilhaAtiva.set(PREVIEW_TOKEN.usuario.id, 1);
}
