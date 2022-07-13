/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const svgr = require('@svgr/rollup').default;

export default defineConfig({
  plugins: [
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
