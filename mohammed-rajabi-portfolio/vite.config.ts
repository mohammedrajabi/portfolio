import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { resume } from "./src/content/resume.ts";
import { normalizeSiteUrl } from './src/utils/site-url.ts';
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  define: {
    __SITE_URL__: JSON.stringify(normalizeSiteUrl(process.env.SITE_URL ?? loadEnv(mode, process.cwd(), '').SITE_URL)),
    __RESUME_AVAILABLE__: JSON.stringify(
      existsSync(resolve(import.meta.dirname, "public", resume.path.slice(1))),
    ),
  },
}));
