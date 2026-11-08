import { ErrorView } from "@/components/ErrorView";

export default function NotFound() {
  return <ErrorView titulo="Página não encontrada" texto="O endereço que você abriu não existe." />;
}
