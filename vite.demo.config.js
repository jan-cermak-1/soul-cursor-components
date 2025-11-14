import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'demo',
  base: '/soul-cursor-components/',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true
  },
  server: {
    open: true
  }
});

