import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'demo',
  base: '/soul-cursor-components/',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html'),
        trendingWidget: resolve(__dirname, 'demo/trending-widget.html'),
        mainNavigation: resolve(__dirname, 'demo/main-navigation.html'),
      },
    },
  },
  server: {
    open: true
  }
});
