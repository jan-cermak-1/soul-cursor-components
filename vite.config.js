import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SoulComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `soul-components.${format}.js`
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  }
});

