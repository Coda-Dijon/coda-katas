import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: './src/server.ts',
    outDir: 'dist',
    rollupOptions: {
      external: ['express'],
    },
  },
  test: {
    environment: 'node',
  },
});
