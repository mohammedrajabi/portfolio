import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { resume } from "./src/content/resume.ts";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __RESUME_AVAILABLE__: JSON.stringify(
      existsSync(resolve(import.meta.dirname, "public", resume.path.slice(1))),
    ),
  },
});
