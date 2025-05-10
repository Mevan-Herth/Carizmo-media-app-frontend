import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3001,
    open: true,
  },
  publicDir: false,
});