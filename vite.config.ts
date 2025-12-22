/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
    }),
    react(),
    cssInjectedByJsPlugin(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    target: "es2015",
    lib: {
      name: "ReactAlign",
      entry: "src/index.ts",
    },
    rollupOptions: {
      external: ["react", "react-dom", "@hello-pangea/dnd"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@hello-pangea/dnd": "HelloPangeaDnd",
        },
        assetFileNames: (assetInfo) => {
          // Prevent SVG files from being treated as assets
          if (assetInfo.name && assetInfo.name.endsWith('.svg')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
