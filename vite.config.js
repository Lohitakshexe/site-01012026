import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/site-01012026/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        chat: resolve(__dirname, 'chat.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        screenshots: resolve(__dirname, 'screenshots.html'),
        voice: resolve(__dirname, 'voice.html'),
        poem: resolve(__dirname, 'poem.html'),
        words: resolve(__dirname, 'words/index.html'),
      }
    }
  }
});
