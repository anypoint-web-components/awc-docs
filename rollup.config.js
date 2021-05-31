/* eslint-disable import/no-extraneous-dependencies */
import { createBasicConfig } from '@open-wc/building-rollup';
import cpy from 'rollup-plugin-cpy';
import merge from 'deepmerge';
import html from '@open-wc/rollup-plugin-html';
import polyfillsLoader from '@open-wc/rollup-plugin-polyfills-loader';

const outputDir = 'dist';

const startConfig = createBasicConfig({
  outputDir,
  developmentMode: process.env.ROLLUP_WATCH === 'true',
});

export default [
  merge(startConfig, {
    output: {
      sourcemap: false,
    },
    plugins: [
      html({
        flatten: true,
        files: [
          './index.html',
        ],
        minify: true,
      }),
      polyfillsLoader({
        polyfills: {},
      }),

      cpy({
        files: [
          'node_modules/web-animations-js/web-animations-next.min.js',
          'node_modules/web-animations-js/web-animations-next.min.js.map',
          '3rd_party/prism.js',
          'robots.txt',
          'humans.txt',
          'favicon.ico',
        ],
        dest: outputDir,
        options: {
          parents: true,
        },
      }),
    ],
  }),
];
