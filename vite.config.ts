/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const svgr = require('@svgr/rollup').default;

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: resolvePath('src/index.tsx'),
      name: 'ReactAlign',
      fileName: (format) => `react-align.${format}.js`,
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
    svgr(),
  ],
});
