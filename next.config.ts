import type { NextConfig } from "next";

/** Configuração mínima. Saída standalone facilita o Dockerfile do front. */
const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false, // segurança: não expõe a stack
  /**
   * Proxy para a API FastAPI: o navegador fala com /api (mesma origem) e o servidor do Next
   * repassa. Em Docker, defina API_PROXY_TARGET=http://api:8000.
   */
  async rewrites() {
    const alvo = process.env.API_PROXY_TARGET ?? "http://localhost:8000";
    return [{ source: "/api/:path*", destination: `${alvo}/:path*` }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
