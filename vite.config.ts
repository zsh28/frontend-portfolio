// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://portfolio-backend-xeby.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
