import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { promises as fs } from "fs";
import html from "pretty";
import { join } from 'path';

const clear = async (directory: string) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await clear(path);
    else if (/app\d+\.js/.test(entry.name)) await fs.unlink(path);
  }
}

const integration = (): AstroIntegration => ({
  name: "merged",
  hooks: {
    "astro:config:setup": ({ config, updateConfig }) => {
      updateConfig({
        vite: {
          build: {
            cssCodeSplit: false,
            rollupOptions: {
              output: {
                manualChunks: () => 'app',
                entryFileNames: `${config.build.assets}/app.js`,
                assetFileNames: `${config.build.assets}/[name][extname]`,
              },
            },
          },
        }
      })
    },
    "astro:build:done": async ({ dir, assets }) => {
      const chunk = /<script.+app\d+.+script>/gm;
      const array = Array.from(assets.values());
      for (const item of array) {
        for (const asset of item) {
          const path = fileURLToPath(asset);
          const raw = await fs.readFile(path, "utf8");
          await fs.writeFile(path, html(raw.replace(chunk, "")));
        }
      }
      const dist = fileURLToPath(dir);
      await clear(dist);
  },
}});

export default integration;
