"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ErrorView } from "@/components/ErrorView";

const MOTIVOS: Record<string, [string, string]> = {
  acesso: ["Acesso negado", "Seu perfil não tem permissão para abrir esta tela."],
  auth: ["Falha na autenticação", "Não foi possível confirmar sua identidade. Faça login novamente."],
};

function Conteudo() {
  const m = useSearchParams().get("motivo") ?? "";
  const [t, x] = MOTIVOS[m] ?? ["Algo deu errado", "Ocorreu um erro inesperado. Tente novamente."];
  return <ErrorView titulo={t} texto={x} />;
}

export default function ErroPage() {
  return <Suspense><Conteudo /></Suspense>;
}
