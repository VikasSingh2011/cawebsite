import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/cawebsite/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        services: resolve(root, 'services.html'),
        about: resolve(root, 'about.html'),
        insights: resolve(root, 'insights.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
