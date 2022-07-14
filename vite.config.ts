/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import svgr from "@svgr/rollup";

export default defineConfig({
  build: {
    target: "es2015",
    sourcemap: true,
    lib: {
      entry: "src/index.tsx",
      name: "ReactAlign",
      formats: ["es", "cjs"],
      fileName: (format) => `react-align.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    dts({
      copyDtsFiles: false,
    }),
    postcss({
      plugins: [
        cssnano({
          preset: "default",
        }),
      ],
      inject: true,
      extract: false,
    }),
    svgr(),
  ],
});
