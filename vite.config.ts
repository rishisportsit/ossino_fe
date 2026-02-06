import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithms: ['gzip'],
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    alias: {
      api: '/src/api',
      assets: '/src/assets',
      components: '/src/components',
      constants: '/src/constants',
      helpers: '/src/helpers',
      hooks: '/src/hooks',
      store: '/src/store',
      styles: '/src/styles',
      config: '/src/config',
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    proxy: {
      '/promotion': {
        target: 'https://casino-stg-games-beapi.negroup-tech.net',
        changeOrigin: true,
        secure: false,
      },
    },
    //enable to test on mobile devices
    host: '0.0.0.0',
    port: 5173,
  },
});
