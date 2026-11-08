import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "Chronic Map", template: "%s | Chronic Map" },
  description: "Trilhas de estudo personalizadas com inteligencia artificial.",
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/**
 * Script inline: aplica tema/contraste/fonte salvos ANTES da pintura,
 * evitando o "flash" de tema errado. Le so valores nossos (sem dados do usuario).
 */
const BOOT = `try{var d=document.documentElement,s=localStorage;
var t=s.getItem('cm-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
d.dataset.theme=t;var c=s.getItem('cm-contrast');if(c)d.dataset.contrast=c;
var f=parseFloat(s.getItem('cm-font')||'1');if(f>=0.875&&f<=1.5)d.style.setProperty('--font-scale',f)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
        >
          Pular para o conteudo
        </a>
        <Providers>
          <Navbar />
          <main id="conteudo">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
