// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://portfoliobackend-s3hr.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
