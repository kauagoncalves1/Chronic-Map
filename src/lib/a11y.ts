"use client";
/**
 * Acessibilidade global (Desafio Plus do PDF): troca de contraste e tamanho de fonte.
 * Estado vive nos atributos de <html> (data-theme, data-contrast, --font-scale),
 * que o CSS ja le; localStorage so persiste a escolha. O script do layout.tsx
 * reaplica tudo antes da pintura, sem "flash".
 */
import { useCallback, useEffect, useState } from "react";

const FONT_MIN = 0.5; // 50%
const FONT_MAX = 1.5;
const FONT_STEP = 0.125;

type Theme = "light" | "dark";

function save(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* modo privado: ignora, a escolha vale so nesta sessao */
  }
}

export function useA11y() {
  const [theme, setTheme] = useState<Theme>("light");
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  // Le o estado ja aplicado pelo script de boot (evita divergir do DOM).
  useEffect(() => {
    const d = document.documentElement;
    setTheme(d.dataset.theme === "dark" ? "dark" : "light");
    setHighContrast(d.dataset.contrast === "high");
    setFontScale(parseFloat(d.style.getPropertyValue("--font-scale")) || 1);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    save("cm-theme", next);
    setTheme(next);
  }, []);

  const toggleContrast = useCallback(() => {
    const d = document.documentElement;
    const on = d.dataset.contrast !== "high";
    if (on) d.dataset.contrast = "high";
    else delete d.dataset.contrast;
    save("cm-contrast", on ? "high" : null);
    setHighContrast(on);
  }, []);

  const changeFont = useCallback((dir: 1 | -1) => {
    const d = document.documentElement;
    const cur = parseFloat(d.style.getPropertyValue("--font-scale")) || 1;
    const next = Math.min(FONT_MAX, Math.max(FONT_MIN, +(cur + dir * FONT_STEP).toFixed(3)));
    d.style.setProperty("--font-scale", String(next));
    save("cm-font", String(next));
    setFontScale(next);
  }, []);

  return {
    theme,
    highContrast,
    fontScale,
    canGrow: fontScale < FONT_MAX,
    canShrink: fontScale > FONT_MIN,
    toggleTheme,
    toggleContrast,
    grow: () => changeFont(1),
    shrink: () => changeFont(-1),
  };
}
