/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    dts({
      copyDtsFiles: false,
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
