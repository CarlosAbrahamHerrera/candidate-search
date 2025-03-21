import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['candidate-search-ns6v.onrender.com']
  }
});
