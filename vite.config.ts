/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import svgr from '@svgr/rollup';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: 'src/index.tsx',
      name: 'ReactAlign',
      fileName: (format) => `react-align.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
    postcss({
      plugins: [
        cssnano({
          preset: 'default',
        }),
      ],
      inject: true,
      extract: false,
    }),
    svgr().default,
  ],
});
