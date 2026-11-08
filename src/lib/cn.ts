import clsx, { type ClassValue } from "clsx";

/** Junta classes condicionais. Ex.: cn("p-4", ativo && "bg-primary") */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
