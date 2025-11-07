import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      mode === "production" ? "production" : "development"
    ),
    "process.env": {},
    global: "globalThis",
  },
  plugins: [
    {
      name: "counter-contract-cjs-transform",
      enforce: "pre",
      async transform(code, id) {
        if (
          /counter-contract[\\/](dist|src)[\\/]managed[\\/].*index\.cjs(?:\?import)?$/.test(
            id
          )
        ) {
          const { transform } = await import("esbuild");
          const result = await transform(code, {
            loader: "js",
            format: "esm",
            target: "es2020",
          });
          return result.code;
        }
        return undefined;
      },
    },
    nodePolyfills({
      // To add only specific polyfills, add them here.
      // If no specific polyfills are needed, you can leave this empty.
      include: ["buffer", "process"],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
    wasm(),
    react(),
    viteCommonjs({
      include: [
        "node_modules/@midnight-ntwrk/compact-runtime/dist/runtime.js",
        "node_modules/.pnpm/@midnight-ntwrk+compact-runtime@*/node_modules/@midnight-ntwrk/compact-runtime/dist/runtime.js",
        "../counter-contract/dist/managed/**/*.cjs",
        "../counter-contract/src/managed/**/*.cjs",
      ],
    }),
    topLevelAwait(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: /^@midnight-ntwrk\/compact-runtime$/,
        replacement: path.resolve(__dirname, "./src/shims/compact-runtime.ts"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "isomorphic-ws",
        replacement: path.resolve(__dirname, "./src/shims/isomorphic-ws.ts"),
      },
      // Add any other aliases you need
    ],
  },
  optimizeDeps: {
    exclude: [
      "@midnight-ntwrk/compact-runtime",
      "@midnight-ntwrk/onchain-runtime",
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Ensure proper handling of Node.js built-ins
      external: [],
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up from the package root
      allow: [".."],
    },
  },
}));
