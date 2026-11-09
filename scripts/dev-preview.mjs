// Sobe o front em modo de pre-visualizacao (sem back). Funciona em Windows, Mac e Linux.
import { spawn } from "node:child_process";
spawn("npx", ["next", "dev", "-p", "3000"], {
  stdio: "inherit", shell: true, env: { ...process.env, NEXT_PUBLIC_PREVIEW: "1" },
});
