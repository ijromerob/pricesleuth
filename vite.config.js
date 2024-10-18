import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        target: resolve(__dirname, 'src/target/index.html'),
        walmart: resolve(__dirname, 'src/walmart/index.html'),
        both: resolve(__dirname, 'src/both/index.html'),
      },
    },
  },
});
