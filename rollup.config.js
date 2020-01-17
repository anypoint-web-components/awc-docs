import { createDefaultConfig } from '@open-wc/building-rollup';
import cpy from 'rollup-plugin-cpy';
// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({ input: './index.html' });

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: false,
  },
  plugins: [
    ...config.plugins,
    cpy({
      files: [
        'node_modules/web-animations-js/web-animations-next.min.js',
        'node_modules/web-animations-js/web-animations-next.min.js.map',
        '3rd_party/prism.js',
        'robots.txt',
        'humans.txt',
        'favicon.ico',
      ],
      dest: 'dist',
      options: {
        parents: true,
      },
    }),
  ],
};
