import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { validateContentRendering } = await server.ssrLoadModule(
    "/tests/content-rendering.tsx",
  );
  validateContentRendering();
} finally {
  await server.close();
}
