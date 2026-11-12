# Continuar o Chronic Map em outra máquina

Guia para retomar o projeto num computador novo. Escrito para quem vai continuar
(pessoa ou IA). Branch do front: `feat/frontend-nextjs-parte-1`.

## 1. O que existe e onde está

| Parte | Onde | Dono |
|---|---|---|
| Front-end (Next.js 16, React, Tailwind v4, Motion) | github.com/kauagoncalves1/Chronic-Map, branch `feat/frontend-nextjs-parte-1` | Kauã |
| Back-end (FastAPI + MySQL + Gemini) | github.com/gabrieln30/CHRONIC-MAP (privado) | grupo |

Regra do projeto: **o front não altera o back nem a IA**. O que o back não tiver, o front
trata como "indisponível" em vez de quebrar.

## 2. Requisitos na máquina

- Git, Node.js 22 (LTS), Docker Desktop (aberto e verde) e VS Code.
- Acesso ao repositório do back (conta GitHub com permissão).
- Acesso ao repositório do front. Se for privado, o Kauã adiciona o amigo em
  Settings > Collaborators, ou entra com a própria conta GitHub no PC.

## 3. Subir o FRONT (modo de pré-visualização, sem back)

```
cd C:\dev
git clone -b feat/frontend-nextjs-parte-1 https://github.com/kauagoncalves1/Chronic-Map.git chronic-front
cd chronic-front
npm ci
npm run dev:preview
```

Abra http://localhost:3000. Entra logado como master, com dados de exemplo.
Use pastas curtas, sem acento, **fora do OneDrive**.

## 4. Subir o BACK

```
cd C:\dev
git clone https://github.com/gabrieln30/CHRONIC-MAP.git chronic-back
cd chronic-back
copy .env.example .env
```

Edite o `.env` (ele NUNCA vai para o GitHub):

- Senhas só com letras e números (símbolos como `$ # @ : /` quebram a conexão).
- `MYSQL_USER=trilha_user` e `MYSQL_PASSWORD` com a mesma senha que a API usa.
- Chave do Gemini na variável indicada no `.env.example`. Cada pessoa usa a sua
  (https://aistudio.google.com/apikey). Não compartilhe por chat nem print.

Depois:

```
docker compose up --build db api
```

Teste: http://localhost:8000/docs deve listar as rotas.
Os serviços `php` e `phpmyadmin` do compose podem ser ignorados (não são usados pelo site).
Se a porta 8080 estiver ocupada, troque `"8080:80"` por `"8081:80"` no compose **só localmente**
e não faça commit disso.

## 5. Ligar front e back (modo real)

Pare o `dev:preview` e rode:

```
npm run dev
```

O navegador chama `/api/...` e o Next repassa para `http://localhost:8000` (ver `rewrites()` em
`next.config.ts`). Se o `.env.local` do front tiver `NEXT_PUBLIC_API_URL`, apague essa linha.

Com Docker no front: `docker compose up --build` (usa `host.docker.internal:8000`).
O alvo da API é gravado no build; mudou? rode de novo com `--build`.

## 6. PENDÊNCIA CONHECIDA: erro `Access denied for user 'trilha_user'`

A API sobe, o MySQL sobe, mas a API é recusada (erro 1045). Roteiro, na ordem:

1. `docker compose down -v` e `docker volume ls`: o volume `chronic-back_mysql_data` não pode existir.
2. Conferir o `.env`: senhas simples, sem aspas nem espaços, e **uma única senha** para o usuário.
   Se houver outra variável de conexão (ex.: `DATABASE_URL`/`DB_PASSWORD`), ela deve ter a MESMA senha.
3. `docker compose up -d db`, esperar ~40 s, e testar:
   `docker exec -it trilha_ia_db mysql -utrilha_user -p`
   - Entrou: o banco está certo e a API lê outra senha (ver a seção `api:` do compose).
   - `Access denied`: o `.env` não chegou ao compose (nome errado, pasta errada ou `.env.txt`).
4. `docker compose up --build db api`.

## 7. O que falta (decisões em aberto)

- Confirmar em http://localhost:8000/docs os caminhos reais da API. No front estão marcados
  `[?]` em `src/lib/api.ts` (auth, assistente, progresso). Ajustar só ali.
- Confirmar o formato de `exercicios_concluidos` (o front aceita `e:i`, `e-i`, `e.i`, `e_i`).
- O back ainda não tem: campo `perfil` (master/comum), listar/excluir usuários, logs,
  troca de senha e campos extras do cadastro. O front mostra "indisponível" nesses casos.
- A IA só funciona com a chave do Gemini no `.env` do back.
- O questionário usa as áreas e perguntas que o back devolve; para o site ser "para todos",
  o grupo precisa cadastrar mais áreas no banco.

## 8. Mapa rápido do front

- `src/lib/api.ts`: único ponto de chamada à API. `src/lib/preview.ts`: dados de exemplo.
- `src/app/*`: telas (cadastro, login, 2fa, dashboard, diagnostico, trilha, tutor, perfil, blog,
  usuarios, logs, modelo-bd, senha, erro).
- `src/components`: Navbar, AccessibilityBar, Hero, ChatWidget, etc.
- `src/lib/blog.ts`: textos do blog. `globals.css`: tokens de cor (azul da logo #02329F).

## 9. Para continuar com o Claude

Abra uma conversa nova, diga que o projeto é o front do Chronic Map e que a branch é
`feat/frontend-nextjs-parte-1`, e peça para ler este arquivo. Regras: sem emojis, código
documentado, segurança e LGPD, Motion para animações, e mexer só no front.
