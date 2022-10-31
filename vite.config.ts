/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
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
      plugins: [cssInjectedByJsPlugin()],
      external: ["react", "react-beautiful-dnd"],
      output: {
        globals: {
          react: "React",
          "react-beautiful-dnd": "ReactBeautifulDnd",
        },
      },
    },
  },
});
