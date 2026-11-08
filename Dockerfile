# syntax=docker/dockerfile:1
# Front-end Chronic Map (Next.js, saída standalone). Build em 3 estágios para imagem final pequena.

# 1) Dependências (cache separado: só refaz se package*.json mudar)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2) Build
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# ATENÇÃO: o rewrites() do Next é fixado no build, então o alvo da API entra aqui como ARG.
ARG API_PROXY_TARGET=http://api:8000
ENV API_PROXY_TARGET=$API_PROXY_TARGET
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3) Execução (usuário sem privilégios, sem código-fonte, sem devDependencies)
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
CMD ["node", "server.js"]
