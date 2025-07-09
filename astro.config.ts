import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpine from "@astrojs/alpinejs";
import icon from "astro-icon";
import merged from "./integrations/merged";

// https://docs.astro.build/en/guides/environment-variables/#in-the-astro-config-file
const env = loadEnv(String(process.env.NODE_ENV), process.cwd(), "");
export default defineConfig({
  base: '/app.685e26c9075739.50333313/1/1751972982',
  server: {
    host: env.VITE_HOST || "0.0.0.0",
    port: Number(env.VITE_PORT || 3000),
  },
  integrations: [alpine(), icon(), merged()],
  compressHTML: false,
  scopedStyleStrategy: "class",
  build: {
    inlineStylesheets: "never",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    plugins: [tailwindcss()],
    server: {
      proxy: !env.VITE_APP_PROXY
        ? undefined
        : {
          "^/(local|rest|upload|bitrix)/": {
            target: env.VITE_APP_PROXY,
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            secure: true,
          },
        },
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
});